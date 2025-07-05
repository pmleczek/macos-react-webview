//
//  Item.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 7/5/25.
//

import Foundation
import SwiftData

@Model
class Item {
  @Attribute(.unique)
  var id: UUID
  var title: String
  var createdAt: Double
  var updatedAt: Double
  
  init(title: String) {
    self.id = UUID()
    self.title = title
    self.createdAt = Date.now.timeIntervalSince1970
    self.updatedAt = Date.now.timeIntervalSince1970
  }
}

struct ItemDTO: Codable {
  var id: String
  var title: String
  var createdAt: Double
  var updatedAt: Double
  
  init(id: UUID, title: String, createdAt: Double, updatedAt: Double) {
    self.id = id.uuidString
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
