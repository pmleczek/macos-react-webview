//
//  WindowUtils.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/13/25.
//

import Cocoa

struct WindowConstants {
  static let backgroundColor: NSColor = .white
  static let darkWindowBackgroundColor: NSColor = NSColor(
    red: 10 / 255.0, green: 10 / 255.0, blue: 10 / 255.0, alpha: 1.0)
  static let title: String = "WebViewHost"
  static let trafficLightsX: CGFloat = 16.0
  static let trafficLightsY: CGFloat = 24.0
}

func makeWindow(_ contentRect: NSRect, _ delegate: WindowDelegate) -> NSWindow {
  let window = NSWindow(
    contentRect: contentRect,
    styleMask: [
      .titled,
      .closable,
      .resizable,
      .miniaturizable,
      .fullSizeContentView
    ],
    backing: .buffered,
    defer: false
  )

  window.title = WindowConstants.title
  window.titleVisibility = .hidden
  window.titlebarAppearsTransparent = true

  let preferredTheme = UserDefaults.standard.string(forKey: "preferredTheme")
  var darkMode = false

  if preferredTheme == nil {
    UserDefaults.standard.set("system", forKey: "preferredTheme")
    darkMode = UserDefaults.standard.string(forKey: "AppleInterfaceStyle") == "Dark"
  } else {
    darkMode =
      preferredTheme == "dark"
      || (preferredTheme == "system"
        && UserDefaults.standard.string(forKey: "AppleInterfaceStyle") == "Dark")
  }

  if darkMode {
    window.backgroundColor = WindowConstants.darkWindowBackgroundColor
  } else {
    window.backgroundColor = WindowConstants.backgroundColor
  }

  window.center()
  window.makeKeyAndOrderFront(nil)

  window.delegate = delegate

  return window
}

func trafficLightsButtons(_ window: NSWindow) -> [NSButton] {
  guard let closeButton = window.standardWindowButton(.closeButton),
    let miniaturizeButton = window.standardWindowButton(.miniaturizeButton),
    let zoomButton = window.standardWindowButton(.zoomButton)
  else {
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

func convertToAppKit(_ rect: CGRect, _ windowHeight: CGFloat) -> CGRect {
  return CGRect(
    x: rect.origin.x,
    y: windowHeight - rect.origin.y - rect.height,
    width: rect.width,
    height: rect.height
  )
}
