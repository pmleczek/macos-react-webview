//
//  AppDelegate.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/6/25.
//

import AppKit

final class AppDelegate: NSObject, NSApplicationDelegate {
  var windowDelegate: WindowDelegate?
  
  func applicationDidFinishLaunching(_ notification: Notification) {
    if let window = NSApp.windows.first {
      NSApp.appearance = NSAppearance(named: .aqua)
      
      hideTitleBar(window)
      positionTrafficLights(
        window,
        x: WindowConstants.TRAFFIC_LIGHTS_INSET_X,
        y: WindowConstants.TRAFFIC_LIGHTS_INSET_Y
      )
      
      windowDelegate = WindowDelegate()
      window.delegate = windowDelegate
    }
  }
}
