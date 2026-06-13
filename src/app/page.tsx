"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Gauge,
  CircleDot,
  Power,
  History,
  Phone,
  Mail,
  MapPin,
  X,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Rss,
  PlayCircle,
  HelpCircle,
  Eye,
  ShieldCheck
} from "lucide-react";

import { routes, stations, geofenceZones, initialBuses, Bus, Station, GeofenceZone, RouteData } from "@/data/mapData";

// Dynamically import the TrackerMap component to prevent SSR failures with Leaflet
const TrackerMap = dynamic(() => import("@/components/TrackerMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[580px] bg-slate-900/50 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-3 text-slate-400">
      <Compass className="w-10 h-10 animate-spin text-[#FF6B35]" />
      <span className="text-sm font-semibold tracking-wider font-mono">LOADING FLEET RADAR...</span>
    </div>
  ),
});

// Helper to calculate distance in meters between two lat/lng coordinates
const getDistanceMeters = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export default function Home() {
  const [buses, setBuses] = useState<Bus[]>(initialBuses);
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [activityFeed, setActivityFeed] = useState<string[]>([]);
  
  // Follow Bus camera tracking state
  const [isFollowingBus, setIsFollowingBus] = useState(false);

  // Station countdown timer state (ticks down remaining seconds dynamically)
  const [stationArrivalSeconds, setStationArrivalSeconds] = useState<{ [busId: number]: number }>({});

  // Investor Guided Demonstration State
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const demoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Interactive Timeline Playback State
  const [isPlaybackPaused, setIsPlaybackPaused] = useState(false);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [historyLog, setHistoryLog] = useState<Bus[][]>([]);

  // Top Metrics Counts (State for animation)
  const [metricBuses, setMetricBuses] = useState(0);
  const [metricUptime, setMetricUptime] = useState(0);
  const [metricAlerts, setMetricAlerts] = useState(0);
  const [metricRiders, setMetricRiders] = useState(0);

  // References for live telemetry values
  const tickCounterRef = useRef(0);

  // Initializing Metric counters animation on mount
  useEffect(() => {
    // Initial activity logs
    setActivityFeed([
      "08:15 System diagnostics initialized. 15/15 GPS hardware units operating.",
      "08:22 Route A - Koteshwor transit ETA sync completed.",
      "08:31 Bus #11 geofence perimeter deviation detected.",
      "08:35 Route B schedule optimization: ETA improved by 3 minutes."
    ]);

    // Animate metrics upwards
    const intervalBuses = setInterval(() => {
      setMetricBuses((prev) => (prev < 523 ? prev + 13 : 523));
    }, 20);
    const intervalUptime = setInterval(() => {
      setMetricUptime((prev) => (prev < 99.7 ? parseFloat((prev + 2.5).toFixed(1)) : 99.7));
    }, 15);
    const intervalAlerts = setInterval(() => {
      setMetricAlerts((prev) => (prev < 847 ? prev + 21 : 847));
    }, 20);
    const intervalRiders = setInterval(() => {
      setMetricRiders((prev) => (prev < 4.2 ? parseFloat((prev + 0.1).toFixed(1)) : 4.2));
    }, 25);

    return () => {
      clearInterval(intervalBuses);
      clearInterval(intervalUptime);
      clearInterval(intervalAlerts);
      clearInterval(intervalRiders);
    };
  }, []);

  // Station countdown timer loop (decrements every 1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      setStationArrivalSeconds((prev) => {
        const updated = { ...prev };
        let changed = false;
        Object.keys(updated).forEach((key) => {
          const id = parseInt(key);
          if (updated[id] > 0) {
            updated[id] -= 1;
            changed = true;
          }
        });
        return changed ? updated : prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate dynamic countdown values when a station is clicked
  useEffect(() => {
    if (!selectedStation) return;

    const times: { [busId: number]: number } = {};
    buses.forEach((bus) => {
      const dx = bus.lng - selectedStation.lng;
      const dy = bus.lat - selectedStation.lat;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speedFactor = bus.ignition === "OFF" ? 25 : bus.speed;

      // Calculate initial arrival in seconds (e.g. scale distance)
      const seconds = Math.round((distance / speedFactor) * 320000);
      times[bus.id] = Math.max(30, seconds); // minimum 30 seconds
    });
    setStationArrivalSeconds(times);
  }, [selectedStation, buses]);

  // Fleet Telemetry Movement Loop
  useEffect(() => {
    if (isPlaybackPaused || isDemoActive) return;

    const interval = setInterval(() => {
      tickCounterRef.current += 1;
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setBuses((prevBuses) => {
        const updatedBuses = prevBuses.map((bus) => {
          if (bus.ignition === "OFF") return bus;

          // Retrieve active route waypoints
          const activeRoute = routes.find((r) => r.code === bus.routeCode);
          if (!activeRoute) return bus;

          // Determine next waypoint target coordinate
          let nextIndex = bus.waypointIndex + bus.direction;
          let newDirection = bus.direction;

          // Reached end of route coordinates, bounce back
          if (nextIndex >= activeRoute.waypoints.length) {
            nextIndex = activeRoute.waypoints.length - 2;
            newDirection = -1;
          } else if (nextIndex < 0) {
            nextIndex = 1;
            newDirection = 1;
          }

          const targetPos = activeRoute.waypoints[nextIndex];

          // Calculate distance to target waypoint
          const dx = targetPos[1] - bus.lng;
          const dy = targetPos[0] - bus.lat;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Speed-based step factor
          const step = (bus.speed / 100) * 0.0003;

          let newLat = bus.lat;
          let newLng = bus.lng;
          let newWaypointIndex = bus.waypointIndex;

          if (distance < 0.001) {
            // Arrived at waypoint. Snap to it and head to the next one
            newLat = targetPos[0];
            newLng = targetPos[1];
            newWaypointIndex = nextIndex;
          } else {
            // Move toward waypoint
            newLat = bus.lat + (dy / distance) * step;
            newLng = bus.lng + (dx / distance) * step;
          }

          // Calculate heading angle in degrees (relative to North)
          const angleRad = Math.atan2(newLng - bus.lng, newLat - bus.lat);
          let newHeading = angleRad * (180 / Math.PI);
          if (newHeading < 0) newHeading += 360;

          // Append to history array for trailing lines (limit to 10 points)
          const updatedHistory = [...bus.history, [newLat, newLng] as [number, number]];
          if (updatedHistory.length > 10) {
            updatedHistory.shift();
          }

          // Simulate random speed variations
          let newSpeed = bus.speed;
          let newStatus = bus.status;

          // Speed thresholds for Warning (51-80) and normal (<=50). Bus 11 is overspeeding (>80)
          if (bus.id === 11) {
            // Periodically cycle overspeed values for alert logs
            if (tickCounterRef.current % 12 === 0) {
              newSpeed = 118;
              newStatus = "Overspeeding";
              addActivityLog(`${timestamp} Alert: Bus #11 exceeded route B speed limit (118 km/h).`);
            } else if (tickCounterRef.current % 12 === 6) {
              newSpeed = 48;
              newStatus = "On Time";
              addActivityLog(`${timestamp} Info: Bus #11 speed normalized (48 km/h).`);
            }
          } else {
            // Slightly fluctuate speeds for warning states
            if (bus.id === 3 || bus.id === 7) {
              newSpeed = Math.floor(Math.random() * (78 - 62 + 1)) + 62;
              newStatus = "Delayed";
            } else {
              newSpeed = Math.max(25, Math.min(50, bus.speed + (Math.random() > 0.5 ? 2 : -2)));
              newStatus = "On Time";
            }
          }

          // Geofence status checks
          const targetZone = geofenceZones.find((z) => z.id === bus.geofence.zoneId);
          let isInsideGeofence = true;
          if (targetZone) {
            const dist = getDistanceMeters(newLat, newLng, targetZone.lat, targetZone.lng);
            isInsideGeofence = dist <= targetZone.radius;

            if (bus.geofence.inside && !isInsideGeofence) {
              addActivityLog(`${timestamp} Warning: Bus #${bus.id} crossed boundary of ${targetZone.name}.`);
            } else if (!bus.geofence.inside && isInsideGeofence) {
              addActivityLog(`${timestamp} Resolve: Bus #${bus.id} returned inside geofence perimeter.`);
            }
          }

          return {
            ...bus,
            lat: parseFloat(newLat.toFixed(6)),
            lng: parseFloat(newLng.toFixed(6)),
            speed: newSpeed,
            status: newStatus,
            waypointIndex: newWaypointIndex,
            direction: newDirection,
            heading: Math.round(newHeading),
            history: updatedHistory,
            geofence: {
              ...bus.geofence,
              inside: isInsideGeofence,
            },
          };
        });

        // Add to history log (keep last 30 minutes / 90 ticks)
        setHistoryLog((prev) => {
          const updatedHistoryLog = [...prev, updatedBuses];
          if (updatedHistoryLog.length > 90) {
            updatedHistoryLog.shift();
          }
          setTimelineIndex(updatedHistoryLog.length - 1);
          return updatedHistoryLog;
        });

        return updatedBuses;
      });
    }, 2000); // 2-second live updates

    return () => clearInterval(interval);
  }, [isPlaybackPaused, isDemoActive]);

  // Guided Investor Demonstration Tour Effect
  useEffect(() => {
    if (!isDemoActive) {
      if (demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current);
        demoIntervalRef.current = null;
      }
      return;
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Step 0: Initial Trigger
    setSelectedStation(null);
    setSelectedBusId(11); // Select Bhaktapur bus (Bus #11)
    setIsFollowingBus(true);
    addActivityLog(`${timestamp} [DEMO] Commencing investor-guided intelligence tour. Cameras focusing on Bus #11.`);

    demoIntervalRef.current = setInterval(() => {
      setDemoStep((prevStep) => {
        const nextStep = prevStep + 1;
        const currentTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        switch (nextStep) {
          case 1:
            // Step 1: Follow Bus
            setIsFollowingBus(true);
            addActivityLog(`${currentTimestamp} [DEMO] Camera locked on Bus #11. Real-time path tracking active.`);
            break;
          case 2:
            // Step 2: Show ETA Prediction
            addActivityLog(`${currentTimestamp} [DEMO] AI ETA prediction modeling: Bus #11 next arrival at Changunarayan range: 4-6 minutes.`);
            break;
          case 3:
            // Step 3: Overspeed alert
            setBuses((prev) =>
              prev.map((b) => (b.id === 11 ? { ...b, speed: 118, status: "Overspeeding" } : b))
            );
            addActivityLog(`${currentTimestamp} [DEMO] Alert: Bus #11 speed warning triggered (118 km/h). Operator console notified.`);
            break;
          case 4:
            // Step 4: Geofence violation
            setBuses((prev) =>
              prev.map((b) => (b.id === 11 ? { ...b, geofence: { ...b.geofence, inside: false } } : b))
            );
            addActivityLog(`${currentTimestamp} [DEMO] Alarm: Bus #11 crossed Central Geofence Boundary GF-02. Perimeter flashes red.`);
            break;
          case 5:
            // Step 5: Station arrival board
            setIsFollowingBus(false);
            const bhaktapurStation = stations.find((s) => s.name === "Bhaktapur Square") || null;
            setSelectedStation(bhaktapurStation);
            setSelectedBusId(null);
            addActivityLog(`${currentTimestamp} [DEMO] Connecting Bhaktapur Square arrival board. Countdown clocks synced.`);
            break;
          case 6:
            // Step 6: Playback demonstration
            setSelectedStation(null);
            setIsPlaybackPaused(true);
            addActivityLog(`${currentTimestamp} [DEMO] Historical analysis: Rewinding fleet telemetry by 10 minutes.`);
            break;
          case 7:
            // Complete Tour
            setIsPlaybackPaused(false);
            setIsDemoActive(false);
            setDemoStep(0);
            setSelectedBusId(null);
            setSelectedStation(null);
            addActivityLog(`${currentTimestamp} [DEMO] Investor Guided Tour completed. Fleet control restored to live feed.`);
            break;
          default:
            break;
        }

        return nextStep;
      });
    }, 7000); // Transitions every 7 seconds

    return () => {
      if (demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current);
        demoIntervalRef.current = null;
      }
    };
  }, [isDemoActive]);

  const handleStartDemo = () => {
    setIsDemoActive(true);
    setDemoStep(0);
  };

  // Helper to add logs to activity ticker
  const addActivityLog = (message: string) => {
    setActivityFeed((prev) => [message, ...prev.slice(0, 14)]);
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value);
    setTimelineIndex(idx);
    setIsPlaybackPaused(true);
    if (historyLog[idx]) {
      setBuses(historyLog[idx]);
    }
  };

  const handleResetTimelineLive = () => {
    setIsPlaybackPaused(false);
    if (historyLog.length > 0) {
      setBuses(historyLog[historyLog.length - 1]);
      setTimelineIndex(historyLog.length - 1);
    }
  };

  const handleBusClick = (busId: number | null) => {
    setSelectedBusId(busId);
    setSelectedStation(null);
    setIsFollowingBus(false); // Default to pan on select, user can toggle Follow ON
  };

  const handleSelectStation = (station: Station | null) => {
    setSelectedStation(station);
    setSelectedBusId(null);
    setIsFollowingBus(false);
  };

  // Convert seconds remaining to dynamic countdown label
  const formatCountdown = (seconds: number | undefined) => {
    if (seconds === undefined) return "N/A";
    if (seconds <= 0) return "Arriving";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Calculate dynamic ETA accuracy range based on traffic and speed
  const getETARange = (bus: Bus) => {
    if (bus.ignition === "OFF") return "N/A (Stopped)";
    
    // Simulate traffic level based on bus ID
    const traffic = bus.id % 3 === 0 ? "Heavy" : bus.id % 3 === 1 ? "Moderate" : "Light";
    const speedFactor = bus.speed > 0 ? bus.speed : 30;

    // Base ETA minutes
    const baseMinutes = Math.max(2, Math.round(15 - (speedFactor / 10)));
    const trafficAddition = traffic === "Heavy" ? 5 : traffic === "Moderate" ? 2 : 0;
    const minRange = baseMinutes + trafficAddition;
    const maxRange = minRange + (traffic === "Heavy" ? 4 : 2);

    return `${minRange}–${maxRange} min`;
  };

  // Diagnostics Counters
  const totalBusesOnline = buses.length;
  const activeRoutesCount = routes.length;
  const overspeedingBusesCount = buses.filter((b) => b.speed > 80).length;
  const geofenceViolationsCount = buses.filter((b) => !b.geofence.inside).length;

  const selectedBus = buses.find((b) => b.id === selectedBusId) || null;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#1A1A2E] text-white select-none">
      
      {/* 1. HEADER */}
      <header className="bg-[#121222] border-b border-white/5 py-4 px-6 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF6B35] flex items-center justify-center text-white shadow-lg shadow-[#FF6B35]/25">
              <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: "20s" }} />
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base tracking-wider text-white">
                MAYUR YATAYAT GPS BUS TRACKER
              </h1>
              <p className="text-[10px] text-[#FF6B35] tracking-widest font-mono uppercase">
                Investor Intelligence Control Room
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Watch Guided Demo Button */}
            <button
              onClick={handleStartDemo}
              disabled={isDemoActive}
              className={`px-4 py-1.5 rounded-lg border font-semibold text-xs transition-all flex items-center gap-1.5 ${
                isDemoActive
                  ? "bg-[#FF6B35]/20 border-[#FF6B35]/40 text-[#FF6B35] cursor-default"
                  : "bg-white/5 border-white/10 hover:bg-[#FF6B35] hover:border-[#FF6B35] hover:text-white"
              }`}
            >
              <PlayCircle size={14} className={isDemoActive ? "animate-pulse" : ""} />
              <span>{isDemoActive ? `TOUR STEP ${demoStep}/7 ACTIVE` : "WATCH PLATFORM INTELLIGENCE"}</span>
            </button>

            <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35] font-mono text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />
              15 OF 15 VEHICLES SYNCED
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        
        {/* INTERACTIVE METRICS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#121222]/85 border border-white/5 p-4 rounded-xl shadow-md">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Active Fleet Size</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-white tabular-nums">{metricBuses}</span>
              <span className="text-xs text-emerald-400 font-bold">Units</span>
            </div>
          </div>
          
          <div className="flex flex-col border-l border-white/5 pl-4">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Uptime Rate</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-white tabular-nums">{metricUptime}%</span>
              <span className="text-xs text-[#FF6B35] font-bold">SLA Limit</span>
            </div>
          </div>

          <div className="flex flex-col border-l border-white/5 pl-4">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">System Alerts Handled</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-white tabular-nums">{metricAlerts}</span>
              <span className="text-xs text-rose-400 font-bold">Today</span>
            </div>
          </div>

          <div className="flex flex-col border-l border-white/5 pl-4">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Ridership Impact</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-white tabular-nums">{metricRiders}M</span>
              <span className="text-xs text-[#FF6B35] font-bold">Monthly</span>
            </div>
          </div>
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* MAP & PLAYBACK CONTROLS (75% Width Area) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            <TrackerMap
              buses={buses}
              stations={stations}
              geofences={geofenceZones}
              routes={routes}
              selectedBusId={selectedBusId}
              onSelectBus={handleBusClick}
              onSelectStation={handleSelectStation}
              isPlaybackPaused={isPlaybackPaused}
              isFollowingBus={isFollowingBus}
            />

            {/* HISTORICAL TIMELINE PLAYBACK */}
            <div className="bg-[#121222] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-md">
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsPlaybackPaused(!isPlaybackPaused)}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-all"
                  title={isPlaybackPaused ? "Resume Live Feed" : "Pause Fleet Playback"}
                >
                  {isPlaybackPaused ? <Play size={16} /> : <Pause size={16} />}
                </button>
                <button
                  onClick={handleResetTimelineLive}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-all"
                  title="Reset to Live Telemetry"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              <div className="flex-1 flex flex-col w-full">
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-1">
                  <span>-30 Min Route History</span>
                  <span className="text-[#FF6B35] font-bold">
                    {isPlaybackPaused ? "PLAYING BACK LOGS" : "LIVE POSITION BROADCAST"}
                  </span>
                  <span>Now</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={historyLog.length > 0 ? historyLog.length - 1 : 0}
                  value={timelineIndex}
                  onChange={handleTimelineChange}
                  disabled={historyLog.length === 0}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
                />
              </div>
            </div>
          </div>

          {/* SIDEBAR LIVE OPERATIONS PANEL (25% Width Area) */}
          <div className="flex flex-col gap-6">
            
            {/* LIVE OPERATIONS METRICS */}
            <div className="bg-[#121222] border border-white/5 rounded-xl p-4 shadow-md flex flex-col gap-3">
              <h3 className="text-xs uppercase font-extrabold text-[#FF6B35] tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />
                Live Fleet operations
              </h3>
              
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-[#1A1A2E] p-2.5 rounded border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Online</span>
                  <span className="text-sm font-extrabold text-white mt-1 block tabular-nums">{totalBusesOnline}</span>
                </div>
                <div className="bg-[#1A1A2E] p-2.5 rounded border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Corridors</span>
                  <span className="text-sm font-extrabold text-white mt-1 block tabular-nums">{activeRoutesCount}</span>
                </div>
                <div className="bg-[#1A1A2E] p-2.5 rounded border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Overspeeds</span>
                  <span className={`text-sm font-extrabold mt-1 block tabular-nums ${overspeedingBusesCount > 0 ? "text-rose-400 font-extrabold" : "text-white"}`}>
                    {overspeedingBusesCount}
                  </span>
                </div>
                <div className="bg-[#1A1A2E] p-2.5 rounded border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Geofence Out</span>
                  <span className={`text-sm font-extrabold mt-1 block tabular-nums ${geofenceViolationsCount > 0 ? "text-rose-400 font-extrabold" : "text-white"}`}>
                    {geofenceViolationsCount}
                  </span>
                </div>
              </div>
            </div>

            {/* STATION ARRIVAL COUNTDOWN BOARD */}
            {selectedStation && (
              <div className="bg-[#121222] border border-[#FF6B35]/40 rounded-xl p-4 shadow-md relative">
                <button
                  onClick={() => setSelectedStation(null)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[#FF6B35]" />
                  <h4 className="font-extrabold text-xs uppercase text-[#FF6B35] tracking-wider">Arrival Board</h4>
                </div>

                <div className="border-b border-white/5 pb-2 mb-3">
                  <h5 className="text-[10px] text-slate-500 uppercase font-bold">Current Station</h5>
                  <p className="text-sm font-extrabold text-white">{selectedStation.name}</p>
                </div>

                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide mb-2">Next Arrivals</p>
                
                <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto no-scrollbar">
                  {buses
                    .map((bus) => {
                      const secsRemaining = stationArrivalSeconds[bus.id];
                      return {
                        ...bus,
                        secsRemaining,
                      };
                    })
                    .sort((a, b) => (a.secsRemaining || 9999) - (b.secsRemaining || 9999))
                    .slice(0, 4)
                    .map((bus) => (
                      <div
                        key={bus.id}
                        onClick={() => handleBusClick(bus.id)}
                        className="p-2 bg-[#1A1A2E] border border-white/5 rounded flex items-center justify-between hover:border-[#FF6B35]/30 cursor-pointer"
                      >
                        <span className="text-[10px] font-bold text-slate-300">Bus #{bus.id}</span>
                        <span className="font-mono text-[10px] text-[#FF6B35] font-extrabold">
                          {formatCountdown(bus.secsRemaining)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TELEMETRY DETAIL PANEL */}
            {selectedBus && (
              <div className="bg-[#121222] border border-[#FF6B35]/40 rounded-xl p-4 shadow-md relative">
                <button
                  onClick={() => setSelectedBusId(null)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
                
                <div className="flex justify-between items-center mb-3 pr-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#FF6B35]" />
                    <h4 className="font-extrabold text-xs uppercase text-[#FF6B35] tracking-wider">Bus Specifications</h4>
                  </div>
                  {/* Follow Bus Mode Toggle */}
                  <button
                    onClick={() => setIsFollowingBus(!isFollowingBus)}
                    className={`px-2 py-0.5 rounded text-[8px] font-extrabold border transition-all ${
                      isFollowingBus
                        ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20 animate-pulse"
                        : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {isFollowingBus ? "FOLLOWING" : "FOLLOW BUS"}
                  </button>
                </div>

                <div className="text-[11px] space-y-2.5 text-slate-300">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-500">Fleet Unit:</span>
                    <span className="font-extrabold text-white">Bus #{selectedBus.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-500">Route Map:</span>
                    <span className="text-white font-medium">{selectedBus.routeCode}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-500">Current Location:</span>
                    <span className="text-white font-medium">{selectedBus.currentLocationName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-500">Telemetry Speed:</span>
                    <span className={`font-mono font-bold ${selectedBus.speed > 80 ? "text-rose-400 font-extrabold" : "text-white"}`}>
                      {selectedBus.speed} km/h
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-500">Next Destination Stop:</span>
                    <span className="text-[#FF6B35] font-semibold">
                      {selectedBus.direction === 1
                        ? (selectedBus.routeCode === "Route A" ? "Bhaktapur Square" : selectedBus.routeCode === "Route B" ? "Changunarayan Temple" : "Thankot (Exit)")
                        : (selectedBus.routeCode === "Route A" ? "Kathmandu Bus Park" : selectedBus.routeCode === "Route B" ? "Lainchaur" : "Kathmandu Bus Park")}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-500">ETA prediction (AI):</span>
                    <span className="text-[#FF6B35] font-bold">{getETARange(selectedBus)}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-500">Driver Status:</span>
                    <span className="text-white font-medium">{selectedBus.driverStatus}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-500">Occupancy Estimate:</span>
                    <span className="text-white font-medium">{selectedBus.occupancy}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-500">Safety Score:</span>
                    <span className="text-white font-medium font-mono">{selectedBus.safetyScore}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-500">Ignition state:</span>
                    <span className={selectedBus.ignition === "ON" ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                      {selectedBus.ignition}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Geofence:</span>
                    <span className={selectedBus.geofence.inside ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                      {selectedBus.geofence.inside ? "SECURE (INSIDE)" : "VIOLATION (OUTSIDE)"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* DEFAULT PANEL - PROMPT ACTION */}
            {!selectedBus && !selectedStation && (
              <div className="bg-[#121222]/80 border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center text-center h-[280px]">
                <Compass className="w-8 h-8 text-slate-500 mb-3 animate-pulse" />
                <h3 className="font-bold text-xs uppercase text-slate-400 tracking-wider">No Selection</h3>
                <p className="text-[11px] text-slate-500 mt-2 max-w-[180px] leading-relaxed">
                  Click on any **Bus Icon** to view details, or click on a **Station Marker** to check arrival ETAs.
                </p>
              </div>
            )}

            {/* SCROLLING FLEET LIST */}
            <div className="bg-[#121222] border border-white/5 rounded-xl p-4 shadow-md flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">Live Vehicles Feed</span>
              
              <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto no-scrollbar">
                {buses.map((bus) => {
                  const isSelected = bus.id === selectedBusId;
                  const isWarning = bus.speed > 50 && bus.speed <= 80;
                  const isOverspeeding = bus.speed > 80;

                  let tagColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                  let tagLabel = "On Time";

                  if (isOverspeeding) {
                    tagColor = "bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse";
                    tagLabel = "Overspeeding";
                  } else if (isWarning) {
                    tagColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
                    tagLabel = "2 min delayed";
                  } else if (bus.ignition === "OFF") {
                    tagColor = "bg-slate-500/10 text-slate-400 border-slate-500/20";
                    tagLabel = "Stationary";
                  }

                  return (
                    <div
                      key={bus.id}
                      onClick={() => handleBusClick(bus.id)}
                      className={`p-2 rounded border flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#FF6B35]/15 border-[#FF6B35]/40"
                          : "bg-[#1A1A2E]/60 border-white/5 hover:bg-[#1A1A2E]"
                      }`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-white">Bus #{bus.id} ({bus.currentLocationName})</span>
                        <span className="text-[8px] text-slate-500 font-mono">
                          {bus.routeCode} &bull; {bus.speed} km/h
                        </span>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] border font-bold font-sans ${tagColor}`}>
                        {tagLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* REAL-TIME ACTIVITY FEED */}
            <div className="bg-[#121222] border border-white/5 rounded-xl p-4 shadow-md flex flex-col flex-1 min-h-[160px]">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                <Rss size={10} className="text-[#FF6B35]" />
                Live activity feed
              </span>

              <div className="flex flex-col gap-1.5 overflow-y-auto no-scrollbar max-h-[140px] text-[9px] font-mono text-slate-400">
                {activityFeed.map((log, index) => (
                  <div key={index} className="flex gap-1.5 py-1 border-b border-white/[0.02] last:border-0 leading-normal">
                    <span className="text-[#FF6B35] font-bold shrink-0">&raquo;</span>
                    <p className="flex-1">{log}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 5. FEATURES SHOWCASE */}
      <section id="features" className="w-full py-12 bg-[#121222] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8 border-l-2 border-[#FF6B35] pl-3">
            <h2 className="font-extrabold text-sm uppercase tracking-wider text-white">
              GPS Dashboard Features
            </h2>
            <p className="text-[11px] text-slate-400 mt-1">
              Active telemetry tracking capabilities configured in the hardware
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1: OVERSPEEDING DETECTION */}
            <div className="bg-[#1A1A2E] border border-white/5 rounded-xl p-5 hover:border-[#FF6B35]/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/25 flex items-center justify-center text-[#FF6B35] mb-4">
                <Gauge size={18} />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                OVERSPEEDING DETECTION
              </h3>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Alerts when bus exceeds speed limit
              </p>
            </div>

            {/* Feature 2: GEOFENCING */}
            <div className="bg-[#1A1A2E] border border-white/5 rounded-xl p-5 hover:border-[#FF6B35]/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/25 flex items-center justify-center text-[#FF6B35] mb-4">
                <CircleDot size={18} />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                GEOFENCING
              </h3>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Alerts when bus enters restricted zones
              </p>
            </div>

            {/* Feature 3: IGNITION TRACKING */}
            <div className="bg-[#1A1A2E] border border-white/5 rounded-xl p-5 hover:border-[#FF6B35]/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/25 flex items-center justify-center text-[#FF6B35] mb-4">
                <Power size={18} />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                IGNITION TRACKING
              </h3>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Tracks when bus engine turns on/off
              </p>
            </div>

            {/* Feature 4: ROUTE HISTORY */}
            <div className="bg-[#1A1A2E] border border-white/5 rounded-xl p-5 hover:border-[#FF6B35]/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/25 flex items-center justify-center text-[#FF6B35] mb-4">
                <History size={18} />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                ROUTE HISTORY
              </h3>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                View past routes and playback
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0e0e1a] border-t border-white/5 py-8 px-6 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="font-extrabold text-[#FF6B35] tracking-wider uppercase">
              MAYUR YATAYAT GPS BUS TRACKER
            </span>
            <span className="text-[10px] text-slate-600">
              Live Kathmandu Transit Monitoring System
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 font-mono text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Phone size={12} className="text-[#FF6B35]" />
              <span>+977-1-4224567</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail size={12} className="text-[#FF6B35]" />
              <span>gps-support@mayuryatayat.com</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-600 text-center md:text-right">
            &copy; {new Date().getFullYear()} Mayur Yatayat. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
