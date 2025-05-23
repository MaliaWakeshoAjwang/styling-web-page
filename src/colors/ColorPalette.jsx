// import { useState, useEffect } from "react";

// function isValidHex(hex) {
//   return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex.trim());
// }

// function ColorGroup({ groupName, colors, onUpdate }) {
//   // Local state for each color: input value and touched
//   const [inputs, setInputs] = useState(
//     colors.map(c => ({ value: c.hex, touched: false }))
//   );

//   // Keep local state in sync if colors change outside (optional enhancement)
//   useEffect(() => { setInputs(colors.map(c => ({ value: c.hex, touched: false }))); }, [colors]);

//   return (
//     <div className="mb-4">
//       <h3 className="font-semibold mb-2 capitalize">{groupName}</h3>
//       <div className="flex flex-wrap gap-4">
//         {colors.map((color, idx) => {
//           const { value, touched } = inputs[idx];
//           const invalid = touched && !isValidHex(value);

//           return (
//             <div key={color.name} className="flex flex-col items-center min-w-[70px]">
//               {/* Swatch */}
//               <input
//                 type="color"
//                 value={color.hex}
//                 onChange={e => {
//                   const hex = e.target.value;
//                   setInputs(prev => {
//                     const updated = [...prev];
//                     updated[idx] = { value: hex, touched: true };
//                     return updated;
//                   });
//                   onUpdate(idx, hex);
//                 }}
//                 style={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 8,
//                   border: '1px solid #ccc',
//                   boxShadow: '0 1px 3px 0 #0002',
//                   cursor: "pointer",
//                 }}
//               />
//               <span className="text-xs mt-2">{color.name}</span>
//               <input
//                 type="text"
//                 value={value}
//                 maxLength={7}
//                 onChange={e => {
//                   let hex = e.target.value;
//                   if (!hex.startsWith("#")) hex = "#" + hex;
//                   setInputs(prev => {
//                     const updated = [...prev];
//                     updated[idx] = { value: hex, touched: true };
//                     return updated;
//                   });
//                 }}
//                 onBlur={() => {
//                   setInputs(prev => {
//                     const updated = [...prev];
//                     updated[idx] = { ...updated[idx], touched: true };
//                     return updated;
//                   });
//                   // If valid, update parent
//                   if (isValidHex(value)) onUpdate(idx, value);
//                 }}
//                 className="text-xs mt-1 font-mono text-center border rounded px-1 w-[64px] focus:outline-none"
//                 style={{
//                   marginTop: 3,
//                   letterSpacing: 0.5,
//                   background: "#fff",
//                   borderColor: invalid ? "#f44336" : "#ccc",
//                   color: invalid ? "#f44336" : "#555",
//                 }}
//                 spellCheck={false}
//               />
//               {/* Optional: show small error */}
//               {invalid && (
//                 <span className="text-[10px] mt-1 text-red-500">Invalid hex</span>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

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
  const COLOR_GROUP_ORDER = ["brand", "utility", "accent", "semantic"];

  return (
    <div className="flex-1 p-6 bg-gray-50 rounded-xl shadow min-w-[300px]">
      <h2 className="font-bold text-lg mb-4 capitalize">{themeName} mode theme</h2>
      {COLOR_GROUP_ORDER.map(groupName => (
        theme[groupName] && (
          <ColorGroup
            key={groupName}
            groupName={groupName}
            colors={theme[groupName]}
            onUpdate={(idx, hex) => onUpdate(themeName, groupName, idx, hex)}
          />
        )
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