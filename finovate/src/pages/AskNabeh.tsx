import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Sparkles } from "lucide-react";

const suggestedQuestions = [
  "What solutions do you offer for core banking?",
  "How can AI improve my financial operations?",
  "Tell me about your payment solutions",
  "What makes Finovate different?",
];

const predefinedResponses: Record<string, string> = {
  default:
    "Thank you for your question! Our team of experts is here to help. For detailed information about our solutions, please contact us directly or explore our solutions page.",
  "core banking":
    "Our Core Banking Solutions provide modern, cloud-native infrastructure designed for scalability and security. We offer real-time processing, API-first design, and built-in regulatory compliance to help you transform your banking operations.",
  ai: "Our AI and Data solutions leverage advanced machine learning to provide predictive analytics, fraud detection, and automated insights. We help financial institutions reduce costs by up to 40% while improving decision-making accuracy.",
  payment:
    "Our Payment Solutions offer multi-currency support, instant settlement, and advanced fraud detection. We process transactions securely and reliably with 99.9% uptime, helping businesses scale globally.",
  different:
    "Finovate stands out with our deep fintech expertise, cutting-edge technology, and commitment to client success. We've served 500+ clients worldwide and consistently deliver measurable results with bank-grade security and reliability.",
};

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AskNabeh() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Nabeh, your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (key !== "default" && lowerQuestion.includes(key)) {
        return response;
      }
    }

    return predefinedResponses.default;
  };

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(messageText),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0066cc] to-[#00a3cc] flex items-center justify-center">
              <Sparkles className="text-white" size={32} />
            </div>
            <h1 className="text-4xl bg-gradient-to-r from-[#0066cc] to-[#00a3cc] bg-clip-text text-transparent">
              Ask Nabeh
            </h1>
          </div>
          <p className="text-gray-600">
            Meet Nabeeh Chatbot — your intelligent assistant that understands
            your documents like a human expert.{" "}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex gap-3 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "user"
                          ? "bg-[#0066cc]"
                          : "bg-gradient-to-br from-purple-500 to-pink-500"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="text-white" size={20} />
                      ) : (
                        <Bot className="text-white" size={20} />
                      )}
                    </div>

                    <div
                      className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                        message.sender === "user"
                          ? "bg-[#0066cc] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="leading-relaxed">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="text-white" size={20} />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-5 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: 0,
                        }}
                        className="w-2 h-2 rounded-full bg-gray-400"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: 0.2,
                        }}
                        className="w-2 h-2 rounded-full bg-gray-400"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: 0.4,
                        }}
                        className="w-2 h-2 rounded-full bg-gray-400"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-600 mb-3">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(question)}
                      className="px-4 py-2 bg-blue-50 text-[#0066cc] rounded-full text-sm hover:bg-blue-100 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-100 p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#0066cc] transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-12 h-12 rounded-full bg-[#0066cc] text-white flex items-center justify-center hover:bg-[#0052a3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
