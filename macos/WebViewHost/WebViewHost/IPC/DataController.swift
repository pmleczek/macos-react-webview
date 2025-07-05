//
//  DataController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/5/25.
//

import Foundation
import SwiftData

class DataController: IPCController {
  var ipcHandler: IPCHandler?
  var modelContext: ModelContext?
  
  func setIpcHandler(_ ipcHandler: IPCHandler) {
    self.ipcHandler = ipcHandler
  }
  
  func setModelContext(_ modelContext: ModelContext) {
    self.modelContext = modelContext
  }
  
  func handle(_ event: IncomingIPCEvent) -> Bool {
    if event.scope != "data" {
      return false
    }
    
    switch event.type {
    case "item-fetch-all":
      handleFetchAllItems(event)
    case "item-fetch":
      handleFetchItem(event)
    case "item-create":
      handleCreateItem(event)
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
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["items": itemDTOs]))
    } catch {
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": "Fetching items failed"]))
    }
  }
  
  func handleFetchItem(_ event: IncomingIPCEvent) {
    guard let modelContext else {
      return
    }
    
    guard let id = event.payload?["id"] as? String else {
      ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": "No 'id' passed"]))
      return
    }
    
    guard let uuid = UUID(uuidString: id) else {
      ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": "Cannot convert 'id' to UUID"]))
      return
    }
    
    let fetchDescriptor = FetchDescriptor<Item>(predicate: #Predicate { item in
      item.id == uuid
    })
    
    do {
      let items = try modelContext.fetch(fetchDescriptor)
      if let firstResult = items.first {
        self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["item": ItemDTO(from: firstResult)]))
      } else {
        self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["item": nil as ItemDTO?]))
      }
    } catch {
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": "Fetching item failed"]))
    }
  }
  
  func handleCreateItem(_ event: IncomingIPCEvent) {
    guard let modelContext else {
      return
    }
    
    guard let payloadItem = event.payload?["item"] as? [String: Any],
          let title = payloadItem["title"] as? String else {
      ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": "No 'item.title' passed"]))
      return
    }
    
    let item = Item(title: title)
    do {
      modelContext.insert(item)
      try modelContext.save()
      
      let itemDTO = ItemDTO(from: item)
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["item": itemDTO]))
    } catch {
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": "Creating item failed"]))
    }
  }
}

