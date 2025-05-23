//
//  ItemService.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 5/22/25.
//

import Foundation
import SwiftData

class ItemService {
  var context: ModelContext
  
  init (context: ModelContext) {
    self.context = context
  }
  
  func getItems() -> ServiceResponse<[Item]?> {
    do {
      let items = try context.fetch(FetchDescriptor<Item>())
      return ServiceResponse(data: items, isSuccessful: true)
    } catch {
      return ServiceResponse(data: nil, isSuccessful: false)
    }
  }
  
  func createItem(itemData: [String: Any]) -> ServiceResponse<Item?> {
    do {
      guard
        let emoji = itemData["emoji"] as? String,
        let date = itemData["date"] as? String,
        let price = itemData["price"] as? String
      else {
        return ServiceResponse(data: nil, isSuccessful: false)
      }
      
      let item = Item(date: date, emoji: emoji, price: price)
      context.insert(item)
      try context.save()
      
      let descriptor = FetchDescriptor<Item>(predicate: #Predicate { $0.id == item.id })
      if let insertedItem = try context.fetch(descriptor).first {
        return ServiceResponse(data: insertedItem, isSuccessful: true)
      }
      
      return ServiceResponse(data: nil, isSuccessful: false)
    } catch {
      return ServiceResponse(data: nil, isSuccessful: false)
    }
  }
}
