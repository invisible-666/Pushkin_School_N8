// =========================================
// FIREBASE CONFIG
// This file connects your site to your Firebase database.
// You (the developer) create a free Firebase project at https://console.firebase.google.com
// then paste the config values Firebase gives you here.
// =========================================

const firebaseConfig = {
  apiKey: "AIzaSyAHCbRZMeSF2gm6Ccqoo_Q4T-NWxLMCY2g",
  authDomain: "pushkinn8school.firebaseapp.com",
  projectId: "pushkinn8school",
  storageBucket: "pushkinn8school.firebasestorage.app",
  messagingSenderId: "830264926195",
  appId: "1:830264926195:web:42e8aafd0183f5db7ffc86"
};

// Start Firebase (using the "compat" version — works with plain <script> tags, no build tools needed)
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
