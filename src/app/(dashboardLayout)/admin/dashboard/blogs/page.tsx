"use client";
import CreateBlogs from "@/components/ManageBlogs/CreateBlogs";
import MaintainBlogs from "@/components/ManageBlogs/MaintainBlogs";
import Link from "next/link";

import { useState } from "react";

const BlogsDPage = () => {
  const [activeSection, setActiveSection] = useState("create");

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <Link className="flex items-center" href={"/admin/dashboard"}>
          <button>Return to Dashboard</button>
        </Link>
        <button
          className={`w-full mb-2 px-4 py-2 rounded-lg ${
            activeSection === "create" ? "bg-blue-600" : "bg-gray-700"
          }`}
          onClick={() => setActiveSection("create-blogs")}
        >
          ➕ Create Blogs
        </button>
        <button
          className={`w-full px-4 py-2 rounded-lg ${
            activeSection === "maintain" ? "bg-blue-600" : "bg-gray-700"
          }`}
          onClick={() => setActiveSection("maintain-blogs")}
        >
          🔧 Maintain Blogs
        </button>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-8">
        {activeSection === "create-blogs" && <CreateBlogs />}
        {activeSection === "maintain-blogs" && <MaintainBlogs />}
      </main>
    </div>
  );
};

export default BlogsDPage;
