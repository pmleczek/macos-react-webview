//
//  WindowDelegate.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/12/25.
//

import AppKit

final class WindowDelegate: NSObject, NSWindowDelegate {
  func windowDidResize(_ notification: Notification) {
    if let window = NSApp.windows.first {
      positionTrafficLights(
        window,
        x: WindowConstants.TRAFFIC_LIGHTS_INSET_X,
        y: WindowConstants.TRAFFIC_LIGHTS_INSET_Y
      )
    }
  }
}
