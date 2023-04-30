var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


var started = false; 
var level = 0;

document.addEventListener("keydown", function(event) {
    aToStart(event.key);
});

function aToStart(key){
    switch (key) {
        case 'a':
            $("#level-title").text("Level" + level);   
            nextSequence();
        break;
    }  
}

$(".btn").on("click", function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 3000);

      }
    } else {

        console.log("wrong");
        $("#level-title").text("Game Over, Press Any Key To Restart");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

   console.log(userClickedPattern);
}

function nextSequence(){
    
    userClickedPattern = [];
    level++; 
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 

    playSound(randomChosenColour);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed"); 
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed"); 
    }, 100);
}

function startOver(){
    gamePattern = [];
    level = 0; 
    
    started = false;

    $(document).keypress(function(){
        if(!started) {
            $("#level-title").text("Press A Key To Start");
            started = true;
        }
    });
}
