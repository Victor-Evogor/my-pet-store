import Pets from "../types/Pets";
import CartItem from "../types/CartItem";
import Notification from "../types/Notification";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxocadtkXlx446RNYCTVa_0t4k0WI6sIc",
  authDomain: "my-pet-store-22a6c.firebaseapp.com",
  projectId: "my-pet-store-22a6c",
  storageBucket: "my-pet-store-22a6c.appspot.com",
  messagingSenderId: "666571901956",
  appId: "1:666571901956:web:7e82db163aae883b833951",
  measurementId: "G-LV1BY62N13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const users = collection(db, "users");
const pets = collection(db, "pets");
const google = new GoogleAuthProvider();

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () => signInWithPopup(auth, google);

export const createUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);
export const addUser = async (uuid: string) => {
  const docRef = doc(users, uuid); 
  const user = await getDoc(docRef);
  if(user.exists()) return;
  setDoc(docRef, {
    cart: [],
    uuid,
    notifications: [],
  });
};

export const getUser = async (uuid: string) => {
  const docRef = doc(users, uuid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("User not found");
  }
};

export const getPets = async () => {
  const docRef = doc(pets, "KID7vAmK8HyJB4tvvTcE");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as Pets;
  } else {
    throw new Error("Couldn't find pets");
  }
};

export const addToCart = async (uid: string, cart: CartItem) => {
  const docRef = doc(users, uid);

  // getting the array
  const cartDoc = await getDoc(docRef);
  if (!cartDoc.exists()) {
    throw new Error(
      "Cart doesn't exist probably because, user " + uid + " doesn't exist"
    );
  }
  const currentCart = cartDoc.data()!.cart as Array<CartItem>;
  // add cart items
  updateDoc(docRef, { cart: currentCart.concat([cart]) });
};

export const updateCartItem = async (uid: string, cart: CartItem) => {
  const docRef = doc(users, uid);

  const cartDoc = await getDoc(docRef);
  if(!cartDoc.exists()){
    throw new Error("Cart doesn't exist probably because, user " + uid + " doesn't exist")
  }
  const currentCart = cartDoc.data()!.cart as Array<CartItem>;

  const cartItem = currentCart.findIndex(cartItem =>{
    return (cartItem.name === cart.name) && (cartItem.price === cart.price)
  })
  ++currentCart[cartItem]!.quantity;
  updateDoc(docRef, {cart: currentCart})
}

export const deleteCartItem =async (uid: string, cartIndex: number)=>{
  const docRef = doc(users, uid);

  const cartDoc = await getDoc(docRef);
  if(!cartDoc.exists()){
    throw new Error("Cart doesn't exist probably because, user " + uid + " doesn't exist")
  }
  let currentCart = cartDoc.data()!.cart as Array<CartItem>;
  if(!currentCart[cartIndex]) return

  if(currentCart[cartIndex].quantity === 1)
  currentCart = currentCart.slice(0,cartIndex).concat(currentCart.slice(cartIndex+1));
  else 
  --currentCart[cartIndex].quantity

  updateDoc(docRef, {cart: currentCart});
}

export const addNotification = async (uid:string, notification:Notification)=>{
  const docRef = doc(users, uid);

  // getting the user
  const user = await getDoc(docRef);
  if (!user.exists()) {
    throw new Error(
      "Cart doesn't exist probably because, user " + uid + " doesn't exist"
    );
  }
  const currentNotifications = user.data()!.notifications as Array<Notification>;
  // add notification
  return updateDoc(docRef, { notifications: currentNotifications.concat([notification]) });
}

export const deleteAllCartItems = async (uid:string)=>{
  const docRef = doc(users, uid);

  // getting the user
  const user = await getDoc(docRef);
  if (!user.exists()) {
    throw new Error(
      "Cart doesn't exist probably because, user " + uid + " doesn't exist"
    );
  }

  updateDoc(docRef, {cart: []});
}