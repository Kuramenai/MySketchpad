const grid = document.querySelector('.grid_container');

let startDrawing = false;
let cell_color = 'orange'


//When the user clicks on a cell then start hovering on the whole grid
//while maintaining the mouse left click button pressed down
//All the "hovered" cells background color will change to the selected one
//isStartDrawing is used to identify the start of a drawing
function isStartDrawing(event){

    if(event.button == 0){
        currentCell = event.target
        currentCell.style.background = cell_color
        startDrawing = true
    
    }

}

//While we use isEndDrawing to end it when the mouse left click button is released
function isEndDrawing(event){

    if(event.button == 0){
            
        startDrawing = false
    
    }

}

//"Drawing while the mouse left click button is pressed down"
function draw(event){
    if(startDrawing){ 
        currentCell = event.target
        currentCell.style.background = cell_color
    }
   
}


//Generate the grid cells and add the necessary event listeners
for(let i = 0; i < 256; i++){
    
    grid_cell = document.createElement('div');

    grid_cell.classList.add('grid_square');

    grid_cell.addEventListener('mousedown',isStartDrawing)
    grid_cell.addEventListener('mouseenter',draw);
    grid_cell.addEventListener('mouseup',isEndDrawing);

    grid.appendChild(grid_cell);
}

