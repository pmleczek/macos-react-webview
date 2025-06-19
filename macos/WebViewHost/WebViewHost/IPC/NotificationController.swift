//
//  NotificationController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/19/25.
//

import UserNotifications

class NotificationController: NSObject, IPCController, UNUserNotificationCenterDelegate {
  var ipcHandler: IPCHandler?
  let notificationCenter = UNUserNotificationCenter.current()
  
  func setIpcHandler(_ ipcHandler: IPCHandler) {
    self.ipcHandler = ipcHandler
    self.notificationCenter.delegate = self
  }
  
  func handle(_ event: IncomingIPCEvent) -> Bool {
    if event.type == "request-permissions" {
      handleRequestPermissions(event)
    }
    
    if event.type == "get-permissions" {
      handleGetPermissions(event)
    }
    
    if event.type == "schedule" {
      handleSchedule(event)
    }
    
    return true
  }
  
  func handleRequestPermissions(_ event: IncomingIPCEvent) {
    self.notificationCenter.requestAuthorization(options: [.alert, .sound, .badge]) { granted, _ in
      self.ipcHandler?.emit("\(event.scope):\(event.type)", toJsonString(from: ["granted": granted]))
    }
  }
  
  func handleGetPermissions(_ event: IncomingIPCEvent) {
    self.notificationCenter.getNotificationSettings { settings in
      self.ipcHandler?.emit(
        "\(event.scope):\(event.type)",
        toJsonString(from: ["authorizationStatus": settings.authorizationStatus.rawValue])
      )
    }
  }
  
  func handleSchedule(_ event: IncomingIPCEvent) {
    guard let payload = event.payload else {
      return
    }
    
    var identifier: String
    if let id = payload["id"] as? String {
      identifier = id
    } else {
      let bundleIdentifier = Bundle.main.bundleIdentifier
      let uuid = UUID().uuidString
      identifier = "\(bundleIdentifier ?? "WebViewHost"):\(uuid)"
    }
    
    let content = UNMutableNotificationContent()
    if let title = payload["title"] as? String {
      content.title = title
    }
    if let subtitle = payload["subtitle"] as? String {
      content.subtitle = subtitle
    }
    if let body = payload["body"] as? String {
      content.body = body
    }
    
    var repeats = false
    if let payloadRepeats = payload["repeats"] as? Bool {
      repeats = payloadRepeats
    }
    
    var trigger: UNNotificationTrigger? = nil
    if let interval = payload["timeInterval"] as? Double {
      trigger = UNTimeIntervalNotificationTrigger(timeInterval: interval, repeats: repeats)
    } else if let payloadDate = payload["date"] as? [String: Int] {
      var date = DateComponents()
      
      if let year = payloadDate["year"] {
        date.year = year
      }
      if let month = payloadDate["month"] {
        date.month = month
      }
      if let day = payloadDate["day"] {
        date.day = day
      }
      if let hour = payloadDate["hour"] {
        date.hour = hour
      }
      if let minute = payloadDate["minute"] {
        date.minute = minute
      }
      if let second = payloadDate["second"] {
        date.second = second
      }
      if let weekday = payloadDate["weekday"] {
        date.weekday = weekday
      }
      
      trigger = UNCalendarNotificationTrigger(dateMatching: date, repeats: repeats)
    }
    
    let request = UNNotificationRequest(identifier: identifier, content: content, trigger: trigger)
    
    self.notificationCenter.add(request) { error in
      self.ipcHandler?.emit(
        "\(event.scope):\(event.type)",
        toJsonString(from: ["id": error != nil ? identifier : nil])
      )
    }
  }
}
