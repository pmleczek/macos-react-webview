//
//  Item.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/5/25.
//

import Foundation
import GRDB

struct Item: Codable, FetchableRecord, PersistableRecord, Identifiable {
  var id: String
  var title: String
  var createdAt: Double
  var updatedAt: Double
  
  init(title: String) {
    self.id = UUID().uuidString
    self.title = title
    
    let timestamp = Date().timeIntervalSince1970
    self.createdAt = timestamp
    self.updatedAt = timestamp
  }
}

struct ItemDTO: Codable {
  var id: String
  var title: String
  var createdAt: Double
  var updatedAt: Double
  
  init(id: String, title: String, createdAt: Double, updatedAt: Double) {
    self.id = id
    self.title = title
    self.createdAt = createdAt
    self.updatedAt = updatedAt
  }
  
  init(from item: Item) {
    self.init(
      id: item.id,
      title: item.title,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    )
  }
}
