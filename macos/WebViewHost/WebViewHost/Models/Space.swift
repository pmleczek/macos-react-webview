//
//  Space.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/7/25.
//

import Foundation
import SwiftData

@Model
final class Space: Codable {
  enum CodingKeys: CodingKey {
    case emoji
    case title
    case slug
    case createdAt
    case updatedAt
  }
  
  var emoji: String
  var title: String
  var slug: String
  var createdAt: Date
  var updatedAt: Date
  
  init(emoji: String, title: String, slug: String) {
    let now = Date.now
    self.emoji = emoji
    self.title = title
    self.slug = slug
    self.createdAt = now
    self.updatedAt = now
  }
  
  init(from decoder: any Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    emoji = try container.decode(String.self, forKey: .emoji)
    title = try container.decode(String.self, forKey: .title)
    slug = try container.decode(String.self, forKey: .slug)
    createdAt = try container.decode(Date.self, forKey: .createdAt)
    updatedAt = try container.decode(Date.self, forKey: .updatedAt)
  }
  
  func encode(to encoder: any Encoder) throws {
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(emoji, forKey: .emoji)
    try container.encode(title, forKey: .title)
    try container.encode(slug, forKey: .slug)
    try container.encode(createdAt, forKey: .createdAt)
    try container.encode(updatedAt, forKey: .updatedAt)
  }
}
