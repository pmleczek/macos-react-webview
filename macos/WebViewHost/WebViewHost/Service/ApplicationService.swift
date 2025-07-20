//
//  ApplicationService.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/5/25.
//

import AppKit

class ApplicationService {
  static func getTheme() -> String {
    return UserDefaults.standard.string(forKey: "preferredTheme") ?? "system"
  }

  static func setTheme(_ theme: String) -> String {
    if let window = NSApp.windows.first {
      let darkMode =
        theme == "dark"
        || (theme == "system"
          && UserDefaults.standard.string(forKey: "AppleInterfaceStyle") == "Dark")
      if darkMode {
        window.backgroundColor = WindowConstants.darkWindowBackgroundColor
      } else {
        window.backgroundColor = WindowConstants.backgroundColor
      }
    }

    UserDefaults.standard.set(theme, forKey: "preferredTheme")

    return UserDefaults.standard.string(forKey: "preferredTheme") ?? "system"
  }

  static func getProperty(for key: String) -> String {
    var value = "Error reading property"

    switch key {
    case "bundleIdentifier":
      if let bundleIdentifier = Bundle.main.bundleIdentifier {
        return bundleIdentifier
      }
    case "appName":
      if let appName = Bundle.main.object(forInfoDictionaryKey: "CFBundleName") as? String {
        return appName
      }
    case "appVersion":
      if let appVersion = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString")
        as? String {
        return appVersion
      }
    case "buildNumber":
      if let buildNumber = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String {
        return buildNumber
      }
    default:
      value = "Unknown property"
    }

    return value
  }

  static func updateExclusionZones(_ exclusionZones: [[String: Double]]) {
    DispatchQueue.main.async {
      if let dragRegionView = NSApp.windows.first?.contentView?.subviews.first(where: {
        $0 is DragRegionView
      }) as? DragRegionView {
        dragRegionView.updateDragExclusionZones(dictArrayToCGRectArray(exclusionZones))
      }
    }
  }

  static func hideApplication() {
    NSApp.hide(nil)
  }

  static func showApplication() {
    NSApp.unhide(nil)
    NSApp.activate(ignoringOtherApps: true)
  }

  static func quitApplication() {
    NSApp.terminate(nil)
  }
}
