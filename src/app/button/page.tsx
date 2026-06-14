import type { Metadata } from "next";
import { RouteSelectorPrototype } from "./route-selector-prototype";

export const metadata: Metadata = {
  title: "Kathmandu Bus Route Selector Prototype",
  description:
    "A spatial word-cloud route selector concept for overlapping Kathmandu Valley bus routes.",
};

export default function ButtonRoutePage() {
  return <RouteSelectorPrototype />;
}
