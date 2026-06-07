import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUpload,
  FaDownload,
  FaMagic,
  FaEraser,
  FaUndo,
  FaImage,
  FaGamepad,
  FaPaintBrush,
  FaFilm,
  FaCube,
  FaRobot,
  FaSlidersH,
  FaKey,
  FaPencilAlt,
} from "react-icons/fa";
import {
  generatePixelArt,
  hasApiKey,
  setApiKey,
  getStoredApiKey,
} from "../config/geminiService";
import PixelArtDrawer from "./PixelArtDrawer";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */
interface ProcessingState {
  isProcessing: boolean;
  stage: string;
}

type EditorMode = "ai" | "manual" | "draw";
type ArtStyle = "pixel-art" | "cartoon" | "game" | "ghibli";

interface StylePreset {
  key: ArtStyle;
  label: string;
  icon: React.ReactNode;
  description: string;
  /** Defaults for manual mode */
  manualDefaults: {
    pixelSize: number;
    colorLevels: number;
    outlineStrength: number;
    saturationBoost: number;
    warmth: number;
  };
}

const STYLE_PRESETS: StylePreset[] = [
  {
    key: "pixel-art",
    label: "Classic",
    icon: <FaCube />,
    description: "Clean retro pixel art",
    manualDefaults: { pixelSize: 10, colorLevels: 0, outlineStrength: 0, saturationBoost: 0, warmth: 0 },
  },
  {
    key: "cartoon",
    label: "Cartoon",
    icon: <FaPaintBrush />,
    description: "Bold outlines & vivid colors",
    manualDefaults: { pixelSize: 6, colorLevels: 16, outlineStrength: 70, saturationBoost: 30, warmth: 0 },
  },
  {
    key: "game",
    label: "Game",
    icon: <FaGamepad />,
    description: "Retro game sprite style",
    manualDefaults: { pixelSize: 12, colorLevels: 8, outlineStrength: 50, saturationBoost: 15, warmth: 0 },
  },
  {
    key: "ghibli",
    label: "Ghibli",
    icon: <FaFilm />,
    description: "Warm pastel, soft & dreamy",
    manualDefaults: { pixelSize: 5, colorLevels: 32, outlineStrength: 30, saturationBoost: 10, warmth: 40 },
  },
];

/* ══════════════════════════════════════════════
   Canvas helpers (Manual mode)
   ══════════════════════════════════════════════ */
function colorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function floodFillTransparent(data: Uint8ClampedArray, w: number, h: number, sx: number, sy: number, tol: number) {
  const idx = (sy * w + sx) * 4;
  const sR = data[idx], sG = data[idx + 1], sB = data[idx + 2];
  const maxDist = (tol / 100) * 441.67;
  const visited = new Uint8Array(w * h);
  const stack: number[] = [sx, sy];
  while (stack.length > 0) {
    const y = stack.pop()!, x = stack.pop()!;
    if (x < 0 || x >= w || y < 0 || y >= h) continue;
    const pos = y * w + x;
    if (visited[pos]) continue;
    visited[pos] = 1;
    const i = pos * 4;
    if (colorDistance(data[i], data[i + 1], data[i + 2], sR, sG, sB) > maxDist) continue;
    data[i + 3] = 0;
    stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }
}

function quantizeColor(v: number, levels: number): number {
  const step = 255 / (levels - 1);
  return Math.round(Math.round(v / step) * step);
}

function clamp(v: number): number { return v < 0 ? 0 : v > 255 ? 255 : Math.round(v); }

function applyEdgeOutlines(ctx: CanvasRenderingContext2D, w: number, h: number, strength: number) {
  if (strength <= 0) return;
  const src = ctx.getImageData(0, 0, w, h);
  const sd = src.data;
  const out = ctx.createImageData(w, h);
  const od = out.data;
  od.set(sd);
  const f = strength / 100;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const getL = (px: number, py: number) => { const i = (py * w + px) * 4; return 0.299 * sd[i] + 0.587 * sd[i + 1] + 0.114 * sd[i + 2]; };
      const gx = -getL(x-1,y-1)+getL(x+1,y-1)-2*getL(x-1,y)+2*getL(x+1,y)-getL(x-1,y+1)+getL(x+1,y+1);
      const gy = -getL(x-1,y-1)-2*getL(x,y-1)-getL(x+1,y-1)+getL(x-1,y+1)+2*getL(x,y+1)+getL(x+1,y+1);
      const edge = Math.sqrt(gx * gx + gy * gy);
      if (edge > 60) {
        const i = (y * w + x) * 4;
        if (od[i + 3] > 0) {
          const d = Math.min(1, (edge / 255) * f);
          od[i] = clamp(od[i] * (1 - d * 0.85));
          od[i + 1] = clamp(od[i + 1] * (1 - d * 0.85));
          od[i + 2] = clamp(od[i + 2] * (1 - d * 0.85));
        }
      }
    }
  }
  ctx.putImageData(out, 0, 0);
}

