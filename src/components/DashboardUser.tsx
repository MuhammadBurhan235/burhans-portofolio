import { useState, useEffect } from "react";
import { FaBars, FaReact } from "react-icons/fa";
import { SiTypescript, SiPhp, SiMysql } from "react-icons/si";
import Navbar from "./Navbar";
import { imagess } from "../Image";
const aboutBurhan = [
  {
    title: "Frontend Developer - PT. Teknologi Maju",
    description:
      "Mengembangkan aplikasi web menggunakan React dan Tailwind CSS.",
    images: ["Mug", "Mug"],
    skills: [],
  },
  {
    title: "UI/UX Designer - Kreatif Studio",
    description: "Mendesain antarmuka aplikasi mobile dan website.",
    images: ["Mug", "Mug"],
    skills: [],
  },
];

const workExperiences = [
  {
    title: "Frontend Developer - PT. Teknologi Maju",
    description: [
      "Membantu perencanaan, koordinasi, dan penerapan Sistem Manajemen Pembelajaran (LMS) berbasis Moodle.",
      "Mendukung integrasi fitur gamifikasi untuk meningkatkan keterlibatan belajar bagi guru dan siswa.",
    ],
    images: ["Mug", "Baju1"],
    location: "Telkom University",
    date: "Juni - Agustus 2024",
    skills: ["react", "typescript", "php", "mysql", "lean-ux"],
    output: "https://lms.allathif-islamicschool.id/",
  },
  {
    title: "UI/UX Designer - Kreatif Studio",
    description: "Mendesain antarmuka aplikasi mobile dan website.",
    images: ["Mug", "Mug"],
    skills: [],
  },
];

const orgExperiences = [
  {
    title: "Ketua Himpunan Mahasiswa Informatika",
    description:
      "Memimpin organisasi mahasiswa dan mengelola berbagai kegiatan.",
    images: ["Mug", "Mug"],
    buttonLabel: "Detail",
  },
  {
    title: "Anggota BEM",
    description: "Berpartisipasi dalam program kerja BEM Universitas.",
    images: ["Mug", "Mug"],
    buttonLabel: "Detail",
  },
];

