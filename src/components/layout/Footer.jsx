import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { getWebsiteSettings } from "../../services/dbService";

export default function Footer() {
  const [settings, setSettings] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    getWebsiteSettings().then(setSettings);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <span className="text-2xl font-extrabold text-white tracking-tight font-sans">
              Surya Residency
            </span>
            <p className="text-sm text-slate-400 leading-relaxed">
              {settings?.footerInformation || "Your trusted partner in hospitality, delivering quality and comfort for over 15 years."}
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              {settings?.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 hover:bg-brand-red hover:text-white rounded-full text-slate-400 transition-colors duration-200 flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {settings?.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 hover:bg-brand-red hover:text-white rounded-full text-slate-400 transition-colors duration-200 flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}
              {settings?.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 hover:bg-brand-red hover:text-white rounded-full text-slate-400 transition-colors duration-200 flex items-center justify-center"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Rooms & Suites
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/rooms" className="text-slate-400 hover:text-brand-red transition-colors">
                  Standard Non-AC
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-slate-400 hover:text-brand-red transition-colors">
                  Deluxe AC
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-slate-400 hover:text-brand-red transition-colors">
                  Suites AC
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-brand-red transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Information / Support */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Information
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-brand-red transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-brand-red transition-colors">
                  Hotel Policies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-brand-red transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Newsletter
            </h3>
            <p className="text-sm text-slate-400">
              Stay updated with our special offers and seasonal packages.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 text-white placeholder-slate-500 text-sm px-4 py-2.5 rounded border border-slate-700 focus:outline-none focus:border-brand-red transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-red hover:bg-brand-red-dark text-white px-4 py-2.5 rounded font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Join</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-brand-gold animate-fade-in">
                Thank you for subscribing to our newsletter!
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>{settings?.copyrightText || `© ${currentYear} Hotel Surya Residency. All rights reserved.`}</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:underline hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:underline hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:underline hover:text-slate-400">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
