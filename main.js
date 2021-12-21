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
        killAllWindows();
    } else {
        return true;
    }

}

function playErrorSound() {
    new Audio("./errsound.mp3").play();
}

function phoneButtonOk() {
    document.getElementById("phoneError").style.display = "none";
    openAllWindows();
}
currentTime();
if (runMobileCheck(false)) {
    openAllWindows();
}

function killAllWindows() {
    document.getElementById("basicinfo").style.display = "none";
    document.getElementById("hellobox").style.display = "none";
    document.getElementById("projects").style.display = "none";
}

function openAllWindows() {
    setTimeout(() => document.getElementById("basicinfo").style.display = "block", 500);
    setTimeout(() => document.getElementById("hellobox").style.display = "block", 200);
    setTimeout(() => document.getElementById("projects").style.display = "block", 500);
}

function showprojClick() {
    document.body.style.cursor = "wait";

    setTimeout(() => {
        document.getElementById("projects").style.visibility = "visible";
        document.body.style.cursor = "default";
    }, 500);

}
let body = document.querySelector("body");


// Potential drag functionality
/*function onDrag({ movementX, movementY, target }) {
    let getStyle = window.getComputedStyle(target);
    let left = parseInt(getStyle.left);
    let top = parseInt(getStyle.top);
    console.log(getStyle.left);
    target.parentElement.style.left = `${left + movementX}px`;
    target.parentElement.style.top = `${top + movementY}px`;
}

for (let i = 0; i < document.querySelectorAll(".draggableTitle").length; i++) {

    let draggableWindow = body.querySelectorAll(".draggableWindow")[i];
    let draggableHeader = document.querySelectorAll(".draggableTitle")[i];


    draggableHeader.addEventListener("mousedown", () => {
        draggableWindow.addEventListener("mousemove", onDrag);
    });



    document.addEventListener("mouseup", () => {
        draggableWindow.removeEventListener("mousemove", onDrag);
    });

}*/

function closeWindow() {
    //event.target.parentElement.parentElement.parentElement.style.display = "none";
}

function phoneButtonRedirect() {
    window.location.href = "mobile.html";
}

function showprojClickMob() {
    document.getElementById("box1").style.display = "none";
    document.getElementById("projects").style.display = "block";
}

function goBackMobile() {
    document.getElementById("box1").style.display = "block";
    document.getElementById("projects").style.display = "none";
}