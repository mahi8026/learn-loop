import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IoSearchOutline, IoFilterOutline } from "react-icons/io5";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/courses`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Filter & Search Logic
  const filteredCourses = courses
    .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
    .filter(c => filter === "all" ? true : c.category === filter)
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  const categories = ["all", ...new Set(courses.map(c => c.category))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <Helmet><title>Explore Courses | LearnLoop</title></Helmet>
      
      <div className="container mx-auto px-4">
        {/* Header & Controls */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black mb-4 dark:text-white">Expand Your Horizons</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Discover world-class courses designed by industry experts to help you achieve your career goals.</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 items-center justify-between mb-10">
          <div className="relative w-full md:w-96">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by course title..." 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 ring-indigo-500 outline-none transition-all dark:text-white"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <select 
              className="select select-bordered bg-gray-50 dark:bg-gray-800 border-none rounded-xl"
              onChange={(e) => setFilter(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
            </select>
            <select 
              className="select select-bordered bg-gray-50 dark:bg-gray-800 border-none rounded-xl"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Sort By</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-80 w-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCourses.map((course) => (
              <div key={course._id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">{course.category}</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-2 dark:text-white line-clamp-2">{course.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">{course.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-2xl font-black text-indigo-600">${course.price}</span>
                    <Link to={`/courses/${course._id}`} className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-600 hover:text-white transition-colors dark:text-white">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}