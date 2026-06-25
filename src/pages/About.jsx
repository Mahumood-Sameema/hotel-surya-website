import React, { useEffect, useState } from "react";
import { 
  Clock, ShieldAlert, Users, MapPin, 
  Compass, Wifi, Car, Clock3, Utensils, Shirt, Zap, HelpCircle
} from "lucide-react";
import { getWebsiteSettings } from "../services/dbService";

export default function About() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getWebsiteSettings().then(setSettings);
  }, []);

  const premiumFacilities = [
    {
      icon: <Zap className="w-5 h-5 text-brand-red" />,
      title: "Deluxe AC Rooms",
      desc: "Individually controlled air conditioning to ensure your absolute comfort regardless of the weather outside."
    },
    {
      icon: <Wifi className="w-5 h-5 text-brand-red" />,
      title: "High-Speed Wi-Fi",
      desc: "Complimentary high-speed internet access throughout the premises for all your business and leisure needs."
    },
    {
      icon: <Car className="w-5 h-5 text-brand-red" />,
      title: "Secure Parking",
      desc: "Dedicated, safe on-site parking for guests traveling with their own vehicles."
    },
    {
      icon: <Utensils className="w-5 h-5 text-brand-red" />,
      title: "24/7 Room Service",
      desc: "Our dedicated kitchen staff is ready to serve you fresh, delicious meals at any hour of the day."
    },
    {
      icon: <Shirt className="w-5 h-5 text-brand-red" />,
      title: "Laundry Services",
      desc: "Professional same-day laundry and dry cleaning services for a crisp, corporate-ready appearance."
    },
    {
      icon: <Zap className="w-5 h-5 text-brand-red" />,
      title: "Full Power Backup",
      desc: "Uninterrupted power supply with industrial-grade generators to keep your stay smooth and comfortable."
    }
  ];

  const attractions = [
    {
      title: "Anna Bus Stand",
      desc: "Just 2 minutes walk. The central hub for all city and interstate transit."
    },
    {
      title: "Heritage Temples",
      desc: "Historic city temples located within a 3km radius."
    },
    {
      title: "Local Markets",
      desc: "Vibrant textile and spice markets reachable in 5 minutes by auto."
    }
  ];

  const policies = [
    {
      icon: <Clock className="w-6 h-6 text-brand-red" />,
      title: "Check-in / Out",
      desc: [
        `Check-in: ${settings?.checkInTime || "12:00 PM"}`,
        `Check-out: ${settings?.checkOutTime || "11:00 AM"}`,
        "Early check-in is subject to availability."
      ]
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-brand-red" />,
      title: "Identification",
      desc: [
        "Government-issued ID (Aadhar, Voter ID, Passport) required for all adults during check-in.",
        "PAN cards are not accepted as valid proof."
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-brand-red" />,
      title: "Guest Policy",
      desc: [
        "Children under 12 stay free with existing bedding.",
        "Extra bed available upon request for a nominal charge."
      ]
    }
  ];

  return (
    <div>
      {/* About Page Hero */}
      <section 
        className="relative h-[400px] bg-slate-900 bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.55)), url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80")` 
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            A Legacy of Comfort
          </h1>
          <p className="text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-2xl mx-auto">
            Since our inception, Surya Residency has been the cornerstone of hospitality, blending modern efficiency with traditional South Indian warmth.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-6">
              <span className="text-brand-red font-bold text-xs tracking-wider uppercase block mb-2">
                Our Story
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Your Home in the Heart of the City
              </h2>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  Surya Residency was established with a singular vision: to provide travelers with a sanctuary of reliability and comfort. Over the years, we have evolved into a trusted destination for both business professionals and families visiting our vibrant city.
                </p>
                <p>
                  Our values are rooted in the rich traditions of hospitality. We believe that every guest deserves personalized attention, seamless service, and a peaceful environment to rest. Whether you're here for a quick business meeting or an extended family pilgrimage, our staff is dedicated to making your stay exceptional.
                </p>
              </div>

              {/* Statistics */}
              <div className="flex gap-10 mt-8">
                <div>
                  <span className="text-4xl font-extrabold text-brand-red block mb-1">15+</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Years of Service</span>
                </div>
                <div>
                  <span className="text-4xl font-extrabold text-brand-red block mb-1">50k+</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Happy Guests</span>
                </div>
              </div>
            </div>

            {/* Story Graphic */}
            <div className="lg:col-span-6">
              <div className="bg-slate-100 rounded-lg overflow-hidden shadow-premium h-[380px]">
                <img
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
                  alt="Surya Residency Staff Greeting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Premium Facilities */}
      <section className="py-20 bg-brand-bg border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Premium Facilities
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Designed for your convenience and productivity.
            </p>
            <div className="w-12 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFacilities.map((fac, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-100 rounded-lg p-6 shadow-sm hover:shadow-premium transition-premium group"
              >
                <div className="p-3 bg-brand-bg rounded-lg inline-block text-brand-red mb-4 group-hover:bg-brand-red-bg transition-premium">
                  {fac.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{fac.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{fac.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Nearby */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Attraction details */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
                Explore Nearby
              </h2>
              
              <div className="space-y-6">
                {attractions.map((att, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-2 bg-slate-50 rounded border border-slate-200 text-brand-red flex-shrink-0">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{att.title}</h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{att.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transit info card */}
              <div className="mt-8 bg-brand-gold-bg border border-brand-gold/30 rounded-lg p-5">
                <span className="text-xs uppercase font-bold tracking-wider text-brand-gold-dark block mb-2">
                  Easy Access
                </span>
                <p className="text-sm text-slate-700 font-medium">
                  Railway Station: <span className="text-brand-dark font-bold">15 mins (4.5 km)</span>
                </p>
                <p className="text-sm text-slate-700 font-medium mt-1">
                  International Airport: <span className="text-brand-dark font-bold">45 mins (22 km)</span>
                </p>
              </div>
            </div>

            {/* Map Preview */}
            <div className="lg:col-span-7 bg-slate-100 p-2 border border-slate-200 rounded-lg h-[350px] overflow-hidden">
              <iframe
                title="Attractions Map"
                src={settings?.googleMapsEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.324208479532!2d77.42621007489814!3d8.170068991861058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f13df0d15e9d%3A0xc3911f4cc5bb86a5!2sSurya%20Residency!5e0!3m2!1sen!2sin!4v1719213456789!5m2!1sen!2sin"}
                className="w-full h-full border-0 rounded"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* Hotel Policies */}
      <section className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Hotel Policies
            </h2>
            <div className="w-12 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {policies.map((p, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4 mb-4">
                  <div className="p-2 bg-brand-red-bg rounded-lg text-brand-red">
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-slate-900">{p.title}</h3>
                </div>
                <div className="space-y-2">
                  {p.desc.map((line, lIdx) => (
                    <p key={lIdx} className="text-sm text-slate-600 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
