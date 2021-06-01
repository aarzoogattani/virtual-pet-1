//Create variables here
var dog,happyDogIMG,dogIMG,database , foodS,foodStock;

function preload()
{
	//load images here
  dogIMG = loadImage("images/dogIMG.png");
  happyDogIMG = loadImage("images/happyDogIMG.png");
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref("Foods");
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogIMG);
  dog.scale = 0.2;
  
}


function draw() {  

  background("pink");
  if(foodS!== undefined){
    textSize(20);
    fill("black");
    text("Notes: Press UP ARROW to feed CANDY milk",50,50);
    text("Food Remainig:" +foodS,150,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogIMG);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogIMG);
    }
    if(foodS === 0){
      foodS = 20;
    }

  drawSprites();

  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}


