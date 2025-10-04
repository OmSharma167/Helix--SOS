



import React, { useState, useCallback, useEffect, useRef } from "react";
// In a real project, you would install this with: npm install lucide-react
// For this environment, we'll use an SVG-based approach for icons.

// --- Icon Components (using inline SVG) ---
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={path} />
  </svg>
);

const Send = (props) => <Icon {...props} path="M22 2 11 13 2 9l9 2-2 9Z" />;
const Trash2 = (props) => <Icon {...props} path="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 5v6m4-6v6" />;
const Bot = (props) => <Icon {...props} path="M12 8V4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-2M7 12h2m4 0h2m-5 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />;
const User = (props) => <Icon {...props} path="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />;
const Heart = (props) => <Icon {...props} path="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />;
const AlertCircle = (props) => <Icon {...props} path="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01" />;
const FolderOpen = (props) => <Icon {...props} path="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.68a2 2 0 0 1 1.79.89L12 6" />;
const Search = (props) => <Icon {...props} path="m21 21-4.3-4.3M11 19A8 8 0 1 0 11 3a8 8 0 0 0 0 16z" />;
const Save = (props) => <Icon {...props} path="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM7 3v4h8" />;
const X = (props) => <Icon {...props} path="M18 6 6 18M6 6l12 12" />;
const Menu = (props) => <Icon {...props} path="M4 6h16M4 12h16M4 18h16" />;
const Loader = (props) => <Icon {...props} path="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />;
const ChevronUp = (props) => <Icon {...props} path="m18 15-6-6-6 6" />;
const ChevronDown = (props) => <Icon {...props} path="m6 9 6 6 6-6" />;


