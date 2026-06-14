"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BusFront, Check, LocateFixed } from "lucide-react";
import { type CSSProperties, useMemo, useState } from "react";
import styles from "./route-selector.module.css";

type SelectorMode = "from" | "to";
type TileShape = "rect" | "stepNE" | "stepNW" | "stepSE" | "stepSW" | "notch";
type TileSize = "compact" | "standard" | "wide" | "hub";

type Place = {
  id: string;
  name: string;
  nepali: string;
  x: number;
  y: number;
  neighbors: string[];
};

type BusRoute = {
  id: string;
  name: string;
  cadence: string;
  stops: string[];
};

const places: Place[] = [
  { id: "gongabu", name: "Gongabu", nepali: "गोंगबु", x: 145, y: 34, neighbors: ["balaju", "samakhusi", "maharajgunj"] },
  { id: "maharajgunj", name: "Maharajgunj", nepali: "महाराजगन्ज", x: 270, y: 34, neighbors: ["gongabu", "chabahil", "lazimpat"] },
  { id: "bouddha", name: "Bouddha", nepali: "बौद्ध", x: 455, y: 34, neighbors: ["chabahil", "jorpati"] },
  { id: "balaju", name: "Balaju", nepali: "बालाजु", x: 24, y: 92, neighbors: ["gongabu", "samakhusi", "sorhakhutte"] },
  { id: "samakhusi", name: "Samakhusi", nepali: "सामाखुसी", x: 142, y: 92, neighbors: ["gongabu", "balaju", "lazimpat"] },
  { id: "lazimpat", name: "Lazimpat", nepali: "लाजिम्पाट", x: 270, y: 92, neighbors: ["samakhusi", "maharajgunj", "jamal", "naxal"] },
  { id: "chabahil", name: "Chabahil", nepali: "चाबहिल", x: 410, y: 92, neighbors: ["maharajgunj", "naxal", "gaushala", "bouddha"] },
  { id: "jorpati", name: "Jorpati", nepali: "जोरपाटी", x: 548, y: 92, neighbors: ["bouddha", "sankhu"] },
  { id: "sorhakhutte", name: "Sorhakhutte", nepali: "सोह्रखुट्टे", x: 36, y: 150, neighbors: ["balaju", "jamal", "kalanki"] },
  { id: "jamal", name: "Jamal", nepali: "जमल", x: 186, y: 150, neighbors: ["sorhakhutte", "lazimpat", "ratnapark"] },
  { id: "naxal", name: "Naxal", nepali: "नक्साल", x: 286, y: 150, neighbors: ["lazimpat", "putalisadak", "chabahil"] },
  { id: "gaushala", name: "Gaushala", nepali: "गौशाला", x: 386, y: 150, neighbors: ["chabahil", "sinamangal", "newbaneshwor"] },
  { id: "sankhu", name: "Sankhu", nepali: "साँखु", x: 520, y: 150, neighbors: ["jorpati", "bhaktapur"] },
  { id: "ratnapark", name: "Ratna Park", nepali: "रत्नपार्क", x: 116, y: 208, neighbors: ["jamal", "putalisadak", "tripureshwor", "newbaneshwor"] },
  { id: "putalisadak", name: "Putalisadak", nepali: "पुतलीसडक", x: 262, y: 208, neighbors: ["ratnapark", "naxal", "newbaneshwor"] },
  { id: "sinamangal", name: "Sinamangal", nepali: "सिनामंगल", x: 426, y: 208, neighbors: ["gaushala", "koteshwor"] },
  { id: "kalanki", name: "Kalanki", nepali: "कलंकी", x: 16, y: 266, neighbors: ["sorhakhutte", "tripureshwor", "kirtipur"] },
  { id: "tripureshwor", name: "Tripureshwor", nepali: "त्रिपुरेश्वर", x: 136, y: 266, neighbors: ["ratnapark", "kalanki", "jawalakhel"] },
  { id: "newbaneshwor", name: "New Baneshwor", nepali: "नयाँ बानेश्वर", x: 290, y: 266, neighbors: ["ratnapark", "putalisadak", "gaushala", "koteshwor"] },
  { id: "thimi", name: "Thimi", nepali: "ठिमी", x: 448, y: 266, neighbors: ["koteshwor", "bhaktapur"] },
  { id: "kirtipur", name: "Kirtipur", nepali: "कीर्तिपुर", x: 30, y: 324, neighbors: ["kalanki", "jawalakhel"] },
  { id: "jawalakhel", name: "Jawalakhel", nepali: "जावलाखेल", x: 150, y: 324, neighbors: ["tripureshwor", "lagankhel", "kirtipur"] },
  { id: "lagankhel", name: "Lagankhel", nepali: "लगनखेल", x: 288, y: 324, neighbors: ["jawalakhel", "satdobato", "koteshwor"] },
  { id: "koteshwor", name: "Koteshwor", nepali: "कोटेश्वर", x: 430, y: 324, neighbors: ["newbaneshwor", "lagankhel", "thimi"] },
  { id: "bhaktapur", name: "Bhaktapur", nepali: "भक्तपुर", x: 570, y: 324, neighbors: ["thimi", "sankhu", "banepa"] },
  { id: "satdobato", name: "Satdobato", nepali: "सातदोबाटो", x: 318, y: 382, neighbors: ["lagankhel"] },
  { id: "banepa", name: "Banepa", nepali: "बनेपा", x: 614, y: 382, neighbors: ["bhaktapur"] },
];

