setBackdropURL("./docs/images/ocean.jpg")
setBackdropStyle("cover")

var squid = new Image()
squid.url = "./docs/images/squidchase-squid.png"
squid.width = 100
squid.height = 115
squid.x = -50
squid.y = 350

var fish = new Image()
fish.url = "./docs/images/squidchase-fish.png"
fish.width = 50
fish.height = 50

var gameOver = new Text()
var seconds = 0
gameOver.text = () => "Game over! You surived " + seconds + " seconds"
gameOver.url = "./docs/images/platformer-game-over.png"
gameOver.hide()
gameOver.size = 20
gameOver.y = -200


var Seconds = new Text()
Seconds.text = () => "Time Elapsed: " + seconds
Seconds.size = 20
Seconds.y = -200

var speed = 1

forever(() => {
  fish.x = mouseX
  fish.y = mouseY
  squid.pointTowards(fish.x, fish.y)
  squid.move(speed)
  if (squid.touching(fish)) {
    Seconds.hide()
    gameOver.show()
    freeze()
  }
})

every(1, 'second', () => {
  seconds++
})

every(5, 'second', () => {
  speed += 1
})
