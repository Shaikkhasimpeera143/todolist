import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCgGC7biadaGT2fGAIhACBPGqgiTHpy_Fo",
  authDomain: "todolist-b1db6.firebaseapp.com",
  projectId: "todolist-b1db6",
  storageBucket: "todolist-b1db6.firebasestorage.app",
  messagingSenderId: "839209457639",
  appId: "1:839209457639:web:2509bef12424c91ed98f42"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()