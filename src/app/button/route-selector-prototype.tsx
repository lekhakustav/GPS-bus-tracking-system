"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BusFront,
  Check,
  LocateFixed,
  MapPin,
  MousePointer2,
  Route,
  Sparkles,
} from "lucide-react";
import styles from "./route-selector.module.css";

type Place = {
  id: string;
  name: string;
  nepali: string;
  lat: number;
  lng: number;
  weight: number;
  tone: "core" | "north" | "east" | "south" | "west";
  neighbors: string[];
};

type BusRoute = {
  id: string;
  name: string;
  service: string;
  cadence: string;
  tone: string;
  stops: string[];
};

type SelectorMode = "current" | "destination";

const valleyBounds = {
  minLat: 27.58,
  maxLat: 27.8,
  minLng: 85.18,
  maxLng: 85.55,
};

const layoutNudges: Record<string, { x: number; y: number }> = {
  balaju: { x: -5, y: -4 },
  gongabu: { x: -1, y: -7 },
  samakhusi: { x: 0, y: -3 },
  maharajgunj: { x: 5, y: -8 },
  lazimpat: { x: -3, y: -3 },
  sorhakhutte: { x: -8, y: -1 },
  jamal: { x: -6, y: 1 },
  ratnapark: { x: -7, y: 5 },
  putalisadak: { x: 2, y: 2 },
  naxal: { x: 4, y: 2 },
  chabahil: { x: 13, y: -8 },
  gaushala: { x: 11, y: 5 },
  bouddha: { x: 15, y: -6 },
  jorpati: { x: 18, y: -2 },
  sinamangal: { x: 10, y: 8 },
  newbaneshwor: { x: 4, y: 8 },
  koteshwor: { x: 8, y: 12 },
  thimi: { x: 9, y: 4 },
  bhaktapur: { x: 12, y: 5 },
  suryabinayak: { x: 15, y: 14 },
  tripureshwor: { x: -6, y: 10 },
  kalanki: { x: -13, y: 9 },
  balkhu: { x: -8, y: 16 },
  jawalakhel: { x: -5, y: 22 },
  lagankhel: { x: 0, y: 24 },
  satdobato: { x: 0, y: 29 },
  gwarko: { x: 7, y: 24 },
  kirtipur: { x: -14, y: 17 },
};

