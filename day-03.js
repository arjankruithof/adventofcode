function fetchData() {
    fetch('./day-03.txt')
    .then(response => response.text())
    .then((responseText) => {
        const appData = responseText.split('\n');
        runApp(appData);
    });
}

function runApp(input) {
    // part 1
    let index = 4;
    let amountOfTrees = 0;
    let loopIndex = 1;

    input.forEach(line => {
        if (loopIndex > 1) {
            const charactersInLine = line.split('');

            if (!charactersInLine[index - 1]) {
                index = index - charactersInLine.length;
            }

            if (charactersInLine[index - 1] === '#') {
                amountOfTrees += 1;
            }

            index += 3;
        }

        loopIndex += 1;
    });

    console.log('solution part 1', amountOfTrees);

    // part 2

    let solutionPart2 = 1;
    const configs = [
        // [right, down],
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]

    configs.forEach(config => {
        let right = config[0];
        let down = config[1];

        index = 1;
        amountOfTrees = 0;
        loopIndex = 1;

        input.forEach((line) => {
            if (loopIndex > 1 && (down === 1 || (down === 2 && loopIndex % 2 === 1))) {
                const charactersInLine = line.split('');

                index += right;

                if (!charactersInLine[index - 1]) {
                    index = index - charactersInLine.length;
                }

                if (charactersInLine[index - 1] === '#') {
                    amountOfTrees += 1;
                }
            }

            loopIndex += 1;
        });

        solutionPart2 = solutionPart2 * amountOfTrees;
    });

    console.log('solution part 2', solutionPart2);
}