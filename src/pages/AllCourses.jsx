import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IoSearchOutline, IoFilterOutline, IoChevronDownOutline } from "react-icons/io5";

// --- PROFESSIONAL GLASS SKELETON ---
const CourseSkeleton = () => (
  <div className="bg-bg-card border border-white/5 rounded-[2rem] overflow-hidden flex flex-col h-[420px] relative">
    {/* Animated Shimmer Overlay - uses your CSS v4 animation */}
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/5 to-transparent z-10" />
    <div className="h-48 w-full bg-slate-800/50" />
    <div className="p-6 flex flex-col flex-1 space-y-4">
      <div className="h-4 bg-primary/20 rounded-full w-1/4" />
      <div className="space-y-2">
        <div className="h-5 bg-slate-800/40 rounded-full w-full" />
        <div className="h-5 bg-slate-800/40 rounded-full w-2/3" />
      </div>
      <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
        <div className="h-6 bg-slate-800/40 rounded-lg w-16" />
        <div className="h-10 bg-primary/20 rounded-xl w-28" />
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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setTimeout(() => setLoading(false));
      }
    };
    fetchCourses();
  }, []);

  // Filter & Search Logic [Requirement 5]
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
    <div className="min-h-screen bg-bg-main text-slate-100 pb-2 px-4 relative overflow-hidden">
      <Helmet>
        <title>Explore Courses | LearnLoop</title>
      </Helmet>

      {/* Ambient Background Glows [Requirement 1] */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[100px]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* --- CONTROLS BAR [Requirement 5] --- */}
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 p-2 rounded-3xl flex flex-wrap gap-2 items-center justify-between mb-8 sticky top-4 z-30 shadow-2xl">
          {/* Search */}
          <div className="relative w-full md:w-96 group">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3 bg-slate-900/40 border border-white/5 rounded-2xl focus:ring-2 ring-indigo-500/50 outline-none transition-all text-white placeholder:text-slate-500"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select
                className="w-full bg-slate-900/40 border border-white/5 text-slate-300 py-3 px-6 rounded-2xl outline-none focus:ring-2 ring-indigo-500/50 cursor-pointer appearance-none pr-12"
                onChange={(e) => setFilter(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-bg-main ">{cat.toUpperCase()}</option>
                ))}
              </select>
              <IoFilterOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Price Sort */}
            <div className="relative flex-1 md:flex-none">
              <select
                className="w-full bg-slate-900/40 border border-white/5 text-slate-300 py-3 px-6 rounded-2xl outline-none focus:ring-2 ring-indigo-500/50 cursor-pointer appearance-none pr-12"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default" className="bg-bg-main">Sort By</option>
                <option value="low" className="bg-bg-main">Price: Low to High</option>
                <option value="high" className="bg-bg-main">Price: High to Low</option>
              </select>
              <IoChevronDownOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* --- COURSE GRID [Requirement 3] --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            [...Array(8)].map((_, i) => <CourseSkeleton key={i} />)
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course._id}
                className="group bg-bg-card/50 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all duration-500 flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.2)]"
              >
                {/* Image Section [Consistent Height] */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image || course.imageURL} // Handles mismatched key names
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                    {course.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-2 text-white line-clamp-2 leading-snug group-hover:text-indigo-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-6 leading-relaxed">
                    {course.description}
                  </p>
                  
                  {/* Meta Footer */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Investment</span>
                      <span className="text-xl font-black text-indigo-400">
                        ${course.price}
                      </span>
                    </div>
                    <Link
                      to={`/courses/${course._id}`} // Public Detail Route [Requirement 4]
                      className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State [Requirement 9] */
            <div className="col-span-full text-center py-32 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10">
              <div className="bg-indigo-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <IoSearchOutline size={32} className="text-indigo-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">No matches found</h2>
              <p className="text-slate-500 mt-2 max-w-xs mx-auto">
                We couldn't find any courses matching your current search or filter criteria.
              </p>
              <button 
                onClick={() => {setSearch(""); setFilter("all");}}
                className="mt-8 text-indigo-400 font-bold text-sm hover:underline"
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