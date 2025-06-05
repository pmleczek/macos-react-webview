//
//  DragRegionView.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/5/25.
//

import AppKit
import SwiftUI

class DragRegionView: NSView {
    let exclusionZones: [CGRect] = [
      // Go back button
      CGRect(x: 151, y: 10, width: 32, height: 32),
      // Go forward button
      CGRect(x: 183, y: 10, width: 32, height: 32)
    ]
  
    override func mouseDown(with event: NSEvent) {
      if let window = self.window {
        if event.clickCount == 2 {
          window.zoom(nil)
        } else if window.responds(to: #selector(NSWindow.performDrag(with:))) {
          window.performDrag(with: event)
        }
      }
    }

    override func hitTest(_ point: NSPoint) -> NSView? {
      for zone in exclusionZones {
        if zone.contains(point) {
          return nil
        }
      }
      
      for subview in self.subviews {
        if subview.hitTest(convert(point, to: subview)) != nil {
          return nil
        }
      }
      
      return self
    }
}

struct NativeDragRegion: NSViewRepresentable {
    func makeNSView(context: Context) -> NSView {
        let dragView = DragRegionView()
        dragView.translatesAutoresizingMaskIntoConstraints = false
        dragView.wantsLayer = false
        return dragView
    }

    func updateNSView(_ nsView: NSView, context: Context) {}
}
