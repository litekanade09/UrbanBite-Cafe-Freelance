"use client"

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-14 w-14 rounded-full bg-[#25D366] opacity-75 animate-ping" />
        <div className="absolute h-14 w-14 rounded-full bg-[#25D366] opacity-50 animate-pulse" />
      </div>
      
      {/* Main button */}
      <button
        className="relative h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl flex items-center justify-center group animate-bounce"
        style={{
          animationDuration: '2s',
          animationIterationCount: 'infinite'
        }}
        onClick={() => window.open('https://wa.me/1234567890', '_blank')}
        aria-label="Order on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
          Chat with us!
        </div>
      </div>
      
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        button:hover {
          animation: none;
        }
      `}</style>
    </div>
  );
}