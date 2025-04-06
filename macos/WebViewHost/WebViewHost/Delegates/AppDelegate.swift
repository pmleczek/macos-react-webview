//
//  AppDelegate.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/6/25.
//

import AppKit

final class AppDelegate: NSObject, NSApplicationDelegate {
  func applicationDidFinishLaunching(_ notification: Notification) {
    if let window = NSApp.windows.first {
      hideTitleBar(window)
    }
  }
}