function applySaturationBoost(data: Uint8ClampedArray, len: number, amount: number) {
  if (amount <= 0) return;
  const factor = 1 + amount / 50;
  for (let i = 0; i < len; i += 4) {
    if (data[i + 3] === 0) continue;
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = clamp(gray + (data[i] - gray) * factor);
    data[i + 1] = clamp(gray + (data[i + 1] - gray) * factor);
    data[i + 2] = clamp(gray + (data[i + 2] - gray) * factor);
  }
}

function applyWarmth(data: Uint8ClampedArray, len: number, warmth: number) {
  if (warmth <= 0) return;
  const w = warmth / 100;
  for (let i = 0; i < len; i += 4) {
    if (data[i + 3] === 0) continue;
    let r = data[i], g = data[i + 1], b = data[i + 2];
    r = clamp(r + 20 * w); g = clamp(g + 5 * w); b = clamp(b - 15 * w);
    const p = 0.2 * w;
    r = clamp(r + (180 - r) * p); g = clamp(g + (170 - g) * p); b = clamp(b + (160 - b) * p);
    data[i] = r; data[i + 1] = g; data[i + 2] = b;
  }
}

/* ══════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════ */
export default function PixelArtConverter() {
  // ── Common state ──
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState("");
  const [editorMode, setEditorMode] = useState<EditorMode>("ai");
  const [artStyle, setArtStyle] = useState<ArtStyle>("pixel-art");
  const [isDragging, setIsDragging] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [processing, setProcessing] = useState<ProcessingState>({ isProcessing: false, stage: "" });
  const [error, setError] = useState("");

  // ── AI mode state ──
  const [apiKeyInput, setApiKeyInput] = useState(getStoredApiKey());
  const [apiKeySet, setApiKeySet] = useState(hasApiKey());
  const [showKeyInput, setShowKeyInput] = useState(false);

  // ── Manual mode state ──
  const [pixelSize, setPixelSize] = useState(10);
  const [colorLevels, setColorLevels] = useState(0);
  const [outlineStrength, setOutlineStrength] = useState(0);
  const [saturationBoost, setSaturationBoost] = useState(0);
  const [warmth, setWarmth] = useState(0);
  const [removeBg, setRemoveBg] = useState(true);
  const [bgTolerance, setBgTolerance] = useState(30);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── File handling ──
  const loadImage = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setSourceFile(file);
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setSourceImage(img);
        setSourceUrl(e.target!.result as string);
        setResultUrl("");
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImage(file);
  }, [loadImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadImage(file);
  }, [loadImage]);

  // ── Apply manual preset ──
  const applyManualPreset = useCallback((style: ArtStyle) => {
    const preset = STYLE_PRESETS.find((p) => p.key === style)!;
    setPixelSize(preset.manualDefaults.pixelSize);
    setColorLevels(preset.manualDefaults.colorLevels);
    setOutlineStrength(preset.manualDefaults.outlineStrength);
    setSaturationBoost(preset.manualDefaults.saturationBoost);
    setWarmth(preset.manualDefaults.warmth);
  }, []);

  // ══════════════════════════════
  // AI Mode Processing
  // ══════════════════════════════
  const processAI = useCallback(async () => {
    if (!sourceFile && !sourceUrl) return;
    setProcessing({ isProcessing: true, stage: "🤖 AI is generating pixel art…" });
    setError("");

    try {
      const imgSource = sourceFile || sourceUrl;
      const result = await generatePixelArt(imgSource, { style: artStyle });
      setResultUrl(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to generate pixel art";
      setError(message);
      setResultUrl("");
    } finally {
      setProcessing({ isProcessing: false, stage: "" });
    }
  }, [sourceFile, sourceUrl, artStyle]);

  // ══════════════════════════════
  // Manual Mode Processing
  // ══════════════════════════════
  const processManual = useCallback(() => {
    if (!sourceImage) return;
    setProcessing({ isProcessing: true, stage: "Pixelating…" });
    setError("");

    requestAnimationFrame(() => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      const w = sourceImage.naturalWidth, h = sourceImage.naturalHeight;
      canvas.width = w; canvas.height = h;

      const smallW = Math.max(1, Math.floor(w / pixelSize));
      const smallH = Math.max(1, Math.floor(h / pixelSize));

      const off = document.createElement("canvas");
      off.width = smallW; off.height = smallH;
      const offCtx = off.getContext("2d")!;
      offCtx.imageSmoothingEnabled = false;
      offCtx.drawImage(sourceImage, 0, 0, smallW, smallH);

      if (colorLevels > 0) {
        const sd = offCtx.getImageData(0, 0, smallW, smallH);
        const d = sd.data;
        for (let i = 0; i < d.length; i += 4) {
          d[i] = quantizeColor(d[i], colorLevels);
          d[i + 1] = quantizeColor(d[i + 1], colorLevels);
          d[i + 2] = quantizeColor(d[i + 2], colorLevels);
        }
        offCtx.putImageData(sd, 0, 0);
      }

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(off, 0, 0, w, h);

      if (saturationBoost > 0) {
        const imgData = ctx.getImageData(0, 0, w, h);
        applySaturationBoost(imgData.data, imgData.data.length, saturationBoost);
        ctx.putImageData(imgData, 0, 0);
      }
      if (warmth > 0) {
        const imgData = ctx.getImageData(0, 0, w, h);
        applyWarmth(imgData.data, imgData.data.length, warmth);
        ctx.putImageData(imgData, 0, 0);
      }
      if (outlineStrength > 0) {
        applyEdgeOutlines(ctx, w, h, outlineStrength);
      }
      if (removeBg) {
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;
        floodFillTransparent(d, w, h, 0, 0, bgTolerance);
        floodFillTransparent(d, w, h, w - 1, 0, bgTolerance);
        floodFillTransparent(d, w, h, 0, h - 1, bgTolerance);
        floodFillTransparent(d, w, h, w - 1, h - 1, bgTolerance);
        ctx.putImageData(imgData, 0, 0);
      }

      setResultUrl(canvas.toDataURL("image/png"));
      setProcessing({ isProcessing: false, stage: "" });
    });
  }, [sourceImage, pixelSize, colorLevels, outlineStrength, saturationBoost, warmth, removeBg, bgTolerance]);

  // Auto-process for manual mode
  useEffect(() => {
    if (editorMode === "manual" && sourceImage) {
      const t = setTimeout(processManual, 150);
      return () => clearTimeout(t);
    }
  }, [editorMode, sourceImage, pixelSize, colorLevels, outlineStrength, saturationBoost, warmth, removeBg, bgTolerance, processManual]);

  // ── Download ──
  const handleDownload = useCallback(() => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `pixel-art-${artStyle}.png`;
    a.click();
  }, [resultUrl, artStyle]);

  // ── Reset ──
  const handleReset = useCallback(() => {
    setSourceImage(null); setSourceFile(null); setSourceUrl(""); setResultUrl("");
    setArtStyle("pixel-art"); setError("");
    setPixelSize(10); setColorLevels(0); setOutlineStrength(0);
    setSaturationBoost(0); setWarmth(0); setRemoveBg(true); setBgTolerance(30);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ── Save API key ──
  const handleSaveApiKey = useCallback(() => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setApiKeySet(true);
    }
  }, [apiKeyInput]);

  /* ═══════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════ */
  return (
    <div className="pixel-art-wrapper">
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* ═══ Mode tabs ═══ */}
      <div className="mode-tabs">
        <button
          type="button"
          className={`mode-tab ${editorMode === "ai" ? "active" : ""}`}
          onClick={() => { setEditorMode("ai"); setResultUrl(""); }}
        >
          <FaRobot /> AI Mode
          <span className="mode-tab-badge">✨ Gemini</span>
        </button>
        <button
          type="button"
          className={`mode-tab ${editorMode === "manual" ? "active" : ""}`}
          onClick={() => { setEditorMode("manual"); setResultUrl(""); }}
        >
          <FaSlidersH /> Manual Mode
        </button>
        <button
          type="button"
          className={`mode-tab ${editorMode === "draw" ? "active" : ""}`}
          onClick={() => { setEditorMode("draw"); setResultUrl(""); }}
        >
          <FaPencilAlt /> Draw Mode
        </button>
      </div>

      {/* ═══ API key setup (AI mode only) ═══ */}
      {editorMode === "ai" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="api-key-card"
        >
          {apiKeySet && !showKeyInput ? (
            /* ── Key already saved: compact bar ── */
            <div className="api-key-saved-bar">
              <FaKey className="api-key-icon-sm" />
              <span className="api-key-masked">API Key: ••••••••{apiKeyInput.slice(-4)}</span>
              <button
                type="button"
                className="change-key-btn"
                onClick={() => setShowKeyInput(true)}
              >
                Change Key
              </button>
            </div>
          ) : (
            /* ── Key input form ── */
            <>
              <div className="api-key-header">
                <FaKey className="api-key-icon" />
                <div>
                  <h3>{apiKeySet ? "Change API Key" : "Gemini API Key Required"}</h3>
                  <p>Get your free API key from <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a></p>
                </div>
              </div>
              <div className="api-key-input-group">
                <input
                  type="password"
                  placeholder="Paste your API key here…"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="api-key-input"
                  onKeyDown={(e) => e.key === "Enter" && handleSaveApiKey()}
                />
                <button type="button" className="action-btn primary" onClick={() => { handleSaveApiKey(); setShowKeyInput(false); }}>
                  Save Key
                </button>
                {apiKeySet && (
                  <button type="button" className="action-btn ghost" onClick={() => setShowKeyInput(false)}>Cancel</button>
                )}
              </div>
              <p className="api-key-note">
                Key is stored locally in your browser. Never sent anywhere except Google's API.
              </p>
            </>
          )}
        </motion.div>
      )}

      {/* ═══ Upload zone ═══ */}
      {!sourceImage && (editorMode === "manual" || editorMode === "draw" || apiKeySet) && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`pixel-art-dropzone ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="dropzone-content">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <FaUpload className="dropzone-icon" />
            </motion.div>
            <h3>Drop your photo here</h3>
            <p>
              {editorMode === "ai"
                ? "Upload a photo to convert into pixel art character • PNG, JPG, WEBP"
                : editorMode === "draw"
                ? "Upload a reference image to trace over • PNG, JPG, WEBP"
                : "or click to browse • PNG, JPG, WEBP"}
            </p>
          </div>
        </motion.div>
      )}

      {/* ═══ Draw Mode ═══ */}
      {editorMode === "draw" && sourceImage && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <PixelArtDrawer referenceUrl={sourceUrl} />
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button type="button" className="action-btn secondary" onClick={() => fileInputRef.current?.click()}>
              <FaUpload /> Change Reference Image
            </button>
            <button type="button" className="action-btn ghost" onClick={handleReset} style={{ marginLeft: 8 }}>
              <FaUndo /> Reset
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══ Editor (AI & Manual modes) ═══ */}
      {sourceImage && editorMode !== "draw" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="pixel-art-editor">
          {/* ── Preview ── */}
          <div className="pixel-art-preview-area">
            <div className="preview-card">
              <div className="preview-label">
                {showOriginal ? "Original" : (
                  editorMode === "ai"
                    ? `AI Pixel Art — ${STYLE_PRESETS.find((p) => p.key === artStyle)?.label}`
                    : `Manual — ${STYLE_PRESETS.find((p) => p.key === artStyle)?.label}`
                )}
              </div>
              <div
                className="preview-image-wrapper checkerboard"
                onMouseDown={() => setShowOriginal(true)}
                onMouseUp={() => setShowOriginal(false)}
                onMouseLeave={() => setShowOriginal(false)}
                onTouchStart={() => setShowOriginal(true)}
                onTouchEnd={() => setShowOriginal(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={showOriginal ? "original" : "result"}
                    src={showOriginal || !resultUrl ? sourceUrl : resultUrl}
                    alt={showOriginal ? "Original" : "Pixel art result"}
                    className="preview-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                </AnimatePresence>

                {processing.isProcessing && (
                  <div className="processing-overlay">
                    <div className="processing-spinner" />
                    <span>{processing.stage}</span>
                  </div>
                )}
              </div>

              {error && (
                <div className="error-banner">
                  ⚠️ {error}
                </div>
              )}

              <p className="preview-hint">
                <FaImage style={{ display: "inline", marginRight: 4 }} />
                Hold click to see original
              </p>
            </div>
          </div>

          {/* ── Controls ── */}
          <div className="pixel-art-controls">
            <div className="controls-card">
              <h3 className="controls-title">
                <FaMagic /> {editorMode === "ai" ? "AI Settings" : "Manual Settings"}
              </h3>

              {/* ── Style presets (both modes) ── */}
              <div className="control-group">
                <label>Art Style</label>
                <div className="style-presets">
                  {STYLE_PRESETS.map((preset) => (
                    <button
                      key={preset.key}
                      type="button"
                      className={`style-preset-btn ${artStyle === preset.key ? "active" : ""}`}
                      onClick={() => {
                        setArtStyle(preset.key);
                        if (editorMode === "manual") applyManualPreset(preset.key);
                        setResultUrl("");
                      }}
                    >
                      <span className="preset-icon">{preset.icon}</span>
                      <span className="preset-label">{preset.label}</span>
                      <span className="preset-desc">{preset.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ═══ AI Mode Controls ═══ */}
              {editorMode === "ai" && (
                <>
                  <button
                    type="button"
                    className="action-btn primary generate-btn"
                    onClick={processAI}
                    disabled={processing.isProcessing}
                  >
                    {processing.isProcessing ? (
                      <><div className="btn-spinner" /> Generating…</>
                    ) : (
                      <><FaRobot /> Generate Pixel Art</>
                    )}
                  </button>
                  <p className="ai-hint">
                    Select a style above, then click Generate. AI will create a pixel art character from your photo.
                  </p>
                </>
              )}

              {/* ═══ Manual Mode Controls ═══ */}
              {editorMode === "manual" && (
                <>
                  <div className="control-group">
                    <label>Pixel Size <span className="control-value">{pixelSize}px</span></label>
                    <input type="range" min={2} max={40} value={pixelSize} onChange={(e) => setPixelSize(Number(e.target.value))} className="pixel-slider" />
                    <div className="slider-labels"><span>Fine</span><span>Chunky</span></div>
                  </div>

                  <div className="control-group">
                    <label>Color Palette <span className="control-value">{colorLevels === 0 ? "Full" : `${colorLevels}`}</span></label>
                    <div className="palette-buttons">
                      {[{ label: "Full", value: 0 }, { label: "64", value: 64 }, { label: "32", value: 32 }, { label: "16", value: 16 }, { label: "8", value: 8 }, { label: "4", value: 4 }].map((opt) => (
                        <button key={opt.value} type="button" className={`palette-btn ${colorLevels === opt.value ? "active" : ""}`} onClick={() => setColorLevels(opt.value)}>{opt.label}</button>
                      ))}
                    </div>
                  </div>

                  <div className="control-group">
                    <label>Outline <span className="control-value">{outlineStrength}%</span></label>
                    <input type="range" min={0} max={100} value={outlineStrength} onChange={(e) => setOutlineStrength(Number(e.target.value))} className="pixel-slider" />
                  </div>

                  <div className="control-group">
                    <label>Vivid <span className="control-value">{saturationBoost}%</span></label>
                    <input type="range" min={0} max={80} value={saturationBoost} onChange={(e) => setSaturationBoost(Number(e.target.value))} className="pixel-slider" />
                  </div>

                  <div className="control-group">
                    <label>Warmth <span className="control-value">{warmth}%</span></label>
                    <input type="range" min={0} max={100} value={warmth} onChange={(e) => setWarmth(Number(e.target.value))} className="pixel-slider" />
                  </div>

                  <div className="control-group">
                    <label className="toggle-label">
                      <FaEraser style={{ marginRight: 6 }} /> Remove BG
                      <button type="button" className={`toggle-switch ${removeBg ? "active" : ""}`} onClick={() => setRemoveBg(!removeBg)}>
                        <span className="toggle-knob" />
                      </button>
                    </label>
                  </div>

                  {removeBg && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="control-group">
                      <label>Tolerance <span className="control-value">{bgTolerance}%</span></label>
                      <input type="range" min={0} max={100} value={bgTolerance} onChange={(e) => setBgTolerance(Number(e.target.value))} className="pixel-slider" />
                    </motion.div>
                  )}
                </>
              )}

              {/* ── Common actions ── */}
              <div className="control-actions">
                <button
                  type="button"
                  className="action-btn primary"
                  onClick={handleDownload}
                  disabled={!resultUrl || processing.isProcessing}
                >
                  <FaDownload /> Download PNG
                </button>
                <button type="button" className="action-btn secondary" onClick={() => fileInputRef.current?.click()}>
                  <FaUpload /> New Image
                </button>
                <button type="button" className="action-btn ghost" onClick={handleReset}>
                  <FaUndo /> Reset
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {sourceImage && (
        <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} style={{ display: "none" }} />
      )}
    </div>
  );
}