const routes: BusRoute[] = [
  {
    id: "jamal-bhaktapur",
    name: "Jamal - Baneshwor - Koteshwor - Bhaktapur",
    cadence: "10 min",
    stops: ["jamal", "putalisadak", "newbaneshwor", "koteshwor", "thimi", "bhaktapur", "sankhu"],
  },
  {
    id: "kalanki-bhaktapur",
    name: "Kalanki - Ratna Park - Koteshwor - Bhaktapur",
    cadence: "5 min",
    stops: ["kalanki", "tripureshwor", "ratnapark", "newbaneshwor", "koteshwor", "thimi", "bhaktapur"],
  },
  {
    id: "ratnapark-lagankhel",
    name: "Ratna Park - Jawalakhel - Lagankhel",
    cadence: "4 min",
    stops: ["ratnapark", "tripureshwor", "jawalakhel", "lagankhel", "satdobato"],
  },
  {
    id: "gongabu-banepa",
    name: "Gongabu - Chabahil - Koteshwor - Banepa",
    cadence: "12 min",
    stops: ["gongabu", "maharajgunj", "chabahil", "gaushala", "newbaneshwor", "koteshwor", "bhaktapur", "banepa"],
  },
];

const tileSizes: Record<TileSize, { width: number; height: number }> = {
  compact: { width: 82, height: 42 },
  standard: { width: 104, height: 46 },
  wide: { width: 126, height: 46 },
  hub: { width: 138, height: 54 },
};

const mapScale = 0.72;

const placeById = new Map(places.map((place) => [place.id, place]));

function tileMetrics(place: Place, index: number) {
  const letters = place.name.replace(/\s/g, "").length;
  const neighborCount = place.neighbors.length;
  let size: TileSize = "compact";

  if (neighborCount >= 4) size = "hub";
  else if (letters >= 10) size = "wide";
  else if (letters >= 7 || neighborCount >= 3) size = "standard";

  let shape: TileShape = "rect";
  if (neighborCount >= 4) shape = "notch";
  else if (letters >= 10) shape = "stepSE";
  else if (neighborCount === 3) shape = index % 2 === 0 ? "stepNE" : "stepNW";
  else if (neighborCount === 2) shape = index % 2 === 0 ? "rect" : "stepSW";

  return { ...tileSizes[size], size, shape };
}

function routeScore(route: BusRoute, fromId: string, toId: string) {
  const fromIndex = route.stops.indexOf(fromId);
  const toIndex = route.stops.indexOf(toId);
  const direct = fromIndex >= 0 && toIndex >= 0;
  const ordered = direct && fromIndex < toIndex;
  const from = placeById.get(fromId);
  const to = placeById.get(toId);
  const neighborHits = route.stops.filter((stop) => from?.neighbors.includes(stop) || to?.neighbors.includes(stop)).length;

  return Number(ordered) * 100 + Number(direct) * 34 + Number(fromIndex >= 0) * 18 + Number(toIndex >= 0) * 18 + neighborHits * 5;
}

function bestRouteId(fromId: string, toId: string) {
  return routes
    .map((route) => ({ id: route.id, score: routeScore(route, fromId, toId) }))
    .sort((a, b) => b.score - a.score)[0].id;
}

function selectorTitle(mode: SelectorMode) {
  return mode === "from" ? "Current" : "Destination";
}

function mapOffsetFor(place: Place) {
  const index = places.findIndex((item) => item.id === place.id);
  const metrics = tileMetrics(place, Math.max(index, 0));
  const x = 140 - (place.x + metrics.width / 2) * mapScale;
  const y = 136 - (place.y + metrics.height / 2) * mapScale;

  return {
    x: Math.max(-420, Math.min(0, x)),
    y: Math.max(-190, Math.min(0, y)),
  };
}

