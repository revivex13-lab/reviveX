"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const MotionLink = motion(Link);
export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };
  
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "System", href: "/product" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Team", href: "/team" },
    { name: "Impact", href: "/impact" },
  ];

  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="logo">
          Re<span>Vive</span>X
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="nav-item"
                onClick={() => setIsOpen(false)}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-bubble"
                    className="nav-bubble"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="nav-text">{link.name}</span>
              </Link>
            );
          })}

          <Link href="/contact" className="btn" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </nav>
        {isOpen && (
          <div
            className="menu-overlay"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </header>
  );
}