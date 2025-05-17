import React, { useState } from "react";
import { palette as defaultPalette } from "./palette"
import ColorSwatch from "./ColorSwatch";

function ColorGroup({ groupName, colors, onUpdate }){

  return(

    <div className="mb-4">

      <h3 className="font-semibold mb-2 capitalize">{groupName.replace("_", " ")} colors</h3>

      <div className="flex flex-wrap gap-4">

        {
          colors.map(
            (color, idx) => (
              <ColorSwatch
                key={color.name}
                color={color}
                onChange={
                  (newHex) => onUpdate(groupName, idx, newHex)
                }
              />
            )
          )
        }

      </div>

    </div>

  );

}


function ThemeSection({ theme, themeName, onUpdate }){

  return(

    <div className="flex-1 p-6 bg-gray-50 rounded-xl shadow">

      <h2>{themeName} mode theme</h2>

      {
        Object.entries(theme).map(
          ([groupName, colors]) => (
            <ColorGroup
              key={groupName}
              groupName={groupName}
              colors={colors}
              onUpdate={(g, i, hex) => onUpdate(groupName, i, hex)}
            />
          )
        )
      }

    </div>

  );

}


function App(){

  const[palette, setPalette] = useState(defaultPalette);

  const updateColor = (themeKey, group, idx, newHex) => {
    setPalette(
      (prev) => (
        {
          ...prev,
          [themeKey]: {
            ...prev[themeKey],
            [group]: prev[themeKey][group].map(
              (color, i) => i === idx ? { ...color, hex: newHex } : color
            ),
          },
        }
      )
    );
  };

  return(

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-2xl font-bold mb-8">All Colors</h1>

      <div className="flex gap-8">

        {
          ["light", "dark"].map(
            (themeKey) => (
              <ThemeSection
                key={themeKey}
                theme={palette[themeKey]}
                themeName={themeKey}
                onUpdate={(group, idx, hex) => updateColor(themeKey, group, idx, hex)}
              />
            )
          )
        }

      </div>

    </div>

  );

}

export default App;