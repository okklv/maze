const blockSize = 10;
let previousLocations = [];

function createMaze() {
    for (let i = 0; i < length; i++) {
        maze[i] = [];

        for (let j = 0; j < length; j++) {
            maze[i][j] = 1;
        }
    }

    const mazeLocation = {x: 1, y: 1};
    previousLocations.push(mazeLocation);

    generateMaze(mazeLocation);
    makeStartAndExit();
    drawMaze();
    return maze;
}

function makeStartAndExit(){
    //Start
    drawBlock(1, 1, 'red');
    maze[1][1] = 2;

    //Exit
    xEnd = length - 2;

    drawBlock(xEnd, length - 2, '#41D329');
    maze[xEnd][length - 2] = 3;
    while(maze[xEnd][length - 3] === 1 && maze[xEnd - 1][length - 2] === 1){
        xEnd--;
        maze[xEnd][length - 2] = 0;
    }
}

function generateMaze(mazeLocation) {
    const availableDirections = getAvailableDirections(mazeLocation);

    if (availableDirections.length > 0) {
        const rnd = Math.floor(Math.random() * availableDirections.length);
        const randomDirection = availableDirections[rnd];

        previousLocations.push(randomDirection);
        maze[randomDirection.x][randomDirection.y] = 0;
        //Aizkomentēt ja grib noņemt animāciju
        // setTimeout(() => { drawBlock(randomDirection.y, randomDirection.x) }, 1);

        generateMaze(randomDirection);
    } else {
        //previousLocations.pop();
        previousLocations.shift();

        if (previousLocations.length != 0) {
            //generateMaze(previousLocations.length - 1);
            generateMaze(previousLocations[0]);
        }
    }
};

function getAvailableDirections(mazeLocation) {
    const result = [];
    const potentialLocations = [{x: mazeLocation.x + 1}, {y: mazeLocation.y + 1}, {x: mazeLocation.x - 1}, {y: mazeLocation.y - 1}];

    for (const pLocation of potentialLocations) {
        const potentialLocation = Object.assign({x: mazeLocation.x, y: mazeLocation.y}, pLocation);

        if (isAvailable(potentialLocation)) {
            result.push(potentialLocation);
        }
    }

    return result;
};

function isAvailable(mazeLocation) {
    if (maze[mazeLocation.x][mazeLocation.y] == 0) {
        return false;
    }

    let unavailablePositions = 0;
    let positions = [
        () => mazeLocation.x + 1 >= length || maze[mazeLocation.x + 1][mazeLocation.y] === 0,
        () => mazeLocation.y + 1 >= length || maze[mazeLocation.x][mazeLocation.y + 1] === 0,
        () => mazeLocation.x - 1 < 0 || maze[mazeLocation.x - 1][mazeLocation.y] === 0,
        () => mazeLocation.y - 1 < 0 || maze[mazeLocation.x][mazeLocation.y - 1] === 0,

        () => mazeLocation.x + 1 >= length || mazeLocation.y + 1 >= length || maze[mazeLocation.x + 1][mazeLocation.y + 1] === 0,
        () => mazeLocation.x + 1 >= length || mazeLocation.y - 1 < 0 || maze[mazeLocation.x + 1][mazeLocation.y - 1] === 0,
        () => mazeLocation.x - 1 < 0 || mazeLocation.y - 1 < 0 || maze[mazeLocation.x - 1][mazeLocation.y - 1] === 0,
        () => mazeLocation.x - 1 < 0 || mazeLocation.y + 1 >= length || maze[mazeLocation.x - 1][mazeLocation.y + 1] === 0
    ];

    for (let i = 0; unavailablePositions <= 2 && positions.length > i; i++) {
        if (positions[i]()) {
            unavailablePositions++;
        }
    }

    return unavailablePositions <= 2;
}

//Ja grib noņemt animācīju
function drawMaze() {
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (maze[j][i] == 0) {
                drawBlock(j, i)
            }
        }
    }
}

function drawBlock(x, y, color = '#DBDAD8') {
    ctx.fillStyle = color;
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}