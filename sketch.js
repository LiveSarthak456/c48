const PLAY = 1;
const END= 0;
var gameState = PLAY;


var bgImage;
var plane, planeImage;
var enemyPlane,enemyPlaneGroup, enemyplaneImage;
var score=0;
var gameover, restart;
var restartImage, gameoverImage;




function preload(){
bgImage = loadImage("bg.jpg");
planeImage = loadImage("plane.png");
enemyplaneImage = loadImage("enemyplane.png");
restartImage = loadImage("restartImage.png");
gameoverImage = loadImage("gameover.png");
}



function setup(){
  
createCanvas(windowWidth, windowHeight);

plane = createSprite(50,180,20,20);
plane.addImage(planeImage);
plane.scale = 0.8;

enemyPlaneGroup = new Group;

gameover = createSprite(750,400);
gameover.visible = false;
gameover.addImage(gameoverImage);
gameover.scale = 0.4

restart = createSprite(1300,400);
restart.visible = false;
restart.addImage(restartImage);
restart.scale = 0.3
}

function draw(){
background(bgImage);

stroke("blue");
fill("white");
textSize(50);
text("Score: "+ score,30,50);


if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    plane.velocityX = -(6 + 3*score/100);

    plane.y = mouseY;
    plane.x = mouseX;

    spawnEnemyPlanes();

if (enemyPlaneGroup.isTouching(plane)){
   gameState = 0;
   

}

}

else {
plane.velocityX = 0;
enemyPlaneGroup.setVelocityXEach(0);
gameover.visible = true;
restart.visible = true;
enemyPlaneGroup.setLifetimeEach(-1);
}

if (mousePressedOver(restart)){
    enemyPlaneGroup.destroyEach();
    gameover.visible = false;
    restart.visible = false;
    score = 0;
    gameState = 1;
    
    }

drawSprites();


}
function spawnEnemyPlanes(){

if(frameCount%100 == 0){

enemyPlane = createSprite(1500,15,20,20);
enemyPlane.addImage(enemyplaneImage);
enemyPlane.velocityX = -15;
enemyPlane.scale = 0.2;
enemyPlane.setLifetime = 100;



enemyPlane.y = random(10,800);

enemyPlaneGroup.add(enemyPlane);
}
}