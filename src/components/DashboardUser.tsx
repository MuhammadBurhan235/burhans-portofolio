import { useState, useEffect } from "react";
import { FaBars, FaReact, FaSass } from "react-icons/fa";
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
    title: "Frontend Developer",
    description: [
      "Developed and customized front-end components of Moodle LMS to enhance user experience and engagement.",
      "Assisted in planning, coordination, and deployment of a Learning Management System (LMS) based on Moodle.",
      "Supported the integration of gamification features to improve learning engagement for school teachers and students.",
      "Collaborated with the academic team to deliver workshops and technical support to target users.",
      "Contributed to the socialization and technical implementation of Moodle in the school environment.",
    ],
    images: ["Mug", "Baju1", "Mug", "Baju1"],
    location: "Telkom University - Al Lathif Islamic School",
    date: "Nov 2024 - Jan 2025",
    skills: [
      "sass",
      "php",
      "mysql",
      "frontend-development",
      "lean-ux",
      "agile",
    ],
    output: [
      {
        url: "https://lms.allathif-islamicschool.id/",
        label: "https://lms.allathif-islamicschool.id/",
      },
      {
        url: "https://www.linkedin.com/in/muhammad-burhan-5835841b0/overlay/experience/2617095532/multiple-media-viewer/?profileId=ACoAADE04jMBmvs0Puvg4otlnQL3sC4rkjFgxVo&treasuryMediaId=1756189505012",
        label: "HKI Certificate",
      },
      {
        url: "https://www.linkedin.com/in/muhammad-burhan-5835841b0/details/experience/2617095532/multiple-media-viewer/?profileId=ACoAADE04jMBmvs0Puvg4otlnQL3sC4rkjFgxVo&treasuryMediaId=1744482492759",
        label: "Community Service Certificate",
      },
    ],
  },
  {
    title: "Frontend Developer",
    description: [
      "Using the Lean UX Method, the development process was conducted without prototypes or initial designs in Figma. Feedback from lecturers was directly applied by modifying the code on the Moodle platform, which was already hosted on Hostinger.",
      "LMS interface customization, including color adjustments, layout modifications, and other visual design elements to meet institutional branding and accessibility needs.",
    ],
    images: ["Mug", "Baju1", "Mug", "Baju1"],
    location: "Telkom University",
    date: "Jun 2024 - Aug 2024",
    skills: [
      "sass",
      "php",
      "mysql",
      "frontend-development",
      "lean-ux",
      "agile",
    ],
    output: [
      {
        url: "https://lms.mynextskill.com/",
        label: "https://lms.mynextskill.com/",
      },
    ],
  },
];

const projectExperiences = [
  {
    title: "Frontend Developer",
    description: [
      "Developed and customized front-end components of Moodle LMS to enhance user experience and engagement.",
      "Assisted in planning, coordination, and deployment of a Learning Management System (LMS) based on Moodle.",
      "Supported the integration of gamification features to improve learning engagement for school teachers and students.",
      "Collaborated with the academic team to deliver workshops and technical support to target users.",
      "Contributed to the socialization and technical implementation of Moodle in the school environment.",
    ],
    images: ["Mug", "Baju1", "Mug", "Baju1"],
    location: "Telkom University - Al Lathif Islamic School",
    date: "Nov 2024 - Jan 2025",
    skills: [
      "sass",
      "php",
      "mysql",
      "frontend-development",
      "lean-ux",
      "agile",
    ],
    output: [
      {
        url: "https://lms.allathif-islamicschool.id/",
        label: "https://lms.allathif-islamicschool.id/",
      },
      {
        url: "https://www.linkedin.com/in/muhammad-burhan-5835841b0/overlay/experience/2617095532/multiple-media-viewer/?profileId=ACoAADE04jMBmvs0Puvg4otlnQL3sC4rkjFgxVo&treasuryMediaId=1756189505012",
        label: "HKI Certificate",
      },
      {
        url: "https://www.linkedin.com/in/muhammad-burhan-5835841b0/details/experience/2617095532/multiple-media-viewer/?profileId=ACoAADE04jMBmvs0Puvg4otlnQL3sC4rkjFgxVo&treasuryMediaId=1744482492759",
        label: "Community Service Certificate",
      },
    ],
  },
  {
    title: "Frontend Developer",
    description: [
      "Using the Lean UX Method, the development process was conducted without prototypes or initial designs in Figma. Feedback from lecturers was directly applied by modifying the code on the Moodle platform, which was already hosted on Hostinger.",
      "LMS interface customization, including color adjustments, layout modifications, and other visual design elements to meet institutional branding and accessibility needs.",
    ],
    images: ["Mug", "Baju1", "Mug", "Baju1"],
    location: "Telkom University",
    date: "Jun 2024 - Aug 2024",
    skills: [
      "sass",
      "php",
      "mysql",
      "frontend-development",
      "lean-ux",
      "agile",
    ],
    output: [
      {
        url: "https://lms.mynextskill.com/",
        label: "https://lms.mynextskill.com/",
      },
    ],
  },
];

