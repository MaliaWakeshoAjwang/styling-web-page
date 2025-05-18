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

    <div className="flex-1 p-6 bg-gray-50 rounded-xl shadow min-w-[300px]">

      <h2 className="font-bold text-lg mb-4 capitalize">{themeName} mode theme</h2>

      {
        Object.entries(theme).map(
          ([groupName, colors]) => (
            <ColorGroup
              key={groupName}
              groupName={groupName}
              colors={colors}
              onUpdate={(i, hex) => onUpdate(groupName, i, hex)}
            />
          )
        )
      }

    </div>

  );

}


export default function ColorPalette(){

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
    
    <div className="flex gap-8 flex-wrap">

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

  );

}
