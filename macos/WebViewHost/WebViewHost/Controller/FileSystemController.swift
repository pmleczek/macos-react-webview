//
//  FileSystemController.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/29/25.
//

class FileSystemController: IPCController {
  override func handle(_ event: IncomingIPCEvent) -> Bool {
    if event.scope != "filesystem" {
      return false
    }

    switch event.type {
    case FileSystemEvent.OpenDialog:
      handleAsyncArray(
        { FileSystemService.openDialog(event.payload?["options"] as? [String: Any], $0) },
        event: event
      )

    case FileSystemEvent.OpenSaveDialog:
      handleAsyncString(
        { FileSystemService.openSaveDialog(event.payload?["options"] as? [String: Any], $0) },
        event: event
      )

    case FileSystemEvent.ReadFile:
      handleValue(
        FileSystemService.readFile(event.payload?["path"] as? String),
        event: event,
        key: "content"
      )

    case FileSystemEvent.WriteFile:
      handleVoid(
        FileSystemService.writeFile(
          event.payload?["path"] as? String,
          event.payload?["content"] as? String,
          event.payload?["options"] as? [String: Any]
        ),
        event
      )

    case FileSystemEvent.ReadDirectory:
      handleValue(
        FileSystemService.readDirectory(event.payload?["path"] as? String),
        event: event
      )

    case FileSystemEvent.MakeDirectory:
      handleVoid(
        FileSystemService.makeDirectory(
          event.payload?["path"] as? String
        ),
        event
      )

    case FileSystemEvent.Move:
      handleVoid(
        FileSystemService.move(
          event.payload?["from"] as? String,
          event.payload?["to"] as? String
        ),
        event
      )

    case FileSystemEvent.Copy:
      handleVoid(
        FileSystemService.copy(
          event.payload?["from"] as? String,
          event.payload?["to"] as? String
        ),
        event
      )

    case FileSystemEvent.Remove:
      handleVoid(
        FileSystemService.remove(event.payload?["path"] as? String),
        event
      )

    case FileSystemEvent.GetInfo:
      handleRawValue(
        FileSystemService.getInfo(event.payload?["path"] as? String),
        event: event
      )

    default:
      break
    }

    return true
  }
}
