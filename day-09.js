function runApp(appData) {
    const start = window.performance.now();
    const input = appData.split('\n').map(function(item) {
        return parseInt(item, 10);
    });
    let solutionPart1 = 0;
    
    // part 1
    for (let i = 25; i < input.length; i += 1) {
        let solutionFound = false;
        const dataSet = input.slice(i - 25, i);

        dataSet.forEach(number => {
            const subStraction = input[i] - number;

            if (dataSet.includes(subStraction)) {
                solutionFound = true;
            }
        });

        if (!solutionFound) {
            solutionPart1 = input[i];
            console.log('Solution part 1:', solutionPart1);
            break;
        }
    }

    // part 2
    let part2MinPos = 0;
    let part2MaxPos = 0;
    for (let i = 0; i < input.length; i += 1) {
        let total = solutionPart1;

        for (let j = i; j < input.length; j += 1) {
            total -= input[j];

            if (total < 0) {
                continue;
            }

            if (total === 0 && i !== j) {
                part2MinPos = i;
                part2MaxPos = j;
                break;
            }
        }
    }

    let part2Data = input.slice(part2MinPos, part2MaxPos);
    const sum = Math.min(...part2Data) + Math.max(...part2Data);
    console.log('Solution part 2:', sum);
    const end = window.performance.now();
    console.log(`Execution time: ${end - start} ms`);
}