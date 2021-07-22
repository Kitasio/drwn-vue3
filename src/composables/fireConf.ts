import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBW06MDQSedzP7p1XelabYRfj-FyNHv7qE",
    authDomain: "drwn-land.firebaseapp.com",
    projectId: "drwn-land",
    storageBucket: "drwn-land.appspot.com",
    messagingSenderId: "1047562188166",
    appId: "1:1047562188166:web:bb85687387366d1a682807",
    measurementId: "G-NRQ4B3H3YR"
};


// init firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const ts = firebase.firestore.FieldValue.serverTimestamp()

export { db, auth, storage, ts }