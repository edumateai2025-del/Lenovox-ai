// session.js

const DB_NAME = "lenovox-auth";
const STORE = "session";
const VERSION = 1;

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);

    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE, { keyPath: "id" });
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveSession(user) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");

  const now = Date.now();

  tx.objectStore(STORE).put({
    id: "current",
    uid: user.uid,
    email: user.email,
    name: user.name || "",
    photoURL: user.photoURL || "",
    provider: user.provider || "password",
    lastLogin: now,
    expiresAt: now + SEVEN_DAYS
  });

  return tx.complete;
}

export async function getSession() {
  const db = await openDB();
  const tx = db.transaction(STORE, "readonly");
  const req = tx.objectStore(STORE).get("current");

  return new Promise(resolve => {
    req.onsuccess = () => resolve(req.result || null);
  });
}

export async function clearSession() {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).delete("current");
}
