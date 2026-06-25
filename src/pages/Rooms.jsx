import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Wifi, Tv, User, Check, AlertCircle, 
  MessageSquare, Coffee, Compass, Smartphone, Info 
} from "lucide-react";
import { getRoomTypes, getWebsiteSettings } from "../services/dbService";

export default function Rooms() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [settings, setSettings] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    getRoomTypes().then(setRoomTypes);
    getWebsiteSettings().then(setSettings);
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredRoomTypes = roomTypes.filter((rt) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "standard") return rt.roomTypeId === "standard_non_ac";
    if (activeFilter === "deluxe") return rt.roomTypeId === "deluxe_ac";
    if (activeFilter === "suite") return rt.roomTypeId === "suite_ac";
    return true;
  });

  // WhatsApp template link for room inquires
  const getWhatsAppInquiryUrl = (roomName) => {
    if (!settings) return "#";
    const text = encodeURIComponent(`Hi, I am interested in booking the ${roomName} room. Can you help me?`);
    return `https://wa.me/${settings.whatsAppNumber}?text=${text}`;
  };

  const comparisonRows = [
    {
      feature: "Air Conditioning",
      standard: "—",
      deluxe: <Check className="w-5 h-5 text-green-600 mx-auto" />,
      suite: <Check className="w-5 h-5 text-green-600 mx-auto" />
    },
    {
      feature: "Complimentary Wi-Fi",
      standard: <Check className="w-5 h-5 text-green-600 mx-auto" />,
      deluxe: <Check className="w-5 h-5 text-green-600 mx-auto" />,
      suite: <Check className="w-5 h-5 text-green-600 mx-auto" />
    },
    {
      feature: "Breakfast Included",
      standard: "Optional",
      deluxe: <Check className="w-5 h-5 text-green-600 mx-auto" />,
      suite: <Check className="w-5 h-5 text-green-600 mx-auto" />
    },
    {
      feature: "Seating Area",
      standard: "—",
      deluxe: "Desk",
      suite: (
        <span className="flex items-center justify-center gap-1 text-slate-800 font-semibold">
          <Check className="w-4 h-4 text-green-600" />
          <span>Sofa Set</span>
        </span>
      )
    },
    {
      feature: "Room Service",
      standard: "Limited",
      deluxe: "24/7",
      suite: "24/7 Priority"
    }
  ];

  return (
    <div className="py-12 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
            Our Rooms & Suites
          </h1>
          <p className="text-base md:text-lg text-slate-500 mt-4 leading-relaxed font-light">
            Experience authentic South Indian hospitality in our thoughtfully designed spaces. From business travelers to families, we have the perfect stay for you.
          </p>
        </div>

        {/* Filter controls & Tax notice */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 border-b border-slate-200 pb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Rooms" },
              { id: "standard", label: "Standard" },
              { id: "deluxe", label: "Deluxe AC" },
              { id: "suite", label: "Suites" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`px-5 py-2.5 rounded text-sm font-semibold transition-premium shadow-sm ${
                  activeFilter === tab.id
                    ? "bg-brand-red text-white"
                    : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-4 py-2.5 rounded shadow-sm">
            <Info className="w-4 h-4 text-brand-gold-dark" />
            <span>Taxes applicable as per government norms</span>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredRoomTypes.map((rt) => (
            <div
              key={rt.roomTypeId}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-premium transition-premium flex flex-col h-full animate-fade-in"
            >
              {/* Cover Photo */}
              <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                <img
                  src={rt.image}
                  alt={rt.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {rt.tagline && (
                  <span className="absolute top-4 left-4 bg-brand-gold text-slate-900 text-xs font-bold py-1 px-3.5 rounded shadow-sm uppercase tracking-wider">
                    {rt.tagline}
                  </span>
                )}
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{rt.name}</h3>
                  <span className="text-xl font-extrabold text-brand-red">
                    ₹{rt.basePrice}
                    <span className="text-xs text-slate-500 font-medium block text-right mt-0.5">per night</span>
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {rt.description}
                </p>

                {/* Features Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {rt.features.map((feat, index) => (
                    <span
                      key={index}
                      className="bg-slate-50 text-slate-600 text-xs border border-slate-150 px-2.5 py-1 rounded-full font-medium"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Card Action CTAs */}
                <div className="mt-auto border-t border-slate-100 pt-5 space-y-3">
                  <div className="flex gap-2">
                    <Link
                      to={`/rooms/${rt.roomTypeId}`}
                      className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 py-3 rounded text-center text-sm font-semibold transition-premium"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/book-now?roomType=${rt.roomTypeId}`}
                      className="flex-1 bg-brand-red hover:bg-brand-red-dark text-white py-3 rounded text-center text-sm font-semibold transition-premium shadow-sm"
                    >
                      Book Now
                    </Link>
                  </div>
                  
                  {/* WhatsApp Quick CTA */}
                  <a
                    href={getWhatsAppInquiryUrl(rt.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#FFFDF5] border border-[#E5A818]/30 hover:bg-brand-gold-bg text-[#B8860B] py-2.5 rounded text-center text-xs font-semibold flex items-center justify-center gap-1.5 transition-premium"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-brand-gold-dark fill-current" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm mb-20 overflow-x-auto select-none">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Compare Room Features
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Choose the best fit for your requirements
            </p>
            <div className="w-10 h-1 bg-brand-gold mx-auto mt-3 rounded-full" />
          </div>

          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b border-slate-250 bg-slate-50">
                <th className="py-4 px-4 text-left font-bold text-slate-700 text-sm">Features</th>
                <th className="py-4 px-4 font-bold text-slate-700 text-sm">Standard</th>
                <th className="py-4 px-4 font-bold text-slate-700 text-sm">Deluxe AC</th>
                <th className="py-4 px-4 font-bold text-slate-700 text-sm">Suite AC</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 text-left font-semibold text-slate-600 text-sm">{row.feature}</td>
                  <td className="py-4 px-4 text-slate-500 text-sm font-medium">{row.standard}</td>
                  <td className="py-4 px-4 text-slate-500 text-sm font-medium">{row.deluxe}</td>
                  <td className="py-4 px-4 text-slate-500 text-sm font-medium">{row.suite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ready to experience comfort? */}
        <div className="bg-brand-red rounded-lg py-12 px-6 md:px-12 text-center text-white shadow-premium select-none">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            Ready to experience comfort?
          </h2>
          <p className="text-sm md:text-base text-brand-red-bg font-light max-w-xl mx-auto mb-8">
            Book directly through our website for the best guaranteed rates and exclusive perks.
          </p>
          <Link
            to="/book-now"
            className="bg-brand-gold hover:bg-brand-gold-dark text-slate-900 px-8 py-3.5 rounded font-bold text-sm transition-premium shadow hover:scale-105 inline-block"
          >
            Check Availability
          </Link>
        </div>

      </div>
    </div>
  );
}
