var globalPrice = 0;

// Classe Pizza
class Pizza {
	constructor(id, img, nom, prix) {
		this.theId = id;
		this.theImg = img;
		this.theName = nom;
		this.thePrice = prix;
	}

	get theId() {
		return this.id;
	}
	get theImg() {
		return this.img;
	}
	get theName() {
		return this.nom;
	}
	get thePrice() {
		return this.prix;
	}

	set theId(id) {
		this.id = id;
	}
	set theImg(img) {
		this.img = img;
	}
	set theName(nom) {
		this.nom = nom;
	}
	set thePrice(prix) {
		this.prix = prix;
	}
}

//Classe des pizza qui sont deja commande
class PizzaCommanded extends Pizza {
	constructor(id, img, nom, prix, nombre = 1) {
		super(id, img, nom, prix);
		this.theNumber = nombre;
	}

	get theNumber() {
		return this.nombre;
	}
	set theNumber(nombre) {
		this.nombre = nombre;
	}

	get theTotalPrice() {
		return this.prix * this.nombre;
	}
}

//Liste des pizza disponibles
const listeDesPizzaDisponibles = [
	new Pizza(1, "../css/media/images/image1.jpg", "Margherita", 250.0),
	new Pizza(2, "../css/media/images/image2.jpg", "Reine", 350.0),
	new Pizza(3, "../css/media/images/image3.jpg", "Napolitaine", 400.0),
	new Pizza(4, "../css/media/images/image4.jpg", "Marinara", 550.0),
	new Pizza(5, "../css/media/images/image5.jpg", "Diavola", 540.0),
	new Pizza(6, "../css/media/images/image6.jpg", "Romana", 350.0),
	new Pizza(7, "../css/media/images/image7.jpg", "Sicilienne", 440.0),
	new Pizza(8, "../css/media/images/image8.jpg", "Capricosa", 630.0),
	new Pizza(9, "../css/media/images/image9.jpg", "Quatre Saisons", 300.0),
	new Pizza(10, "../css/media/images/image10.jpg", "Quatre Fromages", 400.0),
	new Pizza(11, "../css/media/images/image11.jpg", "Calzone", 300.0),
	new Pizza(12, "../css/media/images/image12.jpg", "Toute Garnie", 200.0),
	new Pizza(13, "../css/media/images/image13.jpg", "Hawaïenne", 100.0),
	new Pizza(14, "../css/media/images/image14.jpg", "Pizza à la coupe", 600.0),
	new Pizza(
		15,
		"../css/media/images/image15.jpg",
		"Pizza au Saumon Fumé.",
		800.0
	),
];

class Store {
	static listeDesPizzasCommandes() {
		let pizzas;

		if (localStorage.getItem("pizzas") === null) {
			pizzas = [];
		} else {
			pizzas = JSON.parse(localStorage.getItem("pizzas"));
		}

		return pizzas;
	}

	static ajouterPizzaCommande(pizza) {
		let pizzas = Store.listeDesPizzasCommandes();
		pizzas.push(pizza);
		localStorage.setItem("pizzas", JSON.stringify(pizzas));
	}

	static removePizzaCommanded(idPizza) {
		let pizzas = Store.listeDesPizzasCommandes();

		pizzas.forEach((pizza, index) => {
			if (pizza.id === idPizza) {
				pizzas.splice(index, 1);
			}
		});

		localStorage.setItem("pizzas", JSON.stringify(pizzas));
	}

	static updatePizzaCommanded(idPizza, nombre) {
		let pizzas = Store.listeDesPizzasCommandes();

		pizzas.forEach((pizza, index) => {
			if (pizza.id === idPizza) {
				pizza.nombre = nombre;
			}
		});

		localStorage.setItem("pizzas", JSON.stringify(pizzas));
	}
}

