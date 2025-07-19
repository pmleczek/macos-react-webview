//
//  NotificationController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/19/25.
//

class NotificationController: IPCController {
  override func handle(_ event: IncomingIPCEvent) -> Bool {
    if event.scope != "notification" {
      return false
    }
    
    switch event.type {
    case NotificationEvent.RequestPermissions:
      NotificationService.shared.requestPermissions { granted in
        sendIPCResponse(event, payload:  ["granted": granted])
      }
      
    case NotificationEvent.GetPermissions:
      NotificationService.shared.getPermissions { status in
        sendIPCResponse(event, payload: ["authorizationStatus": status.rawValue])
      }
      
    case NotificationEvent.Schedule:
      NotificationService.shared.schedule(event.payload) { id in
        sendIPCResponse(event, payload: ["id": id])
      }
      
    case NotificationEvent.GetScheduled:
      NotificationService.shared.getScheduled { notifications in
        sendIPCResponse(event, payload: notifications)
      }
      
    case NotificationEvent.GetDisplayed:
      NotificationService.shared.getDisplayed { notifications in
        sendIPCResponse(event, payload: notifications)
      }
      
    case NotificationEvent.CancelAllScheduled:
      NotificationService.shared.cancelAllScheduled()
      
    case NotificationEvent.DismissAllDisplayed:
      NotificationService.shared.dismissAllDisplayed()
      
    case NotificationEvent.CancelScheduled:
      if let ids = event.payload?["ids"] as? [String] {
        NotificationService.shared.cancelScheduled(ids)
      }
    
    case NotificationEvent.DismissDisplayed:
      if let ids = event.payload?["ids"] as? [String] {
        NotificationService.shared.dismissDisplayed(ids)
      }
      
    default:
      break
    }
    
    return true
  }
}
