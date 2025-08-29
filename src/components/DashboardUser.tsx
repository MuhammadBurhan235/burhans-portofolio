import { useState } from "react";

import Navbar from "./Navbar";

const aboutBurhan = [
  {
    title: "Frontend Developer - PT. Teknologi Maju",
    description:
      "Mengembangkan aplikasi web menggunakan React dan Tailwind CSS.",
    images: [
      "https://via.placeholder.com/120x80?text=Work1",
      "https://via.placeholder.com/120x80?text=Work2",
    ],
    buttonLabel: "Detail",
  },
  {
    title: "UI/UX Designer - Kreatif Studio",
    description: "Mendesain antarmuka aplikasi mobile dan website.",
    images: [
      "https://via.placeholder.com/120x80?text=Design1",
      "https://via.placeholder.com/120x80?text=Design2",
    ],
    buttonLabel: "Detail",
  },
];

const workExperiences = [
  {
    title: "Frontend Developer - PT. Teknologi Maju",
    description: [
      "- Membantu perencanaan, koordinasi, dan penerapan Sistem Manajemen Pembelajaran (LMS) berbasis Moodle.",
      "- Mendukung integrasi fitur gamifikasi untuk meningkatkan keterlibatan belajar bagi guru dan siswa.",
      "- Bekerja sama dengan tim akademik untuk memberikan lokakarya dan dukungan teknis kepada pengguna sasaran.",
      "- Berkontribusi pada sosialisasi dan implementasi teknis Moodle di lingkungan sekolah.",
    ],
    images: [
      "https://via.placeholder.com/120x80?text=Work1",
      "https://via.placeholder.com/120x80?text=Work2",
    ],
    buttonLabel: "Detail",
  },
  {
    title: "UI/UX Designer - Kreatif Studio",
    description: "Mendesain antarmuka aplikasi mobile dan website.",
    images: [
      "https://via.placeholder.com/120x80?text=Design1",
      "https://via.placeholder.com/120x80?text=Design2",
    ],
    buttonLabel: "Detail",
  },
];

const orgExperiences = [
  {
    title: "Ketua Himpunan Mahasiswa Informatika",
    description:
      "Memimpin organisasi mahasiswa dan mengelola berbagai kegiatan.",
    images: [
      "https://via.placeholder.com/120x80?text=Org1",
      "https://via.placeholder.com/120x80?text=Org2",
    ],
    buttonLabel: "Detail",
  },
  {
    title: "Anggota BEM",
    description: "Berpartisipasi dalam program kerja BEM Universitas.",
    images: [
      "https://via.placeholder.com/120x80?text=BEM1",
      "https://via.placeholder.com/120x80?text=BEM2",
    ],
    buttonLabel: "Detail",
  },
];

function ExperienceItem({ title, description, images, buttonLabel }: any) {
  const [imgIdx, setImgIdx] = useState(0);

  const nextImg = () => setImgIdx((idx) => (idx + 1) % images.length);
  const prevImg = () =>
    setImgIdx((idx) => (idx - 1 + images.length) % images.length);

  return (
    <div className="bg-gray-50 rounded-xl p-4 w-full flex flex-col gap-3 shadow-[0_-3px_4px_rgba(8,74,131,0.08),0_3px_6px_rgba(8,74,131,0.12)]">
      <h3 className="w-fit font-bold text-base md:text-lg lg:text-xl ml-[-56px] px-[24px] py-[12px] pl-14 bg-blue-100 rounded-4xl shadow-[0_-3px_4px_rgba(8,74,131,0.5),0_3px_6px_rgba(8,74,131,0.5)]">
        {title}
      </h3>
      {/* Jika description array, map per baris */}
      <div className="text-sm md:text-base lg:text-lg flex flex-col gap-1">
        {Array.isArray(description) ? (
          description.map((line, idx) => <p key={idx}>{line}</p>)
        ) : (
          <p>{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={prevImg}
          className="px-2 py-1 bg-blue-100 rounded text-xs md:text-sm"
        >
          Prev
        </button>
        <img
          src={images[imgIdx]}
          alt={title}
          className="w-[120px] h-[80px] object-cover rounded"
        />
        <button
          onClick={nextImg}
          className="px-2 py-1 bg-blue-100 rounded text-xs md:text-sm"
        >
          Next
        </button>
      </div>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded text-sm md:text-base">
        {buttonLabel}
      </button>
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
          className="w-full scroll-mt-24 min-w-[288px] max-w-[1148px] px-4 py-8 rounded-4xl flex flex-col gap-8 items-center shadow-[-4px_-3px_6px_rgba(8,74,131,0.12),-4px_3px_6px_rgba(8,74,131,0.12)]"
        >
          <h2 className="w-full font-bold text-lg md:text-xl lg:text-2xl mb-2 px-4">
            Project Experience
          </h2>
          {orgExperiences.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>
        {/* section organizational and volunteer experience */}
        <div
          id="org-experience"
          className="w-full scroll-mt-24 min-w-[288px] max-w-[1148px] px-4 py-8 bg-white rounded-4xl flex flex-col gap-8 items-center shadow-[-4px_-3px_6px_rgba(8,74,131,0.12),-4px_3px_6px_rgba(8,74,131,0.12)]"
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
