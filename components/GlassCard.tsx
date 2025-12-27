
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[24px] 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300
        hover:bg-white/10 hover:border-white/20
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
