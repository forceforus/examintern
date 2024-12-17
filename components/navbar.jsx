import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-black text-white drop-shadow-lg">
      <div className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
       
        <div className="flex items-center">
          <div className="text-4xl">
            <Link
              href="/"
              className="flex hover:scale-110 transition-transform duration-300"
            >
              Force
            </Link>
          </div>
        </div>

        
        <div className="flex space-x-6">
          <Link
            href="/user"
            className="text-2xl hover:scale-110 transition-transform duration-300"
          >
            Detail
          </Link>
          <Link
            href="/chart"
            className="text-2xl hover:scale-110 transition-transform duration-300"
          >
            Chart
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
