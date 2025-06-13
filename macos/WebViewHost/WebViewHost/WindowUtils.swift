//
//  WindowUtils.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/13/25.
//

import Cocoa

struct WindowConstants {
  static let backgroundColor: NSColor = .white
  static let title: String = "WebViewHost"
  static let trafficLightsX: CGFloat = 16.0
  static let trafficLightsY: CGFloat = 20.0
}

func makeWindow(_ contentRect: NSRect, _ delegate: WindowDelegate) -> NSWindow {
  let window = NSWindow(
    contentRect: contentRect,
    styleMask: [
      .titled,
      .closable,
      .resizable,
      .miniaturizable,
      .fullSizeContentView,
    ],
    backing: .buffered,
    defer: false
  )
  
  window.title = WindowConstants.title
  window.titleVisibility = .hidden
  window.titlebarAppearsTransparent = true
  window.backgroundColor = WindowConstants.backgroundColor
  
  window.center()
  window.makeKeyAndOrderFront(nil)
  
  window.delegate = delegate
  
  return window
}

func trafficLightsButtons(_ window: NSWindow) -> [NSButton] {
  guard let closeButton = window.standardWindowButton(.closeButton),
        let miniaturizeButton = window.standardWindowButton(.miniaturizeButton),
        let zoomButton = window.standardWindowButton(.zoomButton) else {
    return []
  }
  
  return [closeButton, miniaturizeButton, zoomButton]
}
  
func setTrafficLightsHidden(_ window: NSWindow, _ hidden: Bool) {
  trafficLightsButtons(window).forEach { $0.isHidden = hidden }
}
  
func positionTrafficLights(
  _ window: NSWindow,
  _ x: CGFloat = WindowConstants.trafficLightsX,
  _ y: CGFloat = WindowConstants.trafficLightsY
) {
  let trafficLights = trafficLightsButtons(window)
  
  guard trafficLights.count == 3 else {
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
  
