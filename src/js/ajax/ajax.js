module.exports = function makeRequestToServer(requestObject = {}) {

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.status === 200) {
                return resolve(JSON.parse(this.responseText));
            }
            if (this.status === 400) {
                return reject(JSON.parse(this.responseText));
            }
        }
        xhr.open(requestObject.method, requestObject.url, true);
        if (requestObject.method === 'POST' || requestObject.method === 'PUT') {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.setRequestHeader(requestObject.name, requestObject.value);
        xhr.send(JSON.stringify(requestObject.data));
    });
}