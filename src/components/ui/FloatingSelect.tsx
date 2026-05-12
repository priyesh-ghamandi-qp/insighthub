'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export type FloatingSelectOption = { value: string; label: string };

interface FloatingSelectProps {
  data: FloatingSelectOption[];
  value?: FloatingSelectOption | null;
  onSelect: (item: FloatingSelectOption) => void;
  placeholder?: string;
}

export function FloatingSelect({ data, value, onSelect, placeholder = 'Select...' }: FloatingSelectProps) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropdown = useCallback(() => {
    if (triggerRef.current) {
      setRect(triggerRef.current.getBoundingClientRect());
    }
    setOpen(true);
  }, []);

  const closeDropdown = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      ) return;
      closeDropdown();
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, closeDropdown]);

  // Reposition on scroll/resize
  useEffect(() => {
    if (!open) return;
    function reposition() {
      if (triggerRef.current) {
        setRect(triggerRef.current.getBoundingClientRect());
      }
    }
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [open]);

  const dropdown = open && rect ? (
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      }}
      className="bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
    >
      {data.map((item) => (
        <button
          key={item.value}
          type="button"
          className={`w-full text-left px-3 py-2 text-sm transition-colors ${
            value?.value === item.value
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
          onPointerDown={(e) => {
            e.preventDefault();
            onSelect(item);
            closeDropdown();
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? closeDropdown() : openDropdown())}
        className="w-full flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm bg-white hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
      >
        <span className={value ? 'text-gray-700' : 'text-gray-400'}>
          {value?.label ?? placeholder}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className={`shrink-0 text-gray-400 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {typeof window !== 'undefined' && dropdown && createPortal(dropdown, document.body)}
    </>
  );
}
