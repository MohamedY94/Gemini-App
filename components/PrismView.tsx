
import React from 'react';
import { Task } from '../types';
import GlassCard from './GlassCard';

interface PrismViewProps {
  tasks: Task[];
  onConfirm: (tasks: Task[]) => void;
  onCancel: () => void;
}

const PrismView: React.FC<PrismViewProps> = ({ tasks, onConfirm, onCancel }) => {
  return (
    <div className="flex-1 flex flex-col items-center p-8 overflow-y-auto animate-in slide-in-from-bottom-10 duration-700">
      <div className="w-full max-w-3xl flex items-center justify-between mb-12">
        <h2 className="text-4xl font-light">The Prism Output</h2>
        <div className="flex gap-4">
          <button onClick={onCancel} className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/5 transition-all">Cancel</button>
          <button onClick={() => onConfirm(tasks)} className="px-6 py-2 rounded-full bg-white text-black hover:bg-white/90 transition-all font-medium">Activate Plan</button>
        </div>
      </div>

      <div className="grid gap-6 w-full max-w-3xl">
        {tasks.map((task) => (
          <GlassCard key={task.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold px-2 py-1 bg-indigo-500/10 rounded mb-2 inline-block">
                  {task.category}
                </span>
                <h3 className="text-2xl font-medium">{task.name}</h3>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: task.energyPoints }).map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                ))}
              </div>
            </div>
            <p className="text-white/60 text-lg mb-6">{task.description}</p>
            <div className="flex items-center text-sm text-white/40 gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2}/></svg>
                {task.durationMinutes} mins
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth={2}/></svg>
                {task.energyPoints} Energy Points
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default PrismView;
