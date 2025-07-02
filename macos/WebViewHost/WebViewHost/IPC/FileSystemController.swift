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
    
    if event.type == "read-file" {
      handleReadFile(event)
    }
    
    if event.type == "write-file" {
      handleWriteFile(event)
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
  
  func handleReadFile(_ event: IncomingIPCEvent) {
    guard let path = event.payload?["path"] as? String else {
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": "Path to the file hasn't been passed"]))
      return
    }
    
    do {
      let data = try Data(contentsOf: URL(filePath: path))
      let content = String(data: data, encoding: .utf8)
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["content": content]))
      
    } catch {
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": createErrorMessage(error)]))
    }
  }
  
  func handleWriteFile(_ event: IncomingIPCEvent) {
    guard let path = event.payload?["path"] as? String else {
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": "Path to the file hasn't been passed"]))
      return
    }
    
    guard let content = event.payload?["content"] as? String else {
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": "Content to write hasn't been passed"]))
      return
    }
    
    let options = event.payload?["options"] as? [String: Any]
    let append = options?["append"] as? Bool ?? false
    
    do {
      if append {
        if let fileHandle = FileHandle(forWritingAtPath: path) {
            defer { fileHandle.closeFile() }
            fileHandle.seekToEndOfFile()
            if let data = content.data(using: .utf8) {
                fileHandle.write(data)
            }
        }
      } else {
        try content.write(to: URL(fileURLWithPath: path), atomically: true, encoding: .utf8)
      }
      
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["result": true]))
    } catch {
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["error": createErrorMessage(error)]))
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
  
  private func createErrorMessage(_ error: Error) -> String {
      let nsError = error as NSError
      switch nsError.code {
      case NSFileNoSuchFileError:
          return "The file does not exist"
      case NSFileReadNoSuchFileError:
          return "Attempted to read a non-existent file"
      case NSFileWriteOutOfSpaceError:
          return "Not enough space available to write file"
      case NSFileWriteNoPermissionError:
          return "Insufficient permissions to write file"
      case NSFileReadInvalidFileNameError, NSFileWriteInvalidFileNameError:
          return "Invalid file name"
      case NSFileReadCorruptFileError:
          return "File is corrupted and cannot be read"
      default:
          return "(\(nsError.localizedDescription))"
      }
  }
}
