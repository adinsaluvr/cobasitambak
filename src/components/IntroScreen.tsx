import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowRight, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface IntroScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onNext, onBack }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const dialogueText = "Tadaaa! Halo! Aku Tambi, teman petualanganmu di tambak Sidoarjo! Yuk, temukan rahasia kehidupan tambak, siapa makan siapa ya? Dan ayo taklukkan misi Petambak Cilik!";

  const handleSpeak = () => {
    sound.playClick();
    if (isPlayingAudio) {
      sound.stopDialogue();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      sound.speakDialogue(dialogueText);
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 7500);
    }
  };

  const handleNext = () => {
    sound.stopDialogue();
    sound.playSuccess();
    onNext();
  };

  const handleBack = () => {
    sound.stopDialogue();
    sound.playClick();
    onBack();
  };

  return (
    <div className="relative w-full h-full min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-4 sm:p-8 overflow-hidden select-none">
      {/* Background with subtle blur for cutscene / story focus */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/bg-tambak.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/40 via-sky-950/30 to-amber-950/60 backdrop-blur-[2px]" />
      </div>

      {/* Top Banner / Progress Indicator */}
      <div className="relative z-20 flex items-center justify-between max-w-5xl mx-auto w-full">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-900/80 hover:bg-amber-800 text-amber-100 border-2 border-amber-600 shadow-md font-game text-sm transition-transform active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Cover</span>
        </button>

        <div className="px-5 py-1.5 rounded-full bg-amber-950/80 border-2 border-amber-400/80 shadow-lg text-amber-200 font-game text-sm sm:text-base flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>Perkenalan Karakter • Sambutan Tambi</span>
        </div>
      </div>

      {/* Main Center Area: Tambi + Speech Bubble (RPG / Story Dialogue Cutscene) */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 my-auto">
        
        {/* Tambi Character with animated greeting posture */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-56 h-64 sm:w-72 sm:h-80 md:w-80 md:h-96 animate-soft-float">
            <img 
              src="/assets/tambi-welcome.jpg" 
              alt="Tambi Menyambut Pemain" 
              className="w-full h-full object-contain filter drop-shadow-[0_16px_24px_rgba(0,0,0,0.6)] rounded-3xl"
            />
            {/* Glow halo */}
            <div className="absolute inset-0 bg-radial from-amber-300/30 to-transparent rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Character Tag */}
          <div className="mt-2 px-5 py-1.5 rounded-2xl wood-board text-center shadow-lg border-2 border-amber-950">
            <span className="font-game font-bold text-amber-100 text-base sm:text-lg tracking-wide text-stroke-wood">
              TAMBI SI PETAMBAK CILIK
            </span>
          </div>
        </div>

        {/* Big Interactive Speech Bubble */}
        <div className="relative flex-1 max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-400">
          <div className="relative bg-gradient-to-b from-amber-50 via-white to-amber-100/90 border-4 sm:border-[5px] border-amber-900 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            {/* Speech bubble pointer (desktop pointing to Tambi, mobile pointing up) */}
            <div className="hidden md:block absolute -left-5 top-16 w-0 h-0 border-t-[14px] border-t-transparent border-r-[20px] border-r-amber-900 border-b-[14px] border-b-transparent" />
            <div className="hidden md:block absolute -left-3 top-16 w-0 h-0 border-t-[12px] border-t-transparent border-r-[17px] border-r-amber-50 border-b-[12px] border-b-transparent" />

            {/* Header row in dialogue bubble */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-amber-200">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-amber-700" />
                <span className="font-game font-bold text-amber-900 text-lg sm:text-xl">
                  Tambi Berkata:
                </span>
              </div>

              {/* Audio Voice-Over Button with simulation & real speech toggle */}
              <button
                onClick={handleSpeak}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-game text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 ${
                  isPlayingAudio 
                    ? 'bg-amber-600 text-white animate-pulse' 
                    : 'bg-amber-200/90 hover:bg-amber-300 text-amber-900 border border-amber-400'
                }`}
                title="Dengarkan Suara Dialog Tambi"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4 text-white" />
                    <span>Hentikan Suara</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-800" />
                    <span>Dengar Suara Tambi 🔊</span>
                  </>
                )}
              </button>
            </div>

            {/* The exact dialogue text requested by user */}
            <div className="my-4">
              <p className="font-body text-base sm:text-xl md:text-2xl text-slate-800 font-semibold leading-relaxed">
                “<span className="text-amber-700 font-bold">Tadaaa! Halo!</span> Aku <strong className="text-amber-900 font-extrabold">Tambi</strong>, teman petualanganmu di tambak Sidoarjo! Yuk, temukan rahasia kehidupan tambak, siapa makan siapa ya? Dan ayo taklukkan misi <strong className="text-amber-800 font-extrabold">Petambak Cilik!</strong>”
              </p>
            </div>

            {/* Audio Voice-Over placeholder status tag */}
            <div className="pt-3 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-800">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Area Voice-Over Siap Audio Interaktif</span>
              </div>
              <span className="text-slate-500 font-medium italic">Sidoarjo Sains SD Kelas V</span>
            </div>
          </div>

          {/* Action Button: "LANJUT" */}
          <div className="mt-5 flex justify-end">
            <button
              onClick={handleNext}
              className="btn-game-orange px-10 py-3.5 sm:py-4 rounded-full font-game font-black text-xl sm:text-2xl text-white tracking-wider flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-xl"
            >
              <span>LANJUT KE ZONA PETUALANGAN</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom hint */}
      <div className="relative z-20 text-center text-amber-200/80 text-xs sm:text-sm font-body">
        Petualangan IPAS SD Kelas V • Topik: Ekosistem & Harmoni Alam Tambak Sidoarjo
      </div>
    </div>
  );
};
