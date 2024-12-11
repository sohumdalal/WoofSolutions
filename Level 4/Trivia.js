var url = "https://opentdb.com/api.php?amount=10&type=multiple"

getData(url, (data) => {
  var questionData = data.results;
  console.log(questionData);
  displayQuestion(questionData);
});

var currentQuestionIndex = 0;

var qText = new Text()
qText.text = () => "..."
qText.size = 20
qText.color = "black"
qText.fontFamily = "arial"

var answer1 = new Text()
answer1.text = () => "A"
answer1.size = 20
answer1.color = "black"
answer1.fontFamily = "arial"
answer1.y = -50

var answer2 = new Text()
answer2.text = () => "..."
answer2.size = 20
answer2.color = "black"
answer2.fontFamily = "arial"
answer2.y = answer1.y - 50

var answer3 = new Text()
answer3.text = () => "..."
answer3.size = 20
answer3.color = "black"
answer3.fontFamily = "arial"
answer3.y = answer2.y - 50

var answer4 = new Text()
answer4.text = () => "..."
answer4.size = 20
answer4.color = "black"
answer4.fontFamily = "arial"
answer4.y = answer3.y - 50


function displayQuestion(questionData) {
  if (currentQuestionIndex >= questionData.length) {
    qText.text = () => "Quiz complete!";
    answer1.text = () => "";
    answer2.text = () => "";
    answer3.text = () => "";
    answer4.text = () => "";
    return;
  }
  
  answer1.color = "black";
  answer2.color = "black";
  answer3.color = "black";
  answer4.color = "black";

  var q = questionData[currentQuestionIndex];
  var potentialAnswers = q.incorrect_answers
  potentialAnswers.push(q.correct_answer);
  potentialAnswers.sort(() => Math.random() - 0.5);

  qText.text = () => q.question;
  answer1.text = () => "A) " + potentialAnswers[0];
  answer2.text = () => "B) " + potentialAnswers[1];
  answer3.text = () => "C) " + potentialAnswers[2];
  answer4.text = () => "D) " + potentialAnswers[3];

  answer1.onMouseDown(() => handleAnswer(potentialAnswers[0], q.correct_answer, questionData));
  answer2.onMouseDown(() => handleAnswer(potentialAnswers[1], q.correct_answer, questionData));
  answer3.onMouseDown(() => handleAnswer(potentialAnswers[2], q.correct_answer, questionData));
  answer4.onMouseDown(() => handleAnswer(potentialAnswers[3], q.correct_answer, questionData));
}

function handleAnswer(selectedAnswer, correctAnswer, questionData) {
  if (selectedAnswer === correctAnswer) {
    if (answer1.text().includes(selectedAnswer)) answer1.color = "green";
    if (answer2.text().includes(selectedAnswer)) answer2.color = "green";
    if (answer3.text().includes(selectedAnswer)) answer3.color = "green";
    if (answer4.text().includes(selectedAnswer)) answer4.color = "green";

    setTimeout(() => {
      currentQuestionIndex++;
      displayQuestion(questionData);
    }, 3000);
    
  } 
  else {
    if (answer1.text().includes(selectedAnswer)) answer1.color = "red";
    if (answer2.text().includes(selectedAnswer)) answer2.color = "red";
    if (answer3.text().includes(selectedAnswer)) answer3.color = "red";
    if (answer4.text().includes(selectedAnswer)) answer4.color = "red";
  }
}
