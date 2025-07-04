//
//  ApplicationController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/21/25.
//

import AppKit
import SwiftData

class ApplicationController: IPCController {
  var ipcHandler: IPCHandler?
  var modelContext: ModelContext?
  
  func setIpcHandler(_ ipcHandler: IPCHandler) {
    self.ipcHandler = ipcHandler
  }
  
  func setModelContext(_ modelContext: ModelContext) {
    return
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
    
    if event.type.hasPrefix("get-property") {
      handleGetProperty(event)
    }
    
    if event.type == "hide" {
      handleHide()
    }
    
    if event.type == "show" {
      handleShow()
    }
    
    if event.type == "quit" {
      handleQuit()
    }
    
    if event.type == "update-exclusion-zones" {
      handleUpdateExclusionZones(event)
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
  
  func handleGetProperty(_ event: IncomingIPCEvent) {
    guard let payload = event.payload, let key = payload["key"] as? String else {
      return
    }
    
    var value: String?
    
    switch key {
    case "bundleIdentifier":
      if let bundleIdentifier = Bundle.main.bundleIdentifier {
        value = bundleIdentifier
      }
    case "appName":
      if let appName = Bundle.main.object(forInfoDictionaryKey: "CFBundleName") as? String {
        value = appName
      }
    case "appVersion":
      if let appVersion = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String {
        value = appVersion
      }
    case "buildNumber":
      if let buildNumber = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String {
        value = buildNumber
      }
    default:
      value = "unknown"
    }
    
    if value != nil {
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["value": value]))
    } else {
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["value": "unknown"]))
    }
  }
  
  func handleShow() {
    NSApp.unhide(nil)
    NSApp.activate(ignoringOtherApps: true)
  }
  
  func handleHide() {
    NSApp.hide(nil)
  }
  
  func handleQuit() {
    NSApp.terminate(nil)
  }
  
  func handleUpdateExclusionZones(_ event: IncomingIPCEvent) {
    guard let payload = event.payload, let exclusionZones = payload["exclusionZones"] as? [[String: Double]] else {
      return
    }
    
    DispatchQueue.main.async {
      if let dragRegionView = NSApp.windows.first?.contentView?.subviews.first(where: {
        $0 is DragRegionView
      }) as? DragRegionView {
        dragRegionView.updateDragExclusionZones(dictArrayToCGRectArray(exclusionZones))
      }
    }
  }
}
