const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles = []

class Particle {
    constructor(x, y, color, size) {
        this.x = x
        this.y = y
        this.color = color
        this.size = size
        this.speedX = Math.random() * 4 - 2
        this.speedY = Math.random() * 4 - 2
        this.alpha = 1
    }
    update() {
        this.x += this.speedX
        this.y += this.speedY
        this.alpha -= 0.01
    }
    draw() {
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
}

function createFirework(x, y) {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF']
    for (let i = 0; i < 50; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        particles.push(new Particle(x, y, color, Math.random() * 3 + 1))
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw()
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1)
        }
    }
    requestAnimationFrame(animate)
}

function launchFireworksAutomatically() {
    setInterval(() => {
        const x = Math.random() * canvas.width
        const y = (Math.random() * canvas.height) / 2
        createFirework(x, y)
    }, 1000)
}

canvas.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY)
    const greeting = document.getElementById('greeting')
    const quote = document.getElementById('quote')
    greeting.classList.add('visible')
    quote.classList.add('visible')
})

animate()
launchFireworksAutomatically()

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})
