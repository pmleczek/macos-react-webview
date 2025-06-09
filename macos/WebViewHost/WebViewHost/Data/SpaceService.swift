//
//  SpaceService.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 6/7/25.
//

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
}
