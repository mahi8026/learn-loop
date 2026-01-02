import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUserShield, FaUserEdit, FaTrashAlt, FaSearch } from "react-icons/fa";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users from your MongoDB
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/role/${id}`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      fetchUsers(); // Refresh data
    } catch (err) {
      toast.error("Role update failed");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/status/${id}`, { status: newStatus });
      toast.info(`User is now ${newStatus}`);
      fetchUsers();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Manage Users</h1>
          <p className="text-gray-500 dark:text-gray-400">Total registered users: {users.length}</p>
        </div>
        
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search name or email..." 
            className="pl-12 pr-6 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl w-full md:w-80 outline-none focus:ring-2 ring-indigo-500 transition-all dark:text-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr className="text-gray-500 text-xs uppercase tracking-widest text-left">
                <th className="p-6">User Details</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {loading ? (
                <tr><td colSpan="4" className="p-20 text-center"><span className="loading loading-spinner text-indigo-600"></span></td></tr>
              ) : filteredUsers.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img src={u.photo || "https://i.pravatar.cc/150"} className="w-12 h-12 rounded-2xl object-cover" alt="" />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select 
                      value={u.role}
                      onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                      className="bg-gray-100 dark:bg-gray-800 text-xs font-bold uppercase p-2 rounded-xl outline-none border-none dark:text-gray-300 cursor-pointer"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleToggleStatus(u._id, u.status)}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all ${
                        u.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      {u.status}
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="p-3 text-gray-400 hover:text-red-500 transition-colors">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}