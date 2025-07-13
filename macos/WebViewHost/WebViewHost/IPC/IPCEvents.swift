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

struct FileSystemEvent {
  static let OpenDialog = "open-dialog"
  static let OpenSaveDialog = "open-save-dialog"
  static let ReadFile = "read-file"
  static let WriteFile = "write-file"
  static let ReadDirectory = "read-directory"
  static let MakeDirectory = "make-directory"
  static let Move = "move"
  static let Copy = "copy"
  static let Remove = "remove"
  static let GetInfo = "get-info"
}

struct NotificationEvent {
  static let RequestPermissions = "request-permissions"
  static let GetPermissions = "get-permissions"
  static let Schedule = "schedule"
  static let GetScheduled = "get-scheduled"
  static let GetDisplayed = "get-displayed"
  static let CancelAllScheduled = "cancel-all-scheduled"
  static let DismissAllDisplayed = "dismiss-all-displayed"
  static let CancelScheduled = "cancel-scheduled"
  static let DismissDisplayed = "dismiss-displayed"
}
