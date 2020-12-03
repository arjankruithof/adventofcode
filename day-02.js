function runApp(input) {
    let goodPasswordsPart1 = 0;
    let goodPasswordsPart2 = 0;

    input.forEach(line => {
        const lineData = line.split(' ');

        if (lineData.length === 3) { 
            const character = lineData[1].charAt(0);
            const password = lineData[2];
            const between = lineData[0].split('-');
            let count = 0;

            for (let i = 0; i < password.length; i += 1) {
                if (password.charAt(i) === character) {
                    count += 1;
                }
            }

            if (count >= between[0] && count <= between[1]) {
                goodPasswordsPart1 += 1;
            }

            // part 2
            const firstPosition = parseInt(between[0], 10) - 1;
            const secondPosition = parseInt(between[1], 10) - 1;

            if ((password.charAt(firstPosition) === character && password.charAt(secondPosition) !== character) || (password.charAt(firstPosition) !== character && password.charAt(secondPosition) === character)) {
                goodPasswordsPart2 += 1;
            }
        }
    });

    console.log('solution part 1:', goodPasswordsPart1);
    console.log('solution part 2:', goodPasswordsPart2);
}
