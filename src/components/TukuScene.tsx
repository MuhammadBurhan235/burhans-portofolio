import { useEffect, useRef, useCallback } from "react";

// ============================================================
// TIPE DATA
// ============================================================

interface Hotspot {
  style: React.CSSProperties;
  href: string;
  target?: string;
  outlineImg: string;
  popup: {
    img: string;
    style: React.CSSProperties;
  };
}

interface RoadPin {
  id: number;
  label: string;
  description: string;
  trigger: number; // 0.0 – 1.0, posisi pesawat pemicu
  posClass: string;
}

// ============================================================
// DATA HOTSPOT (dari mustache)
// ============================================================

const HOTSPOTS: Hotspot[] = [
  {
    style: { left: 70, top: 7, width: 128, height: 272 },
    href: "#",
    outlineImg:
      "https://tuku.coffee/_next/static/media/01_pesan_di_sini_outline.7d3aceec.webp",
    popup: {
      img: "https://tuku.coffee/_next/static/media/02_text_box_image.69c74767.webp",
      style: { position: "absolute", left: 90, top: 180, width: 175 },
    },
  },
  {
    style: { left: 306, top: 168, width: 368, height: 120 },
    href: "#lini-produk",
    outlineImg:
      "https://tuku.coffee/_next/static/media/06_menu_outline.cea0a188.webp",
    popup: {
      img: "https://tuku.coffee/_next/static/media/menu_tetangga_tuku_type_03.c1a90bf0.webp",
      style: { position: "absolute", left: 360, top: 0, width: 180 },
    },
  },
  {
    style: { left: 498, top: 320, width: 388, height: 207 },
    href: "https://beragam.co.id/en/",
    target: "_blank",
    outlineImg:
      "https://tuku.coffee/_next/static/media/05_bergam_roastery_outline.f25ecc01.webp",
    popup: {
      img: "https://tuku.coffee/_next/static/media/beragam_coffee_roastery_type_04.435e4c9a.webp",
      style: { position: "absolute", left: 80, top: -60, width: 200 },
    },
  },
  {
    style: { left: 186, top: 385, width: 280, height: 130 },
    href: "#lini-produk",
    outlineImg:
      "https://tuku.coffee/_next/static/media/04_tukudapan_outline.8f41d789.webp",
    popup: {
      img: "https://tuku.coffee/_next/static/media/tukudapan_type_01.0799cc55.webp",
      style: { position: "absolute", left: -60, top: -60, width: 160 },
    },
  },
  {
    style: { bottom: 102, left: 46, width: 395, height: 190 },
    href: "#lini-produk",
    outlineImg:
      "https://tuku.coffee/_next/static/media/03_selain_kopi_outline.db9b6e5b.webp",
    popup: {
      img: "https://tuku.coffee/_next/static/media/selain_kopi_type_02.f637f5b2.webp",
      style: { position: "absolute", left: 370, top: -70, width: 160 },
    },
  },
];

// ============================================================
// DATA ROADMAP PINS
// ============================================================

const ROAD_PINS: RoadPin[] = [
  { id: 1, label: "Registrasi",  description: "Isi form data diri.",    trigger: 0.08, posClass: "pos-1" },
  { id: 2, label: "Medex Check", description: "Tes kesehatan fisik.",   trigger: 0.28, posClass: "pos-2" },
  { id: 3, label: "Akademik",    description: "Ujian TPA & Inggris.",   trigger: 0.48, posClass: "pos-3" },
  { id: 4, label: "Interview",   description: "Wawancara User.",        trigger: 0.68, posClass: "pos-4" },
  { id: 5, label: "Onboard",     description: "Siap Pendidikan.",       trigger: 0.88, posClass: "pos-5" },
];

const ROAD_PATH = "M -100 350 L 350 350 C 550 350, 600 120, 800 120 L 1300 120";

// ============================================================
// KOMPONEN UTAMA
// ============================================================

