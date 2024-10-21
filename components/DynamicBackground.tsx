"use client"

import { useEffect, useRef } from 'react';

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();  // Set canvas size when the component mounts.

    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      icon: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 30 + 15;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.icon = ['🥊', '🏋️', '🔥', '👊', '💪'][Math.floor(Math.random() * 5)];
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > (canvas?.width || 0)) this.x = 0;
        else if (this.x < 0) this.x = canvas?.width || 0;

        if (this.y > (canvas?.height || 0)) this.y = 0;
        else if (this.y < 0) this.y = canvas?.height || 0;

        this.opacity += Math.random() * 0.02 - 0.01;
        if (this.opacity < 0.1) this.opacity = 0.1;
        if (this.opacity > 0.5) this.opacity = 0.5;
      }

      draw() {
        if (ctx) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.globalAlpha = this.opacity;
          ctx.font = `${this.size}px Arial`;
          ctx.fillText(this.icon, 0, 0);
          ctx.restore();
        }
      }
    }

    function init() {
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      resizeCanvas();
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}
