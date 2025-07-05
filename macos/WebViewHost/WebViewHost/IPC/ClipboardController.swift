//
//  ClipboardController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/23/25.
//

import AppKit
import SwiftData

class ClipboardController: IPCController {
  var ipcHandler: IPCHandler?
  var modelContext: ModelContext?
  
  func setIpcHandler(_ ipcHandler: IPCHandler) {
    self.ipcHandler = ipcHandler
  }
  
  func setModelContext(_ modelContext: ModelContext) {
    return
  }
  
  func handle(_ event: IncomingIPCEvent) -> Bool {
    if event.scope != "clipboard" {
      return false
    }
    
    if event.type == "clear" {
      handleClear()
    }
    
    if event.type == "read-text" {
      handleReadText(event)
    }
    
    if event.type == "write-text" {
      handleWriteText(event)
    }
    
    if event.type == "read-image" {
      handleReadImage(event)
    }
    
    if event.type == "write-image" {
      handleWriteImage(event)
    }
    
    if event.type == "read-image-base64" {
      handleReadImageBase64(event)
    }
    
    if event.type == "write-image-base64" {
      handleWriteImageBase64(event)
    }
    
    return true
  }
  
  func handleClear() {
    NSPasteboard.general.clearContents()
  }
  
  func handleReadText(_ event: IncomingIPCEvent) {
    let text = NSPasteboard.general.string(forType: .string) ?? ""
    self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["text": text]))
  }
  
  func handleWriteText(_ event: IncomingIPCEvent) {
    guard let payload = event.payload, let text = payload["text"] as? String else {
      return
    }
    
    NSPasteboard.general.clearContents()
    NSPasteboard.general.setString(text, forType: .string)
  }
  
  func handleReadImage(_ event: IncomingIPCEvent) {
    guard let imageData = NSPasteboard.general.data(forType: .png) ?? NSPasteboard.general.data(forType: .tiff),
          let nsImage = NSImage(data: imageData) else {
      ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["image": ""]))
      return
    }
    
    guard let tiffRepresentation = nsImage.tiffRepresentation,
          let bitmap = NSBitmapImageRep(data: tiffRepresentation),
          let pngData = bitmap.representation(using: .png, properties: [:]) else {
      ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["image": ""]))
      return
    }
    
    let byteArray = [UInt8](pngData)
    ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["image": byteArray]))
  }
  
  func handleWriteImage(_ event: IncomingIPCEvent) {
    guard let payload = event.payload,
          let array = payload["image"] as? [UInt8] else {
      return
    }
    
    let imageData = Data(array)
    
    guard let nsImage = NSImage(data: imageData) else {
      return
    }
    
    NSPasteboard.general.clearContents()
    NSPasteboard.general.writeObjects([nsImage])
  }
  
  func handleReadImageBase64(_ event: IncomingIPCEvent) {
    guard let imageData = NSPasteboard.general.data(forType: .png) ?? NSPasteboard.general.data(forType: .tiff),
          let nsImage = NSImage(data: imageData) else {
      ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["image": ""]))
      return
    }
    
    guard let tiffRepresentation = nsImage.tiffRepresentation,
          let bitmap = NSBitmapImageRep(data: tiffRepresentation),
          let pngData = bitmap.representation(using: .png, properties: [:]) else {
      ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["image": ""]))
      return
    }
    
    let base64String = pngData.base64EncodedString()
    ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["image": base64String]))
  }
  
  func handleWriteImageBase64(_ event: IncomingIPCEvent) {
    guard let payload = event.payload,
          var data = payload["image"] as? String else {
      return
    }
    
    if let commaPos = data.firstIndex(of: ",") {
      let dataStartPos = data.index(after: commaPos)
      data = String(data[dataStartPos...])
    }
    
    guard let imageData = Data(base64Encoded: data),
          let nsImage = NSImage(data: imageData) else {
      return
    }
    
    NSPasteboard.general.clearContents()
    NSPasteboard.general.writeObjects([nsImage])
  }
}
