
import React, { useState, useEffect } from 'react';
import AuroraBackground from './components/AuroraBackground';
import IntakeVessel from './components/IntakeVessel';
import PrismView from './components/PrismView';
import FlowDashboard from './components/FlowDashboard';
import { AppView, Task, DayFlow } from './types';
import { synthesizeBrainDump } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.INTAKE);
  const [loading, setLoading] = useState(false);
  const [prismTasks, setPrismTasks] = useState<Task[]>([]);
  const [scheduledFlows, setScheduledFlows] = useState<DayFlow[]>([]);

  // Initialize with some empty days
  useEffect(() => {
    const today = new Date();
    const initialFlows: DayFlow[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      initialFlows.push({
        date: d.toISOString().split('T')[0],
        tasks: []
      });
    }
    setScheduledFlows(initialFlows);
  }, []);

  const handleSynthesize = async (text: string, imageData?: string) => {
    setLoading(true);
    try {
      const tasks = await synthesizeBrainDump(text, imageData);
      setPrismTasks(tasks);
      setView(AppView.PRISM);
    } catch (error) {
      console.error("Synthesis failed:", error);
      alert("The vibe was interrupted. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmTasks = (tasks: Task[]) => {
    // Distribute tasks into the first available day for demo purposes
    setScheduledFlows(prev => {
      const next = [...prev];
      next[0].tasks = [...next[0].tasks, ...tasks.map(t => ({ ...t, status: 'scheduled' as const }))];
      return next;
    });
    setView(AppView.DASHBOARD);
  };

  const handleToggleTask = (taskId: string) => {
    setScheduledFlows(prev => prev.map(flow => ({
      ...flow,
      tasks: flow.tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: task.status === 'done' ? 'scheduled' : 'done' } 
          : task
      )
    })));
  };

  return (
    <AuroraBackground>
      {view === AppView.INTAKE && (
        <IntakeVessel 
          onSynthesize={handleSynthesize} 
          isLoading={loading} 
        />
      )}
      
      {view === AppView.PRISM && (
        <PrismView 
          tasks={prismTasks} 
          onConfirm={handleConfirmTasks} 
          onCancel={() => setView(AppView.INTAKE)} 
        />
      )}

      {view === AppView.DASHBOARD && (
        <FlowDashboard 
          dayFlows={scheduledFlows} 
          onAddTask={() => setView(AppView.INTAKE)}
          onToggleTask={handleToggleTask}
        />
      )}

      {/* Bottom Nav Hint */}
      {view !== AppView.INTAKE && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
          <nav className="flex gap-4 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl">
             <button 
                onClick={() => setView(AppView.INTAKE)}
                className={`p-3 rounded-full transition-all ${view === AppView.INTAKE ? 'bg-white text-black' : 'text-white/60 hover:bg-white/5'}`}
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth={2}/></svg>
             </button>
             <button 
                onClick={() => setView(AppView.DASHBOARD)}
                className={`p-3 rounded-full transition-all ${view === AppView.DASHBOARD ? 'bg-white text-black' : 'text-white/60 hover:bg-white/5'}`}
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7" strokeWidth={2}/></svg>
             </button>
          </nav>
        </div>
      )}
    </AuroraBackground>
  );
};

export default App;
