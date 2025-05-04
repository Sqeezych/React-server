
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyChCqg_imfLNw-v37sbyZwsoybpLa5EswE",
  authDomain: "reactserver-53bb0.firebaseapp.com",
  projectId: "reactserver-53bb0",
  storageBucket: "reactserver-53bb0.firebasestorage.app",
  messagingSenderId: "634092869789",
  appId: "1:634092869789:web:372b7b1f3a8ace0f221c74",
  databaseURL: "https://reactserver-53bb0-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);