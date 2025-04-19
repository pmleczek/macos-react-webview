//
//  ReactWebView.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/12/25.
//

import SwiftUI
import WebKit

struct ReactWebView: NSViewRepresentable, WebViewDelegate {
  func makeNSView(context: Context) -> WKWebView {
    let preferences = WKWebpagePreferences()
    preferences.allowsContentJavaScript = true
    
    let configuration = WKWebViewConfiguration()
    configuration.defaultWebpagePreferences = preferences
    configuration.userContentController.add(self.makeCoordinator(), name: "ipc")
    
    let webView = WKWebView(frame: .zero, configuration: configuration)
    webView.navigationDelegate = context.coordinator
    webView.allowsBackForwardNavigationGestures = false
    webView.configuration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
    // TODO: remove later
    webView.configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")
    webView.isInspectable = true
    
    return webView
  }
  
  func updateNSView(_ nsView: WKWebView, context: Context) {
    guard let url = URL(string: WebViewConstants.DEV_SERVER_URL) else {
      return
    }
    
    let request = URLRequest(url: url)
    nsView.load(request)
  }
  
  func onEventReceived(value: String) {
    print("Received event from WebView app: \(value)")
  }
  
  func makeCoordinator() -> Coordinator {
    Coordinator(self)
  }
  
  class Coordinator: NSObject, WKNavigationDelegate {
    var parent: ReactWebView
    var delegate: WebViewDelegate?
    
    init(_ nsView: ReactWebView) {
      self.parent = nsView
      self.delegate = nsView
    }
  }
}

extension ReactWebView.Coordinator: WKScriptMessageHandler {
  func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    if message.name == WebViewConstants.IPC_MESSAGE_NAME {
      delegate?.onEventReceived(value: message.body as! String)
    }
  }
}
