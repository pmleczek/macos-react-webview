//
//  DataEventHandler.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 5/17/25.
//

enum DataEventType {
  static let CREATE_ITEM = "item-create"
}

class DataEventHandler {
  static func handleEvent(_ type: String, _ payload: [String: Any]) {
    switch type {
    case DataEventType.CREATE_ITEM:
      print("Create item")
      print(payload)
      break
    default:
      break
    }
  }
}
