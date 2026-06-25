import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Rooms from "../pages/Rooms";
import RoomDetails from "../pages/RoomDetails";
import Gallery from "../pages/Gallery";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import BookNow from "../pages/BookNow";
import BookingConfirmation from "../pages/BookingConfirmation";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/booking-confirmation/:reference" element={<BookingConfirmation />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}
