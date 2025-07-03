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
import { useUserStore } from "@/store/userStore";
import { useLogout } from "@/hooks/auth-hook/useLogout";
import { useCart } from "@/hooks/cart-hook/useCart";

const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  //console.log("theme", theme, "resolvedTheme", resolvedTheme);
  const [mounted, setMounted] = useState(false);
  const { username, role } = useUserStore();
  const { mutate: logout } = useLogout();
  const isAuthenticated = !!username;
  //console.log("isauthenticated", isAuthenticated);
  const { cart } = useCart();
  //console.log("cart", cart);
  // console.log("totalItems", cart?.items?.length);

  // Ensure the theme is set only after the component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // function to handle logout
  const handleLogOut = () => {
    logout();
  };

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
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
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
                    {cart?.items && cart?.items?.length > 0 ? (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {cart?.items?.length}
                      </Badge>
                    ) : (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        0
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
                      {username}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {role === "ADMIN" && (
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleLogOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
