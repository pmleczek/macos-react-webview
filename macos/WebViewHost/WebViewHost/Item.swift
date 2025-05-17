//
//  Item.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/5/25.
//

import Foundation
import SwiftData

@Model
final class Item {
    var id: String
    var date: String
    var emoji: String
    var price: String
    
    init(id: String, date: String, emoji: String, price: String) {
      self.id = id
      self.date = date
      self.emoji = emoji
      self.price = price
    }
}
