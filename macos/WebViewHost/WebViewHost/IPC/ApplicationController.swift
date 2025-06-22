//
//  ApplicationController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/21/25.
//

import AppKit

class ApplicationController: IPCController {
  var ipcHandler: IPCHandler?
  
  func setIpcHandler(_ ipcHandler: IPCHandler) {
    self.ipcHandler = ipcHandler
  }
  
  func handle(_ event: IncomingIPCEvent) -> Bool {
    if event.scope != "application" {
      return false
    }
    
    if event.type == "get-theme" {
      handleGetTheme(event)
    }
    
    if event.type == "set-theme" {
      handleSetTheme(event)
    }
    
    return true
  }
  
  func handleGetTheme(_ event: IncomingIPCEvent) {
    let theme = UserDefaults.standard.string(forKey: "preferredTheme") ?? "system"
    self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["theme": theme]))
    
  }
  
  func handleSetTheme(_ event: IncomingIPCEvent) {
    guard let payload = event.payload, let theme = payload["theme"] as? String else {
      return
    }
    
    if let window = NSApp.windows.first {
      let darkMode = theme == "dark" || (theme == "system" && UserDefaults.standard.string(forKey: "AppleInterfaceStyle") == "Dark")
      if (darkMode) {
        window.backgroundColor = WindowConstants.darkWindowBackgroundColor
      } else {
        window.backgroundColor = WindowConstants.backgroundColor
      }
    }
    
    UserDefaults.standard.set(theme, forKey: "preferredTheme")
    let setTheme = UserDefaults.standard.string(forKey: "preferredTheme") ?? "system"
    
    self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["theme": theme]))
  }
}
