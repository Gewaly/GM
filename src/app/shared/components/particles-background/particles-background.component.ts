import { Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-particles-background',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './particles-background.component.html',
    styleUrls: ['./particles-background.component.css']
})
export class ParticlesBackgroundComponent implements OnInit, OnDestroy {
    @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

    private ctx!: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private animationId: number = 0;
    private mouse = { x: -100, y: -100, radius: 150 }; // Interaction radius

    // Configuration
    private particleCount = 100; // Will be adjusted by screen size
    private connectionDistance = 100;
    private mouseConnectionDistance = 150;

    constructor(private ngZone: NgZone) { }

    ngOnInit(): void {
        // Run outside Angular to avoid change detection cycles triggering on every frame
        this.ngZone.runOutsideAngular(() => {
            this.initCanvas();
            this.animate();
        });
    }

    ngOnDestroy(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    private initCanvas() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;

        this.resizeCanvas();
        this.createParticles();
    }

    @HostListener('window:resize')
    resizeCanvas() {
        const canvas = this.canvasRef.nativeElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Adjust particle count based on resolution
        const area = (canvas.width * canvas.height) / 9000;
        this.particleCount = Math.floor(area);

        this.createParticles();
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.mouse.x = event.x;
        this.mouse.y = event.y;
    }

    private createParticles() {
        this.particles = [];
        const canvas = this.canvasRef.nativeElement;
        for (let i = 0; i < this.particleCount; i++) {
            const size = (Math.random() * 3) + 1;
            const x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            const y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            const directionX = (Math.random() * 2) - 1; // -1 to 1
            const directionY = (Math.random() * 2) - 1; // -1 to 1
            const color = '#2196f3'; // Blue color

            this.particles.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    private animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        const canvas = this.canvasRef.nativeElement;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(canvas, this.mouse);
            this.particles[i].draw(this.ctx);
        }

        this.connectParticles();
    }

    private connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = dx * dx + dy * dy;

                if (distance < (this.connectionDistance * this.connectionDistance)) {
                    opacityValue = 1 - (distance / (this.connectionDistance * this.connectionDistance));
                    this.ctx.strokeStyle = 'rgba(33, 150, 243, ' + opacityValue + ')'; // Blue
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                    this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
                    this.ctx.stroke();
                }
            }

            // Connect to mouse
            const dxMouse = this.particles[a].x - this.mouse.x;
            const dyMouse = this.particles[a].y - this.mouse.y;
            const distanceMouse = dxMouse * dxMouse + dyMouse * dyMouse;

            if (distanceMouse < (this.mouseConnectionDistance * this.mouseConnectionDistance)) {
                opacityValue = 1 - (distanceMouse / (this.mouseConnectionDistance * this.mouseConnectionDistance));
                this.ctx.strokeStyle = 'rgba(33, 150, 243, ' + opacityValue + ')';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.stroke();
            }
        }
    }
}

class Particle {
    constructor(
        public x: number,
        public y: number,
        public directionX: number,
        public directionY: number,
        public size: number,
        public color: string
    ) { }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(canvas: HTMLCanvasElement, mouse: any) {
        // Check boundary
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Check interaction with mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2;
            }
        }

        // Move
        this.x += this.directionX;
        this.y += this.directionY;
    }
}
