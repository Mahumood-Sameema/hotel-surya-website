import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import WhatsAppWidget from "../components/layout/WhatsAppWidget";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg font-sans">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
