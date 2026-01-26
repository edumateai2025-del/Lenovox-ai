// auth.js — single source of truth for auth

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

// 🔐 Firebase config (kept here only)
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
   SIGN UP
====================== */
export async function signUpUser({ email, password }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return { success: true, user: userCredential.user };
}

/* ======================
   LOGIN (EMAIL)
====================== */
export async function loginUser({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return { success: true, user: userCredential.user };
}

/* ======================
   GOOGLE LOGIN
====================== */
export async function googleLoginUser() {
  const result = await signInWithPopup(auth, provider);
  return { success: true, user: result.user };
}

/* ======================
   FORGOT PASSWORD
====================== */
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
  return { success: true };
}

/* ======================
   AUTH STATE (USED LATER)
====================== */
export function watchAuth(callback) {
  onAuthStateChanged(auth, callback);
}
