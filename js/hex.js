/*
    I can't find a better way to scale the "back hexagon"
    so you get this solution
*/

function pageLoad()
{
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (height <= 900) document.getElementById("hex").style.transform = 'scale(0.2) translate(0, -100%)';
    else document.getElementById("hex").style.transform = 'scale(0.3) translate(0, -100%)';
}