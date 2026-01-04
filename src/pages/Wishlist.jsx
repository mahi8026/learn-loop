import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Wishlist() {
  // Mock data - replace with your actual state/fetch logic
  const wishlistItems = [
    { id: 1, title: "Modern React & Tailwind Masterclass", price: 200, category: "Development", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400" },
  ];

  return (
    <div className="min-h-screen bg-bg-main p-4 md:p-8 transition-colors duration-300">
      <Helmet><title>My Wishlist | LearnLoop</title></Helmet>

      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-text-title flex items-center gap-3">
            <FaHeart className="text-red-500" /> My Wishlist
          </h1>
          <p className="text-text-body font-medium opacity-70">Courses you've saved for later.</p>
        </header>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-bg-card border border-border-subtle rounded-3xl overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="relative h-44">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-bg-main/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase text-text-title border border-border-subtle">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-text-title mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-2xl font-black text-primary mb-6">${item.price}</p>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                      <FaShoppingCart /> Add to Cart
                    </button>
                    <button className="p-3 bg-bg-main border border-border-subtle text-text-body rounded-xl hover:text-red-500 transition-colors">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-bg-card rounded-4xl border-2 border-dashed border-border-subtle">
            <FaHeart className="text-6xl text-text-body/20 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-text-title">Your wishlist is empty</h2>
            <Link to="/courses" className="text-primary font-bold mt-4 inline-block hover:underline">Browse Courses</Link>
          </div>
        )}
      </div>
    </div>
  );
}