//
//  DatabaseMigrations.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/19/25.
//

import GRDB

func makeMigrator() -> DatabaseMigrator {
  var migrator = DatabaseMigrator()
  
  migrator.registerMigration("Create item") { db in
    try db.create(table: "item") { t in
      t.column("id", .text).primaryKey()
      t.column("title", .text).notNull()
      t.column("createdAt", .double).notNull()
      t.column("updatedAt", .double).notNull()
    }
  }
  
  return migrator
}
