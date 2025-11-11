import React from "react";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>© {new Date().getFullYear()} LearnLoop</div>
        <div className="space-x-3">X | LinkedIn | GitHub</div>
      </div>
    </footer>
  );
}
