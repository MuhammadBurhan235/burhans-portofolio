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
} from "react-icons/fa";
import { SiTypescript, SiPhp, SiMysql } from "react-icons/si";
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
            <ul>
              {description.map((line, idx) => (
                <li key={idx} className="flex items-start gap-2 mb-1 list-none">
                  <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                  <span className="text-justify">{line}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-justify">{description}</p>
          )}
          <div className="mt-4">
            {skills?.length > 0 && (
              <div className="flex flex-col gap-2 ">
                <span className="text-xs md:text-sm font-bold">
                  Skills Focus
                </span>
                <div className="flex flex-wrap gap-2 items-center">
                  {(skills.includes("sass") ||
                    skills.includes("react") ||
                    skills.includes("typescript") ||
                    skills.includes("php") ||
                    skills.includes("mysql")) && (
                    <span
                      className="w-fit max-[485px]:w-full font-medium text-xs flex flex-wrap justify-center gap-3 items-center md:text-sm px-4 py-2 bg-blue-100 rounded-4xl "
                      title={[
                        skills.includes("sass") && "Sass",
                        skills.includes("react") && "React.js",
                        skills.includes("typescript") && "TypeScript",
                        skills.includes("php") && "PHP",
                        skills.includes("mysql") && "MySQL",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    >
                      {skills.includes("sass") && (
                        <FaSass className="text-pink-500 text-2xl" />
                      )}
                      {skills.includes("react") && (
                        <FaReact className="text-blue-500 text-2xl" />
                      )}
                      {skills.includes("typescript") && (
                        <SiTypescript className="text-blue-700 text-2xl" />
                      )}
                      {skills.includes("php") && (
                        <SiPhp className="text-indigo-700 text-2xl" />
                      )}
                      {skills.includes("mysql") && (
                        <SiMysql className="text-yellow-700 text-2xl" />
                      )}
                    </span>
                  )}
                  <span className="w-fit max-[485px]:w-full font-medium text-xs text-center flex items-center justify-center md:text-sm px-4 py-1 bg-blue-100 rounded-4xl ">
                    {[
                      skills.includes("frontend-development") &&
                        "Frontend Development",
                      skills.includes("lean-ux") && "Lean UX",
                      skills.includes("ui-design") && "UI Design",
                      skills.includes("agile") && "Agile",
                      skills.includes("scrum") && "Scrum",
                      skills.includes("science") && "Science",
                      skills.includes("math") && "Mathematics",
                      skills.includes("lead") && "Leadership",
                      skills.includes("public-broadcasting") &&
                        "Public Broadcasting",
                      skills.includes("broadcast-media") && "Broadcast Media",
                      skills.includes("teamwork") && "Teamwork",
                    ]
                      .filter(Boolean) // buang false/null
                      .join(", ")}
                  </span>
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

        {images.length > 0 && (
          <div className="flex flex-col items-center w-full mt-4 md:w-1/3 gap-2">
            {/* Gambar utama */}
            <img
              src={imagess[images[imgIdx]]}
              className="w-full max-w-xs h-40 md:h-48 lg:h-56 object-cover rounded transition-all duration-300"
              alt=""
            />
            {images.length > 1 && (
              <div className="flex flex-row flex-nowrap items-center gap-2 ">
                {/* preview images */}
                {images.slice(0, sliceCount).map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={imagess[img]}
                    className="w-10 h-7 sm:w-12 sm:h-8 md:w-10 md:h-7 lg:w-12 lg:h-8 object-cover rounded border border-gray-200 cursor-pointer transition-all duration-300 shadow-[0_3px_6px_rgba(8,74,131,0.5)]"
                    alt=""
                    onClick={() => setImgIdx(idx)}
                  />
                ))}

                {/* tombol lihat selengkapnya */}
                <button
                  className="w-10 h-7 sm:w-12 sm:h-8 md:w-10 md:h-7 lg:w-12 lg:h-8 bg-blue-500 text-white rounded flex items-center justify-center text-base shadow-[0_3px_6px_rgba(8,74,131,0.5)]"
                  onClick={() =>
                    alert("Tampilkan semua gambar (implementasi modal di sini)")
                  }
                  style={{ minWidth: "28px", minHeight: "28px" }}
                >
                  <FaBars />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded text-sm md:text-base">
        {buttonLabel}
      </button> */}
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
              {/* Responsive Profile Image */}
              <div className="relative mx-auto flex items-center justify-center mb-2">
                <div className="border-4 border-white rounded-full bg-white shadow-[0_3px_6px_rgba(8,74,131,0.5)] overflow-visible flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
                  <img
                    src={
                      imagess["Profile"] ??
                      "https://avatars.githubusercontent.com/u/00000000?v=4"
                    }
                    alt="Muhammad Burhan"
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4
              w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64
              object-cover rounded-full shadow-xl"
                    style={{ zIndex: 2 }}
                  />
                </div>
              </div>
              <div className="w-full">
                {/* Responsive Name */}
                <div className="relative w-full font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl ml-0 md:ml-[-64px] flex flex-row justify-between items-center">
                  Muhammad Burhan{" "}
                  <div className="flex gap-3 ">
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
                  </div>
                </div>
                {/* Responsive Description */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-[0_3px_6px_rgba(8,74,131,0.5)] mt-2 md:ml-[-70px] md:pl-18">
                  <p className="text-xs sm:text-sm md:text-base text-justify">
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
