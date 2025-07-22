
"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Bot, User, GamepadIcon, Download } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Game {
  name: string;
  description: string;
  action: () => void;
}

interface GameState {
  targetNumber?: number;
  attempts?: number;
  playerScore?: number;
  botScore?: number;
  round?: number;
  currentRiddle?: {
    question: string;
    answer: string;
    hint: string;
  };
  riddleCount?: number;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm Shivam's AI assistant. I can help you learn about him, play games, provide his resume, or even show you recursion in action! Try asking me something!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const games: Game[] = [
    {
      name: "Number Guessing Game",
      description: "I&apos;ll think of a number between 1-100, try to guess it!",
      action: () => startNumberGame(),
    },
    {
      name: "Rock Paper Scissors",
      description: "Classic game! Choose rock, paper, or scissors.",
      action: () => startRPSGame(),
    },
    {
      name: "Riddle Challenge",
      description: "I&apos;ll give you riddles to solve!",
      action: () => startRiddleGame(),
    },
  ];

  const startNumberGame = () => {
    const number = Math.floor(Math.random() * 100) + 1;
    setCurrentGame("number");
    setGameState({ targetNumber: number, attempts: 0 });
    addBotMessage(`I&apos;m thinking of a number between 1 and 100. Can you guess it? You have unlimited attempts!`);
  };

  const startRPSGame = () => {
    setCurrentGame("rps");
    setGameState({ playerScore: 0, botScore: 0, round: 1 });
    addBotMessage(`🎯 **Rock Paper Scissors Championship!**\n\n🏆 First to 3 wins takes the trophy!\n\n🎮 **Round 1** - Choose your weapon:\n🪨 **rock** | 📄 **paper** | ✂️ **scissors**\n\nType your choice to begin the battle!`);
  };

  const startRiddleGame = () => {
    const riddles = [
      { question: "What has keys but no locks, space but no room, and you can enter but not go inside?", answer: "keyboard", hint: "You use this to type!" },
      { question: "I&apos;m not alive, but I grow; I don&apos;t have lungs, but I need air; I don&apos;t have a mouth, but water kills me. What am I?", answer: "fire", hint: "It&apos;s hot and bright!" },
      { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m", hint: "It&apos;s a letter!" },
      { question: "What has hands but cannot hold anything?", answer: "clock", hint: "It tells time!" },
      { question: "What gets wet while drying?", answer: "towel", hint: "You use it after a shower!" },
      { question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", answer: "map", hint: "You use it for navigation!" },
      { question: "What can travel around the world while staying in a corner?", answer: "stamp", hint: "You put it on letters!" },
      { question: "What has one eye but cannot see?", answer: "needle", hint: "Used for sewing!" },
      { question: "I&apos;m tall when I&apos;m young, and short when I&apos;m old. What am I?", answer: "candle", hint: "It gives light and melts!" },
      { question: "What goes up but never comes down?", answer: "age", hint: "It increases every year!" }
    ];
    const riddle = riddles[Math.floor(Math.random() * riddles.length)];
    setCurrentGame("riddle");
    setGameState({ currentRiddle: riddle, attempts: 0, riddleCount: 0 });
    addBotMessage(`🧩 **Riddle Challenge!**\n\nHere's your riddle:\n\n*${riddle.question}*\n\nYou have 3 attempts to solve it! Type 'hint' if you need a clue.`);
  };

  const addBotMessage = (content: string) => {
    const newMessage: Message = {
      id: `bot-${Date.now()}-${performance.now()}-${Math.random().toString(36).substring(2, 11)}`,
      content,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: `user-${Date.now()}-${performance.now()}-${Math.random().toString(36).substring(2, 11)}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleResumeRequest = () => {
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = '/resume/Shivam_Kumar_Resume.pdf';
    link.download = 'Shivam_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    addBotMessage(`� **Resume Downloaded!**\n\nShivam's resume has been downloaded to your device! 📥\n\nIf the download didn't start automatically, I'll show you a download button in a moment. ✨`);
    
    // Add download button after a short delay
    setTimeout(() => {
      addBotMessage(`🔽 **Manual Download Option:**\n\nIf the automatic download didn't work, click the button below:`);
    }, 1500);
  };

  const processGameInput = (input: string) => {
    const lowerInput = input.toLowerCase().trim();

    if (currentGame === "number") {
      const guess = parseInt(lowerInput);
      if (isNaN(guess)) {
        addBotMessage("Please enter a valid number!");
        return;
      }

      const newAttempts = (gameState.attempts || 0) + 1;
      if (guess === gameState.targetNumber) {
        addBotMessage(`🎉 Congratulations! You guessed it in ${newAttempts} attempts! The number was ${gameState.targetNumber}.`);
        setCurrentGame(null);
        setGameState({});
      } else if (guess < (gameState.targetNumber || 0)) {
        setGameState({ ...gameState, attempts: newAttempts });
        addBotMessage(`Too low! Try a higher number. Attempts: ${newAttempts}`);
      } else {
        setGameState({ ...gameState, attempts: newAttempts });
        addBotMessage(`Too high! Try a lower number. Attempts: ${newAttempts}`);
      }
    } else if (currentGame === "rps") {
      if (lowerInput === "quit" || lowerInput === "exit" || lowerInput === "stop") {
        addBotMessage(`🎮 **Rock Paper Scissors Ended!**\n\n📊 **Final Score:**\nYou: ${gameState.playerScore || 0} | Me: ${gameState.botScore || 0}\n\nThanks for the epic battle! ⚔️`);
        setCurrentGame(null);
        setGameState({});
        return;
      }

      if (!["rock", "paper", "scissors"].includes(lowerInput)) {
        addBotMessage("⚠️ Invalid choice! Please choose:\n🪨 **rock** | 📄 **paper** | ✂️ **scissors**");
        return;
      }

      const choices = ["rock", "paper", "scissors"];
      const choiceEmojis: { [key: string]: string } = { rock: "🪨", paper: "📄", scissors: "✂️" };
      const botChoice = choices[Math.floor(Math.random() * 3)];
      
      let result = "";
      let resultEmoji = "";
      let playerWins = false;
      
      if (lowerInput === botChoice) {
        result = "It&apos;s a tie!";
        resultEmoji = "🤝";
      } else if (
        (lowerInput === "rock" && botChoice === "scissors") ||
        (lowerInput === "paper" && botChoice === "rock") ||
        (lowerInput === "scissors" && botChoice === "paper")
      ) {
        result = "You win this round!";
        resultEmoji = "🎉";
        playerWins = true;
      } else {
        result = "I win this round!";
        resultEmoji = "🤖";
      }

      const newPlayerScore = (gameState.playerScore || 0) + (playerWins ? 1 : 0);
      const newBotScore = (gameState.botScore || 0) + (!playerWins && result !== "It&apos;s a tie!" ? 1 : 0);
      const currentRound = gameState.round || 1;

      // Battle visualization
      addBotMessage(`⚔️ **Round ${currentRound} Results:**\n\nYou: ${choiceEmojis[lowerInput]} **${lowerInput}**\nMe: ${choiceEmojis[botChoice]} **${botChoice}**\n\n${resultEmoji} **${result}**\n\n📊 **Score:** You ${newPlayerScore} - ${newBotScore} Me`);

      if (newPlayerScore === 3) {
        addBotMessage("� **VICTORY!** You are the Rock Paper Scissors Champion! 🎊\n\nExcellent strategy and well-played! 👏");
        setCurrentGame(null);
        setGameState({});
      } else if (newBotScore === 3) {
        addBotMessage("🤖 **AI VICTORY!** I claim the championship! 🏆\n\nGreat game though! Want a rematch? 😊");
        setCurrentGame(null);
        setGameState({});
      } else {
        const nextRound = (currentRound || 1) + 1;
        setGameState({ playerScore: newPlayerScore, botScore: newBotScore, round: nextRound });
        addBotMessage(`🎮 **Round ${nextRound}** - Ready for the next battle?\n\nChoose your weapon:\n🪨 **rock** | 📄 **paper** | ✂️ **scissors**\n\nType 'quit' to forfeit the championship!`);
      }
    } else if (currentGame === "riddle") {
      if (lowerInput === "quit" || lowerInput === "exit" || lowerInput === "stop") {
        addBotMessage(`🎮 **Riddle Challenge Ended!**\n\nThanks for playing! You solved ${gameState.riddleCount || 0} riddle${(gameState.riddleCount || 0) !== 1 ? 's' : ''}! 🌟\n\nFeel free to start a new game anytime!`);
        setCurrentGame(null);
        setGameState({});
        return;
      }

      if (lowerInput === "hint") {
        if (gameState.currentRiddle?.hint) {
          addBotMessage(`💡 **Hint:** ${gameState.currentRiddle.hint}\n\nNow try to guess the answer!`);
        }
        return;
      }

      if (gameState.currentRiddle && lowerInput === gameState.currentRiddle.answer.toLowerCase()) {
        const newRiddleCount = (gameState.riddleCount || 0) + 1;
        addBotMessage(`🎉 **Correct!** You solved the riddle!\n\n✨ Riddles solved: ${newRiddleCount}`);
        
        // Start a new riddle
        setTimeout(() => {
          const riddles = [
            { question: "What has keys but no locks, space but no room, and you can enter but not go inside?", answer: "keyboard", hint: "You use this to type!" },
            { question: "I&apos;m not alive, but I grow; I don&apos;t have lungs, but I need air; I don&apos;t have a mouth, but water kills me. What am I?", answer: "fire", hint: "It&apos;s hot and bright!" },
            { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m", hint: "It&apos;s a letter!" },
            { question: "What has hands but cannot hold anything?", answer: "clock", hint: "It tells time!" },
            { question: "What gets wet while drying?", answer: "towel", hint: "You use it after a shower!" },
            { question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", answer: "map", hint: "You use it for navigation!" },
            { question: "What can travel around the world while staying in a corner?", answer: "stamp", hint: "You put it on letters!" },
            { question: "What has one eye but cannot see?", answer: "needle", hint: "Used for sewing!" },
            { question: "I&apos;m tall when I&apos;m young, and short when I&apos;m old. What am I?", answer: "candle", hint: "It gives light and melts!" },
            { question: "What goes up but never comes down?", answer: "age", hint: "It increases every year!" }
          ];
          const newRiddle = riddles[Math.floor(Math.random() * riddles.length)];
          setGameState({ currentRiddle: newRiddle, attempts: 0, riddleCount: newRiddleCount });
          addBotMessage(`🧩 **Next Riddle!**\n\n*${newRiddle.question}*\n\nYou have 3 attempts! Type 'hint' for a clue or 'quit' to stop.`);
        }, 2000);
      } else {
        const newAttempts = (gameState.attempts || 0) + 1;
        if (newAttempts >= 3) {
          addBotMessage(`❌ **Out of attempts!** The answer was: **${gameState.currentRiddle?.answer}**\n\nBetter luck with the next riddle! 🍀`);
          
          // Start a new riddle after revealing answer
          setTimeout(() => {
            const riddles = [
              { question: "What has keys but no locks, space but no room, and you can enter but not go inside?", answer: "keyboard", hint: "You use this to type!" },
              { question: "I&apos;m not alive, but I grow; I don&apos;t have lungs, but I need air; I don&apos;t have a mouth, but water kills me. What am I?", answer: "fire", hint: "It&apos;s hot and bright!" },
              { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m", hint: "It&apos;s a letter!" },
              { question: "What has hands but cannot hold anything?", answer: "clock", hint: "It tells time!" },
              { question: "What gets wet while drying?", answer: "towel", hint: "You use it after a shower!" },
              { question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", answer: "map", hint: "You use it for navigation!" },
              { question: "What can travel around the world while staying in a corner?", answer: "stamp", hint: "You put it on letters!" },
              { question: "What has one eye but cannot see?", answer: "needle", hint: "Used for sewing!" },
              { question: "I&apos;m tall when I&apos;m young, and short when I&apos;m old. What am I?", answer: "candle", hint: "It gives light and melts!" },
              { question: "What goes up but never comes down?", answer: "age", hint: "It increases every year!" }
            ];
            const newRiddle = riddles[Math.floor(Math.random() * riddles.length)];
            setGameState({ currentRiddle: newRiddle, attempts: 0, riddleCount: gameState.riddleCount });
            addBotMessage(`🧩 **Next Riddle!**\n\n*${newRiddle.question}*\n\nFresh start with 3 attempts! Type 'hint' for a clue or 'quit' to stop.`);
          }, 3000);
        } else {
          setGameState({ ...gameState, attempts: newAttempts });
          const attemptsLeft = 3 - newAttempts;
          addBotMessage(`❌ Not quite right! You have ${attemptsLeft} attempt${attemptsLeft > 1 ? 's' : ''} left.\n\nTry again, or type 'hint' for a clue! 🤔`);
        }
      }
    }
  };

  // API integration for natural conversation
  const handleNaturalConversation = async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('API Error:', error);
      return "I'm having trouble processing that right now. Could you try asking about my projects, skills, or maybe play a game instead?";
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    const lowerInput = inputValue.toLowerCase().trim();

    // Handle game inputs
    if (currentGame) {
      processGameInput(inputValue);
      setInputValue("");
      return;
    }

    // Handle regular chat
    if (lowerInput.includes("resume") || lowerInput.includes("cv")) {
      handleResumeRequest();
    } else if (lowerInput.includes("game") || lowerInput.includes("play")) {
      addBotMessage("🎮 Here are the games I can play with you:\n\n" + 
        games.map((game, index) => `${index + 1}. **${game.name}**: ${game.description}`).join("\n\n") +
        "\n\nWhich game would you like to play? Just type the number or name!");
    } else if (lowerInput.includes("1") || lowerInput.includes("number")) {
      startNumberGame();
    } else if (lowerInput.includes("2") || lowerInput.includes("rock") || lowerInput.includes("paper") || lowerInput.includes("scissors")) {
      startRPSGame();
    } else if (lowerInput.includes("3") || lowerInput.includes("riddle")) {
      startRiddleGame();
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      addBotMessage("Hello! I'm here to help you learn about Shivam. You can ask me about his projects, skills, experience, or we can play some games! What interests you?");
    } else if (lowerInput.includes("project")) {
      addBotMessage("Shivam has worked on some amazing projects! His featured ones include:\n\n🧬 **Drug Toxicity Prediction Dashboard** - ML model with GCN\n🎤 **Ethan Voice Assistant** - AI-powered desktop assistant\n\nWould you like to know more about any specific project?");
    } else if (lowerInput.includes("skill")) {
      addBotMessage("Shivam's core skills include:\n\n💻 **Programming:** Python, TypeScript, JavaScript\n🤖 **AI/ML:** PyTorch, TensorFlow, Computer Vision, NLP\n🌐 **Web Dev:** Next.js, React, Node.js, TailwindCSS\n📊 **Data:** Pandas, NumPy, Scikit-learn\n☁️ **Tools:** Git, Docker, AWS\n\nHe's particularly passionate about combining AI with web development!");
    } else if (lowerInput.includes("contact") || lowerInput.includes("email")) {
      addBotMessage("You can reach Shivam at:\n📧 **Email:** sk0255980@gmail.com\n\nHe typically responds within 1 hour! Feel free to reach out for collaborations, opportunities, or just to say hi!");
    } else if (lowerInput.includes("ethan") || lowerInput.includes("voice assistant")) {
      addBotMessage("🎤 **Ethan Voice Assistant**\n\nAn advanced AI-powered desktop assistant with natural language processing capabilities!\n\n**Features:**\n• Voice recognition and speech synthesis\n• Natural language understanding\n• Desktop automation and control\n• OpenAI integration for intelligent responses\n\n🔗 **GitHub Repository:** https://github.com/ShivamKum4r/ethan\n\nClick the link above to explore the code and documentation! 🚀");
      
      // Create clickable link
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'https://github.com/ShivamKum4r/ethan';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.click();
      }, 500);
    } else if (lowerInput.includes("drug") || lowerInput.includes("toxicity") || lowerInput.includes("dashboard")) {
      addBotMessage("🧬 **Drug Toxicity Prediction Dashboard**\n\nA machine learning application using Graph Convolutional Networks (GCN) to predict drug toxicity!\n\n**Features:**\n• Molecular fingerprinting analysis\n• GCN-based prediction models\n• Interactive web dashboard\n• Real-time toxicity assessment\n\n🌐 **Live Demo:** https://huggingface.co/spaces/ShivamKum4r/Drug-Toxicity-Prediction\n\nClick the link above to explore the live application! ⚗️");
      
      // Create clickable link
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'https://huggingface.co/spaces/ShivamKum4r/Drug-Toxicity-Prediction';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.click();
      }, 500);
    } else if (lowerInput.includes("experience") || lowerInput.includes("work") || lowerInput.includes("job")) {
      addBotMessage("💼 **Shivam's Experience:**\n\n**Status:** Fresher & Enthusiastic Learner 🌱\n\n**Current Focus:**\n• Learning and building projects in AI/ML\n• Developing full-stack applications\n• Exploring new technologies and frameworks\n• Building a strong portfolio through personal projects\n\n**Learning Journey:**\n• Self-taught in modern web development\n• Continuously improving AI/ML skills\n• Active in coding communities and open source\n• Always eager to take on new challenges\n\n**Goal:** Seeking opportunities to apply skills and grow professionally while contributing to meaningful projects! 🚀");
    } else if (lowerInput.includes("recursion") || lowerInput.includes("recursive") || lowerInput.includes("inception")) {
      addBotMessage("🔄 **Want to see recursion in action?** 🔄\n\nLet's create a recursive experience! I'll open this portfolio in a new tab - you can keep going deeper into the recursion! 🌀\n\n*Portfolio opening in 3... 2... 1...*");
      
      // Create recursive portfolio opening
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = window.location.href; // Current portfolio URL
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.click();
        
        addBotMessage("🎉 **Recursion achieved!** A new portfolio instance has opened! You can keep clicking recursion for infinite depth... just like a true recursive function! 💫\n\n*Warning: May cause existential questions about reality! 😄*");
      }, 3000);
    } else {
      // Use API for natural conversation
      handleNaturalConversation(inputValue).then(response => {
        addBotMessage(response);
      });
    }

    setInputValue("");
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-black bg-opacity-80 hover:bg-opacity-90 text-white border border-gray-500 border-opacity-50 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
      >
        <div className="relative">
          {isOpen ? <X size={24} className="transition-transform duration-200 group-hover:rotate-90" /> : <MessageCircle size={24} className="transition-transform duration-200 group-hover:scale-110" />}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-black border-opacity-80"></div>
          )}
        </div>
      </button>

      {/* Chat window - Responsive */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 z-50 sm:bottom-24 sm:right-6 sm:w-96 sm:h-96 bg-black bg-opacity-85 border border-gray-500 border-opacity-30 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
          {/* Header - Responsive */}
          <div className="p-3 sm:p-4 border-b border-gray-500 border-opacity-20 flex items-center gap-2 sm:gap-3 bg-black bg-opacity-50 relative">
            <div className="relative">
              <Bot className="text-gray-300" size={18} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm truncate">Shivam&apos;s AI Assistant</h3>
              <p className="text-xs text-gray-400">Online & Ready to Help</p>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="sm:hidden p-1 rounded-full hover:bg-gray-700 hover:bg-opacity-50 transition-colors"
            >
              <X size={16} className="text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} transition-all duration-300 ease-in-out`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl transition-all duration-200 hover:scale-105 ${
                    message.sender === "user"
                      ? "bg-black bg-opacity-70 text-white border border-gray-500 border-opacity-30 shadow-lg"
                      : "bg-black bg-opacity-50 text-gray-100 border border-gray-500 border-opacity-20 shadow-lg"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "bot" && (
                      <div className="relative">
                        <Bot size={16} className="mt-0.5 text-gray-300" />
                        <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      </div>
                    )}
                    {message.sender === "user" && <User size={16} className="mt-0.5 text-gray-300" />}
                    <div className="text-sm whitespace-pre-line leading-relaxed">{message.content}</div>
                  </div>
                  {/* Download button for resume messages */}
                  {message.sender === "bot" && message.content.includes("Manual Download Option") && (
                    <div className="mt-3 text-center">
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = '/resume/Shivam_Kumar_Resume.pdf';
                          link.download = 'Shivam_Kumar_Resume.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="flex items-center gap-2 mx-auto px-4 py-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white border border-gray-500 border-opacity-30 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg group"
                      >
                        <Download size={16} className="group-hover:animate-bounce" />
                        Download Resume PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Invisible div to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-500 border-opacity-20 bg-black bg-opacity-50">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me about Shivam or let's play a game..."
                  className="w-full p-3 pr-12 text-sm border border-gray-500 border-opacity-30 rounded-xl bg-black bg-opacity-60 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:border-gray-400 focus:border-opacity-50 transition-all duration-200"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleResumeRequest();
                  }}
                  className="flex-1 px-3 py-2.5 bg-black bg-opacity-70 hover:bg-opacity-80 text-white border border-gray-500 border-opacity-30 rounded-xl text-xs transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1 shadow-lg group"
                  title="Download Resume"
                >
                  <Download size={14} className="group-hover:animate-bounce" />
                  <span className="font-medium">Resume</span>
                </button>
                <button
                  onClick={() => {
                    addBotMessage("🎮 Here are the games I can play with you:\n\n" + 
                      games.map((game, index) => `${index + 1}. **${game.name}**: ${game.description}`).join("\n\n") +
                      "\n\nWhich game would you like to play? Just type the number or name!");
                  }}
                  className="flex-1 px-3 py-2.5 bg-black bg-opacity-70 hover:bg-opacity-80 text-white border border-gray-500 border-opacity-30 rounded-xl text-xs transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1 shadow-lg group"
                  title="Show Games"
                >
                  <GamepadIcon size={14} className="group-hover:animate-pulse" />
                  <span className="font-medium">Games</span>
                </button>
                <button
                  onClick={handleSendMessage}
                  className="flex-1 px-3 py-2.5 bg-black bg-opacity-70 hover:bg-opacity-80 text-white border border-gray-500 border-opacity-30 rounded-xl text-xs transition-all duration-200 hover:scale-105 shadow-lg group font-medium"
                >
                  <span className="group-hover:animate-pulse">Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
