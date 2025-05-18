//
//  DataEventHandler.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 5/17/25.
//

import AppKit
import SwiftData

enum DataEventType {
  static let CREATE_ITEM = "item-create"
  static let CREATE_ITEM_RESPONSE = "item-create-response"
}

class DataEventHandler {
  static func handleEvent(_ type: String, _ payload: [String: Any], _ modelContext: ModelContext, _ eventEmitter: IPCEventHandler) {
    switch type {
    case DataEventType.CREATE_ITEM:
      createItem(payload, modelContext, eventEmitter)
      break
    default:
      break
    }
  }
  
  static func createItem(_ payload: [String: Any], _ modelContext: ModelContext, _ eventEmitter: IPCEventHandler) {
    do {
      let item = Item(
        id: payload["id", default: "123456"] as! String,
        date: payload["data", default: "05/05/2005"] as! String,
        emoji: payload["emoji", default: "🙂"] as! String,
        price: payload["price", default: "123.45"] as! String
      )
      modelContext.insert(item)
      try modelContext.save()
      
      let id = item.id
      let fetchDescriptor = FetchDescriptor<Item>(
        predicate: #Predicate<Item> { $0.id == id }
      )
      let insertedItem = try modelContext.fetch(fetchDescriptor).first
      if let jsonData = try? JSONEncoder().encode(insertedItem!) {
        eventEmitter.emit("data:" + DataEventType.CREATE_ITEM_RESPONSE, String(data: jsonData, encoding: .utf8)!)
      }
    } catch {
      eventEmitter.emit("data:" + DataEventType.CREATE_ITEM_RESPONSE)
    }
  }
}
