$(function(){
    
    //Initial Screen--------------------------------------

    var countdown = 3;    
    //countdown timer
    var countdownCounter = setInterval(decCounter, 1000);
    //printing the counter on webpage
    $("#counter").text(countdown);
    //decrement Counter Function
    function decCounter(){
        if(countdown > 0)
        {
            countdown--;
        }
        if(countdown==0)
        {
            clearInterval(countdownCounter);
            $("#initialScreen").fadeOut(700);
            $("#counter").fadeOut(700);
            $("#header").fadeIn(100);
            $("#gameBox").fadeIn(100);
            $("#footer").fadeIn(100);
            $("#tap").fadeIn(100);
            setTimeout(function() {
                $("#tap").fadeOut('slow');  
              }, 1500);
            
        }
        $("#counter").text(countdown);
        console.log(countdown);
    }

    //Game Screen-------------------------------------------

    var score = 0;
    $("#score").text(score/50);

    var highScore = localStorage.getItem("#highScore");
    highScore = highScore === null ? 0 : highScore ;
    $("#highScore").text(highScore);

    var blocksArray = $("td");
    //selecting 3 random boxes to change their color to black
    var box1 = Math.floor(Math.random()*15);
    var box2 = Math.floor(Math.random()*15);
    var box3 = Math.floor(Math.random()*15);
    var newBox = -1;
    //changing their color to black
    blocksArray[box1].style.backgroundColor = "black";
    while(box2 === box1){
        box2 = Math.floor(Math.random()*15);
    }
    blocksArray[box2].style.backgroundColor = "black";
    while(box3 === box1 || box3 === box2){
        box3 = Math.floor(Math.random()*15);
    }
    blocksArray[box3].style.backgroundColor = "black";

    var blocksCounter = setInterval(incCounter, 1000);
    var maxTime = 13;

    function incCounter(){

        maxTime--;
        $("#time").text(maxTime);

        if(barWidth > 0 && maxTime>1)
        {

        $("td").click(function()
        {
            //selecting boxes animating them
            if($(this).is(blocksArray[box1]))
            {
                box1 = Math.floor(Math.random()*15);
                while(box1 === box2 || box1 === box3){
                    box1 = Math.floor(Math.random()*15);
                }
                $(this).animate({backgroundColor: "green"}, 400);
                $(this).animate({backgroundColor: "white"}, 400); 
                //showing points in the box
                $(this).text("+"+Math.round(barWidth/50)).delay(600).queue(function(n) { 
                    $(this).text(""); n();
                });

                blocksArray[box1].style.backgroundColor = "black";
                score += Math.round(barWidth/50);
                $("#score").text(score);
                barWidth = 300;
                $("#health").width(300);
            }
            if($(this).is(blocksArray[box2]))  
            {
                box2 = Math.floor(Math.random()*15);
                while(box2 === box1 || box2 === box3){
                    box2 = Math.floor(Math.random()*15);
                }
                $(this).animate({backgroundColor: "green"}, 400);
                $(this).animate({backgroundColor: "white"}, 400);                
                //showing points in the box
                $(this).text("+"+Math.round(barWidth/50)).delay(600).queue(function(n) { 
                    $(this).text(""); n();
                });

                blocksArray[box2].style.backgroundColor = "black";
                score += Math.round(barWidth/50);
                $("#score").text(score);
                barWidth = 300;
                $("#health").width(300);
            }
            if($(this).is(blocksArray[box3]))
            {
                box3 = Math.floor(Math.random()*15);
                while(box3 === box1 || box3 === box2){
                    box3 = Math.floor(Math.random()*15);
                }
                $(this).animate({backgroundColor: "green"}, 400);
                $(this).animate({backgroundColor: "white"}, 400);  
                //showing points in the box
                $(this).text("+"+Math.round(barWidth/50)).delay(600).queue(function(n) { 
                    $(this).text(""); n();
                });

                blocksArray[box3].style.backgroundColor = "black";
                score += Math.round(barWidth/50);
                $("#score").text(score);
                barWidth = 300;
                $("#health").width(300);
            }
        })
        }
    }    
    

    //Health Bar--------------------------------------------

    // $(document).bind('keydown keyup', function(e) {
    //     if(e.which === 116) {
    //        console.log('blocked');
    //        return false;
    //     }
    //     if(e.which === 82 && e.ctrlKey) {
    //        console.log('blocked');
    //        return false;
    //     }
    // });

    var healthBar = setInterval(decCounterBar, 10);
    var barWidth = $("#health").width();

    function decCounterBar(){
        if(barWidth > -10)
        {
            barWidth -= 2;
            $("#health").width(barWidth);
        }
        
        //showing confetti if bar width goes to 0
        if(barWidth===-10 || maxTime===0)
        {
            maxTime=0;
            clearInterval(blocksCounter);
            clearInterval(healthBar);
            highScore=score;
            var x = localStorage.getItem("#highScore");
            if(x>highScore)
            {
                localStorage.setItem("#highScore", x);
                $("#highScore").text(x);
                //different outcomes
                $("#timeUp").fadeIn(100);
            }
            else
            {
                localStorage.setItem("#highScore", highScore);
                $("#highScore").text(highScore);
                //different outcomes
                $("#newHighScore").fadeIn(100);   
                //confetti animation
                $.confetti.start();
                setTimeout(() => {
                $.confetti.stop();
                }, 2000)            
            }            
            
            $("#f5").fadeIn(100);    
            // $(document).bind('keydown keyup', function(e) {
            //     if(e.which === 116) {
            //         $("#timeUp").fadeOut(100);
            //         $("#f5").fadeOut(100);  
            //         $("#header").fadeIn(100);
            //         $("#gameBox").fadeIn(100);
            //         $("#footer").fadeIn(100);
            //         blocksCounter = setInterval(incCounter, 1000);
            //         maxTime = 13;
            //         score  = 0;
            //         healthBar = setInterval(decCounterBar, 150);
            //        console.log('blocked');
            //        return false;
            //     }
            //     if(e.which === 82 && e.ctrlKey) {
            //        console.log('blocked');
            //        return false;
            //     }
            // });
            
        }
    }

    //------------------------------------------------------
   
    
})