//
//  AppDelegate.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/13/25.
//

import Cocoa

class AppDelegate: NSObject, NSApplicationDelegate {
    private var window: NSWindow!
    private let windowDelegate = WindowDelegate()

    func applicationDidFinishLaunching(_ aNotification: Notification) {
      window = makeWindow(NSMakeRect(0, 0, 1200, 800), windowDelegate)
      positionTrafficLights(window)
      
      let reactWebView = ReactWebView(
          frame: window.contentView!.bounds,
          viewModel: WebViewModel()
      )
      reactWebView.autoresizingMask = [.width, .height]
      window.contentView?.addSubview(reactWebView)
      
      let contentViewBounds = window.contentView!.bounds
      let dragRegion = DragRegionView(frame: NSRect(
        x: 0,
        y: contentViewBounds.height - 44,
        width: contentViewBounds.width,
        height: 44
      ))
      dragRegion.autoresizingMask = [.width, .minYMargin]
      window.contentView?.addSubview(dragRegion)
      
      NSApp.activate(ignoringOtherApps: true)
    }

    func applicationWillTerminate(_ aNotification: Notification) {}

    func applicationSupportsSecureRestorableState(_ app: NSApplication) -> Bool {
        return true
    }
}
