//
//  ItemRepository.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/19/25.
//

import Foundation

class ItemRepository {
  static func create(_ item: Item) throws -> Item? {
    try DatabaseService.shared.dbQueue.write { db in
      try item.insert(db)
    }
    return item
  }
  
  static func all() throws -> [Item] {
    try DatabaseService.shared.dbQueue.read { db in
      try Item.fetchAll(db)
    }
  }
  
  static func get(_ id: String) throws -> Item? {
    try DatabaseService.shared.dbQueue.read { db in
      try Item.fetchOne(db, key: id)
    }
  }
  
  static func update(_ id: String, _ title: String) throws -> Item? {
    return try DatabaseService.shared.dbQueue.write { db in
      if var item = try Item.fetchOne(db, key: id) {
        item.title = title
        item.updatedAt = Date().timeIntervalSince1970
        try item.update(db)
        return item
      }
      
      return nil
    }
  }
  
  static func delete(_ id: String) throws -> Item? {
    try DatabaseService.shared.dbQueue.write { db in
      guard let item = try Item.fetchOne(db, key: id) else { return nil }
      _ = try Item.deleteOne(db, key: id)
      return item
    }
  }
}
