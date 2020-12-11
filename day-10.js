function getCombinations(jolts, allCombinations) {
    const combination = jolts.join`,`;

    if (combination in allCombinations) {
        return allCombinations[combination];
    }

    let result = 1;
    for (let i = 0; i < jolts.length - 1; i += 1) {
        const next = jolts[i + 1];
        const prev = jolts[i - 1];

        if ((next - prev) <= 3) {
            const newCombination = [prev].concat(jolts.slice(i + 1))
            result += getCombinations(newCombination, allCombinations);
        }
    }

    allCombinations[combination] = result;
    return result;
}

function runApp(appData) {
    const start = window.performance.now();

    let input = appData.split('\n').map(function(item) {
        return parseInt(item, 10);
    });
    input.push(0);
    input = input.sort((a, b) => a - b);
    input.push(input[input.length - 1] + 3);

    const usedJoltages = [];

    for (let i = 0; i < input.length - 1; i += 1) {
        const calc = input[i + 1] - input[i];

        if (!(calc in usedJoltages)) {
            usedJoltages[calc] = 0;
        }

        usedJoltages[calc] += 1;
    };

    console.log('Solution part1:', usedJoltages[1] * usedJoltages[3]);

    const allCombinations = {};
    
    console.log('Solution part2:', getCombinations(input, allCombinations));
}