//
//  WebViewModel.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/19/25.
//

import Combine

class WebViewModel: ObservableObject {
  var onSendValueFromNative = PassthroughSubject<String, Never>()
}
