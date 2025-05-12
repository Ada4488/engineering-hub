"use client";
import { useState } from "react";
import Image from "next/image";

export default function BootScreen({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="relative" style={{ width: 600, height: 400 }}>
        <Image
          src="/monitor.png"
          alt="Retro Monitor"
          fill
          style={{ objectFit: "contain" }}
        />
        <div
          className={`absolute top-[13%] left-[13%] w-[74%] h-[70%] bg-black flex items-center justify-center transition-all duration-700 ${
            booted ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow: "0 0 40px #0ff8, 0 0 8px #fff4",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {booted && children}
        </div>
        {!booted && (
          <button
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#222] border-2 border-[#FFD700] rounded-full px-6 py-2 text-[#FFD700] font-pressStart shadow-lg hover:bg-[#FFD700] hover:text-[#222] transition"
            onClick={() => setBooted(true)}
            style={{ zIndex: 10 }}
          >
            Power
          </button>
        )}
      </div>
    </div>
  );
} 