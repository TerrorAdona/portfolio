"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * HeroIllustration - Abstract visual representation of software development
 * Uses Canvas for performant animations with geometric shapes representing:
 * - Nodes/vertices (components, modules, services)
 * - Connections/edges (data flow, API calls, dependencies)
 * - Pulsing cores (active processes, builds, deployments)
 * - Floating particles (data packets, events, logs)
 */

interface HeroIllustrationProps {
  className?: string;
  size?: number;
}

export function HeroIllustration({ className, size = 400 }: HeroIllustrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const reducedMotion = useReducedMotion();
  const [initialized, setInitialized] = useState(false);

  // Configuration for the illustration
  const config = {
    nodeCount: 18,
    connectionDistance: 180,
    particleCount: 25,
    corePulseSpeed: 0.002,
    nodeFloatSpeed: 0.0008,
    particleSpeed: 0.3,
    colors: {
      primary: "#8B5CF6",      // violet-500
      secondary: "#6366F1",    // indigo-500
      tertiary: "#22D3EE",     // cyan-400
      glow: "rgba(139, 92, 246, 0.15)",
      glowStrong: "rgba(139, 92, 246, 0.3)",
      node: "rgba(250, 250, 250, 0.9)",
      nodeDim: "rgba(161, 161, 170, 0.6)",
      connection: "rgba(139, 92, 246, 0.12)",
      connectionActive: "rgba(139, 92, 246, 0.3)",
      particle: "rgba(34, 211, 238, 0.6)",
    },
  };

  // Node system
  interface Node {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    radius: number;
    angle: number;
    distance: number;
    speed: number;
    connections: number[];
    isCore: boolean;
    pulsePhase: number;
  }

  // Particle system
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    maxLife: number;
    color: string;
  }

  let nodes: Node[] = [];
  let particles: Particle[] = [];
  let centerX = 0;
  let centerY = 0;
  let width = 0;
  let height = 0;

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    centerX = width / 2;
    centerY = height / 2;

    // Create nodes in a structured but organic pattern
    nodes = [];
    const layers = [
      { count: 1, radius: 0, isCore: true },           // Center core
      { count: 6, radius: 80, isCore: false },         // Inner ring
      { count: 8, radius: 150, isCore: false },        // Middle ring
      { count: 3, radius: 220, isCore: false },        // Outer satellites
    ];

    let nodeIndex = 0;
    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2 + (layer.isCore ? 0 : Math.random() * 0.3);
        const distanceVariation = layer.isCore ? 0 : (Math.random() - 0.5) * 20;
        const radius = layer.isCore ? 12 : 6 + Math.random() * 4;

        nodes.push({
          x: centerX + Math.cos(angle) * (layer.radius + distanceVariation),
          y: centerY + Math.sin(angle) * (layer.radius + distanceVariation),
          baseX: centerX + Math.cos(angle) * (layer.radius + distanceVariation),
          baseY: centerY + Math.sin(angle) * (layer.radius + distanceVariation),
          radius,
          angle,
          distance: layer.radius + distanceVariation,
          speed: 0.0005 + Math.random() * 0.0008,
          connections: [],
          isCore: layer.isCore,
          pulsePhase: Math.random() * Math.PI * 2,
        });
        nodeIndex++;
      }
    });

    // Calculate connections based on distance
    nodes.forEach((node, i) => {
      nodes.forEach((other, j) => {
        if (i !== j) {
          const dx = node.baseX - other.baseX;
          const dy = node.baseY - other.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.connectionDistance) {
            node.connections.push(j);
          }
        }
      });
    });

    // Create particles
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      spawnParticle();
    }

    setInitialized(true);
  };

  const spawnParticle = (): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 50 + Math.random() * 150;
    const isCoreParticle = Math.random() < 0.3;

    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      vx: (Math.random() - 0.5) * config.particleSpeed * (isCoreParticle ? 0.5 : 1),
      vy: (Math.random() - 0.5) * config.particleSpeed * (isCoreParticle ? 0.5 : 1),
      size: isCoreParticle ? 2 + Math.random() * 2 : 1 + Math.random() * 1.5,
      life: 0,
      maxLife: 100 + Math.random() * 200,
      color: isCoreParticle ? config.colors.tertiary : config.colors.particle,
    };
  };

  const update = (deltaTime: number) => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Update nodes - floating animation
    nodes.forEach((node) => {
      if (!node.isCore) {
        node.angle += node.speed * deltaTime;
        const floatOffset = Math.sin(node.pulsePhase + node.angle * 3) * 8;
        node.x = node.baseX + Math.cos(node.angle) * floatOffset;
        node.y = node.baseY + Math.sin(node.angle) * floatOffset;
      }
      node.pulsePhase += config.corePulseSpeed * deltaTime;
    });

    // Update particles
    particles.forEach((particle) => {
      particle.x += particle.vx * deltaTime * 0.1;
      particle.y += particle.vy * deltaTime * 0.1;
      particle.life++;

      // Attract particles toward center slightly
      const dx = centerX - particle.x;
      const dy = centerY - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 20) {
        particle.vx += dx * 0.00001;
        particle.vy += dy * 0.00001;
      }
    });

    // Remove dead particles and spawn new ones
    particles = particles.filter((p) => p.life < p.maxLife);
    while (particles.length < config.particleCount) {
      particles.push(spawnParticle());
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Draw connections
    nodes.forEach((node, i) => {
      node.connections.forEach((j) => {
        if (j > i) { // Avoid duplicate lines
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.max(0, 1 - dist / config.connectionDistance) * 0.4;

          const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
          gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.5})`);
          gradient.addColorStop(0.5, `rgba(99, 102, 241, ${opacity})`);
          gradient.addColorStop(1, `rgba(34, 211, 238, ${opacity * 0.5})`);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    // Draw animated connection pulses (data flow)
    nodes.forEach((node, i) => {
      node.connections.forEach((j) => {
        if (Math.random() < 0.002) { // Rare pulse
          const other = nodes[j];
          // Could add pulse animation here
        }
      });
    });

    // Draw particles
    particles.forEach((particle) => {
      const lifeRatio = particle.life / particle.maxLife;
      const alpha = (1 - lifeRatio) * 0.6;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * (1 - lifeRatio * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace("0.6", String(alpha));
      ctx.fill();
    });

    // Draw nodes
    nodes.forEach((node) => {
      const pulse = node.isCore
        ? 1 + Math.sin(node.pulsePhase * 2) * 0.15
        : 1;

      const radius = node.radius * pulse;
      const isCore = node.isCore;

      // Glow effect for core
      if (isCore) {
        const glowRadius = radius * 3;
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
        gradient.addColorStop(0, "rgba(139, 92, 246, 0.25)");
        gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.1)");
        gradient.addColorStop(1, "rgba(34, 211, 238, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Node body
      const nodeGradient = ctx.createRadialGradient(
        node.x - radius * 0.3, node.y - radius * 0.3, 0,
        node.x, node.y, radius
      );
      nodeGradient.addColorStop(0, isCore ? "#FFFFFF" : "#FAFAFA");
      nodeGradient.addColorStop(1, isCore ? "#8B5CF6" : "#A1A1AA");

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = nodeGradient;
      ctx.fill();

      // Core inner highlight
      if (isCore) {
        ctx.beginPath();
        ctx.arc(node.x - radius * 0.2, node.y - radius * 0.2, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fill();
      }
    });

    // Draw active data pulses on connections (occasionally)
    if (Math.random() < 0.01) {
      const activeNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (activeNode.connections.length > 0) {
        const targetIdx = activeNode.connections[Math.floor(Math.random() * activeNode.connections.length)];
        const target = nodes[targetIdx];

        const pulseX = activeNode.x + (target.x - activeNode.x) * 0.5;
        const pulseY = activeNode.y + (target.y - activeNode.y) * 0.5;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
        const pulseGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 8);
        pulseGradient.addColorStop(0, "rgba(34, 211, 238, 0.6)");
        pulseGradient.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.fillStyle = pulseGradient;
        ctx.fill();
      }
    }
  };

  const animate = (timestamp: number) => {
    if (!initialized) return;

    const deltaTime = 16; // Fixed timestep for consistency
    update(deltaTime);
    draw();
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    init();
    if (!reducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Draw static version for reduced motion
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          draw();
        }
      }
    }

    const handleResize = () => {
      init();
      if (reducedMotion) draw();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [reducedMotion, initialized]);

  // Mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      nodes.forEach((node) => {
        if (!node.isCore) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150 * 0.5;
            node.x += dx * force * 0.1;
            node.y += dy * force * 0.1;
          }
        }
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  return (
    <motion.div
      className={cn("relative w-full h-full max-w-[600px] max-h-[600px] mx-auto", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-hidden="true"
        role="img"
        aria-label="Illustration abstraite représentant l'architecture logicielle avec des nœuds interconnectés symbolisant les composants, services et flux de données d'une application moderne"
      />
      {/* Decorative overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(9, 9, 11, 0.8) 100%)",
        }}
      />
    </motion.div>
  );
}

import { cn } from "../../lib/utils";