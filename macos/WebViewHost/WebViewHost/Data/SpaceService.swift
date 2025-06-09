//
//  SpaceService.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/7/25.
//

import AppKit
import SwiftData

class SpaceService {
  var context: ModelContext
  
  init (context: ModelContext) {
    self.context = context
  }
  
  func getSpaces() -> ServiceResponse<[Space]?> {
    do {
      let spaces = try context.fetch(FetchDescriptor<Space>())
      return ServiceResponse(data: spaces, isSuccessful: true)
    } catch {
      return ServiceResponse(data: nil, isSuccessful: false)
    }
  }
  
  func createSpace(_ spaceData: [String: Any]) -> ServiceResponse<Space?> {
    guard let title = spaceData["title"] as? String, let emoji = spaceData["emoji"] as? String, let slug = spaceData["slug"] as? String else {
      return ServiceResponse(data: nil, isSuccessful: false)
    }
    
    do {
      let space = Space(emoji: emoji, title: title, slug: slug)
      context.insert(space)
      try context.save()
      
      let fetchDescriptor = FetchDescriptor<Space>(
        predicate: #Predicate { space in space.slug == slug }
      )
      let spaces = try context.fetch(fetchDescriptor)
      
      return ServiceResponse(data: spaces.first, isSuccessful: spaces.first != nil)
    } catch {
      return ServiceResponse(data: nil, isSuccessful: false)
    }
  }
}
