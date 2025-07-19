import HeadingBadge from "@/components/heading-badge";
import { Hand } from "lucide-react";

export function IntroSection() {
  return (
    <section
      id="intro"
      className="w-full flex flex-col items-start justify-center"
    >
      <div className="space-y-6 ">
        <HeadingBadge
          title="Introduction"
          icon={<Hand size={14} color="#06B6D4" />}
        />

        <article className="space-y-5 sm:space-y-6">
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            <span className="text-[#08090a] dark:text-slate-200">
              Hi, I&apos;m Shivam Kumar
            </span>
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-[#737373] dark:text-[#A1A1AA] max-w-2xl">
            A Machine Learning & Full Stack Developer passionate about building intelligent systems
          </p>

          <p className="text-sm sm:text-base font-normal text-[#737373] dark:text-[#A1A1AA] max-w-2xl">
            I&apos;m pursuing B.Tech in Electronics and Communication Engineering at Asansol Engineering College (2026 graduate). I specialize in building{" "}
            <span className="text-[#08090a] dark:text-slate-100 font-semibold">
              machine learning solutions, interactive AI tools and full-stack web applications. My tech stack includes Next.js, React, TypeScript, Tailwind CSS, Node.js, and more.
            </span>{" "}
            I love solving real-world problems—from predictive modeling in bioinformatics to voice-controlled assistants and personalized video recommendation engines.
          </p>
        </article>
      </div>
    </section>
  );
}
