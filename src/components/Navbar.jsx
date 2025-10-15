import { NavLink } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 md:p-6 m-2">
      <nav className="bg-[#0B4650] text-white px-6 py-4 flex justify-between items-center shadow-md rounded-lg">
        {/* Logo */}
        <div className="font-black text-2xl tracking-tight flex items-center">
          <span className="text-yellow-400 text-2xl mr-2">💰</span>
          <span>FINTRACK</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-white font-medium hover:text-yellow-400 transition-colors ${
                isActive ? "font-semibold" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `text-white font-medium hover:text-yellow-400 transition-colors ${
                isActive ? "font-semibold" : ""
              }`
            }
          >
            Transazioni
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `text-white font-medium hover:text-yellow-400 transition-colors ${
                isActive ? "font-semibold" : ""
              }`
            }
          ></NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0B4650] mt-2 rounded-lg shadow-md px-6 py-4 flex flex-col space-y-4">
          <NavLink
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-white font-medium hover:text-yellow-400 transition-colors ${
                isActive ? "font-semibold" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/transactions"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-white font-medium hover:text-yellow-400 transition-colors ${
                isActive ? "font-semibold" : ""
              }`
            }
          >
            Transazioni
          </NavLink>
          <NavLink
            to="/categories"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-white font-medium hover:text-yellow-400 transition-colors ${
                isActive ? "font-semibold" : ""
              }`
            }
          >
          </NavLink>
        </div>
      )}
    </div>
  );
}
