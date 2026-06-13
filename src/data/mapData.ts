export interface GeofenceZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number; // meters
}

export interface RouteData {
  code: "Route A" | "Route B" | "Route C";
  name: string;
  color: string;
  waypoints: [number, number][];
}

export interface Bus {
  id: number;
  lat: number;
  lng: number;
  speed: number; // in km/h
  routeCode: "Route A" | "Route B" | "Route C";
  ignition: "ON" | "OFF";
  status: "On Time" | "Delayed" | "Overspeeding";
  waypointIndex: number;
  direction: 1 | -1; // 1 = forward, -1 = reverse
  heading: number;
  history: [number, number][];
  geofence: {
    zoneId: string;
    inside: boolean;
  };
  // Real-world Fleet Attributes
  driverStatus: "Active" | "Resting";
  occupancy: string;
  safetyScore: string;
  routeDuration: string;
  currentLocationName: string;
}

export interface Station {
  name: string;
  lat: number;
  lng: number;
}

// 12 Stations in Kathmandu Valley
export const stations: Station[] = [
  { name: "Kathmandu Bus Park", lat: 27.7172, lng: 85.3240 },
  { name: "Thamel Bus Stop", lat: 27.7234, lng: 85.3245 },
  { name: "Bhaktapur Square", lat: 27.6724, lng: 85.4294 },
  { name: "Patan Durbar Square", lat: 27.6742, lng: 85.3129 },
  { name: "Changunarayan Temple", lat: 27.7544, lng: 85.4274 },
  { name: "Pashupatinath", lat: 27.7304, lng: 85.3372 },
  { name: "Bodhnath Stupa", lat: 27.7209, lng: 85.3636 },
  { name: "Baneswor", lat: 27.7145, lng: 85.3356 },
  { name: "Thapathali", lat: 27.6890, lng: 85.3076 },
  { name: "Lainchaur", lat: 27.7256, lng: 85.3489 },
  { name: "Gaushala", lat: 27.7356, lng: 85.3287 },
  { name: "Maharajgunj", lat: 27.7412, lng: 85.3234 }
];

// Geofence Zones
export const geofenceZones: GeofenceZone[] = [
  { id: "GF-01", name: "Central Kathmandu Zone", lat: 27.7150, lng: 85.3250, radius: 1500 },
  { id: "GF-02", name: "Bhaktapur Buffer Zone", lat: 27.6780, lng: 85.3900, radius: 2500 },
  { id: "GF-03", name: "Ring Road North Boundary", lat: 27.7350, lng: 85.3400, radius: 1800 }
];

// Route Waypoint Coordinates (Realistic Kathmandu Valley paths)
export const routes: RouteData[] = [
  {
    code: "Route A",
    name: "Kathmandu-Bhaktapur Line",
    color: "#3B82F6", // Blue
    waypoints: [
      [27.7050, 85.3150], // Ratnapark (Start)
      [27.7145, 85.3356], // Baneshwor
      [27.6830, 85.3420], // Koteshwor
      [27.6790, 85.3550], // Jadibuti
      [27.6730, 85.4050], // Thimi
      [27.6724, 85.4294]  // Bhaktapur Square (End)
    ]
  },
  {
    code: "Route B",
    name: "Ring Road & North Loop",
    color: "#FF6B35", // Orange
    waypoints: [
      [27.7256, 85.3489], // Lainchaur (Start)
      [27.7234, 85.3245], // Thamel
      [27.7412, 85.3234], // Maharajgunj
      [27.7320, 85.3050], // New Bus Park
      [27.7300, 85.3120], // Gongabu
      [27.7380, 85.3600], // Chabahil
      [27.7209, 85.3636], // Bodhnath Stupa
      [27.7544, 85.4274]  // Changunarayan Temple (End)
    ]
  },
  {
    code: "Route C",
    name: "Lalitpur & Pokhara Exit Corridor",
    color: "#10B981", // Emerald Green
    waypoints: [
      [27.7172, 85.3240], // Kathmandu Bus Park (Start)
      [27.7120, 85.2950], // Kalanki
      [27.6850, 85.2900], // Balkhu
      [27.6780, 85.2770], // Kirtipur
      [27.6680, 85.3220], // Lagankhel
      [27.6580, 85.3250], // Satdobato
      [27.6980, 85.3590], // Airport Area
      [27.6880, 85.2600]  // Thankot (Exit)
    ]
  }
];

