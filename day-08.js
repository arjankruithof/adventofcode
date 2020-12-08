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

function runApp(appData) {
    const start = window.performance.now();
    const input = appData.split('\n');
    let stepsDone = [0];
    let stepResult = executeStep(input[0]);
    let accumulator = stepResult[0];
    let currentStep = stepResult[1];

    do {
        stepsDone.push(currentStep);
        accumulator += executeStep(input[currentStep])[0];
        currentStep += executeStep(input[currentStep])[1];
    } while (!stepsDone.includes(currentStep));

    console.log('solutionPart 1', accumulator);

    // part 2
    for (let i = 0; i < input.length; i += 1) {
        let found = -1;
        stepsDone = [0];
        stepResult = executeStep(input[0]);
        accumulator = stepResult[0];
        currentStep = stepResult[1];

        do {
            let stepData = input[currentStep];

            if (!stepData) {
                console.log('solutionPart 2', accumulator);
                const end = window.performance.now();
                console.log(`Execution time: ${end - start} ms`);
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

            stepResult = executeStep(stepData);
            accumulator = stepResult[0];
            currentStep = stepResult[1];
        } while (!stepsDone.includes(currentStep));
    }

}