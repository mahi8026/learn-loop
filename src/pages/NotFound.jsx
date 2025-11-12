import React, { useEffect } from "react";
export default function NotFound() {
  useEffect(() => {
    document.title = "404 - Not Found";
  }, []);
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Page not found</p>
    </div>
  );
}
