import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  IoSearchOutline,
  IoFilterOutline,
  IoChevronDownOutline,
} from "react-icons/io5";

// --- PROFESSIONAL SKELETON (LIGHT THEME) ---
const CourseSkeleton = () => (
  <div className="bg-bg-card border border-border-subtle rounded-4xl overflow-hidden flex flex-col h-[420px] relative shadow-sm">
    {/* Animated Shimmer Overlay */}
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/40 to-transparent z-10" />
    <div className="h-48 w-full bg-gray-200/50" />
    <div className="p-6 flex flex-col flex-1 space-y-4">
      <div className="h-4 bg-primary/10 rounded-full w-1/4" />
      <div className="space-y-2">
        <div className="h-5 bg-gray-200/50 rounded-full w-full" />
        <div className="h-5 bg-gray-200/50 rounded-full w-2/3" />
      </div>
      <div className="mt-auto flex justify-between items-center pt-4 border-t border-border-subtle/50">
        <div className="h-6 bg-gray-200/50 rounded-lg w-16" />
        <div className="h-10 bg-primary/10 rounded-xl w-28" />
      </div>
    </div>
  </div>
);

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses`, {
          withCredentials: true 
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
      .filter((c) => (filter === "all" ? true : c.category === filter))
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        return 0;
      });
  }, [courses, search, filter, sort]);

  const categories = ["all", ...new Set(courses.map((c) => c.category))];

  return (
    <div className="min-h-screen bg-bg-main text-text-body pb-10 px-4 relative overflow-x-hidden selection:bg-primary/20">
      <Helmet>
        <title>Explore Courses | LearnLoop</title>
      </Helmet>

      {/* --- LIGHT THEME AMBIENT GLOWS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 pt-8 md:pt-12">
        {/* HEADER */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-text-title tracking-tight mb-4">
            Explore the <span className="text-primary">Catalog.</span>
          </h1>
          <p className="text-lg text-text-body opacity-80 max-w-2xl">
            Filter through our verified engineering tracks and find your next
            career leap.
          </p>
        </div>

        {/* --- CONTROLS BAR --- */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-lg shadow-black/5 p-3 rounded-3xl flex flex-wrap gap-3 items-center justify-between mb-12 sticky top-6 z-40 transition-all">
          {/* Search */}
          <div className="relative w-full md:w-96 group">
            <IoSearchOutline
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body/50 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search specific skills..."
              className="w-full pl-12 pr-4 py-3 bg-bg-main/50 border border-border-subtle rounded-xl focus:ring-2 ring-primary/20 focus:border-primary outline-none transition-all text-text-title placeholder:text-text-body/40 font-medium"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <div className="relative flex-1 md:flex-none">
              <select
                className="w-full bg-bg-main/50 border border-border-subtle text-text-title py-3 px-6 rounded-xl outline-none focus:ring-2 ring-primary/20 cursor-pointer appearance-none pr-12 font-bold text-sm uppercase tracking-wider"
                onChange={(e) => setFilter(e.target.value)}
              >
                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="text-text-body font-medium"
                  >
                    {cat.toUpperCase()}
                  </option>
                ))}
              </select>
              <IoFilterOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-text-body/50 pointer-events-none" />
            </div>

            {/* Price Sort */}
            <div className="relative flex-1 md:flex-none">
              <select
                className="w-full bg-bg-main/50 border border-border-subtle text-text-title py-3 px-6 rounded-xl outline-none focus:ring-2 ring-primary/20 cursor-pointer appearance-none pr-12 font-bold text-sm uppercase tracking-wider"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">SORT BY</option>
                <option value="low">PRICE: LOW</option>
                <option value="high">PRICE: HIGH</option>
              </select>
              <IoChevronDownOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-text-body/50 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* --- COURSE GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            [...Array(8)].map((_, i) => <CourseSkeleton key={i} />)
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course._id}
                className="group bg-bg-card rounded-4xl overflow-hidden border border-border-subtle hover:border-primary/50 transition-all duration-500 flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={course.image || course.imageURL}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 text-text-title text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                    {course.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-3 text-text-title line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-text-body/70 text-sm line-clamp-2 mb-8 leading-relaxed font-medium">
                    {course.description}
                  </p>

                  {/* Meta Footer */}
                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-border-subtle/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-text-body/40 font-black">
                        Investment
                      </span>
                      <span className="text-2xl font-black text-text-title tracking-tight">
                        ${course.price}
                      </span>
                    </div>
                    <button class="group relative inline-flex overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                      <span class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"></span>

                      <span class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-medium backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-950/90">
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          fill="none"
                          class="mr-2 h-5 w-5 text-pink-500 transition-transform duration-300 group-hover:-translate-x-1"
                        >
                          <path
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                            stroke-width="2"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                          ></path>
                        </svg>

                        <Link to={`/courses/${course._id}`}>View</Link>

                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          fill="none"
                          class="ml-2 h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <path
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            stroke-width="2"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="col-span-full text-center py-32 bg-bg-card/30 rounded-[3rem] border-2 border-dashed border-border-subtle/50">
              <div className="bg-bg-main w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-border-subtle">
                <IoSearchOutline size={32} className="text-text-body/30" />
              </div>
              <h2 className="text-2xl font-black text-text-title mb-2">
                No courses found.
              </h2>
              <p className="text-text-body/60 font-medium max-w-xs mx-auto">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                }}
                className="mt-8 text-primary font-bold text-sm hover:opacity-80 transition-opacity border-b-2 border-primary/20 pb-0.5"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
