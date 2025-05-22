// src/demo/DemoPage.jsx
import { useState } from "react";
// demos
import LandingPageDemo from "./demos/LandingPageDemo";
import CardExampleDemo from "./demos/CardExampleDemo";
import BannerExampleDemo from "./demos/BannerExampleDemo";

const demoPages = [
  { label: "Landing Page", Component: LandingPageDemo },
  { label: "Card Example", Component: CardExampleDemo },
  { label: "Banner Example", Component: BannerExampleDemo },
];

export default function DemoPage({ palette, typography }) {
  const [selected, setSelected] = useState(0);

  // Handle case where data is not ready yet
  const styles = Array.isArray(typography?.styles)
    ? typography.styles
    : typography || [];
  const primaryFont = typography?.primaryFont || "Poppins";
  const secondaryFont = typography?.secondaryFont || "Inter";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex gap-4 mb-8">
        {demoPages.map((page, idx) => (
          <button
            key={page.label}
            onClick={() => setSelected(idx)}
            className={`px-4 py-2 rounded font-semibold transition border ${selected === idx ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-100"}`}
          >
            {page.label}
          </button>
        ))}
      </div>
      <div>
        {/* Render the selected demo component */}
        {(() => {
          const Demo = demoPages[selected].Component;
          return (
            <Demo
              palette={palette}
              styles={styles}
              fonts={{ primaryFont, secondaryFont }}
            />
          );
        })()}
      </div>
    </div>
  );
}