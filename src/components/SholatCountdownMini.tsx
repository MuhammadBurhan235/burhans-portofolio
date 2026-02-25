import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FaChevronDown, FaMapMarkerAlt, FaMosque, FaTimes } from "react-icons/fa";

// ─── Design tokens ────────────────────────────────────────────────
// All colours & sizes live here so mini ↔ expanded stay in sync.
const T = {
  // Card surface
  cardBg:       "bg-white/90 backdrop-blur",
  cardBorder:   "border border-blue-100/80",
  cardShadow:   "shadow-[0_4px_20px_rgba(8,74,131,0.18)]",

  // Icon circle — same colour in both states, only size changes
  iconBg:       "bg-blue-600",
  iconText:     "text-white",
  iconShadow:   "shadow-[0_2px_8px_rgba(8,74,131,0.4)]",

  // Location pin + city text
  pinColor:     "text-blue-500",
  cityText:     "text-blue-800 font-semibold",

  // Prayer name label
  prayerLabel:  "text-blue-900 font-bold",

  // Countdown — pill style identical in mini and expanded footer
  cdBg:         "bg-blue-600",
  cdText:       "text-white font-mono font-bold tracking-widest",

  // Prayer grid cells
  cellDefault:  "bg-blue-50 text-blue-900",
  cellActive:   "bg-blue-600 text-white shadow-[0_4px_12px_rgba(8,74,131,0.3)]",

  // Tab buttons
  tabActive:    "bg-blue-600 text-white shadow-sm",
  tabDefault:   "bg-blue-50 text-blue-700 hover:bg-blue-100",

  // Muted / sub-label
  subText:      "text-blue-400",
  mutedText:    "text-gray-400",
} as const;
// ──────────────────────────────────────────────────────────────────

const SHOLAT_API_BASE = "https://api.myquran.com/v2/sholat" as const;

type PrayerSchedule = Record<string, string>;
type NextPrayer = { name: string; key: string; time: string; targetDate: Date };
type CityOption = { id: string; lokasi: string; query: string; preferExactUpper: string };

const DEFAULT_CITIES: CityOption[] = [
  { id: "", lokasi: "Kota Tangerang", query: "Kota Tangerang", preferExactUpper: "KOTA TANGERANG" },
  { id: "", lokasi: "Kota Bandung",   query: "Kota Bandung",   preferExactUpper: "KOTA BANDUNG"   },
];

const PRAYER_KEYS = [
  { key: "subuh",   label: "Subuh"   },
  { key: "dzuhur",  label: "Dzuhur"  },
  { key: "ashar",   label: "Ashar"   },
  { key: "maghrib", label: "Maghrib" },
  { key: "isya",    label: "Isya"    },
];

function toYmd(d: Date) {
  return {
    year:  d.getFullYear(),
    month: String(d.getMonth() + 1).padStart(2, "0"),
    day:   String(d.getDate()).padStart(2, "0"),
  };
}

function parseTimeToDate(base: Date, timeStr: string) {
  const [hStr, mStr] = timeStr.split(":");
  const h = Number(hStr ?? 0), m = Number(mStr ?? 0);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, 0, 0);
}

function findNextPrayer(schedule: PrayerSchedule | null, date: Date): NextPrayer | null {
  if (!schedule) return null;
  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth()    === now.getMonth()    &&
    date.getDate()     === now.getDate();

  const list = PRAYER_KEYS
    .map((p) => {
      const t = parseTimeToDate(date, schedule[p.key] ?? "");
      if (!t || (isToday && t.getTime() <= now.getTime())) return null;
      return { name: p.label, key: p.key, time: schedule[p.key], targetDate: t } satisfies NextPrayer;
    })
    .filter(Boolean) as NextPrayer[];

  list.sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());
  return list[0] ?? null;
}

