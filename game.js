
var btnColor = ["red","blue","green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gamestart = false ;
var level = 0;

$(document).keypress(function (e) {
    if(e.key.toLowerCase() === "a" && !gamestart){
        
        $("#level-title").text("level " + level);
        nextSequence()
        gamestart = true;
    }
})


$(".btn ").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}



function nextSequence() {
    userClickedPattern = [];
    level++;
    

    $("#level-title").text("Level " + level);

    var rndNum = Math.floor(Math.random() * 4);
    var rndColorChosen = btnColor[rndNum];
    gamePattern.push(rndColorChosen);

    $("#" + rndColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(rndColorChosen);

    
}

function playSound(name) {
    var audioColor = new Audio("sounds/" + name + ".mp3")
    audioColor.play()

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");

    },100)

}

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;

}




