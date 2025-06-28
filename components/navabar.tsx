"use client";
import React, { useEffect, useState } from "react";
import {
  LogOut,
  Moon,
  Package,
  Settings,
  ShoppingCart,
  Sun,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const user = {
  username: "JohnDoe",
  // role: "USER",
  role: "ADMIN",
  email: "xyz@gmail.com",
};
const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isAuthenticated = true; // Replace with actual authentication logic
  const totalItems = 1; // Replace with actual cart item count logic

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
              className="cursor-pointer"
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

            {isAuthenticated ? (
              <>
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative cursor-pointer"
                  >
                    <ShoppingCart className="h-5 w-5 cursor-pointer" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {user?.username}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {user?.role === "ADMIN" && (
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}

            {/* <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="cursor-pointer">Register</Button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
