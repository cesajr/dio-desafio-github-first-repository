let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //renderiza o que acontece no jogo e o trata em um plano 2D
let box = 32; //quer dizer que cada quadrado que forma a figura tem 32pixels
let snake = []; //array da cobrinha
//forma da cobrinha
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
//array food
let food = {
    //metodo que faz a criação de numeros aleatórios
    x: Math.floor(Math.random() * 15 + 1) * box, //vai ser gerado somente dentro da cena do jogo
    y: Math.floor(Math.random() * 15 + 1) * box, //vai ser gerado somente dentro da cena do jogo
}
//controlar os movimentos da cobrinha
let direction = "right";

// função criar background do game
function criarBG(){
    context.fillStyle = "yellow"; //definir a cor do bg
    context.fillRect(0, 0, 16*box, 16*box); //desenha o bg do jogo
}


//função criar cobrinha que será um array de coordenadas
function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "black"; //cor da cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box); //tamanho da cobrinha
    }

}

// função para criar as comidas para a cobrinha
function drawFood(){
    context.fillStyle = "red"; //cor da comida
    context.fillRect(food.x, food.y, box, box); //desenha o bg do jogo
}

//criar evento oque a cobrinha irá fazer quando o jogador clicar nos botões direcionais do teclado
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction ="left";
    if(event.keyCode == 38 && direction != "down") direction ="up";
    if(event.keyCode == 39 && direction != "left") direction ="right";
    if(event.keyCode == 40 && direction != "up") direction ="down";
}


//função iniciar jogo
function iniciarJogo(){
    //se a cobrinha sair da tela do jogo recebe o valor de zero e volta para a tela
    if(snake[0].x > 15 * box && direction == "right") snake[0].x= 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y= 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //condicional de gameOver quando a cobrinha se choca com ela mesma
    //se a posição zero (cabeça) se chocar com a posição 1 (corpo) ela vai acionar o alerta de gameOver e parar o jogo
    for(i = 1; i < snake.length; i++){ //o i começa com 1 pq é a partir do corpo da cobrinha a checagem
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }  

    //funções executadas ao iniciar o jogo
    criarBG();
    criarCobrinha();
    drawFood();

    //ponto de partida da cobrinha no início do jogo
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //coordenadas da cobrinha, condicionais de movimentação da cobrinha
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //condição para aumentar a cobrinha
    if(snakeX != food.x || snakeY != food.y){
        //pop para retirar ultimo elemento da array e criar uma nova cabeça para a cobrinha
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box; //vai ser gerado somente dentro da cena do jogo
        food.y = Math.floor(Math.random() * 15 + 1) * box; //vai ser gerado somente dentro da cena do jogo
    }
   

    let newHead= {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100); //atualização do frame do jogo a cada 100 milissegundos para não travar
