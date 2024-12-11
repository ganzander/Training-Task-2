"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import HomePage from "@/components/HomePage";

export default function AdminDashboard() {
  const router = useRouter();
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function checkAuthToken() {
      const storedAuthToken = localStorage.getItem("AuthToken");
      if (storedAuthToken) {
        const decoded = jwt.decode(JSON.parse(storedAuthToken));
        if (decoded?.email === process.env.NEXT_PUBLIC_EMAIL) {
          setDecodedToken(decoded);
        }
      }
      setLoading(false);
    }
    if (typeof window !== "undefined") {
      checkAuthToken();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center gap-4">
        <h1 className="text-5xl font-semibold text-center">Loading....</h1>
      </div>
    );
  }

  return (
    <>
      {decodedToken ? (
        <div className="flex h-screen bg-gray-100">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Navbar setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-black/[0.96] bg-grid-white/[0.03] p-6">
              <h1 className="text-xl md:text-3xl lg:text-5xl font-semibold tracking-tight dark:text-white capitalize text-center pb-6">
                Welcome Back, {decodedToken.name}
              </h1>
              <HomePage />
            </main>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen w-screen items-center justify-center gap-4">
          <h1 className="text-5xl font-semibold text-center">
            You&apos;re Not Authorized
          </h1>

          <button
            className="px-4 py-2 bg-black text-white font-semibold text-xl rounded-md"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      )}
    </>
  );
}
