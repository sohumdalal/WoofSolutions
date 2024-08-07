setBackdropURL("./docs/images/boss-backdrop.jpg")
setBackdropStyle("cover")

//Sprites
let gator = new Image()
gator.url = "./docs/images/river-gator.png"
gator.width = 100
gator.height = 100
gator.hide()

var speechBubble = new Image()
speechBubble.url = "./docs/images/speechBubble.png"
speechBubble.width = 150
speechBubble.height = 75
speechBubble.hide()

const gatorText = new Text();
gatorText.text = () => "See you Later, Alligator!"
gatorText.size = 10
speechBubble.x = 75
speechBubble.y = 65
gatorText.x = speechBubble.x
gatorText.y = speechBubble.y + 10

let circle = new Circle()
circle.radius = 30
circle.color = "#7FD1B9"
circle.score = 0;
circle.timer = 2;

let scoreText = new Text()
scoreText.text = () => "score: " + circle.score
scoreText.size = 30
scoreText.color = 'white'
scoreText.x = 200
scoreText.y = 200

let timerText = new Text()
timerText.text = () => "timer: " + circle.timer
timerText.size = 30
timerText.color = 'white'
timerText.x = 200
timerText.y = 250

//Core Mousedown functionality
circle.onMouseDown(() => {
  circle.score++;

  let mario = new Sound()
  mario.url = "./docs/sounds/mario-jump.wav"
  mario.loop = false
  mario.speed = "normal"
  mario.volume = "normal"
  mario.startPlaying()

  circle.x = randomX()
  circle.y = randomY()
  circle.radius = random(10, 100)
  const colorX = Math.random() * 1000;
  const colorY = Math.random() * 1000;
  const colorZ = Math.random() * 1000;
  circle.color = `rgb(${colorX}, ${colorY}, ${colorZ})`;
  startTimer();
})

//flag that controls the timer running
let timerRunning = false;

//function that controls the timer decreases, and at 0
function updateTimer() {
  if (circle.timer > 0) {
    circle.timer -= 1;
    timerText.text = () => "timer: " + circle.timer; // Update timerText
  }
  if (circle.timer === 0) {
    gator.show()
    speechBubble.show()
    gatorText.show()
    freeze();
  }
}

//function controlling timer starting
function startTimer() {
  if (!timerRunning) {
    setInterval(updateTimer, 1000);
    timerRunning = true; // Update the flag
  }
}
