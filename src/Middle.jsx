import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState, useRef, useEffect } from 'react';
import send from './assets/send.png';

import woman from './assets/woman.png';
import File from './File';
import Mic from './Mic';
import gemini from './assets/gemini.png';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

function Middle({ setRecentPrompts }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState({
    name: '2.5 Flash',
    description: 'Fast all-round help',
    id: 'flash',
  });
  
  const models = [
    { name: '2.5 Flash', description: 'Fast all-round help', id: 'flash' },
    { name: '2.5 Pro', description: 'Reasoning, maths and code', id: 'pro' },
  ];

  const toggleDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleModelClick = (model) => {
    setSelectedModel(model);
    setIsMenuOpen(false);
  };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !API_KEY) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setRecentPrompts((prevPrompts) => {
      const isExisting = prevPrompts.some((p) => p.text === input);
      if (!isExisting) {
        const newPrompt = { id: Date.now(), text: input };
        return [newPrompt, ...prevPrompts].slice(0, 7);
      }
      return prevPrompts;
    });

    setInput('');
    setLoading(true);

    const currentModel = genAI.getGenerativeModel({
      model: selectedModel.id === 'flash' ? 'gemini-1.5-flash' : 'gemini-1.5-pro',
    });

    try {
      const result = await currentModel.generateContent(input);
      const response = await result.response;
      const text = response.text();
      const geminiMessage = { text, sender: 'gemini' };
      setMessages((prevMessages) => [...prevMessages, geminiMessage]);
    } catch (error) {
      console.error('Error generating content:', error);
      const errorMessage = { text: 'Sorry, something went wrong. Please try again.', sender: 'gemini' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='middle-container flex flex-col h-screen'>
      <div className="gemini-dropdown-wrapper  ml-5 ">
        <div className="gemini-header-container " onClick={toggleDropdown}>
          <h1 className="gemini-title text-2xl mt-2 ml-6">Gemini</h1>
          <div className="gemini-dropdown-header ml-3 bg-zinc-800  text-center rounded-2xl mt-2  h-8 w-30">
            <span className="gemini-model-name ">{selectedModel.name}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>

        {isMenuOpen && (
          <div className="gemini-dropdown-menu ml-5 bg-zinc-800 w-60 rounded-xl  mt-2.5 ">
            <div className="gemini-menu-title ml-3">Choose your model</div>
            {models.map((model) => (
              <div
                key={model.id}
                className={`gemini-menu-item ${selectedModel.id === model.id ? 'selected' : ''}`}
                onClick={() => handleModelClick(model)}
              >
                <div className="gemini-item-text">
                  <div className="gemini-item-title ml-3">{model.description}</div>
                  
                  <div className="gemini-item-subtitle ml-3">{model.name}</div>
                </div>
               
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="profile-image-container absolute top-4 right-18">
        <img src={woman} alt="Woman" className=" fixed w-10 h-10 rounded-full" />
      </div>
      <div className="main-container flex flex-col h-full">
        {messages.length === 0 && (
          <div className="welcome-section fixed mt-80 flex-col ml-150 items-center justify-center flex-1">
            <div className="intro-text   4 text-2xl text-center text-opacity-60 fixed">
              <h1 className='text-blue-800  h-10 '>Hello,User</h1>
              <h1 className='text-white-200 '>Want to try out a few things ?</h1>
            </div>
          </div>
        )}

        <div className="app-container text-centre align-centre ml-100 h-screen">
          <div className="chat-window flex-1 h-100   w-200 aligin-centre text-centre   p-4 pb-4" ref={chatWindowRef}>
            {messages.map((msg, index) => (
              <div
        key={index}
        className={`chat-message px-4 py-3 rounded-3xl ml-10 overflow w-fit shadow-md mb-2 max-w-xl ${msg.sender === 'user' ? 'bg-zinc-800 text-white rounded-br-lg ml-100' : '  text-white rounded-bl-lg'}`}
    >
        <p className='h screen'>{msg.text}</p>
    </div>
            ))}
            {loading && <div className="loading-indicator ml-2 w-5"><img src={gemini}/>Thinking...</div>}
          </div>

          <form onSubmit={handleSendMessage} className="input-form fixed bottom-0 mb-2 ml-20 w-330 items-centre bg-zinc-900 justify-center p-100%">
            <div className=" input-group overflow-hidden w-330 max-w-xl   items-center border rounded-2xl">
              <div>
               <div className=' mt-0.5 flex gap-70 '><input
                type="text"
                className='   text-xl p-2 focus:outline-none'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Gemini"
              />

              <div className=" ">
                <button type="submit" disabled={loading} className="p-2 ml-2">
                  <img className="w-8 filter invert" src={send} alt="Send" />
                  
                </button>
                </div>
                </div>
                <div>
                   <div className='flex'>
                    <File />
                  <Mic/>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Middle;