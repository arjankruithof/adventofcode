const urlParams = new URLSearchParams(window.location.search);
const day = urlParams.get('day');

const script = document.createElement('script');
const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5); // bacause op http-server caching
script.src = `day-${day}.js?v=${randomString}`;
document.head.appendChild(script);

fetch(`./day-${day}.txt?v=${randomString}`)
.then(response => response.text())
.then((responseText) => {
    // const appData = responseText.split('\n');
    runApp(responseText);
});