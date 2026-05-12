"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M1.5 3.5A1 1 0 0 1 2.5 2.5h3.086a1 1 0 0 1 .707.293L7.207 3.7A1 1 0 0 0 7.914 4H13.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V3.5z" fill="currentColor" opacity="0.9"/>
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <rect x="2" y="3" width="12" height="1.5" rx="0.75" fill="currentColor"/>
      <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill="currentColor"/>
      <rect x="2" y="11.5" width="12" height="1.5" rx="0.75" fill="currentColor"/>
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <rect x="2" y="9" width="3" height="5" rx="0.5" fill="currentColor"/>
      <rect x="6.5" y="5" width="3" height="9" rx="0.5" fill="currentColor"/>
      <rect x="11" y="2" width="3" height="12" rx="0.5" fill="currentColor"/>
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="8" cy="5" r="3" fill="currentColor"/>
      <path d="M2 13c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.93 2.93l1.41 1.41M11.66 11.66l1.41 1.41M2.93 13.07l1.41-1.41M11.66 4.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M8 1.5L13.5 7 8 14.5 2.5 7 8 1.5z" fill="currentColor" opacity="0.9"/>
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="flex flex-col h-full w-56 shrink-0" style={{ backgroundColor: "#0d1b2e" }}>
      {/* Top brand bar */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            P
          </div>
          <span className="text-white font-semibold text-sm truncate">InsightHub</span>
          <ChevronDownIcon />
        </div>
        <button className="text-white/50 hover:text-white/80 transition-colors p-0.5">
          <CloseIcon />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-2">
        {/* QuestionPro AI */}
        <Link
          href="/questionpro-ai"
          className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors mx-1 rounded-md"
        >
          <DiamondIcon />
          <span>QuestionPro AI</span>
        </Link>

        <div className="my-2 border-t border-white/10" />

        {/* Knowledge Hub */}
        <div className="px-3 py-1 text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
          Knowledge Hub
        </div>

        <Link
          href="/knowledge-hub/repositories"
          className={`flex items-center gap-2.5 px-3 py-2 text-sm transition-colors mx-1 rounded-md ${
            isActive("/knowledge-hub/repositories")
              ? "bg-white/10 text-white"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <FolderIcon />
          <span>Repositories</span>
        </Link>

        <div className="my-2 border-t border-white/10" />

        {/* Project Hub */}
        <div className="px-3 py-1 text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
          Project Hub
        </div>

        <Link
          href="/project-hub/projects"
          className={`flex items-center gap-2.5 px-3 py-2 text-sm transition-colors mx-1 rounded-md ${
            isActive("/project-hub/projects")
              ? "bg-white/10 text-white"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <ListIcon />
          <span>Projects</span>
        </Link>

        <Link
          href="/project-hub/analytics"
          className={`flex items-center gap-2.5 px-3 py-2 text-sm transition-colors mx-1 rounded-md ${
            isActive("/project-hub/analytics")
              ? "bg-white/10 text-white"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <BarChartIcon />
          <span>Analytics</span>
        </Link>
      </nav>

      {/* Bottom pinned section */}
      <div className="border-t border-white/10 py-2">
        <Link
          href="/admin"
          className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors mx-1 rounded-md"
        >
          <PersonIcon />
          <span>Admin</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors mx-1 rounded-md"
        >
          <GearIcon />
          <span>Settings</span>
        </Link>

        {/* User row */}
        <div className="flex items-center gap-2.5 px-3 py-2 mt-1">
          <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            PO
          </div>
          <span className="text-white/50 text-xs truncate">Hub: Priyesh Org</span>
        </div>
      </div>
    </aside>
  );
}
