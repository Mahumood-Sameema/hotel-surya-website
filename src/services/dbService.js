import { db, isFirebaseConfigured } from "../firebase/config";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc
} from "firebase/firestore";
import { 
  defaultRoomTypes, 
  defaultRooms, 
  defaultWebsiteSettings, 
  defaultGalleryImages, 
  defaultFAQs 
} from "../utils/seedData";

const LS_KEYS = {
  ROOM_TYPES: "sr_room_types",
  ROOMS: "sr_rooms",
  WEBSITE_SETTINGS: "sr_website_settings",
  GALLERY_IMAGES: "sr_gallery_images",
  FAQS: "sr_faqs",
  BOOKINGS: "sr_bookings",
  CONTACTS: "sr_contacts"
};

const seedLocalStorage = () => {
  if (!localStorage.getItem(LS_KEYS.ROOM_TYPES)) {
    localStorage.setItem(LS_KEYS.ROOM_TYPES, JSON.stringify(defaultRoomTypes));
  }
  if (!localStorage.getItem(LS_KEYS.ROOMS)) {
    localStorage.setItem(LS_KEYS.ROOMS, JSON.stringify(defaultRooms));
  }
  if (!localStorage.getItem(LS_KEYS.WEBSITE_SETTINGS)) {
    localStorage.setItem(LS_KEYS.WEBSITE_SETTINGS, JSON.stringify(defaultWebsiteSettings));
  }
  if (!localStorage.getItem(LS_KEYS.GALLERY_IMAGES)) {
    localStorage.setItem(LS_KEYS.GALLERY_IMAGES, JSON.stringify(defaultGalleryImages));
  }
  if (!localStorage.getItem(LS_KEYS.FAQS)) {
    localStorage.setItem(LS_KEYS.FAQS, JSON.stringify(defaultFAQs));
  }
  if (!localStorage.getItem(LS_KEYS.BOOKINGS)) {
    localStorage.setItem(LS_KEYS.BOOKINGS, JSON.stringify([]));
  }
  if (!localStorage.getItem(LS_KEYS.CONTACTS)) {
    localStorage.setItem(LS_KEYS.CONTACTS, JSON.stringify([]));
  }
};

seedLocalStorage();

export const getWebsiteSettings = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "website_settings", "settings");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        await setDoc(docRef, defaultWebsiteSettings);
        return defaultWebsiteSettings;
      }
    } catch (e) {
      console.warn("Firestore error reading settings, falling back to LocalStorage:", e);
    }
  }
  return JSON.parse(localStorage.getItem(LS_KEYS.WEBSITE_SETTINGS)) || defaultWebsiteSettings;
};

export const getRoomTypes = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "room_types");
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        return snap.docs.map(doc => doc.data());
      } else {
        for (const rt of defaultRoomTypes) {
          await setDoc(doc(db, "room_types", rt.roomTypeId), rt);
        }
        return defaultRoomTypes;
      }
    } catch (e) {
      console.warn("Firestore error reading room types, falling back to LocalStorage:", e);
    }
  }
  return JSON.parse(localStorage.getItem(LS_KEYS.ROOM_TYPES)) || defaultRoomTypes;
};

export const getRoomTypeById = async (roomTypeId) => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "room_types", roomTypeId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data();
      }
    } catch (e) {
      console.warn("Firestore error reading room type, falling back to LocalStorage:", e);
    }
  }
  const rts = JSON.parse(localStorage.getItem(LS_KEYS.ROOM_TYPES)) || defaultRoomTypes;
  return rts.find(rt => rt.roomTypeId === roomTypeId) || null;
};

export const getRooms = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "rooms");
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        return snap.docs.map(doc => doc.data());
      } else {
        for (const r of defaultRooms) {
          await setDoc(doc(db, "rooms", r.roomId), r);
        }
        return defaultRooms;
      }
    } catch (e) {
      console.warn("Firestore error reading rooms, falling back to LocalStorage:", e);
    }
  }
  return JSON.parse(localStorage.getItem(LS_KEYS.ROOMS)) || defaultRooms;
};

export const getGalleryImages = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "gallery_images");
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        return snap.docs.map(doc => doc.data());
      } else {
        for (const img of defaultGalleryImages) {
          await setDoc(doc(db, "gallery_images", img.id), img);
        }
        return defaultGalleryImages;
      }
    } catch (e) {
      console.warn("Firestore error reading gallery, falling back to LocalStorage:", e);
    }
  }
  return JSON.parse(localStorage.getItem(LS_KEYS.GALLERY_IMAGES)) || defaultGalleryImages;
};

export const getFAQs = async () => {
  if (isFirebaseConfigured && db) {
    try {
      // In firestore settings doc we can store faqs or subcollection.
      // We will seed and fetch settings first or fallback.
      const docRef = doc(db, "website_settings", "settings");
      const snap = await getDoc(docRef);
      if (snap.exists() && snap.data().faqs) {
        return snap.data().faqs;
      }
    } catch (e) {
      console.warn("Firestore error reading FAQs, falling back to LocalStorage:", e);
    }
  }
  return JSON.parse(localStorage.getItem(LS_KEYS.FAQS)) || defaultFAQs;
};

const generateBookingRef = () => {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `SR-${year}${month}${day}-${rand}`;
};

export const createBookingRequest = async (bookingData) => {
  const bookingRef = generateBookingRef();
  const finalBooking = {
    ...bookingData,
    bookingRef,
    status: "Pending", // Default lifecycle status
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, "booking_requests"), finalBooking);
      return { id: docRef.id, ...finalBooking };
    } catch (e) {
      console.warn("Firestore failed to create booking request, saving to local mock:", e);
    }
  }

  const bookings = JSON.parse(localStorage.getItem(LS_KEYS.BOOKINGS)) || [];
  const localDocId = "mock_" + Math.random().toString(36).substring(2, 9);
  const bookingRecord = { id: localDocId, ...finalBooking };
  bookings.push(bookingRecord);
  localStorage.setItem(LS_KEYS.BOOKINGS, JSON.stringify(bookings));
  return bookingRecord;
};

export const submitContactInquiry = async (inquiryData) => {
  const finalInquiry = {
    ...inquiryData,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, "contact_inquiries"), finalInquiry);
      return { id: docRef.id, ...finalInquiry };
    } catch (e) {
      console.warn("Firestore failed to submit inquiry, saving to local mock:", e);
    }
  }

  const contacts = JSON.parse(localStorage.getItem(LS_KEYS.CONTACTS)) || [];
  const localDocId = "inq_" + Math.random().toString(36).substring(2, 9);
  const inquiryRecord = { id: localDocId, ...finalInquiry };
  contacts.push(inquiryRecord);
  localStorage.setItem(LS_KEYS.CONTACTS, JSON.stringify(contacts));
  return inquiryRecord;
};

// Help helper for reading local bookings for confirmation screen (if details requested by page check)
export const getBookingByRef = async (bookingRef) => {
  if (isFirebaseConfigured && db) {
    try {
      // In a real application we would use query(collection(db, "booking_requests"), where("bookingRef", "==", bookingRef))
      // Let's implement it for Firestore compatibility
      const colRef = collection(db, "booking_requests");
      const snap = await getDocs(colRef);
      const found = snap.docs.map(d => ({ id: d.id, ...d.data() })).find(b => b.bookingRef === bookingRef);
      if (found) return found;
    } catch (e) {
      console.warn("Firestore search failed, using LocalStorage fallback:", e);
    }
  }
  const bookings = JSON.parse(localStorage.getItem(LS_KEYS.BOOKINGS)) || [];
  return bookings.find(b => b.bookingRef === bookingRef) || null;
};
