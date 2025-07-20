//
//  ClipboardService.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/6/25.
//

import AppKit

class ClipboardService {
  static func clear() {
    NSPasteboard.general.clearContents()
  }

  static func readText() -> String {
    return NSPasteboard.general.string(forType: .string) ?? ""
  }

  static func writeText(_ text: String) {
    NSPasteboard.general.clearContents()
    NSPasteboard.general.setString(text, forType: .string)
  }

  static func readImage() -> [UInt8] {
    if let pngData = getPasteboardImageData() {
      let byteArray = [UInt8](pngData)
      return byteArray
    }

    return []
  }

  static func writeImage(_ image: [UInt8]) {
    let imageData = Data(image)

    guard let nsImage = NSImage(data: imageData) else {
      return
    }

    NSPasteboard.general.clearContents()
    NSPasteboard.general.writeObjects([nsImage])
  }

  static func readImageBase64() -> String {
    if let pngData = getPasteboardImageData() {
      let base64String = pngData.base64EncodedString()
      return base64String
    }

    return ""
  }

  static func writeImageBase64(_ image: String) {
    var imageData = image

    if let commaPos = image.firstIndex(of: ",") {
      let dataStartPos = image.index(after: commaPos)
      imageData = String(image[dataStartPos...])
    }

    guard let data = Data(base64Encoded: imageData),
      let nsImage = NSImage(data: data)
    else {
      return
    }

    NSPasteboard.general.clearContents()
    NSPasteboard.general.writeObjects([nsImage])
  }

  private static func getPasteboardImageData() -> Data? {
    guard
      let imageData = NSPasteboard.general.data(forType: .png)
        ?? NSPasteboard.general.data(forType: .tiff),
      let nsImage = NSImage(data: imageData)
    else {
      return nil
    }

    guard let tiffRepresentation = nsImage.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiffRepresentation),
      let pngData = bitmap.representation(using: .png, properties: [:])
    else {
      return nil
    }

    return pngData
  }
}
