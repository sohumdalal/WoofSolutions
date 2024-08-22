
setBackdropURL("./docs/images/ocean.jpg")
setBackdropStyle("cover")

var crab = new Image()
crab.url = "./docs/images/crab.png"
crab.width = 150
crab.height = 100

var fish = new Image()
fish.url = "./docs/images/fish.png"
fish.width = 70
fish.height = 30
fish.x = randomX()
fish.y = randomY()

var score = 0;
var scoreText = new Text()
scoreText.text = () => "score: " + score
scoreText.size = 30
scoreText.y = 300
scoreText.color = "white"

var gameOver = new Image()
gameOver.url = "./docs/images/platformer-game-over.png"
gameOver.width = 200
gameOver.height = 90
gameOver.hide()

var timer = 30;
var timerText = new Text()
timerText.text = () => "timer: " + timer
timerText.size = 30
timerText.y = 250
timerText.color = "white"

every(1, 'second', () => {
  timer--;
})

forever(() => {
  if (keysDown.includes('UP')) {
    crab.y += 10
    crab.angle = 0
  }
  if (keysDown.includes('DOWN')) {
    crab.y -= 10
    crab.angle = 180
  }
  if (keysDown.includes('RIGHT')) {
    crab.x += 10
    crab.angle = -90
  }
  if (keysDown.includes('LEFT')) {
    crab.x -= 10
    crab.angle = 90
  }

  if (crab.touching(fish)) {
    score++;
    fish.x = randomX()
    fish.y = randomY()
  }

  if (timer === 0) {
    freeze()
    gameOver.show()
  }

  if (keysDown.includes('SPACE')) {
    timer = 30;
    score = 0;
    gameOver.hide()
    defrost()
  }

})
