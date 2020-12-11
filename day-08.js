const fs = require('fs');
const path = require('path');

const appData = fs.readFileSync(path.resolve(__dirname, 'day-08.txt'), 'utf8');
const input = appData.split('\n');

let stepsDone = [0];
let currentStep = executeStep(input[0])[1];
let accumulator = executeStep(input[0])[0];

do {
    stepsDone.push(currentStep);
    accumulator += executeStep(input[currentStep])[0];
    currentStep += executeStep(input[currentStep])[1];
} while (!stepsDone.includes(currentStep));

console.log('solutionPart1', accumulator);

// part 2
for (let i = 0; i < input.length; i += 1) {
    let found = -1;
    stepsDone = [0];
    currentStep = executeStep(input[0])[1];
    accumulator = executeStep(input[0])[0];

    do {
        let stepData = input[currentStep];

        if (!stepData) {
            console.log('solutionPart2', accumulator);
            return;
        }

        // replace nop
        if (stepData.indexOf('nop') === 0) {
            found += 1;
            
            if (found === i) {
                stepData = stepData.replace('nop', 'jmp');
            }
        }

        // replace jmp
        if (stepData.indexOf('jmp') === 0) {
            found += 1;
            
            if (found === i) {
                stepData = stepData.replace('jmp', 'nop');
            }
        }

        stepsDone.push(currentStep);
        accumulator += executeStep(stepData)[0];
        currentStep += executeStep(stepData)[1];
    } while (!stepsDone.includes(currentStep));
}

function executeStep(data) {
    const step = data.split(' ');
    const action = step[0];
    const value = parseInt(step[1].substring(1), 10);
    const operator = step[1].charAt(0);

    let addToAccumulator = 0;
    let addToNextStep = 0;

    switch(action) {
        case 'acc':
            addToAccumulator = operator === '+' ? value : value * -1;
            addToNextStep = 1;
            break;
        case 'jmp':
            addToNextStep = operator === '+' ? value : value * -1;
            break;
        case 'nop':
            addToNextStep = 1;
            break;
    }

    return [addToAccumulator, addToNextStep, action];
}