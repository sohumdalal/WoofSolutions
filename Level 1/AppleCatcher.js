setBackdropURL("./docs/images/war-backdrop.png")
setBackdropStyle("cover")

var rectangleSprite1 = new Rectangle()
rectangleSprite1.width = 60
rectangleSprite1.height = 60
rectangleSprite1.color = "green"
rectangleSprite1.x = 0
rectangleSprite1.y = -250

var apple = new Image()
apple.url = "./docs/images/apple.png"
apple.width = 40
apple.height = 40
apple.x = 0
apple.y = 300

var score = 0;
var scoreText = new Text()
scoreText.text = () => "score: " + score
scoreText.x = 0
scoreText.y = 300
scoreText.size = 30

var level = 0;
var levelText = new Text()
levelText.text = () => "level: " + level
levelText.x = 0
levelText.y = 250
levelText.size = 30

var gameOver = new Image()
gameOver.url = "./docs/images/platformer-game-over.png"
gameOver.width = 100
gameOver.height = 90
gameOver.hide();

let speed = 5;

forever(() => {

  apple.y -= speed

  if (keysDown.includes('RIGHT')) {
    rectangleSprite1.x += 10
  }
  if (keysDown.includes('LEFT')) {
    rectangleSprite1.x -= 10
  }
  if (apple.touching(rectangleSprite1)) {
    score++
    apple.x = randomX()
    apple.y = 300
  }
  if (score === 5) {
    score = 0;
    level++
    speed += 3
  }
  if (apple.y === -250) {
    freeze()
    gameOver.show();
  }

})
