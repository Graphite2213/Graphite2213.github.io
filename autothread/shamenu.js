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
								isMenuOpen = true; 	document.getElementById("menu").style.backgroundColor = "#c4004c";
document.getElementById("buttonsMenu").style.visibility = "visible";
				}
				else {
								isMenuOpen = false;	document.getElementById("menu").style.backgroundColor = "black";
								document.getElementById("buttonsMenu").style.visibility = "hidden";
				}
}

setInterval(function() {
let data = 0;

function reqError(err) {
  console.log('Fetch Error :-S', err);
  document.getElementById("shard1").style.color = "blue";
}

var oReq = new XMLHttpRequest();
oReq.onreadystatechange = function() {
data = this.responseText;
    if (this.readyState == 4 && this.status == 200) {
if ((new Date().getTime() - data) <= 500) {
				document.getElementById("shard1").style.color = "green";
}
else if (((new Date().getTime() - data) > 500) && ((new Date().getTime() - data) < 200000)) {
				document.getElementById("shard1").style.color = "yellow";
}
else if ((new Date().getTime() - data) >= 200000) {
			document.getElementById("shard1").style.color = "red";
}
    }
  };
oReq.onerror = reqError;
oReq.open('get', `http://${secret.IP}:8320`, true);
oReq.send();

}, 3000);
