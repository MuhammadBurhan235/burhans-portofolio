import { memo, useEffect, useId, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  FaBars,
  FaReact,
  FaSass,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaGraduationCap,
  FaBriefcase,
  FaFolderOpen,
  FaUsers,
  FaTimes,
  FaFileAlt,
  FaJs,
  FaHtml5,
  FaCss3,
} from "react-icons/fa";
import {
  SiTypescript,
  SiPhp,
  SiMysql,
  SiLaravel,
  SiBootstrap,
  SiTailwindcss,
} from "react-icons/si";
import Navbar from "../components/Navbar";
import { imagess } from "../Image";
import {
  eduExperiences,
  workExperiences,
  projectExperiences,
  orgExperiences,
} from "../components/ExperienceData";

function useInView<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.01, rootMargin: "0px" },
) {
  const [node, setNode] = useState<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!node) return;
    if (typeof window === "undefined") {
      setIsInView(true);
      return;
    }

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reduceMotion) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    const rect = node.getBoundingClientRect();
    const isAlreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (isAlreadyInView) {
      setIsInView(true);
      observer.disconnect();
      return;
    }

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, options]);

  return [setNode, isInView] as const;
}

function canonicalizeSkill(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/c\s*#/g, "csharp")
    .replace(/\.\s*net/g, "dotnet")
    .replace(/[^a-z0-9]+/g, "");
}

const SKILL_ICON_ITEMS = [
  {
    key: "javascript",
    icon: <FaJs className="text-yellow-500 text-2xl" />,
    label: "JavaScript",
  },
  {
    key: "html",
    icon: <FaHtml5 className="text-red-500 text-2xl" />,
    label: "HTML",
  },
  {
    key: "react",
    icon: <FaReact className="text-blue-500 text-2xl" />,
    label: "React.js",
  },
  {
    key: "typescript",
    icon: <SiTypescript className="text-blue-700 text-2xl" />,
    label: "TypeScript",
  },
  {
    key: "css",
    icon: <FaCss3 className="text-blue-500 text-2xl" />,
    label: "CSS",
  },
  {
    key: "sass",
    icon: <FaSass className="text-pink-500 text-2xl" />,
    label: "Sass",
  },
  {
    key: "php",
    icon: <SiPhp className="text-indigo-700 text-2xl" />,
    label: "PHP",
  },
  {
    key: "C#",
    icon: (
      <img
        src={imagess["Csharp"]}
        alt="C#"
        loading="lazy"
        decoding="async"
        className="w-6 h-6 object-contain"
      />
    ),
    label: "C#",
  },
  {
    key: ".Net Core",
    icon: (
      <img
        src={imagess["NET_Core_Logo"]}
        alt=".Net Core"
        loading="lazy"
        decoding="async"
        className="w-6 h-6 object-contain"
      />
    ),
    label: ".Net Core",
  },
  {
    key: "mysql",
    icon: <SiMysql className="text-yellow-700 text-2xl" />,
    label: "MySQL",
  },
  {
    key: "laravel",
    icon: <SiLaravel className="text-red-700 text-2xl" />,
    label: "Laravel",
  },
  {
    key: "bootstrap",
    icon: <SiBootstrap className="text-purple-700 text-2xl" />,
    label: "Bootstrap",
  },
  {
    key: "tailwindcss",
    icon: <SiTailwindcss className="text-cyan-500 text-2xl" />,
    label: "Tailwind CSS",
  },
  {
    key: "Figma",
    icon: (
      <img
        src={imagess["FigmaLogo"]}
        alt="Figma"
        loading="lazy"
        decoding="async"
        className="w-6 h-6 object-contain"
      />
    ),
    label: "Figma",
  },
] as const;

