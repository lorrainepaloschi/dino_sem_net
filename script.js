const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false; //validação do pulo
let position = 0; //deixando no chão

function handleKeyUp(event){
    if(event.keyCode == 32){
        if(!isJumping){
            jump();
        }


        //console.log('pressionou espaço')   - teste
    }
}

function jump(){
 

    isJumping = true; //inicio do pulo

    let upInterval = setInterval(() =>{
        if(position >= 150){
            clearInterval(upInterval); //impede de subir infinitamente 

            //down
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval) //impede de descer infinitamente
                    isJumping = false; //fim do pulo
                }
                else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }

            }, 20);
        }
        else{
            //up
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;



    cactus.classList.add('cactus'); //para poder add style ao cacto
    background.appendChild(cactus);
    cactus.style.left = 1000 + 'px';

    let leftInterval = setInterval(() => {

        //se está a menos 60 é excluido, se não continua rodando
        if (cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus); //assim que o cacto sai da tela, ele é "excluido" evitando processos desnecessários
        }
        else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){ //Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';

        }
        else {
            cactusPosition -=10; //movimento para a esquerda
            cactus.style.left = cactusPosition + 'px';
        }
        
    }, 20)

    setTimeout(createCactus, randomTime); //recursividade pra gerar cactos
}

createCactus();
document.addEventListener('keyup', handleKeyUp );
