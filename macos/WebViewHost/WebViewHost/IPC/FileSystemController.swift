//
//  FileSystemController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/29/25.
//

import AppKit
import UniformTypeIdentifiers

class FileSystemController: IPCController {
  var ipcHandler: IPCHandler?
  
  func setIpcHandler(_ ipcHandler: IPCHandler) {
    self.ipcHandler = ipcHandler
  }
  
  func handle(_ event: IncomingIPCEvent) -> Bool {
    if event.scope != "filesystem" {
      return false
    }
    
    if event.type == "open-dialog" {
      handleOpenDialog(event)
    }
    
    if event.type == "open-save-dialog" {
      handleOpenSaveDialog(event)
    }
    
    return true
  }
  
  func handleOpenDialog(_ event: IncomingIPCEvent) {
    let panel = NSOpenPanel()
    
    let payload = event.payload ?? [:]
    let options = payload["options"] as? [String: Any] ?? [:]
    
    panel.title = options["title"] as? String ?? "Select"
    panel.canChooseFiles = (options["files"] as? Bool) ?? true
    panel.canChooseDirectories = (options["directories"] as? Bool) ?? true
    panel.allowsMultipleSelection = (options["multipleSelection"] as? Bool) ?? true
    
    panel.begin { [weak self] response in
      guard let self = self else { return }
      
      if response == .OK {
        let paths = panel.urls.map(\.path)
        self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["result": paths]))
      } else {
        self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["result": [] as! [String]]))
      }
    }
  }
  
  func handleOpenSaveDialog(_ event: IncomingIPCEvent) {
    let panel = NSSavePanel()
    
    let payload = event.payload ?? [:]
    let options = payload["options"] as? [String: Any] ?? [:]
    
    panel.title = options["title"] as? String ?? "Save"
    panel.nameFieldStringValue = options["defaultName"] as? String ?? ""
    panel.allowsOtherFileTypes = options["otherFileTypes"] as? Bool ?? false
    panel.canCreateDirectories = options["canCreateDirectories"] as? Bool ?? true
    panel.showsContentTypes = options["showTypes"] as? Bool ?? true
    
    if let allowedTypes = options["allowedTypes"] as? [String] {
      panel.allowedContentTypes = allowedTypes.compactMap(self.toUTType)
    }
    
    panel.begin { [weak self] response in
      guard let self = self else { return }
      
      if response == .OK, let url = panel.url {
        self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["result": url.path]))
      } else {
        self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["result": ""]))
      }
    }
  }
  
  private let typeMapping: [String: UTType] = [
      "pdf": .pdf,
      "gif": .gif,
      "js": .javaScript,
      "jpeg": .jpeg,
      "png": .png,
      "txt": .plainText,
  ]
  
  private func toUTType(_ string: String) -> UTType? {
    if self.typeMapping[string] != nil {
      return self.typeMapping[string]
    }
    
    return nil
  }
}
