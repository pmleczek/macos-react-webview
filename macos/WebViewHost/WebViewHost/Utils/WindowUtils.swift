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
  guard let closeButton = window.standardWindowButton(.closeButton),
        let minimizeButton = window.standardWindowButton(.miniaturizeButton),
        let fullscreenButton = window.standardWindowButton(.zoomButton)
  else {
    return
  }
  
  let titleBar = closeButton.superview?.superview
  let windowButtonHeight = closeButton.frame.height
  
  if let titleBar {
    let titleBarHeight = windowButtonHeight + y
    var titleBarFrame = titleBar.frame
    titleBarFrame.size.height = titleBarHeight
    titleBarFrame.origin.y = window.frame.size.height - titleBarHeight
    titleBar.frame = titleBarFrame
    
    var closeButtonFrame = closeButton.frame
    var minimizeButtonFrame = minimizeButton.frame
    var fullscreenButtonFrame = fullscreenButton.frame
    
    let buttonSpacingX = minimizeButtonFrame.origin.x - closeButtonFrame.origin.x
    
    closeButtonFrame.origin.x = x
    closeButton.setFrameOrigin(closeButtonFrame.origin)
    
    minimizeButtonFrame.origin.x = x + buttonSpacingX
    minimizeButton.setFrameOrigin(minimizeButtonFrame.origin)
    
    fullscreenButtonFrame.origin.x = x + 2 * buttonSpacingX
    fullscreenButton.setFrameOrigin(fullscreenButtonFrame.origin)
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
