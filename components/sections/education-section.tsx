"use client";

import React, { useState } from "react";
import HeadingBadge from "@/components/heading-badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Calendar, ChevronRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Education = {
  institution: string;
  institutionLink: string;
  degree: string;
  duration: string;
  description: string[];
  subjects: string[];
  link: string;
};

const education: Education[] = [
  {
    institution: "Asansol Engineering College",
    institutionLink: "https://www.aecwb.edu.in",
    link: "https://www.aecwb.edu.in",
    degree: "B.Tech - Electronics & Communication Engineering",
    duration: "2022 - 2026 ",
    description: [
      "Currently pursuing Bachelor of Technology in Electronics and Communication Engineering with focus on AI/ML applications in signal processing and embedded systems",
      "Developed multiple real-world AI projects including drug toxicity prediction systems, voice assistants, and computer vision applications for assistive technology",
      "Active in research projects combining electronics engineering principles with machine learning for IoT and smart system development",
    ],
    subjects: ["Signal Processing", "Digital Communications", "Microprocessors", "Machine Learning", "IoT", "Embedded Systems"],
  },
  {
    institution: "Higher Secondary Education",
    institutionLink: "",
    link: "",
    degree: "12th Grade - Science (PCM)",
    duration: "2020 - 2022",
    description: [
      "Completed higher secondary education with Physics, Chemistry, and Mathematics as core subjects",
      "Built strong foundation in mathematical concepts and scientific principles that support current engineering studies",
      "Developed analytical thinking and problem-solving skills essential for technical education",
    ],
    subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science", "English"],
  },
  {
    institution: "Secondary Education",
    institutionLink: "",
    link: "",
    degree: "10th Grade",
    duration: "2018 - 2020",
    description: [
      "Completed secondary education with focus on science and mathematics",
      "Developed fundamental knowledge in core subjects and academic discipline",
      "Built strong foundation for pursuing technical education in engineering",
    ],
    subjects: ["Mathematics", "Science", "Social Studies", "English", "Hindi"],
  },
];

export function EducationSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="education" className="pt-10">
      <div className="space-y-8">
        <div className="flex flex-col items-start justify-start gap-5">
          <HeadingBadge
            title="Education"
            icon={<GraduationCap size={14} color="#F59E42" />}
          />
          <div className="space-y-2">
            <h3 className="text-3xl font-semibold">
              Educational{" "}
              <span className="text-[#08090a] dark:text-slate-200">
                Background
              </span>
            </h3>
            <p className="text-[#737373] dark:text-[#A1A1AA] text-sm">
              Academic institutions and qualifications that shaped my learning journey
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {education.map((edu, index) => (
            <SpotlightCard
              key={index}
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 group rounded-sm border border-gray-200/80 dark:border-gray-500/10 ease-in-out hover:border-gray-900/30 dark:hover:border-gray-500/20",
                "hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-500/5",
                expandedIndex === index ? "bg-opacity-10" : ""
              )}
              gradientColor="rgba(100, 116, 139, 0.15)"
              lightGradientColor="rgba(8, 9, 10, 0.15)"
              onClick={() => toggleExpand(index)}
              disableScale={true}
            >
              <div className="space-y-4">
                <div className="flex xs:flex-row flex-col items-start justify-between gap-4">
                  <section className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium text-[#08090a] dark:text-white">
                        {edu.degree}
                      </h3>
                      <ChevronRight
                        className={cn(
                          "w-5 h-5 text-[#08090a] dark:text-slate-200 transition-all duration-500",
                          "transform-gpu opacity-0 scale-95 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-hover:scale-100",
                          "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                          expandedIndex === index ? "rotate-90" : "rotate-0",
                          expandedIndex === index
                            ? "opacity-100 translate-x-0 scale-100"
                            : ""
                        )}
                      />
                    </div>
                    {edu.institutionLink ? (
                      <Link
                        href={edu.institutionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center z-50 gap-2 text-[#737373] dark:text-[#A1A1AA]"
                      >
                        <span>{edu.institution}</span>
                      </Link>
                    ) : (
                      <span className="text-[#737373] dark:text-[#A1A1AA]">
                        {edu.institution}
                      </span>
                    )}
                  </section>
                  <section className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-[#191a1a] text-[#08090a] dark:text-slate-200 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.duration}</span>
                  </section>
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-in-out",
                    expandedIndex === index
                      ? "grid-rows-[1fr] opacity-100 translate-y-0"
                      : "grid-rows-[0fr] opacity-0 -translate-y-4"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pt-4 space-y-4">
                      <ul className="space-y-2 text-[#737373] dark:text-[#A1A1AA] text-sm">
                        {edu.description.map((item, i) => (
                          <li
                            key={i}
                            style={{ transitionDelay: `${i * 100}ms` }}
                            className={cn(
                              "list-disc list-inside transition-all duration-500",
                              "transform-gpu",
                              expandedIndex === index
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            )}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {edu.subjects.map((subject, i) => (
                          <span
                            key={i}
                            style={{
                              transitionDelay:
                                expandedIndex === index
                                  ? `${i * 100 + 300}ms`
                                  : "0ms",
                            }}
                            className={cn(
                              "px-2 py-1 text-xs rounded-sm font-medium bg-white dark:bg-[#0a0a0a] border border-gray-200/80 dark:border-gray-500/10 text-[#737373] dark:text-[#A1A1AA] group-hover:border-gray-900/30 dark:group-hover:border-slate-500/20 transition-all duration-300",
                              expandedIndex === index
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            )}
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
