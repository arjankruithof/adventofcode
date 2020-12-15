const fs = require('fs');
const path = require('path');

const appData = fs.readFileSync(path.resolve(__dirname, 'day-13.txt'), 'utf8');
let input = appData.split('\n');

let time = parseInt(input[0], 10);
const lines = input[1].split(',');
const activeLines = lines.filter(function(value) { 
    if (value !== 'x') {
        return parseInt(value, 10);
    }
});

const minutesToWait = [];

activeLines.forEach(line => {
    const timesLineCanPass = Math.floor(time / line) + 1;
    const waitFor = (timesLineCanPass * line) - time;
    minutesToWait.push(waitFor);
});

const lowestMinutesToWait = Math.min(...minutesToWait);
const index = minutesToWait.indexOf(lowestMinutesToWait);
const nextLine = activeLines[index];

console.log('Solution part 1', nextLine * lowestMinutesToWait);