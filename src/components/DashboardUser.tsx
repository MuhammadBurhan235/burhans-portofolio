import { useState, useEffect } from "react";
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
import Navbar from "./Navbar";
import { imagess } from "../Image";
import {
  eduExperiences,
  workExperiences,
  projectExperiences,
  orgExperiences,
} from "./ExperienceData";

interface OutputItem {
  url: string;
  label?: string;
}

function ExperienceItem({
  title,
  description,
  images,
  location,
  date,
  output: output = [] as OutputItem[],
  skills = [],
}: any) {
  const [imgIdx, setImgIdx] = useState(0);
  const [sliceCount, setSliceCount] = useState(3);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSliceCount(3); // md: max 3
      } else if (window.innerWidth <= 1024) {
        setSliceCount(4); // lg: max 4
      } else {
        setSliceCount(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
    <div className="bg-gray-50 rounded-xl p-4 pb-8 w-full flex flex-col gap-3 shadow-[0_-3px_4px_rgba(8,74,131,0.08),0_3px_6px_rgba(8,74,131,0.12)]">
      <h3
        className="relative w-fit font-bold text-sm md:text-base lg:text-lg ml-[-56px] px-[24px] py-[12px] pl-14 
             bg-blue-100 rounded-4xl shadow-[0_-3px_4px_rgba(8,74,131,0.5),0_3px_6px_rgba(8,74,131,0.5)]
             before:content-[''] before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 
             before:w-4 before:h-4 before:rounded-full before:bg-blue-500"
      >
        {title}
      </h3>
      <div className="flex flex-col md:flex-row gap-4w-full bg-amber-0">
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
              {description.map((line, idx) => (
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
                  {(() => {
                    const skillIcons = [
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
                        icon: (
                          <SiTypescript className="text-blue-700 text-2xl" />
                        ),
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
                        icon: (
                          <SiBootstrap className="text-purple-700 text-2xl" />
                        ),
                        label: "Bootstrap",
                      },
                      {
                        key: "tailwindcss",
                        icon: (
                          <SiTailwindcss className="text-cyan-500 text-2xl" />
                        ),
                        label: "Tailwind CSS",
                      },
                    ].filter((item) => skills.includes(item.key));

                    if (skillIcons.length === 0) return null;

                    return (
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
                    );
                  })()}
                  {/* Skill Text Labels for non-icon skills */}
                  {(() => {
                    const skillTextLabels = [
                      {
                        key: "frontend-development",
                        label: "Frontend Development",
                      },
                      { key: "lean-ux", label: "Lean UX" },
                      { key: "ui-design", label: "UI Design" },
                      { key: "agile", label: "Agile" },
                      { key: "scrum", label: "Scrum" },
                      { key: "science", label: "Science" },
                      { key: "math", label: "Mathematics" },
                      { key: "lead", label: "Leadership" },
                      {
                        key: "public-broadcasting",
                        label: "Public Broadcasting",
                      },
                      { key: "broadcast-media", label: "Broadcast Media" },
                      { key: "teamwork", label: "Teamwork" },
                      { key: "SofCons", label: "Software Construction" },
                      { key: "VerCont", label: "Version Control" },
                      { key: "SofArch", label: "Software Architecture" },
                    ].filter((item) => skills.includes(item.key));

                    if (skillTextLabels.length === 0) return null;

                    return (
                      <span className="w-fit max-[485px]:w-full font-medium text-xs text-center md:text-sm px-4 py-1 bg-blue-100 rounded-4xl whitespace-normal">
                        {skillTextLabels.map((item, idx) => (
                          <span key={item.key}>
                            {item.label}
                            {idx < skillTextLabels.length - 1 && ", "}
                          </span>
                        ))}
                      </span>
                    );
                  })()}
                </div>
              </div>
            )}

            {output.length > 0 && (
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-xs md:text-sm font-bold">
                  Output - Just Click It!
                </span>
                <div className="flex flex-wrap gap-3 text-center md:gap-2">
                  {output.map((item: OutputItem, idx: string) => (
                    <a
                      key={idx}
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
              alt=""
              onClick={handleOpenModal}
            />
            {/* Preview images & tombol hanya jika > 1 gambar */}
            {images.length > 1 && (
              <div className="flex flex-row flex-nowrap items-center gap-2 ">
                {images.slice(0, sliceCount).map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={imagess[img]}
                    className="w-10 h-7 sm:w-12 sm:h-8 md:w-10 md:h-7 lg:w-12 lg:h-8 object-cover rounded border border-gray-200 cursor-pointer transition-all duration-300 shadow-[0_3px_6px_rgba(8,74,131,0.5)]"
                    alt=""
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
                >
                  {/* Header */}
                  <div className="flex justify-between items-center px-6 py-4 border-b">
                    <span className="font-bold text-lg">Media</span>
                    <button
                      className="text-gray-600 hover:text-blue-600 text-2xl cursor-pointer"
                      onClick={handleCloseModal}
                      title="Tutup"
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
                        alt=""
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
                        onClick={() => setImgIdx((idx) => Math.max(0, idx - 1))}
                        disabled={imgIdx === 0}
                      >
                        Previous
                      </button>
                      <button
                        className="px-4 py-2 rounded bg-white border text-blue-700 hover:bg-blue-100 cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                        onClick={() =>
                          setImgIdx((idx) =>
                            Math.min(images.length - 1, idx + 1)
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
  );
}

function DashboardUser() {
  const [activeNavbar, setActiveNavbar] = useState(1);

  return (
    <div className="w-full h-fit bg-[linear-gradient(to_bottom,#084a83_0%,#ECF0F5_16%)] flex flex-col items-center">
      {/*Navbar*/}
      <Navbar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />

      {/*Content Area*/}
      <div className="w-full min-w-[320px] px-8 py-16 bg-transparent flex flex-col items-center gap-4 ">
        {/* section about burhan */}
        <div
          id="about-burhan"
          className="w-full scroll-mt-24 min-w-[288px] max-w-[1148px] px-2 md:px-4 py-8 md:py-16 rounded-b-4xl flex flex-col gap-8 items-center"
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
                        href="https://drive.google.com/file/d/1NmYW_UoLKVmBdsHAI_TMM73Ck-QIJYDI/view?usp=sharing"
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
                      className="text-gray-800 hover:text-blue-700 hover:bg-white rounded transition-colors "
                      title="LinkedIn"
                    >
                      <FaLinkedin className="text-2xl md:text-3xl" />
                    </a>
                    <a
                      href="https://github.com/MuhammadBurhan235/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-black hover:bg-white rounded-[16px] transition-colors"
                      title="GitHub"
                    >
                      <FaGithub className="text-2xl md:text-3xl" />
                    </a>
                    <a
                      href="https://www.instagram.com/muhammadburhan_253/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-pink-600 hover:bg-white rounded-[8px] transition-colors"
                      title="Instagram"
                    >
                      <FaInstagram className="text-2xl md:text-3xl" />
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1NmYW_UoLKVmBdsHAI_TMM73Ck-QIJYDI/view?usp=sharing" // Ganti dengan link CV kamu
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-green-700 hover:bg-white  transition-colors "
                      title="Download CV"
                    >
                      <FaFileAlt className="text-2xl md:text-3xl" />
                    </a>
                  </div>
                </div>
                {/* Responsive Description */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-[0_3px_6px_rgba(8,74,131,0.5)] mt-2 md:ml-[-70px] md:pl-18">
                  <p className="text-xs sm:text-sm md:text-base text-center">
                    I am a Bachelor’s graduate in Software Engineering from
                    Telkom University (2025) with a strong passion for Frontend
                    Development and UI/UX Design with Agile/Lean UX Method. I
                    have experience designing and building responsive,
                    user-focused web interfaces through internships,
                    professional work, and various projects with several
                    clients. My approach emphasizes rapid iteration, validating
                    designs through user feedback, and cross-functional
                    collaboration to deliver digital solutions that are both
                    functional and provide an optimal user experience. I am
                    enthusiastic about tackling new challenges in digital
                    product development and committed to continuously learning
                    and adapting to user needs and industry trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section education*/}
        <div
          id="edu-experience"
          className="w-full scroll-mt-24 mb-8 min-w-[288px] max-w-[1148px] px-4 py-8 pr-0 rounded-4xl flex flex-col gap-8 items-center shadow-[-4px_-3px_6px_rgba(8,74,131,0.12),-4px_3px_6px_rgba(8,74,131,0.12)]"
        >
          <h2 className="w-full font-bold text-lg md:text-xl lg:text-2xl mb-2 px-4 flex items-center gap-3">
            <FaGraduationCap className="text-blue-700" />
            Education
          </h2>
          {eduExperiences.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>

        {/* section work experience */}
        <div
          id="work-experience"
          className="w-full scroll-mt-24 mb-8 min-w-[288px] max-w-[1148px] px-4 py-8 pr-0 rounded-4xl flex flex-col gap-8 items-center shadow-[-4px_-3px_6px_rgba(8,74,131,0.12),-4px_3px_6px_rgba(8,74,131,0.12)]"
        >
          <h2 className="w-full font-bold text-lg md:text-xl lg:text-2xl mb-2 px-4 flex items-center gap-3">
            <FaBriefcase className="text-blue-700" />
            Work Experience
          </h2>
          {workExperiences.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>

        {/* section project experience */}
        <div
          id="project-experience"
          className="w-full scroll-mt-24 mb-8 min-w-[288px] max-w-[1148px] px-4 py-8 pr-0 rounded-4xl flex flex-col gap-8 items-center shadow-[-4px_-3px_6px_rgba(8,74,131,0.12),-4px_3px_6px_rgba(8,74,131,0.12)]"
        >
          <h2 className="w-full font-bold text-lg md:text-xl lg:text-2xl mb-2 px-4 flex items-center gap-3">
            <FaFolderOpen className="text-blue-700" />
            Project Experience
          </h2>
          {projectExperiences.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>

        {/* section organization and volunteer experience */}
        <div
          id="org-experience"
          className="w-full scroll-mt-24 mb-8 min-w-[288px] max-w-[1148px] px-4 py-8 pr-0 rounded-4xl flex flex-col gap-8 items-center shadow-[-4px_-3px_6px_rgba(8,74,131,0.12),-4px_3px_6px_rgba(8,74,131,0.12)]"
        >
          <h2 className="w-full font-bold text-lg md:text-xl lg:text-2xl mb-2 px-4 flex items-center gap-3">
            <FaUsers className="text-blue-700" />
            Organization Experience
          </h2>
          {orgExperiences.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
