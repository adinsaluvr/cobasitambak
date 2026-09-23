import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, ArrowLeft, Home, Music, LogOut } from 'lucide-react';
import { sound } from '../utils/sound';
import { ambientPlayer } from '../utils/ambientPlayer';
import { ScreenId } from '../types';

interface HeaderNavProps {
  currentScreen: ScreenId;
  isUnlocked?: boolean;
  onNavigate: (screen: ScreenId) => void;
  onOpenModal: (type: 'info' | 'guide' | 'author' | 'glossary') => void;
  onLockSession?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScreen,
  isUnlocked = false,
  onNavigate,
  onOpenModal,
  onLockSession,
}) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isMusicPlaying, setIsMusicPlaying] = useState(ambientPlayer.isPlaying);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const toggleMusic = () => {
    sound.playClick();
    const playing = ambientPlayer.toggle();
    setIsMusicPlaying(playing);
  };

  const toggleFullscreen = () => {
    sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <>
      {/* Top Left Navigation & Media Controls */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-40 flex items-center gap-2">
        {currentScreen !== 'cover' && (
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('cover');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-900/80 hover:bg-amber-900 text-amber-100 border-2 border-amber-600/80 shadow-md backdrop-blur-xs font-game font-semibold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Kembali ke Layar Cover Utama"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Cover</span>
          </button>
        )}

        {currentScreen === 'placeholder' && (
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('adventure_zone');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-800/90 hover:bg-emerald-800 text-white border-2 border-emerald-500 shadow-md backdrop-blur-xs font-game font-bold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Kembali ke Peta Zona Petualangan"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-300" />
            <span>Zona Petualangan</span>
          </button>
        )}

        {/* Ambient Tambak Soundscape & BGM Toggle */}
        <button
          onClick={toggleMusic}
          className={`relative px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border-2 shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
            isMusicPlaying 
              ? 'bg-gradient-to-r from-emerald-700 to-teal-800 border-emerald-300 text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
              : 'bg-amber-900/80 hover:bg-amber-800 text-amber-200 border-amber-600/80'
          }`}
          title={isMusicPlaying ? 'Matikan Suara Alam Tambak' : 'Nyalakan Musik & Suara Alam Tambak Sidoarjo (Looping)'}
          aria-label="Toggle Background Music and Ambience"
        >
          <Music className={`w-4 h-4 ${isMusicPlaying ? 'text-yellow-300 animate-spin' : 'text-amber-300'}`} style={{ animationDuration: '4s' }} />
          <span className="font-game text-xs sm:text-sm font-bold hidden sm:inline">
            {isMusicPlaying ? 'Suara Tambak: Nyala' : 'Suara Tambak'}
          </span>
          {isMusicPlaying && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
          )}
        </button>

        {/* Sound Effects Mute/Unmute toggle */}
        <button
          onClick={toggleSound}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-800/80 hover:bg-amber-700 text-amber-200 border-2 border-amber-500/80 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
          title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Efek Suara'}
          aria-label="Toggle Sound Effects"
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-red-300" /> : <Volume2 className="w-5 h-5 text-amber-300" />}
        </button>

        {/* Fullscreen toggle button */}
        <button
          onClick={toggleFullscreen}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-800/80 hover:bg-amber-700 text-amber-200 border-2 border-amber-500/80 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
          title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh (16:9 Game)'}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 text-amber-200" /> : <Maximize2 className="w-4 h-4 text-amber-200" />}
        </button>

        {/* Tombol Keluar / Kunci Sesi (Hanya jika sesi aktif, tanpa menghapus deviceKey) */}
        {isUnlocked && onLockSession && (
          <button
            onClick={() => {
              sound.playClick();
              onLockSession();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border-2 border-rose-700/80 shadow-md backdrop-blur-xs font-game font-semibold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Keluar Sesi (Kunci Kembali Petualangan)"
          >
            <LogOut className="w-4 h-4 text-rose-300" />
            <span className="hidden md:inline">Kunci Sesi</span>
          </button>
        )}
      </div>

      {/* Top Right Floating Action Buttons matching Canva Design:
          - Info button (Yellow circle with blue 'i')
          - Guide button (Yellow circle with red open book)
          - Author button (Yellow circle with hijab girl / developer '</>')
          - Glossary button (Yellow circle with stacked books)
      */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-40 flex flex-col gap-2.5 sm:gap-3">
        {/* Info button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenModal('info');
          }}
          className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 border-2 sm:border-3 border-amber-100 shadow-[0_4px_8px_rgba(0,0,0,0.35)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
          title="Petunjuk Petualangan"
          aria-label="Petunjuk"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-inner font-bold text-white font-game text-base sm:text-lg">
            i
          </div>
          <span className="sr-only">Petunjuk</span>
        </button>

        {/* Story / Guide Book button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenModal('guide');
          }}
          className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 border-2 sm:border-3 border-amber-100 shadow-[0_4px_8px_rgba(0,0,0,0.35)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
          title="Panduan Guru & Siswa"
          aria-label="Panduan"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 flex items-center justify-center shadow-inner text-base">
            📖
          </div>
          <span className="sr-only">Panduan</span>
        </button>

        {/* Teacher / Author button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenModal('author');
          }}
          className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 border-2 sm:border-3 border-amber-100 shadow-[0_4px_8px_rgba(0,0,0,0.35)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
          title="Profil Pengembang & Guru"
          aria-label="Pengembang"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sky-500 flex items-center justify-center shadow-inner text-white text-xs sm:text-sm font-bold">
            👩‍💻
          </div>
          <span className="sr-only">Pengembang</span>
        </button>

        {/* Glossary / Bookshelf button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenModal('glossary');
          }}
          className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 border-2 sm:border-3 border-amber-100 shadow-[0_4px_8px_rgba(0,0,0,0.35)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
          title="Kamus & Glosarium Sains"
          aria-label="Glosarium"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-inner text-white text-xs sm:text-sm">
            📚
          </div>
          <span className="sr-only">Glosarium</span>
        </button>
      </div>
    </>
  );
};
