// src/demo/DemoPage.jsx
import WebsiteDemoPage from "./WebsiteDemoPage";

export default function DemoPage({ palette, typography }) {
  const primaryFont = typography.primaryFont
  const secondaryFont = typography.secondaryFont

  return (
    <div className="max-w-3xl mx-auto">
      <div>
        {/* Render the selected demo component */}
        {(() => {
          return (
            <WebsiteDemoPage
              palette={palette}
              styles={typography.styles}
              fonts={{ primaryFont, secondaryFont }}
            />
          );
        })()}
      </div>
    </div>
  );
}