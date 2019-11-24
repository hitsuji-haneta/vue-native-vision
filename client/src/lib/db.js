import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import serviceAccount from '../../serviceAccount.json';

firebase.initializeApp(serviceAccount);

export const db = firebase.firestore();
export const storage = firebase.storage();

const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };
