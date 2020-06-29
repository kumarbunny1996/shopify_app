const loaderDiv = () => {
    let loader = document.createElement('div');
    loader.className = 'loadOverlay';
    loader.id = 'loadOverlay';
    loader.innerHTML = `
          <div class="loader" id="loader"></div>    
    `
    document.body.appendChild(loader);
}
const requestHeader = (method) => {
    if (method === 'POST' || method === 'PUT') {
        let requestHead = {
            header: 'Content-type',
            value: 'application/json'
        };
        return requestHead;
    }
}
module.exports = function makeRequestToServer(method, url, data = null) {

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.status === 200) {
                resolve(this.responseText);
            }
        }
        xhr.onerror = () => console.log(`server problem ${xhr.status}`);
        xhr.open(method, url, true);
        xhr.upload.addEventListener('progress', (e) => {
            console.log(e);
            loaderDiv();
        });
        const request = requestHeader(method);
        xhr.setRequestHeader(request.header, request.value);
        xhr.send(JSON.stringify(data));
    });
}