function formatDiff(target: Date, now: Date) {
  const s = Math.floor(Math.max(0, target.getTime() - now.getTime()) / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const mm = String(m).padStart(2, "0"), ss = String(sec).padStart(2, "0");
  return h > 0 ? `${String(h).padStart(2, "0")}:${mm}:${ss}` : `${mm}:${ss}`;
}

function formatDate(d: Date) {
  const days   = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function useCitySchedule(cityQuery: string, preferExactUpper: string) {
  const [cityId,        setCityId]  = useState<string | null>(null);
  const [cityName,      setCityName] = useState("");
  const [scheduleToday, setToday]   = useState<PrayerSchedule | null>(null);
  const [scheduleTmrw,  setTmrw]   = useState<PrayerSchedule | null>(null);
  const [loading,       setLoading] = useState(false);
  const [error,         setError]   = useState<string | null>(null);

  useEffect(() => {
    let dead = false;
    setLoading(true); setError(null);
    (async () => {
      try {
        const res  = await fetch(`${SHOLAT_API_BASE}/kota/cari/${encodeURIComponent(cityQuery)}`);
        if (!res.ok) throw new Error();
        const data = (await res.json())?.data ?? [];
        if (!data.length) throw new Error();
        const hit  = data.find((c: any) => c?.lokasi?.trim().toUpperCase() === preferExactUpper) ?? data[0];
        if (!dead) { setCityId(hit?.id ? String(hit.id) : null); setCityName(hit?.lokasi ?? cityQuery); }
      } catch {
        if (!dead) { setError("Gagal memuat kota"); setCityId(null); setCityName(""); }
      } finally { if (!dead) setLoading(false); }
    })();
    return () => { dead = true; };
  }, [cityQuery, preferExactUpper]);

  useEffect(() => {
    if (!cityId) return;
    let dead = false;
    setLoading(true); setError(null);
    (async () => {
      try {
        const today = new Date(), tmrw = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const t = toYmd(today), tm = toYmd(tmrw);
        const [r1, r2] = await Promise.all([
          fetch(`${SHOLAT_API_BASE}/jadwal/${cityId}/${t.year}/${t.month}/${t.day}`),
          fetch(`${SHOLAT_API_BASE}/jadwal/${cityId}/${tm.year}/${tm.month}/${tm.day}`),
        ]);
        if (!r1.ok || !r2.ok) throw new Error();
        const [j1, j2] = await Promise.all([r1.json(), r2.json()]);
        if (!dead) { setToday(j1?.data?.jadwal ?? null); setTmrw(j2?.data?.jadwal ?? null); }
      } catch {
        if (!dead) { setError("Gagal memuat jadwal"); setToday(null); setTmrw(null); }
      } finally { if (!dead) setLoading(false); }
    })();
    return () => { dead = true; };
  }, [cityId]);

  return { cityId, cityName, scheduleToday, scheduleTmrw, loading, error };
}

interface SholatCountdownMiniProps {
  cityQuery?: string;
  cityPreferExactUpper?: string;
}

export default function SholatCountdownMini({
  cityQuery = "Kota Tangerang",
  cityPreferExactUpper = "KOTA TANGERANG",
}: SholatCountdownMiniProps) {
  const [tick,            setTick]    = useState(() => new Date());
  const [expanded,        setExpanded] = useState(false);
  const [selectedCityIdx, setCity]    = useState(0);
  const containerRef                   = useRef<HTMLDivElement>(null);
  // Detect if widget is in the right half of screen → anchor card to right
  const [anchorRight, setAnchorRight] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setAnchorRight(rect.left + 200 > window.innerWidth / 2);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setTick(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const primary = useCitySchedule(cityQuery, cityPreferExactUpper);
  const city0   = useCitySchedule(DEFAULT_CITIES[0].query, DEFAULT_CITIES[0].preferExactUpper);
  const city1   = useCitySchedule(DEFAULT_CITIES[1].query, DEFAULT_CITIES[1].preferExactUpper);
  const cities  = [city0, city1];
  const sel     = cities[selectedCityIdx];

  const nextPrimary = useMemo(() => {
    const today = new Date(), tmrw = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return findNextPrayer(primary.scheduleToday, today) ?? findNextPrayer(primary.scheduleTmrw, tmrw);
  }, [primary.scheduleToday, primary.scheduleTmrw, tick]);

  const countdownPrimary = useMemo(() =>
    nextPrimary ? formatDiff(nextPrimary.targetDate, tick) : null
  , [nextPrimary, tick]);

  const nextSel = useMemo(() => {
    const today = new Date(), tmrw = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return findNextPrayer(sel.scheduleToday, today) ?? findNextPrayer(sel.scheduleTmrw, tmrw);
  }, [sel.scheduleToday, sel.scheduleTmrw, tick]);

  const countdownSel = useMemo(() =>
    nextSel ? formatDiff(nextSel.targetDate, tick) : null
  , [nextSel, tick]);

  // close on outside click / ESC
  useEffect(() => {
    if (!expanded) return;
    const onMouse = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setExpanded(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(false); };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown",   onKey);
    return () => { document.removeEventListener("mousedown", onMouse); document.removeEventListener("keydown", onKey); };
  }, [expanded]);

  const spring = { type: "spring", stiffness: 400, damping: 32 } as const;

  return (
    <LayoutGroup id="sholat-widget">
      <div ref={containerRef} className="relative">
        <motion.div
          layoutId="sholat-card"
          transition={spring}
          onClick={() => !expanded && setExpanded(true)}
          role={expanded ? "dialog" : "button"}
          aria-expanded={expanded}
          aria-label="Jadwal Sholat"
          tabIndex={expanded ? -1 : 0}
          onKeyDown={(e) => { if (!expanded && (e.key === "Enter" || e.key === " ")) setExpanded(true); }}
          style={{ borderRadius: 16 }}
          className={[
            T.cardBg, T.cardBorder, T.cardShadow,
            expanded
              ? `w-[min(340px,90vw)] sm:w-[390px] cursor-default ${anchorRight ? "right-0" : "left-0"}`
              : "cursor-pointer hover:bg-white/95 select-none",
            "transition-colors duration-200",
          ].join(" ")}
        >
          {/* ─── Shared Header — identical layout in both states ─── */}
          <div className={`flex items-center gap-2.5 ${expanded ? "px-4 pt-4 pb-3" : "px-3 py-2"}`}>

            {/* Mosque icon — only SIZE morphs, colours stay same */}
            <motion.div
              layoutId="sholat-icon"
              transition={spring}
              style={{ borderRadius: "50%", flexShrink: 0 }}
              className={[
                T.iconBg, T.iconText, T.iconShadow, 
                "flex items-center justify-center",
                expanded ? "w-10 h-10" : "w-8 h-8", expanded ? "flex" : "hidden min-[528px]:flex",
              ].join(" ")}
            >
              <FaMosque className={expanded ? "text-base" : "text-sm"} />
            </motion.div>

            {/* Text column */}
            <div className="flex flex-col leading-tight flex-1 min-w-0 gap-1">

              {/* City row — same style both states */}
              <motion.div layoutId="sholat-city" transition={spring} className={`items-center gap-1 ${expanded ? "flex" : "hidden min-[528px]:flex"}`}>
                <FaMapMarkerAlt className={`shrink-0 ${T.pinColor} ${expanded ? "text-[11px]" : "text-[10px]"}`} />
                <motion.span
                  layoutId="sholat-city-name"
                  transition={spring}
                  className={`truncate leading-none ${T.cityText} ${expanded ? "text-[12px]" : "text-[11px]"}`}
                >
                  {expanded
                    ? (cities[selectedCityIdx].cityName || DEFAULT_CITIES[selectedCityIdx].lokasi)
                    : (primary.cityName || cityQuery)
                  }
                </motion.span>
              </motion.div>

              {/* Mini: prayer + countdown inline */}
              {!expanded && (
                <>
                  {primary.loading && (
                    <span className={`text-[11px] ${T.subText}`}>Memuat…</span>
                  )}
                  {!primary.loading && primary.error && (
                    <span className="text-[11px] text-red-500">{primary.error}</span>
                  )}
                  {!primary.loading && !primary.error && nextPrimary && countdownPrimary && (
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        layoutId="sholat-prayer-name"
                        transition={spring}
                        className={`text-[12px] whitespace-nowrap ${T.prayerLabel} ${expanded ? "flex" : "hidden min-[528px]:flex"}`}
                      >
                        {nextPrimary.name}
                        <span className={`ml-1 font-semibold ${T.subText}`}>{nextPrimary.time}</span>
                      </motion.span>
                      <motion.span
                        layoutId="sholat-countdown"
                        transition={spring}
                        style={{ borderRadius: 8 }}
                        className={`text-[11px] px-2 py-0.5 ${T.cdBg} ${T.cdText}`}
                      >
                        {countdownPrimary}
                      </motion.span>
                    </div>
                  )}
                  {!primary.loading && !primary.error && (!nextPrimary || !countdownPrimary) && (
                    <span className={`text-[11px] ${T.subText}`}>Jadwal tidak tersedia</span>
                  )}
                </>
              )}

              {/* Expanded: date sub-label */}
              {expanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.08, duration: 0.18 }}
                  className={`text-[11px] ${T.mutedText}`}
                >
                  {formatDate(tick)}
                </motion.span>
              )}
            </div>

            {/* Right action — chevron or close */}
            <AnimatePresence mode="wait" initial={false}>
              {expanded ? (
                <motion.button
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                  exit={{   opacity: 0, rotate:  90,  scale: 0.5 }}
                  transition={{ duration: 0.16 }}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                  className={`w-7 h-7 flex items-center justify-center rounded-full ${T.subText} hover:text-red-500 hover:bg-red-50 transition shrink-0 cursor-pointer`}
                  aria-label="Tutup"
                >
                  <FaTimes className="text-xs" />
                </motion.button>
              ) : (
                <motion.span
                  key="chevron"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{   opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className={`${T.subText} text-[10px] ml-0.5 shrink-0`}
                >
                  <FaChevronDown />
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* ─── Expanded-only body ─── */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="body"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{   opacity: 0, height: 0 }}
                transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                {/* City tabs — reuse same pin icon + font as header */}
                <div className="flex gap-2 px-4 pb-3">
                  {DEFAULT_CITIES.map((city, idx) => (
                    <button
                      key={city.query}
                      type="button"
                      onClick={() => setCity(idx)}
                      className={[
                        "flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full transition-all duration-200 cursor-pointer",
                        selectedCityIdx === idx ? T.tabActive : T.tabDefault,
                      ].join(" ")}
                    >
                      <FaMapMarkerAlt className="text-[9px]" />
                      {cities[idx].cityName || city.lokasi}
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div className="mx-4 border-t border-blue-100" />

                {/* Prayer grid */}
                <div className="px-4 py-3">
                  {sel.loading ? (
                    <div className="flex justify-center py-6">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : sel.error ? (
                    <div className="text-center text-xs text-red-500 py-4">{sel.error}</div>
                  ) : (
                    <div className="grid grid-cols-5 gap-1.5">
                      {PRAYER_KEYS.map((p) => {
                        const isNext = nextSel?.key === p.key;
                        const timeStr = sel.scheduleToday?.[p.key] ?? "–";
                        return (
                          <div
                            key={p.key}
                            className={[
                              "flex flex-col items-center py-2.5 px-1 rounded-xl transition-all duration-200",
                              isNext ? T.cellActive : T.cellDefault,
                            ].join(" ")}
                          >
                            {/* Label — same tracking/size as city name */}
                            <span className={`text-[10px] font-semibold mb-1 ${isNext ? "text-blue-100" : T.subText}`}>
                              {p.label}
                            </span>
                            {/* Time — same weight as prayer name in mini */}
                            <span className={`text-[13px] font-bold ${isNext ? "text-white" : T.prayerLabel}`}>
                              {timeStr}
                            </span>
                            {isNext && (
                              <span className="mt-1 text-[8px] font-semibold text-blue-200 uppercase tracking-wide">
                                Berikutnya
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer countdown — same pill style as mini badge, just bigger */}
                {!sel.loading && !sel.error && nextSel && countdownSel && (
                  <div className="mx-4 mb-4 rounded-xl bg-blue-600 px-4 py-3 flex items-center justify-between shadow-[0_4px_12px_rgba(8,74,131,0.28)]">
                    <div className="flex flex-col gap-0.5">
                      {/* Reuse same layoutId → morphs from mini prayer name */}
                      <motion.span
                        layoutId="sholat-prayer-name"
                        transition={spring}
                        className="text-white font-bold text-[13px]"
                      >
                        {nextSel.name}
                        <span className="ml-1.5 text-blue-200 font-semibold">{nextSel.time}</span>
                      </motion.span>
                      <span className="text-[10px] text-blue-200 uppercase tracking-wide font-semibold">
                        Menuju waktu sholat
                      </span>
                    </div>
                    {/* Reuse same layoutId → morphs from mini countdown badge */}
                    <motion.span
                      layoutId="sholat-countdown"
                      transition={spring}
                      style={{ borderRadius: 8 }}
                      className="font-mono text-[20px] font-bold text-white tracking-widest bg-blue-500/40 px-3 py-1"
                    >
                      {countdownSel}
                    </motion.span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </LayoutGroup>
  );
}