const orgExperiences = [
  {
    title: "Broadcaster",
    images: [],
    location: "Lembaga Dakwah Kampus Al Fath Telkom University",
    date: "Jan 2024 - Jan 2025",
    skills: ["teamwork", "public-broadcasting", "broadcast-media"],
    output: [
      {
        url: "https://www.linkedin.com/in/muhammad-burhan-5835841b0/details/experience/1745245873398/single-media-viewer/?profileId=ACoAADE04jMBmvs0Puvg4otlnQL3sC4rkjFgxVo",
        label: "LDK Al Fath Gen11th Certificate",
      },
    ],
  },
  {
    title: "Head of Public Relations Division",
    images: [],
    description: "Muslim Youth Sessions 2024",
    location: "Lembaga Dakwah Kampus Al Fath Telkom University",
    date: "Apr 2024 - May 2024",
    skills: ["lead", "teamwork", "public-broadcasting", "broadcast-media"],
    output: [
      {
        url: "https://www.linkedin.com/in/muhammad-burhan-5835841b0/details/experience/1745245873398/single-media-viewer/?profileId=ACoAADE04jMBmvs0Puvg4otlnQL3sC4rkjFgxVo",
        label: "LDK Al Fath Gen11th Certificate",
      },
    ],
  },
  {
    title: "Volunteer",
    images: [],
    location: "Lembaga Dakwah Kampus Al Fath Telkom University",
    date: "Aug 2022 - Apr 2024",
    skills: ["teamwork"],
  },
  {
    title: "Secretary of Data Collection Division",
    images: [],
    description: "New Student Admission Committee - Islamic, 2023",
    location: "Lembaga Dakwah Kampus Al Fath Telkom University",
    date: "Aug 2023 - Sep 2023",
    skills: ["lead", "teamwork"],
    output: [
      {
        url: "https://www.linkedin.com/in/muhammad-burhan-5835841b0/details/experience/1745246323985/single-media-viewer/?profileId=ACoAADE04jMBmvs0Puvg4otlnQL3sC4rkjFgxVo",
        label: "Certificate of Contribution",
      },
    ],
  },
];

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
  const [sliceCount, setSliceCount] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 368) {
        setSliceCount(3);
      } else if (window.innerWidth <= 768) {
        setSliceCount(4);
      } else if (window.innerWidth <= 1000) {
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
              <div className="flex flex-row items-center gap-2 mt-2">
                {/* preview images */}
                {images.slice(0, sliceCount).map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={imagess[img]}
                    className="w-14 h-9 shadow-[0_3px_6px_rgba(8,74,131,0.5)] md:w-20 md:h-14 lg:w-18 lg:h-16 object-cover rounded border border-gray-200 cursor-pointer transition-all duration-300"
                    alt=""
                    onClick={() => setImgIdx(idx)}
                  />
                ))}

                {/* tombol lihat selengkapnya */}
                <button
                  className="w-14 h-9 shadow-[0_3px_6px_rgba(8,74,131,0.5)] md:w-20 md:h-14 lg:w-18 lg:h-16 bg-blue-500 text-white rounded flex items-center justify-center text-base"
                  onClick={() =>
                    alert("Tampilkan semua gambar (implementasi modal di sini)")
                  }
                  style={{ minWidth: "36px", minHeight: "36px" }}
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

        {/* section project experience */}
        <div
          id="project-experience"
          className="w-full scroll-mt-24 min-w-[288px] max-w-[1148px] px-4 py-8 pr-0 rounded-4xl flex flex-col gap-8 items-center shadow-[-4px_-3px_6px_rgba(8,74,131,0.12),-4px_3px_6px_rgba(8,74,131,0.12)]"
        >
          <h2 className="w-full font-bold text-lg md:text-xl lg:text-2xl mb-2 px-4">
            Project Experience
          </h2>
          {projectExperiences.map((exp, idx) => (
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
