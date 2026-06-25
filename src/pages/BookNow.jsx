import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Calendar, User, Mail, Phone, FileText, 
  CheckCircle, ArrowRight, ArrowLeft, Info, HelpCircle 
} from "lucide-react";
import { getRoomTypes, getWebsiteSettings, createBookingRequest } from "../services/dbService";
import { showToast } from "../utils/toast";

const bookingSchema = z.object({
  checkIn: z.string().nonempty("Check-in date is required"),
  checkOut: z.string().nonempty("Check-out date is required"),
  roomsCount: z.preprocess((val) => Number(val), z.number().min(1, "At least 1 room required").max(5)),
  guestsCount: z.preprocess((val) => Number(val), z.number().min(1, "At least 1 guest required").max(10)),
  roomTypeId: z.string().nonempty("Please select a room type"),
  guestName: z.string().min(3, "Guest name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  specialRequests: z.string().optional(),
  agreeToPolicies: z.literal(true, {
    errorMap: () => ({ message: "You must accept the hotel policies to proceed" })
  })
}).refine((data) => {
  const checkInDate = new Date(data.checkIn);
  const checkOutDate = new Date(data.checkOut);
  return checkOutDate > checkInDate;
}, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"]
});

export default function BookNow() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [roomTypes, setRoomTypes] = useState([]);
  const [settings, setSettings] = useState(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Read URL params
  const paramCheckIn = searchParams.get("checkIn") || "";
  const paramCheckOut = searchParams.get("checkOut") || "";
  const paramRooms = searchParams.get("rooms") || "1";
  const paramGuests = searchParams.get("guests") || "2";
  const paramRoomType = searchParams.get("roomType") || "deluxe_ac";

  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      checkIn: paramCheckIn,
      checkOut: paramCheckOut,
      roomsCount: Number(paramRooms),
      guestsCount: Number(paramGuests),
      roomTypeId: paramRoomType,
      guestName: "",
      email: "",
      phone: "",
      specialRequests: "",
      agreeToPolicies: false
    }
  });

  // Watch fields for calculations and summary
  const watchCheckIn = watch("checkIn");
  const watchCheckOut = watch("checkOut");
  const watchRoomTypeId = watch("roomTypeId");
  const watchRoomsCount = watch("roomsCount") || 1;
  const watchGuestsCount = watch("guestsCount") || 2;
  const watchGuestName = watch("guestName");
  const watchEmail = watch("email");
  const watchPhone = watch("phone");
  const watchSpecialRequests = watch("specialRequests");

  useEffect(() => {
    getRoomTypes().then(setRoomTypes);
    getWebsiteSettings().then(setSettings);
  }, []);

  const selectedRoomType = roomTypes.find((r) => r.roomTypeId === watchRoomTypeId);

  // Calculations
  const calculateNights = () => {
    if (!watchCheckIn || !watchCheckOut) return 0;
    const start = new Date(watchCheckIn);
    const end = new Date(watchCheckOut);
    const diffTime = end - start;
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const roomPricePerNight = selectedRoomType ? selectedRoomType.basePrice : 0;
  const baseCost = roomPricePerNight * watchRoomsCount * nights;
  const estimatedTax = Math.round(baseCost * 0.12); // 12% GST
  const totalCost = baseCost + estimatedTax;

  const handleNextStep = async () => {
    if (step === 1) {
      const isValid = await trigger(["checkIn", "checkOut", "roomsCount", "guestsCount", "roomTypeId"]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger(["guestName", "email", "phone"]);
      if (isValid) setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const bookingPayload = {
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        roomsCount: Number(data.roomsCount),
        guestsCount: Number(data.guestsCount),
        roomTypeId: data.roomTypeId,
        guestName: data.guestName,
        email: data.email,
        phone: data.phone,
        specialRequests: data.specialRequests || "",
        estimatedTotal: totalCost
      };

      const response = await createBookingRequest(bookingPayload);
      if (response && response.bookingRef) {
        showToast("Booking request registered!", "success");
        navigate(`/booking-confirmation/${response.bookingRef}`);
      }
    } catch (e) {
      console.error(e);
      showToast("Booking failed. Please check inputs.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-brand-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
            Book Your Stay
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Submit your reservation request in just 3 simple steps
          </p>
          <div className="w-12 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Step indicator header */}
        <div className="max-w-xl mx-auto mb-10 flex items-center justify-between relative select-none">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-[2px] bg-brand-red -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />

          {[
            { num: 1, label: "Dates & Room" },
            { num: 2, label: "Guest Details" },
            { num: 3, label: "Review & Pay" }
          ].map((item) => (
            <div key={item.num} className="relative z-10 flex flex-col items-center">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 ${
                step >= item.num
                  ? "bg-brand-red text-white border-brand-red"
                  : "bg-white text-slate-400 border-slate-200"
              }`}>
                {item.num}
              </span>
              <span className={`text-[10px] sm:text-xs font-semibold mt-1 bg-brand-bg px-1.5 ${
                step >= item.num ? "text-brand-red" : "text-slate-400"
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form area grid layout */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main step container */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm">
            
            {/* Step 1: Config */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
                  Step 1: Check-in Dates & Room Selection
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Check-in Date</label>
                    <input
                      type="date"
                      {...register("checkIn")}
                      className={`w-full bg-slate-50 border rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red ${
                        errors.checkIn ? "border-red-400 focus:border-red-400" : "border-slate-200"
                      }`}
                    />
                    {errors.checkIn && <p className="text-xs text-red-500 mt-1">{errors.checkIn.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Check-out Date</label>
                    <input
                      type="date"
                      {...register("checkOut")}
                      className={`w-full bg-slate-50 border rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red ${
                        errors.checkOut ? "border-red-400 focus:border-red-400" : "border-slate-200"
                      }`}
                    />
                    {errors.checkOut && <p className="text-xs text-red-500 mt-1">{errors.checkOut.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Number of Rooms</label>
                    <select
                      {...register("roomsCount")}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} Room{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Number of Guests</label>
                    <select
                      {...register("guestsCount")}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Select Room Type</label>
                    <select
                      {...register("roomTypeId")}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red"
                    >
                      {roomTypes.map((rt) => (
                        <option key={rt.roomTypeId} value={rt.roomTypeId}>{rt.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedRoomType && (
                  <div className="bg-slate-50 border border-slate-150 rounded-lg p-5 flex items-start gap-4">
                    <img
                      src={selectedRoomType.image}
                      alt={selectedRoomType.name}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{selectedRoomType.tagline}</span>
                      <h4 className="font-bold text-slate-800 text-sm mt-0.5">{selectedRoomType.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">Starting at ₹{selectedRoomType.basePrice} per night. Max capacity: {selectedRoomType.capacity}.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Personal Details */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
                  Step 2: Guest Information
                </h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Guest Name (Matching ID proof)"
                    {...register("guestName")}
                    className={`w-full bg-slate-50 border rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red ${
                      errors.guestName ? "border-red-400 focus:border-red-400" : "border-slate-200"
                    }`}
                  />
                  {errors.guestName && <p className="text-xs text-red-500 mt-1">{errors.guestName.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      className={`w-full bg-slate-50 border rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red ${
                        errors.email ? "border-red-400 focus:border-red-400" : "border-slate-200"
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      {...register("phone")}
                      className={`w-full bg-slate-50 border rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red ${
                        errors.phone ? "border-red-400 focus:border-red-400" : "border-slate-200"
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Special Requests (Optional)</label>
                  <textarea
                    rows="3"
                    placeholder="Late check-in, extra bedding requirements, flight details, etc."
                    {...register("specialRequests")}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
                  Step 3: Review Details & Confirm Policies
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 border border-slate-150 rounded-lg p-5 text-sm text-slate-700">
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Stay & Occupancy</span>
                    <p>Room: <span className="font-semibold text-slate-800">{selectedRoomType?.name}</span></p>
                    <p>Dates: <span className="font-semibold text-slate-800">{watchCheckIn} to {watchCheckOut} ({nights} Night{nights > 1 ? "s" : ""})</span></p>
                    <p>Rooms/Guests: <span className="font-semibold text-slate-800">{watchRoomsCount} Room{watchRoomsCount > 1 ? "s" : ""}, {watchGuestsCount} Guest{watchGuestsCount > 1 ? "s" : ""}</span></p>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Guest Information</span>
                    <p>Guest Name: <span className="font-semibold text-slate-800">{watchGuestName}</span></p>
                    <p>Email: <span className="font-semibold text-slate-800">{watchEmail}</span></p>
                    <p>Phone: <span className="font-semibold text-slate-800">{watchPhone}</span></p>
                  </div>
                </div>

                {watchSpecialRequests && (
                  <div className="bg-slate-50 border border-slate-150 rounded-lg p-4 text-sm text-slate-700">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Special Requests</span>
                    <p className="italic text-slate-600">"{watchSpecialRequests}"</p>
                  </div>
                )}

                <div className="border-t border-slate-100 pt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToPolicies"
                      {...register("agreeToPolicies")}
                      className="mt-1 h-4 w-4 border-slate-300 rounded text-brand-red focus:ring-brand-red"
                    />
                    <label htmlFor="agreeToPolicies" className="text-xs text-slate-600 leading-relaxed cursor-pointer font-medium select-none">
                      I acknowledge that early check-in is subject to availability and a valid government photo ID (Aadhar, Voter ID, Passport) must be presented during check-in for all adults. PAN cards are not accepted.
                    </label>
                  </div>
                  {errors.agreeToPolicies && <p className="text-xs text-red-500">{errors.agreeToPolicies.message}</p>}
                </div>
              </div>
            )}

            {/* Trigger actions */}
            <div className="border-t border-slate-150 pt-6 mt-8 flex justify-between gap-4 select-none">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-5 py-2.5 rounded text-sm font-semibold transition-premium flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded text-sm font-semibold transition-premium flex items-center gap-1.5 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-2.5 rounded text-sm font-semibold transition-premium flex items-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Confirm Reservation</span>
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>

          </div>

          {/* Right sidebar: Summary cost calculator */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 uppercase tracking-wider">
              Booking Summary
            </h3>
            
            <div className="space-y-4 text-sm text-slate-700 select-none">
              <div className="flex justify-between">
                <span className="text-slate-500">Room Category</span>
                <span className="font-semibold text-slate-800">{selectedRoomType?.name || "None"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Price per Night</span>
                <span className="font-semibold text-slate-800">₹{roomPricePerNight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rooms Selected</span>
                <span className="font-semibold text-slate-800">{watchRoomsCount} Room{watchRoomsCount > 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nights</span>
                <span className="font-semibold text-slate-800">{nights} Night{nights > 1 ? "s" : ""}</span>
              </div>

              <div className="border-t border-slate-100 pt-4 flex justify-between">
                <span className="text-slate-500">Total Room Cost</span>
                <span className="font-semibold text-slate-800">₹{baseCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Taxes (12% GST)</span>
                <span className="font-semibold text-slate-800">₹{estimatedTax}</span>
              </div>

              <div className="border-t border-slate-200 pt-4 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Total Estimate</span>
                <span className="text-2xl font-extrabold text-brand-red">₹{totalCost}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5 mt-6 flex items-start gap-2.5 text-xs text-slate-500">
              <Info className="w-4 h-4 text-brand-gold-dark flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                This booking will submit a request to the hotel. Payments are settled during check-in. Cancellation policies apply.
              </p>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
