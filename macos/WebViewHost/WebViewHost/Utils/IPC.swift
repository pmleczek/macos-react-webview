//
//  Utils.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/19/25.
//

import Foundation

func jsonToDict(_ jsonString: String) -> [String: Any]? {
  guard let data = jsonString.data(using: .utf8) else {
    return nil
  }

  do {
    let object = try JSONSerialization.jsonObject(with: data, options: [])
    return object as? [String: Any]
  } catch {
    return nil
  }
}

func toJsonString(from object: Encodable) -> String {
  let encoder = JSONEncoder()

  do {
    let jsonData = try encoder.encode(object)
    if let jsonString = String(data: jsonData, encoding: .utf8) {
      return
        jsonString
        .replacingOccurrences(of: "\\", with: "\\\\")
        .replacingOccurrences(of: "\"", with: "\\\"")
        .replacingOccurrences(of: "'", with: "\\'")
    }
  } catch {
    return ""
  }

  return ""
}

func parseEvent(_ eventType: String) -> (scope: String, type: String)? {
  let parts = eventType.split(separator: ":", maxSplits: 1).map(String.init)

  guard parts.count == 2 else {
    return nil
  }

  return (scope: parts[0], type: parts[1])
}

func toJavaScript(_ eventType: String, _ payload: String) -> String {
  return """
    var event = new CustomEvent('webview-event', {
      detail: {
        type: '\(eventType)',
        payload: '\(payload)'
      }
    });
    window.dispatchEvent(event);
    """
}

func sendIPCResponse(_ event: IncomingIPCEvent, payload: (any Encodable)?) {
  if let payload {
    IPCHandler.shared.emit("\(event.scope):\(event.type)", toJsonString(from: payload))
  } else {
    IPCHandler.shared.emit("\(event.scope):\(event.type)")
  }
}

func sendIPCError(_ event: IncomingIPCEvent, error: String?) {
  if let error {
    IPCHandler.shared.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": error]))
  }
}
