import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, HelpCircle, MessageSquare, Home, AlertCircle } from "lucide-react";
import { getWebsiteSettings } from "../services/dbService";

export default function NotFound() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getWebsiteSettings().then(setSettings);
  }, []);

  const getWhatsAppContactUrl = () => {
    if (!settings) return "#";
    const text = encodeURIComponent("Hi, I was browsing your website and encountered an issue or need assistance.");
    return `https://wa.me/${settings.whatsAppNumber}?text=${text}`;
  };

  return (
    <div className="py-20 bg-brand-bg min-h-[75vh] flex items-center justify-center">
      <div className="max-w-md w-full px-6 text-center select-none animate-fade-in">
        
        {/* Error Icon */}
        <div className="w-20 h-20 bg-brand-red-bg text-brand-red border border-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 animate-pulse" />
        </div>

        {/* Status code */}
        <span className="text-brand-red font-bold text-xs uppercase tracking-widest block mb-1">Error 404</span>
        
        {/* Messages */}
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          We can't seem to find the page you are looking for. It might have been moved, deleted, or never existed in our system.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-brand-red hover:bg-brand-red-dark text-white px-5 py-3 rounded text-sm font-semibold transition-premium flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <a
            href={getWhatsAppContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3 rounded text-sm font-semibold transition-premium flex items-center justify-center gap-1.5 shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-brand-red fill-current" />
            <span>Contact Support</span>
          </a>
        </div>

      </div>
    </div>
  );
}
