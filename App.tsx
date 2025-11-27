import React, { useState, useMemo, useEffect } from 'react';
import { TOOLS, CATEGORIES } from './constants';
import { Tool, ToolCategory } from './types';
import ToolCard from './components/ToolCard';
import ActiveToolView from './components/ActiveToolView';
import { Search, Zap, Command, Menu, X, Github, Twitter, Mail, CheckCircle, Settings, Key, Save, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>(ToolCategory.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Settings / API Key State
  const [showSettings, setShowSettings] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const [tempApiKey, setTempApiKey] = useState(''); // For the input field

  // Load custom key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('lazy_custom_api_key');
    if (savedKey) {
      setCustomApiKey(savedKey);
      setTempApiKey(savedKey);
    }
  }, []);

  // Trigger newsletter popup logic
  useEffect(() => {
    // Check if user has already seen/closed the popup or subscribed
    const hasSeenNewsletter = localStorage.getItem('lazy_newsletter_seen');
    
    if (!hasSeenNewsletter) {
      const timer = setTimeout(() => {
        setShowNewsletter(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Filter logic
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory = selectedCategory === ToolCategory.ALL || tool.category === selectedCategory;
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handlers
  const handleToolClick = (tool: Tool) => {
    setActiveTool(tool);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveTool(null);
  };

  const closeNewsletter = () => {
    setShowNewsletter(false);
    // Remember that the user closed it so it doesn't pop up again immediately
    localStorage.setItem('lazy_newsletter_seen', 'true');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    // Save subscription status
    localStorage.setItem('lazy_newsletter_seen', 'true');
    
    // Close modal after a brief success message
    setTimeout(() => {
      setShowNewsletter(false);
      setIsSubscribed(false); // Reset for next time if needed, though modal won't show
    }, 2000);
  };

  const handleSaveApiKey = () => {
    localStorage.setItem('lazy_custom_api_key', tempApiKey);
    setCustomApiKey(tempApiKey);
    setShowSettings(false);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('lazy_custom_api_key');
    setCustomApiKey('');
    setTempApiKey('');
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0f1115]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTool(null)}>
            <div className="bg-emerald-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Zap size={20} className="text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Lazy<span className="text-emerald-400">Ai-Tools</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">
              Beta
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" onClick={() => setActiveTool(null)} className="text-sm font-medium hover:text-emerald-400 transition-colors">Home</a>
            <a href="#" className="text-sm font-medium hover:text-emerald-400 transition-colors">All Tools</a>
            
            <button 
              onClick={() => setShowSettings(true)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${customApiKey ? 'text-purple-400 bg-purple-500/10 hover:bg-purple-500/20' : 'text-gray-400 hover:text-emerald-400'}`}
              title="Settings & API Key"
            >
              <Settings size={18} />
              {customApiKey && <span>Custom Key</span>}
            </button>

            <div className="h-4 w-px bg-gray-800"></div>
            <div className="flex items-center gap-4 text-gray-400">
               <Github size={18} className="hover:text-white cursor-pointer" />
               <Twitter size={18} className="hover:text-blue-400 cursor-pointer" />
            </div>
            <button 
              onClick={() => setShowNewsletter(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-lg shadow-emerald-900/20"
            >
              Get Updates
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setShowSettings(true)}
              className={`p-2 ${customApiKey ? 'text-purple-400' : 'text-gray-400'}`}
            >
              <Settings size={20} />
            </button>
            <button 
              className="p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {activeTool ? (
          <ActiveToolView tool={activeTool} onBack={handleBack} customApiKey={customApiKey} />
        ) : (
          <>
            {/* Hero / Intro Section */}
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Free AI-Powered Tools for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Lazy Devs</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8">
                60+ professional tools for developers, designers, and marketers. 
                Running on your own free API keys. Why pay monthly fees?
              </p>

              {/* Search Bar */}
              <div className="relative max-w-lg mx-auto group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-[#0f1115] rounded-lg flex items-center px-4 py-3 border border-gray-700 focus-within:border-emerald-500/50 shadow-2xl">
                  <Search size={20} className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    placeholder="Search tools (e.g., 'email', 'code', 'color')..."
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="hidden sm:flex items-center gap-1 text-xs text-gray-600 border border-gray-800 px-1.5 py-0.5 rounded ml-2">
                    <Command size={10} />
                    <span>K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                      : 'bg-[#161b22] text-gray-400 border border-gray-800 hover:border-gray-600 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tool Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} onClick={handleToolClick} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="inline-block p-4 rounded-full bg-gray-800/50 mb-4">
                    <Search size={32} className="text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
                  <p className="text-gray-500">Try adjusting your search or category filter.</p>
                </div>
              )}
            </div>

            <div className="mt-12 text-center text-sm text-gray-600 flex justify-center gap-4">
              <span>{filteredTools.length} Tools Available</span>
              <span>•</span>
              <span>Updated Daily</span>
            </div>

            {/* Newsletter Inline Section */}
            <div className="mt-20 mb-4 relative rounded-2xl bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/20 overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>
              <div className="relative p-8 md:p-12 text-center">
                <div className="inline-block p-3 rounded-full bg-emerald-500/10 mb-6">
                  <Mail size={32} className="text-emerald-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Stay Lazy, Stay Ahead</h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-8">
                  Join 10,000+ developers receiving the best free AI tools, prompts, and automation scripts directly in their inbox.
                </p>
                <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
                  {isSubscribed ? (
                     <div className="w-full bg-emerald-500/20 border border-emerald-500 text-emerald-300 px-6 py-3 rounded-lg flex items-center justify-center gap-2">
                       <CheckCircle size={20} />
                       <span>Subscribed successfully!</span>
                     </div>
                  ) : (
                    <>
                      <input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors placeholder-gray-600"
                        required
                      />
                      <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-lg transition-all whitespace-nowrap shadow-lg shadow-emerald-900/30">
                        Subscribe Free
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#0f1115] mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <div className="flex items-center justify-center gap-2 mb-4 opacity-70 grayscale hover:grayscale-0 transition-all">
             <Zap size={24} className="text-emerald-500" fill="currentColor" />
             <span className="text-xl font-bold text-white">Lazy Ai-Tools</span>
           </div>
           <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
             Self-managed hosting 2.0. Stop paying for what you can own.
             Host it yourself using open source LLMs and Free APIs.
           </p>
           <div className="flex justify-center gap-6 text-sm text-gray-500">
             <a href="#" className="hover:text-emerald-400">Privacy</a>
             <a href="#" className="hover:text-emerald-400">Terms</a>
             <a href="#" className="hover:text-emerald-400">Contact</a>
           </div>
           <div className="mt-8 text-xs text-gray-700">
             &copy; 2025 Lazy Ai-Tools. All rights reserved.
           </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0f1115] p-6 md:hidden">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold text-white">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-lg font-medium text-gray-300">
            <a href="#" onClick={() => { setActiveTool(null); setMobileMenuOpen(false); }}>Home</a>
            <a href="#">All Tools</a>
            <a href="#" onClick={() => { setShowSettings(true); setMobileMenuOpen(false); }}>Settings</a>
            <a href="#" className="text-emerald-400">Join Newsletter</a>
          </nav>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setShowSettings(false)} />
          <div className="relative bg-[#161b22] border border-gray-700 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-800 rounded-lg text-gray-300">
                  <Settings size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Settings</h3>
              </div>
              <button 
                onClick={() => setShowSettings(false)} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Custom Gemini API Key
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Key size={16} />
                  </div>
                  <input 
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    placeholder="Enter your Gemini API Key..."
                    className="w-full bg-black/40 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-emerald-500 outline-none transition-all placeholder-gray-600 font-mono text-sm"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Your key is stored locally in your browser and used for all requests. 
                  Leave empty to use the shared free tier.
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={handleSaveApiKey}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Save Key
                </button>
                {customApiKey && (
                  <button 
                    onClick={handleClearApiKey}
                    className="px-4 py-2.5 bg-red-900/20 border border-red-900/50 text-red-400 hover:bg-red-900/40 rounded-lg transition-all"
                    title="Clear saved key"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Popup Modal */}
      {showNewsletter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={closeNewsletter} />
          <div className="relative bg-[#161b22] border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={closeNewsletter} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <Mail size={28} className="text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Don't be Busy. Be Lazy.</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Unlock the full list of 60+ free AI tools and get weekly automation scripts delivered to your inbox.
              </p>
              
              {isSubscribed ? (
                <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 p-4 rounded-lg flex items-center justify-center gap-2">
                  <CheckCircle size={20} />
                  <span>Welcome to the club!</span>
                </div>
              ) : (
                <form className="space-y-3" onSubmit={handleSubscribe}>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 outline-none transition-all placeholder-gray-600"
                    required 
                    autoFocus
                  />
                  <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-emerald-900/30">
                    Join Free
                  </button>
                </form>
              )}
              
              {!isSubscribed && (
                <p className="mt-4 text-xs text-gray-600">
                  No spam. Unsubscribe anytime.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;