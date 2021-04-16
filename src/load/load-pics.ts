import { photos, writeFile } from "../util/common"
const path = require("path");
const serviceAccount: object = require("./../config/firebase/serviceAccount.json");
import * as admin from "firebase-admin";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "betterology-com.appspot.com",
  databaseURL: "https://betterology-com.firebaseio.com"
});
const bucket = admin.storage().bucket("betterology-com.appspot.com")


// see https://stackoverflow.com/questions/42956250/get-download-url-from-file-uploaded-with-cloud-functions-for-firebase

export const load = async (sourcePath: string, writePath: string, type:BigIntToLocaleStringOptions) => {
  const db = await admin.firestore();
  const photoArray:string[] = photos(sourcePath)
  photoArray.map(async photoPath => {
    // if(photoPath.includes("jontyson-50J-5CeK9rI")){
      const filePath =  path.join(sourcePath, photoPath);
      bucket.upload(filePath, {
        metadata: {
          contentType: `image/${type}`,
        },
        destination: `${writePath}/${photoPath}`,
        predefinedAcl: 'publicRead'
      }).then(file => {
          db.collection("images").doc(`${photoPath}`).set({
            timestamp: `${new Date().getTime()} `,
            url: file[0].metadata.mediaLink
          });
        }).catch(function(err) {
          console.log(`FAILED ${photoPath} ${err}`)
          process.exit(1)
        })
    // }
  })
  const writeRecord = 
    { 
      dateTime: new Date().getTime(),
      sourcePath,
      writePath,
      type,
      photoArray
    }
  writeFile(`uploads/PHOTOS_UPLOAD_${writeRecord.dateTime}.txt`, JSON.stringify(writeRecord, null, 2))
  
  return `${photoArray.length} photos processed`;
}