//
//  WebViewHostApp.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/5/25.
//

import SwiftUI
import SwiftData

@main
struct WebViewHostApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var delegate
    @StateObject var ipcEventHandler: IPCEventHandler = IPCEventHandler()
  
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Item.self,
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            ContentView()
            .environmentObject(ipcEventHandler)
        }
        .modelContainer(sharedModelContainer)
        .commands {
          CommandGroup(after: .appInfo) {
            Divider()
            Button("Settings...") {
              ipcEventHandler.emit("menu-item:settings")
            }
            .keyboardShortcut(",", modifiers: [.command])
          }
        }
    }
}
