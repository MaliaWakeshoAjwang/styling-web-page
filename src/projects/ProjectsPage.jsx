import { useEffect, useState } from "react";
import { createProject, getProjects, deleteProject } from "./projectStore";

export default function ProjectsPage({ user, onEdit }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  
  useEffect(() => {
    getProjects(user.uid).then(setProjects);
  }, [user]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProjects(user.uid).then(res => {
      if (mounted) setProjects(res);
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false };
  }, [user.uid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <span className="text-lg font-semibold text-blue-600">Loading projects...</span>
        {/* Replace with spinner SVG or animation if you prefer */}
      </div>
    );
  }

  const handleCreate = async () => {
    if (!newName) return;
    const id = await createProject(user.uid, newName);
    setNewName("");
    getProjects(user.uid).then(setProjects);
  };

  const handleDelete = async id => {
    await deleteProject(id);
    getProjects(user.uid).then(setProjects);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-bold mb-4 text-xl">Your Projects</h2>
      <div className="flex mb-4 gap-2">
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
          placeholder="Project name"
        />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </div>
      <ul>
        {projects.map(proj => (
          <li key={proj.id} className="flex justify-between items-center border-b py-2">
            <span>{proj.name}</span>

            <div>
              <button onClick={() => onEdit(proj)} className="mr-2 text-blue-700 underline">Edit</button>

              <button onClick={() => handleDelete(proj.id)} className="text-red-700 underline">Delete</button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}