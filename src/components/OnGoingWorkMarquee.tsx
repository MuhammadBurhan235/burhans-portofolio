import { memo, useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";

type WorkLikeItem = {
  title: string;
  status?: string;
};

type Props = {
  items: WorkLikeItem[];
};

const OnGoingWorkMarquee = memo(function OnGoingWorkMarquee({ items }: Props) {
  const titles = useMemo(() => {
    return items
      .filter((item) => item.status === "on going")
      .map((item) => item.title)
      .filter(Boolean);
  }, [items]);

  if (titles.length === 0) return null;

  // Always duplicate to create a seamless loop (prevents empty gap).
  const loopTitles =
    titles.length === 1
      ? [titles[0], titles[0]]
      : [...titles, ...titles, ...titles];

  const handleQuickScroll = () => {
    if (typeof document === "undefined") return;
    const target = document.getElementById("work-experience");
    if (!target) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    const yOffset = 80; // keep content clear from fixed navbar
    const y = target.getBoundingClientRect().top + window.scrollY - yOffset;
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="mt-4 w-full max-w-160 rounded-lg bg-blue-100 shadow-[0_3px_6px_rgba(8,74,131,0.5)] p-3 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <div className="w-full sm:w-auto shrink-0 flex items-center justify-between sm:justify-start gap-2">
          <div className="text-xs font-bold text-blue-700">On Going Work</div>
          <button
            type="button"
            onClick={handleQuickScroll}
            className="w-7 h-7 rounded-md bg-white text-blue-700 cursor-pointer shadow-[0_3px_6px_rgba(8,74,131,0.15)] flex items-center justify-center hover:bg-blue-50 transition sm:hidden"
            aria-label="Scroll to Work Experience"
            title="Scroll to Work Experience"
          >
            <FaChevronDown className="text-sm" />
          </button>
        </div>
        <div className="relative overflow-hidden flex-1 min-w-0 rounded-md">
          <div className="flex w-max gap-2 sm:gap-3 items-center animate-marquee motion-reduce:animate-none">
            {loopTitles.map((title, idx) => (
              <span
                key={`${title}-${idx}`}
                className="px-2 sm:px-3 py-1 bg-white rounded-4xl text-xs md:text-sm font-semibold text-gray-800 shadow-[0_3px_6px_rgba(8,74,131,0.15)] whitespace-nowrap"
              >
                {title}
              </span>
            ))}
          </div>

          {/* Fog edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-8 bg-gradient-to-r from-[rgba(8,74,131,0.15)] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-8 bg-gradient-to-l from-[rgba(8,74,131,0.15)] to-transparent"
          />
        </div>
        <button
          type="button"
          onClick={handleQuickScroll}
          className="w-7 h-7 rounded-md bg-white text-blue-700 cursor-pointer shadow-[0_3px_6px_rgba(8,74,131,0.15)] hover:bg-blue-50 transition hidden sm:flex sm:items-center sm:justify-center"
          aria-label="Scroll to Work Experience"
          title="Scroll to Work Experience"
        >
          <FaChevronDown className="text-sm" />
        </button>
      </div>
    </div>
  );
});

export default OnGoingWorkMarquee;
