export default function roundAnimationCanvas() {
    const elem = document.querySelector(".b-experience-graphic__graph");
    if (!elem) return;

    // Get colors from CSS variable
    const canvasColors = getComputedStyle(elem)
        .getPropertyValue('--canvas-color')
        .split(',')
        .map(c => c.trim()) // remove extra spaces
        .filter(c => c.length);  // remove empty strings in arr

    // Массив состояний для hover
    const mouseStates = Array(canvasColors.length).fill(null).map(() => ({ value: false }));

    // Configuration for each circle. Create an array with circle objects
    const circles = canvasColors.map((color, i) => ({
        id: `moleculeCanvas${i + 1}`,
        color,
        radius: 200,
        hoverState: mouseStates[i]
    }));

    class Point {
        constructor(angle, index, centerX, centerY, radius) {
            this.angle = angle;
            this.index = index;
            this.baseX = centerX + radius * Math.cos(angle);
            this.baseY = centerY + radius * Math.sin(angle);
            this.x = this.baseX;
            this.y = this.baseY;
            this.vx = 0;
            this.vy = 0;
        }

        update({ radius, centerX, centerY, time, mouseActive }) {
            // Радиус колебаний при наведении
            let waveRadius = radius;
            if (mouseActive) {
                const waveAmplitude = 22;
                const waveFrequency = 2.2;
                // const wavePhase = time * waveFrequency + this.index * 0.3;
                const wavePhase = time * waveFrequency + this.index * 0.04;
                waveRadius = radius + Math.sin(wavePhase) * waveAmplitude;
            }

            const targetX = centerX + waveRadius * Math.cos(this.angle);
            const targetY = centerY + waveRadius * Math.sin(this.angle);

            const dx = targetX - this.x;
            const dy = targetY - this.y;

            const springConstant = 0.05;
            const damping = 0.95
            const noise = 0.35 ;

            if (!mouseActive) {
                this.x = this.baseX
                this.y = this.baseY;
            } else {
                this.vx += dx * springConstant + (Math.random() - 0.5) * noise;
                this.vy += dy * springConstant + (Math.random() - 0.5) * noise;
                this.vx *= damping;
                this.vy *= damping;
                this.x += this.vx;
                this.y += this.vy;

            }




        }
    }

    function initCircle({ id, color, radius, hoverState }) {
        const canvas = document.getElementById(id);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Размеры канваса
        canvas.width = radius + 200;
        canvas.height = radius * 2 + 50;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const numPoints = 60;
        let time = 0;

        const points = Array.from({ length: numPoints }, (_, i) => {
            const angle = (i / numPoints) * 2 * Math.PI;
            return new Point(angle, i, centerX, centerY, radius);
        });

        function drawShape() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < numPoints; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        }

        function animate() {
            time += 0.03;
            points.forEach(p =>
                p.update({ radius, centerX, centerY, time, mouseActive: hoverState.value })
            );
            drawShape();
            requestAnimationFrame(animate);
        }

        animate();
    }

    circles.forEach(initCircle);

    // Hover-события для секций опыта
    document.querySelectorAll('.b-experience').forEach((exp, index) => {
        if (!mouseStates[index]) return;
        exp.addEventListener('mouseenter', () => (mouseStates[index].value = true));
        exp.addEventListener('mouseleave', () => (mouseStates[index].value = false));
    });
}
