"use client";

import { useEffect, useRef } from "react";

const CHARS = "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF{}[]()<>/\\;:=+-*&|!?#$%@~^_".split("");

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 13;
    let cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    // Цвета в стиле люкс — золото, платина, тёплый антрацит
    const colors = [
      "rgba(201, 168, 76, 0.45)",  // шампанское золото
      "rgba(154, 122, 46, 0.40)",  // тёмное золото
      "rgba(226, 196, 122, 0.35)", // светлое золото
      "rgba(168, 168, 168, 0.30)", // платина
      "rgba(201, 168, 76, 0.55)",  // яркое золото
      "rgba(120, 100, 50, 0.35)",  // бронза
      "rgba(212, 212, 212, 0.25)", // серебро
      "rgba(180, 150, 60, 0.40)",  // золото-бронза
    ];

    const draw = () => {
      ctx.fillStyle = "rgba(12, 10, 7, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(Math.random() * -100);

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Первый символ ярче (белый/светлый)
        if (Math.random() > 0.975) {
          ctx.fillStyle = "rgba(240, 220, 160, 0.95)";
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.4;
      }
    };

    const interval = setInterval(draw, 45);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.45 }}
    />
  );
}
