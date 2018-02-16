$(document).ready(function() {
       var wins = [];
       var offense = [];
       var taken = [];
       var firstGame = true;
      $('#play').on("click", function() { 
        console.log("play");
         wins = [["11", "12", "13"], 
                     ["21", "22", "23"], 
                     ["31", "32", "33"], 
                     ["11", "21", "31"], 
                     ["12", "22", "32"], 
                     ["13", "23", "33"],
                     ["11", "22", "33"], 
                     ["31", "22", "13"]];
  
         offense = wins.slice();
  
       taken = [];
         
        for (let i = 1; i < 4; i++) {
          for (let j = 1; j < 4; j++) {
            $("#" + i.toString() + j.toString()).html("");
          }
        }
       if (firstGame) {
        $('.index').animate({
           height: '+=100px'
        });
        firstGame = false;
       }
     }) //play button 
  
    $('.index').on("click", function() {
      if (taken.indexOf($(this).attr('id')) === -1) {
        $(this).html("X");
        //wins.pop();
        wins = wins.map((v) => v.filter((n) => n !== $(this).attr('id')));
        taken.push($(this).attr('id'));
        oppMove();
        //console.log(wins);
        console.log(offense);
        //console.log($(this).attr('id'));
        //console.log(wins);
      } else {
          alert("Move already taken.");
      }
    })
  
    function oppMove(){
      var falsePos = true;
      var filteredWins = wins.filter((v) => v.length === 1);
      var filteredOff = offense.filter((v) => v.length === 1);
      
      //REACTIVE MOVES
      if (filteredOff[0] !== undefined) {
        console.log("Offense");
        if (taken.indexOf(filteredOff[0][0]) === -1) {
           $('#' + filteredOff[0][0]).html("O");
           console.log("test");
           falsePos = false;
        
         //wins.splice(wins.indexOf(filteredWins[0]), 1);
        offense.splice(offense.indexOf(filteredOff[0]), 1);
        var id = filteredOff[0][0];
        }        
      } 
      if (filteredWins[0] !== undefined && falsePos === true) {
        console.log("Defense");
        for (let i = 0; i < filteredWins.length; i++) {
          console.log("test");
         if (taken.indexOf(filteredWins[i][0]) === -1 && falsePos === true) {
            $('#' + filteredWins[i][0]).html("O");
            falsePos = false;
            wins.splice(wins.indexOf(filteredWins[i]), 1);
        //offense.splice(wins.indexOf(filteredOff[0]), 1);
            var id = filteredWins[i][0];
            taken.push(filteredWins[i][0]);
        } // if statement
       } //For Loop
      }
      
      //ACTIVE MOVES
      if (taken.indexOf("22") === -1 && falsePos === true) {
        $('#22').html("O");
       console.log("Middle");
        var id = "22";
        taken.push("22");
        falsePos = false;
        //activeMove = true;
      }
      if (taken.indexOf("32") === -1 && falsePos === true) {
        $('#32').html("O");
       console.log("Bottom mid");
        var id = "32";
        taken.push("32");
        falsePos = false;
      }
      if (falsePos === true) {
          console.log("Random")
          var available = offense.reduce((p, c) => p.concat(c)).filter((v) => taken.indexOf(v) === -1);
          let randomIndex = Math.floor(Math.random() * available.length);
          console.log(randomIndex);
          $('#' + available[randomIndex]).html("O");
          var id = available[randomIndex];
          taken.push(available[randomIndex]);
          falsePos = false;
      }
      falsePos = true;
      //activeMove = false;
      offense = offense.map((v) => v.filter((n) => n !== id));
   } //end function oppMove() 

})