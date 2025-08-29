import { useState, useEffect, ReactNode, useRef } from "react";

interface TabMenuProps {
  icon: ReactNode | null;
  label: string;
  count?: number;
  color: string;
  isNew?: boolean;
  isActive: boolean;
  onClick: () => void;
  newClass?: string;
}

function TabMenu({
  icon,
  label,
  count,
  color,
  isNew,
  isActive,
  onClick,
  newClass = "",
}: TabMenuProps) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 701);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          setShowNavbar(currentScrollY < lastScrollY.current);
          lastScrollY.current = currentScrollY;

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 701);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop ? (
    <button
      onClick={onClick}
      className={`relative py-2 flex flex-row gap-3 items-center cursor-pointer transition-all duration-300 group 
        ${
          isActive ? "text-[var(--color)] scale-95" : "text-gray-700"
        } ${newClass}`}
      style={{ "--color": color } as React.CSSProperties}
    >
      {icon && (
        <span
          className={`text-lg group-hover:text-[var(--color)] transition-all duration-300 ${
            isActive ? "text-[var(--color)]" : ""
          }`}
        >
          {icon}
        </span>
      )}
      <div className="flex flex-col">
        <p
          className={`text-sm font-medium group-hover:text-[var(--color)] transition-all duration-300 ${
            isActive ? "text-[var(--color)]" : ""
          }`}
        >
          {label}
        </p>
        {count !== undefined && (
          <p className="text-base font-semibold flex flex-row items-center">
            {count}
            {isNew && (
              <span className="ml-2 bg-[var(--color)] text-white text-xs px-2 py-[2px] rounded-full">
                baru
              </span>
            )}
          </p>
        )}
      </div>
      <span
        className={`absolute bottom-[-1px] w-full h-[3px] bg-[var(--color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 
          ${isActive ? "scale-x-100" : "scale-x-0"}`}
      ></span>
    </button>
  ) : (
    <button
      onClick={onClick}
      className={`relative py-2 flex flex-col items-center cursor-pointer transition-all duration-300 group 
      ${
        isActive ? "text-[var(--color)] scale-95" : "text-gray-700"
      } ${newClass}`}
      style={{ "--color": color } as React.CSSProperties}
    >
      <div className="flex flex-row gap-2 items-center">
        {icon && (
          <span
            className={`text-lg group-hover:text-[var(--color)] transition-all duration-300 ${
              isActive ? "text-[var(--color)]" : ""
            }`}
          >
            {icon}
          </span>
        )}
        {count !== undefined && (
          <p className="text-base font-semibold flex flex-row items-center">
            {count}
            {isNew && (
              <span className="ml-2 bg-[var(--color)] text-white text-xs px-2 py-[2px] rounded-full">
                baru
              </span>
            )}
          </p>
        )}
      </div>
      {icon ? (
        <p
          className={`text-sm font-medium group-hover:text-[var(--color)] transition-all duration-300 ${
            isActive ? "text-[var(--color)]" : ""
          } ${showNavbar ? "block" : "hidden"}`}
        >
          {label}
        </p>
      ) : (
        <p
          className={`text-sm font-medium group-hover:text-[var(--color)] transition-all duration-300 ${
            isActive ? "text-[var(--color)]" : ""
          } `}
        >
          {label}
        </p>
      )}
      <span
        className={`absolute bottom-[-1px] w-full h-[3px] bg-[var(--color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 
        ${isActive ? "scale-x-100" : "scale-x-0"}`}
      ></span>
    </button>
  );
}

export default TabMenu;
