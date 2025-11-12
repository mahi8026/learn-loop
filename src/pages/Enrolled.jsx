import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function Enrolled() {
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    document.title = "My Enrolled Courses - LearnLoop";
  }, []);

  useEffect(() => {
    if (user)
      axios
        .get(`${import.meta.env.VITE_API_URL}/enrolled?email=${user.email}`)
        .then((r) => setEnrolled(r.data))
        .catch(() => console.error("Failed to load enrolled courses"));
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Enrolled Courses</h1>
      {enrolled.length === 0 ? (
        <p>No enrolled courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {enrolled.map((e) => (
            <div key={e._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{e.title}</h3>
              <p className="text-sm text-gray-500">
                Enrolled on {new Date(e.enrolledAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
