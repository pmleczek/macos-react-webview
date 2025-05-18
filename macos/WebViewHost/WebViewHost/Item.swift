//
//  Item.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/5/25.
//

import Foundation
import SwiftData

@Model
final class Item: Codable {
    enum CodingKeys: CodingKey {
      case id
      case date
      case emoji
      case price
    }
  
    var id: String
    var date: String
    var emoji: String
    var price: String
  
    init(from decoder: any Decoder) throws {
      let container = try decoder.container(keyedBy: CodingKeys.self)
      id = try container.decode(String.self, forKey: .id)
      date = try container.decode(String.self, forKey: .date)
      emoji = try container.decode(String.self, forKey: .emoji)
      price = try container.decode(String.self, forKey: .price)
    }
    
    init(id: String, date: String, emoji: String, price: String) {
      self.id = id
      self.date = date
      self.emoji = emoji
      self.price = price
    }
  
    func encode(to encoder: any Encoder) throws {
      var container = encoder.container(keyedBy: CodingKeys.self)
      try container.encode(id, forKey: .id)
      try container.encode(date, forKey: .date)
      try container.encode(emoji, forKey: .emoji)
      try container.encode(price, forKey: .price)
    }
}
