// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   clinivaAuthUrl: "http://localhost:8082",
  //clinivaAuthUrl: "http://127.0.0.1:9000",
  //clinivaAppointmentUrl: "http://127.0.0.1:9001",
  firebaseConfig : {
    apiKey: "AIzaSyAe6dHFOx-CsZb11Q5zBTcKSw1VPkPwGKU",
    authDomain: "healthcloud-b2935.firebaseapp.com",
    databaseURL: "https://healthcloud-b2935-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "healthcloud-b2935",
    storageBucket: "healthcloud-b2935.appspot.com",
    messagingSenderId: "416440020663",
    appId: "1:416440020663:web:7fb08a53438cf753a26732",
    measurementId: "G-V3YXXL9TQ5"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
