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
  var webViewModel: WebViewModel? = nil
    
  func setModelContext(_ context: ModelContext) {
    self.modelContext = context
  }
  
  func setWebViewModel(_ webViewModel: WebViewModel) {
    self.webViewModel = webViewModel
  }
  
  func handleEvent(_ event: String) {
    let (eventType, eventPayload) = parseMessage(event)
    let (scope, type) = splitEventType(eventType)
    
    switch scope {
    case EventScope.WINDOW:
      WindowEventHandler.handleEvent(type)
    case EventScope.DATA:
      DataEventHandler.handleEvent(type, eventPayload, self.modelContext!, self)
    default:
      break
    }
    
  }
  
  func emit(_ eventType: String, _ payload: String = "{}") {
    guard self.webViewModel != nil else {
      return
    }
    
    let javaScript = toJavaScript(eventType, payload)
    self.webViewModel?.onSendValueFromNative.send(javaScript)
  }
  
  private func toJavaScript(_ eventType: String, _ payload: String = "{}") -> String {
    return "var event = new CustomEvent('webview-event', { 'detail': { 'type': '\(eventType)', 'payload': \(payload) } }); window.dispatchEvent(event)"
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
