function currentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    if (hh == 0) {
        hh = 12;
    }
    if (hh > 12) {
        hh = hh - 12;
        session = "PM";
    }

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    let time = hh + ":" + mm + " " + session;

    document.getElementById("clock").innerHTML = time;
    let t = setTimeout(function() { currentTime() }, 1000);
}

function runMobileCheck(debugging) {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) || debugging) {

        playErrorSound();
        document.getElementById("phoneError").style.display = "block";
        document.getElementById("basicinfo").style.display = "none";
        document.getElementById("hellobox").style.display = "none";
        document.getElementById("projects").style.display = "none";

    }

}

function playErrorSound() {
    new Audio("./errsound.mp3").play();
}

function phoneButtonOk() {
    document.getElementById("phoneError").style.display = "none";
    document.getElementById("basicinfo").style.display = "block";
    document.getElementById("hellobox").style.display = "block";
    document.getElementById("projects").style.display = "block";
}
currentTime();
runMobileCheck(false);

function showprojClick() {
    document.getElementById("projects").style.visibility = "visible";

}