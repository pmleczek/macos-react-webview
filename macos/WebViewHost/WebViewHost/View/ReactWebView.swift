//
//  ReactWebView.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/13/25.
//

import Cocoa
import Combine
import WebKit

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

  init(frame: NSRect, viewModel: WebViewModel) {
    self.viewModel = viewModel
    super.init(frame: frame)

    IPCHandler.shared.setViewModel(self.viewModel)

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
      if let url = Bundle.main.url(
        forResource: "index", withExtension: "html", subdirectory: "dist") {
        webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
      }
    #endif  // DEBUG
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
      webView.evaluateJavaScript(
        // swiftlint:disable:next line_length
        "document.documentElement.setAttribute('dark', String(window.matchMedia('(prefers-color-scheme: dark)').matches));"
      )
    }
  }

  func userContentController(
    _ userContentController: WKUserContentController, didReceive message: WKScriptMessage
  ) {
    if message.name == WebViewConstants.controllerName, let payload = message.body as? String {
      IPCHandler.shared.handle(payload)
    }
  }

  override var acceptsFirstResponder: Bool {
    return true
  }

  override func becomeFirstResponder() -> Bool {
    return webView.becomeFirstResponder()
  }

  override func performKeyEquivalent(with event: NSEvent) -> Bool {
    if event.modifierFlags.contains(.command),
      let key = event.charactersIgnoringModifiers?.lowercased() {
      switch key {
      case "a":
        webView.perform(#selector(NSText.selectAll(_:)))
        return true
      case "v":
        webView.perform(#selector(NSText.paste(_:)))
        return true
      case "c":
        webView.perform(#selector(NSText.copy(_:)))
        return true
      case "x":
        webView.perform(#selector(NSText.cut(_:)))
        return true
      case "k":
        IPCHandler.shared.emit("application:search")
        return true
      default:
        break
      }
    }

    if event.charactersIgnoringModifiers == "\u{1B}" {
      IPCHandler.shared.emit("application:escape")
      return true
    }

    return super.performKeyEquivalent(with: event)
  }
}
