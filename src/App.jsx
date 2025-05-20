import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase";
import LoginPage from "./Auth/LoginPage";
import Tabs from "./Tabs";
import ColorPalette from "./colors/ColorPalette";
import TypographyTable from "./typography/TypographyTable";
import InfoTab from "./info/InfoPage";
import DemoPage from "./demo/DemoPage";
import useAppData from "./hooks/useAppData";
import ProjectsPage from "./projects/ProjectsPage";
import { updateProjectPalette, updateProjectTypography } from "./projects/projectStore";
import { TYPOGRAPHY_STYLES } from "./typography/typographyData";
import { PALETTE_STYLES } from "./colors/colorData";

export default function App() {
  const appData = useAppData();
  const [user, setUser] = useState(undefined);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showProjects, setShowProjects] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [localPalette, setLocalPalette] = useState(PALETTE_STYLES);
  const [localTypography, setLocalTypography] = useState(TYPOGRAPHY_STYLES);
  const [paletteSaveStatus, setPaletteSaveStatus] = useState("");
  const [typographySaveStatus, setTypographySaveStatus] = useState("");

  // Watch for auth changes and project changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  useEffect(() => {
    // Whenever we switch projects, reset local editing state
    if (currentProject) {
      setLocalPalette(currentProject.palette || PALETTE_STYLES);
      setLocalTypography(currentProject.typography || TYPOGRAPHY_STYLES);
      setPaletteSaveStatus("");
      setTypographySaveStatus("");
    }
  }, [currentProject]);

  // Loading spinner
  if (user === undefined)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );

  // Not signed in
  if (!user) return <LoginPage />;

  // Helper to remove undefineds (Firestore doesn't like them)
  function removeUndefined(obj) {
    if (Array.isArray(obj)) {
      return obj.map(removeUndefined);
    } else if (typeof obj === "object" && obj !== null) {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
          result[key] = removeUndefined(value);
        }
      }
      return result;
    }
    return obj;
  }

  // SAVE: Palette
  const handlePaletteUpdate = async (projectId, updatedPalette) => {
    setPaletteSaveStatus("Saving...");
    try {
      setLocalPalette(updatedPalette);
      const safePalette = removeUndefined(updatedPalette);
      await updateProjectPalette(projectId, safePalette);
      setCurrentProject(cp => ({ ...cp, palette: safePalette }));
      setPaletteSaveStatus("Saved!");
    } catch (err) {
      setPaletteSaveStatus("Save failed!");
      console.error("Save error:", err);
    }
  };

  // SAVE: Typography
  const handleTypographyUpdate = async (projectId, updatedTypography) => {
    setTypographySaveStatus("Saving...");
    try {
      setLocalTypography(updatedTypography);
      const safeTypography = removeUndefined(updatedTypography);
      await updateProjectTypography(projectId, safeTypography);
      setCurrentProject(cp => ({ ...cp, typography: safeTypography }));
      setTypographySaveStatus("Saved!");
    } catch (err) {
      setTypographySaveStatus("Save failed!");
      console.error("Save error:", err);
    }
  };

  // Main render
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Styling Web Page Helper</h1>
        <div className="flex gap-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => setShowProjects(show => !show)}
          >
            {showProjects ? "Main Menu" : "My Projects"}
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={() => signOut(auth)}
          >
            Log Out
          </button>
        </div>
      </div>

      {showProjects ? (
        <ProjectsPage
          user={user}
          onEdit={proj => {
            setCurrentProject(proj);
            setShowProjects(false);
          }}
        />
      ) : currentProject ? (
        <>
          <div className="mb-6 text-xl font-semibold text-blue-700">
            Editing Project: <span className="font-bold">{currentProject.name}</span>
          </div>
          <Tabs
            tabs={[
              {
                label: "Info",
                content: <InfoTab />,
              },
              {
                label: "Colors",
                content: (
                  <>
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
                      onClick={() => handlePaletteUpdate(currentProject.id, localPalette)}
                    >
                      Save Colors
                    </button>
                    {paletteSaveStatus && (
                      <span className="ml-4 text-sm text-gray-500">{paletteSaveStatus}</span>
                    )}
                    <ColorPalette
                      palette={localPalette}
                      setPalette={setLocalPalette}
                    />
                  </>
                ),
              },
              {
                label: "Typography",
                content: (
                  <>
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
                      onClick={() => handleTypographyUpdate(currentProject.id, localTypography)}
                    >
                      Save Typography
                    </button>
                    {typographySaveStatus && (
                      <span className="ml-4 text-sm text-gray-500">{typographySaveStatus}</span>
                    )}
                    <TypographyTable
                      colorOptions={appData.orderedColorOptions}
                      primaryFont={appData.primaryFont}
                      setPrimaryFont={appData.setPrimaryFont}
                      secondaryFont={appData.secondaryFont}
                      setSecondaryFont={appData.setSecondaryFont}
                      googleFontsList={appData.googleFontsList}
                      typography={localTypography || currentProject.typography}
                      setTypography={setLocalTypography}
                    />
                  </>
                ),
              },
              {
                label: "Demo",
                content: <DemoPage />,
              },
            ]}
            selected={selectedTab}
            onChange={setSelectedTab}
          />
        </>
      ) : (
        <Tabs
          tabs={[
            { label: "Info", content: <InfoTab /> },
            {
              label: "Colors",
              content: <ColorPalette palette={appData.palette} setPalette={() => {}} />,
            },
            {
              label: "Typography",
              content: (
                <TypographyTable
                  colorOptions={appData.orderedColorOptions}
                  primaryFont={appData.primaryFont}
                  setPrimaryFont={appData.setPrimaryFont}
                  secondaryFont={appData.secondaryFont}
                  setSecondaryFont={appData.setSecondaryFont}
                  googleFontsList={appData.googleFontsList}
                  typography={appData.typography}
                  setTypography={() => {}}
                />
              ),
            },
            { label: "Demo", content: <DemoPage /> },
          ]}
          selected={selectedTab}
          onChange={setSelectedTab}
        />
      )}
    </div>
  );
}