document.addEventListener('DOMContentLoaded', () => {
    // 1. Accordion (折疊面板) 互動邏輯
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = content.classList.contains('open');

            // 關閉其他開啟項
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('open');
                item.style.maxHeight = null;
            });
            document.querySelectorAll('.accordion-header').forEach(btn => {
                btn.classList.remove('active');
            });

            // 切換當前點擊項
            if (!isOpen) {
                header.classList.add('active');
                content.classList.add('open');
                content.style.maxHeight = content.scrollHeight + 30 + 'px';
            }
        });
    });

    // 2. 哥德大氣微粒繪製 (Canvas Particles)
    const canvas = document.getElementById('ambient-canvas');
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height + height;
            this.size = Math.random() * 2 + 0.5;
            this.speedY = Math.random() * 0.6 + 0.1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.6 + 0.2;
            // 隨機選用血紅或暗金色
            this.color = Math.random() > 0.3 ? '191, 21, 21' : '212, 175, 55';
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            if (this.y < -10) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(${this.color}, 0.8)`;
            ctx.fill();
        }
    }

    const particleArray = [];
    const particleCount = 35; // 手機端保持效能，維持 35 個微粒

    for (let i = 0; i < particleCount; i++) {
        particleArray.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particleArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // 3. 按鈕儀式互動反饋 (Ritual Button Effect)
    const ritualBtn = document.getElementById('ritual-btn');
    ritualBtn.addEventListener('click', () => {
        // 觸發發光脈衝與提醒
        document.body.style.transition = 'filter 0.3s ease';
        document.body.style.filter = 'drop-shadow(0 0 15px rgba(191, 21, 21, 0.8))';
        
        setTimeout(() => {
            document.body.style.filter = 'none';
            alert('The nocturnal gates have been unsealed.');
        }, 300);
    });
});