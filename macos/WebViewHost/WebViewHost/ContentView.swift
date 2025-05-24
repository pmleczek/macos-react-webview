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
      ReactWebView(viewModel: viewModel)
        .ignoresSafeArea()
        .background(Color(red: 0xfa / 255.0, green: 0xfa / 255.0, blue: 0xfa / 255.0))
    }
}

#Preview {
    ContentView()
        .modelContainer(for: Item.self, inMemory: true)
}
