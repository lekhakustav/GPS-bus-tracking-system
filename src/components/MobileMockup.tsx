"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Navigation, Map, Settings, Compass, HelpCircle } from "lucide-react";
import { useTranslation } from "@/components/TranslationContext";

interface BusMock {
  busNumber: string;
  route: string;
  eta: string;
  status: string;
  x: number; // percentage width
  y: number; // percentage height
}

export default function MobileMockup() {
  const { t, language } = useTranslation();
  const [selectedBusId, setSelectedBusId] = useState<string>("MY-014");

  const buses: BusMock[] = [
    {
      busNumber: "MY-014",
      route: language === "ne" ? "काठमाडौं → बनेपा" : "Kathmandu → Banepa",
      eta: `6 ${language === "ne" ? "मिनेट" : "min"}`,
      status: t("appMockOnRoute"),
      x: 48,
      y: 52,
    },
    {
      busNumber: "MY-022",
      route: language === "ne" ? "कोटेश्वर → बनेपा" : "Koteshwor → Banepa",
      eta: `11 ${language === "ne" ? "मिनेट" : "min"}`,
      status: t("appMockOnRoute"),
      x: 32,
      y: 65,
    },
    {
      busNumber: "MY-031",
      route: language === "ne" ? "बनेपा → काठमाडौं" : "Banepa → Kathmandu",
      eta: `18 ${language === "ne" ? "मिनेट" : "min"}`,
      status: t("appMockOnRoute"),
      x: 75,
      y: 35,
    },
  ];

  const selectedBus = buses.find((b) => b.busNumber === selectedBusId) || buses[0];

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Phone Wrapper Container */}
      <div className="relative mx-auto w-[280px] h-[560px] md:w-[300px] md:h-[600px] rounded-[36px] border-[8px] border-slate-800 bg-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
        {/* Speaker / Camera Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-800 rounded-b-xl z-30 flex items-center justify-center">
          <div className="w-10 h-1 bg-slate-900 rounded-full" />
          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full ml-3" />
        </div>

        {/* Screen Content */}
        <div className="flex-1 flex flex-col relative text-slate-100 select-none bg-[#0e0e1a] pt-6 overflow-hidden">
          
          {/* Top Status Bar Mock */}
          <div className="px-5 py-1.5 flex justify-between items-center text-[10px] font-mono text-slate-400 z-20">
            <span>04:32</span>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-4 h-2 border border-slate-500 rounded-sm p-px flex items-center">
                <div className="w-2.5 h-full bg-slate-300 rounded-2xs" />
              </div>
            </div>
          </div>

          {/* App Header (Search Bar Overlay) */}
          <div className="p-3 z-20">
            <div className="w-full h-10 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/5 flex items-center px-3 gap-2.5 shadow-lg">
              <Search size={14} className="text-brand-accent shrink-0" />
              <input
                type="text"
                placeholder={t("appMockSearch")}
                disabled
                className="w-full bg-transparent text-xs text-slate-300 placeholder-slate-500 focus:outline-none cursor-default"
              />
              <div className="w-6 h-6 rounded-lg bg-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0">
                <Map size={11} />
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative overflow-hidden bg-[#111122]">
            {/* Styled Map Path SVG */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-35" preserveAspectRatio="none">
              {/* Secondary roads */}
              <path d="M 0 15 Q 40 40 100 10" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <path d="M 10 90 L 90 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <path d="M 40 0 C 35 40, 70 60, 50 100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              
              {/* Primary Kathmandu-Banepa Highway */}
              <path
                id="phone-route"
                d="M 10 75 Q 30 70 45 55 T 85 25"
                fill="none"
                stroke="rgba(255,107,53,0.3)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 10 75 Q 30 70 45 55 T 85 25"
                fill="none"
                stroke="#FF6B35"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray="2 3"
              />
            </svg>

            {/* Map Stop Labels */}
            <div className="absolute left-[8%] bottom-[20%] text-[8px] text-slate-500 font-bold uppercase tracking-wider">KTM</div>
            <div className="absolute right-[12%] top-[25%] text-[8px] text-slate-500 font-bold uppercase tracking-wider">BAN</div>

            {/* Map Bus Markers */}
            {buses.map((bus) => {
              const isSelected = bus.busNumber === selectedBusId;
              return (
                <div
                  key={bus.busNumber}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{ left: `${bus.x}%`, top: `${bus.y}%` }}
                  onClick={() => setSelectedBusId(bus.busNumber)}
                >
                  {isSelected && (
                    <div className="absolute inset-0 w-8 h-8 -left-2.5 -top-2.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 animate-[ping_1.5s_infinite]" />
                  )}
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${
                      isSelected ? "bg-brand-accent scale-110" : "bg-slate-700 hover:bg-slate-600"
                    }`}
                  >
                    <Navigation
                      size={6}
                      className={`text-white transition-transform ${isSelected ? "rotate-45" : "-rotate-45"}`}
                    />
                  </div>
                  {/* Miniature Label */}
                  <span
                    className={`absolute left-4 top-0.5 px-1 rounded-[3px] text-[7px] font-bold font-mono border whitespace-nowrap shadow-md pointer-events-none ${
                      isSelected
                        ? "bg-brand-accent border-brand-accent text-white"
                        : "bg-slate-900/90 border-slate-700 text-slate-400"
                    }`}
                  >
                    {bus.busNumber}
                  </span>
                </div>
              );
            })}

            {/* Float ETA bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBus.busNumber}
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                className="absolute bg-slate-950/95 border border-brand-accent/40 rounded-lg py-1 px-2.5 shadow-xl flex items-center gap-1.5 pointer-events-none z-10"
                style={{ left: `${selectedBus.x - 10}%`, top: `${selectedBus.y - 14}%` }}
              >
                <Compass size={8} className="text-brand-accent animate-spin" style={{ animationDuration: "6s" }} />
                <span className="text-[9px] font-bold text-brand-text tabular-nums">{selectedBus.eta}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide-Up Bottom Drawer Sheet */}
          <div className="bg-slate-950/95 border-t border-white/10 p-3 pt-2.5 z-20 shadow-[0_-8px_24px_rgba(0,0,0,0.6)] flex flex-col gap-2.5">
            {/* Handle Bar */}
            <div className="w-8 h-1 bg-slate-800 rounded-full mx-auto" />
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {t("appMockNearby")}
              </span>
              <span className="text-[8px] font-bold text-slate-600 font-mono">
                {buses.length} {language === "ne" ? "बसहरू" : "BUSES"}
              </span>
            </div>

            {/* Bus List */}
            <div className="flex flex-col gap-1.5 max-h-[160px] overflow-y-auto no-scrollbar">
              {buses.map((bus) => {
                const isSelected = bus.busNumber === selectedBusId;
                return (
                  <div
                    key={bus.busNumber}
                    className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-brand-accent/10 border-brand-accent/40 shadow-sm"
                        : "bg-slate-900/40 border-white/5 hover:bg-slate-900/80"
                    }`}
                    onClick={() => setSelectedBusId(bus.busNumber)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-brand-accent/20 text-brand-accent" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <MapPin size={12} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-200 truncate">{bus.busNumber}</p>
                        <p className="text-[8px] text-slate-500 truncate mt-0.5">{bus.route}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-[9px] font-bold text-brand-accent tabular-nums">{bus.eta}</p>
                      <p className="text-[7px] text-slate-600 uppercase font-bold mt-0.5">{bus.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Virtual Menu Bar */}
          <div className="h-10 border-t border-slate-900 bg-slate-950 flex items-center justify-around text-slate-600 px-4">
            <Compass size={14} className="text-brand-accent" />
            <Search size={14} />
            <Settings size={14} />
          </div>
        </div>
      </div>

      {/* Decorative label */}
      <span className="text-[10px] text-brand-muted tracking-wider uppercase font-mono mt-4 flex items-center gap-1">
        <HelpCircle size={10} className="text-brand-accent" />
        {language === "ne" ? "अन्तर्क्रियात्मक डेमो - बस ट्याप गर्नुहोस्" : "Interactive Demo - Tap Bus List"}
      </span>
    </div>
  );
}
