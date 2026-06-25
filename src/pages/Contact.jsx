import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  MapPin, Phone, Mail, Send, ChevronDown, 
  ChevronUp, MessageSquare, CheckCircle, ExternalLink 
} from "lucide-react";
import { getWebsiteSettings, submitContactInquiry, getFAQs } from "../services/dbService";
import { showToast } from "../utils/toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function Contact() {
  const [settings, setSettings] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema)
  });

  useEffect(() => {
    getWebsiteSettings().then(setSettings);
    getFAQs().then(setFaqs);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await submitContactInquiry(data);
      if (response && response.id) {
        setSubmittedInquiryId(response.id);
        showToast("Your message was sent successfully!", "success");
        reset();
      }
    } catch (e) {
      console.error(e);
      showToast("Submission failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppContactUrl = () => {
    if (!settings) return "#";
    const text = encodeURIComponent("Hi, I have an inquiry about Hotel Surya Residency.");
    return `https://wa.me/${settings.whatsAppNumber}?text=${text}`;
  };

  return (
    <div className="py-12 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
            Get in Touch
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-4 leading-relaxed font-light">
            Whether you're visiting for business or leisure, our team at Surya Residency is here to ensure your stay in Nagercoil is exceptional.
          </p>
          <div className="w-12 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Info & Message Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Location Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-premium transition-premium flex gap-4">
              <div className="p-3 bg-brand-red-bg text-brand-red rounded-lg h-fit flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Our Location</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {settings?.address || "Near Anna Bus Stand, Meenakshipuram, Nagercoil, Tamil Nadu - 629001"}
                </p>
              </div>
            </div>

            {/* Phone numbers Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-premium transition-premium flex gap-4">
              <div className="p-3 bg-brand-red-bg text-brand-red rounded-lg h-fit flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Phone Numbers</h3>
                <a 
                  href={`tel:${settings?.phoneNumber?.replace(/\s+/g, "")}`}
                  className="text-sm text-slate-600 hover:text-brand-red block"
                >
                  {settings?.phoneNumber || "+91 98765 43210"}
                </a>
                <a 
                  href={`tel:${settings?.landline}`}
                  className="text-sm text-slate-600 hover:text-brand-red block"
                >
                  {settings?.landline || "04652 234567"}
                </a>
              </div>
            </div>

            {/* Email us Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-premium transition-premium flex gap-4">
              <div className="p-3 bg-brand-red-bg text-brand-red rounded-lg h-fit flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Email Us</h3>
                <a 
                  href={`mailto:${settings?.email}`}
                  className="text-sm text-slate-600 hover:text-brand-red block"
                >
                  {settings?.email || "info@suryaresidency.com"}
                </a>
                <a 
                  href={`mailto:${settings?.bookingsEmail}`}
                  className="text-sm text-slate-600 hover:text-brand-red block"
                >
                  {settings?.bookingsEmail || "bookings@suryaresidency.com"}
                </a>
              </div>
            </div>

            {/* WhatsApp Contact Helper Widget */}
            <div className="bg-brand-gold-bg border border-brand-gold/30 rounded-lg p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-brand-gold-dark font-bold text-sm">
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Chat via WhatsApp</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need immediate replies about availability, rates, or amenities? Start a direct chat.
              </p>
              <a
                href={getWhatsAppContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-gold hover:bg-brand-gold-dark text-slate-900 text-center font-bold text-xs py-2 px-4 rounded transition-premium shadow-sm hover:scale-102 flex items-center justify-center gap-1.5"
              >
                <span>Message Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Side: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-premium select-none">
              
              {submittedInquiryId ? (
                /* Success State */
                <div className="text-center py-10 animate-fade-in">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                    Thank you for reaching out. We have logged your request under reference ID <span className="font-semibold text-slate-700">#{submittedInquiryId}</span>. Our desk will contact you shortly.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => setSubmittedInquiryId(null)}
                      className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-5 py-2.5 rounded text-sm font-semibold transition-premium"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={getWhatsAppContactUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba56] text-white px-5 py-2.5 rounded text-sm font-semibold transition-premium flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* Message Form */
                <>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Full Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          {...register("name")}
                          className={`w-full bg-slate-50 border rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red ${
                            errors.name ? "border-red-400 focus:border-red-400" : "border-slate-200"
                          }`}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                      </div>
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
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Subject</label>
                      <input
                        type="text"
                        placeholder="Room Reservation, Feedback, etc."
                        {...register("subject")}
                        className={`w-full bg-slate-50 border rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red ${
                          errors.subject ? "border-red-400 focus:border-red-400" : "border-slate-200"
                        }`}
                      />
                      {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Your Message</label>
                      <textarea
                        rows="4"
                        placeholder="How can we help you?"
                        {...register("message")}
                        className={`w-full bg-slate-50 border rounded px-3 py-2.5 text-sm focus:outline-none focus:bg-white text-slate-700 focus:border-brand-red ${
                          errors.message ? "border-red-400 focus:border-red-400" : "border-slate-200"
                        }`}
                      />
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3 px-4 rounded text-sm transition-premium flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

            </div>
          </div>

        </div>

        {/* Centered Map Card */}
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-lg p-6 shadow-sm text-center mb-20 select-none">
          <div className="p-3 bg-brand-red-bg text-brand-red rounded-full w-fit mx-auto mb-4 border border-brand-red/10">
            <MapPin className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Find Us Here</h2>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
            Centrally located near Anna Bus Stand for your absolute convenience.
          </p>
          <a
            href={settings?.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-red hover:bg-brand-red-dark text-white font-bold px-6 py-3 rounded text-sm transition-premium inline-block shadow-sm"
          >
            Open in Google Maps
          </a>
        </div>

        {/* FAQs list accordion */}
        <div className="border-t border-slate-250 pt-16 select-none">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Find quick answers to common queries about your stay.
            </p>
            <div className="w-10 h-1 bg-brand-gold mx-auto mt-3 rounded-full" />
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-premium transition-premium"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-brand-red transition-colors focus:outline-none"
                  >
                    <span className="text-sm leading-snug">{faq.question}</span>
                    <span className="p-1 bg-slate-50 border border-slate-200 text-slate-500 rounded-full flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-brand-red" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100 border-t border-slate-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="p-5 text-sm text-slate-600 leading-relaxed bg-slate-50">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