const places: Place[] = [
  {
    id: "balaju",
    name: "Balaju",
    nepali: "बालाजु",
    lat: 27.735,
    lng: 85.303,
    weight: 5,
    tone: "north",
    neighbors: ["gongabu", "samakhusi", "sorhakhutte"],
  },
  {
    id: "gongabu",
    name: "Gongabu",
    nepali: "गोंगबु",
    lat: 27.736,
    lng: 85.315,
    weight: 6,
    tone: "north",
    neighbors: ["balaju", "samakhusi", "maharajgunj"],
  },
  {
    id: "samakhusi",
    name: "Samakhusi",
    nepali: "सामाखुसी",
    lat: 27.728,
    lng: 85.321,
    weight: 4,
    tone: "north",
    neighbors: ["gongabu", "lazimpat", "sorhakhutte"],
  },
  {
    id: "maharajgunj",
    name: "Maharajgunj",
    nepali: "महाराजगन्ज",
    lat: 27.739,
    lng: 85.343,
    weight: 6,
    tone: "north",
    neighbors: ["gongabu", "lazimpat", "chabahil"],
  },
  {
    id: "lazimpat",
    name: "Lazimpat",
    nepali: "लाजिम्पाट",
    lat: 27.721,
    lng: 85.32,
    weight: 4,
    tone: "core",
    neighbors: ["samakhusi", "maharajgunj", "jamal", "naxal"],
  },
  {
    id: "sorhakhutte",
    name: "Sorhakhutte",
    nepali: "सोह्रखुट्टे",
    lat: 27.719,
    lng: 85.307,
    weight: 4,
    tone: "core",
    neighbors: ["balaju", "samakhusi", "jamal", "kalanki"],
  },
  {
    id: "jamal",
    name: "Jamal",
    nepali: "जमल",
    lat: 27.708,
    lng: 85.315,
    weight: 7,
    tone: "core",
    neighbors: ["lazimpat", "ratnapark", "putalisadak", "sorhakhutte"],
  },
  {
    id: "ratnapark",
    name: "Ratna Park",
    nepali: "रत्नपार्क",
    lat: 27.705,
    lng: 85.315,
    weight: 9,
    tone: "core",
    neighbors: ["jamal", "putalisadak", "tripureshwor", "newbaneshwor"],
  },
  {
    id: "putalisadak",
    name: "Putalisadak",
    nepali: "पुतलीसडक",
    lat: 27.704,
    lng: 85.325,
    weight: 6,
    tone: "core",
    neighbors: ["jamal", "ratnapark", "naxal", "newbaneshwor"],
  },
  {
    id: "naxal",
    name: "Naxal",
    nepali: "नक्साल",
    lat: 27.712,
    lng: 85.33,
    weight: 4,
    tone: "core",
    neighbors: ["lazimpat", "putalisadak", "chabahil"],
  },
  {
    id: "chabahil",
    name: "Chabahil",
    nepali: "चाबहिल",
    lat: 27.716,
    lng: 85.347,
    weight: 7,
    tone: "east",
    neighbors: ["maharajgunj", "naxal", "gaushala", "bouddha"],
  },
  {
    id: "gaushala",
    name: "Gaushala",
    nepali: "गौशाला",
    lat: 27.707,
    lng: 85.344,
    weight: 6,
    tone: "east",
    neighbors: ["chabahil", "sinamangal", "newbaneshwor"],
  },
  {
    id: "bouddha",
    name: "Bouddha",
    nepali: "बौद्ध",
    lat: 27.721,
    lng: 85.362,
    weight: 5,
    tone: "east",
    neighbors: ["chabahil", "jorpati"],
  },
  {
    id: "jorpati",
    name: "Jorpati",
    nepali: "जोरपाटी",
    lat: 27.724,
    lng: 85.381,
    weight: 4,
    tone: "east",
    neighbors: ["bouddha", "sankhu"],
  },
  {
    id: "sankhu",
    name: "Sankhu",
    nepali: "साँखु",
    lat: 27.744,
    lng: 85.459,
    weight: 3,
    tone: "east",
    neighbors: ["jorpati", "bhaktapur"],
  },
  {
    id: "sinamangal",
    name: "Sinamangal",
    nepali: "सिनामंगल",
    lat: 27.697,
    lng: 85.349,
    weight: 4,
    tone: "east",
    neighbors: ["gaushala", "koteshwor"],
  },
  {
    id: "newbaneshwor",
    name: "New Baneshwor",
    nepali: "नयाँ बानेश्वर",
    lat: 27.69,
    lng: 85.334,
    weight: 8,
    tone: "core",
    neighbors: ["putalisadak", "ratnapark", "gaushala", "koteshwor"],
  },
  {
    id: "koteshwor",
    name: "Koteshwor",
    nepali: "कोटेश्वर",
    lat: 27.678,
    lng: 85.349,
    weight: 9,
    tone: "east",
    neighbors: ["newbaneshwor", "sinamangal", "gwarko", "thimi"],
  },
  {
    id: "thimi",
    name: "Thimi",
    nepali: "ठिमी",
    lat: 27.68,
    lng: 85.385,
    weight: 5,
    tone: "east",
    neighbors: ["koteshwor", "bhaktapur"],
  },
  {
    id: "bhaktapur",
    name: "Bhaktapur",
    nepali: "भक्तपुर",
    lat: 27.672,
    lng: 85.429,
    weight: 7,
    tone: "east",
    neighbors: ["thimi", "sankhu", "suryabinayak"],
  },
  {
    id: "suryabinayak",
    name: "Suryabinayak",
    nepali: "सूर्यविनायक",
    lat: 27.665,
    lng: 85.427,
    weight: 5,
    tone: "east",
    neighbors: ["bhaktapur", "banepa"],
  },
  {
    id: "banepa",
    name: "Banepa",
    nepali: "बनेपा",
    lat: 27.632,
    lng: 85.522,
    weight: 5,
    tone: "east",
    neighbors: ["suryabinayak"],
  },
  {
    id: "tripureshwor",
    name: "Tripureshwor",
    nepali: "त्रिपुरेश्वर",
    lat: 27.695,
    lng: 85.315,
    weight: 5,
    tone: "core",
    neighbors: ["ratnapark", "kalanki", "jawalakhel"],
  },
  {
    id: "kalanki",
    name: "Kalanki",
    nepali: "कलंकी",
    lat: 27.693,
    lng: 85.281,
    weight: 8,
    tone: "west",
    neighbors: ["sorhakhutte", "tripureshwor", "thankot", "kirtipur"],
  },
  {
    id: "thankot",
    name: "Thankot",
    nepali: "थानकोट",
    lat: 27.688,
    lng: 85.213,
    weight: 4,
    tone: "west",
    neighbors: ["kalanki"],
  },
  {
    id: "kirtipur",
    name: "Kirtipur",
    nepali: "कीर्तिपुर",
    lat: 27.678,
    lng: 85.284,
    weight: 5,
    tone: "west",
    neighbors: ["kalanki", "balkhu"],
  },
  {
    id: "balkhu",
    name: "Balkhu",
    nepali: "बल्खु",
    lat: 27.682,
    lng: 85.299,
    weight: 5,
    tone: "west",
    neighbors: ["kirtipur", "jawalakhel", "tripureshwor"],
  },
  {
    id: "jawalakhel",
    name: "Jawalakhel",
    nepali: "जावलाखेल",
    lat: 27.673,
    lng: 85.318,
    weight: 6,
    tone: "south",
    neighbors: ["balkhu", "lagankhel", "tripureshwor"],
  },
  {
    id: "lagankhel",
    name: "Lagankhel",
    nepali: "लगनखेल",
    lat: 27.666,
    lng: 85.323,
    weight: 7,
    tone: "south",
    neighbors: ["jawalakhel", "satdobato", "gwarko"],
  },
  {
    id: "satdobato",
    name: "Satdobato",
    nepali: "सातदोबाटो",
    lat: 27.655,
    lng: 85.324,
    weight: 6,
    tone: "south",
    neighbors: ["lagankhel", "gwarko", "bhaisepati"],
  },
  {
    id: "gwarko",
    name: "Gwarko",
    nepali: "ग्वार्को",
    lat: 27.666,
    lng: 85.341,
    weight: 5,
    tone: "south",
    neighbors: ["satdobato", "lagankhel", "koteshwor"],
  },
  {
    id: "bhaisepati",
    name: "Bhaisepati",
    nepali: "भैंसेपाटी",
    lat: 27.64,
    lng: 85.303,
    weight: 3,
    tone: "south",
    neighbors: ["satdobato"],
  },
];

