# Mayur Yatayat Proposal Site Design

## Goal

Replace the existing fleet dashboard demo with a focused proposal website for Mayur Yatayat decision makers. The site should feel premium and polished, similar in pacing to an iPhone product page, while staying simple enough for a quick business review.

## Audience

The primary audience is Mayur Yatayat operators and owners. They may not want to read long technical explanations. The page must make the offer clear in seconds, then use short bilingual copy and strong visuals to build confidence.

## Core Offer

We will provide the government-ready GPS setup for Mayur buses for free, including the four mandated GPS-related features. We will also build, host, and operate the passenger-facing app ourselves for free. Mayur buses will be available to passengers in the app for free, with the goal of increasing bus visibility and passenger traffic.

The free promise is not only for the beginning or a limited pilot. Setup, hosting, app operation, and Mayur visibility inside the app should be presented as the standing model. State this once clearly, then avoid repeating the same promise in later sections.

Later versions of the app can include more bus routes, making the product more useful for daily riders while preserving Mayur's free visibility.

Because the exact government feature labels still need confirmation, the first implementation will use a clear non-final label: "4 government-required GPS features". The site will not claim specific regulatory wording until those names are confirmed.

## Experience Direction

The site should read as a premium proposal, not a dashboard. It should remove the live Leaflet map, fake telemetry controls, control-room language, and dense operational panels.

The page should use large, confident scroll sections:

1. Opening offer: "Free government-ready GPS setup for Mayur Yatayat."
2. What Mayur gets: GPS setup, required features, passenger app listing, hosting and operation.
3. Why it matters: passengers are more likely to wait for buses they can see.
4. App preview: a polished phone mockup showing buses inside the consumer app.
5. Simple rollout close: start with a few buses, then expand as more routes join the app later.

## Copy Style

Use English and Nepali together. English should be precise for the proposal. Nepali should make the benefit instantly understandable. Keep each section short. Avoid technical clutter, investor jargon, dashboard language, and repeated claims.

## Visual Direction

Use a minimal, Framer-like look: light background, disciplined typography, subtle motion, large whitespace, crisp product surfaces, and restrained color. The design should avoid the current dark-orange dashboard theme and avoid a large map as the hero.

The main product visual should be a phone-style app mockup with a small route surface and moving or listed bus items. This visual exists to show what consumers might see, not to simulate a full tracking system.

## Technical Direction

Use the existing Next.js App Router and Tailwind setup. Replace `src/app/page.tsx` with a mostly static proposal page. Remove imports and state tied to `TrackerMap`, simulated fleet telemetry, and operational playback. Keep dependencies unchanged unless implementation proves a dependency can be safely removed later.

Global CSS should be updated to match the new theme, page motion, and responsive constraints. The site must work on desktop and mobile.

## Verification

Run lint and build after implementation. Restart localhost and verify the page loads. Inspect the page at desktop and mobile widths for overlapping text, awkward scroll sections, and broken app mockup layout.
