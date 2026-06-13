# Mayur Proposal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current fleet dashboard with a premium bilingual proposal page for Mayur Yatayat.

**Architecture:** Use the existing Next.js App Router route at `/`. Make the page mostly static and render the passenger app preview directly in React without Leaflet or simulated operational state. Keep styling in Tailwind utilities plus small global CSS tokens and animations.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, lucide-react, framer-motion if needed.

---

## File Structure

- Modify `src/app/page.tsx`: replace dashboard code with a scroll-led proposal and app mockup.
- Modify `src/app/globals.css`: replace dark dashboard theme with proposal-site tokens, page background, and motion utilities.
- Modify `src/app/layout.tsx`: update metadata for the Mayur proposal.
- Keep `src/components/TrackerMap.tsx`, `src/components/HeroMap.tsx`, `src/components/MobileMockup.tsx`, and data files untouched for now. They are no longer imported by the home page, but deleting them is not required for the proposal build.

## Task 1: Replace Home Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the dashboard with proposal sections**

Implement a server-rendered home page with these internal arrays:

```tsx
const benefits = [
  { title: "Geofencing", nepali: "रुट क्षेत्र निगरानी", body: "Know when a bus leaves its allowed route area." },
  { title: "Overspeed alerts", nepali: "गति चेतावनी", body: "Flag unsafe speed in real time." },
  { title: "Ignition status", nepali: "इग्निसन स्थिति", body: "See when the vehicle is on or off." },
  { title: "Route tracking", nepali: "रुट जानकारी", body: "Show route movement and route information." },
]
```

Use sections for hero, offer, consumer app preview, business value, rollout, and close.

- [ ] **Step 2: Add a compact passenger app mockup**

Render a phone-shaped app preview inside `page.tsx` with a small route surface, three visible Mayur buses, ETAs, and a bottom list. The mockup must be visually polished but not a large map or control-room interface.

- [ ] **Step 3: Remove unused imports**

Ensure `page.tsx` no longer imports `TrackerMap`, map data, or React state hooks. Only import icons that are actually rendered.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/app/page.tsx
git commit -m "feat: replace dashboard with Mayur proposal page"
```

Expected: commit succeeds with only `src/app/page.tsx` staged.

## Task 2: Restyle Global Theme

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace dashboard colors and helpers**

Use a light proposal theme with CSS variables for ink, muted text, surface, line, green, blue, and gold. Remove unused dashboard-only helpers such as Leaflet marker transitions if not used by the new page.

- [ ] **Step 2: Add page motion utilities**

Add small keyframes for slow route pulse, float, and reveal. Keep motion subtle and avoid decorative orb backgrounds.

- [ ] **Step 3: Verify responsive text constraints**

Make sure global body styles prevent horizontal overflow and preserve readable typography on mobile.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/app/globals.css
git commit -m "style: refresh proposal site theme"
```

Expected: commit succeeds with only global CSS staged.

## Task 3: Update Metadata

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update title and description**

Set the metadata title to `Mayur Yatayat GPS Proposal` and the description to `A free government-ready GPS setup and passenger app proposal for Mayur Yatayat.`

- [ ] **Step 2: Commit**

Run:

```bash
git add src/app/layout.tsx
git commit -m "chore: update proposal metadata"
```

Expected: commit succeeds with only layout metadata staged.

## Task 4: Verify and Restart Localhost

**Files:**
- No planned source edits unless verification finds an issue.

- [ ] **Step 1: Run lint**

Run:

```bash
npm run lint
```

Expected: no lint errors.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: build completes successfully.

- [ ] **Step 3: Start localhost**

Run:

```bash
npm run dev
```

Expected: Next.js reports a local URL, usually `http://localhost:3000`.

- [ ] **Step 4: Browser QA**

Open the local site and inspect desktop and mobile widths. Confirm the hero is visible, the app mockup shows buses, no large dashboard map is present, and text does not overlap.

- [ ] **Step 5: Commit fixes if needed**

If QA requires changes, commit them with:

```bash
git add src/app/page.tsx src/app/globals.css src/app/layout.tsx
git commit -m "fix: polish proposal site QA issues"
```

Expected: only source files changed by QA are staged.