const routes: BusRoute[] = [
  {
    id: "r-kalanki-bhaktapur",
    name: "Kalanki - Ratna Park - Koteshwor - Bhaktapur",
    service: "Ring-road east connector",
    cadence: "4-7 min",
    tone: "#1e4e42",
    stops: ["kalanki", "tripureshwor", "ratnapark", "newbaneshwor", "koteshwor", "thimi", "bhaktapur"],
  },
  {
    id: "r-gongabu-banepa",
    name: "Gongabu - Chabahil - Koteshwor - Banepa",
    service: "North terminal to Araniko Highway",
    cadence: "8-12 min",
    tone: "#315f7b",
    stops: ["gongabu", "maharajgunj", "chabahil", "gaushala", "sinamangal", "koteshwor", "suryabinayak", "banepa"],
  },
  {
    id: "r-ratnapark-lagankhel",
    name: "Ratna Park - Tripureshwor - Jawalakhel - Lagankhel",
    service: "Core to Lalitpur spine",
    cadence: "3-5 min",
    tone: "#9a6a25",
    stops: ["ratnapark", "tripureshwor", "jawalakhel", "lagankhel", "satdobato"],
  },
  {
    id: "r-thankot-chabahil",
    name: "Thankot - Kalanki - Jamal - Chabahil",
    service: "West gate to Pashupati corridor",
    cadence: "7-10 min",
    tone: "#7c4e57",
    stops: ["thankot", "kalanki", "sorhakhutte", "jamal", "lazimpat", "naxal", "chabahil"],
  },
  {
    id: "r-jamalkoteshwor-sankhu",
    name: "Jamal - New Baneshwor - Koteshwor - Sankhu",
    service: "Central city to north-east edge",
    cadence: "10-15 min",
    tone: "#3f6651",
    stops: ["jamal", "putalisadak", "newbaneshwor", "koteshwor", "thimi", "bhaktapur", "sankhu"],
  },
  {
    id: "r-kirtipur-airport",
    name: "Kirtipur - Balkhu - Tripureshwor - Gaushala",
    service: "South-west to airport corridor",
    cadence: "6-9 min",
    tone: "#5f5f8b",
    stops: ["kirtipur", "balkhu", "tripureshwor", "ratnapark", "putalisadak", "gaushala", "sinamangal"],
  },
];

