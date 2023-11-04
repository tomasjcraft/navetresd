var espacio,nave,cash,diamonds,jwellery,sword,balas;
var espacioImg,naveImg,cashImg,diamondsImg,jwelleryImg,swordImg,balasImg,menuImg,menu1Img,salidaImg,inforImg,infor1Img;
var treasureCollection = 0;
var distancia 
var cashG,diamondsG,jwelleryG,swordGroup,balasGroup;
var menu,menu1,salida,salida1,infor,infor1;
var texts=[]
//Game States
var PLAY=1;
var PAUSA=-1;
var END=0;
var gameState=1;

function preload(){
  espacioImg = loadImage("espacio.png");
  naveImg = loadImage("nave_espacial_activada.png");
  cashImg = loadImage("moneda.png");
  diamondsImg = loadImage("pordos.png");
  jwelleryImg = loadImage("por3.png");
  swordImg = loadImage("meteorito.png");
  balasImg = loadImage("bala.png")
  endImg =loadAnimation("gameOver.png");
  inforImg = loadImage("logo2.png")
  infor1Img = loadImage("san_sebastian.png")
  menuImg = loadImage("menu.png")
  menu1Img = loadImage("menu1.png")
  salidaImg = loadImage("x.png")
}

function setup(){
  
//crear el canvas y ajustar el tamaño de la ventana para que sea compatible con el dispositivo 
canvas = createCanvas(1000,800);
espacio=createSprite(width/2,200);
espacio.addImage(espacioImg);
espacio.velocityY = 4;

infor = createSprite(width/1.2,height-700,20,20)
infor.addImage(inforImg)
infor.scale=-0.2

infor1 = createSprite(width/2,height-400,20,20)
infor1.addImage(infor1Img)
infor1.scale=1.0
infor1.visible=false

menu = createSprite(width/7,height-700,20,20)
menu.addImage(menuImg)
menu.scale=0.3

menu1 = createSprite(width/2,height-400,20,20)
menu1.addImage(menu1Img)
menu1.scale=1.0
menu1.visible=false

salida = createSprite(width/1.4,height-650,20,20)
salida.addImage(salidaImg)
salida.scale=0.6
salida.visible=false

salida1 = createSprite(width/1.2,height-530,20,20)
salida1.addImage(salidaImg)
salida1.scale=0.6
salida1.visible=false
//crear sprite boy corriendo
nave = createSprite(width/2,height-70,20,20);
nave.addAnimation("SahilRunning",naveImg);
nave.scale=2.0;
  
//suelo.y=suelo.width/2
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
balasGroup=new Group()
distancia = 0;

nave.setCollider("circle",0,0,20)
nave.debug=false



}

function draw() {
  
  if(gameState===PLAY){
  background(0);
  nave.x = World.mouseX;
  


  distancia=distancia+Math.round(frameCount/50)
  if (espacio.y>1000){

    espacio.y=espacio.width/2

  } 
 
  for(var i=0;i<texts.length;i++){
    text(texts[i], i);
  }

  edges= createEdgeSprites();
  nave.collide(edges);
  
  //código para reiniciar el fondo

    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createBalas();

    if (cashG.isTouching(nave)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(nave)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(nave)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(nave)) {
        gameState=END;
        
        nave.addAnimation("SahilRunning",endImg);
        nave.x=width/2;
        nave.y=height/2;
        nave.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  if (espacio){

  }
  if (balasGroup.collide(swordGroup)){
    
    
  }
  if(mousePressedOver(menu)){
    menu1.visible=true
    salida.visible=true 
    swordGroup.visible=false
    cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
  gameState=PAUSA
     }
 
 
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Dinero: "+ treasureCollection,width-150,200);
  textSize(20);
  fill(255);
  text("distancia: "+ distancia,width-150,250);
  
  if(mousePressedOver(infor)){
    infor1.visible=true
  salida1.visible=true 
  swordGroup.visible=false
  cashG.destroyEach();
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
      swordGroup.destroyEach();
      cashG.setVelocityYEach(0);
      diamondsG.setVelocityYEach(0);
      jwelleryG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
      gameState=PAUSA
}

  }
  if(gameState===PAUSA){

    text("juego en pausa",200,200)
    if(mousePressedOver(salida)){
      reset1()
    }
    if(mousePressedOver(salida1)){
      reset1()
    }
  }
}


function createCash() {
  if (World.frameCount % 200 == 0) {
   //Modificar las posiciones del dinero 
    var cash = createSprite(Math.round(random(50, 950),40, 20, 20));
    cash.addImage(cashImg);
  cash.scale=1.0;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
       // Modificar las posiciones de los diamantes 

    var diamonds = createSprite(Math.round(random(50, 950),40, 20, 20));
    diamonds.addImage(diamondsImg);
  diamonds.scale=1.0;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    //Modificar las posiciones de las joyas para hacerlas aparecer en el tamaño de pantaña disponible.

    var jwellery = createSprite(Math.round(random(50, 950),40, 20, 20));
    jwellery.addImage(jwelleryImg);
  jwellery.scale=1.0;                                                                                                                                                                                                                                                                                                                                                                      ;
  jwellery.velocityY = 5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 30 == 0) {
    //Modificar las prosiciones de la espada para hacerla aparecer en el tamaño de pantaña disponible. 

    var sword = createSprite(Math.round(random(50, 950),40, 20, 20));
    sword.addImage(swordImg);
  sword.scale=1.0;
  sword.velocityY = 6;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}

function createBalas(){
  if(keyDown(DOWN_ARROW)){
    var balas = createSprite(nave.x, nave.y, 20, 20)
    balas.addImage(balasImg)
    balas.scale=0.5;
    balas.velocityY = -6;
    balas.lifetime = 200;
    balasGroup.add(balas)
  }
}

function reset1(){
  gameState=PLAY;
    menu1.visible=false
    salida.visible=false
    infor1.visible=false
    salida1.visible=false
    
    
  }