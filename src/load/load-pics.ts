import { photos, writeFile } from "../util/common"
const path = require("path");
const serviceAccount: object = require("./../config/firebase/serviceAccount.json");
import * as admin from "firebase-admin";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "bella-strati.appspot.com",
  databaseURL: "https://bella-strati.firebaseio.com"
});
const bucket = admin.storage().bucket("bella-strati.appspot.com")

// before you run this, some helpful hints
// don't even mix same storage folders for files uploaded in bulk and files shrank by functions and imagemagic
// change all of the references to specific firebase instance above
// hand copy the serviceAccount.json to the .tsc folder
// add a proper - AND TEMPORARY - match rule inside the storage rules
// see this doc for more reference /Users/petecarapetyan/Documents/reference/howToResizeImages.yaml
/*
for examples of mogrify before run this:
mogrify -format jpg -path ../50 -thumbnail 50x300 *.jpg
mogrify -format jpg -path ../50 -thumbnail 50x300 *.webp
mogrify -format jpg -path ../50 -thumbnail 50x300 *.png
mogrify -format jpg -path ../50 -thumbnail 50x300 *.jpeg
mogrify -format jpg -path ../100 -thumbnail 100x300 *.jpg
mogrify -format jpg -path ../100 -thumbnail 100x300 *.webp
mogrify -format jpg -path ../100 -thumbnail 100x300 *.png
mogrify -format jpg -path ../100 -thumbnail 100x300 *.jpeg
mogrify -format jpg -path ../200 -thumbnail 200x300 *.jpg
mogrify -format jpg -path ../200 -thumbnail 200x300 *.webp
mogrify -format jpg -path ../200 -thumbnail 200x300 *.png
mogrify -format jpg -path ../200 -thumbnail 200x300 *.jpeg
mogrify -format jpg -path ../500 -thumbnail 500x800 *.jpg
mogrify -format jpg -path ../500 -thumbnail 500x800 *.webp
mogrify -format jpg -path ../500 -thumbnail 500x800 *.png
mogrify -format jpg -path ../500 -thumbnail 500x800 *.jpeg
*/
// see https://stackoverflow.com/questions/42956250/get-download-url-from-file-uploaded-with-cloud-functions-for-firebase

export const load = async (sourcePath: string, writePath: string, type:string ) => {
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
  writeFile(`uploads/PHOTOS_UPLOAD_${writeRecord.dateTime}.json`, JSON.stringify(writeRecord, null, 2))
  
  return `${photoArray.length} photos processed`;
}