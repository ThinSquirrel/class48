var player,playerimg,enemy,enemygroup;
var canvas;
var backgroundimg,bg;
var coin,coinimg,coinGroup;
var platform,platformimg,platformGroup;
var gameState = "play";



var ground,groundimg;

function preload(){

  backgroundimg = loadImage("./assets/background.jpg");
  playerimg = loadImage("./assets/player.png");
  platformimg = loadImage("./assets/platform.png");
  coinimg = loadAnimation("./assets/coin.png")


  
}

function setup(){

  canvas = createCanvas(windowWidth,windowHeight);

  bg = createSprite(width/2,height/2,width,height);
  bg.addImage(backgroundimg);
  bg.velocityX=-2
  

  ground = createSprite(width/2,800,2000,100);
  ground.visible = false;

  player = createSprite(50,500,100,100);
  player.addImage(playerimg);
  player.scale = 0.25;
  player.setCollider("circle",0,0,150);
  player.debug = false;

  


  


  
  
  
  platformGroup = new Group();
  coinGroup = new Group();


}

function draw(){
  background(255);

  if(bg.x<width-10){
    bg.x=bg.width/2
  }
  
  var platformpositions = [
    {x: 200,y:400,image: platformimg},
    {x: 1400,y:400,image: platformimg},
    {x: 800,y:200,image: platformimg}]


  var coinPositions = [
    {x: 200 ,y: 300,image: coinimg},
    {x: 1400 ,y: 300,image: coinimg},
    {x: 800 ,y: 100,image: coinimg}
  ]

  
  
    NewSprites(coinGroup,coinPositions.length,coinimg,0.2,coinPositions)
    NewSprites(platformGroup,platformpositions.length,platformimg,0.21,platformpositions)
    
    
    if(player.velocity.y >= 10){

      player.velocity.y = [];
    }

  if(keyDown(UP_ARROW)    ){
      player.position.y -= 3;
      
    
     
    }

    if(keyDown(RIGHT_ARROW)){

      player.position.x += 5;
     
    }

    if(keyDown(LEFT_ARROW)){

      player.position.x -= 5;
   
    }
    if(keyDown(DOWN_ARROW)){

      player.position.y += 5;
     
    }

    platformGroup.collide(player, removeplatform)


    //if(platformGroup.isTouching(player)){

      
    //}

    //if(player.position.y <= 130){

      //player.velocity.y += 4;
   // }

    



    

   //  player.velocity.y += 1;


 
    

  
  player.collide(ground);
  player.collide(platformGroup);
  
 


  drawSprites();
}


function NewSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []){


  for(var i = 0; i < numberOfSprites; i++){

    var x,y;

    if(positions.length > 0){

      x = positions[i].x;
      y = positions[i].y;
      
      spriteImage = positions[i].image;

    }

    var sprite = createSprite(x,y);
    sprite.addAnimation("sprite",spriteImage);

    sprite.scale = scale;
    spriteGroup.add(sprite);
    sprite.setCollider("rectangle",0,0,350,40);
    sprite.debug = false;
    
    if(keyDown("a")){
      sprite.position.x+=10
    }
    
    player.depth=sprite.depth
    sprite.depth=sprite.depth-3
    
    
    
   
    
    
   
  

    
  }

 

  
}




function removeplatform(platform){

  platform.remove();
}



