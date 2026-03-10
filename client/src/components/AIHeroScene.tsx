import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const NODES = [
  { id: 0, x: 8,  y: 18, label: "Visual AI",     color: "#06b6d4", size: 8,  delay: 0 },
  { id: 1, x: 25, y: 8,  label: "Neural Engine", color: "#a855f7", size: 10, delay: 0.4 },
  { id: 2, x: 72, y: 10, label: "Auto Edit",     color: "#f59e0b", size: 8,  delay: 0.8 },
  { id: 3, x: 92, y: 28, label: "Render AI",     color: "#06b6d4", size: 7,  delay: 0.2 },
  { id: 4, x: 6,  y: 62, label: "Story Gen",     color: "#a855f7", size: 9,  delay: 1.0 },
  { id: 5, x: 32, y: 78, label: "Deep Learn",    color: "#06b6d4", size: 7,  delay: 0.6 },
  { id: 6, x: 68, y: 82, label: "Motion AI",     color: "#f59e0b", size: 9,  delay: 1.2 },
  { id: 7, x: 90, y: 68, label: "Color AI",      color: "#a855f7", size: 7,  delay: 0.3 },
  { id: 8, x: 50, y: 20, label: "Data Vision",   color: "#10b981", size: 8,  delay: 0.7 },
  { id: 9, x: 50, y: 80, label: "Frame AI",      color: "#10b981", size: 8,  delay: 0.9 },
];

const EDGES = [
  [0,1],[1,2],[2,3],[3,7],[7,6],[6,9],[9,5],[5,4],[4,0],
  [1,8],[8,2],[8,3],[5,9],[1,5],[2,6],
];

function pct(v: number) { return `${v}%`; }

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const pts = NODES.map(n => ({
        x: n.x / 100 * W + Math.sin(t * 0.0004 + n.id * 1.2) * (W * 0.015),
        y: n.y / 100 * H + Math.cos(t * 0.0003 + n.id * 0.9) * (H * 0.02),
        color: n.color,
      }));

      EDGES.forEach(([a, b]) => {
        const pa = pts[a], pb = pts[b];
        const dist = Math.hypot(pb.x - pa.x, pb.y - pa.y);
        const alpha = 0.08 + 0.06 * Math.sin(t * 0.001 + a * 0.5);
        const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        grad.addColorStop(0, pa.color + Math.round(alpha * 255).toString(16).padStart(2,"0"));
        grad.addColorStop(1, pb.color + Math.round(alpha * 255).toString(16).padStart(2,"0"));
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();

        const progress = ((t * 0.0005 + a * 0.3) % 1 + 1) % 1;
        const px = pa.x + (pb.x - pa.x) * progress;
        const py = pa.y + (pb.y - pa.y) * progress;
        const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, 5);
        pulseGrad.addColorStop(0, pa.color + "cc");
        pulseGrad.addColorStop(1, pa.color + "00");
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = pulseGrad;
        ctx.fill();
      });

      pts.forEach((p, i) => {
        const node = NODES[i];
        const radius = node.size / 2 + 1.5 * Math.sin(t * 0.001 + i * 0.7);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
        glow.addColorStop(0, p.color + "55");
        glow.addColorStop(1, p.color + "00");
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "cc";
        ctx.fill();
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      t += 16;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.65 }}
    />
  );
}

export function AIHeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 ai-grid-bg" />

      <motion.div
        className="absolute rounded-full blur-[120px] pointer-events-none"
        style={{ width: "55%", height: "60%", left: "22%", top: "5%" }}
        animate={{
          background: [
            "radial-gradient(ellipse, rgba(6,182,212,0.09) 0%, transparent 70%)",
            "radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)",
            "radial-gradient(ellipse, rgba(6,182,212,0.09) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-[100px]"
        style={{ width: "30%", height: "50%", left: "0%", top: "30%" }}
        animate={{ opacity: [0.4, 0.7, 0.4], background: ["radial-gradient(ellipse,rgba(6,182,212,0.12),transparent)","radial-gradient(ellipse,rgba(168,85,247,0.1),transparent)","radial-gradient(ellipse,rgba(6,182,212,0.12),transparent)"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute rounded-full blur-[100px]"
        style={{ width: "28%", height: "45%", right: "2%", top: "20%" }}
        animate={{ opacity: [0.4, 0.7, 0.4], background: ["radial-gradient(ellipse,rgba(245,158,11,0.1),transparent)","radial-gradient(ellipse,rgba(168,85,247,0.08),transparent)","radial-gradient(ellipse,rgba(245,158,11,0.1),transparent)"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <NeuralCanvas />

      {NODES.map((node) => (
        <motion.div
          key={node.id}
          className="absolute hidden sm:flex items-center gap-1.5 pointer-events-none select-none"
          style={{ left: pct(node.x), top: pct(node.y), transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.5, 0.85, 0.5], y: [0, -6, 0] }}
          transition={{ opacity: { duration: 3 + node.id * 0.4, repeat: Infinity, delay: node.delay }, y: { duration: 4 + node.id * 0.3, repeat: Infinity, delay: node.delay * 0.5 } }}
        >
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-sm whitespace-nowrap"
            style={{ color: node.color, borderColor: node.color + "40", background: node.color + "12" }}
          >
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
