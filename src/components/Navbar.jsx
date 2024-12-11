"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import jwt from "jsonwebtoken";

export default function Navbar({ setSidebarOpen }) {
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div className="flex flex-col min-h-screen w-screen items-center justify-center gap-4">
        <h1 className="text-5xl font-semibold text-center">Loading....</h1>
      </div>
    );
  }

  return (
    <header className="flex h-16 items-center justify-between border-b dark:rounded-none rounded-b-lg dark:border-white/[0.3] border-black/[0.5] bg-white dark:bg-black px-6 shadow">
      {decodedToken && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-500 focus:outline-none lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
      <div className="flex items-center relative">
        <div className="relative">
          {decodedToken ? (
            <Link href="/" className="flex items-center focus:outline-none">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <Image
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                  src="https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg"
                  alt="User avatar"
                />
              </div>
              <span className="ml-2 text-sm font-medium capitalize text-black dark:text-white">
                {decodedToken.name}
              </span>
            </Link>
          ) : (
            <Link href="/" className="flex items-center focus:outline-none">
              <span className="ml-2 text-sm font-medium text-black dark:text-white">
                Admin Panel
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
