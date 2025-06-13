//
//  WindowDelegate.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/13/25.
//

import Cocoa

class WindowDelegate: NSObject, NSWindowDelegate {
  func windowDidResize(_ notification: Notification) {
    print("window resized")
  }
  
  func windowWillExitFullScreen(_ notification: Notification) {
    print("window will exit fullscreen")
  }
  
  func windowDidExitFullScreen(_ notification: Notification) {
    print("window did exit fullscreen")
  }
}
