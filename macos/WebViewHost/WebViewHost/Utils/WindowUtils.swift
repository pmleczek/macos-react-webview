//
//  WindowUtils.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/6/25.
//

import AppKit

func hideTitleBar(_ window: NSWindow) {
  window.titleVisibility = .hidden
  window.titlebarAppearsTransparent = true
  window.backgroundColor = NSColor(red: 0.071, green: 0.071, blue: 0.071, alpha: 1.0)
}

func positionTrafficLights(_ window: NSWindow, x: CGFloat, y: CGFloat) {
  guard let trafficLights = getTrafficLights(window) else {
    return
  }
  
  let closeButton = trafficLights[0]
  let titleBar = closeButton.superview?.superview
  let buttonHeight = closeButton.frame.height
  
  if let titleBar {
    let titleBarHeight = buttonHeight + y
    var titleBarFrame = titleBar.frame
    titleBarFrame.size.height = titleBarHeight
    titleBarFrame.origin.y = window.frame.size.height - titleBarHeight
    titleBar.frame = titleBarFrame
    
    let spacing = trafficLights[1].frame.origin.x - closeButton.frame.origin.x
    for (idx, button) in trafficLights.enumerated() {
      var frame = button.frame
      frame.origin.x = x + spacing * CGFloat(idx)
      button.setFrameOrigin(frame.origin)
    }
  }
}

func hideTrafficLights(_ window: NSWindow) {
  if let trafficLights = getTrafficLights(window) {
    trafficLights.forEach { button in
      button.isHidden = true
    }
  }
}

func showTrafficLights(_ window: NSWindow) {
  if let trafficLights = getTrafficLights(window) {
    trafficLights.forEach { button in
      button.isHidden = false
    }
  }
}

func getTrafficLights(_ window: NSWindow) -> [NSButton]? {
  guard let closeButton = window.standardWindowButton(.closeButton),
        let minimizeButton = window.standardWindowButton(.miniaturizeButton),
        let zoomButton = window.standardWindowButton(.zoomButton)
  else {
    return nil
  }
  
  return [closeButton, minimizeButton, zoomButton]
}
