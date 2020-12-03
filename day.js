const urlParams = new URLSearchParams(window.location.search);
const day = urlParams.get('day');

const script = document.createElement('script');
script.src = `day-${day}.js`;
document.head.appendChild(script);

fetch(`./day-${day}.txt`)
.then(response => response.text())
.then((responseText) => {
    const appData = responseText.split('\n');
    runApp(appData);
});