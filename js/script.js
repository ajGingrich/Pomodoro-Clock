/**
 * Created by Andrew on 13/10/2016.
 */

var $sec = $('#seconds');
var $min = $('#minutes');
var $timer = $('#timer');
var $set = $('#set');
var $playPause = $('#playPause');
var $reset = $('#reset');
var $alarm = $('#alarm');
var $youtube = $('#youtube');

//Add 60 options
for (var i=0; i<=60; i++) {
    $sec.append('<option value="' + i + '">' + i + '</option>');
    $min.append('<option value="' + i + '">' + i + '</option>');
}

//start and stop Music
startMusic = function() {
    $youtube.volume = 1;
    $($youtube)[0].src += "?autoplay=1";
};
stopMusic = function() {
    $($youtube)[0].src = "https://www.youtube.com/embed/RzyaaMUCpWs";
};

$($set).click(function(){
    setTimer();
});

//add leading Zero for string or number
addZero = function(str) {
    if (typeof str === "number") {
        str = str.toString();
    }
    str= str.split("");
    str.unshift("0");
    str = str.join("");
    return str;
};

//Countdown
initCountdown = function() {
    var time = $timer.text().split(":");
    var min = time[0];
    var sec = time[1];
    var subtract = function() {
        if (min == 0 && sec == 0) {
            clearInterval(init);
            startMusic();
        }
        else {
            if (sec == 0) {
                sec = 59;
                min -= 1;
            }
            else {
                sec -= 1;
                if (sec < 10) {
                    sec = addZero(sec);
                }
            }
            $timer.html(min + ":" + sec);
        }
    };
    window.init = setInterval(subtract, 1000);
};

//PlayPause
var bool = true;
$($playPause).click(function() {
    if (bool) {
        initCountdown();
        bool = false;
    }
    else {
        clearInterval(init);
        bool=true;
    }
});

//Set Timer
setTimer = function() {
    stopMusic();
    var seconds = $sec.val();
    if (seconds < 10) {
        seconds = addZero(seconds);
    }
    $timer.html($min.val() + ":" + seconds);
    if (typeof init !== "undefined") {
        clearInterval(init);
    }
    window.bool = true;
};

//reset
$($reset).click(function(){
    if ($sec.val() === "0" && $min.val() === "0") {
        $timer.html("25:00");
        clearInterval(init);
    }
    else {
        clearInterval(init);
        setTimer();
    }
    stopMusic();
    window.bool = true;
});
//alarm
$($alarm).click(function(){
    stopMusic();
});

/*Bouncy!*/


