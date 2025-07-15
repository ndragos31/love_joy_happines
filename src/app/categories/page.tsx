"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Categories />
      </main>
      <Footer />
    </div>
  );
}
