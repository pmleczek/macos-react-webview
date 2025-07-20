//
//  FileSystemService.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/6/25.
//

import AppKit

typealias FileSystemServiceResponse = (successful: Bool, error: String?)

typealias FileSystemServiceResponseWithData<T> = (successful: Bool, error: String?, data: T?)

struct FileInfoResult: Codable {
  let exists: Bool
  let size: Int?
  let createdAt: Double?
  let lastModified: Double?
  let isDirectory: Bool?

  init(exists: Bool, size: Int, createdAt: Double?, lastModified: Double?, isDirectory: Bool) {
    self.exists = exists
    self.size = size
    self.createdAt = createdAt
    self.lastModified = lastModified
    self.isDirectory = isDirectory
  }

  init(exists: Bool) {
    self.exists = exists
    self.size = nil
    self.createdAt = nil
    self.lastModified = nil
    self.isDirectory = nil
  }
}

class FileSystemService {
  static func openDialog(
    _ options: [String: Any]?,
    _ completion: @escaping (FileSystemServiceResponseWithData<[String]>) -> Void
  ) {
    let panel = NSOpenPanel()
    panel.title = options?["title"] as? String ?? "Select"
    panel.canChooseFiles = (options?["files"] as? Bool) ?? true
    panel.canChooseDirectories = (options?["directories"] as? Bool) ?? true
    panel.allowsMultipleSelection = (options?["multipleSelection"] as? Bool) ?? true

    panel.begin { response in
      if response == .OK {
        let paths = panel.urls.map { $0.path }
        completion((true, nil, paths))
      } else {
        completion((true, nil, []))
      }
    }
  }

  static func openSaveDialog(
    _ options: [String: Any]?,
    _ completion: @escaping (FileSystemServiceResponseWithData<String>) -> Void
  ) {
    let panel = NSSavePanel()
    panel.title = options?["title"] as? String ?? "Save"
    panel.nameFieldStringValue = options?["defaultName"] as? String ?? ""
    panel.allowsOtherFileTypes = options?["otherFileTypes"] as? Bool ?? false
    panel.canCreateDirectories = options?["canCreateDirectories"] as? Bool ?? true
    panel.showsContentTypes = options?["showTypes"] as? Bool ?? true

    if let allowedTypes = options?["allowedTypes"] as? [String] {
      panel.allowedContentTypes = allowedTypes.compactMap(toUTType)
    }

    panel.begin { response in
      if response == .OK, let url = panel.url {
        completion((true, nil, url.path))
      } else {
        completion((true, nil, ""))
      }
    }
  }

  static func readFile(_ path: String?) -> FileSystemServiceResponseWithData<String> {
    guard let path else {
      return (false, "Path to the file hasn't been passed", nil)
    }

    do {
      let data = try Data(contentsOf: URL(filePath: path))
      let content = String(data: data, encoding: .utf8)
      return (true, nil, content)
    } catch {
      return (false, fileSystemErrorToMessage(error), nil)
    }
  }

  static func writeFile(
    _ path: String?,
    _ content: String?,
    _ options: [String: Any]?
  ) -> FileSystemServiceResponse {
    guard let path else {
      return (false, "Path to the file hasn't been passed")
    }

    guard let content else {
      return (false, "Content to be written hasn't been passed")
    }

    var append = false
    if let options, let optionsAppend = options["append"] as? Bool {
      append = optionsAppend
    }

    do {
      if append {
        if let fileHandle = FileHandle(forWritingAtPath: path) {
          defer { fileHandle.closeFile() }
          fileHandle.seekToEndOfFile()
          if let data = content.data(using: .utf8) {
            fileHandle.write(data)
          }
        }
      } else {
        try content.write(to: URL(fileURLWithPath: path), atomically: true, encoding: .utf8)
      }

      return (true, nil)
    } catch {
      return (false, fileSystemErrorToMessage(error))
    }
  }

  static func readDirectory(_ path: String?) -> FileSystemServiceResponseWithData<[String]> {
    guard let path else {
      return (false, "Path to the directory hasn't been passed", nil)
    }

    do {
      let contents = try FileManager.default.contentsOfDirectory(atPath: path)
      return (true, nil, contents)
    } catch {
      return (false, fileSystemErrorToMessage(error), nil)
    }
  }

  static func makeDirectory(_ path: String?) -> FileSystemServiceResponse {
    guard let path else {
      return (false, "Path to the directory to be created hasn't been passed")
    }

    do {
      try FileManager.default.createDirectory(
        atPath: path, withIntermediateDirectories: true, attributes: nil)
      return (true, nil)
    } catch {
      return (false, fileSystemErrorToMessage(error))
    }
  }

  static func move(_ from: String?, _ to: String?) -> FileSystemServiceResponse {
    guard let from, let to else {
      return (false, "Both paths: from and to have to be provided")
    }

    do {
      try FileManager.default.moveItem(atPath: from, toPath: to)
      return (true, nil)
    } catch {
      return (false, fileSystemErrorToMessage(error))
    }
  }

  static func copy(_ from: String?, _ to: String?) -> FileSystemServiceResponse {
    guard let from, let to else {
      return (false, "Both paths: from and to have to be provided")
    }

    do {
      try FileManager.default.copyItem(atPath: from, toPath: to)
      return (true, nil)
    } catch {
      return (false, fileSystemErrorToMessage(error))
    }
  }

  static func remove(_ path: String?) -> FileSystemServiceResponse {
    guard let path else {
      return (false, "Path to the item to be removed hasn't been passed")
    }

    do {
      try FileManager.default.removeItem(atPath: path)
      return (true, nil)
    } catch {
      return (false, fileSystemErrorToMessage(error))
    }
  }

  static func getInfo(_ path: String?) -> FileSystemServiceResponseWithData<FileInfoResult> {
    guard let path else {
      return (false, "Path to the item hasn't been passed", nil)
    }

    do {
      if !FileManager.default.fileExists(atPath: path) {
        return (true, nil, FileInfoResult(exists: false))
      }

      let attributes = try FileManager.default.attributesOfItem(atPath: path)
      let url = URL(fileURLWithPath: path)
      let isDirectoryResourceValue = try url.resourceValues(forKeys: [.isDirectoryKey])

      let createdAt = (attributes[.creationDate] as? Date)?.timeIntervalSince1970
      let lastModified = (attributes[.modificationDate] as? Date)?.timeIntervalSince1970
      let size = attributes[.size] as? UInt64 ?? 0
      let isDirectory = isDirectoryResourceValue.isDirectory ?? false

      let result = FileInfoResult(
        exists: true,
        size: Int(size),
        createdAt: createdAt,
        lastModified: lastModified,
        isDirectory: isDirectory
      )

      return (true, nil, result)
    } catch {
      return (false, fileSystemErrorToMessage(error), nil)
    }
  }
}
