import type { ReactNode } from "react";
import { FaCss3, FaHtml5, FaJs, FaReact, FaSass } from "react-icons/fa";
import {
  SiBootstrap,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { imagess } from "../Image";

export function canonicalizeSkill(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/c\s*#/g, "csharp")
    .replace(/\.\s*net/g, "dotnet")
    .replace(/[^a-z0-9]+/g, "");
}

function formatSkillFallbackLabel(value: string) {
  const normalized = value.trim().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
  if (!normalized) return "";

  return normalized
    .split(" ")
    .map((word) => {
      if (!word) return "";
      if (word.length <= 4 && word.toUpperCase() === word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export type SkillIconItem = {
  key: string;
  canonicalKey: string;
  icon: ReactNode;
  label: string;
};

function defineSkillIconItem(key: string, icon: ReactNode, label: string) {
  return {
    key,
    canonicalKey: canonicalizeSkill(key),
    icon,
    label,
  } satisfies SkillIconItem;
}

export const SKILL_ICON_ITEMS = [
  defineSkillIconItem(
    "javascript",
    <FaJs className="text-yellow-500 text-2xl" />,
    "JavaScript",
  ),
  defineSkillIconItem(
    "html",
    <FaHtml5 className="text-red-500 text-2xl" />,
    "HTML",
  ),
  defineSkillIconItem(
    "react",
    <FaReact className="text-blue-500 text-2xl" />,
    "React.js",
  ),
  defineSkillIconItem(
    "typescript",
    <SiTypescript className="text-blue-700 text-2xl" />,
    "TypeScript",
  ),
  defineSkillIconItem(
    "css",
    <FaCss3 className="text-blue-500 text-2xl" />,
    "CSS",
  ),
  defineSkillIconItem(
    "sass",
    <FaSass className="text-pink-500 text-2xl" />,
    "Sass",
  ),
  defineSkillIconItem(
    "php",
    <SiPhp className="text-indigo-700 text-2xl" />,
    "PHP",
  ),
  defineSkillIconItem(
    "C#",
    <img
      src={imagess["Csharp"]}
      alt="C#"
      loading="lazy"
      decoding="async"
      className="w-6 h-6 object-contain"
    />,
    "C#",
  ),
  defineSkillIconItem(
    ".Net Core",
    <img
      src={imagess["NET_Core_Logo"]}
      alt=".Net Core"
      loading="lazy"
      decoding="async"
      className="w-6 h-6 object-contain"
    />,
    ".Net Core",
  ),
  defineSkillIconItem(
    "mysql",
    <SiMysql className="text-yellow-700 text-2xl" />,
    "MySQL",
  ),
  defineSkillIconItem(
    "laravel",
    <SiLaravel className="text-red-700 text-2xl" />,
    "Laravel",
  ),
  defineSkillIconItem(
    "bootstrap",
    <SiBootstrap className="text-purple-700 text-2xl" />,
    "Bootstrap",
  ),
  defineSkillIconItem(
    "tailwindcss",
    <SiTailwindcss className="text-cyan-500 text-2xl" />,
    "Tailwind CSS",
  ),
  defineSkillIconItem(
    "Figma",
    <img
      src={imagess["FigmaLogo"]}
      alt="Figma"
      loading="lazy"
      decoding="async"
      className="w-6 h-6 object-contain"
    />,
    "Figma",
  ),
] as const satisfies ReadonlyArray<SkillIconItem>;

// Central registry for skill text labels. Keys can be any raw form; canonicalization handles variants.
const SKILL_TEXT_LABELS: Record<string, string> = {
  "frontend-development": "Frontend Development",
  "lean-ux": "Lean UX",
  "ui-design": "UI Design",
  agile: "Agile",
  scrum: "Scrum",
  "information-systems": "Information Systems",
  database: "Database",
  automation: "Automation",
  "network-security": "Network Security",
  science: "Science",
  math: "Mathematics",
  lead: "Leadership",
  "public-broadcasting": "Public Broadcasting",
  "broadcast-media": "Broadcast Media",
  teamwork: "Teamwork",
  SofCons: "Software Construction",
  VerCont: "Version Control",
  SofArch: "Software Architecture",
  "UI/UX Design": "UI/UX Design",
  "Hi-Fi Prototype": "Hi-Fi Prototype",
  "public workshop": "Public Workshop",
};

const SKILL_TEXT_LABEL_MAP = new Map(
  Object.entries(SKILL_TEXT_LABELS).map(
    ([key, label]) => [canonicalizeSkill(key), label] as const,
  ),
);

export function getSkillPresentation(skills: string[]) {
  if (!skills.length) return { skillIcons: [], skillTextLabels: [] };

  const canonicalSkills = new Set(skills.map(canonicalizeSkill));
  const skillIcons = SKILL_ICON_ITEMS.filter((item) =>
    canonicalSkills.has(item.canonicalKey),
  );

  const iconCanonicalKeys = new Set(skillIcons.map((i) => i.canonicalKey));
  const seenText = new Set<string>();
  const skillTextLabels: Array<{ key: string; label: string }> = [];

  for (const rawSkill of skills) {
    const canonical = canonicalizeSkill(rawSkill);
    if (!canonical) continue;
    if (iconCanonicalKeys.has(canonical)) continue;
    if (seenText.has(canonical)) continue;

    const label =
      SKILL_TEXT_LABEL_MAP.get(canonical) ?? formatSkillFallbackLabel(rawSkill);
    if (!label) continue;

    seenText.add(canonical);
    skillTextLabels.push({ key: canonical, label });
  }

  return { skillIcons, skillTextLabels };
}
