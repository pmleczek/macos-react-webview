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
      window = NSWindow(
        contentRect: NSMakeRect(0, 0, 1200, 800),
        styleMask: [
          .titled,
          .closable,
          .resizable,
          .miniaturizable,
        ],
        backing: .buffered,
        defer: false
      )
      
      window.center()
      window.title = "WebViewHost"
      window.makeKeyAndOrderFront(nil)
      window.backgroundColor = .white
      
      window.delegate = windowDelegate
      
      NSApp.activate(ignoringOtherApps: true)
    }

    func applicationWillTerminate(_ aNotification: Notification) {}

    func applicationSupportsSecureRestorableState(_ app: NSApplication) -> Bool {
        return true
    }
}
