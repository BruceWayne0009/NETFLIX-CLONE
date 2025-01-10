import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC8UFYAaUvR6bMgDy4GWgs4XdfpE79WogY",
  authDomain: "netflix-clone-415df.firebaseapp.com",
  projectId: "netflix-clone-415df",
  storageBucket: "netflix-clone-415df.firebasestorage.app",
  messagingSenderId: "708871989164",
  appId: "1:708871989164:web:486eabc3c5b04b2b08bc09"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid : user.uid,
            name,
            authProviter: "local", 
            email,
        })
    } catch (error){
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = ()=>{
    signOut(auth);
}

export { signup, login, logout, auth, db };