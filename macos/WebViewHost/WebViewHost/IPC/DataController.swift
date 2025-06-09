//
//  DataController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/8/25.
//

import SwiftData

class DataController: IPCController {
  var ipcHandler: IPCHandler?
  var modelContext: ModelContext?
  var spaceService: SpaceService?
  
  func setIpcHandler(_ ipcHandler: IPCHandler) {
    self.ipcHandler = ipcHandler
  }
  
  func setModelContext(_ modelContext: ModelContext) {
    self.modelContext = modelContext
    self.spaceService = SpaceService(context: modelContext)
  }
  
  func handle(_ event: IncomingIPCEvent) -> Bool {
    if (event.type == "get-spaces") {
      handleGetSpaces(event)
    }
    
    return true
  }
  
  func handleGetSpaces(_ event: IncomingIPCEvent) {
    guard let service = self.spaceService else {
      return
    }
    
    let serviceResponse = service.getSpaces()
    guard serviceResponse.isSuccessful, let data = serviceResponse.data else {
      return
    }
    
    ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: data))
  }
}

