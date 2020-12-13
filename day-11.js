const fs = require('fs');
const path = require('path');

const appData = fs.readFileSync(path.resolve(__dirname, 'day-11.txt'), 'utf8');
let input = appData.split('\n').map(function (item) {
    return item.replace(/L/g, '#').split('');
    // return item.split('');
});

function changeTo(currentValue, floorPlan, row, column, maxAdjacents) {
    if (currentValue === '.') {
        return '.';
    }

    // const rows = floorPlan.length;
    // const columns = floorPlan[0].length;

    const rows = 98;
    const columns = 91;

    let adjacents = 0;
    let canSee = 0;

    if (maxAdjacents === 4) {
        for (let i = -1; i <= 1; i += 1) {
            for (let j = -1; j <= 1; j += 1) {
                if (
                    (i != 0 || j != 0)
                    && row + i >= 0
                    && row + i < rows
                    && column + j >= 0
                    && column + j < columns
                    && floorPlan[row + i][column + j] === '#') {
                        adjacents += 1;
                }
            }
        }
    }

    if (maxAdjacents === 5) {
        const directions = [
            {x: 1, y:0},
            {x: -1, y:0},
            {x: 1, y:1},
            {x: -1, y:-1},
            {x: 1, y:-1},
            {x: -1, y:1},
            {x: 0, y:1},
            {x: 0, y:-1},
        ];

        directions.forEach(direction => {
            let x = column + direction.x;
            let y = row + direction.y;
    
            while (x >= 0 && y >= 0 && x < columns && y < rows) {
                if (floorPlan[y][x] === '#') {
                    adjacents += 1;
                    break;
                }
                if (floorPlan[y][x] === 'L') {
                    break;
                }

                x += direction.x;
                y += direction.y;
            }
        });
    }

    if (currentValue === 'L' && adjacents === 0) {
        return '#';
    }

    if (currentValue === '#' && adjacents >= maxAdjacents) {
        return 'L';
    }

    return currentValue;
}

loop(input, 'part1');

loop(input, 'part2');

function loop(array, part) {
    const maxAdjacents = part === 'part1' ? 4 : 5;
    const currentFloorPlan = array;
    let changes = false;
    let updatedFloorPlan = [];

    currentFloorPlan.forEach((row, rowIndex) => {
        updatedFloorPlan.push([]);
        row.forEach((column, columnIndex) => {
            const currentValue = column;
            const newValue = changeTo(currentValue, currentFloorPlan, rowIndex, columnIndex, maxAdjacents);
            updatedFloorPlan[rowIndex].push(newValue);

            if (newValue !== currentValue) {
                changes = true;
            }
        });
    });

    if (changes === true) {
        loop(updatedFloorPlan, part);
        return;
    } else {
        let result = 0;
        updatedFloorPlan.forEach(row => {
            row.forEach(column => {
                if (column === '#') {
                    result += 1;
                }
            });
        });

        if (part === 'part1') {
            console.log('Solution part 1', result);
        } else {
            console.log('Solution part 2', result);
        }
    }
}