const canvas = document.getElementById('wind-animation');
const ctx = canvas.getContext("2d");

function setCanvasDimensions() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

setCanvasDimensions()
window.addEventListener("resize", setCanvasDimensions)

class Particle {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.size = Math.random() * 3 + 1;
		this.speedX = Math.random() * 3 - 0.5;
		this.speedY = Math.random() * 0.5 - 0.25;

		// Gold/yellow color with random opacity
		const opacity = Math.random() * 0.5 + 0.1;
		this.color = `rgba(255, 215, 0, ${opacity})`;
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;

		// Reset particle position when it goes off screen
		if (this.x > canvas.width) {
			this.x = 0;
		} else if (this.x < 0) {
			this.x = canvas.width;
		}

		if (this.y > canvas.height) {
			this.y = 0;
		} else if (this.y < 0) {
			this.y = canvas.height;
		}
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

const particlesArray = [];
const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);

for (let i = 0; i < numberOfParticles; i++) {
	particlesArray.push(new Particle());
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw wind lines
	for (let i = 0; i < 20; i++) {
		const y = Math.random() * canvas.height;
		const width = Math.random() * 100 + 50;
		const opacity = Math.random() * 0.1;

		ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
		ctx.lineWidth = Math.random() * 2 + 0.5;
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(width, y);
		ctx.stroke();

		// Right side
		const rightY = Math.random() * canvas.height;
		ctx.beginPath();
		ctx.moveTo(canvas.width, rightY);
		ctx.lineTo(canvas.width - width, rightY);
		ctx.stroke();
	}

	// Update and draw particles
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
		particlesArray[i].draw();
	}
	requestAnimationFrame(animate);
}

animate();

