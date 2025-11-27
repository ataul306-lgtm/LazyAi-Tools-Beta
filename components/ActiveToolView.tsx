import React, { useState, useEffect } from 'react';
import { Tool, InputType, GenerationState } from '../types';
import { generateToolContent } from '../services/geminiService';
import { ArrowLeft, Sparkles, Copy, Check, AlertCircle, ShieldCheck, Key } from 'lucide-react';

interface ActiveToolViewProps {
  tool: Tool;
  onBack: () => void;
  customApiKey?: string;
}

const ActiveToolView: React.FC<ActiveToolViewProps> = ({ tool, onBack, customApiKey }) => {
  const [input, setInput] = useState('');
  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    result: null,
    error: null,
  });
  const [copied, setCopied] = useState(false);

  // Clear state when tool changes
  useEffect(() => {
    setInput('');
    setState({ isLoading: false, result: null, error: null });
    setCopied(false);
  }, [tool.id]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setState({ isLoading: true, result: null, error: null });
    try {
      const result = await generateToolContent(tool.systemPrompt, input, customApiKey);
      setState({ isLoading: false, result, error: null });
    } catch (err: any) {
      setState({ 
        isLoading: false, 
        result: null, 
        error: err.message || 'Something went wrong. Please try again.' 
      });
    }
  };

  const handleCopy = () => {
    if (state.result) {
      navigator.clipboard.writeText(state.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const Icon = tool.icon;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Breadcrumb / Back */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </button>

        <div className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border transition-colors ${
          customApiKey 
            ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' 
            : 'text-emerald-500/70 bg-emerald-500/5 border-emerald-500/10'
        }`}>
          {customApiKey ? <Key size={12} /> : <ShieldCheck size={12} />}
          <span>{customApiKey ? 'Using Custom API Key' : 'Runs on Free API Key'}</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <Icon size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{tool.name}</h1>
          <p className="text-gray-400">{tool.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Input */}
        <div className="space-y-6">
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 shadow-xl">
            <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
              Input
            </label>
            
            {tool.inputType === InputType.TEXTAREA || tool.inputType === InputType.CODE ? (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tool.inputPlaceholder}
                className="w-full h-64 bg-black/30 border border-gray-700 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none font-mono text-sm leading-relaxed placeholder-gray-600 transition-all"
              />
            ) : (
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tool.inputPlaceholder}
                className="w-full bg-black/30 border border-gray-700 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            )}

            <div className="mt-6">
              <button
                onClick={handleGenerate}
                disabled={state.isLoading || !input.trim()}
                className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  state.isLoading || !input.trim()
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                }`}
              >
                {state.isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} fill="currentColor" className="opacity-80" />
                    Generate Result
                  </>
                )}
              </button>
            </div>
            
            <p className="mt-4 text-xs text-center text-gray-500">
              Powered by Gemini AI. {customApiKey ? 'Using Personal Key.' : 'No monthly fees.'}
            </p>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="flex flex-col h-full min-h-[400px]">
          <div className="flex items-center justify-between mb-3">
             <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
              {tool.outputLabel}
            </label>
            {state.result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
            )}
          </div>

          <div className={`flex-1 bg-[#161b22] border rounded-xl p-6 overflow-auto shadow-inner transition-colors ${state.error ? 'border-red-900/50 bg-red-900/10' : 'border-gray-800'}`}>
            {state.error ? (
              <div className="flex flex-col items-center justify-center h-full text-red-400 text-center">
                <AlertCircle size={48} className="mb-4 opacity-50" />
                <p className="font-medium">{state.error}</p>
              </div>
            ) : state.result ? (
              <div className="prose prose-invert prose-emerald max-w-none text-gray-300">
                <pre className="whitespace-pre-wrap font-mono text-sm bg-transparent p-0 border-0">
                  {state.result}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-600">
                <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                  <Sparkles size={32} className="opacity-20" />
                </div>
                <p className="text-sm">Enter input to generate content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveToolView;