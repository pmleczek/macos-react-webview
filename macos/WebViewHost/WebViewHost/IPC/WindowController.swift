//
//  WindowController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/1/25.
//

import AppKit
import SwiftData

enum WindowEvent {
  // Event scope
  static let SCOPE = "window"
  // Event types
  static let MAXIMIZE = "maximize"
  static let START_DRAGGING = "start-dragging"
  static let STOP_DRAGGING = "stop-dragging"
}

class WindowController: IPCController {
  var ipcHandler: IPCHandler?
  var modelContext: ModelContext?
  private var eventHandler: Any? = nil
  
  func setIpcHandler(_ ipcHandler: IPCHandler) {
    self.ipcHandler = ipcHandler
  }
  
  func setModelContext(_ modelContext: ModelContext) {
    return
  }
  
  func handle(_ event: IncomingIPCEvent) -> Bool {
    if (event.scope != WindowEvent.SCOPE) {
      return false
    }
    
    switch event.type {
    case WindowEvent.MAXIMIZE:
      handleMaximize()
    case WindowEvent.START_DRAGGING:
      handleStartDragging()
    case WindowEvent.STOP_DRAGGING:
      handleStopDragging()
    default:
      break
    }
    
    return true
  }
  
  func handleMaximize() {
    if let window = NSApp.windows.first {
      window.performZoom(nil)
    }
  }
  
  func handleStartDragging() {
    if (eventHandler != nil) {
      NSEvent.removeMonitor(eventHandler as Any)
      eventHandler = nil
    }
    
    eventHandler = NSEvent.addLocalMonitorForEvents(matching: .leftMouseDragged) { event in
      if let window = NSApp.windows.first {
        window.performDrag(with: event)
      }
      
      return event
    }
  }
  
  func handleStopDragging() {
    if (eventHandler != nil) {
      NSEvent.removeMonitor(eventHandler as Any)
      eventHandler = nil
    }
  }
}
