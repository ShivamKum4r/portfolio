"use client";

import { ProjectCard } from "@/components/project-card";
import HeadingBadge from "@/components/heading-badge";
import { FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  link?: string;
  githubLink?: string;
  date?: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "Drug Toxicity Prediction Dashboard",
    description:
      "Built a predictive dashboard with fingerprint-based MLP and Graph Convolutional Network (GCN) models for SMILES molecular inputs. Integrated molecular feature visualization and comprehensive test set evaluation for drug discovery applications.",
    imageUrl: "/projects/drug-toxicity.jpg",
    videoUrl: "",
    tags: ["Streamlit", "PyTorch", "GCN", "RDKit", "Scikit-learn", "Python"],
    link: "https://huggingface.co/spaces/ShivamKum4r/Drug-Toxicity-Prediction",
    githubLink: "https://github.com/ShivamKum4r/drug-toxicity-dashboard",
    date: "15/06/2025",
  },
  {
    id: "2",
    title: "Ethan - Voice Assistant",
    description:
      "Advanced voice-controlled desktop assistant with capabilities including answering questions, playing music, system shutdown, news fetching, and web automation. Features natural language processing and speech recognition for seamless user interaction.",
    imageUrl: "/projects/ethan-assistant.jpg",
    videoUrl: "/projects/ethan-assistant.mp4",
    tags: ["Python", "OpenAI API", "SpeechRecognition", "Selenium", "VLC"],
    link: "",
    githubLink: "https://github.com/ShivamKum4r/Ethan",
    date: "05/12/2023",
  },
  // {
  //   id: "3",
  //   title: "Video Recommendation System",
  //   description:
  //     "Built a personalized motivational video recommendation engine using FastAPI for EmpowerVerse. Integrated external APIs with Flic-token authentication, solved cold-start problems with mood-based ranking, and engineered Graph Neural Network logic for relevance filtering.",
  //   imageUrl: "",
  //   videoUrl: "/projects/video-recommendation.mp4",
  //   tags: ["FastAPI", "Python", "GNN", "API Integration", "Machine Learning"],
  //   link: "https://empowerverse-recommendations.railway.app",
  //   githubLink: "https://github.com/shipragmatic/video-recommendation-engine",
  //   date: "19/07/2025",
  // },
  // {
  //   id: "4",
  //   title: "AI-Powered Video Editor",
  //   description:
  //     "Work-in-progress AI video editing tool that accepts video inputs and prompts to apply intelligent effects like color grading, object removal, and scene enhancement. Built with computer vision and generative AI technologies.",
  //   imageUrl: "",
  //   videoUrl: "/projects/ai-video-editor.mp4",
  //   tags: ["Python", "Streamlit", "OpenCV", "FFmpeg", "Generative AI"],
  //   link: "",
  //   githubLink: "https://github.com/shipragmatic/ai-video-editor",
  //   date: "01/07/2025",
  // },
  // {
  //   id: "5",
  //   title: "Smart Glasses for Blind (Prototype)",
  //   description:
  //     "Innovative assistive technology prototype designed for visually impaired individuals. Features YOLOv5-based object detection for people, objects, and currency recognition, with real-time text-to-speech conversion of scene information.",
  //   imageUrl: "",
  //   videoUrl: "/projects/smart-glasses.mp4",
  //   tags: ["YOLOv5", "Raspberry Pi", "Text-to-Speech", "Computer Vision", "IoT"],
  //   link: "",
  //   githubLink: "https://github.com/shipragmatic/smart-glasses-prototype",
  //   date: "20/04/2025",
  // },
  // {
  //   id: "6",
  //   title: "Image-Based Attribute Extractor",
  //   description:
  //     "AI tool that analyzes images and extracts detailed attributes using computer vision and machine learning models. Capable of identifying objects, colors, textures, and contextual information from visual inputs.",
  //   imageUrl: "",
  //   videoUrl: "/projects/attribute-extractor.mp4",
  //   tags: ["Python", "OpenCV", "Machine Learning", "Computer Vision", "API"],
  //   link: "https://attribute-extractor.streamlit.app",
  //   githubLink: "https://github.com/shipragmatic/image-attribute-extractor",
  //   date: "15/03/2025",
  // },
];

export function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const initialProjectsToShow = 3;

  const projectsToShow = showAll
    ? projects
    : projects.slice(0, initialProjectsToShow);
  const canShowMore = projects.length > initialProjectsToShow;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section
      id="projects"
      className="w-full pt-10 flex flex-col items-start justify-start gap-y-10"
    >
      <div className="flex flex-col items-start justify-start gap-5">
        <HeadingBadge
          title="Projects"
          icon={<FolderGit2 size={14} color="#A21CAF" />}
        />
        <div className="space-y-2">
          <h3 className="text-3xl font-semibold">
            My{" "}
            <span className="text-[#08090a] dark:text-slate-200">Projects</span>
          </h3>
          <p className="text-[#737373] dark:text-[#A1A1AA] text-sm">
            Explore some of the projects I&apos;ve worked on. These showcase my
            skills and expertise in various domains of software development.
          </p>
        </div>
      </div>

      <div className="w-full space-y-6">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-1 gap-2 w-full">
          {projects.map((project) => {
            const isVisible = projectsToShow.some((p) => p.id === project.id);
            return (
              <div
                key={project.id}
                className={`transition-all duration-500 ease-in-out transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 h-0 -translate-y-4 overflow-hidden pointer-events-none"
                }`}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>

        {canShowMore && (
          <div className="flex justify-start w-full">
            <Button
              variant="ghost"
              onClick={toggleShowAll}
              className="relative overflow-hidden h-10 px-4 py-2 rounded-sm border border-gray-200/80 dark:border-gray-500/10 bg-white/50 dark:bg-[#0a0a0a]/50 text-[#737373] dark:text-[#A1A1AA] hover:text-[#08090a] dark:hover:text-slate-200 hover:border-gray-900/30 dark:hover:border-gray-500/20 transition-all duration-300 ease-in-out group cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                {showAll ? "Show Less" : "Show More"}
              </span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
