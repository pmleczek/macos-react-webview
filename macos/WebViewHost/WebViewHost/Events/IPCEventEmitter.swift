//
//  IPCEventEmitter.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/20/25.
//

import SwiftUI

class IPCEventEmitter: ObservableObject {
  var webViewModel: WebViewModel? = nil
  
  func setWebViewModel(_ webViewModel: WebViewModel) {
    self.webViewModel = webViewModel
  }
  
  func emit(_ eventType: String, _ payload: [String: Any?]?) {
    guard self.webViewModel != nil else {
      return
    }
    
    let javaScript = toJavaScript(eventType)
    self.webViewModel?.onSendValueFromNative.send(javaScript)
  }
  
  private func toJavaScript(_ eventType: String) -> String {
    return "var event = new CustomEvent('webview-event', { 'detail': { 'type': '\(eventType)', 'payload': {} } }); window.dispatchEvent(event)"
  }
}
