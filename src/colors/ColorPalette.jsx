import React from "react";

function ColorGroup({ groupName, colors, onUpdate }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2 capitalize">{groupName}</h3>
      <div className="flex flex-wrap gap-4">
        {colors.map((color, idx) => (
          <div key={color.name} className="flex flex-col items-center">
            <input
              type="color"
              value={color.hex}
              onChange={e => onUpdate(idx, e.target.value)}
              style={{ width: 48, height: 48 }}
            />
            <span className="text-xs mt-2">{color.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThemeSection({ theme, themeName, onUpdate }) {
  return (
    <div className="flex-1 p-6 bg-gray-50 rounded-xl shadow min-w-[300px]">
      <h2 className="font-bold text-lg mb-4 capitalize">{themeName} mode theme</h2>
      {Object.entries(theme).map(([groupName, colors]) => (
        <ColorGroup
          key={groupName}
          groupName={groupName}
          colors={colors}
          onUpdate={(idx, hex) => onUpdate(themeName, groupName, idx, hex)}
        />
      ))}
    </div>
  );
}

export default function ColorPalette({ palette, setPalette }) {
  const updateColor = (themeKey, group, idx, newHex) => {
    setPalette(prev => ({
      ...prev,
      [themeKey]: {
        ...prev[themeKey],
        [group]: prev[themeKey][group].map(
          (color, i) => i === idx ? { ...color, hex: newHex } : color
        )
      }
    }));
  };

  return (
    <div className="flex gap-8 flex-wrap">
      {["light", "dark"].map(themeKey => (
        <ThemeSection
          key={themeKey}
          theme={palette[themeKey]}
          themeName={themeKey}
          onUpdate={updateColor}
        />
      ))}
    </div>
  );
}