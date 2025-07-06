//
//  IPCEvents.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/6/25.
//

struct ApplicationEvent {
  static let GetTheme = "get-theme"
  static let SetTheme = "set-theme"
  static let UpdateExclusionZones = "update-exclusion-zones"
  static let GetPropertyPrefix = "get-property"
  static let Hide = "hide"
  static let Show = "show"
  static let Quit = "quit"
}

struct ClipboardEvent {
  static let Clear = "clear"
  static let ReadText = "read-text"
  static let WriteText = "write-text"
  static let ReadImage = "read-image"
  static let WriteImage = "write-image"
  static let ReadImageBase64 = "read-image-base64"
  static let WriteImageBase64 = "write-image-base64"
}
