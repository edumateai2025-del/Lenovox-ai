// auth.js — single source of truth for authentication

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  deleteUser,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { saveSession, clearSession, getSession } from "./session.js";

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
export async function signUpUser({ email, password, displayName }) {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  if (displayName) {
    await updateProfile(res.user, { displayName });
  }

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
   UPDATE DISPLAY NAME (Settings)
====================== */
export async function updateDisplayName(name) {
  if (!auth.currentUser) throw new Error("No user logged in");
  await updateProfile(auth.currentUser, { displayName: name });

  // Refresh session after update
  await saveSession({
    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    name: auth.currentUser.displayName || "",
    photoURL: auth.currentUser.photoURL || "",
    provider: auth.currentUser.providerData[0].providerId || "password"
  });

  return { success: true };
}

/* ======================
   LOGOUT
====================== */
export async function logoutUser() {
  await signOut(auth);
  await clearSession();
  return { success: true };
}

/* ======================
   DELETE ACCOUNT (optional)
====================== */
export async function deleteUserAccount() {
  if (!auth.currentUser) throw new Error("No user logged in");
  await deleteUser(auth.currentUser);
  await clearSession();
  return { success: true };
}

/* ======================
   WATCH AUTH STATE
====================== */
export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

/* ======================
   GET CURRENT USER SESSION
====================== */
export function getCurrentUser() {
  return getSession(); // from session.js, includes 7-day check
}
