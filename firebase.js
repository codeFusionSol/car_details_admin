import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpJI3hOrggbToTbphT_nVUW7sepiiU1EQ",
  authDomain: "socail-media-images.firebaseapp.com",
  projectId: "socail-media-images",
  storageBucket: "socail-media-images.appspot.com",
  messagingSenderId: "212646702500",
  appId: "1:212646702500:web:f3c09881657124d3972531",
  measurementId: "G-EQ30ZRENXE"
};

const app = initializeApp(firebaseConfig);

export default app;
