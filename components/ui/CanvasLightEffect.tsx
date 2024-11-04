import React, { useEffect, useRef } from "react";

interface CanvasLightEffectProps {
  bgColor?: string[]; // Array of two colors for the light gradient
  children: React.ReactNode; // Allow children to be passed into the container
}

// Light interface
interface Light {
  x: number;
  y: number;
}

const CanvasLightEffect: React.FC<CanvasLightEffectProps> = ({
  bgColor = ["#6343bb", "#31225e"], // Default gradient colors for the light
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef<Light>({ x: 140, y: 270 });
  const targetLightRef = useRef<Light>({ x: 140, y: 270 });
  const smoothingSpeed = 0.04;

  // Function to draw the light effect with customizable background colors
  const drawLight = (ctx: CanvasRenderingContext2D, light: Light) => {
    ctx.beginPath();
    ctx.arc(light.x, light.y, 1000, 0, 2 * Math.PI);
    const gradient = ctx.createRadialGradient(
      light.x,
      light.y,
      0,
      light.x,
      light.y,
      1000
    );
    gradient.addColorStop(0, bgColor[0]);
    gradient.addColorStop(1, bgColor[1]);
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  // Smooth transition of the light effect
  const smoothTransition = () => {
    const light = lightRef.current;
    const targetLight = targetLightRef.current;
    light.x += (targetLight.x - light.x) * smoothingSpeed;
    light.y += (targetLight.y - light.y) * smoothingSpeed;
    requestAnimationFrame(smoothTransition);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    lightRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    targetLightRef.current = { ...lightRef.current };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawLight(ctx, lightRef.current);
      requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetLightRef.current.x = e.clientX - rect.left;
      targetLightRef.current.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      targetLightRef.current.x = touch.clientX - rect.left;
      targetLightRef.current.y = touch.clientY - rect.top;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    resizeCanvas();
    draw();
    smoothTransition();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [bgColor]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        id="canvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: bgColor[1],
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default CanvasLightEffect;