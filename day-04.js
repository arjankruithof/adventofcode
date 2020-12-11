const fs = require('fs');
const path = require('path');

const appData = fs.readFileSync(path.resolve(__dirname, 'day-04.txt'), 'utf8');
const input = appData.split(' ').join('\n');
const passports = input.split('\n\n');

let solutionPart1 = 0;
let solutionPart2 = 0;

// part 1
passports.forEach(passport => {
    const passportKeys = passport.split('\n');

    if (passportKeys.length === 8 || (passportKeys.length === 7 && !passportKeys.find(passportKeys => passportKeys.includes('cid')))) {
        solutionPart1 += 1;

        // part 2
        const birthYear = parseInt(passportKeys.find(passportKeys => passportKeys.includes('byr')).substring(4), 10);
        const issueYear = parseInt(passportKeys.find(passportKeys => passportKeys.includes('iyr')).substring(4), 10);
        const expirationYear = parseInt(passportKeys.find(passportKeys => passportKeys.includes('eyr')).substring(4), 10);
        const height = passportKeys.find(passportKeys => passportKeys.includes('hgt'));
        const heightMetric = height.slice(-2);
        const heightValue = height.substring(4, height.length - 2);
        const hairColor = passportKeys.find(passportKeys => passportKeys.includes('hcl')).substring(4);
        const eyeColor = passportKeys.find(passportKeys => passportKeys.includes('ecl')).substring(4);
        const passportId = passportKeys.find(passportKeys => passportKeys.includes('pid')).substring(4);

        var hairColorRegExp = /[0-9a-f]{6}/g;
        var passportIdRegExp = /^\d{9}$/;

        if (
            birthYear >= 1920 && birthYear <= 2002 &&
            issueYear >= 2010 && issueYear <= 2020 &&
            expirationYear >= 2020 && expirationYear <= 2030 &&
            ((heightMetric === 'in' && heightValue >= 59 && heightValue <= 76)  || (heightMetric === 'cm' && heightValue >= 150 && heightValue <= 193)) &&
            (hairColor.charAt(0) === '#' && hairColorRegExp.test(hairColor.substring(1)) === true) &&
            (eyeColor === 'amb' || eyeColor === 'blu' || eyeColor === 'brn' || eyeColor === 'gry' || eyeColor === 'grn' || eyeColor === 'hzl' || eyeColor === 'oth')  &&
            passportIdRegExp.test(passportId) === true
        ) {
            solutionPart2 += 1;
        }            
    }
});

console.log('solutionPart1', solutionPart1);
console.log('solutionPart1', solutionPart2);