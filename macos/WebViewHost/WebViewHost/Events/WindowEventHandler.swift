//
//  WindowEventHandler.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/19/25.
//

import AppKit

enum WindowEventType {
  static let MAXIMIZE = "maximize"
  static let START_DRAGGING = "start-dragging"
  static let STOP_DRAGGING = "stop-dragging"
}

class WindowEventHandler {
  static var eventHandler: Any? = nil
  
  static func handleEvent(_ type: String) {
    switch type {
    case WindowEventType.MAXIMIZE:
      handleMaximize()
    case WindowEventType.START_DRAGGING:
      handleStartDragging()
    case WindowEventType.STOP_DRAGGING:
      handleStopDragging()
    default:
      break
    }
  }
  
  static func handleMaximize() {
    if let window = NSApp.windows.first {
      window.performZoom(nil)
    }
  }
  
  static func handleStartDragging() {
    if (eventHandler != nil) {
      NSEvent.removeMonitor(eventHandler as Any)
    }
    
    eventHandler = NSEvent.addLocalMonitorForEvents(matching: .leftMouseDragged) { event in
      if let window = NSApp.windows.first {
        window.performDrag(with: event)
      }
      
      return event
    }
  }
  
  static func handleStopDragging() {
    if (eventHandler != nil) {
      NSEvent.removeMonitor(eventHandler as Any)
      eventHandler = nil
    }
  }
}
