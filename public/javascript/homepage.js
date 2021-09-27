
// constants
let testStarted=false;
let questionNumber=1;
let allQuestions=[];
let uniqueQuestions=[];
let quizScore=0;
let dbQuestion=0;

// delay to show feedback after each answer
const delay = ms => new Promise(res => setTimeout(res, ms));
// integer random value 
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
// start or finish the quiz
function StartStopQuiz(){
    if (testStarted){
        StopQuiz();
    }
    else{
        StartQuiz();  
    }
}
// function returns an array of unique questions
function fillUniqueQestions(data){
    newArray=[];
for (i=0;i<data.length;i++){
    newArray.push({question:data[i].question_text, answer:data[i].answer});
}
return newArray;
}
// start quiz
async function StartQuiz(){
    testStarted=true;
    $("#quiz-title").removeClass('text-yellow-300');
    questionNumber=1;
    quizScore=0;
    $("#quiz-content").show(); 
    //get questions
    const response = await fetch(`/api/questions/`, {    
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (response.ok) {
        response.json().then(function (data) {        
        allQuestions =data;
        uniqueQuestions= fillUniqueQestions(data);
        $('#start-stop').addClass("bg-green-300 hover:bg-green-500 hover:text-gray-100");
        $('#start-stop').text("Finish Quiz"); 
        $("#show-answer").show(); 
        $("#quiz-content").addClass("border-2 bg-white text-gray-800 text-left"); 
        AskQuestion();
        })
      } else {
        alert(response.statusText);
      }
    }
    // function ask question
    function AskQuestion(){
        $("#quiz-title").text(`Question ${questionNumber}`);
        // if there is no unique questions ask all questions again
        if (uniqueQuestions.length===0){ uniqueQuestions= fillUniqueQestions(allQuestions);}
        // get random question
        dbQuestion = getRandomInt(uniqueQuestions.length);
        $('#quiz-content').text(uniqueQuestions[dbQuestion].question);
    }
    // functob submit answer shows feedback and updates array of unique questions
    async function SubmitAnswer(){
        if (($('#yes').prop('checked')&(uniqueQuestions[dbQuestion].answer))||($('#no').prop('checked')&(!uniqueQuestions[dbQuestion].answer))){
            quizScore++;
            $('#quiz-content').text('Correct!');
            $('#quiz-content').addClass('text-green-600 text-xl text-center');
           
        }else{
            $('#quiz-content').text('Wrong!');
            $('#quiz-content').addClass(' text-red-600 text-xl text-center');
         
        }
        
        uniqueQuestions.splice(dbQuestion, 1);
        console.log(uniqueQuestions);
        questionNumber++;
        await delay(1000);
        $('#quiz-content').removeClass(' text-red-600 text-green-600 text-xl text-center');
        $("#feedback").hide();
        AskQuestion();
    }
// finish the quiz and add data to score table if it the user is registered 
async function StopQuiz(){
    testStarted=false;
    $('#start-stop').removeClass("bg-green-300 hover:bg-green-500 hover:text-gray-100");
    $('#start-stop').text("Start again >");
    $("#quiz-title").text(`Score ${quizScore}/${questionNumber-1}`);
    $("#quiz-title").addClass('text-yellow-300');
   
    $("#show-answer").hide(); 
    $("#quiz-content").hide(); 
    let user_id=$("#quiz-page").attr("data-user_id");
    console.log(user_id);
    if (user_id>0){
        let score=parseInt(quizScore*100/(questionNumber-1));
        let correct=quizScore;
        let total=questionNumber-1;
   
        const response = await fetch(`/api/scores/`, {
          method: 'POST',
          body: JSON.stringify({
            score,
            correct,
            total,
            user_id
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (!response.ok) {
          alert(response.statusText);
        }
        window.location.assign(window.location.href+"dashboard");
    }

}
$('#start-stop').click(StartStopQuiz);
$('#submit-answer').click(SubmitAnswer);

