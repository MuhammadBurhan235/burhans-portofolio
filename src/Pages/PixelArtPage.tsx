import { motion } from "framer-motion";
import { FaArrowLeft, FaGamepad } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PixelArtConverter from "../components/PixelArtConverter";

export default function PixelArtPage() {
  const navigate = useNavigate();

  return (
    <div className="pixel-art-page">
      {/* Decorative pixel grid background */}
      <div className="pixel-bg-grid" aria-hidden="true" />

      {/* Header */}
      <motion.header
        className="pixel-art-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/burhans-portofolio/")}
        >
          <FaArrowLeft /> Back
        </button>

        <div className="header-title-group">
          <h1>
            <FaGamepad className="title-icon" />
            Pixel Art Studio
          </h1>
          <p className="header-subtitle">
            Convert your photos into retro pixel art & remove backgrounds
          </p>
        </div>
      </motion.header>

      {/* Main content */}
      <motion.main
        className="pixel-art-main"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <PixelArtConverter />
      </motion.main>

      {/* Footer */}
      <footer className="pixel-art-footer">
        <p>
          All processing happens locally in your browser • No uploads to any
          server
        </p>
      </footer>
    </div>
  );
}
