//
//  IPCEventHandler.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/19/25.
//

enum EventScope {
  static let WINDOW = "window"
}

class IPCEventHandler {
  static func handleEvent(_ payload: String) {
    let (scope, type) = splitEventType(payload)
    
    switch scope {
    case EventScope.WINDOW:
      WindowEventHandler.handleEvent(type)
    default:
      break
    }
  }
  
  static func splitEventType(_ eventType: String) -> (String, String) {
    let parts = eventType.components(separatedBy: ":")
    return (parts[0], parts[1])
  }
}
