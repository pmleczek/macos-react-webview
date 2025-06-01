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
    @StateObject var ipcHandler: IPCHandler = IPCHandler()
  
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
            .environmentObject(ipcHandler)
        }
        .modelContainer(sharedModelContainer)
        .commands {
          CommandGroup(after: .appInfo) {
            Divider()
            Button("Settings...") {
              ipcHandler.emit("menu-item:settings")
            }
            .keyboardShortcut(",", modifiers: [.command])
          }
        }
    }
}
