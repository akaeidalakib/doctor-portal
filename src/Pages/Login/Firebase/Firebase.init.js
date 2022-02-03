import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const initialiationFirebase = () => {
    initializeApp(firebaseConfig);
}

export default initialiationFirebase;