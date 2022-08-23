import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBA3yB1frEB0fAaXj06Ql-VsAUpdPM4hQ4",
    authDomain: "forexeasyalert.firebaseapp.com",
    projectId: "forexeasyalert",
    storageBucket: "forexeasyalert.appspot.com",
    messagingSenderId: "639584241259",
    appId: "1:639584241259:web:e90635bb4d7281c072d32e",
    measurementId: "G-L9SX3NRQ43"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export  { app }