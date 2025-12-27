
import React, { useState, useRef } from 'react';
import GlassCard from './GlassCard';

interface IntakeVesselProps {
  onSynthesize: (text: string, imageData?: string) => void;
  isLoading: boolean;
}

const IntakeVessel: React.FC<IntakeVesselProps> = ({ onSynthesize, isLoading }) => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (text || previewImage) {
      onSynthesize(text, previewImage || undefined);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would use the MediaRecorder API
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-1000">
      <h1 className="text-5xl font-light mb-4 tracking-tight">Let it all out.</h1>
      <p className="text-white/60 mb-12 text-lg">Brain dump your thoughts, sketches, or voice.</p>

      <div className="w-full max-w-2xl flex flex-col gap-8 items-center">
        {/* Voice Button */}
        <button 
          onClick={toggleRecording}
          disabled={isLoading}
          className={`
            w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500
            ${isRecording ? 'bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)] scale-110' : 'bg-white/10 hover:bg-white/20 scale-100'}
            disabled:opacity-50
          `}
        >
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 1v11m0 0a3 3 0 003 3h0a3 3 0 003-3V5a3 3 0 00-3-3h0a3 3 0 00-3 3v7m0 0a3 3 0 01-3 3h0a3 3 0 01-3-3V5a3 3 0 013-3h0a3 3 0 013 3v7m0 0a7 7 0 007 7h0a7 7 0 007-7v-1m-7 8v2m-3 0h6" />
          </svg>
        </button>

        {/* Text Input Area */}
        <div className="w-full relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Quick type your stream of consciousness..."
            className="w-full h-40 bg-white/5 border border-white/10 rounded-[24px] p-6 text-xl focus:outline-none focus:border-white/30 transition-all backdrop-blur-sm resize-none"
          />
          
          <div className="absolute bottom-4 right-4 flex gap-4">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {previewImage && (
          <div className="relative w-full max-w-xs animate-in zoom-in-95">
             <img src={previewImage} className="rounded-xl border border-white/20" alt="Preview" />
             <button 
                onClick={() => setPreviewImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /></svg>
             </button>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading || (!text && !previewImage)}
          className={`
            px-12 py-4 rounded-full text-xl font-medium transition-all
            ${isLoading ? 'bg-white/5 text-white/40' : 'bg-white text-black hover:scale-105 active:scale-95'}
          `}
        >
          {isLoading ? 'Processing...' : 'Synthesize'}
        </button>
      </div>
    </div>
  );
};

export default IntakeVessel;
