//
//  AppDelegate.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/13/25.
//

import Cocoa
import SwiftData

class AppDelegate: NSObject, NSApplicationDelegate {
    private var window: NSWindow!
    private let windowDelegate = WindowDelegate()
    private var modelContainer: ModelContainer!

    func applicationDidFinishLaunching(_ aNotification: Notification) {
      do {
#if DEBUG
        let inMemory = false
#else
        let inMemory = false
#endif // DEBUG
        let schema = Schema([Item.self])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: inMemory)
        modelContainer = try ModelContainer(for: schema, configurations: [modelConfiguration])
      } catch {
        fatalError("Failed to create ModelContainer: \(error.localizedDescription)")
      }
      
      IPCHandler.shared.setModelContext(modelContainer.mainContext)
      _ = NotificationService.shared
      
      window = makeWindow(NSMakeRect(0, 0, 1200, 800), windowDelegate)
      positionTrafficLights(window)
      
      let reactWebView = ReactWebView(
          frame: window.contentView!.bounds,
          viewModel: WebViewModel()
      )
      reactWebView.autoresizingMask = [.width, .height]
      window.contentView?.addSubview(reactWebView)
      window.makeFirstResponder(reactWebView)
      
      let contentViewBounds = window.contentView!.bounds
      let dragRegion = DragRegionView(frame: NSRect(
        x: 0,
        y: contentViewBounds.height - 44,
        width: contentViewBounds.width,
        height: 44
      ))
      dragRegion.autoresizingMask = [.width, .minYMargin]
      window.contentView?.addSubview(dragRegion)
      
      buildMenu(self)
      
      NSApp.activate(ignoringOtherApps: true)
    }

    func applicationWillTerminate(_ aNotification: Notification) {}

    func applicationSupportsSecureRestorableState(_ app: NSApplication) -> Bool {
        return true
    }
  
  @objc func openSettings () {
    print("Open settings")
  }
}
