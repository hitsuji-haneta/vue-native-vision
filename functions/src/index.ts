import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as os from 'os';
const vision = require('@google-cloud/vision'); // to avoid noImplicitAny

admin.initializeApp();
const client = new vision.ImageAnnotatorClient();

export const sendToVisionAPI = functions.storage
  .object()
  .onFinalize(async object => {
    const filePath = object.name;
    if (!filePath) {
      console.log('File path is undefined.');
      return;
    }

    const fileName = path.basename(filePath);
    if (!fileName) {
      console.log('File name is undefined.');
      return;
    }

    const contentType = object.contentType;
    if (!contentType || !contentType.startsWith('image/')) {
      console.log('This is not an image.');
      return;
    }

    const fileBucket = object.bucket;
    const bucket = admin.storage().bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    await bucket.file(filePath).download({ destination: tempFilePath });
    console.log('Image downloaded locally to', tempFilePath);

    client
      .labelDetection(tempFilePath)
      .then((results: any) => {
        const labels = results[0].labelAnnotations;
        console.log('Labels:');
        labels.forEach((label: any) => console.log(label.description));
      })
      .catch((err: any) => {
        console.error('ERROR:', err);
      });
  });
