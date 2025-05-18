import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import ColorPalette from "./colors/ColorPalette";
import TypographyTable from "./typography/TypographyTable";
import InfoTab from "./info/InfoPage";
import DemoPage from "./demo/DemoPage";
import { palette as defaultPalette } from "./colors/palette";
import { getAllColorsFromPalette } from "./colors/colorUtils";
import { FONT_FAMILIES } from "./typography/typographyData";


function App() {
  const [palette, setPalette] = useState(defaultPalette);

  // Dynamically generate all colors for dropdowns
  const colorOptions = getAllColorsFromPalette(palette);
  const colorOrder = [
    "utility - primary text",
    "utility - secondary text",
    "brand - primary",
    "brand - secondary",
    "brand - tertiary",
    "brand - alternate",
    "accent - accent 1",
    "accent - accent 2",
    "accent - accent 3",
    "accent - accent 4",
    "semantic - success",
    "semantic - error",
    "semantic - warning",
    "semantic - info",
    "utility - primary bg",
    "utility - secondary bg",
  ];
  const orderedColorOptions = colorOptions.slice().sort((a, b) => {
    const ai = colorOrder.indexOf(a.label);
    const bi = colorOrder.indexOf(b.label);

    // Not found labels go at the end
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  // ...your font states and handlers
  const [primaryFont, setPrimaryFont] = useState(FONT_FAMILIES[0].value);
  const [secondaryFont, setSecondaryFont] = useState(FONT_FAMILIES[1].value);

  const [googleFontsList, setGoogleFontsList] = useState([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${import.meta.env.VITE_GOOGLE_FONTS_API_KEY}`)
      .then(res => res.json())
      .then(data => setGoogleFontsList(data.items || []));
  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-2xl font-bold mb-8">Styling Web Page Helper</h1>

      <Tabs
        tabs={
          [
            { label: "Info", content: <InfoTab /> },
            { label: "Colors", content: <ColorPalette palette={palette} setPalette={setPalette} /> },
            { label: "Typography", content: <TypographyTable
              colorOptions={orderedColorOptions}
              primaryFont={primaryFont}
              setPrimaryFont={setPrimaryFont}
              secondaryFont={secondaryFont}
              setSecondaryFont={setSecondaryFont}
              googleFontsList={googleFontsList}
            /> },
            { label: "Demo", content: <DemoPage /> },
          ]
        }
      />

    </div>

  );
}

export default App;