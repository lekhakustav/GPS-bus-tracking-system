"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { Bus, Station, GeofenceZone, RouteData } from "@/data/mapData";

interface TrackerMapProps {
  buses: Bus[];
  stations: Station[];
  geofences: GeofenceZone[];
  routes: RouteData[];
  selectedBusId: number | null;
  onSelectBus: (busId: number | null) => void;
  onSelectStation: (station: Station | null) => void;
  isPlaybackPaused: boolean;
  isFollowingBus: boolean;
}

export default function TrackerMap({
  buses,
  stations,
  geofences,
  routes,
  selectedBusId,
  onSelectBus,
  onSelectStation,
  isPlaybackPaused,
  isFollowingBus,
}: TrackerMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  
  // Ref pointers to update map layers dynamically without re-creating Leaflet instances
  const busMarkersRef = useRef<{ [key: number]: L.Marker }>({});
  const stationMarkersRef = useRef<{ [key: string]: L.Marker }>({});
  const staticRoutesRef = useRef<L.Polyline[]>([]);
  const activeRouteGlowRef = useRef<L.Polyline[]>([]);
  const geofenceCirclesRef = useRef<{ [key: string]: L.Circle }>({});
  const selectedTrailRef = useRef<L.Polyline | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Centered on Kathmandu Valley
    const map = L.map(mapContainerRef.current, {
      zoomControl: false, 
      attributionControl: false,
    }).setView([27.7120, 85.3350], 12.5);

    mapRef.current = map;

    // CartoDB Dark Matter tile layer for premium dark appearance
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Fade-in route network lines initially
    routes.forEach((route) => {
      const line = L.polyline(route.waypoints, {
        color: route.color,
        weight: 1.5,
        opacity: 0.12,
        lineCap: "round",
      }).addTo(map);
      staticRoutesRef.current.push(line);
    });

    // Add custom zoom control
    L.control.zoom({ position: "bottomright" }).addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [routes]);

  // Synchronize dynamic elements: Station highlight states, Buses, Geofences, selected glows, and trails
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 1. STATION MARKERS (Highlight if on active bus route)
    const activeBus = buses.find((b) => b.id === selectedBusId);
    const activeRouteCode = activeBus?.routeCode || null;

    stations.forEach((station) => {
      // Determine if station belongs to selected bus route
      let isStationOnSelectedRoute = false;
      if (activeRouteCode) {
        if (activeRouteCode === "Route A") {
          isStationOnSelectedRoute = ["Kathmandu Bus Park", "Baneswor", "Koteshwor", "Bhaktapur Square"].includes(station.name);
        } else if (activeRouteCode === "Route B") {
          isStationOnSelectedRoute = ["Lainchaur", "Thamel", "Maharajgunj", "Chabahil", "Bodhnath Stupa", "Changunarayan Temple"].includes(station.name);
        } else if (activeRouteCode === "Route C") {
          isStationOnSelectedRoute = ["Kathmandu Bus Park", "Kalanki", "Balkhu", "Kirtipur", "Lagankhel", "Satdobato", "Airport Area"].includes(station.name);
        }
      }

      const glowStyle = isStationOnSelectedRoute
        ? "bg-[#FF6B35] border-white scale-125 shadow-lg shadow-[#FF6B35]/40"
        : "bg-slate-500 border-slate-700";

      const stationHtml = `
        <div class="relative group">
          <div class="w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 ${glowStyle}">
            <div class="w-1 h-1 rounded-full bg-[#1A1A2E]"></div>
          </div>
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-950/95 text-[9px] text-white px-1.5 py-0.5 rounded border border-white/10 whitespace-nowrap z-50 shadow-lg font-sans">
            ${station.name} ${isStationOnSelectedRoute ? "(Stop)" : ""}
          </div>
        </div>
      `;

      if (stationMarkersRef.current[station.name]) {
        stationMarkersRef.current[station.name].setIcon(
          L.divIcon({
            html: stationHtml,
            className: "custom-station-icon",
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          })
        );
      } else {
        const marker = L.marker([station.lat, station.lng], {
          icon: L.divIcon({
            html: stationHtml,
            className: "custom-station-icon",
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          }),
        })
          .addTo(map)
          .on("click", () => {
            onSelectStation(station);
          });
        stationMarkersRef.current[station.name] = marker;
      }
    });

    // 2. GEOFENCES (Highlight warning red on breach)
    geofences.forEach((zone) => {
      const hasViolation = buses.some((bus) => bus.geofence.zoneId === zone.id && !bus.geofence.inside);

      const circleStyle = hasViolation
        ? { color: "#F43F5E", fillColor: "#F43F5E", fillOpacity: 0.07, dashArray: "2, 4", weight: 1.5 } // Breached red
        : { color: "#475569", fillColor: "#475569", fillOpacity: 0.02, dashArray: "5, 5", weight: 1 };

      if (geofenceCirclesRef.current[zone.id]) {
        geofenceCirclesRef.current[zone.id].setStyle(circleStyle);
      } else {
        const circle = L.circle([zone.lat, zone.lng], {
          radius: zone.radius,
          ...circleStyle,
        }).addTo(map);
        geofenceCirclesRef.current[zone.id] = circle;
      }
    });

    // 3. BUSES (Add/Update markers)
    buses.forEach((bus) => {
      const isSelected = bus.id === selectedBusId;
      const isWarning = bus.speed > 50 && bus.speed <= 80;
      const isOverspeeding = bus.speed > 80;

      let markerBg = "bg-emerald-500 shadow-emerald-500/25";
      let borderStyle = "border-emerald-300";
      if (isOverspeeding) {
        markerBg = "bg-rose-500 shadow-rose-500/40";
        borderStyle = "border-rose-300 animate-pulse";
      } else if (isWarning) {
        markerBg = "bg-amber-500 shadow-amber-500/30";
        borderStyle = "border-amber-300";
      }

      // Check geofence status
      const hasGeofenceBreach = !bus.geofence.inside;
      const pulseClass = hasGeofenceBreach || isOverspeeding
        ? "animate-[ping_1.5s_infinite] bg-rose-500/35"
        : "animate-[ping_3s_infinite] bg-emerald-500/10";

      const activePulseRing = !isPlaybackPaused && bus.ignition === "ON"
        ? `<div class="absolute -inset-2.5 rounded-full ${pulseClass} pointer-events-none"></div>`
        : "";

      const selectRing = isSelected
        ? "ring-2 ring-[#FF6B35] ring-offset-1 ring-offset-[#1A1A2E] scale-110 shadow-xl"
        : "";

      const labelLetter = bus.routeCode === "Route A" ? "A" : bus.routeCode === "Route B" ? "B" : "C";

      const busHtml = `
        <div class="relative flex flex-col items-center">
          ${activePulseRing}
          
          <!-- Direction Arrow -->
          <div style="transform: rotate(${bus.heading}deg)" class="absolute -top-3.5 w-3 h-3 text-[#FF6B35] flex items-center justify-center transition-all duration-300">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
          </div>

          <!-- Bus Marker Pin -->
          <div class="w-8 h-8 rounded-full border-2 ${borderStyle} flex items-center justify-center font-extrabold text-[10px] text-white shadow-lg ${markerBg} ${selectRing}">
            ${labelLetter}${bus.id}
          </div>
          ${bus.ignition === "OFF" ? '<div class="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-[#1A1A2E]" title="Ignition OFF"></div>' : ""}
        </div>
      `;

      if (busMarkersRef.current[bus.id]) {
        const marker = busMarkersRef.current[bus.id];
        marker.setLatLng([bus.lat, bus.lng]);
        marker.setIcon(
          L.divIcon({
            html: busHtml,
            className: "custom-bus-icon",
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          })
        );
      } else {
        const marker = L.marker([bus.lat, bus.lng], {
          icon: L.divIcon({
            html: busHtml,
            className: "custom-bus-icon",
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          }),
        })
          .addTo(map)
          .on("click", () => {
            onSelectBus(bus.id);
          });
        busMarkersRef.current[bus.id] = marker;
      }
    });

    // Cleanup markers for removed buses
    Object.keys(busMarkersRef.current).forEach((idStr) => {
      const id = parseInt(idStr);
      if (!buses.some((b) => b.id === id)) {
        busMarkersRef.current[id].remove();
        delete busMarkersRef.current[id];
      }
    });

    // 4. SELECTED ROUTE HIGHLIGHT & FUTURE PATH DASH
    activeRouteGlowRef.current.forEach((line) => line.remove());
    activeRouteGlowRef.current = [];

    if (selectedTrailRef.current) {
      selectedTrailRef.current.remove();
      selectedTrailRef.current = null;
    }

    if (activeBus) {
      const activeRoute = routes.find((r) => r.code === activeBus.routeCode);
      if (activeRoute) {
        // Draw wide outer glow line
        const glowLine = L.polyline(activeRoute.waypoints, {
          color: "#FF6B35",
          weight: 6,
          opacity: 0.22,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);

        // Draw inner dashes line representing future flows
        const dashLine = L.polyline(activeRoute.waypoints, {
          color: "#FF6B35",
          weight: 2,
          opacity: 0.8,
          dashArray: "4, 8",
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);

        activeRouteGlowRef.current.push(glowLine, dashLine);
      }

      // 5. HISTORICAL TRAIL
      if (activeBus.history && activeBus.history.length > 1) {
        const trailLine = L.polyline(activeBus.history, {
          color: "#FF6B35",
          weight: 2.5,
          opacity: 0.5,
          dashArray: "2, 3",
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);
        selectedTrailRef.current = trailLine;
      }
    }
  }, [buses, selectedBusId, geofences, routes, stations, isPlaybackPaused, onSelectBus, onSelectStation]);

  // Handle map centering and auto-following when a bus is selected and "Follow Bus Mode" is ON
  useEffect(() => {
    const map = mapRef.current;
    if (!map || selectedBusId === null) return;

    const selectedBus = buses.find((b) => b.id === selectedBusId);
    if (selectedBus) {
      // Auto follow camera centering
      if (isFollowingBus) {
        map.setView([selectedBus.lat, selectedBus.lng], map.getZoom(), {
          animate: true,
          duration: 0.5,
        });
      } else {
        // Simple click pan centering (only once)
        map.panTo([selectedBus.lat, selectedBus.lng], {
          animate: true,
          duration: 0.5,
        });
      }
    }
  }, [selectedBusId, buses, isFollowingBus]);

  return (
    <div className="relative w-full h-[580px] rounded-xl overflow-hidden border border-white/10 bg-[#111122]">
      {/* Map Target */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Playback Overlay Banner */}
      {!isPlaybackPaused && (
        <div className="absolute top-4 left-4 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg z-20 text-[10px] text-emerald-400 font-mono tracking-wider pointer-events-none flex items-center gap-1.5 shadow-md backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>LIVE TELEMETRY ACTIVE</span>
        </div>
      )}

      {isPlaybackPaused && (
        <div className="absolute top-4 left-4 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg z-20 text-[10px] text-amber-400 font-mono tracking-wider pointer-events-none flex items-center gap-1.5 shadow-md backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span>TIMELINE PLAYBACK PAUSED</span>
        </div>
      )}

      {/* Bounding box display values */}
      <div className="absolute bottom-4 left-4 bg-slate-950/80 border border-white/10 px-3 py-2 rounded-lg z-20 text-[10px] text-brand-muted pointer-events-none flex flex-col gap-1 shadow-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
          <span>Station Stop</span>
        </div>
        <div className="flex items-center gap-1.5 border-t border-white/5 pt-1 mt-1">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-white/20"></span>
          <span>Geofence Zone Violation</span>
        </div>
      </div>
    </div>
  );
}
