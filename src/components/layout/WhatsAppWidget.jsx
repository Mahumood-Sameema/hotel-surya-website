import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getWebsiteSettings } from "../../services/dbService";

export default function WhatsAppWidget() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getWebsiteSettings().then(setSettings);
  }, []);

  if (!settings) return null;

  const messageText = encodeURIComponent("Hello Surya Residency, I would like to inquire about room availability.");
  const whatsappUrl = `https://wa.me/${settings.whatsAppNumber}?text=${messageText}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-premium hover:shadow-premium-hover transition-premium hover:scale-110 group border-2 border-white"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out text-sm font-semibold whitespace-nowrap">
        Chat with Us
      </span>
    </a>
  );
}
