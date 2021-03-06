const fs = require('fs');
const path = require('path');

const appData = fs.readFileSync(path.resolve(__dirname, 'day-01.txt'), 'utf8');
const input = appData.split('\n');
let output = [];
let solution = 1;

input.forEach(number1 => {
    input.forEach(number2 => {
        if (parseInt(number1, 10) + parseInt(number2, 10) === 2020) {
            output.push(number1, number2);
        };
    });
});

output = [...new Set(output)];

output.forEach(number => {
    solution = solution * number;
});

console.log('solution part 1:', solution);

// part 2

output = [];
solution = 1;

input.forEach(number1 => {
    input.forEach(number2 => {
        input.forEach(number3 => {
            if (parseInt(number1, 10) + parseInt(number2, 10) + parseInt(number3, 10) === 2020) {
                output.push(number1, number2, number3);
            };
        });
    });
});

output = [...new Set(output)];

output.forEach(number => {
    solution = solution * number;
});

console.log('solution part 2:', solution);