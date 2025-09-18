import { useState, useEffect, useRef } from "react";
import {
  FaBars, // Tambahkan ikon burger
  FaTimes, // Tambahkan ikon close
} from "react-icons/fa";
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaFolderOpen,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-scroll";

interface NavbarProps {
  activeNavbar: number;
  setActiveNavbar: (nav: number) => void;
}

const portfolioSections = [
  { id: "about-burhan", label: "About Burhan", icon: <FaUser /> },
  { id: "edu-experience", label: "Education", icon: <FaGraduationCap /> },
  { id: "work-experience", label: "Work", icon: <FaBriefcase /> },
  { id: "project-experience", label: "Projects", icon: <FaFolderOpen /> },
  { id: "org-experience", label: "Organization", icon: <FaUsers /> },
];

function Navbar({ activeNavbar, setActiveNavbar }: NavbarProps) {
  // const [showNavbar, setShowNavbar] = useState(true);
  // const [isTop, setIsTop] = useState(true);
  const lastScrollY = useRef(0);
  // const [activeStatus, setActiveStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about-burhan");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Hitung berapa tombol yang muat berdasarkan lebar window
  const [visibleCount, setVisibleCount] = useState(portfolioSections.length);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 700) setVisibleCount(2);
      else if (width < 800) setVisibleCount(3);
      else if (width < 900) setVisibleCount(4);
      else setVisibleCount(portfolioSections.length);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll spy untuk mendeteksi section aktif
  useEffect(() => {
    const handleScroll = () => {
      // Perkecil area deteksi, misal gunakan window.scrollY + 100
      const scrollPos = window.scrollY + 300;
      for (const sec of portfolioSections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActive(sec.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      {" "}
      {activeNavbar === 1 && (
        <div
          className={`fixed w-full h-[64px] bg-[#084a83]/30 flex justify-center transition-all duration-300 backdrop-blur-[5px] shadow-lg z-50`}
        >
          <div className="w-full min-w-[320px] max-w-[1140px] h-full px-4 bg-transparent flex flex-row justify-between items-center gap-4">
            <a
              href="#"
              className="w-full min-w-[160px] max-w-[320px] h-[48px] bg-gray-900 rounded-[16px] cursor-pointer"
            ></a>
            {/* Burger menu untuk mobile */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Open menu"
                className="flex items-center gap-2 w-fit bg-blue-600 p-3 rounded-[8px] hover:bg-white transition-all duration-300 group"
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
                <div className="absolute top-[64px] right-4 bg-white rounded shadow-lg flex flex-col gap-2 p-4 z-50 min-w-[180px]">
                  {portfolioSections.map((sec) => (
                    <Link
                      key={sec.id}
                      to={sec.id}
                      spy={true}
                      smooth={true}
                      offset={-64} // sesuaikan dengan tinggi navbar
                      duration={500}
                      className={`px-3 py-2 rounded-md mx-3 nav-link transition-colors duration-200 text-xs text-left cursor-pointer ${
                        active === sec.id
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 hover:bg-blue-100"
                      }`}
                      onClick={() => {
                        setActive(sec.id);
                        setMenuOpen(false);
                        // HAPUS: scrollIntoView
                      }}
                    >
                      {sec.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tombol scroll section untuk desktop */}
            <div className="hidden md:flex flex-row items-center gap-2 w-auto max-w-full relative">
              {portfolioSections.slice(0, visibleCount).map((sec) => (
                <Link
                  key={sec.id}
                  to={sec.id}
                  spy={true}
                  smooth={true}
                  offset={-64}
                  duration={500}
                  className={`px-3 py-2 rounded-md nav-link transition-colors duration-200
      text-sm md:text-base cursor-pointer whitespace-nowrap flex items-center gap-2
      ${
        active === sec.id
          ? "bg-blue-600 text-white"
          : "bg-white text-blue-600 hover:bg-blue-100"
      }`}
                  onClick={() => {
                    setActive(sec.id);
                    setMenuOpen(false);
                  }}
                >
                  <span className="text-base">{sec.icon}</span>
                  {sec.label}
                </Link>
              ))}
              {visibleCount < portfolioSections.length && (
                <div className="relative">
                  <button
                    className={`px-3 py-2 rounded-md flex items-center transition-all duration-200
                      ${
                        isActiveInDropdown
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600"
                      }
                    `}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <FaBars />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full right-0 bg-white rounded shadow-lg flex flex-col gap-2 p-2 z-50 min-w-[180px]">
                      {portfolioSections.slice(visibleCount).map((sec) => (
                        <Link
                          key={sec.id}
                          to={sec.id}
                          spy={true}
                          smooth={true}
                          offset={-64}
                          duration={500}
                          className={`px-3 py-2 rounded-md nav-link transition-colors duration-200 text-sm cursor-pointer whitespace-nowrap flex items-center gap-2
                  ${
                    active === sec.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 hover:bg-blue-100"
                  }`}
                          onClick={() => {
                            setActive(sec.id);
                            setDropdownOpen(false);
                          }}
                        >
                          <span className="text-base">{sec.icon}</span>
                          {sec.label}
                        </Link>
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
              onClick={() => setActiveNavbar(1)}
            >
              Nav1
            </button>
            <button
              className="w-fit h-full flex items-center bg-green-500 px-4 py-2"
              onClick={() => setActiveNavbar(2)}
            >
              Nav2
            </button>
            <button
              className="w-fit h-full flex items-center bg-blue-500 px-4 py-2"
              onClick={() => setActiveNavbar(3)}
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
    </>
  );
}

export default Navbar;
