import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { getWebsiteSettings } from "../../services/dbService";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getWebsiteSettings().then(setSettings);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const phoneDisplay = settings?.phoneNumber || "+91 98765 43210";
  const rawPhone = settings?.phoneNumber?.replace(/\s+/g, "") || "+919876543210";

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-brand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-extrabold text-brand-red tracking-tight font-sans">
              Surya Residency
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-brand-red font-semibold"
                    : "text-brand-dark hover:text-brand-red"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Call to Action & Phone */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href={`tel:${rawPhone}`}
              className="flex items-center text-sm font-semibold text-brand-red hover:text-brand-red-dark transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              {phoneDisplay}
            </a>
            <Link
              to="/book-now"
              className="bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded text-sm font-semibold transition-premium shadow-sm hover:shadow"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded text-brand-dark hover:text-brand-red hover:bg-slate-100 transition-colors focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-brand-border transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-3 py-2.5 rounded text-base font-medium transition-colors ${
                isActive(link.path)
                  ? "bg-brand-red-bg text-brand-red font-semibold"
                  : "text-brand-dark hover:bg-slate-50 hover:text-brand-red"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3 px-3">
            <a
              href={`tel:${rawPhone}`}
              className="flex items-center text-base font-medium text-brand-red hover:text-brand-red-dark transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              {phoneDisplay}
            </a>
            <Link
              to="/book-now"
              className="w-full bg-brand-red hover:bg-brand-red-dark text-white px-4 py-3 rounded text-center text-base font-semibold transition-premium shadow-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
