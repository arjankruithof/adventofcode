function loop(parents, allBags) {
    const bagsToReturn = [];
    parents.forEach(parentBag => {
        allBags.forEach(bag => {
            if (bag.includes(parentBag, 1)) {
                const addBag = bag.split(' ').slice(0 , 2).join(' ');

                if (!parents.includes(addBag) && !bagsToReturn.includes(addBag)) {
                    bagsToReturn.push(addBag);
                }
            }
        });
    });

    return bagsToReturn;
}

function getBagContents(bagColors, allBags) {
    const bags = [];

    bagColors.forEach(bagColor => {
        allBags.forEach(bag => {
            if (bag.indexOf(bagColor) === 0) {
                const currentBag = bag.replaceAll(/ bags| bag|/gi, '');
                const bagContents = currentBag.substring(bag.indexOf('contain') + 3, bag.length - 1).split(', ');

                bagContents.forEach(content => {
                    const amount = parseInt(content.charAt(0), 10);
                    const color = content.substring(2).replace('.', '');

                    if (!isNaN(amount)) {
                        for (let i = 0; i < amount; i += 1) {
                            bags.push(color);
                        }
                    }
                });
            }
        });
    });

    return bags;
}

function runApp(appData) {
    const bags = appData.split('\n');
    const myBag = 'shiny gold';
    let parentBags = [];

    bags.forEach(bag => {
        if (bag.includes(myBag, 1)) {
            parentBags.push(bag.split(' ').slice(0 , 2).join(' '));
        }
    });

    do {
        const newBags = loop(parentBags, bags);
        parentBags = parentBags.concat(newBags);
    } while (loop(parentBags, bags).length > 0);


    // part 2
    let bagsInsideMyBag = 0;
    let bagsInside = getBagContents([myBag], bags);
    bagsInsideMyBag = bagsInsideMyBag += bagsInside.length;

    do {
        bagsInside = getBagContents(bagsInside, bags);
        bagsInsideMyBag = bagsInsideMyBag += bagsInside.length;
    } while (getBagContents(bagsInside, bags).length > 0);
    
    console.log('solutionPart1', parentBags.length);
    console.log('solutionPart2', bagsInsideMyBag);
}
