//
//  ApplicationController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/21/25.
//

import AppKit
import SwiftData

class ApplicationController: BaseIPCController {
  override func handle(_ event: IncomingIPCEvent) -> Bool {
    if event.scope != "application" {
      return false
    }
    
    switch event.type {
    case "get-theme":
      handleGetTheme(event)
    case "set-theme":
      handleSetTheme(event)
    case "hide":
      ApplicationService.hideApplication()
    case "show":
      ApplicationService.showApplication()
    case "quit":
      ApplicationService.quitApplication()
    case "update-exclusion-zones":
      handleUpdateExclusionZones(event)
    case let x where x.hasPrefix("get-property"):
      handleGetProperty(event)
    default:
      break
    }
    
    return true
  }
  
  func handleGetTheme(_ event: IncomingIPCEvent) {
    let theme = ApplicationService.getTheme()
    self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["theme": theme]))
  }
  
  func handleSetTheme(_ event: IncomingIPCEvent) {
    guard let payload = event.payload, let theme = payload["theme"] as? String else {
      return
    }
    
    let result = ApplicationService.setTheme(theme)
    self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["theme": result]))
  }
  
  func handleGetProperty(_ event: IncomingIPCEvent) {
    guard let payload = event.payload, let key = payload["key"] as? String else {
      return
    }
    
    let value = ApplicationService.getProperty(for: key)
    self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["value": value]))
  }
  
  func handleUpdateExclusionZones(_ event: IncomingIPCEvent) {
    guard let payload = event.payload, let exclusionZones = payload["exclusionZones"] as? [[String: Double]] else {
      return
    }
    
    ApplicationService.updateExclusionZones(exclusionZones)
  }
}
