// const router = require('express').Router();
// const { Question} = require('../../models');

let testStarted=false;
let questionNumber=1;
function StartStopQuiz(){
    if (testStarted){
        StopQuiz();
    }
    else{
        StartQuiz();  
    }
}
async function StartQuiz(){
    console.log('start');
    $('#start-stop').addClass("bg-green-300 hover:bg-green-500 hover:text-gray-100");
    $('#start-stop').text("Finish Quiz");
    $("#quiz-title").text(`Question ${questionNumber}`);
    $("#show-answer").show(); 
    $("#quiz-content").addClass("border-2 bg-white text-gray-800 text-left"); 
    // let totalQuestions= await Question.count();
    // console.log(totalQuestions);
}
function StopQuiz(){

}
$('#start-stop').click(StartStopQuiz);