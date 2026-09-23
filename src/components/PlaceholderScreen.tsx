import React from 'react';
import { AdventureId } from '../types';
import { ADVENTURE_MENUS } from '../data/adventureData';
import { sound } from '../utils/sound';
import { ArrowLeft, CheckCircle2, Sparkles, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

interface PlaceholderScreenProps {
  adventureId: AdventureId;
  onBackToZone: () => void;
  onSwitchAdventure: (id: AdventureId) => void;
}

export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({
  adventureId,
  onBackToZone,
  onSwitchAdventure,
}) => {
  const currentMenu = ADVENTURE_MENUS.find((m) => m.id === adventureId) || ADVENTURE_MENUS[0];
  const currentIndex = ADVENTURE_MENUS.findIndex((m) => m.id === adventureId);

  const handleBack = () => {
    sound.playClick();
    onBackToZone();
  };

  const handlePrev = () => {
    sound.playClick();
    const prevIndex = (currentIndex - 1 + ADVENTURE_MENUS.length) % ADVENTURE_MENUS.length;
    onSwitchAdventure(ADVENTURE_MENUS[prevIndex].id);
  };

  const handleNext = () => {
    sound.playClick();
    const nextIndex = (currentIndex + 1) % ADVENTURE_MENUS.length;
    onSwitchAdventure(ADVENTURE_MENUS[nextIndex].id);
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col justify-between p-4 sm:p-8 overflow-hidden select-none">
      {/* Background with thematic overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/bg-tambak.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/75 via-slate-950/60 to-amber-950/85 backdrop-blur-xs" />
      </div>

      {/* Top Bar Navigation */}
      <div className="relative z-20 flex items-center justify-between max-w-5xl mx-auto w-full">
        <button
          onClick={handleBack}
          className="btn-game-orange px-5 py-2.5 rounded-2xl flex items-center gap-2 font-game font-bold text-sm sm:text-base text-white tracking-wide shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          <span>KEMBALI KE ZONA PETUALANGAN</span>
        </button>

        {/* Stage Badge */}
        <div className="px-4 py-1.5 rounded-full bg-amber-900/90 border-2 border-amber-400 text-amber-200 font-game text-xs sm:text-sm font-semibold shadow-md flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-300" />
          <span>{currentMenu.badgeTag}</span>
        </div>
      </div>

      {/* Center Main Stage Content */}
      <div className="relative z-20 max-w-4xl mx-auto w-full my-auto py-4">
        <div className="relative bg-gradient-to-b from-amber-50 via-white to-amber-100/95 border-4 sm:border-[6px] border-amber-900 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          {/* Header wood banner with stage title */}
          <div className="flex flex-col items-center text-center pb-5 border-b-2 border-amber-200">
            <div className="wood-board px-8 py-3 rounded-2xl border-4 border-[#381a05] shadow-xl transform -rotate-0.5">
              <h1 className="font-game font-black text-2xl sm:text-4xl md:text-5xl text-amber-400 text-stroke-amber uppercase tracking-wider">
                {currentMenu.title}
              </h1>
            </div>

            <p className="mt-3 font-game font-bold text-amber-900 text-base sm:text-xl">
              {currentMenu.subtitle}
            </p>

            <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs sm:text-sm font-semibold">
              <span>🎯 Topik Materi:</span>
              <strong className="font-bold">{currentMenu.topic}</strong>
            </div>
          </div>

          {/* Description & Tambi Mission Briefing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 items-center">
            
            {/* Tambi Character Column */}
            <div className="flex flex-col items-center text-center">
              <div className="w-36 h-44 sm:w-44 sm:h-52 relative">
                <img 
                  src="/assets/tambi-welcome.jpg" 
                  alt="Tambi" 
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.4)] rounded-2xl"
                />
              </div>
              <div className="mt-1 font-game font-bold text-amber-950 text-sm">
                Tambi si Petambak Cilik
              </div>
            </div>

            {/* Stage Description & Objectives */}
            <div className="md:col-span-2 space-y-4">
              <div className="p-4 bg-amber-100/60 rounded-2xl border border-amber-200">
                <h4 className="font-game font-bold text-amber-900 text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Misi Petualangan:
                </h4>
                <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed mt-1">
                  {currentMenu.description}
                </p>
              </div>

              {/* Learning Goals Planned for Stage 2 */}
              <div className="space-y-2">
                <h5 className="font-game font-bold text-xs sm:text-sm uppercase tracking-wider text-amber-900">
                  Target Sains yang Akan Dipelajari:
                </h5>
                <div className="space-y-1.5">
                  {currentMenu.previewGoals.map((goal, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-body">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Note for Stage 1 */}
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-800 font-body">
                💡 <strong>Tahap 1 Desain Selesai:</strong> Halaman placeholder navigasi telah aktif. Logika kuis, mini-game interaktif, dan kunci akses kode akan dibuka pada tahap berikutnya!
              </div>
            </div>

          </div>

          {/* Bottom Action Area: Back to Zone & Quick Stage Switcher */}
          <div className="pt-4 border-t-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Quick Switch Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 font-game text-xs font-bold flex items-center gap-1 transition-transform active:scale-95"
                title="Menu Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <span className="text-xs text-amber-800 font-game">
                Zona {currentIndex + 1} dari {ADVENTURE_MENUS.length}
              </span>

              <button
                onClick={handleNext}
                className="px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 font-game text-xs font-bold flex items-center gap-1 transition-transform active:scale-95"
                title="Menu Berikutnya"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleBack}
              className="btn-game-orange w-full sm:w-auto px-8 py-3 rounded-full font-game font-bold text-white text-base sm:text-lg tracking-wide shadow-md flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              <span>KEMBALI KE ZONA PETUALANGAN</span>
            </button>
          </div>

        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-20 text-center text-amber-200/80 text-xs sm:text-sm font-game">
        SI TAMBAK • Ekosistem Tambak Sidoarjo • Kelas V Sekolah Dasar
      </div>
    </div>
  );
};
