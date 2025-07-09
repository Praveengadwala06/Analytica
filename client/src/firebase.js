import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCRSG_wCAOUdrm2bAv0WucSwWfhyinXTZ8",
  authDomain: "analytica-e26dd.firebaseapp.com",
  projectId: "analytica-e26dd",
  storageBucket: "analytica-e26dd.firebasestorage.app",
  messagingSenderId: "209957899539",
  appId: "1:209957899539:web:caf5af22f884b5a053dee6",
  measurementId: "G-4F1FXS8XN0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