const SKILL_TEXT_ITEMS = [
  { key: "frontend-development", label: "Frontend Development" },
  { key: "lean-ux", label: "Lean UX" },
  { key: "ui-design", label: "UI Design" },
  { key: "agile", label: "Agile" },
  { key: "scrum", label: "Scrum" },
  { key: "science", label: "Science" },
  { key: "math", label: "Mathematics" },
  { key: "lead", label: "Leadership" },
  { key: "public-broadcasting", label: "Public Broadcasting" },
  { key: "broadcast-media", label: "Broadcast Media" },
  { key: "teamwork", label: "Teamwork" },
  { key: "SofCons", label: "Software Construction" },
  { key: "VerCont", label: "Version Control" },
  { key: "SofArch", label: "Software Architecture" },
  { key: "UI/UX Design", label: "UI/UX Design" },
  { key: "Hi-Fi Prototype", label: "Hi-Fi Prototype" },
  { key: "public workshop", label: "Public Workshop" },
] as const;

function getSliceCountFromWidth(width: number) {
  if (width <= 768) return 3; // md: max 3
  if (width <= 1024) return 4; // lg: max 4
  return 5;
}

function useResponsiveSliceCount() {
  const [sliceCount, setSliceCount] = useState(() => {
    if (typeof window === "undefined") return 3;
    return getSliceCountFromWidth(window.innerWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      setSliceCount(getSliceCountFromWidth(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return sliceCount;
}

interface OutputItem {
  url: string;
  label?: string;
}

type ExperienceDescription = string | string[];

interface ExperienceItemProps {
  title: string;
  description?: ExperienceDescription;
  images?: string[];
  location?: string;
  date?: string;
  output?: OutputItem[];
  skills?: string[];
  sliceCount: number;
}

type ExperienceDataItem = Omit<ExperienceItemProps, "sliceCount">;

interface ExperienceSectionProps {
  id: string;
  title: string;
  icon: ReactNode;
  items: ExperienceDataItem[];
  sliceCount: number;
}

const ExperienceSection = memo(function ExperienceSection({
  id,
  title,
  icon,
  items,
  sliceCount,
}: ExperienceSectionProps) {
  const [setSectionRef, sectionInView] = useInView<HTMLDivElement>({
    threshold: 0.01,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <div
      id={id}
      ref={setSectionRef}
      className={`w-full scroll-mt-24 mb-8 min-w-[288px] max-w-[1148px] px-4 py-8 pr-0 rounded-4xl flex flex-col gap-8 items-center shadow-[-4px_-3px_6px_rgba(8,74,131,0.12),-4px_3px_6px_rgba(8,74,131,0.12)]
      transition-all duration-700 ease-out motion-reduce:transition-none
      ${
        sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h2 className="w-full font-bold text-lg md:text-xl lg:text-2xl mb-2 px-4 flex items-center gap-3">
        <span className="text-blue-700">{icon}</span>
        {title} ({items.length})
      </h2>
      {items.map((exp, idx) => (
        <ExperienceItem key={`${id}-${idx}`} {...exp} sliceCount={sliceCount} />
      ))}
    </div>
  );
});

const ExperienceItem = memo(function ExperienceItem({
  title,
  description = "",
  images = [],
  location,
  date,
  output = [],
  skills = [],
  sliceCount,
}: ExperienceItemProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const modalId = useId();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (images.length === 0) {
      if (imgIdx !== 0) setImgIdx(0);
      return;
    }

    if (imgIdx > images.length - 1) {
      setImgIdx(0);
    }
  }, [images.length, imgIdx]);

  const skillIcons = useMemo(() => {
    if (!skills?.length) return [];
    const canonicalSkills = new Set(skills.map(canonicalizeSkill));
    return SKILL_ICON_ITEMS.filter((item) =>
      canonicalSkills.has(canonicalizeSkill(item.key)),
    );
  }, [skills]);

  const skillTextLabels = useMemo(() => {
    if (!skills?.length) return [];
    const canonicalSkills = new Set(skills.map(canonicalizeSkill));
    return SKILL_TEXT_ITEMS.filter((item) =>
      canonicalSkills.has(canonicalizeSkill(item.key)),
    );
  }, [skills]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (!showModal) return;

    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [showModal]);

  useEffect(() => {
    if (!showModal) {
      lastActiveElementRef.current?.focus?.();
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseModal();
        return;
      }

      if (e.key !== "Tab") return;
      const root = modalRef.current;
      if (!root) return;

      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusable.length === 0) {
        e.preventDefault();
        root.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !root.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  return (
    <div className="w-full group">
      <div className="bg-gray-50 rounded-xl p-4 pb-8 w-full flex flex-col gap-3 shadow-[0_-3px_4px_rgba(8,74,131,0.08),0_3px_6px_rgba(8,74,131,0.12)] transition-shadow duration-200 motion-reduce:transition-none will-change-transform group-hover:shadow-[0_-3px_4px_rgba(8,74,131,0.5),0_3px_6px_rgba(8,74,131,0.5)] group-hover:animate-float motion-reduce:group-hover:animate-none">
        <h3
          className="relative w-fit font-bold text-sm md:text-base lg:text-lg ml-[-56px] px-[24px] py-[12px] pl-14 
             bg-blue-100 rounded-4xl shadow-[0_-3px_4px_rgba(8,74,131,0.5),0_3px_6px_rgba(8,74,131,0.5)]
             before:content-[''] before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 
             before:w-4 before:h-4 before:rounded-full before:bg-blue-500"
        >
          {title}
        </h3>
        <div className="flex flex-col md:flex-row gap-4 w-full bg-amber-0">
          <div className="text-[12px] p-4 pt-0 md:text-sm lg:text-base flex flex-col gap-1 w-full md:w-2/3 ">
            {/* Lokasi dan Tanggal */}
            <div className="flex gap-2 items-center mb-2 flex-wrap text-gray-700">
              {location && date && (
                <span className="text-xs md:text-sm font-bold">
                  {location} | {date}
                </span>
              )}
            </div>

            {/* Deskripsi */}
            {Array.isArray(description) ? (
              <ul className="pl-0 md:pl-2 w-full break-words whitespace-pre-line">
                {description.map((line: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 mb-1 list-none w-full break-words"
                  >
                    <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block flex-shrink-0"></span>
                    <span className="text-left break-words whitespace-pre-line w-full">
                      {/* Deteksi link dan render sebagai <a> */}
                      {line.match(/https?:\/\/[^\s]+/) ? (
                        <a
                          href={line.match(/https?:\/\/[^\s]+/)?.[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline break-all"
                        >
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-left break-words whitespace-pre-line">
                {description}
              </p>
            )}
            <div className="mt-4">
              {skills?.length > 0 && (
                <div className="flex flex-col gap-2 ">
                  <span className="text-xs md:text-sm font-bold">
                    Skills Focus
                  </span>
                  <div className="flex flex-wrap gap-2 items-center">
                    {/* Skill Icons and Labels */}
                    {skillIcons.length > 0 && (
                      <span className="relative w-fit max-[485px]:w-full font-medium text-xs flex flex-wrap justify-center gap-3 items-center md:text-sm px-4 py-2 bg-blue-100 rounded-4xl group">
                        {skillIcons.map((item, idx) => (
                          <span className="relative group" key={item.key}>
                            {item.icon}
                            <span
                              className={`absolute left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 ${
                                idx % 2 === 0
                                  ? "bottom-full mb-1"
                                  : "top-full mt-1"
                              }`}
                            >
                              {item.label}
                            </span>
                          </span>
                        ))}
                      </span>
                    )}
                    {/* Skill Text Labels for non-icon skills */}
                    {skillTextLabels.length > 0 && (
                      <span className="w-fit max-[485px]:w-full font-medium text-xs text-center md:text-sm px-4 py-1 bg-blue-100 rounded-4xl whitespace-normal">
                        {skillTextLabels.map((item, idx) => (
                          <span key={item.key}>
                            {item.label}
                            {idx < skillTextLabels.length - 1 && ", "}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {output.length > 0 && (
                <div className="flex flex-col gap-2 mt-4">
                  <span className="text-xs md:text-sm font-bold">
                    Output - Just Click It!
                  </span>
                  <div className="flex flex-wrap gap-3 text-center md:gap-2">
                    {output.map((item: OutputItem, idx: number) => (
                      <a
                        key={`${item.url}-${idx}`}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit max-[485px]:w-full font-medium text-xs md:text-sm px-4 py-1 bg-blue-100 rounded-4xl shadow-[0_3px_6px_rgba(8,74,131,0.5)] hover:bg-blue-200 transition"
                      >
                        {item.label ?? item.url}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gambar */}
          {images.length > 0 && (
            <div className="flex flex-col items-center w-full mt-4 md:w-1/3 gap-2">
              {/* Gambar utama */}
              <img
                src={imagess[images[imgIdx]]}
                className="w-full max-w-xs h-40 md:h-48 lg:h-56 object-cover rounded transition-all duration-300 cursor-pointer shadow-[0_0_6px_rgba(8,74,131,0.5)]"
                alt={`${title} - preview`}
                loading="lazy"
                decoding="async"
                onClick={handleOpenModal}
              />
              {/* Preview images & tombol hanya jika > 1 gambar */}
              {images.length > 1 && (
                <div className="flex flex-row flex-nowrap items-center gap-2 ">
                  {images
                    .slice(0, sliceCount)
                    .map((img: string, idx: number) => (
                      <img
                        key={img}
                        src={imagess[img]}
                        className="w-10 h-7 sm:w-12 sm:h-8 md:w-10 md:h-7 lg:w-12 lg:h-8 object-cover rounded border border-gray-200 cursor-pointer transition-all duration-300 shadow-[0_3px_6px_rgba(8,74,131,0.5)]"
                        alt={`${title} - thumbnail ${idx + 1}`}
                        loading="lazy"
                        decoding="async"
                        onClick={() => setImgIdx(idx)}
                      />
                    ))}
                  <button
                    className="w-10 h-7 sm:w-12 sm:h-8 md:w-10 md:h-7 lg:w-12 lg:h-8 bg-blue-500 text-white rounded flex items-center justify-center text-base shadow-[0_3px_6px_rgba(8,74,131,0.5)] cursor-pointer hover:bg-blue-600 transition"
                    onClick={handleOpenModal}
                    style={{ minWidth: "28px", minHeight: "28px" }}
                    title="Lihat semua gambar"
                  >
                    <FaBars />
                  </button>
                </div>
              )}
              {/* Modal untuk semua gambar */}
              {showModal && (
                <div
                  className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center"
                  onClick={handleCloseModal}
                >
                  <div
                    className="w-[756px] h-[776px] max-w-full max-h-full bg-white rounded-lg p-0 shadow-lg relative flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                    ref={modalRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`media-title-${modalId}`}
                    tabIndex={-1}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b">
                      <span
                        id={`media-title-${modalId}`}
                        className="font-bold text-lg"
                      >
                        Media
                      </span>
                      <button
                        className="text-gray-600 hover:text-blue-600 text-2xl cursor-pointer"
                        onClick={handleCloseModal}
                        title="Tutup"
                        aria-label="Tutup modal"
                        ref={closeButtonRef}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    {/* Content */}
                    <div className="flex flex-col gap-0 md:gap-4 px-6 py-4 flex-1 overflow-auto">
                      {/* Image preview */}
                      <div className="flex-1 flex items-center justify-center h-full max-h-[525px]">
                        <img
                          src={imagess[images[imgIdx]]}
                          alt={`${title} - media ${imgIdx + 1}`}
                          className="w-full h-full object-contain rounded shadow bg-white"
                        />
                      </div>
                      {/* Detail */}
                      <div className="flex-1 flex flex-col justify-start min-w-[220px] px-0 md:px-4 mt-4 md:mt-0">
                        <span className="font-semibold text-base mb-2">
                          {images[imgIdx]
                            .replace(/[_-]/g, " ")
                            .replace(/\.[^/.]+$/, "")}
                        </span>
                      </div>
                    </div>
                    {/* Footer navigation */}
                    <div className="flex items-center justify-between px-6 py-3 border-t bg-gray-50 rounded-b-lg">
                      <span className="text-sm text-gray-600">
                        {imgIdx + 1} of {images.length}
                      </span>
                      <div className="flex gap-2">
                        <button
                          className="px-4 py-2 rounded bg-white border text-blue-700 hover:bg-blue-100 cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                          onClick={() =>
                            setImgIdx((idx) => Math.max(0, idx - 1))
                          }
                          disabled={imgIdx === 0}
                        >
                          Previous
                        </button>
                        <button
                          className="px-4 py-2 rounded bg-white border text-blue-700 hover:bg-blue-100 cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                          onClick={() =>
                            setImgIdx((idx) =>
                              Math.min(images.length - 1, idx + 1),
                            )
                          }
                          disabled={imgIdx === images.length - 1}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

function DashboardUser() {
  const [activeNavbar, setActiveNavbar] = useState(1);
  const sliceCount = useResponsiveSliceCount();
  const [setAboutRef, aboutInView] = useInView<HTMLDivElement>({
    threshold: 0.01,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <div className="w-full h-fit bg-[linear-gradient(to_bottom,#084a83_0%,#ECF0F5_16%)] flex flex-col items-center">
      {/*Navbar*/}
      <Navbar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />

      {/*Content Area*/}
      <div className="w-full min-w-[320px] px-8 py-16 bg-transparent flex flex-col items-center gap-4 ">
        {/* section about burhan */}
        <div
          id="about-burhan"
          ref={setAboutRef}
          className={`w-full scroll-mt-24 min-w-[288px] max-w-[1148px] px-2 md:px-4 py-8 md:py-16 rounded-b-4xl flex flex-col gap-8 items-center
          transition-all duration-700 ease-out motion-reduce:transition-none
          ${aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <div className="w-full flex flex-col gap-4 items-center">
            <div className="flex flex-col mt-4 md:flex-row gap-4 px-2 md:px-4 max-w-[1000px] items-center">
              {/* Responsive Profile Image & Social Media Icons */}
              <div className="relative mx-auto flex items-center justify-center mb-2">
                <div className="border-4 border-white rounded-full bg-white shadow-[0_3px_6px_rgba(8,74,131,0.5)] overflow-visible flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
                  <img
                    src={
                      imagess["Profile"] ??
                      "https://avatars.githubusercontent.com/u/00000000?v=4"
                    }
                    alt="Muhammad Burhan"
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-full shadow-xl"
                    style={{ zIndex: 2 }}
                  />
                  {/* Social Media Icons mengelilingi profile image di md dan atas */}
                  <div className="hidden max-[425px]:block absolute inset-0 pointer-events-none">
                    <div className="w-full h-full flex items-center justify-center relative">
                      {/* LinkedIn - kanan atas */}
                      <a
                        href="https://www.linkedin.com/in/muhammad-burhan-5835841b0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-[-26.5px] top-[-17px] bg-white/80 backdrop-blur rounded-lg shadow flex items-center justify-center w-10 h-10 pointer-events-auto hover:bg-blue-100 transition"
                        title="LinkedIn"
                      >
                        <FaLinkedin className="text-3xl text-gray-800" />
                      </a>
                      {/* GitHub - kanan tengah */}
                      <a
                        href="https://github.com/MuhammadBurhan235/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-[-43px] top-[44px] -translate-y-1/2 bg-white/80 backdrop-blur rounded-lg shadow flex items-center justify-center w-10 h-10 pointer-events-auto hover:bg-gray-100 transition"
                        title="GitHub"
                      >
                        <FaGithub className="text-3xl text-gray-800" />
                      </a>
                      {/* Instagram - kanan bawah */}
                      <a
                        href="https://www.instagram.com/muhammadburhan_253/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-[-43px] bottom-[23.5px] bg-white/80 backdrop-blur rounded-lg shadow flex items-center justify-center w-10 h-10 pointer-events-auto hover:bg-pink-50 transition"
                        title="Instagram"
                      >
                        <FaInstagram className="text-3xl text-gray-800" />
                      </a>
                      {/* CV - bawah kanan */}
                      <a
                        href="https://drive.google.com/drive/folders/1Im3MwJmtDB87Hz-401bSVPGamJmTlHJ1?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-[-26.5px] bottom-[-17px] bg-white/80 backdrop-blur rounded-lg shadow flex items-center justify-center w-10 h-10 pointer-events-auto hover:bg-green-50 transition"
                        title="Download CV"
                      >
                        <FaFileAlt className="text-3xl text-gray-800" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                {/* Responsive Name */}
                <div className="relative w-full font-bold text-lg sm:text-2xl md:text-2xl lg:text-4xl ml-0 md:ml-[-64px] flex flex-row justify-between max-[425px]:justify-center items-center">
                  Muhammad Burhan {/* Social Media Icons */}
                  <div className="flex gap-4 max-[425px]:hidden">
                    <a
                      href="https://www.linkedin.com/in/muhammad-burhan-5835841b0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-blue-700 hover:bg-white rounded transition-colors group transition-transform duration-150 motion-reduce:transition-none hover:scale-110"
                    >
                      <FaLinkedin className="text-2xl md:text-3xl" />
                      <span className="relative group">
                        <span className="absolute right-[-61px] top-[-55px] px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          LinkedIn
                        </span>
                      </span>
                    </a>
                    <a
                      href="https://github.com/MuhammadBurhan235/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-black hover:bg-white rounded-[16px] transition-colors group transition-transform duration-150 motion-reduce:transition-none hover:scale-110"
                    >
                      <FaGithub className="text-2xl md:text-3xl" />
                      <span className="relative group">
                        <span className="absolute right-[-43px] top-[-55px] px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          GitHub
                        </span>
                      </span>
                    </a>
                    <a
                      href="https://www.instagram.com/muhammadburhan_253/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-pink-600 hover:bg-white rounded-[8px] transition-colors group transition-transform duration-150 motion-reduce:transition-none hover:scale-110"
                    >
                      <FaInstagram className="text-2xl md:text-3xl" />
                      <span className="relative group">
                        <span className="absolute right-[-51px] top-[-55px] px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          Instagram
                        </span>
                      </span>
                    </a>
                    <a
                      href="https://drive.google.com/drive/folders/1Im3MwJmtDB87Hz-401bSVPGamJmTlHJ1?usp=sharing" // Ganti dengan link CV kamu
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-green-700 hover:bg-white items-center justify-center flex transition-colors group transition-transform duration-150 motion-reduce:transition-none hover:scale-110"
                    >
                      <FaFileAlt className="text-[20px] md:text-[24px]" />
                      <span className="relative group">
                        <span className="absolute right-[-35px] top-[-40px] px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          Download CV
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
                {/* Responsive Description */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-[0_3px_6px_rgba(8,74,131,0.5)] mt-2 md:ml-[-70px] md:pl-18">
                  <p className="text-xs sm:text-sm md:text-base text-center">
                    I am a Bachelor’s graduate in Software Engineering from
                    Telkom University (August 2025) with a strong passion for
                    Software Developer with Agile/Lean UX Method. I have
                    experience designing and building responsive, user-focused
                    web interfaces through internships, professional work, and
                    various projects with several clients. My approach
                    emphasizes rapid iteration, validating designs through user
                    feedback, and cross-functional collaboration to deliver
                    digital solutions that are both functional and provide an
                    optimal user experience. I am enthusiastic about tackling
                    new challenges in digital product development and committed
                    to continuously learning and adapting to user needs and
                    industry trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ExperienceSection
          id="edu-experience"
          title="Education"
          icon={<FaGraduationCap />}
          items={eduExperiences}
          sliceCount={sliceCount}
        />

        <ExperienceSection
          id="work-experience"
          title="Work Experience"
          icon={<FaBriefcase />}
          items={workExperiences}
          sliceCount={sliceCount}
        />

        <ExperienceSection
          id="project-experience"
          title="Project Experience"
          icon={<FaFolderOpen />}
          items={projectExperiences}
          sliceCount={sliceCount}
        />

        <ExperienceSection
          id="org-experience"
          title="Organization Experience"
          icon={<FaUsers />}
          items={orgExperiences}
          sliceCount={sliceCount}
        />
      </div>
    </div>
  );
}

export default DashboardUser;
