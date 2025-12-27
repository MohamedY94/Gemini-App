
import React from 'react';
import { Task, DayFlow } from '../types';
import GlassCard from './GlassCard';

interface FlowDashboardProps {
  dayFlows: DayFlow[];
  onAddTask: () => void;
  onToggleTask: (taskId: string) => void;
}

const FlowDashboard: React.FC<FlowDashboardProps> = ({ dayFlows, onAddTask, onToggleTask }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Header */}
      <header className="p-8 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5 sticky top-0 z-20">
        <h1 className="text-3xl font-light tracking-tight">Your Stream</h1>
        <button 
          onClick={onAddTask}
          className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </header>

      {/* Vertical Stream */}
      <div className="flex-1 overflow-y-auto p-8 space-y-12 pb-32">
        {dayFlows.map((flow) => (
          <div key={flow.date} className="relative">
            <div className="sticky top-0 z-10 py-4 mb-4 backdrop-blur-sm">
               <h2 className="text-xl font-medium text-white/50 uppercase tracking-widest flex items-center gap-4">
                 {new Date(flow.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                 <div className="h-[1px] flex-1 bg-white/10" />
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flow.tasks.length === 0 ? (
                <div className="col-span-full py-12 text-center text-white/20 border-2 border-dashed border-white/5 rounded-[24px]">
                  No waves in today's flow.
                </div>
              ) : (
                flow.tasks.map((task) => (
                  <GlassCard 
                    key={task.id} 
                    className={`p-6 cursor-pointer group ${task.status === 'done' ? 'opacity-40 grayscale' : ''}`}
                    onClick={() => onToggleTask(task.id)}
                  >
                    <div className="flex flex-col h-full">
                       <div className="flex justify-between items-start mb-2">
                         <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 opacity-80">{task.category}</span>
                         <div className="flex gap-0.5">
                            {Array.from({length: task.energyPoints}).map((_, i) => (
                               <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                            ))}
                         </div>
                       </div>
                       <h3 className={`text-xl font-medium mb-2 ${task.status === 'done' ? 'line-through' : ''}`}>
                         {task.name}
                       </h3>
                       <p className="text-white/50 text-sm line-clamp-2 mb-4">{task.description}</p>
                       <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                         <span className="text-xs text-white/30">{task.durationMinutes}m duration</span>
                         <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${task.status === 'done' ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/40'}`}>
                           {task.status === 'done' && (
                             <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth={3}/></svg>
                           )}
                         </div>
                       </div>
                    </div>
                  </GlassCard>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowDashboard;
