# Kathmandu route selector UI system

## Goal

The `/button` prototype explores a bus route selection flow for Kathmandu Valley where many routes overlap. It has two layers:

1. Current location and final destination selection.
2. Multi-select route choice beneath the location pair.

The main UI invention is a location word cloud: a spatial, elastic surface where each place name sits near its real-world neighbors.

## Mechanism

The prototype uses approximate latitude and longitude for important Kathmandu Valley places. Each place is projected into a 0-100 canvas:

```txt
x = (lng - minLng) / (maxLng - minLng) * 100
y = (maxLat - lat) / (maxLat - minLat) * 100
```

The inverted latitude keeps north visually higher on screen. Each word tile also stores a curated neighbor list. In production, this should be generated from verified stop coordinates by building a Delaunay triangulation and deriving Voronoi adjacency, then pruning edges that cross rivers, highways, or impossible walking transfers.

## Tile sizing

Each word tile receives:

- Geographic position from the projected coordinate.
- A deterministic layout nudge for dense central Kathmandu stops, standing in for a future collision-relaxation pass.
- Size from route/stop importance.
- Slight edge reduction based on distance from the center of the cloud.
- Rounded irregular geometry based on neighbor density.

The edge reduction is intentional. It communicates that the surface can move, and the larger center area is where the user is expected to make precise choices.

## Interaction

- The field cards decide whether the cloud writes into `Current location` or `Final destination`.
- `Use GPS estimate` currently sets the current location to Putalisadak as a stand-in for browser GPS.
- Pointer movement pans the cloud against the cursor direction with a spring transition, pulling edge places closer to the center.
- Clicking a word writes it into the active field.
- Routes are scored by direct coverage, endpoint coverage, and neighbor overlap, then shown as selectable route cards.

## Future production work

- Replace approximate coordinates with GTFS stop data or a maintained stop registry.
- Generate adjacency through Delaunay/Voronoi geometry rather than hand-authored neighbors.
- Add geolocation permission handling and reverse geocoding from GPS to nearest route stop.
- Add route transfer scoring when no single route covers both endpoints.
- Add keyboard search for accessibility and for users who already know their stop name.
