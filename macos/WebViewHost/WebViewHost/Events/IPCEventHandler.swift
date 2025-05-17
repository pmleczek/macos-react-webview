//
//  IPCEventHandler.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/19/25.
//

import Foundation
import SwiftData

enum EventScope {
  static let DATA = "data"
  static let WINDOW = "window"
}

class IPCEventHandler: ObservableObject {
  var modelContext: ModelContext? = nil
    
  func setModelContext(_ context: ModelContext) {
    self.modelContext = context
  }
  
  func handleEvent(_ event: String) {
    let (eventType, eventPayload) = parseMessage(event)
    let (scope, type) = splitEventType(eventType)
    
    switch scope {
    case EventScope.WINDOW:
      WindowEventHandler.handleEvent(type)
    case EventScope.DATA:
      DataEventHandler.handleEvent(type, eventPayload, self.modelContext!)
    default:
      break
    }
    
  }
  
  func parseMessage(_ message: String) -> (String, [String: Any]) {
    if let data = message.data(using: .utf8) {
      do {
        if let dict = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
          if let type = dict["type"] as? String {
            var payload: [String: Any] = [:]
            if dict["payload"] != nil && dict["payload"] as? [String: Any] != nil {
              payload = dict["payload"] as! [String: Any]
            }
            
            return (type, payload)
          }
        }
      } catch {}
    }
    
    return ("", [:])
  }
  
  func splitEventType(_ eventType: String) -> (String, String) {
    let parts = eventType.components(separatedBy: ":")
    return (parts[0], parts[1])
  }
}
