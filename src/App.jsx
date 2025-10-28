import React from "react";
import "./App.css";
import Header from "./components/Header";


 function App() {
  return (
    <div className="min-h-screen bg-gray-200 text-blue-300">
      <Header />

      <main className="pt-24 flex flex-col items-center px-4">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Home Feed
          </h2>

          <p className="text-gray-600">
            Here will be tweets!
          </p>
        </div>
      </main>
    </div>
  );
}

export default App
