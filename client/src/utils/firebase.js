// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyB4kTmqXh3_ofpu4EWBtgcxzyICl6NOibM',

  authDomain: 'travel-93ba5.firebaseapp.com',

  projectId: 'travel-93ba5',

  storageBucket: 'travel-93ba5.appspot.com',

  messagingSenderId: '990800220153',

  appId: '1:990800220153:web:8abdcb5021549a1702f728',

  measurementId: 'G-YTHRVNPTX5',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)

export const storage = getStorage()

export const uploadFile = (file, filePath) => {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, filePath)
    try {
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      resolve(url)
    } catch (error) {
      reject(error)
    }
  })
}

export const uploadFileProgress = (file, subFolder, imageName, setProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, subFolder + '/' + imageName)
    const upload = uploadBytesResumable(storageRef, file)
    upload.on(
      'state_change',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      (error) => {
        reject(error)
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef)
          resolve(url)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}
