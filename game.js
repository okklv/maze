//NEW<
const pos = {x: 1, y: 1};
let finished = false;
//>NEW
function startGame(){
    var maze = createMaze();
    setUserControls();
}

function setUserControls(){
    window.addEventListener("keyup", event => {
        let key = 0;
        switch(event.code) {
            case "KeyW":
            case "ArrowUp":
                key = 1;
                break;
            case "KeyD":
            case "ArrowRight": 
                key = 2;
                break;
            case "KeyS":
            case "ArrowDown":
                key = 3;
                break;
            case "KeyA":
            case "ArrowLeft":  
                key = 4; 
                break;
            default:
          }
        if(key != 0){
            move(key);
        }
      });
}


//NEW <
function move(input){
	if (finished)
		return 0; //Finish reached
	//1-UP 2-RIGHT 3-DOWN 4-LEFT
	let visited = false;
	let newPos = {x: pos.x, y: pos.y};
	
	switch(input){
		case 1:
			if (maze[newPos.x][--newPos.y] === 1)
				return -1;//Tried to run in the wall
			break;
		case 2:
			if (maze[++newPos.x][newPos.y] === 1)
				return -1;//Tried to run in the wall
			break;
		case 3:
			if (maze[newPos.x][++newPos.y] === 1)
				return -1;//Tried to run in the wall
			break;
		case 4:
			if (maze[--newPos.x][newPos.y] === 1)
				return -1;//Tried to run in the wall
			break;
	}
				
	drawBlock(pos.x, pos.y, 'blue');
	drawBlock(newPos.x, newPos.y, 'red');
	
	if (maze[newPos.x][newPos.y] === 3)
		finished = true;
	else if (maze[newPos.x][newPos.y] === 4)
		visited = true;
	
	maze[pos.x][pos.y] = 4; //Already visited
	maze[newPos.x][newPos.y] = 2;
	console.log(maze);
	
	pos.x = newPos.x; pos.y = newPos.y;
	
	if (visited) 
		return -2;
	
	return 1;//Move done
}//>NEW