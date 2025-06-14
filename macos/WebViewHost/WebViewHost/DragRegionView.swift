//
//  DragRegionView.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/14/25.
//

import Cocoa

class DragRegionView: NSView {
  var exclusionZones: [CGRect] = [
      // Go back button
      CGRect(x: 151, y: 10, width: 32, height: 32),
      // Go forward button
      CGRect(x: 183, y: 10, width: 32, height: 32)
  ]
    
    override init(frame frameRect: NSRect) {
        super.init(frame: frameRect)
        self.wantsLayer = true
        self.layer?.backgroundColor = NSColor.clear.cgColor
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    override func hitTest(_ point: NSPoint) -> NSView? {
        for zone in exclusionZones {
            let converted = convertToAppKit(zone, self.window!.frame.height)
            if converted.contains(point) {
                return nil
            }
        }
      
        return super.hitTest(point)
    }

    override func mouseDown(with event: NSEvent) {
      guard let window = self.window else { return }

      let localPoint = convert(event.locationInWindow, from: nil)
      if exclusionZones.contains(where: { $0.contains(localPoint) }) {
          return
      }

      if event.clickCount == 2 {
          window.zoom(nil)
      } else {
          window.performDrag(with: event)
      }
    }
}

