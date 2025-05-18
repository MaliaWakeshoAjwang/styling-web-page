import React, { useState } from "react";
import Tabs from "./Tabs";
import ColorPalette from "./ColorPalette";
import TypographyTable from "./TypographyTable";
import { palette as defaultPalette } from "./palette";
import { getAllColorsFromPalette } from "./colorUtils";
import { FONT_FAMILIES } from "./typographyData";

function InfoTab(){
  return(
    <div>
      <h2 className="text-lg font-bold mb-2">About This Design System</h2>
      <p className="mb-4">Here you can explain what each color and font style is used for in your brand. List usage for primary, secondary, accent colors, headings, body, etc.</p>
      {/* comment */}
    </div>
  )
}

function DemoTab(){
  return(
    <div>
      <h2 className="text-lg font-bold mb-2">Demo Website Preview</h2>
      <p className="mb-4">See your chosen colors and fonts in action.</p>
      {/* comment */}
    </div>
  )
}


function App() {
  const [palette, setPalette] = useState(defaultPalette);

  // Dynamically generate all colors for dropdowns
  const colorOptions = getAllColorsFromPalette(palette);

  // ...your font states and handlers
  const [primaryFont, setPrimaryFont] = useState(FONT_FAMILIES[0].value);
  const [secondaryFont, setSecondaryFont] = useState(FONT_FAMILIES[1].value);

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-2xl font-bold mb-8">Styling Web Page Helper</h1>

      <Tabs
        tabs={
          [
            { label: "Info", content: <InfoTab /> },
            { label: "Colors", content: <ColorPalette palette={palette} setPalette={setPalette} /> },
            { label: "Typography", content: <TypographyTable
              colorOptions={colorOptions}
              primaryFont={primaryFont}
              setPrimaryFont={setPrimaryFont}
              secondaryFont={secondaryFont}
              setSecondaryFont={setSecondaryFont}
              fontFamilyOptions={FONT_FAMILIES}
            /> },
            { label: "Demo", content: <DemoTab /> },
          ]
        }
      />

    </div>

  );
}

export default App;