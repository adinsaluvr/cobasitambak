import React from 'react';
import { Play, Volume2, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface CoverScreenProps {
  onStart: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onStart }) => {
  const handleStart = () => {
    sound.playSplash();
    sound.playSuccess();
    onStart();
  };

  const handleTambiVoice = () => {
    sound.playClick();
    sound.speakDialogue('Halo teman-teman! Selamat datang di SI TAMBAK, Petualangan Sains di Ekosistem Tambak Sidoarjo!');
  };

  return (
    <div className="relative w-full h-full min-h-[580px] sm:min-h-[640px] flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden select-none">
      {/* Dynamic scenic background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('/assets/bg-tambak.jpg')`,
        }}
      >
        {/* Soft atmospheric overlay for vivid game contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300/25 via-transparent to-emerald-950/40 pointer-events-none" />
      </div>

      {/* Floating clouds and sun rays overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sky-400/20 to-transparent pointer-events-none" />

      {/* Main Top / Center Content: Game Logo & Title Banners */}
      <div className="relative z-20 flex flex-col items-center text-center mt-2 sm:mt-4 max-w-3xl animate-in fade-in zoom-in-95 duration-500">
        
        {/* Water Splash & Fish / Shrimp surrounding the SI TAMBAK Logo */}
        <div className="relative flex items-center justify-center my-1 sm:my-2">
          {/* Jumping Bandeng Fish (Left) */}
          <div className="hidden sm:block absolute -left-16 -top-4 w-20 h-20 md:w-24 md:h-24 animate-soft-float">
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="text-5xl md:text-6xl drop-shadow-[0_8px_8px_rgba(0,0,0,0.4)] transform -rotate-12">🐟</span>
              {/* Splash droplets */}
              <div className="absolute -top-1 right-2 text-cyan-300 text-lg animate-bounce">💧</div>
              <div className="absolute top-4 -left-1 text-cyan-200 text-sm animate-pulse">💦</div>
            </div>
          </div>

          {/* Jumping Tiger Shrimp (Right) */}
          <div className="hidden sm:block absolute -right-16 -top-4 w-20 h-20 md:w-24 md:h-24 animate-soft-float" style={{ animationDelay: '0.6s' }}>
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="text-5xl md:text-6xl drop-shadow-[0_8px_8px_rgba(0,0,0,0.4)] transform rotate-12 scale-x-[-1]">🦐</span>
              {/* Splash droplets */}
              <div className="absolute -top-1 left-2 text-cyan-300 text-lg animate-bounce">💧</div>
              <div className="absolute top-4 -right-1 text-cyan-200 text-sm animate-pulse">💦</div>
            </div>
          </div>

          {/* Combined Logo: "SI" in Bubbly Blue + "TAMBAK" in Big Golden 3D */}
          <div className="flex flex-col items-center">
            {/* "SI" in bubbly blue with 3D depth */}
            <div className="relative">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-game font-black tracking-wider text-sky-400 text-stroke-blue drop-shadow-[0_8px_16px_rgba(3,105,161,0.6)]">
                SI
              </h2>
              {/* Mini water splashes around 'SI' */}
              <span className="absolute -top-2 -left-3 text-cyan-300 text-xl animate-bounce">💦</span>
              <span className="absolute -top-1 -right-3 text-cyan-300 text-xl animate-bounce" style={{ animationDelay: '0.4s' }}>💦</span>
            </div>

            {/* "TAMBAK" in massive warm golden 3D cartoon style */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-game font-black tracking-tight text-amber-400 text-stroke-amber -mt-2 sm:-mt-4 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-transform">
              TAMBAK
            </h1>
          </div>
        </div>

        {/* Curved Wooden Plank: "PETUALANGAN DI EKOSISTEM TAMBAK SIDOARJO" */}
        <div className="relative px-6 py-2 sm:px-8 sm:py-2.5 rounded-2xl wood-board transform -rotate-0.5 shadow-xl max-w-xl sm:max-w-2xl mx-auto -mt-1 sm:-mt-2">
          {/* Wood grain highlight lines */}
          <div className="absolute inset-x-2 top-1 h-[1px] bg-amber-300/40 rounded-full" />
          <h3 className="text-white font-game font-black text-sm sm:text-lg md:text-xl uppercase tracking-wider text-stroke-wood text-center">
            PETUALANGAN DI EKOSISTEM TAMBAK SIDOARJO
          </h3>
        </div>

        {/* Cloud / Cream Ribbon: "Yuk, jelajahi rahasia kehidupan tambak bersama Tambi!" */}
        <div className="relative mt-2 sm:mt-3 px-5 py-1.5 sm:px-7 sm:py-2 bg-gradient-to-r from-amber-50 via-white to-amber-50 rounded-full border-2 border-amber-300 shadow-md flex items-center gap-2">
          <span className="text-sky-500 text-base">💧</span>
          <p className="font-game font-bold text-amber-950 text-xs sm:text-sm md:text-base">
            Yuk, jelajahi rahasia kehidupan tambak bersama Tambi!
          </p>
          <span className="text-sky-500 text-base">💧</span>
        </div>
      </div>

      {/* Tambi Character on the Left (Interactive & Animated) */}
      <div className="relative sm:absolute sm:bottom-0 sm:left-4 md:left-8 lg:left-14 z-20 flex flex-col items-center sm:items-start select-none">
        <div className="relative group cursor-pointer" onClick={handleTambiVoice}>
          {/* Character Image */}
          <div className="w-48 h-56 sm:w-64 sm:h-80 md:w-80 md:h-[400px] lg:w-96 lg:h-[440px] relative transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/assets/tambi-welcome.jpg" 
              alt="Karakter Tambi si Petambak Cilik Sidoarjo" 
              className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)] rounded-2xl"
            />
            {/* Subtle glow highlight behind Tambi */}
            <div className="absolute inset-0 bg-radial from-amber-400/20 to-transparent pointer-events-none rounded-full blur-xl" />
          </div>

          {/* Interactive Audio Button on Tambi's chest/vest matching Canva reference */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTambiVoice();
            }}
            className="absolute top-1/2 left-8 sm:left-12 -translate-y-4 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white border-2 border-white/80 shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group/btn"
            title="Dengarkan Suara Tambi"
            aria-label="Dengar Suara Tambi"
          >
            <Volume2 className="w-5 h-5 text-amber-300 group-hover/btn:animate-pulse" />
          </button>

          {/* Speech bubble indicator on hover */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-900 text-amber-100 text-xs font-game px-3 py-1 rounded-full shadow-lg whitespace-nowrap pointer-events-none">
            Klik aku untuk dengar Tambi! 👋
          </div>
        </div>
      </div>

      {/* Sidoarjo Tambak Signpost on the right (matching Canva cover) */}
      <div className="hidden lg:flex absolute bottom-16 right-10 z-10 flex-col items-center animate-soft-float" style={{ animationDelay: '1.2s' }}>
        <div className="wood-board px-5 py-3 rounded-2xl text-center shadow-2xl border-4 border-amber-950">
          <div className="text-amber-200 text-xs font-game tracking-widest uppercase">Kawasan Wisata Edukasi</div>
          <div className="text-white font-game font-bold text-lg text-stroke-wood">Tambak Sidoarjo</div>
          <div className="mt-1 w-8 h-8 mx-auto rounded-full bg-amber-900/80 border border-amber-300 flex items-center justify-center text-sm">
            🐟
          </div>
        </div>
        {/* Wooden pole */}
        <div className="w-4 h-16 bg-gradient-to-b from-amber-900 to-amber-950 border-x-2 border-amber-950 shadow-md -mt-1" />
      </div>

      {/* Bottom Center: Big 3D "MULAI PETUALANGAN" Game Button */}
      <div className="relative z-30 flex flex-col items-center mt-4 sm:mt-auto mb-2 sm:mb-8">
        <button
          onClick={handleStart}
          className="group relative btn-game-orange px-8 sm:px-12 py-3.5 sm:py-5 rounded-full flex items-center gap-3 sm:gap-4 transition-all duration-200 transform hover:scale-105 active:scale-95 animate-gentle-pulse"
        >
          {/* Water Splash droplets left and right of the button matching Canva design */}
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-sky-400 text-2xl drop-shadow-md group-hover:animate-bounce">
            💦
          </div>
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-sky-400 text-2xl drop-shadow-md group-hover:animate-bounce" style={{ animationDelay: '0.2s' }}>
            💦
          </div>

          {/* Yellow Play Triangle Icon inside rounded badge */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-300 border-2 border-white shadow-inner flex items-center justify-center text-amber-900">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-900 ml-0.5" />
          </div>

          {/* Button Text */}
          <span className="font-game font-black text-xl sm:text-2xl md:text-3xl text-white tracking-wide text-stroke-wood">
            MULAI PETUALANGAN
          </span>
          
          {/* Sparkles effect */}
          <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
        </button>

        {/* Small subtitle badge below button */}
        <div className="mt-2.5 px-4 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 text-white/90 font-body text-xs sm:text-sm flex items-center gap-2">
          <span>🌾 Kelas V Sekolah Dasar</span>
          <span>•</span>
          <span>Ekosistem & Harmoni Alam</span>
        </div>
      </div>

      {/* Foreground decorative pond water details (Fish, Crab, Shells) */}
      <div className="absolute bottom-2 right-4 sm:right-24 z-10 hidden sm:flex items-center gap-3 pointer-events-none opacity-80">
        <span className="text-3xl animate-bounce" style={{ animationDuration: '3s' }}>🦀</span>
        <span className="text-2xl animate-pulse">🐚</span>
      </div>
    </div>
  );
};
