setBackdropURL("./docs/images/flappyback.png")
setBackdropStyle("cover")

var frog = new Image()
frog.url = "./docs/images/fly-frog.png"
frog.width = 120
frog.height = 90

var lineSprite1 = new Line()
lineSprite1.color = "pink"
lineSprite1.width = 10
lineSprite1.x = -100
lineSprite1.y = 100
lineSprite1.x1 = 10
lineSprite1.y1 = 20

forever(() => {
  if (keysDown.includes('UP')) {
    frog.y += 5
  }
  if (keysDown.includes('DOWN')) {
    frog.y -= 5
  }
  if (keysDown.includes('LEFT')) {
    frog.x -= 5
  }
  if (keysDown.includes('RIGHT')) {
    frog.x += 5
  }
})
