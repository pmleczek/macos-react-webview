//
//  WindowDelegate.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/12/25.
//

import AppKit

final class WindowDelegate: NSObject, NSWindowDelegate {
  func windowDidResize(_ notification: Notification) {
    print("windowDidResize_")
  }
}
