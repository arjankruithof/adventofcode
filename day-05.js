function getMiddle(min, max, value) {
        const middle = Math.floor((max - min - 1) / 2) + min;
      
        if (value === 'lower') {
          return [min, middle];
        } else {
          return [middle + 1, max];
        }
      }
      

function runApp(appData) {
    const input = appData.split('\n');
    let seatIds = [];
    // part 1
    input.forEach(boardingPass => {
        let rowMin = 0;
        let rowMax = 127;
        let lineMin = 0;
        let lineMax = 7;

        const instructions = boardingPass.split('');

        instructions.forEach(instruction => {
            switch(instruction) {
                case 'F':
                    rowMin = getMiddle(rowMin, rowMax, 'lower')[0];
                    rowMax = getMiddle(rowMin, rowMax, 'lower')[1];
                    break;
                case 'B':
                    rowMin = getMiddle(rowMin, rowMax, 'upper')[0];
                    rowMax = getMiddle(rowMin, rowMax, 'upper')[1];
                    break;
                case 'L':
                    lineMin = getMiddle(lineMin, lineMax, 'lower')[0];
                    lineMax = getMiddle(lineMin, lineMax, 'lower')[1];
                    
                    break;
                case 'R':
                    lineMin = getMiddle(lineMin, lineMax, 'upper')[0];
                    lineMax = getMiddle(lineMin, lineMax, 'upper')[1];
                    break;
                default:
                    console.log('no instruction found');
            }
        });

        const seatId = (rowMin * 8) + lineMin;
        seatIds.push(seatId);
    });

    console.log('solution part 1', Math.max(...seatIds));

    // part 2
    seatIds = seatIds.sort((a, b) => a - b);

    const minSeat = Math.min(...seatIds);
    const maxSeat = seatIds[seatIds.length - 1];

    for (let seat = minSeat; seat < maxSeat; seat += 1) {
        if (!seatIds.includes(seat)) {
            console.log('solution part 2', seat);
        }
  }
}