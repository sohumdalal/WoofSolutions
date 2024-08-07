setBackdropColor("white")

var rectangleSprite1 = new Rectangle()
rectangleSprite1.width = 60
rectangleSprite1.height = 60
rectangleSprite1.color = "green"
rectangleSprite1.x = 0
rectangleSprite1.y = -205

var apple = new Image()
apple.url = "./docs/images/apple.png"
apple.width = 40
apple.height = 40
apple.x = 0
apple.y = 200

forever(() => {
  if (keysDown.includes('RIGHT')) {
    rectangleSprite1.x += 10
  }
  if (keysDown.includes('LEFT')) {
    rectangleSprite1.x -= 10
  }
})
