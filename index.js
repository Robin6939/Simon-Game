var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});


$('.btn').click(function(){
    var userChoosenColor=$(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    check(userClickedPattern.length-1);
});

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor((Math.random()*4));
    var randomColor=buttonColors[randomNumber];
    gamePattern.push(randomColor);
    // console.log(gamePattern);
    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}



function check(l)
{
    if(gamePattern[l] === userClickedPattern[l])
    {
        // console.log("original pattern: "+gamePattern);
        // console.log("What you clicked: "+userClickedPattern);
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else{
        // console.log("original pattern: "+gamePattern);
        // console.log("What you clicked: "+userClickedPattern);
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to Restart");

        setTimeout( function() {
            $("body").removeClass("game-over");
        },200);

        startOver();
    }

}

function animatePress(current_color)
{
    var x="#"+current_color;
    $(x).addClass("pressed");
    setTimeout(function(){
        $(x).removeClass("pressed");
    },100);
}

function playSound(x)
{
    var sound=new Audio("sounds/"+x+".mp3");
    sound.play();
}

function startOver()
{
    level = 0;
    gamePattern=[];
    started=false;
}