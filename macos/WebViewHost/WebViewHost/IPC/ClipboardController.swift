//
//  ClipboardController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/23/25.
//

class ClipboardController: BaseIPCController {
  override func handle(_ event: IncomingIPCEvent) -> Bool {
    if event.scope != "clipboard" {
      return false
    }
    
    switch event.type {
    case ClipboardEvent.Clear:
      ClipboardService.clear()
      
    case ClipboardEvent.ReadText:
      let text = ClipboardService.readText()
      sendIPCResponse(event, payload: ["text": text])
      
    case ClipboardEvent.WriteText:
      if let text = event.payload?["text"] as? String {
        ClipboardService.writeText(text)
      }
      
    case ClipboardEvent.ReadImage:
      let image = ClipboardService.readImage()
      sendIPCResponse(event, payload: ["image": image])
      
    case ClipboardEvent.WriteImage:
      if let image = event.payload?["image"] as? [UInt8] {
        ClipboardService.writeImage(image)
      }
      
    case ClipboardEvent.ReadImageBase64:
      let image = ClipboardService.readImageBase64()
      sendIPCResponse(event, payload: ["image": image as String])
      
    case ClipboardEvent.WriteImageBase64:
      if let image = event.payload?["image"] as? String {
        ClipboardService.writeImageBase64(image)
      }
      
    default:
      break
    }
    
   
    return true
  }
}
