import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPaintBrush,
  FaEraser,
  FaEyeDropper,
  FaUndo,
  FaRedo,
  FaDownload,
  FaSearchPlus,
  FaSearchMinus,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaTh,
} from "react-icons/fa";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */
type Tool = "brush" | "eraser" | "eyedropper";

interface PixelArtDrawerProps {
  referenceUrl: string;
}

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */
export default function PixelArtDrawer({ referenceUrl }: PixelArtDrawerProps) {
  // ── Grid config ──
  const [gridCols, setGridCols] = useState(128);
  const [gridRows, setGridRows] = useState(128);
  const [cellSize, setCellSize] = useState(6);

  // ── Tools ──
  const [tool, setTool] = useState<Tool>("brush");
  const [color, setColor] = useState("#FF6B6B");
  const [showGrid, setShowGrid] = useState(true);
  const [showRef, setShowRef] = useState(true);
  const [refOpacity, setRefOpacity] = useState(30);

  // ── Canvas data ──
  // Each cell: null = transparent, string = hex color
  const [pixels, setPixels] = useState<(string | null)[]>(() =>
    new Array(gridCols * gridRows).fill(null),
  );
  const [history, setHistory] = useState<(string | null)[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  // ── Refs ──
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const refImgRef = useRef<HTMLImageElement | null>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null); // for export

  // ── Color palette (quick access) ──
  const PALETTE = [
    "#FF6B6B", "#FF9F43", "#FECA57", "#48DBFB", "#0ABDE3",
    "#10AC84", "#1DD1A1", "#5F27CD", "#A78BFA", "#EE5A24",
    "#F8C291", "#E4A0A0", "#FFCCCC", "#FDE8D0", "#FFFBEA",
    "#C4E0C4", "#B0D8E8", "#D4C8E8", "#2D3436", "#636E72",
    "#B2BEC3", "#DFE6E9", "#FFFFFF", "#000000",
  ];

  // ── Load reference image ──
  useEffect(() => {
    if (referenceUrl) {
      const img = new Image();
      img.onload = () => { refImgRef.current = img; drawCanvas(); };
      img.src = referenceUrl;
    }
  }, [referenceUrl]);

  // ── Reset pixels when grid size changes ──
  useEffect(() => {
    const newPixels = new Array(gridCols * gridRows).fill(null);
    setPixels(newPixels);
    setHistory([newPixels]);
    setHistoryIndex(0);
  }, [gridCols, gridRows]);

  // ── Save to history ──
  const saveHistory = useCallback((newPixels: (string | null)[]) => {
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      const next = [...trimmed, [...newPixels]];
      if (next.length > 50) next.shift(); // limit history
      return next;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 49));
  }, [historyIndex]);

  // ── Undo / Redo ──
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      setPixels([...history[newIdx]]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      setPixels([...history[newIdx]]);
    }
  }, [history, historyIndex]);

  // ══════════════════════════════════════════
  // Drawing on canvas
  // ══════════════════════════════════════════
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const totalW = gridCols * cellSize;
    const totalH = gridRows * cellSize;
    canvas.width = totalW;
    canvas.height = totalH;

    // ── 1. Clear with checkerboard (transparency) ──
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        const isLight = (x + y) % 2 === 0;
        ctx.fillStyle = isLight ? "#2a2a3e" : "#232338";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    // ── 2. Draw reference image ──
    if (showRef && refImgRef.current) {
      ctx.globalAlpha = refOpacity / 100;
      ctx.drawImage(refImgRef.current, 0, 0, totalW, totalH);
      ctx.globalAlpha = 1;
    }

    // ── 3. Draw pixels ──
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        const c = pixels[y * gridCols + x];
        if (c) {
          ctx.fillStyle = c;
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }

    // ── 4. Grid lines ──
    if (showGrid) {
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= gridCols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, 0);
        ctx.lineTo(x * cellSize, totalH);
        ctx.stroke();
      }
      for (let y = 0; y <= gridRows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * cellSize);
        ctx.lineTo(totalW, y * cellSize);
        ctx.stroke();
      }
    }
  }, [pixels, gridCols, gridRows, cellSize, showGrid, showRef, refOpacity]);

  // Redraw whenever state changes
  useEffect(() => { drawCanvas(); }, [drawCanvas]);

  // ── Get cell coords from mouse/touch event ──
  const getCellFromEvent = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      let clientX: number, clientY: number;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = Math.floor((clientX - rect.left) * scaleX / cellSize);
      const y = Math.floor((clientY - rect.top) * scaleY / cellSize);

      if (x < 0 || x >= gridCols || y < 0 || y >= gridRows) return null;
      return { x, y };
    },
    [cellSize, gridCols, gridRows],
  );

  // ── Sample color at a cell from the reference image ──
  const sampleColorAt = useCallback(
    (x: number, y: number): string | null => {
      if (!refImgRef.current) return null;
      const tmp = document.createElement("canvas");
      tmp.width = gridCols;
      tmp.height = gridRows;
      const ctx = tmp.getContext("2d")!;
      ctx.drawImage(refImgRef.current, 0, 0, gridCols, gridRows);
      const data = ctx.getImageData(x, y, 1, 1).data;
      return `#${data[0].toString(16).padStart(2, "0")}${data[1].toString(16).padStart(2, "0")}${data[2].toString(16).padStart(2, "0")}`.toUpperCase();
    },
    [gridCols, gridRows],
  );

  // ── Eyedropper: pick color from reference ──
  const pickColor = useCallback(
    (x: number, y: number) => {
      const hex = sampleColorAt(x, y);
      if (hex) {
        setColor(hex);
        setTool("brush");
      }
    },
    [sampleColorAt],
  );

  // ── Paint/erase a cell ──
  const applyTool = useCallback(
    (x: number, y: number) => {
      const idx = y * gridCols + x;
      if (tool === "eyedropper") {
        pickColor(x, y);
        return;
      }
      setPixels((prev) => {
        const next = [...prev];
        next[idx] = tool === "brush" ? color : null;
        return next;
      });
    },
    [tool, color, gridCols, pickColor],
  );

  // ── Mouse/touch handlers ──
  const handlePointerDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      setIsDrawing(true);
      const cell = getCellFromEvent(e);
      if (cell) applyTool(cell.x, cell.y);
    },
    [getCellFromEvent, applyTool],
  );

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const cell = getCellFromEvent(e);

      // Show color preview on hover when eyedropper is active
      if (tool === "eyedropper" && cell && "clientX" in e) {
        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();
        setHoverPos({ x: e.clientX - rect.left + 20, y: e.clientY - rect.top - 10 });
        const sampled = sampleColorAt(cell.x, cell.y);
        setHoverColor(sampled);
      } else if (tool !== "eyedropper") {
        setHoverColor(null);
        setHoverPos(null);
      }

      if (!isDrawing) return;
      e.preventDefault();
      if (cell) applyTool(cell.x, cell.y);
    },
    [isDrawing, getCellFromEvent, applyTool, tool, sampleColorAt],
  );

  const handlePointerUp = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      saveHistory(pixels);
    }
  }, [isDrawing, pixels, saveHistory]);

  const handleCanvasLeave = useCallback(() => {
    handlePointerUp();
    setHoverColor(null);
    setHoverPos(null);
  }, [handlePointerUp]);

  // ── Clear all ──
  const clearAll = useCallback(() => {
    const blank = new Array(gridCols * gridRows).fill(null);
    setPixels(blank);
    saveHistory(blank);
  }, [gridCols, gridRows, saveHistory]);

  // ── Export as PNG ──
  const exportPng = useCallback(() => {
    const exportCanvas = drawCanvasRef.current!;
    exportCanvas.width = gridCols;
    exportCanvas.height = gridRows;
    const ctx = exportCanvas.getContext("2d")!;
    ctx.clearRect(0, 0, gridCols, gridRows);

    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        const c = pixels[y * gridCols + x];
        if (c) {
          ctx.fillStyle = c;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    const a = document.createElement("a");
    a.href = exportCanvas.toDataURL("image/png");
    a.download = "pixel-art-drawing.png";
    a.click();
  }, [pixels, gridCols, gridRows]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") { e.preventDefault(); undo(); }
      if (e.ctrlKey && e.key === "y") { e.preventDefault(); redo(); }
      if (e.key === "b") setTool("brush");
      if (e.key === "e") setTool("eraser");
      if (e.key === "i") setTool("eyedropper");
      if (e.key === "g") setShowGrid((p) => !p);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  // ── Grid presets ──
  const GRID_PRESETS = [
    { label: "32×32", cols: 32, rows: 32, cell: 16 },
    { label: "64×64", cols: 64, rows: 64, cell: 10 },
    { label: "96×96", cols: 96, rows: 96, cell: 8 },
    { label: "128×128", cols: 128, rows: 128, cell: 6 },
    { label: "192×192", cols: 192, rows: 192, cell: 4 },
    { label: "256×256", cols: 256, rows: 256, cell: 3 },
  ];

  /* ═══════════════════════════════════════════
     Render
     ═══════════════════════════════════════════ */
  return (
    <div className="drawer-wrapper">
      {/* Hidden export canvas */}
      <canvas ref={drawCanvasRef} style={{ display: "none" }} />

      <div className="drawer-layout">
        {/* ── Canvas area ── */}
        <div className="drawer-canvas-area">
          <div className="drawer-canvas-scroll">
            <canvas
              ref={canvasRef}
              className="drawer-canvas"
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handleCanvasLeave}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              style={{
                cursor:
                  tool === "brush" ? "crosshair" :
                  tool === "eraser" ? "cell" :
                  "copy",
              }}
            />
            {/* Eyedropper color preview tooltip */}
            {tool === "eyedropper" && hoverColor && hoverPos && (
              <div
                className="eyedropper-preview"
                style={{ left: hoverPos.x, top: hoverPos.y }}
              >
                <div className="eyedropper-swatch" style={{ background: hoverColor }} />
                <span className="eyedropper-hex">{hoverColor}</span>
              </div>
            )}
          </div>
          <div className="drawer-canvas-info">
            {gridCols}×{gridRows} • Cell: {cellSize}px •
            Shortcuts: B=Brush, E=Eraser, I=Eyedropper, G=Grid, Ctrl+Z/Y
          </div>
        </div>

        {/* ── Tools sidebar ── */}
        <div className="drawer-sidebar">
          {/* Tools */}
          <div className="drawer-section">
            <h4>Tools</h4>
            <div className="drawer-tool-row">
              {([
                { key: "brush" as Tool, icon: <FaPaintBrush />, label: "Brush (B)" },
                { key: "eraser" as Tool, icon: <FaEraser />, label: "Eraser (E)" },
                { key: "eyedropper" as Tool, icon: <FaEyeDropper />, label: "Pick Color (I)" },
              ]).map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={`drawer-tool-btn ${tool === t.key ? "active" : ""}`}
                  onClick={() => setTool(t.key)}
                  title={t.label}
                >
                  {t.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="drawer-section">
            <h4>Color</h4>
            <div className="drawer-color-current">
              <div className="color-swatch-big" style={{ background: color }} />
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value.toUpperCase())}
                className="color-input-hidden"
              />
              <span className="color-hex">{color}</span>
            </div>
            <div className="drawer-palette">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`palette-swatch ${color === c ? "active" : ""}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="drawer-section">
            <h4><FaTh style={{ marginRight: 6 }} />Grid Size</h4>
            <div className="drawer-grid-presets">
              {GRID_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`palette-btn ${gridCols === p.cols && gridRows === p.rows ? "active" : ""}`}
                  onClick={() => { setGridCols(p.cols); setGridRows(p.rows); setCellSize(p.cell); }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zoom */}
          <div className="drawer-section">
            <h4>Zoom</h4>
            <div className="drawer-tool-row">
              <button type="button" className="drawer-tool-btn" onClick={() => setCellSize((s) => Math.max(1, s - 1))} title="Zoom Out">
                <FaSearchMinus />
              </button>
              <span className="zoom-label">{cellSize}px</span>
              <button type="button" className="drawer-tool-btn" onClick={() => setCellSize((s) => Math.min(32, s + 1))} title="Zoom In">
                <FaSearchPlus />
              </button>
            </div>
          </div>

          {/* Reference & Grid toggles */}
          <div className="drawer-section">
            <h4>Display</h4>
            <label className="toggle-label drawer-toggle">
              {showRef ? <FaEye /> : <FaEyeSlash />} Reference
              <button
                type="button"
                className={`toggle-switch ${showRef ? "active" : ""}`}
                onClick={() => setShowRef(!showRef)}
              >
                <span className="toggle-knob" />
              </button>
            </label>

            {showRef && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="drawer-ref-opacity">
                <label>Opacity <span className="control-value">{refOpacity}%</span></label>
                <input
                  type="range" min={5} max={80} value={refOpacity}
                  onChange={(e) => setRefOpacity(Number(e.target.value))}
                  className="pixel-slider"
                />
              </motion.div>
            )}

            <label className="toggle-label drawer-toggle">
              <FaTh /> Grid Lines
              <button
                type="button"
                className={`toggle-switch ${showGrid ? "active" : ""}`}
                onClick={() => setShowGrid(!showGrid)}
              >
                <span className="toggle-knob" />
              </button>
            </label>
          </div>

          {/* Actions */}
          <div className="drawer-section">
            <button type="button" className="action-btn primary" onClick={exportPng}>
              <FaDownload /> Export PNG
            </button>
            <div className="drawer-tool-row" style={{ marginTop: 8 }}>
              <button type="button" className="drawer-tool-btn" onClick={undo} disabled={historyIndex <= 0} title="Undo (Ctrl+Z)">
                <FaUndo />
              </button>
              <button type="button" className="drawer-tool-btn" onClick={redo} disabled={historyIndex >= history.length - 1} title="Redo (Ctrl+Y)">
                <FaRedo />
              </button>
              <button type="button" className="drawer-tool-btn danger" onClick={clearAll} title="Clear All">
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
