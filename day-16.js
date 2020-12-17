const fs = require('fs');
const { parse } = require('path');
const path = require('path');

const appData = fs.readFileSync(path.resolve(__dirname, 'day-16.txt'), 'utf8');
let input = appData.split('\n');

let validInputMin = 0;
let validInputMax = 0;
let invalidValues = 0;

const myTicket = input[input.indexOf('your ticket:') + 1];
const tickets = [myTicket];

function addToRange(instruction) {
    const fromTo = instruction.split('-');

    if (validInputMin === 0) {
        validInputMin = fromTo[0];
    } else {
        validInputMin = Math.min(validInputMin, fromTo[0]);
    }

    validInputMax = Math.max(validInputMax, fromTo[1]);   
}

function validInstruction(instruction, value) {
    return (value >= instruction[1] && value <= instruction[2]) || (value >= instruction[3] && value <= instruction[4]);
}

input.forEach((line,index) => {
    if (line.indexOf('or') > -1) {
        const words = line.replace(' or ', ': ' );
        const instruction = words.split(': ');

        addToRange(instruction[1]);
        addToRange(instruction[2]);
    }

    if (line.indexOf(',') > 0) {
        const values = line.split(',');

        let valid = true;

        values.forEach(value => {
            const int = parseInt(value, 10);

            if (int < validInputMin || int > validInputMax) {
                invalidValues += int;
                valid = false;
                // part 2
            }
        });

        if (valid) {
            tickets.push(line);
        }
    }
});

console.log('Solution part 1', invalidValues);

// part 2

const instructions = [];

input.forEach(line => {
    if (line.indexOf('or') > -1) {
        const words = line.replace(' or ', ': ' );
        const instruction = words.split(/: |-/);
        instructions.push(instruction);
    }
});

const nearbyTickets = tickets.map(ticket => ticket.split(',').map(x => parseInt(x, 10)));

let matches = [];

for (let i = 0; i < nearbyTickets[1].length; i += 1) {
    for (const instruction of instructions) {
        let valid = true;
        for (let j = 0; j < nearbyTickets.length; j += 1) {
            if (!validInstruction(instruction, nearbyTickets[j][i])) {
                valid = false;
                break;
            }
        }

        if (valid) {
            matches.push({instruction: instruction[0], index: i});
        }
    }
}

while (matches.length > instructions.length) {
    for (let i = 0; i < nearbyTickets[1].length; i += 1) {
        const instructionsMatchingCurrentIndex = matches.filter(m => m.index == i);

        if (instructionsMatchingCurrentIndex.length == 1) {
            const currentInstruction = instructionsMatchingCurrentIndex[0]
            matches = matches.filter(m => {
                if (m.instruction === currentInstruction.instruction) {
                    return m.index === currentInstruction.index;
                }
                return true;
            });
        }
    }
}

const matchFields = matches.filter(m => m.instruction.startsWith('departure'));

let result = 1;
for (let i = 0; i < matchFields.length; i += 1) {
    result *= parseInt(nearbyTickets[0][matchFields[i].index], 10);
}

console.log('Solution part 2', result);