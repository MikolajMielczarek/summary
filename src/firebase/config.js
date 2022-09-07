import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBRzJutrboY7gvZEDc1ki1RIvHos_eX5x4",
    authDomain: "mytime-35db3.firebaseapp.com",
    projectId: "mytime-35db3",
    storageBucket: "mytime-35db3.appspot.com",
    messagingSenderId: "449886047346",
    appId: "1:449886047346:web:da2c5d5b9849ce5985c6eb"
  };

  //init firebase - we connect with our firebase backend
  firebase.initializeApp(firebaseConfig)

  // init services - init firestore service
  // we will use prjectFirestore to connect with our firestore data
  // base - we can import it in some components to interact with data base
  const projectFirestore = firebase.firestore()

  // auth
  const projectAuth = firebase.auth()

  //timestamp
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp }