//Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
const diametro = 17;
const raio = diametro / 2;

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variáveis da Raquete
let xMinhaRaquete = 5;
let yMinhaRaquete = 150;
const larguraRaquete = 10;
const alturaRaquete = 100;

let xRaqueteDoOponente = 585;
let yRaqueteDoOponente = 150;

let velocidadeYRaqueteOponente

let chanceDeErrar = 0;

//Variável de Colisão
let colide = false;

//Variáveis do Placar
let meusPontos = 0;
let pontosDoOponente = 0;

//Variáveis de som
let trilha;
let raquetada;
let ponto

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  bolinha();
  raquete(xMinhaRaquete, yMinhaRaquete);
  raquete(xRaqueteDoOponente, yRaqueteDoOponente);
  moverBolinha();
  verificarColisaoBorda();
  moverMinhaRaquete();
  //moverRaqueteDoOponente();
  moverRaqueteDoOponenteAuto();
  verificarColisaoRaquete(xMinhaRaquete, yMinhaRaquete);
  verificarColisaoRaquete(xRaqueteDoOponente, yRaqueteDoOponente);
  incluirPlacar();
  marcarPonto();
}

function bolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function raquete(x,y){
  rect(x, y, larguraRaquete, alturaRaquete);
}

function moverBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificarColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function moverMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yMinhaRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yMinhaRaquete += 10;
  }
} 

function moverRaqueteDoOponente(){
if (keyIsDown(87)){
    yRaqueteDoOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteDoOponente += 10;
  }
}   

function moverRaqueteDoOponenteAuto(){
  velocidadeYRaqueteOponente = yBolinha - yRaqueteDoOponente - larguraRaquete / 2 - 30;
  
  yRaqueteDoOponente += velocidadeYRaqueteOponente + chanceDeErrar;
  
  calcularChanceDeErrar();
}

function calcularChanceDeErrar(){
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40;
    }
  }
  else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}

function verificarColisaoRaquete(x, y){
  colide = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, diametro);
  if (colide){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluirPlacar(){
  stroke(color(255))
  textAlign(CENTER);
  textSize(16);
  fill(255,140,0);
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 25);
  fill(255,140,0);
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 450, 25);
  
}

function marcarPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}