function ExperienceItem({
  title,
  description,
  images,
  skills = [],
  location,
  date,
  output,
}: any) {
  const [imgIdx, setImgIdx] = useState(0);
  const [sliceCount, setSliceCount] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 320) {
        setSliceCount(3);
      } else if (window.innerWidth <= 425) {
        setSliceCount(4);
      } else if (window.innerWidth <= 768) {
        setSliceCount(2);
      } else {
        setSliceCount(3);
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
        <div className="text-[12px] p-4 pt-0 md:text-sm lg:text-base flex flex-col gap-1 w-full md:w-2/3 bg-red-0">
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
          {skills?.length > 0 && (
            <div className="flex flex-col gap-2 ">
              <span className="text-xs md:text-sm font-bold">Skills Focus</span>
              <div className="flex flex-wrap gap-2 items-center">
                <span
                  className="w-fit font-medium text-xs flex flex-row gap-3 items-center md:text-sm px-4 py-2 bg-blue-100 rounded-4xl shadow-[0_-3px_4px_rgba(8,74,131,0.5),0_3px_6px_rgba(8,74,131,0.5)]"
                  title={[
                    skills.includes("react") && "React.js",
                    skills.includes("typescript") && "TypeScript",
                    skills.includes("php") && "PHP",
                    skills.includes("mysql") && "MySQL",
                  ]
                    .filter(Boolean)
                    .join(", ")}
                >
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

                {skills.includes("lean-ux") && (
                  <span className="w-fit font-medium text-xs md:text-sm px-4 py-1 bg-blue-100 rounded-4xl shadow-[0_-3px_4px_rgba(8,74,131,0.5),0_3px_6px_rgba(8,74,131,0.5)]">
                    Lean UX
                  </span>
                )}
              </div>
            </div>
          )}
          {output && (
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-xs md:text-sm font-bold">
                Output - Just Click!
              </span>

              <a
                href="https://lms.allathif-islamicschool.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit max-[425px]:w-full font-medium text-xs md:text-sm px-4 py-1 bg-blue-100 rounded-4xl shadow-[0_-3px_4px_rgba(8,74,131,0.5),0_3px_6px_rgba(8,74,131,0.5)] hover:bg-blue-200 transition"
              >
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
                  {output}
                </span>
              </a>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center w-full md:w-1/3 gap-2">
          {/* Gambar utama */}
          <img
            src={imagess[images[imgIdx]]}
            className="w-full max-w-xs h-40 md:h-48 lg:h-56 object-cover rounded transition-all duration-300"
            alt=""
          />
          {/* Baris preview dan tombol */}
          <div className="flex flex-row items-center gap-2 mt-2">
            {/* preview images */}
            {images.slice(0, sliceCount).map((img: string, idx: number) => (
              <img
                key={idx}
                src={imagess[img]}
                className="w-14 h-9 md:w-20 md:h-14 lg:w-18 lg:h-16 object-cover rounded border border-gray-200 cursor-pointer transition-all duration-300"
                alt=""
                onClick={() => setImgIdx(idx)}
              />
            ))}
            {/* tombol lihat selengkapnya */}
            <button
              className="w-14 h-9 md:w-20 md:h-14 lg:w-18 lg:h-16 bg-blue-500 text-white rounded flex items-center justify-center text-base"
              onClick={() =>
                alert("Tampilkan semua gambar (implementasi modal di sini)")
              }
              style={{ minWidth: "36px", minHeight: "36px" }}
            >
              <FaBars />
            </button>
          </div>
        </div>
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
      <div className="w-full min-w-[320px] px-8 py-16 bg-transparent flex flex-col items-center gap-12 ">
        {/* section about burhan */}
        <div
          id="about-burhan"
          className="w-full scroll-mt-24 min-w-[288px] max-w-[1148px] px-4 py-8 rounded-b-4xl flex flex-col gap-8 items-center"
        >
          <h2 className="w-full font-bold text-lg md:text-xl lg:text-2xl mb-2 px-4">
            About Burhan
          </h2>
          {aboutBurhan.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>

        {/* section project experience */}
        <div
          id="project-experience"
          className="w-full scroll-mt-24 min-w-[288px] max-w-[1148px] px-4 py-8 pr-0 rounded-4xl flex flex-col gap-8 items-center shadow-[-4px_-3px_6px_rgba(8,74,131,0.12),-4px_3px_6px_rgba(8,74,131,0.12)]"
        >
          <h2 className="w-full font-bold text-lg md:text-xl lg:text-2xl mb-2 px-4">
            Project Experience
          </h2>
          {orgExperiences.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>

        {/* section work experience */}
        <div
          id="work-experience"
          className="w-full scroll-mt-24 min-w-[288px] max-w-[1148px] px-4 py-8 pr-0 rounded-4xl flex flex-col gap-8 items-center shadow-[-4px_-3px_6px_rgba(8,74,131,0.12),-4px_3px_6px_rgba(8,74,131,0.12)]"
        >
          <h2 className="w-full font-bold text-lg md:text-xl lg:text-2xl mb-2 px-4">
            Work Experience
          </h2>
          {workExperiences.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>
        {/* section organizational and volunteer experience */}
        <div
          id="org-experience"
          className="w-full scroll-mt-24 min-w-[288px] max-w-[1148px] px-4 py-8 pr-0 rounded-4xl flex flex-col gap-8 items-center shadow-[-4px_-3px_6px_rgba(8,74,131,0.12),-4px_3px_6px_rgba(8,74,131,0.12)]"
        >
          <h2 className="w-full font-bold text-lg md:text-xl lg:text-2xl mb-2 px-4">
            Organizational Experience
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
