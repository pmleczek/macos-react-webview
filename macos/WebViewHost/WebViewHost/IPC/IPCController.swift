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
