import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  const handleSignUp = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail(""); setPassword("");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSignIn = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail(""); setPassword("");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSignOut = async () => { await signOut(auth); };

  if (user) {
    return (
      <div className="max-w-sm mx-auto mt-16 bg-white p-8 rounded shadow">
        <p className="mb-4">Logged in as <b>{user.email}</b></p>
        <button onClick={handleSignOut} className="bg-red-600 text-white px-4 py-2 rounded">Sign out</button>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white p-8 rounded shadow">
      <h1 className="text-2xl mb-4 font-bold text-center">Login / Register</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{error}</div>}
      <input className="block w-full mb-2 border px-3 py-2 rounded" type="email" placeholder="Email"
        value={email} onChange={e => setEmail(e.target.value)} />
      <input className="block w-full mb-4 border px-3 py-2 rounded" type="password" placeholder="Password"
        value={password} onChange={e => setPassword(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={handleSignIn} className="bg-blue-600 text-white px-4 py-2 rounded flex-1">Sign In</button>
        <button onClick={handleSignUp} className="bg-green-600 text-white px-4 py-2 rounded flex-1">Sign Up</button>
      </div>
    </div>
  );
}