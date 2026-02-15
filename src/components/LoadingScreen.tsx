import React from "react";

export default function LoadingScreen() {
  const skills = [
    "React",
    "TypeScript",
    "Tailwind",
    "Vite",
    "UI / UX",
    "Accessibility",
    "Performance",
    "Responsive",
    "Animations",
    "Clean Code",
  ];

  // Duplicate so the custom marquee animation (translateX(-50%)) loops smoothly.
  const items = [...skills, ...skills];

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-6 px-6">
        <div className="text-center">
          <div className="font-bebas text-4xl leading-none tracking-wide">
            Loading
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Preparing my portfolio experience…
          </div>
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60">
          <div
            className="animate-marquee items-center gap-2 py-3"
            role="status"
            aria-label="Loading content"
          >
            {items.map((label, idx) => (
              <span
                key={`${label}-${idx}`}
                className="mx-2 inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-900/80 animate-bar"
              style={{
                // used by .animate-bar keyframes
                // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                ...({ "--bar-width": "100%" } as React.CSSProperties),
              }}
            />
          </div>
          <div className="mt-2 text-center text-xs text-slate-500">
            Tip: you can enable reduced motion.
          </div>
        </div>
      </div>
    </div>
  );
}
