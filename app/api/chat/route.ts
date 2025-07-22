import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Personal information about you
    const personalInfo = {
      name: "Shivam Kumar",
      title: "Full Stack Developer & AI Enthusiast",
      experience: "Fresher - Still Learning & Building Projects",
      location: "India",
      education: "Self-taught developer with focus on AI/ML and Web Development",
      skills: [
        "Python", "TypeScript", "JavaScript", "PyTorch", 
        "TensorFlow", "Next.js", "React", "Node.js", 
        "Computer Vision", "NLP", "TailwindCSS", "Git"
      ],
      projects: [
        {
          name: "Drug Toxicity Prediction Dashboard",
          description: "ML application using Graph Convolutional Networks (GCN) to predict drug toxicity with interactive web dashboard",
          tech: ["Python", "PyTorch", "GCN", "Streamlit", "Machine Learning"],
          link: "https://huggingface.co/spaces/ShivamKum4r/Drug-Toxicity-Prediction"
        },
        {
          name: "Ethan Voice Assistant",
          description: "AI-powered desktop assistant with natural language processing and voice recognition capabilities",
          tech: ["Python", "OpenAI", "Speech Recognition", "NLP", "Desktop Automation"],
          link: "https://github.com/ShivamKum4r/ethan"
        },
        {
          name: "AI Portfolio Chatbot",
          description: "Interactive portfolio assistant with games, resume access, and natural conversation powered by API",
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "React", "API Development"]
        }
      ],
      interests: ["AI/ML", "Web Development", "Computer Vision", "NLP", "Problem Solving", "Open Source"],
      goals: "To become a skilled AI/ML engineer and full-stack developer, contributing to innovative projects that solve real-world problems",
      contact: "sk0255980@gmail.com"
    };

    // Generate response based on the message
    const response = generateResponse(message.toLowerCase(), personalInfo);

    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateResponse(message: string, info: any): string {
  // Greetings
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return `Hello! 👋 I'm ${info.name}, a ${info.title}. I'm excited to chat with you! Feel free to ask me about my background, skills, projects, or anything else you'd like to know.`;
  }

  // About/Introduction
  if (message.includes('about') || message.includes('who are you') || message.includes('introduce')) {
    return `I'm ${info.name}, a passionate ${info.title} based in ${info.location}. I'm currently a fresher in the field, still learning and growing my skills every day. I love building web applications and exploring new technologies!`;
  }

  // Experience
  if (message.includes('experience') || message.includes('work') || message.includes('job')) {
    return `I'm a fresher and still learning! 🌱 While I don't have professional experience yet, I'm actively building projects and developing my skills. I'm eager to start my career and contribute to exciting projects. My focus is on continuous learning and improvement.`;
  }

  // Skills
  if (message.includes('skill') || message.includes('technology') || message.includes('tech stack')) {
    return `Here are my current skills:\n\n💻 **Programming:** ${info.skills.slice(0, 4).join(', ')}\n🛠️ **Tools & Frameworks:** ${info.skills.slice(4, 8).join(', ')}\n📚 **Currently Learning:** Advanced React patterns, backend development, and cloud technologies\n\nI'm always excited to learn new technologies!`;
  }

  // Projects
  if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
    return `Here are some projects I've been working on:\n\n🚀 **${info.projects[0].name}:** ${info.projects[0].description}\n💡 **${info.projects[1].name}:** ${info.projects[1].description}\n\nI'm always working on new projects to improve my skills! Each project teaches me something new.`;
  }

  // Education/Learning
  if (message.includes('education') || message.includes('study') || message.includes('learn')) {
    return `I'm currently focused on self-learning and building practical skills through hands-on projects. I believe in learning by doing! 📚 I'm constantly exploring new tutorials, documentation, and building projects to solidify my understanding.`;
  }

  // Contact/Hiring
  if (message.includes('contact') || message.includes('hire') || message.includes('opportunity')) {
    return `I'm actively looking for opportunities to start my career! 🚀 Whether it's an internship, entry-level position, or collaborative project, I'm excited to contribute and learn. Feel free to reach out through my portfolio contact form!`;
  }

  // Goals/Future
  if (message.includes('goal') || message.includes('future') || message.includes('plan')) {
    return `My goal is to ${info.goals}. I'm particularly interested in full-stack development and creating user-friendly applications. I want to keep learning, contribute to open source, and eventually mentor other developers! 🎯`;
  }

  // Interests/Hobbies
  if (message.includes('interest') || message.includes('hobby') || message.includes('like')) {
    return `I'm passionate about ${info.interests.join(', ')}! 💡 I love the problem-solving aspect of programming and the satisfaction of seeing an idea come to life through code. When I'm not coding, I enjoy exploring new technologies and staying updated with industry trends.`;
  }

  // Thanks/Appreciation
  if (message.includes('thank') || message.includes('appreciate')) {
    return `You're very welcome! 😊 Thank you for taking the time to learn about me. If you have any other questions or would like to discuss potential opportunities, I'd love to hear from you!`;
  }

  // Default response for other queries
  return `That's an interesting question! 🤔 While I'm still learning and growing as a developer, I'd love to discuss this further. Feel free to ask me about my skills, projects, learning journey, or career aspirations. I'm also happy to chat about web development, technology, or anything else you're curious about!`;
}