// Component to render formatted AI response
const FormattedAIResponse = ({ content }) => {
    if (!content) return null;

    const paragraphs = content.split('\n\n');

    return (
        <div className="space-y-4">
            {paragraphs.map((paragraph, index) => {
                if (!paragraph.trim()) return null;

                // Handle bullet points
                if (paragraph.includes('* ')) {
                    const lines = paragraph.split('\n');
                    const bulletItems = [];
                    const regularLines = [];

                    lines.forEach(line => {
                        if (line.trim().startsWith('* ')) {
                            const bulletText = line.trim().substring(2);
                            const boldMatch = bulletText.match(/\*\*(.*?)\*\*/);
                            if (boldMatch) {
                                const boldText = boldMatch[1];
                                const remainingText = bulletText.replace(/\*\*(.*?)\*\*/, '').trim();
                                bulletItems.push({ bold: boldText, text: remainingText });
                            } else {
                                bulletItems.push({ bold: null, text: bulletText });
                            }
                        } else if (line.trim()) {
                            regularLines.push(line);
                        }
                    });

                    return (
                        <div key={index} className="space-y-3">
                            {regularLines.map((line, lineIndex) => (
                                <p key={lineIndex} className="text-gray-700 leading-relaxed">
                                    {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                                </p>
                            ))}
                            {bulletItems.length > 0 && (
                                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                                    <ul className="space-y-3">
                                        {bulletItems.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <div className="flex-1">
                                                    {item.bold && (
                                                        <span className="font-semibold text-gray-900 block mb-1">
                                                            {item.bold}
                                                        </span>
                                                    )}
                                                    {item.text && (
                                                        <span className="text-gray-700 leading-relaxed">
                                                            {item.text}
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                }

                const text = paragraph.trim();

                if (text.endsWith('?')) {
                    return (
                        <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                            <p className="text-blue-800 font-medium leading-relaxed">
                                {text.replace(/\*\*(.*?)\*\*/g, '$1')}
                            </p>
                        </div>
                    );
                }

                const parts = text.split(/(\*\*.*?\*\*)/);

                return (
                    <p key={index} className="text-gray-700 leading-relaxed">
                        {parts.map((part, partIndex) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                const boldText = part.slice(2, -2);
                                return (
                                    <span key={partIndex} className="font-semibold text-gray-900">
                                        {boldText}
                                    </span>
                                );
                            }
                            return part;
                        })}
                    </p>
                );
            })}
        </div>
    );
};

const HealthConsultationInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [savedChats, setSavedChats] = useState({});
    const [currentChatTitle, setCurrentChatTitle] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [autoScroll, setAutoScroll] = useState(true);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        const savedData = localStorage.getItem("healthChatHistory");
        if (savedData) {
            setSavedChats(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("healthChatHistory", JSON.stringify(savedChats));
    }, [savedChats]);

    useEffect(() => {
        if (autoScroll && messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            setTimeout(() => {
                container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
            }, 100);
        }
    }, [messages, loading, autoScroll]);

    const handleScroll = (e) => {
        const container = e.target;
        if (!container) return;
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100;
        setAutoScroll(isAtBottom);
    };

    const scrollToTop = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            setAutoScroll(false);
        }
    };

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
            setAutoScroll(true);
        }
    };

    const fetchAIResponse = useCallback(async (prompt) => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("API key is missing. Please add your Gemini API key.");
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

      const promptWithDisclaimer = `As an AI assistant, I can provide general health information and suggestions, but this should not be considered medical advice. Please consult healthcare professionals for specific medical concerns. Query: ${prompt}`;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: promptWithDisclaimer,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(
            `Error: ${response.status} - ${
              errorData.error?.message || response.statusText
            }`
          );
        }

        const data = await response.json();

        // Extract the response text from the correct Gemini API structure
        const responseText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I couldn't generate a response. Please try again.";

        return responseText;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }, []);
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!inputMessage.trim() || loading) return;

      const newMessage = {
        role: "user",
        content: inputMessage,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");
      setLoading(true);

      try {
        const aiResponse = await fetchAIResponse(inputMessage);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: aiResponse,
            timestamp: new Date().toISOString(),
          },
        ]);

        if (currentChatTitle === "") {
          setShowSaveDialog(true);
        }
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `There was an error: ${error.message}. Please check your API key and network connection.`,
            timestamp: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

   
    const handleSaveChat = () => {
        if (!currentChatTitle.trim()) return;
        setSavedChats((prev) => ({
            ...prev,
            [currentChatTitle]: {
                messages: [...messages, { role: "assistant", content: "...", timestamp: new Date().toISOString() }], // Add placeholder for last AI message
                timestamp: new Date().toISOString(),
                firstQuestion: messages[0]?.content || "",
            },
        }));
        setShowSaveDialog(false);
    };
    
    const loadChat = (title) => {
        if (savedChats[title]) {
            setMessages(savedChats[title].messages.slice(0, -1)); // Remove placeholder
            setCurrentChatTitle(title);
            setAutoScroll(true);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
            setTimeout(() => scrollToBottom(), 200);
        }
    };

    const deleteChat = (title, e) => {
        e.stopPropagation();
        const newSavedChats = { ...savedChats };
        delete newSavedChats[title];
        setSavedChats(newSavedChats);
        if (currentChatTitle === title) {
            startNewChat();
        }
    };

    const startNewChat = () => {
        setMessages([]);
        setCurrentChatTitle("");
        setAutoScroll(true);
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    const filteredChats = Object.entries(savedChats)
        .filter(([title]) => title.toLowerCase().includes(searchTerm.toLowerCase()) || savedChats[title].firstQuestion.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => new Date(b[1].timestamp) - new Date(a[1].timestamp));

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString(undefined, {
            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
        });
    };
    
    // --- Render logic and JSX components ---
    
    const ChatHistory = () => (
     <aside
       className={`${
         sidebarOpen ? "fixed inset-y-0 left-0 z-50" : "hidden"
       } md:relative md:block bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 h-full overflow-hidden flex flex-col w-full md:w-72 lg:w-80 transition-all duration-300 shadow-lg`}
     >
       <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-white">
         <h2 className="font-bold text-lg flex items-center gap-3 text-gray-800">
           <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
             <FolderOpen size={18} className="text-white" />
           </div>
           Consultations
         </h2>
         <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
           <X size={20} className="text-gray-600" />
         </button>
       </div>
        <div className="p-4 border-b border-gray-200 bg-white">
            <button onClick={startNewChat} className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <span className="text-xs font-bold">+</span>
                </div>
                New Consultation
            </button>
        </div>
       <div className="p-4 border-b border-gray-200 bg-white">
         <div className="relative">
           <input type="text" placeholder="Search consultations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 focus:bg-white transition-all duration-200" />
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
           {searchTerm && <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"><X size={14} className="text-gray-400 hover:text-gray-600" /></button>}
         </div>
       </div>
       <div className="flex-1 overflow-y-auto p-3 bg-gradient-to-b from-white to-gray-50">
         {filteredChats.length > 0 ? (
           <div className="space-y-2">
             {filteredChats.map(([title, chat]) => (
               <div key={title} onClick={() => loadChat(title)} className={`p-4 rounded-xl hover:bg-white cursor-pointer relative group transition-all duration-200 border ${currentChatTitle === title ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md" : "bg-white border-gray-100 hover:shadow-md hover:border-gray-200"}`}>
                 <div className="font-semibold truncate text-gray-800 mb-1">{title}</div>
                 <div className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">{chat.firstQuestion}</div>
                 <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                   <div className="w-1 h-1 bg-gray-400 rounded-full"></div>{formatTimestamp(chat.timestamp)}
                 </div>
                 <button onClick={(e) => deleteChat(title, e)} className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded-full transition-all duration-200" aria-label="Delete chat">
                   <Trash2 size={14} className="text-gray-400 hover:text-red-500" />
                 </button>
               </div>
             ))}
           </div>
         ) : searchTerm ? (
            <div className="text-center text-gray-500 py-12"><Search size={32} className="mx-auto mb-3 opacity-50" /><p className="font-medium">No consultations found</p><p className="text-sm">Try a different search term</p></div>
         ) : (
            <div className="text-center text-gray-500 py-12"><FolderOpen size={32} className="mx-auto mb-3 opacity-50" /><p className="font-medium">No saved consultations</p><p className="text-sm">Start a new conversation to save it</p></div>
         )}
       </div>
     </aside>
   );
   
   const SaveDialog = () => showSaveDialog && (
     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
       <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100">
         <div className="flex items-center gap-3 mb-6">
           <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl"><Save size={20} className="text-white" /></div>
           <h3 className="text-xl font-bold text-gray-800">Save Consultation</h3>
         </div>
         <p className="text-gray-600 mb-6 leading-relaxed">Give this consultation a memorable name so you can easily find it later.</p>
         <input type="text" placeholder="Enter a title..." value={currentChatTitle} onChange={(e) => setCurrentChatTitle(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl mb-6 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-gray-50 focus:bg-white transition-all duration-200" autoFocus />
         <div className="flex justify-end gap-3">
           <button onClick={() => setShowSaveDialog(false)} className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors font-medium">Cancel</button>
           <button onClick={handleSaveChat} disabled={!currentChatTitle.trim()} className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg"><Save size={16} /> Save Chat</button>
         </div>
       </div>
     </div>
   );

    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans">
            <div className="md:hidden sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm">
                <div className="flex items-center justify-between p-4">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Menu size={20} className="text-gray-700" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
                            <Bot size={18} className="text-white" />
                        </div>
                        <h1 className="font-bold text-lg text-gray-800">Health Assistant</h1>
                    </div>
                    <div className="w-10"></div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <ChatHistory />
                <main className="flex-1 flex flex-col h-full bg-white shadow-xl md:rounded-tl-2xl overflow-hidden relative">
                    <div className="flex-1 flex flex-col p-4 sm:p-6 min-h-0">
                        <div className="mb-4 flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
                            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-semibold text-blue-800 mb-1">Medical Disclaimer</h4>
                                <p className="text-sm text-blue-700 leading-relaxed">
                                    This AI provides general health info only. Always consult a healthcare professional for medical advice.
                                </p>
                            </div>
                        </div>

                        <div ref={messagesContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto space-y-4 p-2 -mx-2">
                           {messages.length === 0 ? (
                             <div className="flex flex-col items-center justify-center h-full text-center py-10">
                               <div className="relative mb-6">
                                 <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-20 animate-pulse"></div>
                                 <div className="relative bg-white p-4 rounded-full shadow-lg border border-gray-100"><Bot size={48} className="text-green-500" /></div>
                               </div>
                               <h3 className="text-2xl font-bold mb-3 text-gray-800">Health Assistant</h3>
                               <p className="max-w-md text-gray-600 leading-relaxed">Ask any general health questions for information and guidance.</p>
                             </div>
                           ) : (
                                messages.map((message, index) => (
                                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} items-end gap-3`}>
                                        {message.role === "assistant" && <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-gray-200"><Bot size={16} className="text-gray-600" /></div>}
                                        <div className={`p-4 rounded-2xl max-w-lg ${message.role === "user" ? "bg-green-500 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"}`}>
                                            {message.role === "assistant" ? <FormattedAIResponse content={message.content} /> : <div className="whitespace-pre-wrap">{message.content}</div>}
                                        </div>
                                        {message.role === "user" && <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white"><User size={16} /></div>}
                                    </div>
                                ))
                            )}
                            {loading && (
                                <div className="flex justify-start items-end gap-3">
                                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-gray-200"><Bot size={16} className="text-gray-600" /></div>
                                    <div className="p-4 rounded-2xl bg-gray-100 text-gray-500 rounded-bl-none">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                            <span>Thinking...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {messages.length > 3 && (
                            <div className="absolute right-4 bottom-24 flex flex-col gap-2 z-10">
                                <button onClick={scrollToTop} className="p-2 bg-white border rounded-full shadow-md hover:bg-gray-100 transition" title="Scroll to top"><ChevronUp size={16} className="text-gray-600" /></button>
                                {!autoScroll && <button onClick={scrollToBottom} className="p-2 bg-green-500 border rounded-full shadow-md hover:bg-green-600 transition" title="Scroll to bottom"><ChevronDown size={16} className="text-white" /></button>}
                            </div>
                        )}

                        <div className="mt-auto pt-4">
                            <form onSubmit={handleSubmit} className="flex gap-3">
                                <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Ask anything about health..." className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50" disabled={loading} />
                                <button type="submit" disabled={loading || !inputMessage.trim()} className="px-5 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed shadow-md transition-colors flex items-center justify-center">
                                    {loading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            <SaveDialog />
        </div>
    );
};


export default HealthConsultationInterface;