export default function TukuScene() {
  // --- Refs Barista ---
  const wrapperRef = useRef<HTMLDivElement>(null);
  const baristaRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLDivElement>(null);

  // --- Refs Roadmap ---
  const roadmapRef  = useRef<HTMLDivElement>(null);
  const svgRef      = useRef<SVGSVGElement>(null);
  const pathDefRef  = useRef<SVGPathElement>(null);
  const pathProgRef = useRef<SVGPathElement>(null);
  const planeRef    = useRef<HTMLImageElement>(null);
  const pinsRef     = useRef<(HTMLDivElement | null)[]>([]);

  // ---- Barista: Ikuti Kursor ----
  const handleMouseMoveBarista = useCallback((e: MouseEvent) => {
    const canvas  = canvasRef.current;
    const barista = baristaRef.current;
    if (!canvas || !barista) return;

    const rect = canvas.getBoundingClientRect();
    let posisiBarista = e.clientX - rect.left - 112;
    posisiBarista = Math.max(-50, Math.min(950, posisiBarista));
    barista.style.left = `${posisiBarista}px`;
  }, []);

  // ---- Roadmap: Posisi Pesawat ----
  const setPlanePosition = useCallback((t: number) => {
    const pathDef  = pathDefRef.current;
    const pathProg = pathProgRef.current;
    const plane    = planeRef.current;
    const svg      = svgRef.current;
    if (!pathDef || !pathProg || !plane || !svg) return;

    const safeT      = Math.max(0, Math.min(1, t));
    const pathLen    = pathDef.getTotalLength();
    const currentLen = safeT * pathLen;

    // Update progress bar
    pathProg.style.strokeDashoffset = String(pathLen - currentLen);

    // Update posisi pesawat
    const p     = pathDef.getPointAtLength(currentLen);
    const pNext = pathDef.getPointAtLength(Math.min(currentLen + 10, pathLen));
    const angle = Math.atan2(pNext.y - p.y, pNext.x - p.x) * (180 / Math.PI);

    const rect = svg.getBoundingClientRect();
    const vb   = svg.viewBox.baseVal;
    const scaleX = rect.width  / vb.width;
    const scaleY = rect.height / vb.height;
    const visX = (p.x - vb.x) * scaleX;
    const visY = (p.y - vb.y) * scaleY;

    plane.style.left      = `${visX}px`;
    plane.style.top       = `${visY}px`;
    plane.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    // Aktivasi pin
    pinsRef.current.forEach((pin, i) => {
      if (!pin) return;
      const trig  = ROAD_PINS[i].trigger;
      const range = 0.08;
      if (safeT >= trig - range && safeT <= trig + range) {
        pin.classList.add("active");
      } else {
        pin.classList.remove("active");
      }
    });
  }, []);

  const handleMouseMoveRoadmap = useCallback(
    (e: MouseEvent) => {
      const roadmap = roadmapRef.current;
      if (!roadmap) return;
      const rect = roadmap.getBoundingClientRect();
      const t    = (e.clientX - rect.left) / rect.width;
      requestAnimationFrame(() => setPlanePosition(t));
    },
    [setPlanePosition]
  );

  const handleTouchMoveRoadmap = useCallback(
    (e: TouchEvent) => {
      const roadmap = roadmapRef.current;
      if (!roadmap) return;
      const rect = roadmap.getBoundingClientRect();
      const t    = (e.touches[0].clientX - rect.left) / rect.width;
      requestAnimationFrame(() => setPlanePosition(t));
    },
    [setPlanePosition]
  );

  // ---- Init & Cleanup ----
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const roadmap = roadmapRef.current;

    // Init barista listener
    if (wrapper) {
      wrapper.addEventListener("mousemove", handleMouseMoveBarista);
    }

    // Init roadmap listeners
    if (roadmap) {
      roadmap.addEventListener("mousemove", handleMouseMoveRoadmap);
      roadmap.addEventListener("touchmove", handleTouchMoveRoadmap, { passive: true });
    }

    // Init dasharray pesawat
    const initPlane = () => {
      const pathDef  = pathDefRef.current;
      const pathProg = pathProgRef.current;
      if (!pathDef || !pathProg) return;
      const len = pathDef.getTotalLength();
      pathProg.style.strokeDasharray  = `${len} ${len}`;
      pathProg.style.strokeDashoffset = String(len);
      setPlanePosition(0);
    };

    // Delay kecil agar SVG sudah di-render
    const timer = setTimeout(initPlane, 100);

    return () => {
      wrapper?.removeEventListener("mousemove", handleMouseMoveBarista);
      roadmap?.removeEventListener("mousemove", handleMouseMoveRoadmap);
      roadmap?.removeEventListener("touchmove", handleTouchMoveRoadmap);
      clearTimeout(timer);
    };
  }, [handleMouseMoveBarista, handleMouseMoveRoadmap, handleTouchMoveRoadmap, setPlanePosition]);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* ===== GLOBAL STYLES ===== */}
      <style>{`
        @keyframes ojol-masuk {
          0%   { transform: translateX(400px); opacity: 0; }
          100% { transform: translateX(0);      opacity: 1; }
        }
        @keyframes jalan-menul {
          0%   { transform: translateY(0px);   }
          50%  { transform: translateY(-10px); }
          100% { transform: translateY(0px);   }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        /* ---- Hotspot / Popup ---- */
        .tuku-hotspot { position: absolute; z-index: 60; cursor: pointer; }

        .tuku-popup {
          opacity: 0;
          transition: all 0.2s ease-out;
          pointer-events: none;
          transform: scale(0.8);
          z-index: 70;
        }
        .tuku-hotspot:hover .tuku-popup {
          opacity: 1;
          transform: scale(1);
        }

        /* ---- Ojol ---- */
        .area-ojol:hover .img-ojol {
          transform: translateX(0) !important;
        }

        /* ---- Roadmap PIN ---- */
        .roadmap-pin-wrapper {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 30;
          opacity: 0.4;
          transform: scale(0.8);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: grayscale(100%);
        }
        .roadmap-pin-wrapper.active {
          opacity: 1;
          transform: scale(1.1);
          filter: grayscale(0%);
          z-index: 60;
        }

        /* Pulse ring aktif */
        .roadmap-pin-wrapper.active .pin-circle::after {
          content: '';
          position: absolute;
          top: -10px; left: -10px; right: -10px; bottom: -10px;
          border-radius: 50%;
          border: 2px solid #3b82f6;
          animation: pulse-ring 1.5s infinite;
        }

        /* Posisi PIN */
        .road-pos-1 { bottom: 60px;  left: 5%;   }
        .road-pos-2 { bottom: 90px;  left: 25%;  }
        .road-pos-3 { top: 180px;    left: 45%;  }
        .road-pos-4 { top: 40px;     right: 28%; }
        .road-pos-5 { top: 40px;     right: 5%;  }

        /* Mobile */
        @media (max-width: 768px) {
          .road-layer { display: none !important; }
          .roadmap-pin-wrapper {
            position: relative !important;
            inset: auto !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            flex-direction: row;
            gap: 15px;
            margin-bottom: 20px;
            width: 100%;
          }
          .pin-circle { margin-bottom: 0; min-width: 48px; }
          .pin-card   { text-align: left; width: 100%; }
        }
      `}</style>

      {/* ===================================================== */}
      {/* SECTION 1 — TUKU COFFEE INTERACTIVE SCENE              */}
      {/* ===================================================== */}
      <div
        ref={wrapperRef}
        style={{
          width: "100%",
          overflowX: "auto",
          backgroundColor: "#f3f4f6",
          position: "relative",
        }}
      >
        {/* Canvas utama */}
        <div
          ref={canvasRef}
          style={{
            position: "relative",
            width: 1152,
            height: 814,
            margin: "0 auto",
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          {/* Layer Background */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
            <img
              src="https://tuku.coffee/_next/static/media/background_desktop.24186be3.webp"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="background"
            />
          </div>

          {/* Barista */}
          <div
            ref={baristaRef}
            style={{
              position: "absolute",
              left: 450,
              bottom: 220,
              width: 224,
              height: 288,
              zIndex: 20,
              transition: "left 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              pointerEvents: "none",
            }}
          >
            <img
              src="https://tuku.coffee/_next/static/media/01_barista_pose_front.5aa6b1d4.webp"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                animation: "jalan-menul 0.8s infinite ease-in-out",
              }}
              alt="barista"
            />
          </div>

          {/* Layer Meja (foreground) */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 30, pointerEvents: "none" }}>
            <img
              src="https://tuku.coffee/_next/static/media/table_desktop.4ae3c07c.webp"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="table"
            />
          </div>

          {/* Hotspot-hotspot */}
          {HOTSPOTS.map((hs, i) => (
            <div
              key={i}
              className="tuku-hotspot"
              style={{ ...(hs.style as React.CSSProperties), position: "absolute" }}
            >
              <a
                href={hs.href}
                target={hs.target}
                rel={hs.target === "_blank" ? "noopener noreferrer" : undefined}
                style={{ display: "block", width: "100%", height: "100%" }}
              >
                <img
                  className="tuku-popup"
                  src={hs.outlineImg}
                  style={{ width: "100%", height: "100%", objectFit: "contain", position: "absolute", top: 0, left: 0 }}
                  alt={`hotspot-${i}`}
                />
              </a>
              <div className="tuku-popup" style={hs.popup.style as React.CSSProperties}>
                <img src={hs.popup.img} style={{ width: "100%" }} alt={`popup-${i}`} />
              </div>
            </div>
          ))}

          {/* Hotspot Ojol */}
          <div
            className="tuku-hotspot area-ojol"
            style={{ position: "absolute", right: 0, top: 0, width: 200, height: 814 }}
          >
            <div
              className="tuku-popup"
              style={{ position: "absolute", top: 20, right: 80, width: 93 }}
            >
              <img
                src="https://tuku.coffee/_next/static/media/07_ambil_di_sini_outline.bef1bd67.webp"
                style={{ width: "100%" }}
                alt="ambil di sini"
              />
            </div>
            <div
              className="img-ojol"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 290,
                transform: "translateX(400px)",
                transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
                pointerEvents: "none",
                zIndex: 50,
              }}
            >
              <img
                src="https://tuku.coffee/_next/static/media/08_ojol_image_new.f48ea72d.webp"
                style={{ width: "100%" }}
                alt="ojol"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* SECTION 2 — FLIGHT MAP ROADMAP                        */}
      {/* ===================================================== */}
      <div
        ref={roadmapRef}
        style={{ width: "100%", background: "#f8fafc", overflow: "hidden" }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "100%",
            margin: "0 auto",
            padding: "40px 0",
            background: "transparent",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 20, position: "relative", zIndex: 20 }}>
            <h2
              style={{
                margin: 0,
                fontWeight: 800,
                color: "#0f172a",
                fontSize: "2rem",
                letterSpacing: "-1px",
              }}
            >
              Flight Map Recruitment
            </h2>
            <p style={{ margin: "8px 0 0 0", color: "#64748b", fontSize: "1rem" }}>
              Gerakkan kursor/sentuh layar untuk menerbangkan pesawat.
            </p>
          </div>

          {/* Road Layer */}
          <div
            className="road-layer"
            style={{ width: "100%", height: 400, position: "relative" }}
          >
            {/* SVG Jalan */}
            <svg
              ref={svgRef}
              viewBox="0 0 1200 400"
              preserveAspectRatio="none"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                <path
                  id="tuku-road-def"
                  ref={pathDefRef}
                  d={ROAD_PATH}
                />
              </defs>

              {/* Jalan abu */}
              <use
                href="#tuku-road-def"
                style={{
                  fill: "none",
                  stroke: "#e2e8f0",
                  strokeWidth: 60,
                  strokeLinecap: "round",
                } as React.CSSProperties}
              />

              {/* Progress biru */}
              <path
                ref={pathProgRef}
                d={ROAD_PATH}
                style={{
                  fill: "none",
                  stroke: "#3b82f6",
                  strokeWidth: 60,
                  strokeLinecap: "round",
                  strokeDasharray: "0, 10000",
                  transition: "stroke-dashoffset 0.1s linear",
                  opacity: 0.2,
                } as React.CSSProperties}
              />

              {/* Garis putus-putus tengah */}
              <use
                href="#tuku-road-def"
                style={{
                  fill: "none",
                  stroke: "#cbd5e1",
                  strokeWidth: 2,
                  strokeDasharray: "15, 25",
                } as React.CSSProperties}
              />
            </svg>

            {/* Pesawat */}
            <img
              ref={planeRef}
              src="https://upload.wikimedia.org/wikipedia/commons/8/86/Airliner_silhouette.svg"
              alt="Plane"
              style={{
                position: "absolute",
                width: 120,
                zIndex: 50,
                pointerEvents: "none",
                filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))",
                transformOrigin: "center center",
                transition: "transform 0.1s linear",
              }}
            />

            {/* PIN */}
            {ROAD_PINS.map((pin, i) => (
              <div
                key={pin.id}
                ref={(el) => { pinsRef.current[i] = el; }}
                className={`roadmap-pin-wrapper road-${pin.posClass}`}
              >
                <div
                  className="pin-circle"
                  style={{
                    width: 48,
                    height: 48,
                    background: "#fff",
                    borderRadius: "50%",
                    boxShadow: "0 10px 25px rgba(59,130,246,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    color: "#3b82f6",
                    border: "4px solid #3b82f6",
                    marginBottom: 12,
                    position: "relative",
                  }}
                >
                  {String(pin.id).padStart(2, "0")}
                </div>
                <div
                  className="pin-card"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    padding: "15px 20px",
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    minWidth: 160,
                    transition: "transform 0.3s",
                  }}
                >
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "1rem",
                      color: "#1e293b",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {pin.label}
                  </h4>
                  <p style={{ margin: "5px 0 0 0", fontSize: "0.85rem", color: "#64748b", lineHeight: 1.4 }}>
                    {pin.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile fallback — daftar linear */}
          <div style={{ display: "none" }} className="roadmap-mobile-list">
            {ROAD_PINS.map((pin, i) => (
              <div
                key={pin.id}
                ref={(el) => { pinsRef.current[i] = el; }}
                className="roadmap-pin-wrapper"
              >
                <div
                  className="pin-circle"
                  style={{
                    width: 48,
                    height: 48,
                    background: "#fff",
                    borderRadius: "50%",
                    boxShadow: "0 10px 25px rgba(59,130,246,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    color: "#3b82f6",
                    border: "4px solid #3b82f6",
                    marginBottom: 0,
                    position: "relative",
                  }}
                >
                  {String(pin.id).padStart(2, "0")}
                </div>
                <div
                  className="pin-card"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    padding: "15px 20px",
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    minWidth: 160,
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "1rem", color: "#1e293b", fontWeight: 700, textTransform: "uppercase" }}>
                    {pin.label}
                  </h4>
                  <p style={{ margin: "5px 0 0 0", fontSize: "0.85rem", color: "#64748b", lineHeight: 1.4 }}>
                    {pin.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
