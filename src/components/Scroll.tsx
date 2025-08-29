import { useState, useEffect } from "react";

const sections = [
  { id: "a", label: "Section A" },
  { id: "b", label: "Section B" },
  { id: "c", label: "Section C" },
];

export default function HomePage() {
  const [active, setActive] = useState("a");

  // Untuk mendeteksi section mana yang sedang aktif saat scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const sec of sections) {
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

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setActive(id);
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <ul className="flex justify-center space-x-6 p-4">
          {sections.map((sec) => (
            <li key={sec.id}>
              <button
                onClick={() => handleClick(sec.id)}
                className={`px-4 py-2 rounded-md transition-colors duration-200
                  ${
                    active === sec.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }
                `}
              >
                {sec.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sections */}
      <div className="pt-20">
        {sections.map((sec) => (
          <section
            key={sec.id}
            id={sec.id}
            className="h-screen flex items-center justify-center border-b"
          >
            <h1 className="text-4xl font-bold">{sec.label}</h1>
          </section>
        ))}
      </div>
    </div>
  );
}
