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