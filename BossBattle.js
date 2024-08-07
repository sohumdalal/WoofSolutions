setBackdropURL("./docs/images/boss-backdrop.jpg")
setBackdropStyle("100% 100%")

//Sprites
var bossShip2 = new Image()
bossShip2.url = "./docs/images/boss-ship.png"
bossShip2.width = 35
bossShip2.height = 35

var enemy = new Image()
enemy.url = "./docs/images/boss-boss.png"
enemy.width = 150
enemy.height = 150
enemy.y = 200
enemy.rotationStyle = "NO ROTATE"

var healthText = new Text()
var health = 100
healthText.text = () => "Hero: " + health
healthText.x = 0
healthText.y = -150
healthText.color = "white";
healthText.size = 20

var enemyHealthText = new Text()
var enemyHealth = 1000
enemyHealthText.text = () => "Enemy: " + enemyHealth
enemyHealthText.x = 0
enemyHealthText.y = -170
enemyHealthText.color = "white";
enemyHealthText.size = 20
var speed = 1;

var youWin = new Image()
youWin.url = "./docs/images/platformer-you-win.png"
youWin.width = 110
youWin.height = 110
youWin.hide()

var gameOver2 = new Image()
gameOver2.url = "./docs/images/rr-gameover.png"
gameOver2.width = 140
gameOver2.height = 90
gameOver2.hide()

var warning = new Image()
warning.url = "./docs/images/boss-warning.jpg"
warning.width = 100
warning.height = 50
warning.x = 100
warning.y = -200
warning.hide()

var bossLaser = new Image()
bossLaser.url = "./docs/images/boss-blaser.png"
bossLaser.width = 50
bossLaser.height = 475
bossLaser.sendToBack()
bossLaser.hide()

var explosion = new Image()
explosion.url = "./docs/images/explosion.png"
explosion.width = 125
explosion.height = 125
explosion.hide();

var myexplosion = new Image()
myexplosion.url = "./docs/images/explosion.png"
myexplosion.width = 50
myexplosion.height = 50
myexplosion.hide();

var tomatoExplosion = new Image()
tomatoExplosion.url = "./docs/images/explosion.png"
tomatoExplosion.width = 50
tomatoExplosion.height = 50
tomatoExplosion.hide();

var bombExplosion = new Image()
bombExplosion.url = "./docs/images/explosion.png"
bombExplosion.width = 50
bombExplosion.height = 50
bombExplosion.hide();


//explosion + laser movements
forever(() => {
  explosion.x = enemy.x
  explosion.y = enemy.y
})
forever(() => {
  myexplosion.x = bossShip2.x
  myexplosion.y = bossShip2.y
})
forever(() => {
  bossLaser.x = enemy.x
  bossLaser.y = enemy.y - 250
})


//Hero movements on the key press
forever(() => {
  if (keysDown.includes('UP')) {
    bossShip2.y += 5
  }
  if (keysDown.includes('DOWN')) {
    bossShip2.y -= 5
  }
  if (keysDown.includes('RIGHT')) {
    bossShip2.x += 5
  }
  if (keysDown.includes('LEFT')) {
    bossShip2.x -= 5
  }
})


//laser cloning
var lasers = []
forever(() => {
  if (keysDown.includes('SPACE')) {
    var laser2 = new Image()
    laser2.url = "./docs/images/boss-laser.png"
    laser2.width = 10
    laser2.height = 10
    laser2.x = bossShip2.x
    laser2.y = bossShip2.y
    laser2.sendToBack();
    lasers.push(laser2);
  }
});


//laser shooting
  // if touching the enemy ship
  // if we decrease enemy health
  // if we touch the maxY
forever(() => {
  lasers.forEach(laser => {
    laser.y += 5;
    if (laser.touching(enemy)) {
      enemyHealth--
      laser.delete()
      lasers.remove(laser)
      explosion.show()
      after(0.5, 'second', () => {
        explosion.hide();
      })
      if (enemyHealth < 0) {
        youWin.show()
        setBackdropColor('white')
        freeze()
      }
    }
    if (laser.y === maxY) {
      laser.delete()
      lasers.remove(laser)
    }
  })
});


//Enemy ship movements back and forth on the screen
forever(() => {
  enemy.move(1)
  if (enemy.x > maxX) {
    enemy.angle = -180;
  }
  if (enemy.x < minX) {
    enemy.angle = 0;
  }
});


//bombs creation via clones
var bombs = [];
every(0.5, 'second', () => {
  var bomb = new Image()
  bomb.url = "./docs/images/boss-bomb.png"
  bomb.width = 20
  bomb.height = 20
  bomb.x = enemy.x
  bomb.y = enemy.y
  bomb.sendToBack()
  bomb.hide()
  bombs.push(bomb)
})


//bombs movement
  //if touching our hero ship
  //if our health is 0, then game over
forever(() => {
  bombs.forEach((bomb) => {
    bomb.show()
    bomb.y -= 1
    if (bomb.touching(bossShip2)) {
      health -= 2
      bombs.remove(bomb)
      bomb.delete()
      myexplosion.show()
      after(0.5, 'second', () => {
        myexplosion.hide();
      })
      if (health <= 0) {
        gameOver2.show()
        freeze()
      }
    }
    if(bomb.y === minY) {
      bombs.remove(bomb)
      bomb.delete()
    }
  })
})


//tomato creation via clones
var tomatoes = [];
every(3, 'second', () => {
  var tomato = new Image()
  tomato.url = "./docs/images/tomato-attack-tomato.png"
  tomato.width = 30
  tomato.height = 30
  tomato.x = enemy.x
  tomato.y = enemy.y
  tomato.sendToBack()
  tomato.hide()
  tomatoes.push(tomato)
})



//tomato movement
  //if touching our hero ship
  //if our health is 0, then game over
forever(() => {
  tomatoes.forEach((tomato) => {
    tomato.show()
    tomato.pointTowards(bossShip2)
    tomato.move(1)
    if (tomato.touching(bossShip2)) {
      health -= 2
      tomatoes.remove(tomato)
      tomato.delete()
      myexplosion.show()
      after(0.5, 'second', () => {
        myexplosion.hide();
      })
      if (health <= 0) {
        gameOver2.show()
        freeze()
      }
    }
  })
})


//Nested forEach. If our laser touches either a tomato or a bomb
forever(() => {
  lasers.forEach((laser) => {
    tomatoes.forEach((tomato) => {
      if (laser.touching(tomato)) {
        tomato.delete()
        tomatoes.remove(tomato)
        tomatoExplosion.x = tomato.x
        tomatoExplosion.y = tomato.y
        tomatoExplosion.show()
        after(0.5, 'second', () => {
          tomatoExplosion.hide()
        })
      }
    })
    bombs.forEach((bomb) => {
      if (laser.touching(bomb)) {
        bomb.delete()
        bombs.remove(bomb)
        bombExplosion.x = bomb.x
        bombExplosion.y = bomb.y
        bombExplosion.show()
        after(0.5, 'second', () => {
          bombExplosion.hide()
        })
      }
    })

  })
})


//controls super Laser, appearing at regular intervals
every(8, 'second', () => {
  warning.show()
  after(2, 'second', () => {
    warning.hide()
    bossLaser.show()
  })
  after(2.5, 'second', () => {
    bossLaser.hide()
  })
})

//If laser touches our hero, then game over
forever(() => {
  if (bossLaser.touching(bossShip2)) {
    health = 0
    gameOver2.show()
    freeze()
  }
})

 
