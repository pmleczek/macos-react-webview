//
//  ContentView.swift
//  WebViewHost
//
//  Created by Patryk Mleczek on 4/5/25.
//

import SwiftUI
import SwiftData

struct ContentView: View {
    @Environment(\.modelContext) private var modelContext
    @ObservedObject var viewModel = WebViewModel()

    var body: some View {
      ZStack(alignment: .topLeading) {
        ReactWebView(viewModel: viewModel)
          .ignoresSafeArea()
          .background(Color(red: 0xfa / 255.0, green: 0xfa / 255.0, blue: 0xfa / 255.0))
        NativeDragRegion()
          .frame(height: 44)
          .frame(maxWidth: .infinity)
          .background(.clear)
          .edgesIgnoringSafeArea(.top)
          .allowsHitTesting(true)
      }
    }
}
