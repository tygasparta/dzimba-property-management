import React from 'react';
import { Home, Building2, Users, Settings, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-zim-green" />
              <span className="ml-2 text-2xl font-bold text-zim-black">Dzimba</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-zim-green px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-zim-green px-3 py-2 rounded-md text-sm font-medium">
              Properties
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-zim-green px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link to="/login" className="bg-zim-green text-white px-4 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-zim-green focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-gray-700 hover:text-zim-green block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/properties"
              className="text-gray-700 hover:text-zim-green block px-3 py-2 rounded-md text-base font-medium"
            >
              Properties
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-zim-green block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/login"
              className="bg-zim-green text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}