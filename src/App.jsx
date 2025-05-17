import React from "react";
import Tabs from "./Tabs";
import ColorPalette from "./ColorPalette";

function InfoTab(){
  return(
    <div>
      <h2 className="text-lg font-bold mb-2">About This Design System</h2>
      <p className="mb-4">Here you can explain what each color and font style is used for in your brand. List usage for primary, secondary, accent colors, headings, body, etc.</p>
      {/* comment */}
    </div>
  )
}

function TypographyTab(){
  return(
    <div>
      <h2 className="text-lg font-bold mb-2">Typography Picker</h2>
      <p className="mb-4">Here you’ll build your font selector, preview, etc.</p>
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
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-8">Styling Web Page Helper</h1>
      <Tabs
        tabs={
          [
            { label: "Info", content: <InfoTab /> },
            { label: "Colors", content: <ColorPalette /> },
            { label: "Typography", content: <TypographyTab /> },
            { label: "Demo", content: <DemoTab /> },
          ]
        }
      />
    </div>
  );
}

export default App;