import React, { useEffect, useRef } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

interface HeaderAnimationProps {
  isDarkMode: boolean;
}

interface LogoParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const PARTICLE_COUNT = 13;

const HeaderAnimation: React.FC<HeaderAnimationProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoSrc = useBaseUrl("/img/databricks-logo.png");

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = logoSrc;

    let animationFrame: number;
    let particles: LogoParticle[] = [];

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      updateCanvasSize();

      const minDim = Math.min(window.innerWidth, window.innerHeight);
      const scale = minDim / 1000;
      const size = 50 * scale;

      particles = [];
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * (w - size),
          y: Math.random() * (h - size),
          size,
          speedX: (Math.random() > 0.5 ? 1 : -1) * 0.25 * scale,
          speedY: (Math.random() > 0.5 ? 1 : -1) * 0.15 * scale,
          opacity: 1,
        });
      }
    };

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      const bgColor = isDarkMode ? "#111111" : "#FAFAFA";
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x + p.size > w) p.speedX *= -1;
        if (p.y < 0 || p.y + p.size > h) p.speedY *= -1;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.drawImage(img, p.x, p.y, p.size, p.size);
        ctx.restore();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    img.onload = () => {
      initParticles();
      animate();
    };

    window.addEventListener("resize", updateCanvasSize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [logoSrc, isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default HeaderAnimation;