// Classe interface utilisateur
class InterfaceUtilisateur {
	static displayPizzasToCommand() {
		document
			.querySelector(".bouttonCarte")
			.addEventListener("click", () => {
				document
					.querySelector(".divDesPizzasDejaCommande")
					.classList.add("showCommands");
			});

		// Ajouter les pizzas disponible sur la page
		const pizzasDisponibles = listeDesPizzaDisponibles;
		let listeDesPizzasCommandes = Store.listeDesPizzasCommandes();

		const divDesPizzasDisponibles = document.querySelector(
			".divDesPizzasDisponibles"
		);

		divDesPizzasDisponibles.innerHTML = pizzasDisponibles
			.map(
				(pizzaDisponible) =>
					`
            <div data-id=${pizzaDisponible.theId} class="pizzaDivDisponibles">
                <img src=${pizzaDisponible.theImg} alt=${pizzaDisponible.theName}>
                <p class="pizzaNom">${pizzaDisponible.theName}</p>
                <p class="pizzaPrix">
                <span class="pizzaMontant">${pizzaDisponible.thePrice}</span>HTG
                </p>
                <button class="bouttonCommanderPizza">Commander</button> 
            </div>
        `
			)
			.join("");

		// Ajouter un pizza dans la carte d'achat
		const pizzaDivDisponibles = document.querySelectorAll(
			".pizzaDivDisponibles"
		);

		pizzaDivDisponibles.forEach((pizzaDivDisponible) => {
			pizzaDivDisponible.addEventListener("click", (event) => {
				const { target } = event;
				if (target.classList.contains("bouttonCommanderPizza")) {
					const pizzaACommander = target.parentNode;

					const pizzaACommanderId = parseInt(
						pizzaACommander.getAttribute("data-id")
					);
					const pizzaACommanderImgSrc =
						pizzaACommander.children[0].getAttribute("src");
					const pizzaACommanderNom =
						pizzaACommander.children[1].innerText;
					const pizzaACommanderPrix = parseFloat(
						pizzaACommander.children[2].children[0].innerText
					);

					listeDesPizzasCommandes = Store.listeDesPizzasCommandes();

					let pizzasId = listeDesPizzasCommandes.map(
						(lePizza) => lePizza.id
					);

					if (pizzasId.includes(pizzaACommanderId)) {
						alert("This Pizza Has Been Already Commanded");
					} else {
						Store.ajouterPizzaCommande(
							new PizzaCommanded(
								pizzaACommanderId,
								pizzaACommanderImgSrc,
								pizzaACommanderNom,
								pizzaACommanderPrix
							)
						);
						InterfaceUtilisateur.listerLesPizzasCommandes();
					}
				}
			});
		});
	}

