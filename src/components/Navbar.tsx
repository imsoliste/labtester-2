import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope, Search, User } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Microscope className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">MedLab Compare</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="text-gray-600 hover:text-gray-900">Find Tests</Link>
            <Link to="/compare" className="text-gray-600 hover:text-gray-900">Compare</Link>
            <Button variant="outline" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Search Tests</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;