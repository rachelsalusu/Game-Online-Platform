import { initializeApp } from "firebase/app";
import "firebase/storage";

export default function initFirebase() {

  const firebaseConfig = {
    apiKey: "AIzaSyA_y6ESpb-_xgEVhvr2NFR4972TCXFhp68",
    authDomain: "binar-fsw-ch-10.firebaseapp.com",
    projectId: "binar-fsw-ch-10",
    storageBucket: "binar-fsw-ch-10.appspot.com",
    messagingSenderId: "504573189340",
    appId: "1:504573189340:web:c717a09bc5883174bb2819",
    measurementId: "G-0D9YHRJXJK"
  };

  initializeApp(firebaseConfig);
  
}