import firebase from 'firebase';

export function createBlobImageFromUri(uri) {
    return new Promise(function (resolve, reject) {
        window.resolveLocalFileSystemURL(uri, function (fileEntry) {
            fileEntry.file(function (file) {
                let reader = new FileReader();
                reader.onloadend = function() {
                    let blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
                    resolve(blob);
                };
                reader.readAsArrayBuffer(file);
            });
        }, function (error) {
            reject(error);
        });
    });
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