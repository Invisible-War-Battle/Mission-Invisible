
var x;
var socket = io.connect();
var fight = false;
var username;
var users = [];
var user;
var winners = 0;
var players = [];
var main;
var link;
var range = 200;
var ammo = 20;
let keysPressed = {};
var you;
var matrix2;
var health = document.getElementById("health");
var matrix4;
var matrix = new WebKitCSSMatrix(
	window.getComputedStyle(document.getElementById("bullet")).transform
);
var alerts = Array.from(document.getElementsByClassName("swal2-container"));
var ps = 0;
var sol1 = document.getElementById("panther");
var matrix3;
var sold;
var p = 0;
var person;
var roomnumber = 0;
var otherplayer;
(async () => {

async function choose() {
	person = await Swal.fire({
		customClass: {
			popup: "z"
		},
  input: 'textarea',
  inputLabel: 'Choose an username!'
})
	socket.emit("username", person.value);
	if(person != null)
{		
	document.getElementById("dialog").hidden = true;
		document.body.style.background = "url(sky.jpg)";
		document.getElementById("universe").hidden = false;
		document.getElementById("text").hidden = false;
		
			load();


}

}
document.getElementById("dialog").hidden = false;
document.getElementById("universe").hidden = true;
document.getElementById("text").hidden = true;
document.body.style.background = "black";
document.getElementById("option").innerHTML = "Do You Want To Create A Room?";

document.getElementById("ok").onclick = async () => {
	const { value: room } = await Swal.fire({
		customClass: {
			popup: "z"
		},
 	 input: 'textarea',
 	 inputLabel: 'Choose a room name!'
	})
	const { value: password } = await Swal.fire({
		customClass: {
			popup: "z"
		},
  input: 'password',
  inputLabel: 'Choose a room password!'
})
choose();

socket.emit("roomname", room);
socket.emit("password", password);
};
document.getElementById("neither").onclick = async () => {
	document.getElementById("dialog").hidden = true;
	document.body.style.background = "url(sky.jpg)";
	document.getElementById("universe").hidden = false;
	document.getElementById("text").hidden = false;
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	link = "";
	for (var i = 0; i < 40; i++) {
		link += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	socket.emit("self", link);
	console.log(link);
	load();
};
document.getElementById("no").onclick = async () => {
	const { value: roomname } = await Swal.fire({
		customClass: {
			popup: "z"
		},
  input: 'textarea',
  inputLabel: 'The room name?'
})
	socket.emit("room", roomname);
	const { value: pass } = await Swal.fire({
		customClass: {
			popup: "z"
		},
  input: 'password',
  inputLabel: 'The password?'
})
choose();
	socket.emit("pass", pass);

};
socket.on("usernotadded", async () => {
	const person = await Swal.fire({
		customClass: {
			popup: "z"
		},
  input: 'textarea',
  inputLabel: 'Choose an username! Yours was inappropriate or taken.'
})
	socket.emit("username", person.value);
});
socket.on("roomclosed", (data) => {
	if (
		typeof users[0 + data.number] != "undefined" &&
		typeof users[1 + data.number] != "undefined" &&
		typeof users[2 + data.number] != "undefined"
	) {
		
		roomnumber = data.room;
		var play = 0;
		users.forEach((player) => {
			player = document.getElementById("score").cloneNode(true);
			player.id = users[play + data.number];
			player.value = users[play + data.number] + ": 0";
			console.log(users[play + data.number]);
			player.classList.add("score");
			player.style.marginBottom = "100px";
			document.body.insertBefore(player, document.getElementById("universe"));
			play++;
		});
	}
});

socket.on("useradded", (u) => {
	users = u;
});
socket.on("left", (leaving) => {
		universe.hidden = true;

	Swal.fire({text: leaving + " left."}).then(()=> {})
});
socket.on("joined", (per) => {
	universe.hidden = true;
	Swal.fire({text : per + " joined."}).then(()=> {universe.hidden = false;})
});
socket.on("leave", (u) => {
	users = u;
});
socket.on("gameover", (killed) => {
	universe.hidden = true;
	Swal.fire({text : killed + " died."}).then(()=> {universe.hidden = false;})
});

function load() {
		universe.hidden = true;

	Swal.fire({text:"You have been drafted to fight in the Invisible War. Use arrow keys to move and space to launch a bullet. When you hear a boing sound that is not yours, you will have 5 seconds to run until you are out of range of your target. The catch? No enemy can be seen. Use the coordinates on the left hand side to help you. The range is how far back (-Z) you can be, however, your X must be exact. Kill the 25 enemies to get to PvP. Good luck..."}).then(()=> {universe.hidden = false;})

	function myfunction(tree) {
		tree.src = "explosion.png";
	}
	function newgun() {
		matrix = new WebKitCSSMatrix(
			window.getComputedStyle(document.getElementById("bullet")).transform
		);
		matrix3 = new WebKitCSSMatrix(
			window.getComputedStyle(document.getElementById("panther")).transform
		);
		matrix4 = new WebKitCSSMatrix(
			window.getComputedStyle(document.getElementById("universe")).transform
		);
		if (matrix4.m41 === -1000 && matrix4.m43 === 0 && ps === 10) {
				universe.hidden = true;

			Swal.fire({text: "Enjoy your new gun."}).then(()=> {universe.hidden = false;})
			range = 500;
			document.getElementById("range").innerHTML = "Range: 500";
			document.removeEventListener("keydown", newgun);
		}
	}

	function pclick() {
		document.getElementById("enemyhealth").value = 5;
		socket.emit("hit", person);
		ps++;
		document.getElementById("panther").style.transform =
			"translateX(" +
			100 * Math.floor(Math.random() * 50) +
			"px) translateZ(" +
			-100 * Math.floor(Math.random() * 50) +
			"px) perspective(6000px) translateY(300px)";
		matrix3 = new WebKitCSSMatrix(getComputedStyle(sol1).transform);
		localStorage.setItem("x", matrix3.m41);
		localStorage.setItem("z", matrix3.m43);
		localStorage.setItem("ps", ps);
		matrix4 = new WebKitCSSMatrix(
			window.getComputedStyle(document.getElementById("universe")).transform
		);
		console.log(ps);
		document.getElementById("enemy").innerHTML =
			"A soldier is at X: " + matrix3.m41 + " Z: " + -matrix3.m43;
		if (ps === 10) {	universe.hidden = true;

			Swal.fire({text: "Go to X: 0, Z: 0 to get a sniper rifle with 500 range."}).then(()=> {universe.hidden = false;})
		}
		if (ps === 25) {
			socket.emit("won", person);
				universe.hidden = true;

			Swal.fire(
				{text: "You have a final spot! Once another player finishes, PvP will begin."
				}).then(()=> {universe.hidden = false;})
		}
	}
	socket.on("point", (username) => {
	universe.hidden = true;
		Swal.fire({text: username + " got a point!"}).then(()=> {universe.hidden = false;})
	});
	sol1 = document.getElementById("panther");

	var y = 500;
	var a = 0;
	var b = 0;
	document.getElementById("universe").style.transform =
		"translate3d(" + b + "px, " + y + "px, " + a + "px) perspective(" +(a + 5000) +"px)";

	var ry = 0;
	function kill() {
		if (ps < 25) {
			matrix = new WebKitCSSMatrix(
				window.getComputedStyle(document.getElementById("bullet")).transform
			);
			matrix4 = new WebKitCSSMatrix(
				window.getComputedStyle(document.getElementById("universe")).transform
			);
			if (range === 200) {
				setTimeout(() => {
					sol1 = document.getElementById("panther");
					matrix3 = new WebKitCSSMatrix(window.getComputedStyle(sol1).transform);
					console.log(matrix.m41 - (matrix3.m41 - (-matrix4.m41 - 1000)));
					console.log(matrix3.m43 - -a);
					if (
						matrix.m41 - (matrix3.m41 - (-matrix4.m41 - 1000)) >= -200 &&
						matrix3.m43 - -a >= -200 &&
						matrix.m41 - (matrix3.m41 - (-matrix4.m41 - 1000)) < 200 &&
						matrix3.m43 - -a < 200
					) {
						document.getElementById("healthp").hidden = false;
						document.getElementById("enemyhealth").hidden = false;
						if (Math.floor(Math.random() * 10) === 1) {
							document.getElementById("shot").play();
							setTimeout(() => {
								if (
									matrix.m41 - (matrix3.m41 - (-matrix4.m41 - 1000)) >= -200 &&
									matrix3.m43 - -a >= -200 &&
									matrix.m41 - (matrix3.m41 - (-matrix4.m41 - 1000)) < 200 &&
									matrix3.m43 - -a < 200
								) {
									health.value--;
									if (health.value === 0) {
	universe.hidden = true;
										Swal.fire({text: "You died."}).then(()=> {universe.hidden = false;})

										socket.emit("died", person);
										location.reload();
									}
								}
							}, 5000);
						} else {
							console.log("You Survived!");
						}
					} else {
						document.getElementById("healthp").hidden = true;
						document.getElementById("enemyhealth").hidden = true;
					}
				}, 3000);
			}
			if (range === 500) {
				setTimeout(() => {
					sol1 = document.getElementById("panther");
					matrix3 = new WebKitCSSMatrix(window.getComputedStyle(sol1).transform);
					console.log(matrix.m41 - (matrix3.m41 - (-matrix4.m41 - 1000)));
					console.log(matrix3.m43 - -a);
					if (
						matrix.m41 - (matrix3.m41 - (-matrix4.m41 - 1000)) >= -600 &&
						matrix3.m43 - -a >= -600 &&
						matrix.m41 - (matrix3.m41 - (-matrix4.m41 - 1000)) < 600 &&
						matrix3.m43 - -a < 600
					) {
						document.getElementById("healthp").hidden = false;
						document.getElementById("enemyhealth").hidden = false;
						if (Math.floor(Math.random() * 10) === 1) {
							document.getElementById("shot").play();
							setTimeout(() => {
								if (
									matrix.m41 - (matrix3.m41 - (-matrix4.m41 - 1000)) >= -600 &&
									matrix3.m43 - -a >= -600 &&
									matrix.m41 - (matrix3.m41 - (-matrix4.m41 - 1000)) < 600 &&
									matrix3.m43 - -a < 600
								) {
									health.value--;
									if (health.value === 0) {
											universe.hidden = true;
										Swal.fire({text: "You died."}).then(()=> {universe.hidden = false;})
										socket.emit("died", person);
										location.reload();
									}
								} else {
									document.getElementById("healthp").hidden = true;
									document.getElementById("enemyhealth").hidden = true;
								}
							}, 5000);
						} else {
							console.log("You Survived!");
						}
					}
				}, 3000);
			}
		}
	}
	var rx = 0;
	var playera = 0,
		playerb = 0;
	var ry = 0;
	document.getElementById("universe").style.transform =
		"translate3d(" + b + "px, " + y + "px, " + a + "px) perspective(" +(a + 5000) +"px)";
	var perspective = 300;
	matrix4 = new WebKitCSSMatrix(
		window.getComputedStyle(document.getElementById("universe")).transform
	);
	targetmatrix = matrix4;
	var treelist;
	var treematrix;

	document.addEventListener("keydown", function(e) {
		newgun();
		matrix = new WebKitCSSMatrix(
			window.getComputedStyle(document.getElementById("bullet")).transform
		);
		matrix4 = new WebKitCSSMatrix(
			window.getComputedStyle(document.getElementById("universe")).transform
		);
		sol1 = document.getElementById("panther");

		socket.emit("move", matrix4);
		a = parseInt(a);
		b = parseInt(b);
		y = parseInt(y);
		var worldclone;
		if (e.key == "ArrowUp") {
			e.preventDefault();
			a += 50;
			playera += 50;
			document.getElementById("universe").style.transform =
				"translate3d(" + b + "px, " + y + "px, " + a + "px) perspective(" +(a + 5000) +"px)";
		}
		if (e.key == "ArrowDown") {
			e.preventDefault();
			a -= 50;
			playera -= 50;
			document.getElementById("universe").style.transform =
				"translate3d(" + b + "px, " + y + "px, " + a + "px) perspective(" +(a + 5000) +"px)";
		}
		if (e.key == "ArrowRight") {
			e.preventDefault();
			playerb += 50;
			b -= 50;
			document.getElementById("universe").style.transform =
				"translate3d(" + b + "px, " + y + "px, " + a + "px) perspective(" +(a + 5000) +"px)";
		}
		if (e.key == "ArrowLeft") {
			e.preventDefault();
			b += 50;
			playerb -= 50;
			document.getElementById("universe").style.transform =
				"translate3d(" + b + "px, " + y + "px, " + a + "px) perspective(" +(a + 5000) +"px)";
		}

		if (e.key == " ") {
			matrix = new WebKitCSSMatrix(
				window.getComputedStyle(document.getElementById("bullet")).transform
			);
			matrix4 = new WebKitCSSMatrix(
				window.getComputedStyle(document.getElementById("universe")).transform
			);

			matrix3 = new WebKitCSSMatrix(window.getComputedStyle(sol1).transform);
			document.getElementById("shot").play();
			if (fight === true) {
				document.getElementById("ammo").innerHTML = "Ammo: ∞";
				setTimeout(() => {
					if (
						targetmatrix.m41 === matrix4.m41 &&
						targetmatrix.m43 === matrix4.m43 + 500
					) {
						document.getElementById("enemyhealth").value--;
						socket.emit("playerhit", person);
						if (document.getElementById("enemyhealth").value === 0) {
							socket.emit("userwon");
						}
					} else if (
						targetmatrix.m41 === matrix4.m41 &&
						targetmatrix.m43 === matrix4.m43 + 450
					) {
						document.getElementById("enemyhealth").value--;
						socket.emit("playerhit", person);
						if (document.getElementById("enemyhealth").value === 0) {
							socket.emit("userwon", person);
						}
					} else if (
						targetmatrix.m41 === matrix4.m41 &&
						targetmatrix.m43 === matrix4.m43 + 400
					) {
						socket.emit("playerhit", person);
						document.getElementById("enemyhealth").value--;
						if (document.getElementById("enemyhealth").value === 0) {
							socket.emit("userwon", person);
						}
					} else if (
						targetmatrix.m41 === matrix4.m41 &&
						targetmatrix.m43 === matrix4.m43 + 350
					) {
						socket.emit("playerhit", person);
						document.getElementById("enemyhealth").value--;
						if (document.getElementById("enemyhealth").value === 0) {
							socket.emit("userwon", person);
						}
					} else if (
						targetmatrix.m41 === matrix4.m41 &&
						targetmatrix.m43 === matrix4.m43 + 300
					) {
						socket.emit("playerhit", person);
						document.getElementById("enemyhealth").value--;
						if (document.getElementById("enemyhealth").value === 0) {
							socket.emit("userwon", person);
						}
					} else if (
						targetmatrix.m41 === matrix4.m41 &&
						targetmatrix.m43 === matrix4.m43 + 250
					) {
						document.getElementById("enemyhealth").value--;
						socket.emit("playerhit", person);
						if (document.getElementById("enemyhealth").value === 0) {
							socket.emit("userwon", person);
						}
					} else if (
						targetmatrix.m41 === matrix4.m41 &&
						targetmatrix.m43 === matrix4.m43 + 200
					) {
						document.getElementById("enemyhealth").value--;
						socket.emit("playerhit", person);
						if (document.getElementById("enemyhealth").value === 0) {
							socket.emit("userwon", person);
						}
					} else if (
						targetmatrix.m41 === matrix4.m41 &&
						targetmatrix.m43 === matrix4.m43 + 150
					) {
						socket.emit("playerhit", person);
						document.getElementById("enemyhealth").value--;
						if (document.getElementById("enemyhealth").value === 0) {
							socket.emit("userwon", person);
						}
					} else if (
						targetmatrix.m41 === matrix4.m41 &&
						targetmatrix.m43 === matrix4.m43 + 100
					) {
						document.getElementById("enemyhealth").value--;
						socket.emit("playerhit", person);
						if (document.getElementById("enemyhealth").value === 0) {
							socket.emit("userwon", person);
						}
					} else if (
						targetmatrix.m41 === matrix4.m41 &&
						targetmatrix.m43 === matrix4.m43 + 50
					) {
						document.getElementById("enemyhealth").value--;
						socket.emit("playerhit", person);
						if (document.getElementById("enemyhealth").value === 0) {
							socket.emit("userwon", person);
						}
					} else if (
						targetmatrix.m41 === matrix4.m41 &&
						targetmatrix.m43 === matrix4.m43
					) {
						document.getElementById("enemyhealth").value--;
						socket.emit("playerhit", person);
						if (document.getElementById("enemyhealth").value === 0) {
							socket.emit("userwon", person);
						}
					}
				}, 2000);
			} else {
				if (ammo === 0) {
						universe.hidden = true;
					Swal.fire({text: "No ammo. reloading in 3 seconds..."}).then(()=> {universe.hidden = false;})

					setTimeout(() => {
						ammo = 20;
						document.getElementById("ammo").innerHTML = "Ammo: " + ammo;
					}, 3000);
				} else {
					ammo--;
					document.getElementById("ammo").innerHTML = "Ammo: " + ammo;
					matrix = new WebKitCSSMatrix(
						window.getComputedStyle(document.getElementById("bullet")).transform
					);
					matrix4 = new WebKitCSSMatrix(
						window.getComputedStyle(document.getElementById("universe")).transform
					);

					matrix3 = new WebKitCSSMatrix(window.getComputedStyle(sol1).transform);
					if (range === 200) {
						setTimeout(() => {
							if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 200
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 150
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 100
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 50
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							}
						}, 1000);
					} else if (range === 500) {
						setTimeout(() => {
							if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 500
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 450
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 400
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 350
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 300
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
								}
								pclick(sol1);
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 250
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 200
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
								}
								pclick(sol1);
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 150
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 100
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
								}
								pclick(sol1);
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a - 50
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								}
							} else if (
								matrix.m41 === matrix3.m41 - (-matrix4.m41 - 1000) &&
								matrix3.m43 === -a
							) {
								document.getElementById("enemyhealth").value--;
								if (document.getElementById("enemyhealth").value === 0) {
									pclick(sol1);
								} else {
								}
							}
						}, 1000);
					}
				}
			}
		}
		newgun();
		matrix = new WebKitCSSMatrix(
			window.getComputedStyle(document.getElementById("bullet")).transform
		);
		matrix4 = new WebKitCSSMatrix(
			window.getComputedStyle(document.getElementById("universe")).transform
		);
		sol1 = document.getElementById("panther");
		matrix3 = new WebKitCSSMatrix(window.getComputedStyle(sol1).transform);
		socket.emit("move", matrix4);
		a = parseInt(a);
		b = parseInt(b);
		y = parseInt(y);
		you = document.getElementById("universe");
		matrix4 = new WebKitCSSMatrix(window.getComputedStyle(you).transform);
		document.getElementById("coordinates").innerHTML =
			"You are at X: " + (-matrix4.m41 - 1000) + " Z: " + matrix4.m43;
		if (ps < 25) {
			document.getElementById("enemy").innerHTML =
				"A soldier is at X: " + matrix3.m41 + " Z: " + -matrix3.m43;
		}
		kill();
		socket.emit("keypress", person);
	});
	socket.emit("move", matrix4);
	socket.on("playermoved", (player) => {
		console.log(player);
		document.getElementById(player).style.transform =
			"translateZ(" +
			playera +
			"px) perspective(" +
			playera * 1.5 +
			"px) translateX(" +
			playerb +
			"px) ";
	});
	var dirt = document.getElementById("boxDiv");
	var rows = document.getElementById("mainDiv");
	var dirtnew;
	for (var i = 0; i < 7000; i += 50) {
		dirtnew = dirt.cloneNode(true);
		dirtnew.style.transform =
			"translateY(" + -i + "px) translateX(" + (i - 2500) + "px)";
		dirtnew.style.height = "50px";
		dirtnew.style.width = "50px";
		dirtnew.style.transformStyle = "preserve-3d";
		rows.appendChild(dirtnew);
	}
	var newrow;
	var z = 0;
	while (z < 140) {
		z++;
		newrow = rows.cloneNode(true);
		newrow.style.top = "100px";
		newrow.style.height = "1000px";
		newrow.style.width = "1000px";
		newrow.style.transformStyle = "preserve-3d";
		newrow.style.perspective = "800px";
		newrow.style.position = "absolute";
		newrow.style.transform =
			"rotateX(180deg) translateY(1600px) perspective(6000px) translateZ(" +
			(z * 50 + 1000) +
			"px)";

		document.getElementById("world").appendChild(newrow);
	}

	socket.on("winner", (winner) => {
		winners++;
			universe.hidden = true;

		Swal.fire({ text: winner + " has a final spot!"}).then(()=> {universe.hidden = false;})

	});
	socket.on("winners", (people) => {
		console.log(people);
		if (people.includes(person)) {
				universe.hidden = true;

			Swal.fire({text : "The fight shall begin!"}).then(()=> {universe.hidden = false;})

			fight = true;
			health.max = 20;
			health.value = 20;
			document.getElementById("ammo").innerHTML = "Ammo: ∞";
			document.getElementById("enemyhealth").max = 20;
			document.getElementById("enemyhealth").value = 20;
			document.getElementById("enemy").innerHTML =
				"The target is at X: " +
				(-1000 - targetmatrix.m41) +
				" Z: " +
				targetmatrix.m43;
			document.getElementById("enemyhealth").hidden = false;
			document.getElementById("healthp").hidden = false;
		} else {
				universe.hidden = true;

			Swal.fire({
				text: "Sorry, you did not finish before the other players. Good luck next time!"
				  }).then(()=> {universe.hidden = false;})

		}
	});
	socket.on("enemymoved", (enematrix) => {
		if (ps >= 25) {
			otherplayer = document.getElementById("other");
			targetmatrix = enematrix;
			document.getElementById("enemy").innerHTML =
				"The target is at X: " + (-1000 - enematrix.m41) + " Z: " + enematrix.m43;
			otherplayer.style.transform =
				"translateZ(" + enematrix.m43 + "px) translateX(" + enematrix.m41 + "px)";
			if (
				targetmatrix.m43 - matrix4.m43 <= 500 &&
				targetmatrix.m43 - matrix4.m43 >= 0 &&
				targetmatrix.m41 === matrix4.m41
			) {
				otherplayer.style.zIndex = "9";
			}
		}
	});
	socket.on("damage", () => {
		health.value--;
		if (health.value === 0) {
				universe.hidden = true;

			Swal.fire({text: "Nice try. However, you did not win. Better luck next time!"}).then(()=> {universe.hidden = false;})

			socket.emit("loser", person);
			location.reload();
		}
	});
	socket.on("roomnotjoined", () => {
			universe.hidden = true;

		Swal.fire({text:"Room name or password is incorrect. Reloading now..."}).then(()=> {universe.hidden = false;})

		location.reload();
	})
	socket.on("winnerchosen", () => {
			universe.hidden = true;

		Swal.fire({text:"You Won!"}).then(()=> {universe.hidden = false;})

		location.reload();
	});
	var t = 0;
	for (var i = 0; i < document.getElementsByClassName("tree").length; i++) {
		t = Math.floor(Math.random() * 20);
		if (t === 10) {
			document.getElementsByClassName("tree")[i].hidden = false;
		}
	}
}

})()
