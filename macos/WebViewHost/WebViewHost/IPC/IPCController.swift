//
//  IPCController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/19/25.
//

import SwiftData

protocol IPCController {
  var ipcHandler: IPCHandler? { get }
  var modelContext: ModelContext? { get }
  
  func setIpcHandler(_ ipcHandler: IPCHandler)
  func setModelContext(_ modelContext: ModelContext)
  
  func handle(_ event: IncomingIPCEvent) -> Bool
}

class BaseIPCController: IPCController {
  var ipcHandler: IPCHandler?
  var modelContext: ModelContext?
  
  func setIpcHandler(_ ipcHandler: IPCHandler) {
    self.ipcHandler = ipcHandler
  }
  
  func setModelContext(_ modelContext: ModelContext) {
    return
  }
  
  func handle(_ event: IncomingIPCEvent) -> Bool {
    return true
  }
}
