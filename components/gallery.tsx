"use client"

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// --- Custom Hooks for Masonry ---

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    const handler = () => {
      const index = queries.findIndex(q => window.matchMedia(q).matches);
      setValue(values[index] ?? defaultValue);
    };
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

// --- Gallery Data with Required Masonry heights ---

const galleryImages = [
  { id: "1", img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800", alt: "Latte Art", height: 600 },
  { id: "2", img: "https://images.unsplash.com/photo-1580661869408-55ab23f2ca6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW1lcmljYW5vfGVufDB8fDB8fHww", alt: "Americano", height: 400 },
  { id: "3", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800", alt: "Café Interior", height: 700 },
  { id: "4", img: "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y3JvaXNzYW50fGVufDB8fDB8fHww", alt: "Croissant", height: 500 },
  { id: "5", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800", alt: "Avocado Toast", height: 450 },
  { id: "6", img: "https://plus.unsplash.com/premium_photo-1669687759566-e07cf4e03e26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FuZHdpY2h8ZW58MHx8MHx8fDA%3D", alt: "Breakfast Sandwich", height: 650 },
  { 
    id: "7", 
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D", 
    alt: "Chocolate Cake", 
    height: 580 
  },
  // New Image 8 to complete the grid
  { 
    id: "8", 
    img: "https://images.unsplash.com/photo-1639744211487-b27e3551b07c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VGlyYW1pc3V8ZW58MHx8MHx8fDA%3D", 
    alt: "Tiramisu", 
    height: 420 
  }
];

// --- Masonry Component ---

const Masonry = ({ items, onImageClick }: { items: any[], onImageClick: (idx: number) => void }) => {
  const columns = useMedia(
    ['(min-width:1200px)', '(min-width:800px)', '(min-width:500px)'],
    [3, 2, 1],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const hasMounted = useRef(false);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 20;
    const columnWidth = (width - (columns - 1) * gap) / columns;

    return items.map((child, index) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const y = colHeights[col];
      colHeights[col] += child.height + gap;
      return { ...child, x, y, w: columnWidth, h: child.height, index };
    });
  }, [columns, items, width]);

  useLayoutEffect(() => {
    if (!grid.length) return;

    grid.forEach((item, i) => {
      const selector = `[data-key="${item.id}"]`;
      if (!hasMounted.current) {
        gsap.fromTo(selector, 
          { opacity: 0, y: 100, filter: 'blur(10px)' },
          { opacity: 1, y: item.y, x: item.x, filter: 'blur(0px)', duration: 0.8, delay: i * 0.1, ease: "power3.out" }
        );
      } else {
        gsap.to(selector, { x: item.x, y: item.y, width: item.w, height: item.h, duration: 0.6, ease: "power3.out" });
      }
    });
    hasMounted.current = true;
  }, [grid]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: grid.length ? Math.max(...grid.map(i => i.y + i.h)) : 1000 }}>
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute cursor-pointer overflow-hidden rounded-xl group shadow-lg"
          style={{ width: item.w, height: item.h }}
          onClick={() => onImageClick(item.index)}
        >
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${item.img})` }}
          />
          <div className="absolute inset-0 bg-[#2D241E]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
             <p className="text-[#F5F5F0] font-serif text-xl border border-[#D4AF37] p-4 rounded-lg">{item.alt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main Gallery Component ---

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-[#F5F5F0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#2D241E] mb-4">The Gallery</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#3D3028] max-w-2xl mx-auto text-lg italic">
            A glimpse into our world of coffee, artisanal food, and community
          </p>
        </div>

        <Masonry items={galleryImages} onImageClick={(idx) => setSelectedImage(idx)} />

        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-[#2D241E]/95 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button className="absolute top-6 right-6 text-[#F5F5F0] z-[110]"><X className="h-10 w-10" /></button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={galleryImages[selectedImage].img}
                className="max-w-full max-h-full rounded-lg border-4 border-[#D4AF37]/20"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}