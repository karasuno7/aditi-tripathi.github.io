const rocket = document.getElementById('rocket');
const exhaust = document.getElementById('exhaust');
const amplitude = 0.8;
const frequency = 0.05;

// Function to handle vibration (kept the same)
function vibrate() {
    const time = Date.now() * frequency;
    const offset = Math.sin(time) * amplitude;

    // Only horizontal vibration, no tilt involved here
    rocket.style.transform = `translateX(${offset}px)`;

    requestAnimationFrame(vibrate);
}

// Function to create exhaust line animation
function createExhaustLine() {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const x = 50 + (Math.random() - 0.5) * 12;
    const y1 = 185; // Adjusted to start at the bottom tip of the rocket
    const y2 = y1 + 5 + Math.random() * 10; // Shorter initial length
    line.setAttribute('x1', x);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#333');
    line.setAttribute('stroke-width', '2.5');
    line.setAttribute('opacity', '0.5');
    exhaust.appendChild(line);

    // Animate the line to move downward
    const animationDuration = 500; // Longer duration for slower movement
    const startTime = Date.now();

    function animate() {
        const elapsedTime = Date.now() - startTime;
        const progress = elapsedTime / animationDuration;
        const newY1 = y1 + progress * 40; // Move down by 30 pixels over the duration
        const newY2 = y2 + progress * 40;
        line.setAttribute('y1', newY1);
        line.setAttribute('y2', newY2);
        line.setAttribute('opacity', 1);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            exhaust.removeChild(line);
        }
    }

    animate();
}

// Function to animate the exhaust repeatedly
function animateExhaust() {
    createExhaustLine();
    setTimeout(animateExhaust, 150 + Math.random() * 150); // Longer delay between line creations
}

// Function to tilt the rocket based on hover over Blogs or Projects
function tiltRocket(direction) {
    if (direction === 'left') {
        rocket.style.transform = `rotate(-10deg) translateX(0)`; // Tilt left
    } else if (direction === 'right') {
        rocket.style.transform = `rotate(10deg) translateX(0)`; // Tilt right
    }
}

// Reset rocket tilt
function resetRocketTilt() {
    rocket.style.transform = `rotate(0deg) translateX(0)`; // Back to neutral position
}

// Add event listeners for hover on Blogs and Projects
document.querySelector('a[href="#blogs"]').addEventListener('mouseenter', function () {
    tiltRocket('left'); // Tilt towards Blogs
});

document.querySelector('.dropbtn').addEventListener('mouseenter', function () {
    tiltRocket('right'); // Tilt towards Projects
});

document.querySelector('a[href="#blogs"]').addEventListener('mouseleave', resetRocketTilt);
document.querySelector('.dropbtn').addEventListener('mouseleave', resetRocketTilt);

// Start the animations
vibrate();
animateExhaust();
