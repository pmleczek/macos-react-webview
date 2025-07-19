//
//  DataController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/5/25.
//

import Foundation

class DataController: IPCController {
  override func handle(_ event: IncomingIPCEvent) -> Bool {
    if event.scope != "data" {
      return false
    }
    
    switch event.type {
    case DataEvent.Item.FetchAll:
      handleFetchAllItems(event)
    case DataEvent.Item.Fetch:
      handleFetchItem(event)
    case DataEvent.Item.Create:
      handleCreateItem(event)
    case DataEvent.Item.Delete:
      handleDeleteItem(event)
    case DataEvent.Item.Update:
      handleUpdateItem(event)
    default:
      break
    }
    
    return true
  }
  
  func handleFetchAllItems(_ event: IncomingIPCEvent) {
    do {
      let items = try ItemRepository.all()
      let itemDTOs = items.map {
        return ItemDTO(from: $0)
      }
      sendIPCResponse(event, payload: ["items": itemDTOs])
    } catch {
      sendIPCError(event, error: "Fetching items failed")
    }
  }
  
  func handleFetchItem(_ event: IncomingIPCEvent) {
    guard let id = event.payload?["id"] as? String else {
      sendIPCError(event, error: "No 'id' passed")
      return
    }
    
    do {
      let item = try ItemRepository.get(id)
      if item != nil {
        sendIPCResponse(event, payload: ["item": ItemDTO(from: item!)])
      } else {
        sendIPCResponse(event, payload: ["item": nil as ItemDTO?])
      }
    } catch {
      sendIPCError(event, error: "Fetching item failed")
    }
  }
  
  func handleCreateItem(_ event: IncomingIPCEvent) {
    guard let payloadItem = event.payload?["item"] as? [String: Any],
          let title = payloadItem["title"] as? String else {
      sendIPCError(event, error: "No 'item.title' passed")
      return
    }
    
    do {
      guard let item = try ItemRepository.create(
        Item(title: title)
      ) else {
        sendIPCError(event, error: "Creating item failed")
        return
      }
      
      let itemDTO = ItemDTO(from: item)
      sendIPCResponse(event, payload: ["item": itemDTO])
    } catch {
      sendIPCError(event, error: "Creating item failed")
    }
  }
  
  func handleDeleteItem(_ event: IncomingIPCEvent) {
    guard let id = event.payload?["id"] as? String else {
      sendIPCError(event, error: "No 'id' passed")
      return
    }
    
    do {
      guard let item = try ItemRepository.delete(id) else {
        sendIPCError(event, error: "Deleting item failed")
        return
      }
      
      sendIPCResponse(event, payload: ["item": ItemDTO(from: item)])
    } catch {
      sendIPCError(event, error: "Deleting item failed")
    }
  }
  
  func handleUpdateItem(_ event: IncomingIPCEvent) {
    guard let payload = event.payload,
          let id = payload["id"] as? String,
          let title = payload["title"] as? String else {
      sendIPCError(event, error: "Method requires 'id' and 'title' to be passed")
      return
    }
    
    do {
      guard let item = try ItemRepository.update(id, title) else {
        sendIPCError(event, error: "Updating item failed")
        return
      }
      
      sendIPCResponse(event, payload: ["item": ItemDTO(from: item)])
    } catch {
      sendIPCError(event, error: "Updating item failed")
    }
  }
}

