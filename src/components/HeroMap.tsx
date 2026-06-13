"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, Navigation, Info } from "lucide-react";
import { useTranslation } from "@/components/TranslationContext";

interface Bus {
  busNumber: string;
  route: string;
  eta: string;
  status: string;
  latLng: { x: number; y: number };
  angle: number;
}

export default function HeroMap() {
  const { t, language } = useTranslation();
  const [activeBusIndex, setActiveBusIndex] = useState(0);

  // Coordinate data for route Kathmandu -> Koteshwor -> Bhaktapur -> Banepa
  // Map dimensions are 500x320
  const routePoints = [
    { name: "Kathmandu", x: 60, y: 220, labelPos: "bottom" },
    { name: "Koteshwor", x: 160, y: 200, labelPos: "top" },
    { name: "Bhaktapur", x: 320, y: 150, labelPos: "bottom" },
    { name: "Banepa", x: 440, y: 110, labelPos: "top" },
  ];

  // Helper to translate route names
  const getRouteLabel = (name: string) => {
    if (language === "ne") {
      if (name === "Kathmandu") return "काठमाडौं";
      if (name === "Koteshwor") return "कोटेश्वर";
      if (name === "Bhaktapur") return "भक्तपुर";
      if (name === "Banepa") return "बनेपा";
    }
    return name;
  };

  const [buses, setBuses] = useState<Bus[]>([
    {
      busNumber: "MY-014",
      route: "Kathmandu → Banepa",
      eta: "6 min",
      status: "On Route",
      latLng: { x: 240, y: 178 },
      angle: -15,
    },
    {
      busNumber: "MY-022",
      route: "Koteshwor → Banepa",
      eta: "11 min",
      status: "On Route",
      latLng: { x: 180, y: 195 },
      angle: -10,
    },
    {
      busNumber: "MY-031",
      route: "Banepa → Kathmandu",
      eta: "18 min",
      status: "On Route",
      latLng: { x: 380, y: 130 },
      angle: -20,
    },
  ]);

  // Simulate bus movement along the route path
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus, idx) => {
          let newX = bus.latLng.x;
          let newY = bus.latLng.y;
          let newAngle = bus.angle;

          // Different behavior for each bus to make it feel natural
          if (idx === 0) {
            // MY-014: Kathmandu -> Banepa. Moves right.
            newX += 0.8;
            if (newX > 440) {
              newX = 60; // loop back
            }
          } else if (idx === 1) {
            // MY-022: Koteshwor -> Banepa. Moves right.
            newX += 0.5;
            if (newX > 440) {
              newX = 160;
            }
          } else {
            // MY-031: Banepa -> Kathmandu. Moves left.
            newX -= 0.6;
            if (newX < 60) {
              newX = 440;
            }
          }

          // Calculate Y coordinate based on path segment (linear interpolation)
          // Find segment
          let segmentStart = routePoints[0];
          let segmentEnd = routePoints[1];

          for (let i = 0; i < routePoints.length - 1; i++) {
            if (newX >= routePoints[i].x && newX <= routePoints[i + 1].x) {
              segmentStart = routePoints[i];
              segmentEnd = routePoints[i + 1];
              break;
            }
          }

          // Interpolation factor
          const tFactor = (newX - segmentStart.x) / (segmentEnd.x - segmentStart.x);
          newY = segmentStart.y + tFactor * (segmentEnd.y - segmentStart.y);

          // Approximate heading angle
          const dx = segmentEnd.x - segmentStart.x;
          const dy = segmentEnd.y - segmentStart.y;
          newAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

          if (idx === 2) {
            newAngle += 180; // Facing opposite way
          }

          // Dynamic ETA variation
          let currentEta = parseInt(bus.eta);
          if (Math.random() > 0.85) {
            currentEta = Math.max(1, currentEta + (Math.random() > 0.5 ? 1 : -1));
          }

          return {
            ...bus,
            latLng: { x: parseFloat(newX.toFixed(1)), y: parseFloat(newY.toFixed(1)) },
            angle: parseFloat(newAngle.toFixed(1)),
            eta: `${currentEta} ${language === "ne" ? "मिनेट" : "min"}`,
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [language]);

  // Periodically cycle active bus focus
  useEffect(() => {
    const focusInterval = setInterval(() => {
      setActiveBusIndex((prev) => (prev + 1) % buses.length);
    }, 6000);
    return () => clearInterval(focusInterval);
  }, [buses.length]);

  // Handle manual bus selection
  const handleBusClick = (index: number) => {
    setActiveBusIndex(index);
  };

  const activeBus = buses[activeBusIndex];

  return (
    <div className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-brand-border/40 bg-[#121222] shadow-2xl flex flex-col justify-end p-4">
      {/* Background Grid Map Effect */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Grid line overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" className="opacity-[0.06]">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Stylized Vector Route Map */}
      <div className="absolute inset-0 flex items-center justify-center p-6 pb-16">
        <svg viewBox="0 0 500 320" className="w-full h-full overflow-visible">
          {/* Decorative Terrain Lines */}
          <path
            d="M -50 280 Q 120 230 220 280 T 550 200"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="3"
            pointerEvents="none"
          />
          <path
            d="M -50 150 Q 80 180 280 120 T 550 90"
            fill="none"
            stroke="rgba(255,255,255,0.02)"
            strokeWidth="2"
            pointerEvents="none"
          />

          {/* Main Highway Route (Background Glow) */}
          <path
            d="M 60 220 L 160 200 L 320 150 L 440 110"
            fill="none"
            stroke="rgba(255, 107, 53, 0.15)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            pointerEvents="none"
          />

          {/* Main Highway Route (Core) */}
          <path
            d="M 60 220 L 160 200 L 320 150 L 440 110"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 6"
            className="animate-dash-offset"
            style={{ strokeDashoffset: 0 }}
            pointerEvents="none"
          />

          {/* Route Stops */}
          {routePoints.map((stop, i) => (
            <g key={i} className="cursor-default">
              {/* Glow background */}
              <circle
                cx={stop.x}
                cy={stop.y}
                r="8"
                fill="rgba(26, 26, 46, 0.8)"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1"
              />
              {/* Inner dot */}
              <circle cx={stop.x} cy={stop.y} r="4" fill="#94A3B8" />
              
              {/* Stop Label */}
              <text
                x={stop.x}
                y={stop.labelPos === "top" ? stop.y - 12 : stop.y + 20}
                textAnchor="middle"
                fill="#94A3B8"
                className="text-[9px] font-sans font-medium uppercase tracking-wider select-none fill-brand-muted"
              >
                {getRouteLabel(stop.name)}
              </text>
            </g>
          ))}

          {/* Active Buses */}
          {buses.map((bus, idx) => {
            const isActive = idx === activeBusIndex;
            return (
              <g
                key={bus.busNumber}
                className="cursor-pointer group"
                onClick={() => handleBusClick(idx)}
              >
                {/* GPS Pulse underlay */}
                {isActive && (
                  <circle
                    cx={bus.latLng.x}
                    cy={bus.latLng.y}
                    r="16"
                    fill="rgba(255, 107, 53, 0.2)"
                    className="origin-center animate-[ping_2s_infinite]"
                  />
                )}

                {/* Outer Ring */}
                <circle
                  cx={bus.latLng.x}
                  cy={bus.latLng.y}
                  r={isActive ? "10" : "7"}
                  fill={isActive ? "rgba(255, 107, 53, 0.4)" : "rgba(255, 107, 53, 0.1)"}
                  stroke={isActive ? "#FF6B35" : "rgba(255, 107, 53, 0.6)"}
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />

                {/* Inner Directional Indicator */}
                <circle
                  cx={bus.latLng.x}
                  cy={bus.latLng.y}
                  r={isActive ? "5" : "3.5"}
                  fill="#FF6B35"
                />

                {/* Interactive Click Buffer */}
                <circle cx={bus.latLng.x} cy={bus.latLng.y} r="20" fill="transparent" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Active Bus Details Overlay (Glassmorphism) */}
      <motion.div
        key={activeBus.busNumber}
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full glass-card p-3 rounded-xl flex items-center justify-between border border-white/10 z-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
            <Navigation
              size={18}
              style={{ transform: `rotate(${activeBus.angle}deg)` }}
              className="transition-transform duration-100"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand-text text-sm tracking-wide">
                {activeBus.busNumber}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {language === "ne" ? "सक्रिय" : activeBus.status}
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              {language === "ne"
                ? activeBus.route.replace("Kathmandu", "काठमाडौं").replace("Banepa", "बनेपा").replace("Koteshwor", "कोटेश्वर")
                : activeBus.route}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-brand-muted uppercase tracking-wider">
            {language === "ne" ? "आगमन समय" : "ETA"}
          </p>
          <p className="text-base font-bold text-brand-accent tabular-nums">
            {activeBus.eta}
          </p>
        </div>
      </motion.div>

      {/* Info indicator in top-right corner */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-bg/80 border border-white/5 text-[10px] text-brand-muted select-none">
        <Compass size={10} className="text-brand-accent animate-spin" style={{ animationDuration: "10s" }} />
        <span className="font-mono tracking-wider">LIVE FEED</span>
      </div>
    </div>
  );
}
