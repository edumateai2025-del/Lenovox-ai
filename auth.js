// auth.js — single source of truth for auth + IndexedDB fallback

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔐 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDnANsKUAZ1giXXdo-fKkFneMuKh0l0FCg",
  authDomain: "edumateai-6544b.firebaseapp.com",
  projectId: "edumateai-6544b",
  storageBucket: "edumateai-6544b.appspot.com",
  messagingSenderId: "445949748647",
  appId: "1:445949748647:web:40bee0e792098333fa4282"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* ======================
   INDEXEDDB SETUP
====================== */
const DB_NAME = "LenovoxAI_DB";
const STORE_NAME = "userData";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "uid" });
      }
    };
    request.onsuccess = e => resolve(e.target.result);
    request.onerror = e => reject(e.target.error);
  });
}

async function saveLocal(user) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put(user);
  return tx.complete;
}

async function getLocal(uid) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(uid);
    req.onsuccess = () => resolve(req.result);
    req.onerror = e => reject(e.target.error);
  });
}

/* ======================
   SIGN UP
====================== */
export async function signUpUser({ email, password, fullName }) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = { uid: user.uid, email: user.email, fullName };
    await saveLocal(userData);
    return { success: true, user: userData };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/* ======================
   LOGIN (EMAIL)
====================== */
export async function loginUser({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const localData = { uid: user.uid, email: user.email };
    await saveLocal(localData);
    return { success: true, user: localData };
  } catch (err) {
    console.warn("Firebase login failed, trying local DB...");
    // fallback: search IndexedDB
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    let fallbackUser;
    store.openCursor().onsuccess = e => {
      const cursor = e.target.result;
      if(cursor) {
        if(cursor.value.email === email) fallbackUser = cursor.value;
        cursor.continue();
      }
    };
    await new Promise(r => setTimeout(r, 300)); // wait cursor
    if(fallbackUser) return { success: true, user: fallbackUser };
    return { success: false, error: err.message };
  }
}

/* ======================
   GOOGLE LOGIN
====================== */
export async function googleLoginUser() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userData = { uid: user.uid, email: user.email, fullName: user.displayName };
    await saveLocal(userData);
    return { success: true, user: userData };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/* ======================
   RESET PASSWORD
====================== */
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch(err) {
    return { success: false, error: err.message };
  }
}

/* ======================
   AUTH STATE
====================== */
export function watchAuth(callback) {
  onAuthStateChanged(auth, callback);
      }
