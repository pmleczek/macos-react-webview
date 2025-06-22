//
//  ReactWebView.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/13/25.
//

import Cocoa
import WebKit
import Combine

struct WebViewConstants {
  static let controllerName: String = "ipc"
  static let devServerUrl: String = "http://localhost:5173/"
}


class WebViewModel: ObservableObject {
  var onSendValueFromNative = PassthroughSubject<String, Never>()
}

class ReactWebView: NSView, WKNavigationDelegate, WKScriptMessageHandler {
  private var webView: WKWebView!
  private var viewModel: WebViewModel
  private var onSendValueFromNative: AnyCancellable?
  private var ipcHandler: IPCHandler?
  
  init(frame: NSRect, viewModel: WebViewModel, ipcHandler: IPCHandler) {
    self.viewModel = viewModel
    super.init(frame: frame)
    
    self.ipcHandler = ipcHandler
    self.ipcHandler?.setViewModel(self.viewModel)
    
    let preferences = WKWebpagePreferences()
    preferences.allowsContentJavaScript = true
       
    let configuration = WKWebViewConfiguration()
    configuration.defaultWebpagePreferences = preferences
    configuration.userContentController.add(self, name: WebViewConstants.controllerName)
    
    webView = WKWebView(frame: self.bounds, configuration: configuration)
    webView.navigationDelegate = self
    webView.autoresizingMask = [.width, .height]
    webView.setValue(false, forKey: "drawsBackground")
    
    webView.configuration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
    webView.configuration.setValue(true, forKey: "allowUniversalAccessFromFileURLs")
    
    webView.configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")
    webView.isInspectable = true
    
    addSubview(webView)
    
#if DEBUG
    if let url = URL(string: WebViewConstants.devServerUrl) {
      webView.load(URLRequest(url: url))
    }
#else
    if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "dist") {
      webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
    }
#endif // DEBUG
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
      onSendValueFromNative = viewModel.onSendValueFromNative
          .receive(on: RunLoop.main)
          .sink { [weak webView] value in
              webView?.evaluateJavaScript(value)
          }
    
      let theme = UserDefaults.standard.string(forKey: "preferredTheme")
      if theme == "dark" {
        webView.evaluateJavaScript("document.documentElement.setAttribute('dark', 'true');")
      } else if theme == "system" {
        webView.evaluateJavaScript("document.documentElement.setAttribute('dark', String(window.matchMedia('(prefers-color-scheme: dark)').matches));")
      }
  }
  
  func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    if message.name == WebViewConstants.controllerName,
      let payload = message.body as? String {
        self.ipcHandler?.handle(payload)
      }
    }
}
