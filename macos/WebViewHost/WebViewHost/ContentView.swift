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

    var body: some View {
      ReactWebView()
        .ignoresSafeArea()
    }
}

#Preview {
    ContentView()
        .modelContainer(for: Item.self, inMemory: true)
}
