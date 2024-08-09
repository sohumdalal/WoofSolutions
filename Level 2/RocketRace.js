setBackdropURL("./docs/images/boss-backdrop.jpg");
setBackdropStyle("cover");

let bossShip = new Image(); //use the rocket ship!!!
bossShip.url = "./docs/images/rocket.png";
bossShip.width = 120;
bossShip.height = 60;

//Smooth glide function, core to many games in Woof
forever(() => { 
    if (keysDown.includes('RIGHT')) {
      bossShip.turnRight(5); //bossship turn right
    }
    if (keysDown.includes('LEFT')) {
       bossShip.turnLeft(5); //bossship turn right
    }
    if (keysDown.includes('space')) {
       bossShip.move(5); //bossship turn right
    }
});