// Spaced-out initialized list of 15 buses in 15 distinct areas of Kathmandu Valley
export const initialBuses: Bus[] = [
  // Route A Corridor Buses (1 to 5)
  { id: 1, lat: 27.7050, lng: 85.3150, speed: 42, routeCode: "Route A", ignition: "ON", status: "On Time", waypointIndex: 0, direction: 1, heading: 90, history: [], geofence: { zoneId: "GF-01", inside: true }, driverStatus: "Active", occupancy: "45%", safetyScore: "96/100", routeDuration: "35 mins", currentLocationName: "Ratnapark" },
  { id: 2, lat: 27.6830, lng: 85.3420, speed: 48, routeCode: "Route A", ignition: "ON", status: "On Time", waypointIndex: 2, direction: 1, heading: 110, history: [], geofence: { zoneId: "GF-01", inside: true }, driverStatus: "Active", occupancy: "60%", safetyScore: "94/100", routeDuration: "35 mins", currentLocationName: "Koteshwor" },
  { id: 3, lat: 27.7145, lng: 85.3356, speed: 72, routeCode: "Route A", ignition: "ON", status: "Delayed", waypointIndex: 1, direction: 1, heading: 45, history: [], geofence: { zoneId: "GF-01", inside: true }, driverStatus: "Active", occupancy: "85%", safetyScore: "82/100", routeDuration: "35 mins", currentLocationName: "Baneshwor" }, // Warning
  { id: 4, lat: 27.6730, lng: 85.4050, speed: 40, routeCode: "Route A", ignition: "ON", status: "On Time", waypointIndex: 4, direction: 1, heading: 120, history: [], geofence: { zoneId: "GF-02", inside: true }, driverStatus: "Active", occupancy: "30%", safetyScore: "98/100", routeDuration: "35 mins", currentLocationName: "Thimi" },
  { id: 5, lat: 27.6790, lng: 85.3550, speed: 38, routeCode: "Route A", ignition: "ON", status: "On Time", waypointIndex: 3, direction: -1, heading: 270, history: [], geofence: { zoneId: "GF-02", inside: true }, driverStatus: "Active", occupancy: "50%", safetyScore: "95/100", routeDuration: "35 mins", currentLocationName: "Jadibuti" },

  // Route B Corridor Buses (6 to 10)
  { id: 6, lat: 27.6680, lng: 85.3220, speed: 35, routeCode: "Route B", ignition: "ON", status: "On Time", waypointIndex: 0, direction: 1, heading: 0, history: [], geofence: { zoneId: "GF-01", inside: true }, driverStatus: "Active", occupancy: "40%", safetyScore: "97/100", routeDuration: "40 mins", currentLocationName: "Lagankhel" },
  { id: 7, lat: 27.7380, lng: 85.3600, speed: 68, routeCode: "Route B", ignition: "ON", status: "Delayed", waypointIndex: 5, direction: 1, heading: 15, history: [], geofence: { zoneId: "GF-03", inside: true }, driverStatus: "Active", occupancy: "75%", safetyScore: "85/100", routeDuration: "40 mins", currentLocationName: "Chabahil" }, // Warning
  { id: 8, lat: 27.6850, lng: 85.2900, speed: 0, routeCode: "Route B", ignition: "OFF", status: "Delayed", waypointIndex: 2, direction: 1, heading: 0, history: [], geofence: { zoneId: "GF-03", inside: true }, driverStatus: "Resting", occupancy: "0%", safetyScore: "99/100", routeDuration: "40 mins", currentLocationName: "Balkhu" }, // Off
  { id: 9, lat: 27.7300, lng: 85.3120, speed: 52, routeCode: "Route B", ignition: "ON", status: "On Time", waypointIndex: 4, direction: 1, heading: 290, history: [], geofence: { zoneId: "GF-03", inside: true }, driverStatus: "Active", occupancy: "55%", safetyScore: "93/100", routeDuration: "40 mins", currentLocationName: "Gongabu" },
  { id: 10, lat: 27.7320, lng: 85.3050, speed: 40, routeCode: "Route B", ignition: "ON", status: "On Time", waypointIndex: 3, direction: -1, heading: 180, history: [], geofence: { zoneId: "GF-03", inside: true }, driverStatus: "Active", occupancy: "65%", safetyScore: "96/100", routeDuration: "40 mins", currentLocationName: "New Bus Park" },

  // Route C Corridor Buses (11 to 15)
  { id: 11, lat: 27.6724, lng: 85.4294, speed: 115, routeCode: "Route B", ignition: "ON", status: "Overspeeding", waypointIndex: 7, direction: -1, heading: 240, history: [], geofence: { zoneId: "GF-02", inside: false }, driverStatus: "Active", occupancy: "90%", safetyScore: "62/100", routeDuration: "40 mins", currentLocationName: "Bhaktapur" }, // Overspeeding/Geofence violation
  { id: 12, lat: 27.7120, lng: 85.2950, speed: 45, routeCode: "Route C", ignition: "ON", status: "On Time", waypointIndex: 1, direction: 1, heading: 180, history: [], geofence: { zoneId: "GF-01", inside: true }, driverStatus: "Active", occupancy: "52%", safetyScore: "94/100", routeDuration: "45 mins", currentLocationName: "Kalanki" },
  { id: 13, lat: 27.6580, lng: 85.3250, speed: 48, routeCode: "Route C", ignition: "ON", status: "On Time", waypointIndex: 5, direction: 1, heading: 90, history: [], geofence: { zoneId: "GF-01", inside: true }, driverStatus: "Active", occupancy: "60%", safetyScore: "95/100", routeDuration: "45 mins", currentLocationName: "Satdobato" },
  { id: 14, lat: 27.6980, lng: 85.3590, speed: 41, routeCode: "Route C", ignition: "ON", status: "On Time", waypointIndex: 6, direction: 1, heading: 45, history: [], geofence: { zoneId: "GF-01", inside: true }, driverStatus: "Active", occupancy: "35%", safetyScore: "98/100", routeDuration: "45 mins", currentLocationName: "Airport Area" },
  { id: 15, lat: 27.6780, lng: 85.2770, speed: 47, routeCode: "Route C", ignition: "ON", status: "On Time", waypointIndex: 3, direction: -1, heading: 270, history: [], geofence: { zoneId: "GF-01", inside: false }, driverStatus: "Active", occupancy: "70%", safetyScore: "89/100", routeDuration: "45 mins", currentLocationName: "Kirtipur" } // Geofence breach
];
