import { useState, useEffect, useRef } from "react";

import { MdClose } from "react-icons/md";

import { images } from "../Image";

function Landing() {
  const [isTop, setIsTop] = useState(true);
  const lastScrollY = useRef(0);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const weeklyData = [
    { day: "Sen", laki: 10, perempuan: 8 },
    { day: "Sel", laki: 15, perempuan: 12 },
    { day: "Rab", laki: 12, perempuan: 14 },
    { day: "Kam", laki: 20, perempuan: 18 },
    { day: "Jum", laki: 18, perempuan: 16 },
    { day: "Sab", laki: 22, perempuan: 20 },
    { day: "Min", laki: 17, perempuan: 15 },
  ];

  // Cari max total per hari untuk skala chart
  const maxTotal = Math.max(...weeklyData.map((d) => d.laki + d.perempuan));

  useEffect(() => {
    if (modalContent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalContent]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          setIsTop(currentScrollY <= 10);
          lastScrollY.current = currentScrollY;

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const content = (
    <>
      <div className="w-[96px] h-[48px] bg-white rounded-[16px] font-bebas text-black font-medium items-center justify-center flex">
        Logo
      </div>
      <h1 className="text-2xl font-bebas text-white font-medium text-center whitespace-nowrap">
        Grand Opening | Minggu, 8 Juni 2025! Suzuka, Dekat Stasiun Tsuzumigaura
        dan shiroko Stasiun
      </h1>
      <div className="w-[96px] h-[48px] bg-white rounded-[16px] font-bebas text-black font-medium items-center justify-center flex">
        Logo
      </div>
    </>
  );

  const content2 = (
    <>
      <div className="w-[80px] h-[32px] bg-[#E4CDA4] rounded-[16px] font-bebas text-white font-medium items-center justify-center flex">
        Logo
      </div>
      <h1 className="text-12px font-bebas text-[#f09f0a] font-medium text-center whitespace-nowrap">
        Ready Stock pada Grand Opening | Minggu, 8 Juni 2025!
      </h1>
      <div className="w-[80px] h-[32px] bg-[#BC002D] rounded-[16px] font-bebas text-white font-medium items-center justify-center flex">
        Logo
      </div>
    </>
  );

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-[#40573A] via-[#E4CDA4] to-white flex flex-col items-center">
      <div
        className={`fixed z-1 w-full h-[64px] bg-[#40573A]/30 flex justify-center transition-all duration-300 translate-y-0 backdrop-blur-[5px] shadow-lg `}
      >
        <div className="w-full min-w-[320px] max-w-[1440px] h-full px-[32px] bg-transparent flex justify-between items-center overflow-hidden">
          <div className="animate-marquee gap-4">
            <div className="flex gap-4 items-center">{content}</div>
            <div className="flex gap-4 items-center">{content}</div>
            <div className="flex gap-4 items-center">{content}</div>
            <div className="flex gap-4 items-center">{content}</div>
          </div>
        </div>
      </div>

      <div className="w-full min-w-[320px] max-w-[1140px] h-[64px] bg-transparent flex flex-col items-center">
        <div className="w-full px-[32px] py-32 bg-transparent flex flex-col gap-4 items-center shadow-lg rounded-[32px] max-[1024px]:py-24">
          <div className="w-full flex flex-row gap-8 max-[1024px]:flex-col">
            <div className="w-full flex flex-col gap-4">
              <h1 className="w-full font-bebas text-5xl text-white font-medium max-[1024px]:text-center max-[1024px]:text-4xl max-[440px]:text-3xl">
                TOUR RESTORAN BARUNYA{" "}
              </h1>
              <h1 className="w-full font-anton text-7xl text-white font-medium max-[1024px]:text-center max-[1024px]:text-6xl max-[440px]:text-5xl">
                NEO
                <span className="w-full font-anton text-7xl text-[#BC002D] font-medium max-[1024px]:text-center max-[1024px]:text-6xl max-[440px]:text-5xl">
                  JAPAN
                </span>
              </h1>
              <h2 className="w-full font-anton text-2xl custom-outline max-[1024px]:text-center max-[1024px]:text-[20px]">
                CHALLANGE FANS COBAIN MASAKANNYA NEOJAPAN
              </h2>
              <div className="w-full flex flex-row gap-2 max-[1024px]:justify-center max-[440px]:flex-col max-[440px]:items-center">
                <a
                  href="https://formurl.com/to/Daftar-event"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit h-[40px] bg-[#BC002D] text-white px-6 py-2 rounded-sm font-semibold shadow-md flex items-center hover:bg-[#a50d26] hover:shadow-lg transition"
                >
                  Daftar Event
                </a>
                <a
                  href="https://www.instagram.com/m_ds.unite_cafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit h-[40px] border-1 border-[#BC002D] text-[#BC002D] px-6 py-2 rounded-sm font-semibold shadow-md flex items-center hover:border-[1.5px] hover:shadow-lg transition"
                >
                  Info Lebih Lanjut
                </a>
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="relative w-100 aspect-video border-[#E4CDA4] bg-[#40573A] border-4 rounded-xl shadow-[0_0_0_4px_black] overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 border-[#E4CDA4] bg-[#40573A] border-4 rounded-full shadow-[0_0_0_4px_black] flex items-center justify-center text-2xl font-bebas text-white font-medium flex-col">
                  LOGO
                  <span>MD</span>
                </div>
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/XJH0LFxlCiI"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div
            className={`mt-[16px] h-[8px] bg-[#f09f0a] border-[#40573A] border-2 rounded-b-[32px] shadow-lg transition-all duration-300 ${
              isTop ? "w-[160px]" : "w-[80px]"
            }`}
          ></div>
        </div>
        <div className="-mt-[72px] w-full min-w-[288px] max-w-[1080px] px-6 py-6 bg-white rounded-4xl relative flex flex-wrap gap-4 items-center shadow-[0_8px_8px_1px_gray] max-[440px]:px-0">
          <h1 className="w-full font-anton text-2xl text-[#BC002D] font-medium text-center max-[440px]:text-[16px]">
            POP-UP STORE TOUR AND REVIEW
          </h1>
          <div className="relative w-full">
            <img
              src={images["Warung"]}
              alt="Deskripsi Gambar"
              className="w-full rounded-2xl"
            />
            <div
              className="absolute left-[15.6%] top-[8%] group cursor-pointer max-[440px]:left-[15%] max-[440px]:top-[26%]"
              onClick={() => setModalContent("Logo1")}
            >
              <div className="w-5 h-5 bg-[#BC002D] rounded-sm border-2 border-white group-hover:animate-none animate-ping max-[440px]:w-2.5 max-[440px]:h-2.5" />
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-sm text-white bg-[#40573A] bg-opacity-80 px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                WARUNG NEOJAPAN
              </div>
            </div>

            <div
              className="absolute right-[16.3%] top-[6.5%] group cursor-pointer max-[440px]:right-[15.5%] max-[440px]:top-[25%]"
              onClick={() => setModalContent("Logo2")}
            >
              <div className="w-5 h-5 bg-[#f09f0a] rounded-sm border-2 border-white group-hover:animate-none animate-ping max-[440px]:w-2.5 max-[440px]:h-2.5" />
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-sm text-white bg-[#40573A] bg-opacity-80 px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Moire Co., Ltd.
              </div>
            </div>

            <div
              className="absolute right-[32%] top-[53%] group cursor-pointer "
              onClick={() => setModalContent("Customer")}
            >
              <div className="w-4 h-4 bg-gradient-to-r from-[#BC002D] to-[#f09f0a] rounded-full border-2 border-white group-hover:animate-none animate-ping" />
              <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-white bg-[#40573A] bg-opacity-80 px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Customer Statistics
              </div>
            </div>

            <div
              className="absolute left-[25%] top-[49%] group cursor-pointer "
              onClick={() => setModalContent("Merchandise")}
            >
              <div className="w-4 h-4 bg-[#BC002D] rounded-full border-2 border-white group-hover:animate-none animate-ping" />
              <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-white bg-[#40573A] bg-opacity-80 px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                NEOJAPAN's Merchandise
              </div>
            </div>
            {/* Titik Penanda - Orang */}
            <div
              className="absolute left-[47%] top-[60%] group cursor-pointer max-[440px]:left-[46%] max-[440px]:top-[60%] "
              onClick={() => setModalContent("Owner")}
            >
              <div className="w-4 h-4 bg-[#BC002D] rounded-full border-2 border-white group-hover:animate-none animate-ping" />
              <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-white bg-[#40573A] bg-opacity-80 px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                NEOJAPAN a.k.a Bang Dian (Owner)
              </div>
            </div>

            {/* Titik Penanda - Rak Makanan */}
            <div
              className="absolute left-[80%] top-[60%] group cursor-pointer "
              onClick={() => setModalContent("SnF")}
            >
              <div className="w-4 h-4 bg-[#f09f0a] rounded-full border-2 border-white group-hover:animate-none animate-ping" />
              <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-white bg-[#40573A] bg-opacity-80 px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Snack and Food
              </div>
            </div>
            {(modalContent === "Logo1" || modalContent === "Logo2") && (
              <div className="fixed inset-0 bg-black/30 py-2 backdrop-blur-[5px] bg-opacity-60 flex justify-center items-center z-50 overflow-y-auto">
                <div className="relative flex flex-col gap-4 h-fit py-4 px-4 max-w-[732px] bg-[#E4CDA4] w-full rounded-lg">
                  <div className="relative bg-white p-8 rounded-lg shadow-[0_8px_8px_1px_gray] max-w-[700px] w-full overflow-y-auto">
                    <button
                      onClick={() => setModalContent(null)}
                      className="absolute top-2 right-2 p-2 text-gray-600 cursor-pointer rounded-4xl hover:text-black transition hover:bg-gray-600/10"
                      aria-label="Tutup"
                    >
                      <MdClose size={24} />
                    </button>

                    {modalContent === "Logo1" && (
                      <div className="flex flex-row gap-8 max-[440px]:flex-col">
                        <div className="w-fit flex items-center justify-center max-[440px]:w-full ">
                          <div className="w-32 h-32 border-black bg-[#BC002D] border-4 rounded-full shadow-[0_0_0_4px_black] flex items-center justify-center text-2xl font-bebas text-white font-medium flex-col">
                            LOGO
                          </div>
                        </div>
                        <div className="w-full max-[440px]:text-center">
                          <h3 className="text-lg font-bold mb-2">
                            WARUNG NEOJAPAN
                          </h3>
                          <p className="mt-2 text-sm text-gray-700">
                            Warung Halal-Indonesia milik NEOJAPAN yang terletak
                            di Suzuka, Mie-ken, hanya beberapa menit dari
                            Stasiun Tsuzumigaura dan Shiroko. Tempat ini
                            menyajikan makanan halal khas Indonesia dengan rasa
                            autentik dan suasana yang ramah. Cocok untuk kamu
                            yang mencari cita rasa Indonesia di Jepang.
                            <br />
                            <br />
                            📍{" "}
                            <a
                              href="https://maps.app.goo.gl/VtKQ2ZSkZJ3A7gEv9?g_st=com.google.maps.preview.copy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              Lihat di Google Maps
                            </a>
                          </p>
                        </div>
                      </div>
                    )}

                    {modalContent === "Logo2" && (
                      <div className="flex flex-row gap-8 max-[440px]:flex-col">
                        <div className="w-fit flex items-center justify-center max-[440px]:w-full ">
                          <div className="w-32 h-32 border-white bg-[#f09f0a] border-4 rounded-full shadow-[0_0_0_4px_black] flex items-center justify-center text-2xl font-bebas text-white font-medium flex-col">
                            LOGO
                          </div>
                        </div>
                        <div className="w-full max-[440px]:text-center">
                          <h3 className="text-lg font-bold mb-2">
                            Moire Co., Ltd.
                          </h3>
                          <p className="mt-2 text-sm text-gray-700">
                            We are committed to delivering Japan's finest foods
                            and products to customers around the world. Our
                            products, which combine Japan's tradition and
                            innovation, consistently meet the highest standards,
                            offering safety and reliability. Our mission is to
                            spread the value of Japan’s exceptional technology
                            and materials across borders, gaining recognition in
                            the global market.
                            <br />
                            <br />
                            📍{" "}
                            <a
                              href="https://maps.app.goo.gl/DDFkwSsiDmQKvQxYA"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              Lihat di Google Maps
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {(modalContent === "Merchandise" ||
              modalContent === "Owner" ||
              modalContent === "Customer" ||
              modalContent === "SnF") && (
              <div className="fixed inset-0 bg-black/30 py-2 backdrop-blur-[5px] bg-opacity-60 flex justify-center z-50 overflow-y-auto">
                <div className="relative flex flex-col gap-4 h-fit py-4 px-4 max-w-[732px] bg-[#E4CDA4] w-full rounded-lg">
                  <div className="sticky top-0 z-10 flex items-center justify-between px-2 py-2 bg-[#E4CDA4]">
                    {modalContent === "Merchandise" && (
                      <>
                        <h3 className="px-2 text-lg font-bold text-[#40573A]">
                          NEOJAPAN's Merchandise
                        </h3>
                      </>
                    )}
                    {modalContent === "Owner" && (
                      <>
                        <h3 className="px-2 text-lg font-bold text-[#40573A]">
                          NEOJAPAN a.k.a Bang Dian (Owner)
                        </h3>
                      </>
                    )}
                    {modalContent === "Customer" && (
                      <>
                        <h3 className="px-2 text-lg font-bold text-[#40573A]">
                          Customer Statistics
                        </h3>
                      </>
                    )}
                    {modalContent === "SnF" && (
                      <>
                        <h3 className="px-2 text-lg font-bold text-[#40573A]">
                          Snack and Food
                        </h3>
                      </>
                    )}
                    <button
                      onClick={() => setModalContent(null)}
                      className="p-2 text-gray-600 cursor-pointer rounded-4xl hover:text-black transition hover:bg-gray-600/10"
                      aria-label="Tutup"
                    >
                      <MdClose size={24} />
                    </button>
                  </div>
                  <div className="relative bg-white p-4 rounded-lg shadow-[0_8px_8px_1px_gray] max-w-[700px] w-full h-fit overflow-y-auto">
                    {modalContent === "Merchandise" && (
                      <>
                        <div className="flex flex-row overflow-hidden px-4 gap-4 max-[440px]:flex-col max-[440px]:gap-0 items-center">
                          <div
                            className={`z-1 w-full rounded-lg h-[40px] bg-[#40573A] flex justify-center transition-all duration-300 translate-y-0 backdrop-blur-[5px] shadow-lg overflow-hidden`}
                          >
                            <div className="w-full min-w-[320px] max-w-[1440px] h-full bg-transparent flex justify-between items-center overflow-hidden">
                              <div className="animate-marquee gap-4">
                                <div className="flex gap-4 items-center">
                                  {content2}
                                </div>
                                <div className="flex gap-4 items-center">
                                  {content2}
                                </div>
                                <div className="flex gap-4 items-center">
                                  {content2}
                                </div>
                                <div className="flex gap-4 items-center">
                                  {content2}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col max-[540px]:gap-8">
                          <div className="flex flex-row gap-4 max-[540px]:flex-col items-center justify-center max-[540px]:gap-0">
                            <div className="w-fit flex items-center justify-center max-[440px]:w-full ">
                              <div className="w-56 h-56 flex items-center justify-center ">
                                <img
                                  src={images["Baju1"]}
                                  alt="Deskripsi Gambar"
                                  className="w-full rounded-2xl shadow-[0_8px_8px_1px_gray]"
                                />
                              </div>
                            </div>
                            <div className="w-full h-fit max-[540px]:w-fit">
                              <h3 className="text-lg font-bold mb-2">
                                WARUNG NEOJAPAN's T-Shirt
                              </h3>
                              <div className="w-full flex flex-row gap-2">
                                {" "}
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-gradient-to-r text-white from-[#BC002D] to-[#f09f0a] rounded-2xl max-[440px]:text-[8px] ">
                                  Eksklusif 2025
                                </h3>{" "}
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-[#BC002D] text-white rounded-2xl max-[440px]:text-[8px]">
                                  Urban
                                </h3>{" "}
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-[#f09f0a] text-white rounded-2xl max-[440px]:text-[8px] ">
                                  Daily Wear
                                </h3>
                              </div>
                              <h3 className="text-sm font-bold mb-1">
                                Material :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  100% Cotton Premium
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold mb-1">
                                Size :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  S/M/L/XL
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold mb-1">
                                Color :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  Black and White
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold mb-1">
                                Stock :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  Sold Out!!!
                                </span>
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row gap-4 max-[540px]:flex-col items-center justify-center max-[540px]:gap-0">
                            <div className="w-fit flex items-center justify-center max-[440px]:w-full ">
                              <div className="w-56 h-56 flex items-center justify-center ">
                                <img
                                  src={images["Mug"]}
                                  alt="Deskripsi Gambar"
                                  className="w-full rounded-2xl shadow-[0_8px_8px_1px_gray]"
                                />
                              </div>
                            </div>
                            <div className="w-full h-fit max-[540px]:w-fit">
                              <h3 className="text-lg font-bold mb-2">
                                WARUNG NEOJAPAN's Mug
                              </h3>
                              <div className="w-full flex flex-row gap-2">
                                {" "}
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-gradient-to-r text-white from-[#BC002D] to-[#f09f0a] rounded-2xl max-[440px]:text-[8px] ">
                                  Eksklusif 2025
                                </h3>{" "}
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-[#BC002D] text-white rounded-2xl max-[440px]:text-[8px]">
                                  Urban
                                </h3>{" "}
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-[#f09f0a] text-white rounded-2xl max-[440px]:text-[8px] ">
                                  Contemporary
                                </h3>
                              </div>
                              <h3 className="text-sm font-bold">
                                Material :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  100% Ceramic Premium
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold">
                                Size :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  ±350 ml
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold">
                                Color :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  White - Glossy
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold">
                                Stock :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  Sold Out!!!
                                </span>
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row gap-4 max-[540px]:flex-col items-center justify-center max-[540px]:gap-0">
                            <div className="w-fit flex items-center justify-center max-[440px]:w-full ">
                              <div className="w-56 h-56 flex items-center justify-center ">
                                <img
                                  src="src/components/Baju1.png"
                                  alt="Deskripsi Gambar"
                                  className="w-full rounded-2xl shadow-[0_8px_8px_1px_gray]"
                                />
                              </div>
                            </div>
                            <div className="w-full h-fit max-[540px]:w-fit">
                              <h3 className="text-lg font-bold mb-2">
                                WARUNG NEOJAPAN's T-Shirt
                              </h3>
                              <div className="w-full flex flex-row gap-2">
                                {" "}
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-gradient-to-r text-white from-[#BC002D] to-[#f09f0a] rounded-2xl max-[440px]:text-[8px] ">
                                  Eksklusif 2025
                                </h3>{" "}
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-[#BC002D] text-white rounded-2xl max-[440px]:text-[8px]">
                                  Urban
                                </h3>{" "}
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-[#f09f0a] text-white rounded-2xl max-[440px]:text-[8px] ">
                                  Daily Wear
                                </h3>
                              </div>
                              <h3 className="text-sm font-bold mb-1">
                                Material :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  100% cotton premium
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold mb-1">
                                Size :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  S/M/L/XL
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold mb-1">
                                Color :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  Black and White
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold mb-1">
                                Stock :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  Sold Out!!!
                                </span>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {modalContent === "Owner" && (
                      <div className="flex flex-col max-[540px]:gap-8">
                        <div className="w-full h-90 flex items-center">
                          <div className="bg-[#E4CDA4] w-full shadow-[0_8px_8px_1px_gray] rounded-lg flex flex-row h-55 gap-4 max-[540px]:flex-col items-center justify-center max-[540px]:gap-0">
                            <div className="relative w-full flex items-center justify-center max-[440px]:w-full ">
                              <div className=" w-56 h-56 flex items-center justify-center ">
                                <img
                                  src={images["Neo1"]}
                                  alt="Deskripsi Gambar"
                                  className="h-80 rounded-2xl "
                                />
                              </div>
                            </div>
                            <div className="w-full max-[540px]:w-fit">
                              <h3 className="text-lg font-bold mb-2">
                                Neo Japan
                              </h3>
                              <div className="w-full flex flex-row gap-2 mb-2">
                                <img
                                  src="https://flagcdn.com/w40/id.png"
                                  alt="Bendera Indonesia"
                                  width={24}
                                />
                                <img
                                  src="https://flagcdn.com/w40/jp.png"
                                  alt="Bendera Jepang"
                                  width={24}
                                />
                              </div>
                              <h3 className="text-sm font-bold mb-1">
                                Nama Lengkap :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  Dian Kusuma
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold mb-1">
                                Agama :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  Islam
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold mb-1">
                                Tempat Asal :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  Lombok, Indonesia
                                </span>
                              </h3>
                              <h3 className="text-sm font-bold mb-1">
                                Pasangan :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  Fatima (Istri)
                                </span>
                              </h3>

                              <h3 className="text-sm font-bold mb-1">
                                Hobi :{" "}
                                <span className="my-2 text-sm font-medium text-gray-700 ">
                                  Travelling, Surfing
                                </span>
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-80 flex items-center">
                          <div className="bg-[#E4CDA4] shadow-[0_8px_8px_1px_gray]  w-full rounded-lg flex flex-row h-50 gap-4 max-[540px]:flex-col items-center justify-center max-[540px]:gap-0">
                            <div className="w-full h-fit max-[540px]:w-fit pl-8 ">
                              <div className="flex flex-row gap-1 items-center">
                                <h3 className="text-lg font-bold mb-2">
                                  Neo Japan
                                </h3>{" "}
                                <div className="">
                                  <img
                                    src={images["Verif"]}
                                    alt="Deskripsi Gambar"
                                    className="h-3 mb-1 "
                                  />
                                </div>
                              </div>
                              <div className="w-full flex flex-row gap-2">
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-gradient-to-r text-white from-[#BC002D] to-[#f09f0a] rounded-2xl max-[440px]:text-[8px] ">
                                  Travelling
                                </h3>
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-gradient-to-r text-white from-[#BC002D] to-[#f09f0a] rounded-2xl max-[440px]:text-[8px] ">
                                  Family
                                </h3>
                                <h3 className="text-[12px] font-bold mb-2 px-3 py-1 bg-gradient-to-r text-white from-[#BC002D] to-[#f09f0a] rounded-2xl max-[440px]:text-[8px] ">
                                  Surving
                                </h3>
                              </div>
                              <h3 className="text-lg font-bold mb-2">
                                SUBSCRIBE FOR BERAS !
                              </h3>
                            </div>
                            <div className="w-full relative flex items-center justify-center max-[440px]:w-full ">
                              <div className=" h-56 flex items-center justify-center ">
                                <a href="https://www.youtube.com/@NeoJapan">
                                  <img
                                    src={images["YTLogo"]}
                                    alt="Deskripsi Gambar"
                                    className="h-80 rounded-2xl "
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {modalContent === "Customer" && (
                      <>
                        <div className="flex flex-col gap-6 max-w-xl mx-auto p-4">
                          {weeklyData.map(({ day, laki, perempuan }) => {
                            const lakiPercent = (laki / maxTotal) * 100;
                            const perempuanPercent =
                              (perempuan / maxTotal) * 100;

                            return (
                              <div
                                key={day}
                                className="flex flex-col md:flex-row md:items-center gap-4 w-full"
                              >
                                <div className="w-full md:w-[50px] font-semibold text-gray-700">
                                  {day}
                                </div>

                                <div className="flex-1 flex items-center gap-3">
                                  {/* Laki-Laki */}
                                  <div className="flex-1 h-4 bg-blue-200 rounded overflow-hidden relative">
                                    <div
                                      className="h-full bg-blue-600 rounded animate-bar"
                                      style={{
                                        ["--bar-width" as any]: `${lakiPercent}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <span className="w-10 text-right text-sm text-blue-700">
                                    {laki}
                                  </span>
                                </div>

                                <div className="flex-1 flex items-center gap-3">
                                  {/* Perempuan */}
                                  <div className="flex-1 h-4 bg-pink-200 rounded overflow-hidden relative">
                                    <div
                                      className="h-full bg-pink-600 rounded animate-bar"
                                      style={{
                                        ["--bar-width" as any]: `${perempuanPercent}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <span className="w-10 text-right text-sm text-pink-700">
                                    {perempuan}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {modalContent === "SnF" && <></>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
