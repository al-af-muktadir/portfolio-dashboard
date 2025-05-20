/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/context/UserContext";
import { logOut } from "@/services/Auth";
import { useRouter } from "next/navigation";

const DashboardComp = () => {
  const { user, refetchUser, setLoading, loading } = useUser();
  const router = useRouter();
  setLoading(false);
  const handleNavigate = (r: any) => {
    router.push(r);
  };

  //("i amin dashboard", user);
  const handleLogout = async () => {
    await logOut();
    setLoading(true);
    await refetchUser();
    //(user, "inLOugbtn");
    setTimeout(() => {
      router.push("/");
    }, 100);
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
          <nav className="w-full max-w-6xl flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold flex justify-between gap-40">
              🚀 My Dashboard Welcome {user?.email}
              <div>
                {user ? (
                  <button
                    className="px-2 py-1 border-2 border-blue-500 rounded-xl"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : null}
              </div>
            </h1>
          </nav>

          {/* Button Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {/* Projects Button */}
            <div
              className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center hover:bg-gray-700 cursor-pointer"
              onClick={() => handleNavigate("/admin/dashboard/projects")}
            >
              <h2 className="text-xl font-semibold mb-2">📁 Projects</h2>
              <p className="text-gray-400">Manage your projects easily</p>
            </div>

            {/* Messages Button */}
            <div
              className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center hover:bg-gray-700 cursor-pointer"
              onClick={() => handleNavigate("/admin/dashboard/messages")}
            >
              <h2 className="text-xl font-semibold mb-2">💬 Messages</h2>
              <p className="text-gray-400">Check your latest messages</p>
            </div>

            {/* Blog Button */}
            <div
              className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center hover:bg-gray-700 cursor-pointer"
              onClick={() => handleNavigate("/admin/dashboard/blogs")}
            >
              <h2 className="text-xl font-semibold mb-2">📝 Blog</h2>
              <p className="text-gray-400">Read and share articles</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardComp;
