const ramonDino = document.querySelector('.ramon-dino');
const background = document.querySelector('.background');
let isJumping = false;
let gameOver = false;
let position = 0;

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping)
            jump();
    }
}

function jump(){
    isJumping = true;
    let upInterval = setInterval(() => {
        if(position >= 300){
            clearInterval(upInterval);
            downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 20;
                ramonDino.style.bottom = position + 'px';
            }, 20);
        }else{
            position += 20;
            ramonDino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';

        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 50 && position < 50) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Ele me chamava de meu Dino :(</h1>';
            gameOver = true;
        }
        else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keyup', (event) => {
    if(gameOver){
        if(event.keyCode === 32){
            gameOver = false;
            window.location.reload();
        }
    }
});

document.addEventListener('keyup', handleKeyUp);