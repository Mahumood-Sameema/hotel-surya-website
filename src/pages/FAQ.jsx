import React, { useEffect, useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { getFAQs } from "../services/dbService";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFAQs()
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 bg-brand-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-red font-semibold text-xs tracking-wider uppercase">Support</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 font-sans">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            Find quick answers to common queries about check-in, check-out, parking, Wi-Fi, rules, and nearby amenities at Hotel Surya Residency.
          </p>
          <div className="w-12 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 text-xs font-semibold">Loading FAQs...</p>
          </div>
        ) : (
          /* Accordion Stack */
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-premium transition-premium animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  
                  {/* Trigger head */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-brand-red transition-colors focus:outline-none"
                  >
                    <span className="text-sm md:text-base leading-snug">{faq.question}</span>
                    <span className="p-1 bg-slate-50 border border-slate-200 text-slate-500 rounded-full flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-brand-red" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {/* Body description */}
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
        )}

      </div>
    </div>
  );
}
