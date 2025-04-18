//
//  ReactWebView.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/12/25.
//

import SwiftUI
import WebKit

struct ReactWebView: NSViewRepresentable {
  func makeNSView(context: Context) -> WKWebView {
    let preferences = WKWebpagePreferences()
    preferences.allowsContentJavaScript = true
    
    let configuration = WKWebViewConfiguration()
    configuration.defaultWebpagePreferences = preferences
    
    let webView = WKWebView(frame: .zero, configuration: configuration)
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
}
