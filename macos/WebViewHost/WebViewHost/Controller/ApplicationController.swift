//
//  ApplicationController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/21/25.
//

class ApplicationController: BaseIPCController {
  override func handle(_ event: IncomingIPCEvent) -> Bool {
    if event.scope != "application" {
      return false
    }
    
    switch event.type {
    case ApplicationEvent.GetTheme:
      let theme = ApplicationService.getTheme()
      sendIPCResponse(event, payload: ["theme": theme])

    case ApplicationEvent.SetTheme:
      if let theme = event.payload?["theme"] as? String {
        let result = ApplicationService.setTheme(theme)
        sendIPCResponse(event, payload: ["theme": result])
      }

    case ApplicationEvent.UpdateExclusionZones:
      if let exclusionZones = event.payload?["exclusionZones"] as? [[String: Double]] {
        ApplicationService.updateExclusionZones(exclusionZones)
      }

    case let x where x.hasPrefix(ApplicationEvent.GetPropertyPrefix):
      if let key = event.payload?["key"] as? String {
        let value = ApplicationService.getProperty(for: key)
        sendIPCResponse(event, payload: ["value": value])
      }
      
    case ApplicationEvent.Hide:
      ApplicationService.hideApplication()

    case ApplicationEvent.Show:
      ApplicationService.showApplication()

    case ApplicationEvent.Quit:
      ApplicationService.quitApplication()

    default:
      break
    }
    
    return true
  }
}
