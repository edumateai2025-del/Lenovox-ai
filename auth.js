// auth.js — single source of truth for authentication

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

import { saveSession, clearSession } from "./session.js";

/* ======================
   FIREBASE CONFIG
====================== */
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
   SIGN UP (EMAIL)
====================== */
export async function signUpUser({ email, password }) {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  await saveSession({
    uid: res.user.uid,
    email: res.user.email,
    name: res.user.displayName || "",
    photoURL: res.user.photoURL || "",
    provider: "password"
  });

  return { success: true, user: res.user };
}

/* ======================
   LOGIN (EMAIL)
====================== */
export async function loginUser({ email, password }) {
  const res = await signInWithEmailAndPassword(auth, email, password);

  await saveSession({
    uid: res.user.uid,
    email: res.user.email,
    name: res.user.displayName || "",
    photoURL: res.user.photoURL || "",
    provider: "password"
  });

  return { success: true, user: res.user };
}

/* ======================
   GOOGLE LOGIN / SIGNUP
====================== */
export async function googleLoginUser() {
  const res = await signInWithPopup(auth, provider);

  await saveSession({
    uid: res.user.uid,
    email: res.user.email,
    name: res.user.displayName || "",
    photoURL: res.user.photoURL || "",
    provider: "google"
  });

  return { success: true, user: res.user };
}

/* ======================
   RESET PASSWORD
====================== */
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
  return { success: true };
}

/* ======================
   LOGOUT (FULL CLEAN)
====================== */
export async function logoutUser() {
  await auth.signOut();
  await clearSession();
}

/* ======================
   AUTH STATE LISTENER
   (optional – for settings)
====================== */
export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
