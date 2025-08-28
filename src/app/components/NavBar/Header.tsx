"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { logoutClean } from "@/app/utils/logout";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background border-b text-foreground py-3 sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="font-bold text-slate-800 dark:text-slate-50 text-xl">
            Logo
          </Link>

          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link
                  href="/login"
                  className={`transition-colors ${
                    pathname === "login"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                  }`}>
                  Login
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutClean}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:cursor-pointer">
                  logout
                </button>
              </li>
            </ul>
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul className="flex flex-col p-4 gap-4">
            <li>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className={`block transition-colors ${
                  pathname === "/login"
                    ? "text-blue-500 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                }`}>
                login
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
