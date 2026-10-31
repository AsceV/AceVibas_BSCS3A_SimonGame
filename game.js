$(document).ready(function () {
  var buttonColours = ["red", "blue", "green", "yellow"];
  var gamePattern = [];
  var userClickedPattern = [];
  var level = 0;
  var started = false;
  var isAcceptingInput = false;

  $(document).on("keydown", function () {
    if (!started) {
      startGame();
    }
  });

  $(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");

    if (!started || !isAcceptingInput || userClickedPattern.length >= gamePattern.length) {
      return;
    }

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });

  function startGame() {
    if (started) return;
    started = true;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
  }

  function nextSequence() {
    userClickedPattern = [];
    isAcceptingInput = false;
    level += 1;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100, function () {
        isAcceptingInput = true;
      });
    playSound(randomChosenColour);
  }

  function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
      gameOver();
      return;
    }

    if (userClickedPattern.length === gamePattern.length) {
      isAcceptingInput = false;
      window.setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }

  function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
  }

  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    window.setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }

  function gameOver() {
    started = false;
    isAcceptingInput = false;
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    window.setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    isAcceptingInput = false;
  }
});