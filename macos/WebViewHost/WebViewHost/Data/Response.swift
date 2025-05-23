//
//  Response.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 5/22/25.
//

struct ServiceResponse<T> {
  var data: T
  var isSuccessful: Bool
}
