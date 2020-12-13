const { dir } = require('console');
const fs = require('fs');
const path = require('path');

const appData = fs.readFileSync(path.resolve(__dirname, 'day-12.txt'), 'utf8');
let input = appData.split('\n');

// E: 0
// N: 1
// W : 2
// S : 3

let facing = 0;
let position = [0, 0];

input.forEach(command => {
    const direction = command.charAt(0);
    const steps = parseInt(command.substring(1), 10);
    
    switch(direction) {
        case 'N':
            position[1] += steps;
            break;
        case 'S':
            position[1] -= steps;
            break;
        case 'E':
            position[0] += steps;
            break;
        case 'W':
            position[0] -= steps;
            break;
        case 'L':
            facing = ((facing + (steps / 90)) + 4) % 4;
            break;
        case 'R':
            facing = ((facing - (steps / 90)) + 4) % 4;
            break;
        case 'F':
            switch(facing) {
                case 0:
                    position[0] += steps;
                    break;
                case 1:
                    position[1] += steps;
                    break;
                case 2:
                    position[0] -= steps;
                    break;
                case 3:
                    position[1] -= steps;
                    break;
            }
            break;
    }
});

console.log('Solution part 1', Math.abs(position[0]) + Math.abs(position[1]));

// part 2
position = [0, 0];

let x = 10;
let y = 1;

input.forEach(command => {
    const direction = command.charAt(0);
    const steps = parseInt(command.substring(1), 10);

    switch(direction) {
        case 'N':
            y += steps;
            break;
        case 'S':
            y -= steps;
            break;
        case 'E':
            x += steps;
            break;
        case 'W':
            x -= steps;
            break;
        case 'L':
            {
                let angle = steps * Math.PI / 180;
                let dx = x * Math.cos(angle) - y * Math.sin(angle);
                let dy = x * Math.sin(angle) + y * Math.cos(angle);
                x = Math.round(dx);
                y = Math.round(dy);
            }
            break;
        case 'R':
            {
                let angle = -steps * Math.PI / 180;
                let dx = x * Math.cos(angle) - y * Math.sin(angle);
                let dy = x * Math.sin(angle) + y * Math.cos(angle);
                x = Math.round(dx);
                y = Math.round(dy);
            }
            break;
        case 'F':
            position[0] += steps * x;
            position[1] += steps * y;
            break;
    }
});

console.log('Solution part 2', Math.abs(position[0]) + Math.abs(position[1]));