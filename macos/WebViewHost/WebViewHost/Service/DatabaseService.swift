//
//  DatabaseService.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/19/25.
//

import Foundation
import GRDB

class DatabaseService {
  static let shared = DatabaseService()

  private(set) var dbQueue: DatabaseQueue!

  private init() {}

  func setup() throws {
    let fileManager = FileManager.default
    let directoryURL = try fileManager.url(
      for: .applicationSupportDirectory, in: .userDomainMask, appropriateFor: nil, create: true
    )
    .appendingPathComponent("Database")

    try fileManager.createDirectory(at: directoryURL, withIntermediateDirectories: true)
    let dbPath = directoryURL.appendingPathComponent("database.sqlite").path

    dbQueue = try DatabaseQueue(path: dbPath)

    let migrator = makeMigrator()
    try migrator.migrate(dbQueue)
  }
}
