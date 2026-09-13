import { useState, useEffect, useRef } from "react";
import {
  FaBars, // Tambahkan ikon burger
  FaThList,
  FaTimes, // Tambahkan ikon close
} from "react-icons/fa";
import { imagess } from "../Image";
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaFolderOpen,
  FaUsers,
  FaJs,
  FaHtml5,
  FaCss3,
  FaReact,
  FaSass,
  FaGithub,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiTypescript,
  SiPhp,
  SiMysql,
  SiLaravel,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import SholatCountdownMini from "./SholatCountdownMini";

interface NavbarProps {
  activeNavbar: number;
  setActiveNavbar?: (nav: number) => void;
}

const portfolioSections = [
  { id: "about-burhan", label: "About Burhan", icon: <FaUser /> },
  { id: "edu-experience", label: "Education", icon: <FaGraduationCap /> },
  { id: "work-experience", label: "Work", icon: <FaBriefcase /> },
  { id: "project-experience", label: "Projects", icon: <FaFolderOpen /> },
  { id: "org-experience", label: "Organization", icon: <FaUsers /> },
];

const skillIcons = [
  {
    key: "JavaScript",
    icon: <FaJs className="text-yellow-500 text-[32px]" />,
    value: 8,
  },
  {
    key: "HTML",
    icon: <FaHtml5 className="text-red-500 text-[32px]" />,
    value: 8,
  },
  {
    key: "CSS",
    icon: <FaCss3 className="text-blue-500 text-[32px]" />,
    value: 8,
  },
  {
    key: "React",
    icon: <FaReact className="text-blue-400 text-[32px]" />,
    value: 7,
  },
  {
    key: "TypeScript",
    icon: <SiTypescript className="text-blue-700 text-[32px]" />,
    value: 7,
  },
  {
    key: "C#",
    icon: <img src={imagess["Csharp"]} className="w-8 h-8 object-contain" />,
    value: 7,
  },

  {
    key: "PHP",
    icon: <SiPhp className="text-indigo-700 text-[32px]" />,
    value: 7,
  },
  {
    key: "MySQL",
    icon: <SiMysql className="text-yellow-700 text-[32px]" />,
    value: 7,
  },
  {
    key: "Laravel",
    icon: <SiLaravel className="text-red-700 text-[32px]" />,
    value: 6,
  },
  {
    key: "Tailwind CSS",
    icon: <SiTailwindcss className="text-cyan-500 text-[32px]" />,
    value: 8,
  },
  {
    key: "GitHub",
    icon: <FaGithub className="text-black text-[32px]" />,
    value: 8,
  },
  {
    key: "Figma",
    icon: <img src={imagess["FigmaLogo"]} className="w-8 h-8 object-contain" />,
    label: "Figma",
    value: 8,
  },
  {
    key: "Node.js",
    icon: <SiNodedotjs className="text-green-500 text-[32px]" />,
    value: 7,
  },
  {
    key: ".Net Core",
    icon: (
      <img src={imagess["NET_Core_Logo"]} className="w-8 h-8 object-contain" />
    ),
    label: ".Net Core",
    value: 6,
  },
  {
    key: "Sass",
    icon: <FaSass className="text-pink-500 text-[32px]" />,
    value: 8,
  },
  {
    key: "Bootstrap",
    icon: <FaBootstrap className="text-purple-700 text-[32px]" />,
    value: 6,
  },
];

