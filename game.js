import {getRandomInt as randomInt} from './random.js'
//GAME CONTROL
let prevTime=0;
let snakeSpeed=7;
const playGround=document.querySelector('.playground');



const game = (currTime) => {
    if (gameOver()){
        confirm('')
    }
    
    window.requestAnimationFrame(game);
    const timeElapsed=(currTime - prevTime)*(10**-3);
    if (timeElapsed< 1/snakeSpeed) return 

    
    prevTime=currTime;
    updateSnake();
    
    
    displaySnake(playGround);
    placeFood(playGround);
    addParts();

    

}


window.requestAnimationFrame(game);

//SNAKE CONTROL
const snakeMoves = [{x:1,y:1}]

const updateSnake= () => {
    eatFood();
    const directionInput=userDirections();
    for (let i = snakeMoves.length-2 ; i>=0 ; i--){
        snakeMoves[i+1] = {...snakeMoves[i]};

    }
    snakeMoves[0].x+=directionInput.x
    snakeMoves[0].y+=directionInput.y

}




const displaySnake=(playGround) => {
    playGround.innerHTML=''
    snakeMoves.forEach(coord => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=coord.y;
        snakeElement.style.gridColumnStart=coord.x;
        snakeElement.classList.add('snake');
        playGround.appendChild(snakeElement);
    })
}

//RULES CONTROL
const gameOver = () => {
    
    if (snakeMoves[0].x>21 || snakeMoves[0].x<1 ||snakeMoves[0].y>21 || snakeMoves[0].y<1){
        return true
    } 
    else if (onSnake( snakeMoves[0].x , snakeMoves[0].y , true ) ){
        return true
    }
    return false
}





let lastMove ={x:0 , y:0};
let directions = {x:0 , y:0} ;

window.addEventListener('keydown',e => {

            if (e.key==='ArrowRight')
               { 
                if (lastMove.x==0){directions = {x:1 , y:0}}
                } 
            if (e.key==='ArrowLeft')
            { 
                if (lastMove.x==0){directions = {x:-1, y:0} }
            }
            if (e.key==='ArrowUp'){
                if (lastMove.y==0){directions = {x:0 , y:-1}}
                }
            if (e.key==='ArrowDown')
            { 
                if (lastMove.y==0){directions = {x:0 , y:1}}
             }


})

const userDirections = () => {
    lastMove=directions;
    return directions;
}



const onSnake = (fx,fy,bool=false) => {
    return snakeMoves.some((coord,index) => {
        if (bool && index===0) return false
        return coord.x===fx && coord.y===fy
    })
}



const validatedFoodCoords = () => {
    let fnx=randomInt(1,21)
    let fny=randomInt(1,21)
    while (onSnake(fnx,fny) ){
        fnx=randomInt(1,21)
        fny=randomInt(1,21)
    }
    return {x:fnx,y:fny}
}


let foodCoord=validatedFoodCoords()

const placeFood=(playGround) => {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart=foodCoord.y;
    foodElement.style.gridColumnStart=foodCoord.x;
    foodElement.classList.add('food');
    playGround.appendChild(foodElement);

}

//GROWING SNAKE



const growth= 2 ;
let parts=0;
const addParts  = () => {
    
    if (snakeMoves[0].x===foodCoord.x && snakeMoves[0].y===foodCoord.y) {
        parts+=growth
        foodCoord=validatedFoodCoords()  
        snakeSpeed+=0.5;
        
    }
    
}

const eatFood = () => {
    
    for (let i = 0 ; i<parts ; i++ ){
        snakeMoves.push({...snakeMoves[snakeMoves.length-1]})        
    }
    parts=0

}