import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, MessageSquare, Info, Calendar, ArrowRight, Home } from "lucide-react";
import { getBookingByRef, getWebsiteSettings, getRoomTypeById } from "../services/dbService";

export default function BookingConfirmation() {
  const { reference } = useParams();
  const [booking, setBooking] = useState(null);
  const [settings, setSettings] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getBookingByRef(reference), getWebsiteSettings()])
      .then(([b, setts]) => {
        setSettings(setts);
        if (b) {
          setBooking(b);
          return getRoomTypeById(b.roomTypeId);
        }
        return null;
      })
      .then((rt) => {
        if (rt) setRoomType(rt);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [reference]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center select-none">
        <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm font-semibold">Loading confirmation details...</p>
      </div>
    );
  }

  // Fallback if no matching booking reference was found in memory
  const displayRef = reference || "SR-XXXXXX";
  const guestName = booking?.guestName || "Guest";
  const checkIn = booking?.checkIn || "Pending Selection";
  const checkOut = booking?.checkOut || "Pending Selection";
  const roomsCount = booking?.roomsCount || 1;
  const guestsCount = booking?.guestsCount || 1;
  const estimatedTotal = booking?.estimatedTotal || 0;
  const roomName = roomType?.name || "Standard Accommodation";

  // WhatsApp confirm faster link
  const getWhatsAppConfirmUrl = () => {
    if (!settings) return "#";
    const text = encodeURIComponent(
      `Hi Surya Residency, I just submitted a booking request on your website. My Booking Reference is ${displayRef}. Please confirm my reservation.`
    );
    return `https://wa.me/${settings.whatsAppNumber}?text=${text}`;
  };

  return (
    <div className="py-16 bg-brand-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success header card */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-premium text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 bg-green-50 text-green-600 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Booking Request Received!
          </h1>
          <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Thank you for choosing Hotel Surya Residency. Your request is registered and pending review by our front desk.
          </p>

          <div className="mt-6 bg-slate-50 border border-slate-150 rounded-lg py-4 px-6 inline-block select-all">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider mb-1">Booking Reference</span>
            <span className="text-xl md:text-2xl font-black text-slate-800 tracking-wider">{displayRef}</span>
          </div>

          {/* WhatsApp Integration Block */}
          <div className="mt-8 border-t border-slate-100 pt-8 max-w-lg mx-auto">
            <div className="bg-brand-gold-bg border border-brand-gold/30 rounded-lg p-5 text-center">
              <span className="text-brand-gold-dark font-extrabold text-xs uppercase tracking-wide block mb-1">
                Confirm your booking faster!
              </span>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Send your booking reference code directly to our front desk via WhatsApp to verify availability and lock your room instantly.
              </p>
              <a
                href={getWhatsAppConfirmUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba56] text-white py-3 px-6 rounded font-bold text-sm inline-flex items-center gap-2 shadow-sm transition-premium hover:scale-102"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Send Reference via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Details Summary Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8 shadow-sm mb-8 animate-fade-in select-none">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5 uppercase tracking-wider">
            Reservation Summary
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-slate-700">
            <div>
              <span className="text-slate-400 text-xs block font-medium">Guest Name</span>
              <span className="font-semibold text-slate-800">{guestName}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block font-medium">Room Type</span>
              <span className="font-semibold text-slate-800">{roomName}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block font-medium">Check-In / Out</span>
              <span className="font-semibold text-slate-800">{checkIn} to {checkOut}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block font-medium">Rooms & Occupancy</span>
              <span className="font-semibold text-slate-800">{roomsCount} Room{roomsCount > 1 ? "s" : ""}, {guestsCount} Guest{guestsCount > 1 ? "s" : ""}</span>
            </div>
            {estimatedTotal > 0 && (
              <div className="sm:col-span-2 border-t border-slate-100 pt-4 flex justify-between items-baseline mt-2">
                <span className="text-slate-500 font-medium">Estimated Total (Incl. Taxes)</span>
                <span className="text-xl font-bold text-brand-red">₹{estimatedTotal}</span>
              </div>
            )}
          </div>
        </div>

        {/* Policy check reminders */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8 shadow-sm mb-10 select-none animate-fade-in">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 uppercase tracking-wider">
            <Info className="w-5 h-5 text-brand-gold-dark" />
            <span>Important Stay Policies</span>
          </h3>
          <ul className="space-y-3.5 text-xs text-slate-600 leading-relaxed list-disc pl-4">
            <li>Check-in time is from <span className="font-bold text-slate-800">{settings?.checkInTime || "12:00 PM"}</span> and check-out is at <span className="font-bold text-slate-800">{settings?.checkOutTime || "11:00 AM"}</span>.</li>
            <li>All adult guests must present a valid government-issued photo ID (Aadhar, Voter ID, Passport) at check-in. PAN cards are not accepted.</li>
            <li>Failure to present valid identification may lead to reservation cancellation by hotel authorities.</li>
            <li>Payments are settled directly at the property desk during check-in. We accept Cash, Cards, and UPI.</li>
          </ul>
        </div>

        {/* Return Button */}
        <div className="text-center select-none animate-fade-in">
          <Link
            to="/"
            className="bg-slate-950 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded text-sm transition-premium shadow-sm inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
