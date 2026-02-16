import { memo, useMemo } from "react";
import { getSkillPresentation } from "../config/skills";

type Props = {
  skills?: string[];
};

const SkillsFocus = memo(function SkillsFocus({ skills }: Props) {
  const { skillIcons, skillTextLabels } = useMemo(() => {
    if (!skills?.length) return { skillIcons: [], skillTextLabels: [] };
    return getSkillPresentation(skills);
  }, [skills]);

  if (!skills?.length) return null;
  if (skillIcons.length === 0 && skillTextLabels.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 ">
      <span className="text-xs md:text-sm font-bold">Skills Focus</span>
      <div className="flex flex-wrap gap-2 items-center">
        {skillIcons.length > 0 && (
          <span className="relative w-fit max-[485px]:w-full font-medium text-xs flex flex-wrap justify-center gap-3 items-center md:text-sm px-4 py-2 bg-blue-100 rounded-4xl">
            {skillIcons.map((item, idx) => (
              <span className="relative group" key={item.key}>
                {item.icon}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 ${
                    idx % 2 === 0 ? "bottom-full mb-1" : "top-full mt-1"
                  }`}
                >
                  {item.label}
                </span>
              </span>
            ))}
          </span>
        )}

        {skillTextLabels.length > 0 && (
          <span className="w-fit max-[485px]:w-full font-medium text-xs text-center md:text-sm px-4 py-1 bg-blue-100 rounded-4xl whitespace-normal">
            {skillTextLabels.map((item, idx) => (
              <span key={item.key}>
                {item.label}
                {idx < skillTextLabels.length - 1 && ", "}
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
});

export default SkillsFocus;
