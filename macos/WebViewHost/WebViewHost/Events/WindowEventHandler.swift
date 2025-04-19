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
  static func handleEvent(_ type: String) {
    switch type {
    case WindowEventType.MAXIMIZE:
      handleMaximize()
    case WindowEventType.START_DRAGGING:
      print("Start dragging")
    case WindowEventType.STOP_DRAGGING:
      print("Stop dragging")
    default:
      break
    }
  }
  
  static func handleMaximize() {
    if let window = NSApp.windows.first {
      window.performZoom(nil)
    }
  }
}
