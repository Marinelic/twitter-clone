import React from "react"


function Header() {
  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between fixed top-0 left-0 z-50">
      <h1 className="text-2xl font-bold text-blue-500 tracking-wide">
        Twitter Clone 🐦
      </h1>
      <nav className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-blue-500 transition">
          Home
        </button>
        <button className="text-gray-600 hover:text-blue-500 transition">
          Profile
        </button>
      </nav>
    </header>
  );
}


export default Header;