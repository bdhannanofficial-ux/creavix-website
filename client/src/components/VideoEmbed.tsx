import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

interface VideoEmbedProps {
  videoId: string;
  title: string;
  isShorts?: boolean;
}

export function VideoEmbed({ videoId, title, isShorts = false }: VideoEmbedProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const thumbHq = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const thumbMq = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  const open = useCallback(() => setModalOpen(true), []);
  const close = useCallback(() => setModalOpen(false), []);

  /* ── LANDSCAPE (16:9) — for full-length videos, plays inline ── */
  if (!isShorts) {
    return (
      <div
        className="group relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black border border-white/10 hover:border-white/20 transition-colors duration-300"
        style={{ aspectRatio: "16/9" }}
        data-testid={`video-card-${videoId}`}
      >
        {!loaded ? (
          <button
            className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
            style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" } as React.CSSProperties}
            onClick={() => setLoaded(true)}
            aria-label={`Play: ${title}`}
          >
            <img
              src={thumbHq}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              onError={e => { (e.target as HTMLImageElement).src = thumbMq; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:from-black/20 transition-all duration-300" />

            {/* Premium play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-active:scale-90"
                style={{
                  background: "rgba(255,0,0,0.92)",
                  boxShadow: "0 6px 32px rgba(255,0,0,0.55), 0 0 0 4px rgba(255,255,255,0.15)",
                }}
              >
                <Play fill="white" className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" />
              </div>
            </div>

            {/* Title at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
              <p className="text-white text-xs sm:text-sm font-medium leading-snug line-clamp-2 drop-shadow-lg text-left">
                {title}
              </p>
            </div>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd1080`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        )}
      </div>
    );
  }

  /* ── PORTRAIT (9:16) — for YouTube Shorts ── */
  return (
    <>
      <div
        className="group relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black cursor-pointer select-none"
        style={{
          aspectRatio: "9/16",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
        } as React.CSSProperties}
        onClick={open}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === "Enter" && open()}
        aria-label={`Play: ${title}`}
        data-testid={`video-card-${videoId}`}
      >
        <img
          src={thumbHq}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-95"
          loading="lazy"
          decoding="async"
          onError={e => { (e.target as HTMLImageElement).src = thumbMq; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/10 group-hover:from-black/25 transition-all duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-active:scale-90"
            style={{
              background: "rgba(255,0,0,0.9)",
              boxShadow: "0 4px 20px rgba(255,0,0,0.5), 0 0 0 3px rgba(255,255,255,0.18)",
            }}
          >
            <Play fill="white" className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" />
          </div>
        </div>

        {/* Shorts badge */}
        <div className="absolute top-2 left-2">
          <span
            className="text-[9px] font-black text-white tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,0,0,0.82)", backdropFilter: "blur(4px)" }}
          >
            SHORT
          </span>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <p className="text-white text-[10px] sm:text-xs font-medium leading-tight line-clamp-2 drop-shadow-md">
            {title}
          </p>
        </div>
      </div>

      {/* Fullscreen HD Modal for Shorts
          Close button is at z-[302] — above the iframe (z-[301]) so it always receives clicks */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              key={`overlay-${videoId}`}
              className="fixed inset-0 z-[300]"
              style={{ background: "rgba(0,0,0,0.97)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={close}
            />

            {/* Video container */}
            <motion.div
              key={`player-${videoId}`}
              className="fixed inset-0 z-[301] flex items-center justify-center pointer-events-none"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden pointer-events-auto"
                style={{
                  width: "min(95vw, 390px)",
                  height: "min(92vh, calc(390px * 16 / 9))",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd1080`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </motion.div>

            {/* Close button — fixed at z-[302], above the iframe, always clickable */}
            <motion.button
              key={`close-${videoId}`}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[302] w-11 h-11 rounded-full flex items-center justify-center text-white"
              style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.25)",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              } as React.CSSProperties}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={close}
              data-testid="button-close-video"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
