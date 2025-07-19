import HeadingBadge from "@/components/heading-badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  MonitorIcon,
  CodeIcon,
  ServerIcon,
  Wrench,
  PaletteIcon,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Machine Learning Solutions",
    description:
      "Building intelligent systems using PyTorch, Scikit-learn, and Graph Neural Networks. Specializing in predictive modeling, computer vision, and drug discovery applications with molecular analysis.",
    icon: <CodeIcon className="w-6 h-6" color="#2563EB" />,
  },
  {
    title: "AI-Powered Tools Development",
    description:
      "Creating innovative AI applications including voice assistants, image processing systems, and recommendation engines. Using OpenAI API, computer vision, and natural language processing technologies.",
    icon: <MonitorIcon className="w-6 h-6" color="#22C55E" />,
  },
  {
    title: "Full Stack Web Development",
    description:
      "Developing end-to-end web applications using React.js, Next.js, and TypeScript. Building responsive interfaces with Tailwind CSS and robust backends with FastAPI and Node.js.",
    icon: <PaletteIcon className="w-6 h-6" color="#A21CAF" />,
  },
  {
    title: "Computer Vision & IoT",
    description:
      "Implementing object detection, image analysis, and IoT solutions using YOLOv5, OpenCV, and Raspberry Pi. Creating assistive technologies and smart systems for real-world applications.",
    icon: <ServerIcon className="w-6 h-6" color="#F59E42" />,
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full pt-10 flex flex-col items-start justify-start gap-y-10"
    >
      <div className="flex flex-col items-start justify-start gap-5">
        <HeadingBadge
          title="Services"
          icon={<Wrench size={14} color="#22C55E" />}
        />
        <div className="space-y-2">
          <h3 className="text-3xl font-semibold">
            <span className="text-[#08090a] dark:text-slate-200">Services</span>{" "}
            I offer
          </h3>
          <p className="text-[#737373] dark:text-[#A1A1AA] text-sm">
            Here are the professional services I provide to help bring your
            digital ideas to life.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 w-full">
        {services.map((service, index) => (
          <SpotlightCard
            key={index}
            gradientColor="rgba(100, 116, 139, 0.50)"
            lightGradientColor="rgba(8, 9, 10, 0.2)"
            spotlightSize={350}
            glowEffect={true}
            glowSize={150}
            glowOpacity={0.15}
            className="p-6 rounded-sm border border-gray-200/80 dark:border-gray-500/10 bg-white dark:bg-[#0a0a0a] hover:border-gray-900/30 dark:hover:border-gray-500/20 transition-all duration-300"
          >
            <div className="flex flex-col xs:flex-row items-start gap-4">
              <div className="flex-shrink-0 mt-1">{service.icon}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#08090a] dark:text-white">
                  {service.title}
                </h3>
                <p className="text-[#737373] dark:text-[#A1A1AA] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