const placeById = new Map(places.map((place) => [place.id, place]));

function projectPlace(place: Place) {
  const rawX = ((place.lng - valleyBounds.minLng) / (valleyBounds.maxLng - valleyBounds.minLng)) * 100;
  const rawY = ((valleyBounds.maxLat - place.lat) / (valleyBounds.maxLat - valleyBounds.minLat)) * 100;
  const nudge = layoutNudges[place.id] ?? { x: 0, y: 0 };
  const x = 50 + (rawX - 50) * 1.08 + nudge.x;
  const y = 50 + (rawY - 50) * 1.04 + nudge.y;
  return {
    x: clamp(x, 4, 96),
    y: clamp(y, 4, 96),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function scoreRoute(route: BusRoute, currentId: string, destinationId: string) {
  const currentIndex = route.stops.indexOf(currentId);
  const destinationIndex = route.stops.indexOf(destinationId);
  const touchesCurrent = currentIndex >= 0;
  const touchesDestination = destinationIndex >= 0;
  const direct = touchesCurrent && touchesDestination;
  const orderedDirect = direct && currentIndex < destinationIndex;
  const nearbyStops = route.stops.filter((stop) => {
    const current = placeById.get(currentId);
    const destination = placeById.get(destinationId);
    return current?.neighbors.includes(stop) || destination?.neighbors.includes(stop);
  }).length;

  return {
    direct,
    orderedDirect,
    score: Number(orderedDirect) * 80 + Number(direct) * 30 + Number(touchesCurrent) * 18 + Number(touchesDestination) * 18 + nearbyStops * 6,
  };
}

function bestRouteIdFor(currentId: string, destinationId: string) {
  return routes
    .map((route) => ({
      routeId: route.id,
      match: scoreRoute(route, currentId, destinationId),
    }))
    .sort((a, b) => b.match.score - a.match.score)[0].routeId;
}

function shapeFor(place: Place) {
  const projected = projectPlace(place);
  const centerDistance = Math.hypot(projected.x - 50, projected.y - 50) / 70;
  const size = clamp(46 + place.weight * 6 - centerDistance * 20, 42, 96);
  const density = clamp(place.neighbors.length, 2, 5);

  return {
    "--x": `${projected.x}%`,
    "--y": `${projected.y}%`,
    "--size": `${size}px`,
    "--delay": `${(projected.x + projected.y) * -0.026}s`,
    "--radius": `${36 + density * 4}% ${54 - density * 2}% ${42 + place.weight}% ${50 - density}%`,
  } as React.CSSProperties;
}

function selectorLabel(mode: SelectorMode) {
  return mode === "current" ? "Current location" : "Final destination";
}

export function RouteSelectorPrototype() {
  const [activeMode, setActiveMode] = useState<SelectorMode>("destination");
  const [currentId, setCurrentId] = useState("putalisadak");
  const [destinationId, setDestinationId] = useState("bhaktapur");
  const [selectedRouteIds, setSelectedRouteIds] = useState<string[]>(["r-jamalkoteshwor-sankhu"]);
  const [cloudOffset, setCloudOffset] = useState({ x: 0, y: 0 });

  const currentPlace = placeById.get(currentId) ?? places[0];
  const destinationPlace = placeById.get(destinationId) ?? places[1];

  const routeMatches = useMemo(
    () =>
      routes
        .map((route) => ({
          route,
          match: scoreRoute(route, currentId, destinationId),
        }))
        .sort((a, b) => b.match.score - a.match.score),
    [currentId, destinationId],
  );

  function choosePlace(placeId: string) {
    if (activeMode === "current") {
      setSelectedRouteIds([bestRouteIdFor(placeId, destinationId)]);
      setCurrentId(placeId);
      setActiveMode("destination");
      return;
    }

    setSelectedRouteIds([bestRouteIdFor(currentId, placeId)]);
    setDestinationId(placeId);
  }

  function toggleRoute(routeId: string) {
    setSelectedRouteIds((selectedIds) =>
      selectedIds.includes(routeId)
        ? selectedIds.filter((id) => id !== routeId)
        : [...selectedIds, routeId],
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.kicker}>
            <Sparkles size={16} />
            Kathmandu route selection system
          </p>
          <h1>Pick places from a living map of words, then choose the routes that actually overlap.</h1>
          <p>
            The cloud is spatial: every label is projected from approximate valley coordinates, and its
            neighbors are the places that touch it in real life. Edge words shrink and drift inward on
            pointer movement so the selector feels like a navigable Apple Watch-style surface.
          </p>
        </div>

        <div className={styles.summaryPanel} aria-label="Current selection summary">
          <div>
            <span>From</span>
            <strong>{currentPlace.name}</strong>
            <small>{currentPlace.nepali}</small>
          </div>
          <Route size={22} />
          <div>
            <span>To</span>
            <strong>{destinationPlace.name}</strong>
            <small>{destinationPlace.nepali}</small>
          </div>
        </div>
      </section>

      <section className={styles.selectorShell} aria-labelledby="route-selector-heading">
        <div className={styles.selectorHeader}>
          <div>
            <p className={styles.kicker}>
              <MousePointer2 size={15} />
              Part 1
            </p>
            <h2 id="route-selector-heading">Current location and final destination</h2>
          </div>
          <button
            className={styles.gpsButton}
            type="button"
            onClick={() => {
              setCurrentId("putalisadak");
              setSelectedRouteIds([bestRouteIdFor("putalisadak", destinationId)]);
            }}
          >
            <LocateFixed size={16} />
            Use GPS estimate
          </button>
        </div>

        <div className={styles.fieldGrid} role="tablist" aria-label="Choose which field the word cloud controls">
          {(["current", "destination"] as SelectorMode[]).map((mode) => {
            const place = mode === "current" ? currentPlace : destinationPlace;
            const active = activeMode === mode;
            return (
              <button
                key={mode}
                type="button"
                className={`${styles.fieldCard} ${active ? styles.activeField : ""}`}
                onClick={() => setActiveMode(mode)}
                role="tab"
                aria-selected={active}
              >
                <span>{selectorLabel(mode)}</span>
                <strong>{place.name}</strong>
                <small>{mode === "current" ? "GPS default, editable" : "Tap a place in the cloud"}</small>
              </button>
            );
          })}
        </div>

        <div
          className={styles.cloudViewport}
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const dx = (event.clientX - rect.left) / rect.width - 0.5;
            const dy = (event.clientY - rect.top) / rect.height - 0.5;
            setCloudOffset({
              x: clamp(dx * -46, -26, 26),
              y: clamp(dy * -38, -22, 22),
            });
          }}
          onPointerLeave={() => setCloudOffset({ x: 0, y: 0 })}
        >
          <motion.div
            className={styles.cloudCanvas}
            animate={{ x: cloudOffset.x, y: cloudOffset.y }}
            transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.7 }}
          >
            <svg className={styles.neighborLines} viewBox="0 0 100 100" aria-hidden="true">
              {places.flatMap((place) =>
                place.neighbors
                  .filter((neighborId) => place.id < neighborId)
                  .map((neighborId) => {
                    const neighbor = placeById.get(neighborId);
                    if (!neighbor) return null;
                    const start = projectPlace(place);
                    const end = projectPlace(neighbor);
                    return (
                      <line
                        key={`${place.id}-${neighborId}`}
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                      />
                    );
                  }),
              )}
            </svg>

            {places.map((place) => {
              const selected = currentId === place.id || destinationId === place.id;
              const selectedAs = currentId === place.id ? "From" : destinationId === place.id ? "To" : "";
              return (
                <motion.button
                  key={place.id}
                  type="button"
                  className={`${styles.cloudCell} ${styles[place.tone]} ${selected ? styles.selectedCell : ""}`}
                  style={shapeFor(place)}
                  onClick={() => choosePlace(place.id)}
                  aria-pressed={selected}
                  aria-label={`${place.name}, ${place.nepali}. Select as ${selectorLabel(activeMode)}.`}
                  whileTap={{ scale: 0.94 }}
                  layout
                >
                  {selectedAs && <span className={styles.cellBadge}>{selectedAs}</span>}
                  <strong>{place.name}</strong>
                  <small>{place.nepali}</small>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className={styles.routesShell} aria-labelledby="routes-heading">
        <div className={styles.selectorHeader}>
          <div>
            <p className={styles.kicker}>
              <BusFront size={15} />
              Part 2
            </p>
            <h2 id="routes-heading">Route selector</h2>
          </div>
          <span className={styles.routeCount}>{selectedRouteIds.length} selected</span>
        </div>

        <div className={styles.routeGrid}>
          {routeMatches.map(({ route, match }) => {
            const selected = selectedRouteIds.includes(route.id);
            return (
              <button
                key={route.id}
                type="button"
                className={`${styles.routeCard} ${selected ? styles.selectedRoute : ""}`}
                onClick={() => toggleRoute(route.id)}
                aria-pressed={selected}
              >
                <span className={styles.routeStripe} style={{ background: route.tone }} />
                <span className={styles.routeTopline}>
                  <span>{match.orderedDirect ? "Direct match" : match.direct ? "Reverse/direct corridor" : "Nearby overlap"}</span>
                  <span>{route.cadence}</span>
                </span>
                <strong>{route.name}</strong>
                <small>{route.service}</small>
                <span className={styles.stopPills}>
                  {route.stops.slice(0, 5).map((stopId) => (
                    <span key={stopId}>{placeById.get(stopId)?.name}</span>
                  ))}
                </span>
                <AnimatePresence initial={false}>
                  {selected && (
                    <motion.span
                      className={styles.checkMark}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <Check size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.mechanism}>
        <MapPin size={18} />
        <p>
          Mechanism: normalize latitude and longitude into a 0-100 canvas, connect manually curated real
          neighbors, size each word by stop importance, and reduce edge scale by distance from center. A
          production version can replace the curated neighbor list with a Voronoi/Delaunay graph generated
          from verified stop coordinates.
        </p>
      </section>
    </main>
  );
}
