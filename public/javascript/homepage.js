let testStarted=false;
let questionNu
function StartStopQuiz(){
    if (testStarted){}
    else{
        $('#start-stop').addClass("bg-green-300");
        $('#start-stop').text("Finish");

    }

}
$('#start-stop').click(StartStopQuiz);