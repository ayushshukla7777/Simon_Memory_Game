var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var started= false;
var level =0;


$(document).on("keydown", function(){
    if(started==false){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function (){
    
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour); 

    cheakAnswer(userClickedPattern.length-1);
    
});


function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).animate().fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}


function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColur){
    $("#"+ currentColur).addClass("pressed");
    window.setTimeout(function(){
        $("#"+ currentColur).removeClass("pressed");
    }, 100);
}


function cheakAnswer(currentLevel){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("sucess");
        if(currentLevel==level-1){
            console.log("finised");
            window.setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }

    
    else{
        
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        window.setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press any Key to Restart");
        startOver();
    }

    function startOver() {
        gamePattern=[];
        started=false;
        level=0;
    }
    

}
