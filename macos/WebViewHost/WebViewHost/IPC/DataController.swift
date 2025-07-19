//
//  DataController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/5/25.
//

import Foundation
import SwiftData

class DataController: DataIPCController {
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
    guard let modelContext else {
      return
    }
    
    let fetchDescriptor = FetchDescriptor<Item>(sortBy: [SortDescriptor(\.createdAt, order: .reverse)])
    
    do {
      let items = try modelContext.fetch(fetchDescriptor)
      let itemDTOs = items.map {
        return ItemDTO(from: $0)
      }
      sendIPCResponse(event, payload: ["items": itemDTOs])
    } catch {
      sendIPCError(event, error: "Fetching items failed")
    }
  }
  
  func handleFetchItem(_ event: IncomingIPCEvent) {
    guard let modelContext else {
      return
    }
    
    guard let id = event.payload?["id"] as? String else {
      sendIPCError(event, error: "No 'id' passed")
      return
    }
    
    guard let uuid = UUID(uuidString: id) else {
      sendIPCError(event, error: "Cannot convert 'id' to UUID")
      return
    }
    
    let fetchDescriptor = FetchDescriptor<Item>(predicate: #Predicate { item in
      item.id == uuid
    })
    
    do {
      let items = try modelContext.fetch(fetchDescriptor)
      if let firstResult = items.first {
        sendIPCResponse(event, payload: ["item": ItemDTO(from: firstResult)])
      } else {
        sendIPCResponse(event, payload: ["item": nil as ItemDTO?])
      }
    } catch {
      sendIPCError(event, error: "Fetching item failed")
    }
  }
  
  func handleCreateItem(_ event: IncomingIPCEvent) {
    guard let modelContext else {
      return
    }
    
    guard let payloadItem = event.payload?["item"] as? [String: Any],
          let title = payloadItem["title"] as? String else {
      sendIPCError(event, error: "No 'item.title' passed")
      return
    }
    
    let item = Item(title: title)
    do {
      modelContext.insert(item)
      try modelContext.save()
      
      let itemDTO = ItemDTO(from: item)
      sendIPCResponse(event, payload: ["item": itemDTO])
    } catch {
      sendIPCError(event, error: "Creating item failed")
    }
  }
  
  func handleDeleteItem(_ event: IncomingIPCEvent) {
    guard let modelContext else {
      return
    }
    
    guard let id = event.payload?["id"] as? String else {
      sendIPCError(event, error: "No 'id' passed")
      return
    }
    
    guard let uuid = UUID(uuidString: id) else {
      sendIPCError(event, error: "Cannot convert 'id' to UUID")
      return
    }
    
    let fetchDescriptor = FetchDescriptor<Item>(predicate: #Predicate { item in
      item.id == uuid
    })
    
    do {
      let items = try modelContext.fetch(fetchDescriptor)
      guard let itemToDelete = items.first else {
        sendIPCError(event, error: "Cannot find item with specified 'id'")
        return
      }
      
      modelContext.delete(itemToDelete)
      try modelContext.save()
      
      sendIPCResponse(event, payload: ["item": ItemDTO(from: itemToDelete)])
    } catch {
      sendIPCError(event, error: "Deleting item failed")
    }
  }
  
  func handleUpdateItem(_ event: IncomingIPCEvent) {
    guard let modelContext else {
      return
    }
    
    guard let payload = event.payload,
          let id = payload["id"] as? String,
          let title = payload["title"] as? String else {
      sendIPCError(event, error: "Method requires 'id' and 'title' to be passed")
      return
    }
    
    guard let uuid = UUID(uuidString: id) else {
      sendIPCError(event, error: "Cannot convert 'id' to UUID")
      return
    }
    
    let fetchDescriptor = FetchDescriptor<Item>(predicate: #Predicate { item in
      item.id == uuid
    })
    
    do {
      guard let item = try modelContext.fetch(fetchDescriptor).first else {
        sendIPCError(event, error: "Item with specified 'id' was not found")
        return
      }
      
      item.title = title
      item.updatedAt = Date.now.timeIntervalSince1970
      
      try modelContext.save()
      
      sendIPCResponse(event, payload: ["item": ItemDTO(from: item)])
    } catch {
      sendIPCError(event, error: "Deleting item failed")
    }
  }
}

