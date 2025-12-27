
export interface Task {
  id: string;
  name: string;
  description: string;
  category: string;
  energyPoints: number; // 1-5
  durationMinutes: number;
  status: 'draft' | 'scheduled' | 'done';
  date?: string; // ISO date
}

export interface DayFlow {
  date: string;
  tasks: Task[];
}

export enum AppView {
  INTAKE = 'INTAKE',
  PRISM = 'PRISM',
  DASHBOARD = 'DASHBOARD'
}
