//
//  IPCHandler.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/15/25.
//

import Foundation

struct IncomingIPCEvent {
  let scope: String
  let type: String
  let payload: [String: Any]?
}

class IPCHandler: ObservableObject {
  static let shared = IPCHandler()

  private var viewModel: WebViewModel?

  private var controllers: [IPCController] = [
    ApplicationController(),
    ClipboardController(),
    DataController(),
    FileSystemController(),
    NotificationController(),
  ]

  func setViewModel(_ viewModel: WebViewModel) {
    self.viewModel = viewModel
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
      let payload = eventDict["payload"] as? [String: Any]
      let incomingEvent = IncomingIPCEvent(scope: scope, type: type, payload: payload)

      for controller in controllers where controller.handle(incomingEvent) {
        break
      }
    }
  }
}
