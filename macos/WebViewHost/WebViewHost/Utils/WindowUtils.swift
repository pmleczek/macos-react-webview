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
