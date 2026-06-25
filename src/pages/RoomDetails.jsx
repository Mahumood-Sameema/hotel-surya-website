import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, CheckCircle2, User, HelpCircle, 
  MessageSquare, ShieldCheck, Compass, Info, Wifi, Tv, Coffee, Wind, AlertCircle 
} from "lucide-react";
import { getRoomTypeById, getWebsiteSettings } from "../services/dbService";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getRoomTypeById(id), getWebsiteSettings()])
      .then(([rt, setts]) => {
        if (rt) {
          setRoomType(rt);
        }
        setSettings(setts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center select-none">
        <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm font-semibold">Loading room details...</p>
      </div>
    );
  }

  if (!roomType) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center select-none animate-fade-in">
        <AlertCircle className="w-12 h-12 text-brand-red mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Room Type Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">The room type you are trying to view does not exist.</p>
        <Link
          to="/rooms"
          className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded text-sm font-semibold transition-premium inline-block shadow-sm"
        >
          Back to Rooms
        </Link>
      </div>
    );
  }

  const getWhatsAppInquiryUrl = () => {
    if (!settings) return "#";
    const text = encodeURIComponent(`Hi, I am interested in booking the ${roomType.name} room. Can you help me?`);
    return `https://wa.me/${settings.whatsAppNumber}?text=${text}`;
  };

  return (
    <div className="py-12 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <Link 
          to="/rooms" 
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:text-brand-red-dark mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Rooms</span>
        </Link>

        {/* Room Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <span className="text-brand-red font-bold text-xs tracking-wider uppercase block mb-1">
              {roomType.tagline || "Surya Premium"}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {roomType.name}
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-3.5 py-2 rounded shadow-sm">
            <User className="w-4 h-4 text-slate-400" />
            <span>Capacity: {roomType.capacity}</span>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Photos and Descriptions */}
          <div className="lg:col-span-8 space-y-8">
            {/* Big cover photo */}
            <div className="bg-slate-200 rounded-lg overflow-hidden border border-slate-200 shadow-sm h-[480px]">
              <img
                src={roomType.image}
                alt={roomType.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
                Room Overview
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {roomType.description}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you are traveling to Nagercoil for a family gathering, business commitments, or temple pilgrimage, this room is crafted to offer you a resting haven. Well-furnished and ventilated, our properties maintain the highest standards of cleanliness and hygiene.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
                Room Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded border border-slate-150">
                  <div className="p-1.5 bg-white text-brand-red rounded border border-slate-200">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Wi-Fi</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {roomType.amenities.wifi ? "Complimentary High-speed" : "Not Available"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded border border-slate-150">
                  <div className="p-1.5 bg-white text-brand-red rounded border border-slate-200">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Air Conditioning</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {roomType.amenities.ac ? "Individually Controlled AC" : "Non-AC / Ventilated"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded border border-slate-150">
                  <div className="p-1.5 bg-white text-brand-red rounded border border-slate-200">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Breakfast</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {roomType.amenities.breakfast === "Included" ? "Complimentary Included" : "Optional / On Demand"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded border border-slate-150">
                  <div className="p-1.5 bg-white text-brand-red rounded border border-slate-200">
                    <Tv className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Entertainment</span>
                    <span className="text-sm font-semibold text-slate-800">Smart TV with Satellite Channels</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Action Card */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-premium select-none">
              <span className="text-slate-500 text-xs block font-semibold mb-1 uppercase tracking-wider">Rate starts from</span>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold text-slate-900">₹{roomType.basePrice}</span>
                <span className="text-slate-500 text-xs">/ night (excluding taxes)</span>
              </div>

              <div className="space-y-3">
                <Link
                  to={`/book-now?roomType=${roomType.roomTypeId}`}
                  className="w-full bg-brand-red hover:bg-brand-red-dark text-white py-3.5 rounded text-center font-bold text-sm transition-premium block shadow-sm"
                >
                  Book Online
                </Link>
                
                <a
                  href={getWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white py-3 rounded text-center font-semibold text-sm flex items-center justify-center gap-2 transition-premium shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Book via WhatsApp</span>
                </a>
              </div>

              {/* Policy Quickies */}
              <div className="border-t border-slate-100 pt-5 mt-6 space-y-3.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Best rate guarantee when booking direct</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Flexible cancellation parameters</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <Info className="w-4 h-4 text-brand-gold-dark flex-shrink-0" />
                  <span>Government photo ID required during check-in</span>
                </div>
              </div>
            </div>

            {/* Support sidebar widget */}
            <div className="bg-slate-900 text-slate-300 rounded-lg p-6 border border-slate-800">
              <h4 className="text-white font-bold text-sm mb-3">Need Booking Assistance?</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Have questions about special occupancy rates or custom services? Call us or text directly.
              </p>
              <div className="space-y-2 text-xs">
                <p>Phone: <span className="text-white font-semibold">{settings?.phoneNumber}</span></p>
                <p>Email: <span className="text-white font-semibold">{settings?.email}</span></p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
