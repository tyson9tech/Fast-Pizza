class Client {
	constructor(username, email, password, connect) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.connect = connect;
	}

	get theConnect() {
		return connect;
	}

	set theConnect(connect) {
		this.connect;
	}
}

//Sing Up Clients
const sgnFrm = document.querySelector(".sgnFrm");

sgnFrm.addEventListener("submit", (e) => {
	e.preventDefault();

	const data = new FormData();

	data.append("username", sgnFrm.children[0].children[1].value);
	data.append("email", sgnFrm.children[1].children[1].value);
	data.append("password", sgnFrm.children[2].children[1].value);
	data.append("passwordConfirm", sgnFrm.children[3].children[1].value);

	if (
		data.get("username") !== "" &&
		data.get("email") !== "" &&
		data.get("password") !== "" &&
		data.get("passwordConfirm") !== "" &&
		data.get("password") === data.get("passwordConfirm")
	) {
		let clients;

		if (localStorage.getItem("Client") === null) {
			clients = [];
		} else {
			clients = JSON.parse(localStorage.getItem("Client"));
		}

		if (clients.length === 0) {
			clients.push(
				new Client(
					data.get("username"),
					data.get("email"),
					data.get("password"),
					true
				)
			);
			localStorage.setItem("Client", JSON.stringify(clients));
			alert("You have been added successfully");
		} else {
			let clientExiste = false;

			clients.forEach((client) => {
				if (
					client.username === data.get("username") ||
					client.email === data.get("email")
				) {
					clientExiste = true;
				}
			});

			if (clientExiste) {
				alert("Username or email already taken");
			} else {
				clients.push(
					new Client(
						data.get("username"),
						data.get("email"),
						data.get("password"),
						true
					)
				);

				clients.forEach((client) => {
					if (
						client.username !== data.get("username") &&
						client.password !== data.get("email")
					) {
						client.connect = false;
					}
				});

				localStorage.setItem("Client", JSON.stringify(clients));
				alert("You have been added successfully");
			}
		}
	} else {
		alert("Fill All the fields please or match the passwords fields");
	}
});

//Connect Clients
const logFrm = document.querySelector(".logFrm");

logFrm.addEventListener("submit", (e) => {
	e.preventDefault();

	const data = new FormData();

	data.append("usernameLog", logFrm.children[0].children[1].value);
	data.append("passwordLog", logFrm.children[1].children[1].value);

	if (data.get("usernameLog") !== "" && data.get("passwordLog") !== "") {
		let clients;

		if (localStorage.getItem("Client") === null) {
			clients = [];
		} else {
			clients = JSON.parse(localStorage.getItem("Client"));
		}

		if (clients.length === 0) {
			alert("Please create an account before trying to connect");
		} else {
			let clientExiste = false;
			let clientConnected = false;

			clients.forEach((client) => {
				if (
					client.username === data.get("usernameLog") &&
					client.password === data.get("passwordLog")
				) {
					clientExiste = true;

					if (client.connect === true) {
						clientConnected = true;
					} else {
						client.connect = true;
					}
				}
			});

			if (!clientExiste) {
				alert("Username or password inccorrect");
			} else {
				if (clientConnected) {
					alert("You're already connected");
				} else {
					clients.forEach((client) => {
						if (
							client.username !== data.get("usernameLog") &&
							client.password !== data.get("passwordLog")
						) {
							client.connect = false;
						}
					});

					localStorage.setItem("Client", JSON.stringify(clients));
					alert("You have been connected successfully");
				}
			}
		}
	} else {
		alert("Fill All the fields please");
	}
});
