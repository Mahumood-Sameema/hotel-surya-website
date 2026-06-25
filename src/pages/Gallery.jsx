import React, { useEffect, useState } from "react";
import { X, ZoomIn, Info } from "lucide-react";
import { getGalleryImages } from "../services/dbService";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getGalleryImages()
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "exterior", label: "Exterior" },
    { id: "rooms", label: "Rooms" },
    { id: "dining", label: "Dining" },
    { id: "amenities", label: "Amenities" }
  ];

  const filteredImages = images.filter((img) => {
    if (activeFilter === "all") return true;
    return img.category === activeFilter;
  });

  return (
    <div className="py-12 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-red font-semibold text-xs tracking-wider uppercase">Visual Tour</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 font-sans">
            Our Property Gallery
          </h1>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            Take a virtual tour of Surya Residency. View our comfortable accommodations, dining, and premium utilities.
          </p>
          <div className="w-12 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-slate-200 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2 rounded text-sm font-semibold transition-premium shadow-sm ${
                activeFilter === cat.id
                  ? "bg-brand-red text-white"
                  : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-lg bg-white border border-slate-200 p-2 shadow-sm flex flex-col justify-between">
                <div className="w-full h-full rounded bg-slate-100 shimmer" />
              </div>
            ))}
          </div>
        ) : (
          /* Image Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setLightboxImage(img)}
                className="relative h-64 rounded-lg overflow-hidden group shadow-sm hover:shadow-premium border border-slate-200 transition-premium cursor-pointer bg-slate-100"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover overlay details */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-white/90 rounded-full shadow text-brand-red transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                
                {/* Category badge */}
                <span className="absolute bottom-4 left-4 bg-slate-950/60 text-white text-xs font-semibold px-2.5 py-1 rounded capitalize">
                  {img.category}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-lg max-w-lg mx-auto">
            <Info className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800">No Photos Found</h3>
            <p className="text-sm text-slate-500 mt-1">There are no photos under this category at the moment.</p>
          </div>
        )}

      </div>

      {/* Lightbox / Zoom Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4 md:p-10 select-none animate-fade-in">
          
          {/* Close trigger */}
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white hover:text-brand-gold p-2 rounded-full bg-slate-900/50 border border-slate-800 transition-colors focus:outline-none"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Expanded Image panel */}
          <div className="max-w-5xl w-full max-h-[80vh] flex flex-col items-center">
            <img
              src={lightboxImage.url}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[70vh] object-contain rounded-md shadow-2xl border border-slate-800"
            />
            <p className="text-slate-300 text-sm mt-4 font-medium text-center">
              {lightboxImage.alt}
            </p>
            <span className="text-xs text-slate-500 uppercase tracking-widest mt-1 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              Category: {lightboxImage.category}
            </span>
          </div>

        </div>
      )}

    </div>
  );
}
