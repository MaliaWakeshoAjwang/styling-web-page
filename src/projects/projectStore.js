import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { PALETTE_STYLES } from "../colors/colorData";
import { TYPOGRAPHY_STYLES } from "../typography/typographyData";

export async function createProject(userId, name) {
  const docRef = await addDoc(collection(db, "projects"), {
    userId,
    name,
    createdAt: serverTimestamp(),
    palette: PALETTE_STYLES,
    typography: {
      styles: TYPOGRAPHY_STYLES,
      primaryFont: "Poppins",
      secondaryFont: "Inter"
    }
  });
  return docRef.id;
}

export async function getProjects(userId) {
  const q = query(collection(db, "projects"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteProject(projectId) {
  const docRef = doc(db, "projects", projectId);
  await deleteDoc(docRef);
}

export async function updateProjectPalette(projectId, updatedPalette) {
  return updateDoc(doc(db, "projects", projectId), { palette: updatedPalette });
}

// updatedTypography should be an object: { styles: [...], primaryFont: "...", secondaryFont: "..." }
export async function updateProjectTypography(projectId, updatedTypography) {
  return updateDoc(doc(db, "projects", projectId), {
    typography: updatedTypography,
  });
}
