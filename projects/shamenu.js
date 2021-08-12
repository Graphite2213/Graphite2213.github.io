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
								isMenuOpen = true; 	document.getElementById("menu").style.backgroundColor = "#ebdfdf";
document.getElementById("buttonsMenu").style.visibility = "visible";
				}
				else {
								isMenuOpen = false;	document.getElementById("menu").style.backgroundColor = "black";
								document.getElementById("buttonsMenu").style.visibility = "hidden";
				}
}


