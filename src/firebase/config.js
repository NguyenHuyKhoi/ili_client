// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp5m8jreSK8zrXWWG5UqZguA_sOJ9jluk",
  authDomain: "ili-platform.firebaseapp.com",
  projectId: "ili-platform",
  storageBucket: "ili-platform.appspot.com",
  messagingSenderId: "1036097896730",
  appId: "1:1036097896730:web:dce022129b71da581f2ca3",
  measurementId: "G-4ZDRHXJMEB"
};

// Initialize Firebase
const FireBaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FireBaseApp);

export default FireBaseApp