// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js"; // Downgraded to 9.22.0
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCtTuPIOjXVPdn4av8mNLWQGwqLz4uiGQ",
  authDomain: "budgetfinalbank.firebaseapp.com",
  projectId: "budgetfinalbank",
  storageBucket: "budgetfinalbank.firebasestorage.app",
  messagingSenderId: "213828126009",
  appId: "1:213828126009:web:86ff32c2d1ebae4950d4e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase

// Get the storage instance here if you plan to use it in this file
const storage = getStorage(app);

// Export the initializeApp function and the app instance
export { initializeApp, app, storage };