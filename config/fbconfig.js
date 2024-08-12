var admin = require("firebase-admin");

var serviceAccount = require("../firebasesdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://mrkings-techyjaunt.appspot.com"
});
