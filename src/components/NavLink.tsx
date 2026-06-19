"use client";

import { useState } from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
}

export default function NavLink({ href, children, isExternal = false }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyles: React.CSSProperties = {
    position: "relative",
    color: "#F0E7D5",
    fontSize: "0.95rem",
    fontWeight: 500,
    letterSpacing: "0.02em",
    textDecoration: "none",
    padding: "6px 0",
    cursor: "pointer",
    transition: "color 0.25s ease",
  };

  const underlineStyles: React.CSSProperties = {
    position: "absolute",
    bottom: "-2px",
    left: "50%",
    transform: isHovered ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
    width: "100%",
    height: "2px",
    backgroundColor: "#ffffff",
    borderRadius: "1px",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transformOrigin: "center",
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
        <span style={underlineStyles} />
      </a>
    );
  }

  return (
    <Link
      href={href}
      style={linkStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <span style={underlineStyles} />
    </Link>
  );
}
