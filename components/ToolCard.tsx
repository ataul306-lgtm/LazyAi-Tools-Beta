import React from 'react';
import { Tool } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const Icon = tool.icon;

  return (
    <button
      onClick={() => onClick(tool)}
      className="group flex flex-col items-start text-left bg-[#161b22] border border-gray-800 p-6 rounded-xl hover:border-emerald-500/50 hover:bg-[#1c222b] transition-all duration-300 relative overflow-hidden h-full"
    >
      {/* Glow effect on hover */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="mb-4 p-3 rounded-lg bg-gray-900/50 border border-gray-800 text-emerald-400 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-colors">
        <Icon size={24} />
      </div>

      <div className="flex-1 w-full">
        <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-emerald-400 transition-colors flex items-center justify-between w-full">
          {tool.name}
          <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 translate-x-1" />
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {tool.isNew && (
        <span className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-500/20">
          NEW
        </span>
      )}
    </button>
  );
};

export default ToolCard;