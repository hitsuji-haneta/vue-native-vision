import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: 'AIzaSyCsmkODMpSSRnRzoeMhpCeQMLhNrCWBojc',
  authDomain: 'vue-native-vision.firebaseapp.com',
  databaseURL: 'https://vue-native-vision.firebaseio.com',
  projectId: 'vue-native-vision',
  storageBucket: 'vue-native-vision.appspot.com',
  messagingSenderId: '665931023527',
  appId: '1:665931023527:web:09995c1c41daa79ae7c782',
  measurementId: 'G-8D4PCBJDY5'
});

export const db = firebase.firestore();
export const storage = firebase.storage();

const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };
