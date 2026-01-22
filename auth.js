// 🔹 FIREBASE CONFIG & INIT
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnANsKUAZ1giXXdo-fKkFneMuKh0l0FCg",
  authDomain: "edumateai-6544b.firebaseapp.com",
  projectId: "edumateai-6544b",
  storageBucket: "edumateai-6544b.appspot.com",
  messagingSenderId: "445949748647",
  appId: "1:445949748647:web:40bee0e792098333fa4282"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 EMAIL SIGNUP FORM LOGIC
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully 🎉");
      console.log("User UID:", userCredential.user.uid);

      // Optional: redirect user to dashboard
      // window.location.href = "dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  });

  // 🔹 Forgot password placeholder
  const forgotPassword = document.getElementById("forgotPassword");
  if (forgotPassword) {
    forgotPassword.addEventListener("click", () => {
      alert("Password reset flow will be implemented later.");
    });
  }
});
