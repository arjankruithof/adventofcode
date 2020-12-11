const fs = require('fs');
const path = require('path');

const appData = fs.readFileSync(path.resolve(__dirname, 'day-06.txt'), 'utf8');
const answerGroups = appData.split('\n\n');

let solutionPart1 = 0;
let solutionPart2 = 0;

answerGroups.forEach(group => {
    // part 1
    const answers = group.replace(/\n/g, '').split('');
    const uniqueAnswers = [...new Set(answers)];

    solutionPart1 += uniqueAnswers.length;

    // part 2
    const personsInGroup = group.split('\n').length;

    uniqueAnswers.forEach(uniqueAnswer => {
        if (countInArray(answers, uniqueAnswer) === personsInGroup) {
            solutionPart2 += 1;
        }
    });
});

console.log('solutionPart1', solutionPart1);
console.log('solutionPart1', solutionPart2);

function countInArray(array, letter) {
    let count = 0;
    
    for (let i = 0; i < array.length; i += 1) {
        if (array[i] === letter) {
            count += 1;
        }
    }

    return count;
}