const hero = document.querySelector(".hero");

//Functions
function randNumber(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}

function changeHeroImage() {
	let numberOfImage = 15;
	hero.style.cssText = `
        transition: all .15s ease-in-out;
        background: linear-gradient(rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)),
        url(./css/media/images/image${randNumber(
			1,
			numberOfImage
		)}.jpg) no-repeat center center/cover;
    `;
}

changeHeroImage();
setInterval(() => {
	changeHeroImage();
}, 15000);
