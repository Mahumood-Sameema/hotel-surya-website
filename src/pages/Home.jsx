import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, Users, ChevronRight, Star, MapPin, 
  Phone, Mail, CheckCircle, Wifi, Shield, Coffee, 
  HelpCircle, Sparkles, Building, Key, Car, Eye, RefreshCw
} from "lucide-react";
import { getWebsiteSettings, getRoomTypes, getGalleryImages } from "../services/dbService";

export default function Home() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Availability Form State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState("1");
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("deluxe_ac");

  useEffect(() => {
    getWebsiteSettings().then(setSettings);
    getRoomTypes().then(setRoomTypes);
    getGalleryImages().then(imgs => setGallery(imgs.slice(0, 6))); // Show top 6 images in preview
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      checkIn,
      checkOut,
      rooms,
      guests,
      roomType
    }).toString();
    navigate(`/book-now?${queryParams}`);
  };

  const whyChooseUs = [
    {
      icon: <MapPin className="w-6 h-6 text-brand-red" />,
      title: "Near Anna Bus Stand",
      desc: "Prime location in Nagercoil, ensuring easy connectivity for travelers."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-red" />,
      title: "Family Friendly",
      desc: "A safe and comfortable environment tailored for family vacations."
    },
    {
      icon: <Building className="w-6 h-6 text-brand-red" />,
      title: "Comfortable Rooms",
      desc: "Well-maintained rooms with premium bedding and modern amenities."
    },
    {
      icon: <Star className="w-6 h-6 text-brand-red" />,
      title: "Affordable Pricing",
      desc: "Premium stay experience at prices that respect your budget."
    },
    {
      icon: <Car className="w-6 h-6 text-brand-red" />,
      title: "Free Parking",
      desc: "Secure and spacious parking facilities for all our guests' vehicles."
    },
    {
      icon: <Key className="w-6 h-6 text-brand-red" />,
      title: "24/7 Front Desk",
      desc: "Our professional team is always available to assist with your needs."
    }
  ];

  const facilities = [
    { icon: <Wifi className="w-5 h-5 text-brand-red" />, name: "High-speed Wi-Fi" },
    { icon: <Car className="w-5 h-5 text-brand-red" />, name: "Secure Parking" },
    { icon: <RefreshCw className="w-5 h-5 text-brand-red" />, name: "Laundry Service" },
    { icon: <Sparkles className="w-5 h-5 text-brand-red" />, name: "Room Service" },
    { icon: <CheckCircle className="w-5 h-5 text-brand-red" />, name: "Daily Housekeeping" },
    { icon: <Building className="w-5 h-5 text-brand-red" />, name: "Elevator Access" },
    { icon: <Key className="w-5 h-5 text-brand-red" />, name: "Front Desk" },
    { icon: <Coffee className="w-5 h-5 text-brand-red" />, name: "Dining Area" }
  ];

  const testimonials = [
    {
      name: "Tejesh Kumar",
      role: "Business Traveler",
      rating: 5,
      initials: "TK",
      comment: "The closest hotel to the bus stand and railway link. Very clean, ventilated, and the service was exceptional. The rooms were cozy and well-maintained."
    },
    {
      name: "Meera S.",
      role: "Family Stay",
      rating: 5,
      initials: "MS",
      comment: "Stayed with my family for 2 days. The staff was very helpful and the food nearby was excellent. Highly recommended for families visiting local temples!"
    },
    {
      name: "Arun Prasad",
      role: "Solo Traveler",
      rating: 5,
      initials: "AP",
      comment: "Professional management and great value for money. The AC worked perfectly and the bed was very comfortable. Will visit again next time I'm in Nagercoil."
    }
  ];

  return (
    <div className="pb-0">
      {/* Hero Section */}
      <section 
        className="relative h-[650px] bg-slate-900 bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.45)), url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80")` 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white select-none">
          <span className="text-brand-gold font-bold tracking-widest text-sm uppercase block mb-3">
            Welcome to Comfort
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Hotel Surya Residency
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-200 mb-8 font-light leading-relaxed">
            {settings?.tagline || "Comfortable stay in the Heart of Nagercoil"}. Experience hospitality that blends professional efficiency with warmth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/book-now"
              className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3.5 rounded font-semibold transition-premium shadow-md text-center"
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-brand-dark text-white px-8 py-3.5 rounded font-semibold transition-premium text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Check Availability Widget */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 -mt-16 md:-mt-24">
        <div className="bg-white rounded-lg shadow-premium border border-slate-100 p-6 md:p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6 text-center md:text-left">
            Check Availability
          </h3>
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Check-In Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red text-slate-700"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Check-Out Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red text-slate-700"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Rooms & Guests
              </label>
              <select
                value={`${rooms}-${guests}`}
                onChange={(e) => {
                  const [r, g] = e.target.value.split("-");
                  setRooms(r);
                  setGuests(g);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red text-slate-700"
              >
                <option value="1-1">1 Room, 1 Guest</option>
                <option value="1-2">1 Room, 2 Guests</option>
                <option value="2-2">2 Rooms, 2 Guests</option>
                <option value="2-4">2 Rooms, 4 Guests</option>
                <option value="3-6">3 Rooms, 6 Guests</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Room Type
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red text-slate-700"
              >
                {roomTypes.map((rt) => (
                  <option key={rt.roomTypeId} value={rt.roomTypeId}>
                    {rt.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-brand-gold hover:bg-brand-gold-dark text-slate-900 font-bold py-3 px-4 rounded transition-premium shadow hover:shadow-md"
              >
                Search Rooms
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-red font-semibold text-xs tracking-wider uppercase">
              Excellence
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Why Choose Us
            </h2>
            <div className="w-12 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((w, index) => (
              <div
                key={index}
                className="bg-slate-50 border border-slate-100 rounded-lg p-6 hover:shadow-premium transition-premium group"
              >
                <div className="p-3 bg-white shadow-sm rounded-lg inline-block mb-4 group-hover:bg-brand-red-bg group-hover:scale-110 transition-premium">
                  {w.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{w.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-red font-semibold text-xs tracking-wider uppercase">
              Accommodation
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Featured Rooms
            </h2>
            <div className="w-12 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomTypes.map((rt) => (
              <div 
                key={rt.roomTypeId} 
                className="bg-white rounded-lg border border-slate-100 overflow-hidden shadow-sm hover:shadow-premium transition-premium flex flex-col h-full"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={rt.image}
                    alt={rt.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {rt.tagline && (
                    <span className="absolute top-4 right-4 bg-brand-gold text-slate-900 text-xs font-bold py-1 px-3.5 rounded-full shadow-sm">
                      {rt.tagline}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 hover:text-brand-red transition-colors">
                      {rt.name}
                    </h3>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded font-medium uppercase">
                      Premium
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
                    {rt.features.join(" • ")}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                    {rt.description}
                  </p>
                  
                  <div className="border-t border-slate-100 pt-5 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-xs text-slate-500 block">Starting from</span>
                      <span className="text-2xl font-bold text-slate-900">₹{rt.basePrice}</span>
                      <span className="text-xs text-slate-500">/ night</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/rooms/${rt.roomTypeId}`}
                        className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3.5 py-2 rounded text-sm font-semibold transition-premium"
                      >
                        Details
                      </Link>
                      <Link
                        to={`/book-now?roomType=${rt.roomTypeId}`}
                        className="bg-brand-red hover:bg-brand-red-dark text-white px-4 py-2 rounded text-sm font-semibold transition-premium shadow-sm"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Facilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-brand-red font-semibold text-xs tracking-wider uppercase block mb-2">
                Amenities
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                Modern Facilities for a Seamless Stay
              </h2>
              <div className="w-12 h-1 bg-brand-gold my-5 rounded-full" />
              <p className="text-slate-600 leading-relaxed mb-8">
                We provide a comprehensive range of services to ensure your business or leisure trip to Nagercoil is perfectly comfortable.
              </p>
              <Link 
                to="/about" 
                className="text-brand-red hover:text-brand-red-dark font-bold text-sm flex items-center gap-1 group"
              >
                <span>View All Services</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {facilities.map((fac, i) => (
                  <div 
                    key={i} 
                    className="p-5 border border-slate-100 rounded-lg flex flex-col items-center text-center hover:border-brand-red hover:shadow-premium transition-premium group"
                  >
                    <div className="p-3 bg-slate-50 group-hover:bg-brand-red-bg rounded-full mb-3 text-brand-red transition-premium">
                      {fac.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 leading-snug">
                      {fac.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div>
              <span className="text-brand-red font-semibold text-xs tracking-wider uppercase block mb-1">
                Visual Tour
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Gallery Preview
              </h2>
            </div>
            <Link
              to="/gallery"
              className="mt-4 sm:mt-0 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-2.5 rounded text-sm font-semibold transition-premium shadow-sm flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-brand-red" />
              <span>View Full Gallery</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((img) => (
              <div 
                key={img.id}
                className="relative h-64 rounded-lg overflow-hidden group shadow-sm hover:shadow-premium transition-premium bg-slate-100"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-sm font-semibold">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-red font-semibold text-xs tracking-wider uppercase">
              Reviews
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              What Our Guests Say
            </h2>
            <div className="w-12 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-100 rounded-lg p-8 shadow-sm hover:shadow-premium transition-premium flex flex-col justify-between"
              >
                <div>
                  <div className="flex space-x-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-brand-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                    "{t.comment}"
                  </p>
                </div>
                <div className="flex items-center gap-3.5 border-t border-slate-100 pt-5 mt-4">
                  <div className="w-10 h-10 rounded-full bg-brand-red-bg flex items-center justify-center text-brand-red font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <span className="text-xs text-slate-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Find Us */}
      <section className="py-20 bg-brand-bg border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Contact Details */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-brand-red font-semibold text-xs tracking-wider uppercase block mb-1">
                Location
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                How to Find Us
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded border border-slate-200 text-brand-red flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Address</h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {settings?.address || "123 Residency Road, City Center, Nagercoil, Tamil Nadu"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded border border-slate-200 text-brand-red flex-shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Landmarks</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {settings?.landmark || "Opposite Anna Bus Stand, 100m from Nagercoil Railway Station"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded border border-slate-200 text-brand-red flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Contact Info</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {settings?.phoneNumber} | {settings?.landline}
                    </p>
                    <p className="text-sm text-slate-600">
                      {settings?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={settings?.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded text-sm font-semibold transition-premium inline-flex items-center gap-2 shadow-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Map Frame */}
            <div className="lg:col-span-7 bg-white p-2.5 rounded-lg shadow-premium border border-slate-200 h-[380px] overflow-hidden">
              <iframe
                title="Hotel Surya Residency Map"
                src={settings?.googleMapsEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.324208479532!2d77.42621007489814!3d8.170068991861058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f13df0d15e9d%3A0xc3911f4cc5bb86a5!2sSurya%20Residency!5e0!3m2!1sen!2sin!4v1719213456789!5m2!1sen!2sin"}
                className="w-full h-full border-0 rounded"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* Book Today Banner */}
      <section className="bg-brand-red py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
                Book Your Stay Today
              </h2>
              <p className="text-sm md:text-base text-brand-red-bg font-light max-w-xl">
                Planning a visit to Nagercoil? Lock in the best rates by booking directly through our website or calling us.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center sm:text-right">
                <span className="block text-xs uppercase tracking-wider text-brand-gold font-semibold">
                  Call for Queries
                </span>
                <a
                  href={`tel:${settings?.phoneNumber?.replace(/\s+/g, "")}`}
                  className="text-xl md:text-2xl font-bold hover:text-brand-gold transition-colors"
                >
                  {settings?.phoneNumber || "+91 98765 43210"}
                </a>
              </div>
              <Link
                to="/book-now"
                className="bg-brand-gold hover:bg-brand-gold-dark text-slate-900 px-6 py-3.5 rounded font-bold text-sm transition-premium shadow hover:scale-105"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
