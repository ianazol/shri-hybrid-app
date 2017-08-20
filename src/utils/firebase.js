import firebase from 'firebase';
import firebaseConfig from '../config/firebase';

export function initFirebase() {
    firebase.initializeApp(firebaseConfig);
}

export function authInFirebase() {
    let user = firebase.auth();
    if (user.currentUser === null) {
        return firebase.auth().signInAnonymously()
            .catch(function(error) {
                console.log(error);
            });
    } else {
        return Promise.resolve(user);
    }
}

export function uploadFileToFirebaseStorage(imageBlob, path) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(path).put(imageBlob);

    return new Promise(function (resolve, reject) {
        uploadTask.on('state_changed', function (snapshot) {
        }, function (error) {
            reject(error);
        }, function () {
            let downloadUrl = uploadTask.snapshot.downloadURL;
            resolve(downloadUrl);
        });
    });
}

export function saveToFirebase(data, path) {
    return firebase.database().ref(path).push(data);
}

export function fetchFromFirebase(path, callback) {
    firebase.database().ref(path).orderByChild('priority').limitToFirst(30)
        .on('value', (snapshot) => {
            let feed = [];
            snapshot.forEach((duckSnap) => {
                feed.push(duckSnap.val());
            });
            callback(feed);
        });
}