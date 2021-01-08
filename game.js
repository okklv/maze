const length = 85;
let canvas = null;
let ctx = null;
let maze = [];
function startGame(){
    canvas = document.getElementById('mazeCanvas');
    ctx = canvas.getContext("2d");
    canvas.width = length * blockSize;
    canvas.height = length * blockSize;
    maze = createMaze(canvas, ctx, length);
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
          }
        if(key != 0){
            move(key);
        }
      });
}

