
"use client";

import { useState } from "react";
import { MessageCircle, X, Bot, User, GamepadIcon, FileText } from "lucide-react";

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

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm Shivam's AI assistant. I can help you learn about him, play games, or provide his resume. Try asking me something!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [gameState, setGameState] = useState<any>({});

  const games: Game[] = [
    {
      name: "Number Guessing Game",
      description: "I'll think of a number between 1-100, try to guess it!",
      action: () => startNumberGame(),
    },
    {
      name: "Rock Paper Scissors",
      description: "Classic game! Choose rock, paper, or scissors.",
      action: () => startRPSGame(),
    },
    {
      name: "Riddle Challenge",
      description: "I'll give you riddles to solve!",
      action: () => startRiddleGame(),
    },
  ];

  const startNumberGame = () => {
    const number = Math.floor(Math.random() * 100) + 1;
    setCurrentGame("number");
    setGameState({ targetNumber: number, attempts: 0 });
    addBotMessage(`I'm thinking of a number between 1 and 100. Can you guess it? You have unlimited attempts!`);
  };

  const startRPSGame = () => {
    setCurrentGame("rps");
    setGameState({ playerScore: 0, botScore: 0 });
    addBotMessage(`Let's play Rock Paper Scissors! Type 'rock', 'paper', or 'scissors' to play. First to 3 wins!`);
  };

  const startRiddleGame = () => {
    const riddles = [
      { question: "What has keys but no locks, space but no room, and you can enter but not go inside?", answer: "keyboard" },
      { question: "I'm not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?", answer: "fire" },
      { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
    ];
    const riddle = riddles[Math.floor(Math.random() * riddles.length)];
    setCurrentGame("riddle");
    setGameState({ currentRiddle: riddle, score: 0 });
    addBotMessage(`Here's a riddle for you: ${riddle.question}`);
  };

  const addBotMessage = (content: string) => {
    const newMessage: Message = {
      id: `bot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleResumeRequest = () => {
    const resumeContent = `
📄 **Shivam Kumar's Resume**

🎓 **Education:**
B.Tech in Electronics and Communication Engineering
Asansol Engineering College (2026 Graduate)

💼 **Skills:**
• Machine Learning & AI
• Full Stack Development (Next.js, React, TypeScript)
• Python, Node.js, TailwindCSS
• Computer Vision, NLP
• FastAPI, Streamlit

🚀 **Featured Projects:**
• Drug Toxicity Prediction Dashboard (GCN, PyTorch)
• Ethan Voice Assistant (OpenAI API, Speech Recognition)
• Video Recommendation System (FastAPI, GNN)

📧 **Contact:** sk0255980@gmail.com
🌐 **Portfolio:** Currently viewing!

Would you like me to elaborate on any specific section?
    `;
    addBotMessage(resumeContent);
  };

  const processGameInput = (input: string) => {
    const lowerInput = input.toLowerCase().trim();

    if (currentGame === "number") {
      const guess = parseInt(lowerInput);
      if (isNaN(guess)) {
        addBotMessage("Please enter a valid number!");
        return;
      }

      const newAttempts = gameState.attempts + 1;
      if (guess === gameState.targetNumber) {
        addBotMessage(`🎉 Congratulations! You guessed it in ${newAttempts} attempts! The number was ${gameState.targetNumber}.`);
        setCurrentGame(null);
        setGameState({});
      } else if (guess < gameState.targetNumber) {
        setGameState({ ...gameState, attempts: newAttempts });
        addBotMessage(`Too low! Try a higher number. Attempts: ${newAttempts}`);
      } else {
        setGameState({ ...gameState, attempts: newAttempts });
        addBotMessage(`Too high! Try a lower number. Attempts: ${newAttempts}`);
      }
    } else if (currentGame === "rps") {
      if (!["rock", "paper", "scissors"].includes(lowerInput)) {
        addBotMessage("Please choose 'rock', 'paper', or 'scissors'!");
        return;
      }

      const choices = ["rock", "paper", "scissors"];
      const botChoice = choices[Math.floor(Math.random() * 3)];
      
      let result = "";
      let playerWins = false;
      
      if (lowerInput === botChoice) {
        result = "It's a tie!";
      } else if (
        (lowerInput === "rock" && botChoice === "scissors") ||
        (lowerInput === "paper" && botChoice === "rock") ||
        (lowerInput === "scissors" && botChoice === "paper")
      ) {
        result = "You win this round!";
        playerWins = true;
      } else {
        result = "I win this round!";
      }

      const newPlayerScore = gameState.playerScore + (playerWins ? 1 : 0);
      const newBotScore = gameState.botScore + (!playerWins && result !== "It's a tie!" ? 1 : 0);

      addBotMessage(`You chose ${lowerInput}, I chose ${botChoice}. ${result}\nScore: You ${newPlayerScore} - ${newBotScore} Me`);

      if (newPlayerScore === 3) {
        addBotMessage("🎉 You won the game! Great job!");
        setCurrentGame(null);
        setGameState({});
      } else if (newBotScore === 3) {
        addBotMessage("I won the game! Better luck next time!");
        setCurrentGame(null);
        setGameState({});
      } else {
        setGameState({ playerScore: newPlayerScore, botScore: newBotScore });
      }
    } else if (currentGame === "riddle") {
      if (lowerInput === gameState.currentRiddle.answer.toLowerCase()) {
        addBotMessage("🎉 Correct! You solved the riddle!");
        setCurrentGame(null);
        setGameState({});
      } else {
        addBotMessage("Not quite right. Try again, or type 'hint' for a clue!");
      }
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
      addBotMessage("Shivam has worked on some amazing projects! His featured ones include:\n\n🧬 **Drug Toxicity Prediction Dashboard** - ML model with GCN\n🎤 **Ethan Voice Assistant** - AI-powered desktop assistant\n🎥 **Video Recommendation System** - Personalized content engine\n\nWould you like to know more about any specific project?");
    } else if (lowerInput.includes("skill")) {
      addBotMessage("Shivam's core skills include:\n\n💻 **Programming:** Python, TypeScript, JavaScript\n🤖 **AI/ML:** PyTorch, TensorFlow, Computer Vision, NLP\n🌐 **Web Dev:** Next.js, React, Node.js, TailwindCSS\n📊 **Data:** Pandas, NumPy, Scikit-learn\n☁️ **Tools:** Git, Docker, AWS\n\nHe's particularly passionate about combining AI with web development!");
    } else if (lowerInput.includes("contact") || lowerInput.includes("email")) {
      addBotMessage("You can reach Shivam at:\n📧 **Email:** sk0255980@gmail.com\n\nHe typically responds within 1 hour! Feel free to reach out for collaborations, opportunities, or just to say hi!");
    } else {
      addBotMessage("That's an interesting question! I can help you with information about Shivam's projects, skills, experience, or his resume. I can also play games with you! What would you like to know more about?");
    }

    setInputValue("");
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <Bot className="text-blue-600" size={20} />
            <h3 className="font-semibold text-gray-900 dark:text-white">Shivam's AI Assistant</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "bot" && <Bot size={16} className="mt-0.5 text-blue-600" />}
                    {message.sender === "user" && <User size={16} className="mt-0.5" />}
                    <div className="text-sm whitespace-pre-line">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me about Shivam or let's play a game..."
                className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
