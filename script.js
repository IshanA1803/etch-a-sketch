// Function to make the grid
function gridMaker(slider){
    const gridSize=slider.value;
    const grid=document.querySelector(".grid");
    let blockHeight=grid.clientHeight/gridSize;
    //Remove all existing divs
    let child=grid.lastElementChild;
    while(child){
        grid.removeChild(child);
        child=grid.lastElementChild;
    }
    //Add new divs with pre calculated dimensions so empty divs can take up space
    for(let i=1;i<=gridSize*gridSize;++i){
        const block=document.createElement("div");
        block.style.height=blockHeight+'px';
        block.style.width=blockHeight+'px';
        block.classList.add("pixel");
        block.setAttribute("data-darkness","0");
        grid.appendChild(block);
    }
    //Display the dimensions over the slider 
    const sizeDisplay=document.querySelector("#number");
    sizeDisplay.textContent=gridSize+"x"+gridSize;
}



//Select or deselect a panel by toggling the active class.
const panelList=document.querySelectorAll(".panels");
panelList.forEach(function(panel){
    panel.addEventListener('click',()=>{
        if(panel.classList.contains('active')){
            panel.classList.remove('active');
        }else{
            panelList.forEach(panel=>panel.classList.remove('active'));
            panel.classList.toggle("active");
        }
    });
});



const slider=document.querySelector("#size");
//Call the gridMaker() to make the default Grid when the website loads.
gridMaker(slider);
//Call the Grid maker when slider input changes
slider.addEventListener('input',()=>{
    gridMaker(slider);
});

//Take value from color panel and give it to selectodColor variable;
let selectedColor="black";
const paintBrush=document.querySelector(".paint");
paintBrush.addEventListener("click",()=>{
    rainbowMode=0;
    pencilMode=0;
    const colorInput=document.querySelector("#colorInput");
    selectedColor=colorInput.value;
    colorInput.addEventListener('input',()=>{
        const circleDiv=document.querySelector(".custom-color");
        circleDiv.style.backgroundColor=colorInput.value;
        selectedColor=colorInput.value;
    });
})

//Function for Pencil mode
let pencilMode=0;
const pencil=document.querySelector(".pencil");
pencil.addEventListener('click',()=>{
    rainbowMode=0;
    pencilMode=1;
})

//Function for Rainbowmode.
let rainbowMode=0;
const rainbow=document.querySelector(".rainbow");
rainbow.addEventListener("click",()=>{
    pencilMode=0;
    rainbowMode=1;
})

//Function to generate random rgb value.
function randomRGB(){
    let red=Math.floor(Math.random()*256);
    let green=Math.floor(Math.random()*256);
    let blue=Math.floor(Math.random()*256);
    selectedColor="#"+red+green+blue;
}

//Function for Eraser.
const eraser=document.querySelector(".eraser");
eraser.addEventListener('click',()=>{
    rainbowMode=0;
    pencilMode=0;
    selectedColor="white";
})

//Change colors of pixels in grid when mouse events are fired.
let mouseDown=0;
const grid=document.querySelector(".grid");
grid.addEventListener("mousedown",function(e){
    mouseDown=1;
    if(rainbowMode===1){
        randomRGB();
    }else if(pencilMode==1){
        let darkCount=e.target.getAttribute("data-darkness");
        let currentCount=+darkCount+1;
        e.target.setAttribute("data-darkness",currentCount);
        let anchorValue=Math.min(10,currentCount)/10;
        selectedColor=`rgba(0,0,0,${anchorValue})`;
    }
    e.target.style.backgroundColor=selectedColor;
})
grid.addEventListener("mouseup",function(e){
    mouseDown=0;
})
grid.addEventListener("mouseover",function(e){
    if(mouseDown===1){
        if(rainbowMode===1){
            randomRGB();
        }else if(pencilMode==1){
            let darkCount=e.target.getAttribute("data-darkness");
            let currentCount=+darkCount+1;
            e.target.setAttribute("data-darkness",currentCount);
            let anchorValue=Math.min(10,currentCount)/10;
            selectedColor=`rgba(0,0,0,${anchorValue})`;
        }
        e.target.style.backgroundColor=selectedColor;
    }
})


//Click event on clear button sets background color of all divs to white.
const clearButton=document.querySelector("#clear");
clearButton.addEventListener('click',()=>{
    const pixels=document.querySelectorAll(".pixel");
    pixels.forEach((pixel)=>{
        pixel.style.backgroundColor="white";
        pixel.setAttribute("data-darkness","0");
    });
})
