# Mayur Yatayat Proposal Site Design

## Goal

Replace the existing fleet dashboard demo with a focused proposal website for Mayur Yatayat decision makers. The site should feel premium and polished, similar in pacing to an iPhone product page, while staying simple enough for a quick business review.

## Audience

The primary audience is Mayur Yatayat operators and owners. They may not want to read long technical explanations. The page must make the offer clear in seconds, then use short bilingual copy and strong visuals to build confidence.

## Core Offer

We will provide the government-ready GPS setup for Mayur buses for free, including the four mandated GPS-related features. We will also build, host, and operate the passenger-facing app ourselves for free. Mayur buses will be available to passengers in the app for free, with the goal of increasing bus visibility and passenger traffic.

The free promise is not only for the beginning or a limited pilot. Setup, hosting, app operation, and Mayur visibility inside the app should be presented as the standing model. State this once as "Forever free", then avoid repeating the same promise in later sections.

Later versions of the app can include more bus routes, making the product more useful for daily passengers while preserving Mayur's free visibility.

The current brochure should name three GPS features directly: route area monitoring, speed warnings, and live route tracking. Ignition status is intentionally removed from the Mayur-facing pitch.

The offer also includes a monthly data-analysis report for management. The report should make cost control concrete by showing overspeeding, idle minutes, route exits, and route-specific issues. Keep the fuel-saving claim careful: driver feedback can improve fuel economy about 3% on average.

The cost model should be explicit: Mayur does not pay setup or hosting fees because the passenger app can carry small ads to cover operating costs. The brochure should also say that Mahanagar Yatayat is already on board and that more operators can be added later.

## Experience Direction

The site should read as a premium proposal, not a dashboard. It should remove the live Leaflet map, fake telemetry controls, control-room language, and dense operational panels.

The page should use large, confident scroll sections:

1. Opening responsibility: "GPS को झन्झट हामी लिन्छौं।"
2. GPS features: route area monitoring, speed warnings, and live route tracking.
3. Passenger benefit: "यात्रुले एपमा मयुर देख्छन्।"
4. Management report: monthly data analysis with speed, idle, route exit, and fuel-use guidance.
5. Cost and trust: Mahanagar Yatayat proof, small ads cover costs, and Mayur receives the benefit.

## Copy Style

Use Nepali as the default reading experience. English should be available from a single translate button at the top of the page, not shown side-by-side. Keep each section short. Use simple sentences that make responsibility and benefit clear for middle-aged Nepali operators with normal business education. Avoid technical clutter, investor jargon, dashboard language, repeated claims, and CTA buttons.

## Visual Direction

Use a premium Framer-like look: animated light mesh background, disciplined typography, subtle motion, large whitespace, crisp glass product surfaces, and a controlled but more vivid palette. The design should avoid the current dark-orange dashboard theme and avoid a large map as the hero.

Use an Apple UI-like text scale rather than oversized landing-page type: roughly 34px+ for the main large title, 28px+ for section titles, and 15-17px for body copy, with readable line heights.

The main product visual should be a phone-style app mockup with a small route surface and moving or listed bus items. This visual exists to show what consumers might see, not to simulate a full tracking system.

Motion should be tasteful and functional: gentle phone drift, animated route flow, ambient background motion, language-transition polish, and hover movement on cards. Avoid hiding brochure sections until scroll because screenshots and print-like review should show all content clearly.

## Polish Layer

Use Apple-like system typography rather than imported display fonts. The goal is familiar, calm interface polish: tight negative tracking on large titles, readable body copy, and restrained Nepali support text.

Surface detail should be visible but quiet. Use soft paper-like backgrounds, faint grid/noise texture, translucent cards, inset highlights, and realistic phone material. These details should make the site feel built by a technical design team without making it busy.

Movement should explain the product. Each GPS feature card can have a small technical instrument animation: geofence pulse, speed needle, ignition pulse, and route nodes. Avoid moving-dot embellishments inside the phone preview or coverage plan. All animation must remain subtle and must respect reduced-motion settings.

## Technical Direction

Use the existing Next.js App Router and Tailwind setup. Replace `src/app/page.tsx` with a mostly static proposal page. Remove imports and state tied to `TrackerMap`, simulated fleet telemetry, and operational playback. Keep dependencies unchanged unless implementation proves a dependency can be safely removed later.

Global CSS should be updated to match the new theme, page motion, and responsive constraints. The site must work on desktop and mobile.

## Verification

Run lint and build after implementation. Restart localhost and verify the page loads. Inspect the page at desktop and mobile widths for overlapping text, awkward scroll sections, and broken app mockup layout.
