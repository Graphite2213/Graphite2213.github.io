let isMenuOpen = false;

function toggleMenu() {
				if (!isMenuOpen) {
								isMenuOpen = true; 	document.getElementById("menu").style.backgroundColor = "#103775";
document.getElementById("buttonsMenu").style.visibility = "visible";
				}
				else {
								isMenuOpen = false;	document.getElementById("menu").style.backgroundColor = "black";
								document.getElementById("buttonsMenu").style.visibility = "hidden";
				}
}
function dropdownFunct() {	document.getElementById("dropdownMenu").classList.toggle("show")
}
function toggleMenuM() {
				if (!isMenuOpen) {
								isMenuOpen = true; 	document.getElementById("menu").style.backgroundColor = "#ffb005";
document.getElementById("buttonsMenu").style.visibility = "visible";
				}
				else {
								isMenuOpen = false;	document.getElementById("menu").style.backgroundColor = "black";
								document.getElementById("buttonsMenu").style.visibility = "hidden";
				}
}

setInterval(function() {
fetch("http://localhost:3000")
.then(res => res.json())
.then(data => {
  console.log(data);
})
.catch(rejected => {
    console.log(rejected);
});
}, 3000);
