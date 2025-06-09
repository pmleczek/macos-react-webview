//
//  IPCHandler.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/1/25.
//

import Foundation
import SwiftData

struct IncomingIPCEvent {
  let scope: String
  let type: String
  let payload: String?
}

class IPCHandler: ObservableObject {
  private var modelContext: ModelContext? = nil
  private var viewModel: WebViewModel? = nil
  
  private var controllers: [IPCController] = [
    DataController()
  ]
  
  func setModelContext(_ modelContext: ModelContext) {
    self.modelContext = modelContext
    for controller in controllers {
      controller.setModelContext(modelContext)
    }
  }
  
  func setViewModel(_ viewModel: WebViewModel) {
    self.viewModel = viewModel
    for controller in controllers {
      controller.setIpcHandler(self)
    }
  }
  
  func emit(_ event: String, _ payload: String = "{}") {
    guard self.viewModel != nil else {
      return
    }
    
    let javaScript = toJavaScript(event, payload)
    self.viewModel?.onSendValueFromNative.send(javaScript)
  }
  
  func handle(_ event: String) {
    guard let eventDict = jsonToDict(event), let eventType = eventDict["type"] as? String else {
      return
    }
    
    if let (scope, type) = parseEvent(eventType) {
      let payload = eventDict["payload"] as? String
      let incomingEvent = IncomingIPCEvent(scope: scope, type: type, payload: payload)
      for controller in controllers {
        if controller.handle(incomingEvent) {
          break
        }
      }
    }
  }
}
