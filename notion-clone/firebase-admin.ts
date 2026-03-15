import { initializeApp, App, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// import serviceKey from "./service_key.json"; // Import JSON file

const serviceKey = require("./service_key.json");

// const serviceAccount = JSON.parse(
//   Buffer.from(process.env.FIREBASE_SERVICE_KEY || "", "base64").toString()
// );

let app: App;

// if (getApps().length === 0) {
// 	app.initializeApp({
// 		credential: cert(serviceAccount),
// 	});
// } else {
// 	app = getApp();
// }

if (getApps().length === 0) {
	app = initializeApp({
		credential: cert(serviceKey),
	});
} else {
	app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };


