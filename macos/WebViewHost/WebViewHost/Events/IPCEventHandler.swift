//
//  IPCEventHandler.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/19/25.
//

import Foundation

enum EventScope {
  static let DATA = "data"
  static let WINDOW = "window"
}

class IPCEventHandler {
  static func handleEvent(_ event: String) {
    let (eventType, eventPayload) = parseMessage(event)
    let (scope, type) = splitEventType(eventType)
    
    switch scope {
    case EventScope.WINDOW:
      WindowEventHandler.handleEvent(type)
    case EventScope.DATA:
      DataEventHandler.handleEvent(type, eventPayload)
    default:
      break
    }
    
  }
  
  static func parseMessage(_ message: String) -> (String, [String: Any]) {
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
  
  static func splitEventType(_ eventType: String) -> (String, String) {
    let parts = eventType.components(separatedBy: ":")
    return (parts[0], parts[1])
  }
}
