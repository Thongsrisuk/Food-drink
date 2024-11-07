import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  const firebaseConfig = {

    apiKey: "AIzaSyA4aGu_CP0hIzbT_ROq08RosRmlzx_7z1A",

    authDomain: "voralopsale.firebaseapp.com",

    databaseURL: "https://voralopsale-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "voralopsale",

    storageBucket: "voralopsale.firebasestorage.app",

    messagingSenderId: "566980337173",

    appId: "1:566980337173:web:c5cd3e6981ff7507ebf81c",

    measurementId: "G-SPH7N01KED"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const analytics = getAnalytics(app);
  
  
    
  