function Navbar({ activeNavbar, setActiveNavbar }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  // const [showNavbar, setShowNavbar] = useState(true);
  // const [isTop, setIsTop] = useState(true);
  const lastScrollY = useRef(0);
  // const [activeStatus, setActiveStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about-burhan");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Tambahkan state untuk burger menu skill
  const [skillMenuOpen, setSkillMenuOpen] = useState(false);

  // Hitung berapa tombol yang muat berdasarkan lebar window
  const [visibleCount, setVisibleCount] = useState(portfolioSections.length);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleCloseSkillMenu = () => {
    setSkillMenuOpen(false);
  };
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) setVisibleCount(1);
      else if (width < 900) setVisibleCount(2);
      else if (width < 1000) setVisibleCount(3);
      else if (width < 1100) setVisibleCount(4);
      else setVisibleCount(portfolioSections.length);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Tentukan arah scroll
      const isScrollingDown = currentScrollY > lastScrollY.current;

      // Offset berbeda tergantung arah
      const offset = isScrollingDown ? 325 : 325;
      const scrollPos = currentScrollY + offset;

      for (const sec of portfolioSections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActive(sec.id);
            break;
          }
        }
      }

      // Update posisi scroll terakhir
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [portfolioSections]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // SET STATE SCROLLED DI SINI (Trigger jika scroll > 20px)
          setIsScrolled(currentScrollY > 20);

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cek apakah active ada di dalam dropdown
  const isActiveInDropdown = portfolioSections
    .slice(visibleCount)
    .some((sec) => sec.id === active);

  const basePath = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const performScroll = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const offset = 80; // navbar 64px + padding
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    // Always land on the base portfolio route so URLs don't become
    // /work-experience/:title#section
    if (location.pathname !== basePath) {
      navigate(
        {
          pathname: basePath,
          hash: `${sectionId}`,
        },
        { replace: true },
      );

      window.setTimeout(() => performScroll(sectionId), 0);
      return;
    }

    navigate(
      {
        pathname: location.pathname,
        search: location.search,
        hash: `${sectionId}`,
      },
      { replace: true },
    );

    performScroll(sectionId);
  };

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (!hash) return;

    const timer = window.setTimeout(() => {
      performScroll(hash);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <>
      {activeNavbar === 1 && (
        <div className="fixed w-full flex flex-col items-center transition-all duration-300 z-50 px-2 md:px-4 pointer-events-none">
          {/* INDUK KAPSUL */}
          <div
            className={`flex flex-row justify-between items-center gap-3 md:gap-4 w-full min-w-[320px] max-w-[1140px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-auto ${
              isScrolled
                ? // REVISI: py-3 px-4 diubah menjadi py-1.5 px-2 md:py-3 md:px-4
                  "bg-[#084a83]/70 backdrop-blur-[6px] shadow-[0_8px_20px_rgba(8,74,131,0.3)] py-1.5 px-2 md:py-3 md:px-4 mt-2 rounded-full border border-blue-400/50"
                : // REVISI: py-3 diubah menjadi py-1.5 md:py-3
                  "bg-transparent py-1.5 md:py-3 mt-0 rounded-full border border-transparent"
            }`}
          >
            {/* BAGIAN KIRI: Infinite Icon Slide */}
            <div
              // REVISI: h-[48px] diubah menjadi h-[40px] md:h-[48px]
              className={`w-full min-w-[150px] max-w-[400px] h-[40px] md:h-[48px] cursor-pointer overflow-hidden flex items-center relative transition-all duration-300 rounded-full ${
                !isScrolled
                  ? "shadow-[0_4px_12px_rgba(0,0,0,0.15)] bg-white/20 backdrop-blur-md border border-white/20"
                  : "bg-transparent border-transparent"
              }`}
            >
              <div className="relative z-10 pl-1 md:pl-1.5">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSkillMenuOpen(!skillMenuOpen);
                  }}
                  // REVISI: Ukuran w-10 h-10 diubah menjadi w-8 h-8 md:w-10 md:h-10
                  className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-white rounded-full hover:bg-blue-100 transition text-blue-600 shadow-sm cursor-pointer"
                  title="Show All Skills"
                >
                  <FaThList className="text-sm md:text-base" />
                </button>
              </div>

              {/* REVISI: pl-12 diubah ke pl-10 md:pl-12 menyesuaikan tombol yang mengecil */}
              <div className="absolute left-0 top-0 w-full h-full flex items-center pl-10 md:pl-12">
                <div
                  className="flex gap-4 md:gap-5 animate-infinite-scroll"
                  style={{
                    animation: "infinite-scroll 22s linear infinite",
                    minWidth: "max-content",
                  }}
                >
                  {skillIcons.concat(skillIcons).map((item, idx) => (
                    <span
                      key={idx}
                      onClick={(e) => {
                        e.preventDefault();
                        setSkillMenuOpen(!skillMenuOpen);
                      }}
                      // REVISI: Padding dalam ikon turut disesuaikan
                      className="flex items-center bg-white/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-white transition-all duration-300 group scale-90 md:scale-100"
                    >
                      {item.icon}
                      <span className="relative group">
                        <span className="absolute px-2 py-1 rounded bg-gray-800 text-white text-[10px] md:text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          {item.key} {item.value}/10
                        </span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-8 bg-gradient-to-l from-[#084a83]/30 to-transparent"
              />
            </div>

            {/* Dropdown skill icons & label */}
            {skillMenuOpen && (
              <div
                className="absolute max-w-[320px] top-[72px] left-4 bg-white rounded-[16px] shadow-lg p-4 z-50 min-w-[220px] flex flex-col gap-2 pointer-events-auto"
                style={{ overscrollBehavior: "contain" }}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <div className="flex flex-row gap-1 justify-between items-center mb-2">
                  <div className="font-semibold text-gray-800">All Skills</div>
                  <button
                    className="text-gray-600 hover:text-blue-600 text-2xl cursor-pointer"
                    onClick={handleCloseSkillMenu}
                    title="Tutup"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 max-h-[320px] overflow-y-auto">
                  {skillIcons.map((item) => (
                    <div
                      key={item.key}
                      className="flex flex-col items-center gap-1"
                    >
                      <span>{item.icon}</span>
                      <span className="text-xs text-gray-700 font-medium capitalize text-center">
                        {item.key}
                      </span>
                      <span className="text-[11px] text-gray-500 font-semibold">
                        {item.value}/10
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Burger menu untuk mobile */}
            <div className="hidden max-[500px]:flex items-center gap-2">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Open menu"
                // REVISI: 'w-fit p-3' diganti menjadi ukuran fixed 'w-[40px] h-[40px] justify-center'
                className={`flex items-center justify-center gap-2 w-[40px] h-[40px] bg-blue-600 rounded-full hover:bg-blue-500 hover:cursor-pointer transition-all duration-300 group ${
                  !isScrolled
                    ? "shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    : "shadow-none"
                }`}
              >
                {/* REVISI: Ikon direduksi sedikit ke text-lg agar pas dalam 40px */}
                <span className="text-white text-lg group-hover:text-blue-100">
                  {menuOpen ? <FaTimes /> : <FaBars />}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute top-[72px] right-4 bg-white rounded-[16px] shadow-xl flex flex-col gap-2 p-2 z-50 min-w-[180px] pointer-events-auto">
                  {portfolioSections.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      className={`p-3 rounded-[12px] nav-link transition-colors duration-200 text-sm cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                        active === sec.id
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 hover:bg-blue-100"
                      }`}
                      onClick={() => {
                        setActive(sec.id);
                        setMenuOpen(false);
                        scrollToSection(sec.id);
                      }}
                    >
                      <span className="text-base">{sec.icon}</span>
                      {sec.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* BAGIAN KANAN: Tombol navigasi (Revisi Shadow lebih tegas) */}
            <div className="flex max-[500px]:hidden flex-row items-center gap-2 w-auto max-w-full relative">
              {portfolioSections.slice(0, visibleCount).map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  className={`px-4 py-2 rounded-full nav-link transition-all duration-300 text-sm md:text-base cursor-pointer whitespace-nowrap flex items-center gap-2
                    ${!isScrolled ? "shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-white/60" : "shadow-sm border border-transparent"} 
                    ${
                      active === sec.id
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 hover:bg-blue-50"
                    }`}
                  onClick={() => {
                    setActive(sec.id);
                    setMenuOpen(false);
                    scrollToSection(sec.id);
                  }}
                >
                  <span className="text-base">{sec.icon}</span>
                  {sec.label}
                </button>
              ))}

              {/* Tombol Dropdown "More" */}
              {visibleCount < portfolioSections.length && (
                <div className="relative">
                  <button
                    className={`px-4 py-2 rounded-full flex text-sm md:text-base items-center transition-all duration-300 gap-2
                      ${!isScrolled ? "shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-white/60" : "shadow-sm border border-transparent"}
                      ${
                        isActiveInDropdown
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 hover:bg-blue-50 hover:cursor-pointer"
                      }
                    `}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <FaBars />
                    More
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-[56px] right-0 bg-white rounded-[16px] shadow-xl flex flex-col gap-2 p-2 z-50 min-w-[180px] pointer-events-auto">
                      {portfolioSections.slice(visibleCount).map((sec) => (
                        <button
                          key={sec.id}
                          type="button"
                          className={`p-3 rounded-[12px] nav-link transition-colors duration-200 text-sm cursor-pointer whitespace-nowrap flex items-center gap-2
                            ${
                              active === sec.id
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600 hover:bg-blue-100 hover:cursor-pointer"
                            }`}
                          onClick={() => {
                            setActive(sec.id);
                            setDropdownOpen(false);
                            scrollToSection(sec.id);
                          }}
                        >
                          <span className="text-base">{sec.icon}</span>
                          {sec.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-[1140px] px-2 md:px-4 mt-0 min-[500px]:mt-1 pointer-events-auto">
            <div className="flex justify-end">
              <SholatCountdownMini />
            </div>
          </div>
        </div>
      )}
      {activeNavbar === 2 && (
        <>
          <div className="w-fit h-full flex gap-4 items-center">
            <button
              className="w-fit h-full flex items-center bg-yellow-500 px-4 py-2"
              onClick={() => setActiveNavbar?.(1)}
            >
              Nav1
            </button>
            <button
              className="w-fit h-full flex items-center bg-green-500 px-4 py-2"
              onClick={() => setActiveNavbar?.(2)}
            >
              Nav2
            </button>
            <button
              className="w-fit h-full flex items-center bg-blue-500 px-4 py-2"
              onClick={() => setActiveNavbar?.(3)}
            >
              Nav3
            </button>
            <div className="w-fit h-full flex items-center">
              <a
                href=""
                className="w-fit bg-blue-600 px-[24px] py-[12px] rounded-[8px] hover:bg-white transition-all duration-300 group"
              >
                <p className="text-base text-white font-medium group-hover:text-blue-600">
                  MASUK
                </p>
              </a>
            </div>
          </div>
        </>
      )}
      <style>
        {`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        `}
      </style>
    </>
  );
}

export default Navbar;
