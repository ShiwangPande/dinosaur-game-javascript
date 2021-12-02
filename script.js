const character = document.querySelector('.character');
const gameMap = document.querySelector('.game');
let isJumping = false;

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    let position = 0;
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
    obstacle.classList.add('obstacle');
    obstacle.style.left = 1000 + 'px';
    gameMap.appendChild(obstacle);
}

createObstacle();
document.addEventListener('keyup', handleKeyUp);