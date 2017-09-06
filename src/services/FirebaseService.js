import Firebase from 'firebase';

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyBtNSdaFER7RE2VCEkAWWbRqbahWb2L3Ew',
  authDomain: 'vue-docs.firebaseapp.com',
  databaseURL: 'https://vue-docs.firebaseio.com',
  projectId: 'vue-docs',
  storageBucket: 'vue-docs.appspot.com',
  messagingSenderId: '319635995296'
});

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.

export const db = firebaseApp.database();

