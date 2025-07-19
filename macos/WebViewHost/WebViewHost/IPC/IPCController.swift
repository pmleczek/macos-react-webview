//
//  IPCController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/19/25.
//

import SwiftData

protocol IPCControllerBase {
  var modelContext: ModelContext? { get }
  
  func setModelContext(_ modelContext: ModelContext)
  
  func handle(_ event: IncomingIPCEvent) -> Bool
}

class IPCController: IPCControllerBase {
  var modelContext: ModelContext?
  
  func setModelContext(_ modelContext: ModelContext) {
    return
  }
  
  func handle(_ event: IncomingIPCEvent) -> Bool {
    return true
  }
}

class DataIPCController: IPCControllerBase {
  var modelContext: ModelContext?
  
  func setModelContext(_ modelContext: ModelContext) {
    self.modelContext = modelContext
  }
  
  func handle(_ event: IncomingIPCEvent) -> Bool {
    return true
  }
}
