//
//  WindowDelegate.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/13/25.
//

import Cocoa

class WindowDelegate: NSObject, NSWindowDelegate {
  func windowDidResize(_ notification: Notification) {
    let window = NSApp.windows.first!
    positionTrafficLights(window)
  }
  
  func windowWillExitFullScreen(_ notification: Notification) {
    let window = NSApp.windows.first!
    setTrafficLightsHidden(window, true)
  }
  
  func windowDidExitFullScreen(_ notification: Notification) {
    let window = NSApp.windows.first!
    positionTrafficLights(window)
    setTrafficLightsHidden(window, false)
  }
}
