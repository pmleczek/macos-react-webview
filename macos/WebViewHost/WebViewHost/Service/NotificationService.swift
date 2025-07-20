//
//  NotificationService.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/13/25.
//

import UserNotifications

struct ScheduledNotification: Codable {
  let id: String
  let repeats: Bool

  init(id: String, repeats: Bool? = nil) {
    self.id = id
    self.repeats = repeats ?? false
  }
}

struct DisplayedNotification: Codable {
  let id: String
  let date: Double
}

class NotificationService: NSObject, UNUserNotificationCenterDelegate {
  let notificationCenter = UNUserNotificationCenter.current()

  static let shared = NotificationService()

  override private init() {
    super.init()
    notificationCenter.delegate = self
  }

  func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    didReceive response: UNNotificationResponse,
    withCompletionHandler completionHandler: @escaping () -> Void
  ) {
    let id = response.notification.request.identifier
    #if DEBUG
      print("Notification clicked (identifier: \(id))")
    #endif
    completionHandler()
  }

  func requestPermissions(completion: @escaping (Bool) -> Void) {
    notificationCenter.requestAuthorization(options: [.alert, .sound, .badge]) { granted, _ in
      completion(granted)
    }
  }

  func getPermissions(completion: @escaping (UNAuthorizationStatus) -> Void) {
    notificationCenter.getNotificationSettings { settings in
      completion(settings.authorizationStatus)
    }
  }

  func schedule(_ request: [String: Any]?, completion: @escaping (String?) -> Void) {
    guard let request else {
      completion(nil)
      return
    }

    var identifier: String
    if let id = request["id"] as? String {
      identifier = id
    } else {
      let bundleIdentifier = Bundle.main.bundleIdentifier
      let uuid = UUID().uuidString
      identifier = "\(bundleIdentifier ?? "WebViewHost"):\(uuid)"
    }

    let content = UNMutableNotificationContent()
    if let title = request["title"] as? String {
      content.title = title
    }
    if let subtitle = request["subtitle"] as? String {
      content.subtitle = subtitle
    }
    if let body = request["body"] as? String {
      content.body = body
    }

    let repeats = request["repeats"] as? Bool ?? false

    var trigger: UNNotificationTrigger?
    if let interval = request["timeInterval"] as? Double {
      trigger = UNTimeIntervalNotificationTrigger(timeInterval: interval, repeats: repeats)
    } else if let payloadDate = request["date"] as? [String: Int] {
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

    let notificationRequest = UNNotificationRequest(
      identifier: identifier, content: content, trigger: trigger)
    notificationCenter.add(notificationRequest) { error in
      completion(error == nil ? identifier : nil)
    }
  }

  func getScheduled(completion: @escaping ([ScheduledNotification]) -> Void) {
    notificationCenter.getPendingNotificationRequests { requests in
      let scheduled = requests.map {
        ScheduledNotification(id: $0.identifier, repeats: $0.trigger?.repeats ?? false)
      }
      completion(scheduled)
    }
  }

  func getDisplayed(completion: @escaping ([DisplayedNotification]) -> Void) {
    notificationCenter.getDeliveredNotifications { notifications in
      let displayed = notifications.map {
        DisplayedNotification(id: $0.request.identifier, date: $0.date.timeIntervalSince1970 * 1000)
      }
      completion(displayed)
    }
  }

  func cancelAllScheduled() {
    notificationCenter.removeAllPendingNotificationRequests()
  }

  func dismissAllDisplayed() {
    notificationCenter.removeAllDeliveredNotifications()
  }

  func cancelScheduled(_ ids: [String]) {
    notificationCenter.removePendingNotificationRequests(withIdentifiers: ids)
  }

  func dismissDisplayed(_ ids: [String]) {
    notificationCenter.removeDeliveredNotifications(withIdentifiers: ids)
  }
}