	static listerLesPizzasCommandes() {
		let listeDesPizzasCommandes = Store.listeDesPizzasCommandes();

		if (!listeDesPizzasCommandes.length !== 0) {
			document.querySelector(".nbrPizza").textContent =
				listeDesPizzasCommandes.length;

			//Append Pizza That Already Commanded To The DOM
			globalPrice = 0;

			const divDesPizzasDejaCommande = document.querySelector(
				".divDesPizzasDejaCommande"
			);

			divDesPizzasDejaCommande.innerHTML = listeDesPizzasCommandes
				.map((pizzaDejaCommande) => {
					globalPrice +=
						pizzaDejaCommande.prix * pizzaDejaCommande.nombre;
					return `
                    <div data-id=${pizzaDejaCommande.id} class="pizzaDivCommande">
                        <div class="pizzaCommanderInfo">
                            <img src=${pizzaDejaCommande.img} alt=${pizzaDejaCommande.nom} />
                            <p class="pizzaCommanderNom">${pizzaDejaCommande.nom}</p>
                        </div>
                        <div class="pizzaCommanderInfosPrix">
                            <p class="pizzaCommanderInfosPrixLabel">Prix</p>
                            <p class="pizzaCommanderInfosPrixTetxt"><span class="pizzaCommanderInfosPrixTextMontant">${pizzaDejaCommande.prix}</span> HTG</p>
                        </div>
                        <div class="pizzaCommanderInfosNombre">
                            <p class="pizzaCommanderInfosNombreLabel">Nombre</p>
                            <input type="number" value=${pizzaDejaCommande.nombre} class="pizzaCommanderInfosNombreValeur" />
                        </div>
                        <button class="supprimmerCommandeBoutton">Supprimer</button>
                    </div>
                `;
				})
				.join("");

			// Afficher le prix total dans la page
			const totalprixdiv = document.createElement("div");
			totalprixdiv.classList.add("totalprixdiv");
			totalprixdiv.innerHTML = `
				<p class="totalPrice">
						Prix Total: <span class="prix">${globalPrice}</span> HTG
				</p>
			`;

			divDesPizzasDejaCommande.insertBefore(
				totalprixdiv,
				divDesPizzasDejaCommande.querySelector(".pizzaDivDisponible")
			);

			//Fermer la page commande
			const closeBtn = document.createElement("button");
			closeBtn.classList.add("closeBtn");
			closeBtn.innerHTML = `X`;

			closeBtn.addEventListener("click", () => {
				document
					.querySelector(".divDesPizzasDejaCommande")
					.classList.remove("showCommands");
			});

			divDesPizzasDejaCommande.insertBefore(
				closeBtn,
				divDesPizzasDejaCommande.querySelector(".totalprixdiv")
			);

			// Supprimmer un pizza commande
			const supprimmerCommandeBouttons = document.querySelectorAll(
				".supprimmerCommandeBoutton"
			);

			supprimmerCommandeBouttons.forEach((supprimmerCommandeBoutton) => {
				supprimmerCommandeBoutton.addEventListener("click", (event) => {
					const { target } = event;

					const lePizzaASupprimmer = target.parentNode;

					let prix = parseFloat(
						lePizzaASupprimmer.querySelector(
							".pizzaCommanderInfosPrixTextMontant"
						).innerText
					);
					let nombre = parseFloat(
						lePizzaASupprimmer.querySelector(
							".pizzaCommanderInfosNombreValeur"
						).value
					);

					let id = parseInt(
						lePizzaASupprimmer.getAttribute("data-id")
					);

					listeDesPizzasCommandes.forEach((pizzaDivDisponible) => {
						if (pizzaDivDisponible.id === id) {
							Store.removePizzaCommanded(pizzaDivDisponible.id);
							InterfaceUtilisateur.listerLesPizzasCommandes();
							totalprixdiv.querySelector(
								".prix"
							).innerHTML = `${globalPrice}`;
						}
					});
				});
			});

			// Modifier Nombre Commande
			const commandesNombreAModifiees = document.querySelectorAll(
				".pizzaCommanderInfosNombreValeur"
			);

			commandesNombreAModifiees.forEach((commandeAModifiee) => {
				commandeAModifiee.addEventListener("change", (event) => {
					const { target } = event;

					const leCommandeAModifier = target.parentNode.parentNode;

					let nombre = leCommandeAModifier.querySelector(
						".pizzaCommanderInfosNombreValeur"
					).value;
					let nouveauNombre = nombre === "" ? 1 : parseInt(nombre);

					let id = parseInt(
						leCommandeAModifier.getAttribute("data-id")
					);

					listeDesPizzasCommandes.forEach((pizzaDivDisponible) => {
						if (pizzaDivDisponible.id === id) {
							pizzaDivDisponible.nombre =
								nouveauNombre <= 0 ? 1 : nouveauNombre;
							Store.updatePizzaCommanded(
								pizzaDivDisponible.id,
								pizzaDivDisponible.nombre
							);
							InterfaceUtilisateur.listerLesPizzasCommandes();
							totalprixdiv.querySelector(".prix").innerHTML =
								globalPrice;
						}
					});
				});
			});
		}
	}
}

// Evenements
document.addEventListener("DOMContentLoaded", () => {
	InterfaceUtilisateur.displayPizzasToCommand();
	InterfaceUtilisateur.listerLesPizzasCommandes();
});
