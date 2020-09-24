import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA5-VUNDOGWr4tX8uBLiKhwhmkgqOycQ8M",
    authDomain: "facebook-cf17a.firebaseapp.com",
    databaseURL: "https://facebook-cf17a.firebaseio.com",
    projectId: "facebook-cf17a",
    storageBucket: "facebook-cf17a.appspot.com",
    messagingSenderId: "632049503349",
    appId: "1:632049503349:web:aa7eb9f253531dba22fc3c",
    measurementId: "G-HG4Z8KHS4C"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;