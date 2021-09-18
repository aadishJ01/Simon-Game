//green:1 red:2 blue:3 yellow:4

$("#formSubmit").submit(function(){
  $("#submitBtn").attr("disabled", true);
  var userName = $("#inputName").val();
  if(userName != "") userName = userName[0].toUpperCase() + userName.slice(1,userName.length).toLowerCase();
  startGame(userName);
});

var levelNum = 1;
var colorList = [];

function overGame() {
  var audio = new Audio("../sound/wrong.mp3");
  audio.play();
  levelNum = 1;
  colorList = [];
}

function startGame(userName) {

  setTimeout(function() {
    if(userName=="") $("#level").text("You are at Level " + levelNum);
    else $("#level").text( userName + ", You are at Level " + levelNum);

    var newColor = Math.floor(Math.random() * 4) + 1;

    $("#color" + newColor).hide();
    var audio = new Audio("../sound/color" + newColor + ".mp3");
    audio.play();
    setTimeout(function() {
      $("#color" + newColor).show();
    }, 50);

    colorList.push("color" + newColor);

    // console.log(colorList);
    var userColorList = [];
    var num = 0;
    $(".colorBtn").on("click", function() {

      $(this).addClass("BtnPressByUser");
      var elementInDOM = $(this);
      setTimeout(function() {
        elementInDOM.removeClass("BtnPressByUser");
      }, 50);

      var temp = $(this).attr("id");
      userColorList.push(temp);
      num += 1;
      if (num == levelNum) {
        $(".colorBtn").off("click");
        var same = 1;
        for (var i = 0; i < levelNum; ++i) {
          if (userColorList[i] != colorList[i]) same = 0;
        }
        if (same == 1) {
          // console.log("WIN");
          levelNum += 1;
          startGame(userName);
        }
        else {
          // console.log("GAME OVER");
          $("#level").text("Game over! Bravo, You got till Level " + levelNum);
          $("#submitBtn").attr("value", "Restart Game");
          $("#submitBtn").attr("disabled", false);
          overGame();
        }
      }
    });
  }, 400);
}
