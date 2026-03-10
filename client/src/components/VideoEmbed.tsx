import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

interface VideoEmbedProps {
  videoId: string;
  title: string;
}

export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const thumbHq = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const thumbMq = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  const open = useCallback(() => setModalOpen(true), []);
  const close = useCallback(() => setModalOpen(false), []);

  return (
    <>
      {/* Portrait card — 9:16 shorts ratio */}
      <div
        className="group relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black cursor-pointer select-none"
        style={{ aspectRatio: "9/16", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" } as React.CSSProperties}
        onClick={open}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === "Enter" && open()}
        aria-label={`Play: ${title}`}
        data-testid={`video-card-${videoId}`}
      >
        {/* Thumbnail */}
        <img
          src={thumbHq}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-95"
          loading="lazy"
          decoding="async"
          onError={e => { (e.target as HTMLImageElement).src = thumbMq; }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/10 group-hover:from-black/30 transition-all duration-300" />

        {/* Play button — centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-active:scale-90 shadow-lg"
            style={{
              background: "rgba(255,0,0,0.9)",
              boxShadow: "0 4px 24px rgba(255,0,0,0.55), 0 0 0 3px rgba(255,255,255,0.18)",
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

        {/* Title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <p className="text-white text-[10px] sm:text-xs font-medium leading-tight line-clamp-2 drop-shadow-md">
            {title}
          </p>
        </div>
      </div>

      {/* Fullscreen HD Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="video-modal"
            className="fixed inset-0 z-[300] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.97)", touchAction: "none" } as React.CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={close}
          >
            <motion.div
              className="relative flex items-center justify-center"
              style={{ width: "100%", height: "100%" }}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Video container — portrait on mobile, bounded on desktop */}
              <div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden"
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

              {/* Close button */}
              <button
                onClick={close}
                data-testid="button-close-video"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  touchAction: "manipulation",
                } as React.CSSProperties}
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