export function RouteSelectorPrototype() {
  const [openMode, setOpenMode] = useState<SelectorMode | null>(null);
  const [fromId, setFromId] = useState("putalisadak");
  const [toId, setToId] = useState("bhaktapur");
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>(["jamal-bhaktapur"]);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const from = placeById.get(fromId) ?? places[0];
  const to = placeById.get(toId) ?? places[1];
  const activePlace = openMode === "from" ? from : to;
  const mapOffset = mapOffsetFor(activePlace);

  const rankedRoutes = useMemo(
    () =>
      routes
        .map((route) => ({ route, score: routeScore(route, fromId, toId) }))
        .sort((a, b) => b.score - a.score),
    [fromId, toId],
  );

  function selectPlace(placeId: string) {
    if (!openMode) return;

    const nextFrom = openMode === "from" ? placeId : fromId;
    const nextTo = openMode === "to" ? placeId : toId;

    if (openMode === "from") {
      setFromId(placeId);
      setOpenMode("to");
    } else {
      setToId(placeId);
      setOpenMode(null);
    }

    setSelectedRoutes([bestRouteId(nextFrom, nextTo)]);
  }

  function toggleRoute(routeId: string) {
    setSelectedRoutes((current) =>
      current.includes(routeId) ? current.filter((id) => id !== routeId) : [...current, routeId],
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.instrument} aria-labelledby="route-selector-title">
        <header className={styles.topbar}>
          <div>
            <p>Mayur route grid</p>
            <h1 id="route-selector-title">Choose route</h1>
          </div>
          <button
            type="button"
            className={styles.gps}
            onClick={() => {
              setFromId("putalisadak");
              setOpenMode("to");
              setSelectedRoutes([bestRouteId("putalisadak", toId)]);
            }}
          >
            <LocateFixed size={16} />
            GPS
          </button>
        </header>

        <div className={styles.selectorBar} role="tablist" aria-label="Location fields">
          {(["from", "to"] as SelectorMode[]).map((mode) => {
            const place = mode === "from" ? from : to;
            const open = openMode === mode;

            return (
              <div key={mode} className={styles.selectorSlot}>
                <button
                  type="button"
                  className={`${styles.locationPill} ${open ? styles.activePill : ""}`}
                  role="tab"
                  aria-selected={open}
                  aria-expanded={open}
                  onClick={() => setOpenMode((current) => (current === mode ? null : mode))}
                >
                  <span>{selectorTitle(mode)}</span>
                  <strong>{place.name}</strong>
                  <small>{place.nepali}</small>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      className={styles.locationDialog}
                      initial={{ opacity: 0, y: -5, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 340, damping: 30, mass: 0.62 }}
                    >
                      <div className={styles.dialogHandle}>
                        <span>{selectorTitle(mode)}</span>
                        <strong>{place.name}</strong>
                      </div>

                      <div
                        className={styles.cloudWindow}
                        onPointerMove={(event) => {
                          const rect = event.currentTarget.getBoundingClientRect();
                          setPan({
                            x: (event.clientX - rect.left) / rect.width - 0.5,
                            y: (event.clientY - rect.top) / rect.height - 0.5,
                          });
                        }}
                        onPointerLeave={() => setPan({ x: 0, y: 0 })}
                      >
                        <motion.div
                          className={styles.topologyMap}
                          animate={{
                            x: mapOffset.x + pan.x * -58,
                            y: mapOffset.y + pan.y * -42,
                            scale: mapScale + Math.hypot(pan.x, pan.y) * 0.025,
                          }}
                          transition={{ type: "spring", stiffness: 88, damping: 18, mass: 0.72 }}
                        >
                          {places.map((topologyPlace, index) => {
                            const metrics = tileMetrics(topologyPlace, index);
                            const selectedAs =
                              topologyPlace.id === fromId ? "From" : topologyPlace.id === toId ? "To" : "";
                            const style = {
                              "--x": `${topologyPlace.x}px`,
                              "--y": `${topologyPlace.y}px`,
                              "--w": `${metrics.width}px`,
                              "--h": `${metrics.height}px`,
                              "--delay": `${(topologyPlace.x + topologyPlace.y) * -0.01}s`,
                            } as CSSProperties;

                            return (
                              <button
                                key={topologyPlace.id}
                                type="button"
                                className={`${styles.mapTile} ${styles[metrics.shape]} ${selectedAs ? styles.selectedTile : ""}`}
                                style={style}
                                aria-pressed={Boolean(selectedAs)}
                                aria-label={`${topologyPlace.name}, ${topologyPlace.nepali}. Select as ${selectorTitle(mode)}.`}
                                onClick={() => selectPlace(topologyPlace.id)}
                              >
                                {selectedAs && <span>{selectedAs}</span>}
                                <strong>{topologyPlace.name}</strong>
                                <small>{topologyPlace.nepali}</small>
                              </button>
                            );
                          })}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className={styles.routeRail} aria-label="Route selector">
          {rankedRoutes.map(({ route, score }, index) => {
            const selected = selectedRoutes.includes(route.id);
            return (
              <button
                key={route.id}
                type="button"
                className={`${styles.routeChip} ${selected ? styles.selectedRoute : ""}`}
                style={{ "--tone": index } as CSSProperties}
                aria-pressed={selected}
                onClick={() => toggleRoute(route.id)}
              >
                <span className={styles.routeIcon}>
                  {selected ? <Check size={15} /> : <BusFront size={15} />}
                </span>
                <span>
                  <strong>{route.name}</strong>
                  <small>{score > 100 ? "Direct" : "Overlap"} · {route.cadence}</small>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
