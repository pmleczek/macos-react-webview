//
//  ReactWebView.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/12/25.
//

import Combine
import SwiftUI
import WebKit

struct ReactWebView: NSViewRepresentable, WebViewDelegate {
  @EnvironmentObject var ipcHandler: IPCHandler
  @Environment(\.modelContext) private var modelContext
  @ObservedObject var viewModel: WebViewModel
  
  func makeNSView(context: Context) -> WKWebView {
    ipcHandler.setModelContext(modelContext)
    ipcHandler.setViewModel(viewModel)
    
    let preferences = WKWebpagePreferences()
    preferences.allowsContentJavaScript = true
    
    let configuration = WKWebViewConfiguration()
    configuration.defaultWebpagePreferences = preferences
    configuration.userContentController.add(self.makeCoordinator(), name: "ipc")
    
    let webView = WKWebView(frame: .zero, configuration: configuration)
    webView.navigationDelegate = context.coordinator
    webView.allowsBackForwardNavigationGestures = false
    webView.configuration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
    webView.configuration.setValue(true, forKey: "allowUniversalAccessFromFileURLs")
    
    webView.setValue(false, forKey: "drawsBackground")
    
    // TODO: remove later
    webView.configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")
    webView.isInspectable = true
    
#if !DEBUG
    webView.loadHTMLString("", baseURL: nil)
#endif
    
    return webView
  }
  
  func updateNSView(_ nsView: WKWebView, context: Context) {
#if DEBUG
    guard let url = URL(string: WebViewConstants.DEV_SERVER_URL) else {
      return
    }
    
    let request = URLRequest(url: url)
    nsView.load(request)
#else
    guard let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "dist") else {
      return
    }
    
    nsView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
#endif // DEBUG
  }
  
  func onEventReceived(_ payload: String) {
    ipcHandler.handle(payload)
  }
  
  func makeCoordinator() -> Coordinator {
    Coordinator(self)
  }
  
  class Coordinator: NSObject, WKNavigationDelegate {
    var parent: ReactWebView
    var delegate: WebViewDelegate?
    var onSendValueFromNative: AnyCancellable? = nil
    
    init(_ nsView: ReactWebView) {
      self.parent = nsView
      self.delegate = nsView
    }
    
    deinit {
      onSendValueFromNative?.cancel()
    }
    
    func webView(_ webView: WKWebView, didFinish: WKNavigation!) {
      self.onSendValueFromNative = self.parent.viewModel.onSendValueFromNative
        .receive(on: RunLoop.main)
        .sink(receiveValue: { value in
          webView.evaluateJavaScript(value)
        })
    }
  }
}

extension ReactWebView.Coordinator: WKScriptMessageHandler {
  func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    if message.name == WebViewConstants.IPC_MESSAGE_NAME {
      delegate?.onEventReceived(message.body as! String)
    }
  }
}
