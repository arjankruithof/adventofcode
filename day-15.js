function loop(times) {
    const input = [1, 2, 16, 19, 18, 0];
    let index = 0;
    let lastNumber = input[input.length - 1];
    const lastIndexOf = new Map();

    for (let i = 0; i < input.length; i += 1) {
        lastIndexOf.set(input[i], i + 1);
        index += 1;
    }

    while (index < times) {
        const lastIndex = lastIndexOf.get(lastNumber) || null;
        lastIndexOf.set(lastNumber, index);
    
        lastNumber = lastIndex === null ? 0 : index - lastIndex;
    
        index += 1;
    }

    return lastNumber;
}

console.log('solution part 1', loop(2020));
console.log('solution part 2', loop(30000000));
