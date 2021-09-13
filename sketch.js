var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var fedTime;

//crea aquí las variables feed y lastFed 
var lastFed,feed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro
  feed=createButton("Alimentar Al Perro");
  feed.position(650,95);
  //feed.mousePressed(feeds);

  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);


  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function (data){
    lastFed = data.val();
  })
  
  fill(255,255,255);
  textSize(15);
 
  //escribe el código para mostrar el texto lastFed time aquí
  if(lastFed >= 12){
    text("Ultima hora en que se alimento: " + lastFed%12 + "PM\n\n( ͡• ‿‿ ͡•)",150,30);
    }
  else if(lastFed == 0){
      text("Ultima hora en que se alimento: 12AM\n\n( ͡• ‿‿ ͡•)",150,30);
    }
  else{
    text("Ultima hora en que se alimento: " + lastFed + "AM\n\n( ͡• ‿‿ ͡•)",150,30);
  }
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }
  else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
}

//función para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
