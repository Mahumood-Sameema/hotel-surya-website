export const defaultRoomTypes = [
  {
    roomTypeId: "standard_non_ac",
    name: "Standard Non-AC",
    tagline: "Economy Choice",
    basePrice: 1499,
    description: "Essential comfort for the practical traveler. Clean, ventilated, and perfectly arranged for a budget-friendly stay in the heart of Nagercoil.",
    capacity: "2 Adults",
    features: ["Free Wi-Fi", "Smart TV", "2 Adults"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    amenities: {
      ac: false,
      wifi: true,
      breakfast: "Optional",
      seating: "None",
      roomService: "Limited"
    }
  },
  {
    roomTypeId: "deluxe_ac",
    name: "Deluxe AC",
    tagline: "Most Popular",
    basePrice: 2499,
    description: "Modern amenities and climate control for a relaxing escape from the city heat. Features cozy bedding and modern decor for an outstanding stay.",
    capacity: "2 Guests",
    features: ["Full AC", "High-speed Wi-Fi", "Tea/Coffee"],
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    amenities: {
      ac: true,
      wifi: true,
      breakfast: "Included",
      seating: "Desk",
      roomService: "24/7"
    }
  },
  {
    roomTypeId: "suite_ac",
    name: "Suite AC",
    tagline: "Premium Luxury",
    basePrice: 4499,
    description: "Our flagship experience with separate living spaces, perfect for families or guests seeking ultimate luxury. Experience premium hospitality.",
    capacity: "3 Guests",
    features: ["Living Area", "King Size Bed", "Mini Bar"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    amenities: {
      ac: true,
      wifi: true,
      breakfast: "Included",
      seating: "Sofa Set",
      roomService: "24/7 Priority"
    }
  }
];

export const defaultRooms = [
  { roomId: "101", roomNumber: "101", roomTypeId: "standard_non_ac", floor: 1, status: "available" },
  { roomId: "102", roomNumber: "102", roomTypeId: "standard_non_ac", floor: 1, status: "available" },
  { roomId: "201", roomNumber: "201", roomTypeId: "deluxe_ac", floor: 2, status: "available" },
  { roomId: "202", roomNumber: "202", roomTypeId: "deluxe_ac", floor: 2, status: "available" },
  { roomId: "301", roomNumber: "301", roomTypeId: "suite_ac", floor: 3, status: "available" }
];

export const defaultWebsiteSettings = {
  hotelName: "Surya Residency",
  tagline: "Comfortable stay in the Heart of Nagercoil",
  address: "123 Residency Road, City Center, Nagercoil, Kanyakumari District, Tamil Nadu - 629001",
  landmark: "Opposite Anna Bus Stand, 100m from Nagercoil Railway Station",
  phoneNumber: "+91 98765 43210",
  landline: "04652 234567",
  email: "info@suryaresidency.com",
  bookingsEmail: "bookings@suryaresidency.com",
  whatsAppNumber: "919876543210", // raw international format for links api.whatsapp.com/send?phone=...
  whatsAppDisplay: "+91 98765 43210",
  googleMapsUrl: "https://maps.google.com/?q=Surya+Residency+Nagercoil",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.324208479532!2d77.42621007489814!3d8.170068991861058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f13df0d15e9d%3A0xc3911f4cc5bb86a5!2sSurya%20Residency!5e0!3m2!1sen!2sin!4v1719213456789!5m2!1sen!2sin",
  checkInTime: "12:00 PM",
  checkOutTime: "11:00 AM",
  facebookUrl: "https://facebook.com/suryaresidency",
  instagramUrl: "https://instagram.com/suryaresidency",
  youtubeUrl: "https://youtube.com/suryaresidency",
  footerInformation: "Your trusted partner in hospitality, delivering quality and comfort for over 15 years.",
  copyrightText: "© 2026 Hotel Surya Residency. All rights reserved."
};

export const defaultGalleryImages = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    category: "exterior",
    alt: "Hotel Surya Residency Exterior Facade"
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    category: "rooms",
    alt: "Standard Non-AC Room Interior"
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    category: "rooms",
    alt: "Deluxe AC Room Bedding"
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    category: "rooms",
    alt: "Suite AC Living Space and Bedroom"
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    category: "amenities",
    alt: "Hotel Lobby Hallway and corridor"
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    category: "dining",
    alt: "Delicious South Indian Breakfast Platter"
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    category: "amenities",
    alt: "Modern Front Desk Reception"
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    category: "amenities",
    alt: "In-Room Study Desk and Laptop Workspace"
  }
];

export const defaultFAQs = [
  {
    question: "What are the check-in and check-out times for HOTEL SURYA RESIDENCY in Meenakshipuram, Nagercoil?",
    answer: "Our standard check-in time is 12:00 PM (noon), and check-out is 11:00 AM. Early check-in and late check-out are subject to room availability and may incur nominal additional charges. Please contact the reception desk in advance."
  },
  {
    question: "Could you provide information on the nearby landmark for HOTEL SURYA RESIDENCY in Meenakshipuram, Nagercoil?",
    answer: "Hotel Surya Residency is centrally located right opposite the Anna Bus Stand in Meenakshipuram, Nagercoil. It is just a 15-minute drive (4.5 km) from the Nagercoil Railway Station, making it highly accessible for all travelers."
  },
  {
    question: "What are some of the amenities offered by HOTEL SURYA RESIDENCY?",
    answer: "We offer modern amenities including individually controlled air conditioning (for Deluxe and Suites), complimentary high-speed Wi-Fi internet access throughout the hotel, secure on-site parking, 24/7 power backup with industrial generators, professional laundry services, and daily housekeeping."
  },
  {
    question: "What type of services are available in HOTEL SURYA RESIDENCY?",
    answer: "Our services include 24/7 front desk assistance, room service from our dedicated kitchen staff, doctor-on-call, travel desk support for sightseeing and local transit, and secure luggage storage."
  },
  {
    question: "What forms of payment does the hotel accept?",
    answer: "We accept all major credit cards, debit cards, UPI payments (Google Pay, PhonePe, Paytm), Net Banking, and cash. Please note that a valid government-issued ID proof (Aadhar card, Passport, Voter ID) must be presented during check-in."
  },
  {
    question: "Can I amend my booking at HOTEL SURYA RESIDENCY in Meenakshipuram, Nagercoil?",
    answer: "Yes, modifications to your stay dates or room category can be made by contacting our bookings team directly. Amendments are subject to room availability and our cancellation policies."
  },
  {
    question: "What transfer facilities are offered at the hotel?",
    answer: "We can arrange taxi pick-ups and drop-offs to the Railway Station or the nearest International Airport (Trivandrum, 22 km/45 mins away) upon request at a nominal charge. Please mention this during your booking request."
  }
];

export const defaultTestimonials = [
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
