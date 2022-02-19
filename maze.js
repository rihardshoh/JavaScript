(function(){
  let mazeArray = [
      [1, -1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 0, 1]
  ];

  let currentPos = {row: 0, col: 1};

  let canvas = document.getElementById("myCanvas");

  function loopArray(){
    mazeArray.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
          drawRectangles(column, columnIndex, rowIndex);

      })
    })
  }

  function drawRectangles(value, column, row){
    let colors = canvas.getContext("2d");

      if(value === 1){
        colors.fillStyle = "#000000"; // walls
      }

      if(value === 0){
        colors.fillStyle = "#fc0000"; // walking path
      }
      if(value === -1)
      {
        colors.fillStyle = "#fc00ef"; // player
        currentPos.col = column;
        currentPos.row = row;
        console.log(currentPos)
      }

      colors.fillRect(column*40, row*40, 40, 40);
  }

  loopArray();

  function moveUp(){   
    console.log("upArrow");
    if ((mazeArray[currentPos.row-1][currentPos.col])===1){
      return;
    }
    mazeArray[currentPos.row][currentPos.col] = 0;
    mazeArray[currentPos.row-1][currentPos.col] = -1; 
    loopArray();
  }

  function moveDown(){
    console.log("downArrow");
    if ((mazeArray[currentPos.row+1][currentPos.col])===1){
      return;
    }
    mazeArray[currentPos.row][currentPos.col] = 0;
    mazeArray[currentPos.row+1][currentPos.col] = -1; 
    loopArray();
  }

  function moveLeft(){
    console.log("leftArrow");
    if ((mazeArray[currentPos.row][currentPos.col-1])===1){
      return;
    }
    mazeArray[currentPos.row][currentPos.col] = 0;
    mazeArray[currentPos.row][currentPos.col-1] = -1;
    loopArray();
  }

  function moveRight(){
    console.log("rightArrow");
    if ((mazeArray[currentPos.row][currentPos.col+1])===1 || mazeArray[3][5]){
      return;
    }
    mazeArray[currentPos.row][currentPos.col] = 0;
    mazeArray[currentPos.row][currentPos.col+1] = -1;
    loopArray();
  }
  
  function move(event)
  {
      switch(event.keyCode){
          case 37: 
          case 65:
              moveLeft();
              break;
          case 38: 
          case 87:
              moveUp();
              break;
          case 39: 
          case 68:
              moveRight();
              break;
          case 40: 
          case 83:
              moveDown();
              break;
          default:
              return;
      }
    checkForWin();
  }
  window.addEventListener("keydown", move);

  function checkForWin()
    {
      if(currentPos.row === 5 && currentPos.col === 4)
      {
        setTimeout(function() {alert("You won! Press F5 to restart!")}, 0);
        window.removeEventListener("keydown", move);
      }
    }
})();