"use client";
import React, { useEffect, useState } from "react";
import { Moon, Package, Sun } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the theme is set only after the component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span className="font-bold text-xl">eCommerce</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {/* Only render icons after mounted to avoid hydration mismatch */}
              {mounted && (
                <>
                  <Sun
                    className={`h-5 w-5 transition-all ${
                      resolvedTheme === "dark"
                        ? "rotate-0 scale-0"
                        : "rotate-0 scale-100"
                    }`}
                  />
                  <Moon
                    className={`absolute h-5 w-5 transition-all ${
                      resolvedTheme === "dark"
                        ? "rotate-0 scale-100"
                        : "rotate-90 scale-0"
                    }`}
                  />
                </>
              )}
            </Button>

            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="cursor-pointer">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
