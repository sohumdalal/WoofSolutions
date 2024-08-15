var Terrain = []
setBackdropURL("./docs/images/platformer-backdrop1.png")
setBackdropStyle("cover")
var player = new Image()
player.url = "./docs/images/platformer-player.png"
player.width = 50
player.height = 50
player.x = minX + 50
player.y = 0

var groundLine = new Line()
groundLine.color = "gray"
groundLine.width = 2
groundLine.x = minX
groundLine.y = minY + 5
groundLine.x1 = maxX
groundLine.y1 = minY + 5
Terrain.push(groundLine);

var rectangleSprite1 = new Rectangle()
rectangleSprite1.width = 50
rectangleSprite1.height = 80
rectangleSprite1.color = "white"
rectangleSprite1.x = 50
rectangleSprite1.y = minY + 50
Terrain.push(rectangleSprite1)

var rectangleSprite2 = new Rectangle()
rectangleSprite2.width = 150
rectangleSprite2.height = 55
rectangleSprite2.color = "white"
rectangleSprite2.x = rectangleSprite1.x - 400
rectangleSprite2.y = minY + 40
Terrain.push(rectangleSprite2)


forever(() => {
  player.y -= 5
  Terrain.forEach(rectangleSprite => {
    if (player.touching(rectangleSprite)) {
      player.y += 5
    }
  })
  if (keysDown.includes('UP')) {
    player.y += 10
  }
  if (keysDown.includes('LEFT')) {
    player.setRotationStyle("ROTATE LEFT RIGHT")
    player.angle = LEFT
    player.x -= 5
    Terrain.forEach(rectangleSprite => {
      if (player.touching(rectangleSprite)) {
        player.x += 5
      }
    })
  }
  if (keysDown.includes('RIGHT')) {
    player.setRotationStyle("ROTATE LEFT RIGHT")
    player.angle = RIGHT
    player.x += 5
    Terrain.forEach(rectangleSprite => {
      if (player.touching(rectangleSprite)) {
        player.x -= 5
      }
    })
  }
})
