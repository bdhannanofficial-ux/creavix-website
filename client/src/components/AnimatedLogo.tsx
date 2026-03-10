import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import logoImg from "@assets/new-logo_1773114552036.png";

function OrbitingDot({ radius, duration, startAngle, color, size = 5 }: {
  radius: number; duration: number; startAngle: number; color: string; size?: number;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{
        x: [
          Math.cos((startAngle * Math.PI) / 180) * radius,
          Math.cos(((startAngle + 90) * Math.PI) / 180) * radius,
          Math.cos(((startAngle + 180) * Math.PI) / 180) * radius,
          Math.cos(((startAngle + 270) * Math.PI) / 180) * radius,
          Math.cos((startAngle * Math.PI) / 180) * radius,
        ],
        y: [
          Math.sin((startAngle * Math.PI) / 180) * radius,
          Math.sin(((startAngle + 90) * Math.PI) / 180) * radius,
          Math.sin(((startAngle + 180) * Math.PI) / 180) * radius,
          Math.sin(((startAngle + 270) * Math.PI) / 180) * radius,
          Math.sin((startAngle * Math.PI) / 180) * radius,
        ],
        scale: [1, 1.4, 1, 1.4, 1],
        opacity: [0.9, 1, 0.9, 1, 0.9],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{ background: color, boxShadow: `0 0 ${size * 3}px ${color}` }}
      />
    </motion.div>
  );
}

function SparkleParticle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.8, 0],
        scale: [0, 1.2, 0.9, 0],
        rotate: [0, 90, 180],
      }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: Math.random() * 3 + 1.5, ease: "easeOut" }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 0L5.8 3.8L9 5L5.8 6.2L5 10L4.2 6.2L1 5L4.2 3.8Z" fill="white" opacity="0.85" />
      </svg>
    </motion.div>
  );
}

export function AnimatedLogo() {
  const glowCtrl = useAnimationControls();

  useEffect(() => {
    glowCtrl.start({
      background: [
        "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(245,158,11,0.22) 0%, rgba(6,182,212,0.12) 60%, transparent 80%)",
        "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(6,182,212,0.20) 0%, rgba(160,51,255,0.12) 60%, transparent 80%)",
        "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(160,51,255,0.22) 0%, rgba(245,158,11,0.10) 60%, transparent 80%)",
        "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(245,158,11,0.22) 0%, rgba(6,182,212,0.12) 60%, transparent 80%)",
      ],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    });
  }, [glowCtrl]);

  const sparkles = [
    { delay: 0.0, x: -90, y: -55 }, { delay: 0.6, x: 85, y: -65 },
    { delay: 1.2, x: 95, y: 45 },  { delay: 0.3, x: -80, y: 60 },
    { delay: 1.8, x: 0, y: -90 },  { delay: 2.4, x: -105, y: 5 },
    { delay: 0.9, x: 100, y: -10 }, { delay: 1.5, x: 50, y: 80 },
  ];

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: "clamp(200px, 40vw, 280px)", height: "clamp(200px, 40vw, 280px)" }}
    >

      <motion.div className="absolute inset-0 rounded-full" animate={glowCtrl} />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: "100%", height: "100%",
          border: "1.5px solid transparent",
          background: "linear-gradient(#0d1526, #0d1526) padding-box, linear-gradient(135deg, #f59e0b55, #06b6d455, #a033ff55, #f59e0b55) border-box",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: "78%", height: "78%",
          border: "1.5px solid transparent",
          background: "linear-gradient(#0d1526, #0d1526) padding-box, linear-gradient(225deg, #06b6d477, #a033ff55, #f59e0b44) border-box",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{ width: "60%", height: "60%", border: "1px solid rgba(6,182,212,0.15)" }}
        animate={{ rotate: 360, scale: [1, 1.03, 1] }}
        transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      />

      <OrbitingDot radius={120} duration={5} startAngle={0}   color="#f59e0b" size={7} />
      <OrbitingDot radius={120} duration={5} startAngle={180} color="#06b6d4" size={5} />
      <OrbitingDot radius={95}  duration={7} startAngle={90}  color="#a033ff" size={6} />
      <OrbitingDot radius={95}  duration={7} startAngle={270} color="#f59e0b" size={4} />
      <OrbitingDot radius={140} duration={9} startAngle={45}  color="#06b6d4" size={4} />

      {sparkles.map((s, i) => <SparkleParticle key={i} {...s} />)}

      <motion.div
        className="relative z-10"
        animate={{
          y: [0, -10, 0, 8, 0],
          rotate: [-1, 1, -0.5, 0.5, -1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 blur-2xl rounded-full"
          animate={{
            background: [
              "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(6,182,212,0.30) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(160,51,255,0.30) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)",
            ],
            scale: [1, 1.15, 1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src={logoImg}
          alt="Creavix IT Solution"
          data-testid="img-logo-animated"
          className="relative z-10 w-auto"
          style={{ height: "clamp(130px, 18vw, 200px)", filter: "drop-shadow(0 0 20px rgba(245,158,11,0.35))" }}
          animate={{
            filter: [
              "drop-shadow(0 0 20px rgba(245,158,11,0.4)) drop-shadow(0 0 40px rgba(245,158,11,0.15))",
              "drop-shadow(0 0 22px rgba(6,182,212,0.45)) drop-shadow(0 0 45px rgba(6,182,212,0.18))",
              "drop-shadow(0 0 20px rgba(160,51,255,0.40)) drop-shadow(0 0 40px rgba(160,51,255,0.16))",
              "drop-shadow(0 0 20px rgba(245,158,11,0.4)) drop-shadow(0 0 40px rgba(245,158,11,0.15))",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {["#f59e0b","#06b6d4","#a033ff","#06b6d4","#f59e0b"].map((c, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{ width: i === 2 ? 6 : 4, height: i === 2 ? 6 : 4, background: c }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
    </div>
  );
}
