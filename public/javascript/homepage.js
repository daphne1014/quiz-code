

let testStarted=false;
let questionNumber=1;
let allQuestions=[];
let uniqueQuestions=[];
let quizScore=0;
let dbQuestion=0;
const delay = ms => new Promise(res => setTimeout(res, ms));
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function StartStopQuiz(){
    if (testStarted){
        StopQuiz();
    }
    else{
        StartQuiz();  
    }
}
function fillUniqueQestions(data){
    newArray=[];
for (i=0;i<data.length;i++){
    newArray.push({question:data[i].question_text, answer:data[i].answer});
}
return newArray;
}
async function StartQuiz(){
    testStarted=true;
    $("#quiz-title").removeClass('text-yellow-300');
    questionNumber=1;
    quizScore=0;
    $("#quiz-content").show(); 
    const response = await fetch(`/api/questions/`, {    
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (response.ok) {
        response.json().then(function (data) {        
        console.log(data);
        allQuestions =data;
        uniqueQuestions= fillUniqueQestions(data);
       console.log(uniqueQuestions);
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
    function AskQuestion(){
        $("#quiz-title").text(`Question ${questionNumber}`);
        if (uniqueQuestions.length===0){ uniqueQuestions= fillUniqueQestions(allQuestions);}
        dbQuestion = getRandomInt(uniqueQuestions.length);
        $('#quiz-content').text(uniqueQuestions[dbQuestion].question);
    }
    async function SubmitAnswer(){
        if (($('#yes').prop('checked')&(uniqueQuestions[dbQuestion].answer))||($('#no').prop('checked')&(!uniqueQuestions[dbQuestion].answer))){
            quizScore++;
            $('#quiz-content').text('Correct!');
            $('#quiz-content').addClass('text-green-600 text-xl text-center');
           
        }else{
            $('#quiz-content').text('Wrong!');
            $('#quiz-content').addClass(' text-red-600 text-xl text-center');
         
        }
        
        console.log(quizScore);
        uniqueQuestions.splice(dbQuestion, 1);
        console.log(uniqueQuestions);
        questionNumber++;
        await delay(1000);
        $('#quiz-content').removeClass(' text-red-600 text-green-600 text-xl text-center');
        $("#feedback").hide();
        AskQuestion();
    }

async function StopQuiz(){
    testStarted=false;
    $('#start-stop').removeClass("bg-green-300 hover:bg-green-500 hover:text-gray-100");
    $('#start-stop').text("Start again >");
    $("#quiz-title").text(`Score ${quizScore}/${questionNumber-1}`);
    $("#quiz-title").addClass('text-yellow-300');
   
    $("#show-answer").hide(); 
    $("#quiz-content").hide(); 
    let user_id=parseInt($('#myuser').text());
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
    }

}
$('#start-stop').click(StartStopQuiz);
$('#submit-answer').click(SubmitAnswer);