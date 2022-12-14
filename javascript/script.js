
const grid_container = document.querySelector('.grid_container');
let grid = document.querySelector('.grid');

let startDrawing = false;
let cell_color = "#333333";


let change_grid_size_slider = document.querySelector('.change-grid-size-slider');
change_grid_size_slider.oninput = getGridSize

let grid_size = 480;
let grid_rows_columns = 16;

const change_color_btn = document.querySelector('.change-color-btn');
change_color_btn.oninput = changePenColor

const grid_size_info = document.querySelector('.grid-size-info');

const change_drawing_mode_radiobtn1 = document.querySelector('.change-drawing-mode-radiobtn1');
const change_drawing_mode_radiobtn2 = document.querySelector('.change-drawing-mode-radiobtn2');

const eraser_btn = document.querySelector('.eraser-btn');
eraser_btn.onclick = setEraseMode;

let eraseMode = false;


//When the user clicks on a cell then start hovering on the whole grid
//while maintaining the mouse left click button pressed down
//All the "hovered" cells background color will change to the selected one

//isStartDrawing is used to identify the start of a drawing
function isStartDrawing(event){

    if(event.button == 0){

        startDrawing = true;
        currentCell = event.target;

        if(eraseMode){
            currentCell.style.background = 'whitesmoke'
        }

        //Normal Mode
        else if(change_drawing_mode_radiobtn1.checked){
            currentCell.style.background = cell_color;
        }

        //Rainbow Mode
        else if (change_drawing_mode_radiobtn2.checked){

            random_red_value = Math.round(255*(Math.random()));
            random_green_value = Math.round(255*(Math.random()));
            random_blue_value = Math.round(255*(Math.random()))

            currentCell.style.background = `rgb(${random_red_value},
                                                ${random_green_value},
                                                ${random_blue_value})`;
        }
    
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

        currentCell = event.target;

        if(eraseMode){
            currentCell.style.background = 'whitesmoke'
        }

        //Normal Mode
        else if(change_drawing_mode_radiobtn1.checked){
        
            currentCell.style.background = cell_color;
        }

        //Rainbow Mode
        else if (change_drawing_mode_radiobtn2.checked){

            random_red_value = Math.round(255*(Math.random()));
            random_green_value = Math.round(255*(Math.random()));
            random_blue_value = Math.round(255*(Math.random()));

            currentCell.style.background = `rgb(${random_red_value},
                                                ${random_green_value},
                                                ${random_blue_value})`;

        }

    }
   
}

//Generate the grid cells and add the necessary event listeners at  website launch 
function createGridCells()
{
       
    for(let i = 0; i < grid_rows_columns*grid_rows_columns ; i++){
    
        grid_cell = document.createElement('div');
    
        grid_cell.classList.add('grid_square');
    
        grid_cell.addEventListener('mousedown',isStartDrawing)
        grid_cell.addEventListener('mouseenter',draw);
        grid_cell.addEventListener('mouseup',isEndDrawing);

    
        grid.appendChild(grid_cell);
    }
    

}

//Create a new grid with size chosen by user 
function createNewGrid(){

    let cell_pixel_size = grid_size/grid_rows_columns;
    const grid = document.createElement('div');

    grid.setAttribute('style',  `display:grid;
                                 grid-template-columns:repeat(${grid_rows_columns},${cell_pixel_size}px);\
                                 grid-template-rows:repeat(${grid_rows_columns},${cell_pixel_size}px);`);

    for(let i = 0; i < grid_rows_columns*grid_rows_columns ; i++){
    
        grid_cell = document.createElement('div');
    
        grid_cell.classList.add('grid_square');
    
        grid_cell.addEventListener('mousedown',isStartDrawing)
        grid_cell.addEventListener('mouseenter',draw);
        grid_cell.addEventListener('mouseup',isEndDrawing);
    
        grid.appendChild(grid_cell);
    }
    
    return grid;

}

function updateGrid(){

    new_grid = createNewGrid();
    grid.remove()
    grid_container.appendChild(new_grid)
    grid_size_info.textContent = `${grid_rows_columns}x${grid_rows_columns}`
    grid = new_grid
    
}


function getGridSize(){
    grid_rows_columns = this.value
    updateGrid()
}

function changePenColor(){
    cell_color = this.value
}

function setEraseMode(){
    if(this.classList.contains("active")){
        this.classList.remove("active");
        eraseMode=false;
    }
    else{
        this.classList.add("active");
        eraseMode=true;
    }
}


createGridCells()






