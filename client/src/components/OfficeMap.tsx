import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const BENGALI_FONT = "'Hind Siliguri', 'DM Sans', sans-serif";

/* ── Exact coordinates from screenshot (Purba Hati Road, Hemayetpur) ── */
const LAT = 23.8548;
const LNG = 90.2468;
const ZOOM = 17;

const MAP_OPEN_URL = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;
const OSM_OPEN_URL = `https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LNG}#map=${ZOOM}/${LAT}/${LNG}`;

/* Leaflet CSS */
const leafletCssId = "leaflet-css";

function ensureLeafletCSS() {
  if (document.getElementById(leafletCssId)) return;
  const link = document.createElement("link");
  link.id = leafletCssId;
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(link);
}

/* Custom pulsing marker HTML */
function createMarkerHTML(label: string) {
  return `
    <div style="position:relative;width:40px;height:48px;">
      <div style="
        position:absolute;bottom:0;left:50%;transform:translateX(-50%);
        width:20px;height:20px;background:linear-gradient(135deg,#06b6d4,#a855f7);
        border-radius:50% 50% 0 50%;transform:translateX(-50%) rotate(45deg);
        box-shadow:0 4px 16px rgba(6,182,212,0.6);
        border:2px solid white;
      "></div>
      <div style="
        position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);
        width:36px;height:36px;border-radius:50%;
        background:rgba(6,182,212,0.2);
        animation:mapPulse 2s ease-out infinite;
        pointer-events:none;
      "></div>
    </div>
  `;
}

function createPopupHTML(label: string, address: string, dirLabel: string, url: string) {
  return `
    <div style="font-family:'DM Sans',sans-serif;min-width:200px;padding:4px 2px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#06b6d4,#a855f7);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'/><circle cx='12' cy='10' r='3'/></svg>
        </div>
        <div>
          <p style="margin:0;font-weight:800;font-size:13px;color:#0f172a;line-height:1.2;">Creavix IT Solution</p>
          <p style="margin:0;font-size:10px;font-weight:600;color:#06b6d4;text-transform:uppercase;letter-spacing:0.05em;">Verified Agency</p>
        </div>
      </div>
      <p style="margin:0 0 10px;font-size:11.5px;color:#475569;line-height:1.5;">${address}</p>
      <a href="${url}" target="_blank" rel="noopener noreferrer"
        style="display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#06b6d4,#0891b2);color:white;text-decoration:none;padding:6px 12px;border-radius:8px;font-size:11px;font-weight:700;box-shadow:0 2px 8px rgba(6,182,212,0.4);">
        <svg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0'/><path d='m9 12 2 2 4-4'/></svg>
        ${dirLabel}
      </a>
    </div>
  `;
}

interface OfficeMapProps {
  height?: string;
}

export function OfficeMap({ height = "420px" }: OfficeMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const isDark = theme === "dark";
  const isBn = lang === "bn";

  const address = isBn ? "১৩৪০, পূর্ব হাটি রোড, হেমায়েতপুর, সাভার, ঢাকা।" : "1340, East Hati Road, Hemayetpur, Savar, Dhaka.";
  const dirLabel = isBn ? "দিকনির্দেশনা পান" : "Get Directions";
  const agencyLabel = isBn ? "ক্রিয়েভিক্স আইটি সলিউশন" : "Creavix IT Solution";

  useEffect(() => {
    ensureLeafletCSS();

    /* Inject pulse animation keyframe */
    const styleId = "leaflet-pulse-anim";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes mapPulse {
          0% { transform: translateX(-50%) scale(1); opacity: 0.6; }
          70% { transform: translateX(-50%) scale(2.4); opacity: 0; }
          100% { transform: translateX(-50%) scale(2.4); opacity: 0; }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 14px !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(6,182,212,0.2) !important;
          padding: 0 !important;
          overflow: hidden;
        }
        .leaflet-popup-content {
          margin: 14px 14px 12px !important;
        }
        .leaflet-popup-tip {
          background: white !important;
        }
        .leaflet-control-zoom a {
          border-radius: 8px !important;
        }
      `;
      document.head.appendChild(style);
    }

    let L: typeof import("leaflet");
    let mapInstance: ReturnType<typeof import("leaflet").map>;

    import("leaflet").then((mod) => {
      L = mod.default ?? mod;
      if (!mapRef.current || mapInstanceRef.current) return;

      /* Fix default icon paths */
      const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      /* Init map */
      mapInstance = L.map(mapRef.current, {
        center: [LAT, LNG],
        zoom: ZOOM,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      mapInstanceRef.current = mapInstance;

      /* Tile layer */
      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      ).addTo(mapInstance);

      /* Custom div icon with pulsing ring */
      const divIcon = L.divIcon({
        html: createMarkerHTML(agencyLabel),
        className: "",
        iconSize: [40, 48],
        iconAnchor: [20, 48],
        popupAnchor: [0, -52],
      });

      /* Marker with popup */
      const marker = L.marker([LAT, LNG], { icon: divIcon }).addTo(mapInstance);
      marker.bindPopup(
        createPopupHTML(agencyLabel, address, dirLabel, MAP_OPEN_URL),
        { maxWidth: 260, minWidth: 220 }
      );

      /* Auto-open popup on load */
      setTimeout(() => { marker.openPopup(); }, 600);
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as ReturnType<typeof import("leaflet").map>).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl"
      style={{
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)",
        boxShadow: isDark
          ? "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(6,182,212,0.08)"
          : "0 8px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(6,182,212,0.1)",
      }}
    >
      {/* Gradient accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 z-[1000] pointer-events-none"
        style={{ background: "linear-gradient(90deg, #06b6d4, #a855f7, #22c55e)" }} />

      {/* Map container */}
      <div
        ref={mapRef}
        data-testid="leaflet-map"
        style={{
          height,
          width: "100%",
          filter: isDark ? "brightness(0.85) saturate(0.9)" : "none",
          zIndex: 1,
        }}
      />

      {/* "Open in Google Maps" overlay button — bottom right */}
      <a
        href={MAP_OPEN_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-open-map-overlay"
        className="absolute bottom-3 right-3 z-[1000] flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.95)",
          color: "#0891b2",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          backdropFilter: "blur(6px)",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          fontFamily: isBn ? BENGALI_FONT : undefined,
        } as React.CSSProperties}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        {isBn ? "গুগল ম্যাপে দেখুন" : "Open in Maps"}
      </a>
    </div>
  );
}
