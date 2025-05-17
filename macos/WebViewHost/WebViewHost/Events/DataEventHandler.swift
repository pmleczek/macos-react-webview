//
//  DataEventHandler.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 5/17/25.
//

import SwiftData

enum DataEventType {
  static let CREATE_ITEM = "item-create"
}

class DataEventHandler {
  static func handleEvent(_ type: String, _ payload: [String: Any], _ modelContext: ModelContext) {
    switch type {
    case DataEventType.CREATE_ITEM:
      createItem(payload, modelContext)
      break
    default:
      break
    }
  }
  
  static func createItem(_ payload: [String: Any], _ modelContext: ModelContext) {
    do {
      let item = Item(
        id: payload["id", default: "123456"] as! String,
        date: payload["data", default: "05/05/2005"] as! String,
        emoji: payload["emoji", default: "🙂"] as! String,
        price: payload["price", default: "123.45"] as! String
      )
      modelContext.insert(item)
      try modelContext.save()
    } catch {}
  }
}
