//
//  FileSystem.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/6/25.
//

import AppKit
import UniformTypeIdentifiers

func fileSystemErrorToMessage(_ error: Error) -> String {
  let nsError = error as NSError
  switch nsError.code {
  case NSFileNoSuchFileError:
    return "The file does not exist"
  case NSFileReadNoSuchFileError:
    return "Attempted to read a non-existent file"
  case NSFileWriteOutOfSpaceError:
    return "Not enough space available to write file"
  case NSFileWriteNoPermissionError:
    return "Insufficient permissions to write file"
  case NSFileReadInvalidFileNameError, NSFileWriteInvalidFileNameError:
    return "Invalid file name"
  case NSFileReadCorruptFileError:
    return "File is corrupted and cannot be read"
  default:
    return "(\(nsError.localizedDescription))"
  }
}

let typeMapping: [String: UTType] = [
  "pdf": .pdf,
  "gif": .gif,
  "js": .javaScript,
  "jpeg": .jpeg,
  "png": .png,
  "txt": .plainText,
]

func toUTType(_ string: String) -> UTType? {
  if typeMapping[string] != nil {
    return typeMapping[string]
  }

  return nil
}

func handleVoid(_ result: FileSystemServiceResponse, _ event: IncomingIPCEvent) {
  if result.successful {
    sendIPCResponse(event, payload: ["result": true])
  } else {
    sendIPCError(event, error: result.error)
  }
}

func handleValue<T: Encodable>(
  _ result: FileSystemServiceResponseWithData<T>,
  event: IncomingIPCEvent,
  key: String = "result"
) {
  if result.successful {
    if let data = result.data {
      sendIPCResponse(event, payload: [key: data])
    }
  } else {
    sendIPCError(event, error: result.error)
  }
}

func handleRawValue<T: Encodable>(
  _ result: FileSystemServiceResponseWithData<T>,
  event: IncomingIPCEvent
) {
  if result.successful {
    if let data = result.data {
      sendIPCResponse(event, payload: data)
    }
  } else {
    sendIPCError(event, error: result.error)
  }
}

func handleAsyncArray(
  _ block: (@escaping (FileSystemServiceResponseWithData<[String]>) -> Void) -> Void,
  event: IncomingIPCEvent
) {
  block { result in
    result.successful
      ? sendIPCResponse(event, payload: ["result": result.data ?? []])
      : sendIPCError(event, error: result.error)
  }
}

func handleAsyncString(
  _ block: (@escaping (FileSystemServiceResponseWithData<String>) -> Void) -> Void,
  event: IncomingIPCEvent
) {
  block { result in
    result.successful
      ? sendIPCResponse(event, payload: ["result": result.data ?? ""])
      : sendIPCError(event, error: result.error)
  }
}
