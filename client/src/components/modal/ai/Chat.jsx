import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MoreHorizontal } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { CornerRightUp } from 'lucide-react';

const ChatBotUI = () => {
      const [messages, setMessages] = useState([
            {
                  id: 1,
                  text: "Hello! I'm Moji, your AI assistant. How can I help you today?",
                  sender: 'ai',
                  timestamp: new Date()
            }
      ]);
      const [inputText, setInputText] = useState('');
      const [isTyping, setIsTyping] = useState(false);
      const messagesEndRef = useRef(null);

      const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      useEffect(() => {
            scrollToBottom();
      }, [messages]);

      const handleSendMessage = async () => {
            if (!inputText.trim()) return;

            const userMessage = {
                  id: Date.now(),
                  text: inputText,
                  sender: 'user',
                  timestamp: new Date()
            };

            setMessages(prev => [...prev, userMessage]);
            setInputText('');
            setIsTyping(true);

            setTimeout(() => {
                  const aiResponse = {
                        id: Date.now() + 1,
                        text: "I understand your question. Let me help you with that. This is a sample response to demonstrate the chat interface. I can assist you with various tasks including answering questions, writing, analysis, and more.",
                        sender: 'ai',
                        timestamp: new Date()
                  };
                  setMessages(prev => [...prev, aiResponse]);
                  setIsTyping(false);
            }, 2000);
      };


      const MessageCard = ({ message }) => {
            const isUser = message.sender === 'user';

            return (
                  <div className={`group relative mb-4 ${isUser ? 'flex justify-end' : 'justify-start'}`}>
                        <div className="flex  bg-slate-400/20  p-4 rounded-2xl items-start gap-2">
                              {/* Avatar */}
                              <div className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center text-white font-medium text-sm ${isUser ? 'bg-green-600' : 'bg-black'
                                    }`}>
                                    {isUser ? (
                                          <User className="w-4 h-4" />
                                    ) : (
                                          <Bot className="w-4 h-4" />
                                    )}
                              </div>

                              {/* Message Content */}
                              <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-900 mb-">
                                          {isUser ? 'You' : 'AI'}
                                    </div>
                                    <div className="prose prose-sm max-w-none">
                                          <p className="text-gray-800 text-xs leading-relaxed whitespace-pre-wrap">{message.text}</p>
                                    </div>
                              </div>

                              {/* Action Menu */}
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                                          <MoreHorizontal className="w-4 h-4" />
                                    </button>
                              </div>
                        </div>
                  </div>
            );
      };

      const TypingIndicator = () => (
            <div className="mb-8">
                  <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-black flex items-center justify-center text-white">
                              <Bot className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 mb-2">AI</div>
                              <div className="flex items-center gap-1">
                                    <div className="flex space-x-1">
                                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );

      return (
            <div className="flex relative  flex-col h-[87vh] bg-white">
                  {/* Messages Container */}
                  <div className="flex-1 overflow-y-auto pb-[1.5rem]">
                        <div className="max-w-3xl mx-auto px-4 py-8">
                              {messages.map((message) => (
                                    <MessageCard key={message.id} message={message} />
                              ))}
                              {isTyping && <TypingIndicator />}
                              <div ref={messagesEndRef} />
                        </div>
                  </div>
                  {/* Input Area */}
                  <div className="flex absolute px-3 bg-white w-full bottom-0 items-start gap-3">
                        <Textarea onChange={(e) => setInputText(e.target.value)} value={inputText} className={""} placeholder="Ask anything" />
                        <div onClick={handleSendMessage} className="p-1 rounded-full flex items-center justify-center text-white bg-primary"><CornerRightUp className='h-4 w-4 cursor-pointer' /></div>
                  </div>

            </div>
      );
};

export default ChatBotUI;