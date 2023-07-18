importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js'); 
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyAe6dHFOx-CsZb11Q5zBTcKSw1VPkPwGKU",
    authDomain: "healthcloud-b2935.firebaseapp.com",
    projectId: "healthcloud-b2935",
    storageBucket: "healthcloud-b2935.appspot.com",
    messagingSenderId: "416440020663",
    appId: "1:416440020663:web:7fb08a53438cf753a26732",
    measurementId: "G-V3YXXL9TQ5"
});
const messaging = firebase.messaging();