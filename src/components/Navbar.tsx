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

          // setShowNavbar(currentScrollY < lastScrollY.current);
          // setIsTop(currentScrollY <= 10);
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
        <div
          className={`fixed w-full h-[64px] bg-[#084a83]/30 flex justify-center transition-all duration-300 backdrop-blur-[5px] shadow-lg z-50`}
        >
          <div className="w-full min-w-[320px] max-w-[1140px] h-full px-4 bg-transparent flex flex-row justify-between items-center gap-4">
            {/* Media Infinite Icon Slide  */}
            <div
              className="w-full min-w-[160px] max-w-[400px] h-[48px] rounded-[16px] cursor-pointer overflow-hidden flex items-center relative"
              style={{ position: "relative" }}
            >
              {/* Burger menu di kiri */}
              <div className="relative z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSkillMenuOpen(!skillMenuOpen);
                  }}
                  className="flex items-center justify-center w-10 h-12 bg-white rounded-[8px] hover:bg-blue-100 transition text-blue-600 shadow cursor-pointer"
                  title="Show All Skills"
                >
                  <FaThList />
                </button>
              </div>
              {/* Infinite Icon Slider */}
              <div className="absolute left-0 top-0 w-full h-full flex items-center pl-12">
                <div
                  className="flex gap-5 animate-infinite-scroll"
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
                      className="flex items-center bg-white/30 px-4 py-2 rounded-[8px] hover:bg-white transition-all duration-300 group"
                    >
                      {item.icon}
                      <span className="relative group">
                        <span className="absolute px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          {item.key} {item.value}/10
                        </span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Fog edges */}
              {/* <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-12 w-6 sm:w-8 bg-gradient-to-r from-white to-transparent"
              /> */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-8 bg-gradient-to-l from-white/30 to-transparent"
              />
            </div>
            {/* Dropdown skill icons & label */}
            {skillMenuOpen && (
              <div
                className="absolute max-w-[320px]  top-16 bg-white rounded shadow-lg p-4 z-50 min-w-[220px] flex flex-col gap-2"
                style={{ overscrollBehavior: "contain" }}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <div className="flex flex-row gap-1 justify-between items-center mb-2">
                  <div className="font-semibold ">All Skills</div>
                  <button
                    className="text-gray-600 hover:text-blue-600 text-2xl cursor-pointer"
                    onClick={handleCloseSkillMenu}
                    title="Tutup"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div
                  className="grid grid-cols-3 gap-4 max-h-[320px] overflow-y-auto"
                  style={{ overscrollBehavior: "contain" }}
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
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
                className="flex items-center gap-2 w-fit bg-blue-600 p-3 rounded-[8px] hover:bg-blue-100 hover:cursor-pointer transition-all duration-300 group"
              >
                {/* <span className="text-white text-sm font-medium group-hover:text-blue-600">
                  Experience
                </span> */}
                <span className="text-white text-2xl group-hover:text-blue-600">
                  {menuOpen ? <FaTimes /> : <FaBars />}
                </span>
              </button>

              {/* Dropdown menu */}
              {menuOpen && (
                <div className="absolute top-[64px] right-4 bg-white rounded shadow-lg flex flex-col gap-2 p-2 z-50 min-w-[180px]">
                  {portfolioSections.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      className={`p-3 rounded-md nav-link transition-colors duration-200 text-sm cursor-pointer whitespace-nowrap flex items-center gap-2 ${
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

            {/* Tombol scroll section untuk desktop */}
            <div className="flex max-[500px]:hidden flex-row items-center gap-2 w-auto max-w-full relative">
              {portfolioSections.slice(0, visibleCount).map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  className={`px-3 py-2 rounded-md nav-link transition-colors duration-200 text-sm md:text-base cursor-pointer whitespace-nowrap flex items-center gap-2
                  ${
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
              {visibleCount < portfolioSections.length && (
                <div className="relative">
                  <button
                    className={`px-3 py-2 rounded-md flex text-sm md:text-base items-center transition-all duration-200 gap-2
                      ${
                        isActiveInDropdown
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 hover:bg-blue-100 hover:cursor-pointer"
                      }
                    `}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <FaBars />
                    More
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-[52px] right-0 bg-white rounded shadow-lg flex flex-col gap-2 p-2 z-50 min-w-[180px]">
                      {portfolioSections.slice(visibleCount).map((sec) => (
                        <button
                          key={sec.id}
                          type="button"
                          className={`p-3 rounded-md nav-link transition-colors duration-200 text-sm cursor-pointer whitespace-nowrap flex items-center gap-2
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
      {activeNavbar === 3 && <></>}
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
