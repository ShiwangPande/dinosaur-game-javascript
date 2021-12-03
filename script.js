const character = document.querySelector('.character');
const gameMap = document.querySelector('.game');
let isJumping = false;
let inGame = false;
let position = 0;

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 150){
            // Apex
            clearInterval(upInterval);

            // Going down
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    character.style.bottom = position + 'px';
                }
            }, 20);
        } else {
        // Going up
            position += 20;
            character.style.bottom = position + 'px';
        }
    }, 20);
}

function createObstacle(){
    const obstacle = document.createElement('div');
    let obstaclePosition = 1000;
    let randomTime = Math.random() * 10000;

    obstacle.classList.add('obstacle');
    obstacle.style.left = 1000 + 'px';
    gameMap.appendChild(obstacle);

    let leftInterval = setInterval(() => {
        if(obstaclePosition < -60){
            // Remove past obstacles
            clearInterval(leftInterval);
            gameMap.removeChild(obstacle);
        } else if (obstaclePosition > 0 && obstaclePosition < 90 && position < 90) {
            // Game Over

            // Remove additional obstacles
            for(let i = 1; i < document.querySelectorAll('.obstacle').length; i++){
                gameMap.removeChild(document.querySelectorAll('.obstacle')[i]);
            }
            
            clearInterval(leftInterval);
            leftInterval = null;
            clearTimeout(newObstacles);
            newObstacles = null;
            
            // Print the 'Game Over' screen
            if(inGame){
                inGame = false;
                gameMap.classList.add('over');
                let gameOver = document.createElement('h1');
                gameOver.innerHTML = 'Game Over';
                
                let retry = document.createElement('button');
                retry.classList.add('action');
                retry.innerHTML = 'Play Again?';
    
                gameMap.appendChild(gameOver);
                gameMap.appendChild(retry);
    
                document.querySelector('.action').addEventListener('click', startGame);
            }
        } else {
            // Move obstacles
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }
    }, 20);

    let newObstacles = setTimeout(createObstacle, randomTime);
}

// Remove splash screen and start a new game
function startGame(){
    inGame = true;
    if(gameMap.classList.contains('over')){
        gameMap.removeChild(document.querySelector('h1'));
        gameMap.removeChild(document.querySelector('.action'));

        let obstacle = document.querySelector('.obstacle');
        if(obstacle){
            gameMap.removeChild(obstacle);
        }
        gameMap.classList.remove('over');
    }
    createObstacle();
}

document.addEventListener('keydown', handleKeyUp);
document.querySelector('.action').addEventListener('click', startGame);
