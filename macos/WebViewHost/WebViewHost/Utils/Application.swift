//
//  AppUtils.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/26/25.
//

import AppKit

func dictToCGRect(_ dict: [String: Any]) -> CGRect? {
  guard let x = dict["x"] as? Double,
    let y = dict["y"] as? Double,
    let width = dict["width"] as? Double,
    let height = dict["height"] as? Double
  else {
    return nil
  }

  return CGRect(x: x, y: y, width: width, height: height)
}

func dictArrayToCGRectArray(_ dictArray: [[String: Any]]) -> [CGRect] {
  return dictArray.compactMap(dictToCGRect)
}

func buildMenu(_ appDelegate: AppDelegate) {
  let menu = NSMenu()
  NSApp.mainMenu = menu

  buildAppMenu(menu, appDelegate)
  buildWindowMenu(menu, appDelegate)
}

func buildAppMenu(_ menu: NSMenu, _ appDelegate: AppDelegate) {
  let appMenuItem = NSMenuItem()
  menu.addItem(appMenuItem)
  let appMenu = NSMenu()
  appMenuItem.submenu = appMenu

  appMenu.addItem(
    withTitle: "About \(WindowConstants.title)",
    action: #selector(NSApplication.orderFrontStandardAboutPanel(_:)), keyEquivalent: "")
  appMenu.addItem(NSMenuItem.separator())
  appMenu.addItem(
    withTitle: "Hide \(WindowConstants.title)", action: #selector(NSApplication.hide(_:)),
    keyEquivalent: "h")
  let hideOthersItem = NSMenuItem(
    title: "Hide Others",
    action: #selector(NSApplication.hideOtherApplications(_:)),
    keyEquivalent: "h"
  )
  hideOthersItem.keyEquivalentModifierMask = [.command, .option]
  appMenu.addItem(hideOthersItem)
  appMenu.addItem(NSMenuItem.separator())
  appMenu.addItem(
    withTitle: "Settings...", action: #selector(appDelegate.openSettings), keyEquivalent: ",")
  appMenu.addItem(NSMenuItem.separator())
  appMenu.addItem(
    withTitle: "Quit \(WindowConstants.title)", action: #selector(NSApplication.terminate(_:)),
    keyEquivalent: "q")
}

func buildWindowMenu(_ menu: NSMenu, _ appDelegate: AppDelegate) {
  let windowMenuItem = NSMenuItem()
  menu.addItem(windowMenuItem)
  let windowMenu = NSMenu(title: "Window")
  windowMenuItem.submenu = windowMenu

  windowMenu.addItem(
    withTitle: "Minimize", action: #selector(NSWindow.performMiniaturize(_:)), keyEquivalent: "m")
  windowMenu.addItem(
    withTitle: "Zoom", action: #selector(NSWindow.performZoom(_:)), keyEquivalent: "")

  windowMenu.addItem(NSMenuItem.separator())

  windowMenu.addItem(
    withTitle: "Bring All to Front",
    action: #selector(NSApplication.arrangeInFront(_:)),
    keyEquivalent: ""
  )

  NSApp.windowsMenu = windowMenu
}
