import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBTgELY0jFPOC0iO1gqDzDZT9925cK2s90",
  authDomain: "copy-5848d.firebaseapp.com",
  projectId: "copy-5848d",
  storageBucket: "copy-5848d.appspot.com",
  messagingSenderId: "534063242353",
  appId: "1:534063242353:web:47a8e5054983249e98cfd0"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app

const db = app.firestore()

export default db;