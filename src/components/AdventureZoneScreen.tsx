import React from 'react';
import { AdventureId } from '../types';
import { sound } from '../utils/sound';
import { LockBadge } from './LockBadge';
import tambiBinocularsImg from '../assets/images/regenerated_image_1790154827519.png';

interface AdventureZoneScreenProps {
  isUnlocked: boolean;
  isJustUnlocked?: boolean;
  onSelectAdventure: (id: AdventureId) => void;
  onBackToCover: () => void;
}

export const AdventureZoneScreen: React.FC<AdventureZoneScreenProps> = ({
  isUnlocked,
  isJustUnlocked = false,
  onSelectAdventure,
}) => {
  const handleSelect = (id: AdventureId) => {
    sound.playSplash();
    sound.playClick();
    onSelectAdventure(id);
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col items-center justify-between overflow-hidden select-none">
      {/* Sidoarjo Tambak Ponds Map Background - Clean 3D Pixar render */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/map-bg.jpg')`,
        }}
      >
        {/* Soft atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300/10 via-transparent to-amber-950/20 pointer-events-none" />
      </div>

      {/* TOP HEADER: Exact Wood Plank matching screenshot "ZONA PETUALANGAN" */}
      <div className="relative z-30 flex flex-col items-center mt-2 sm:mt-4 pointer-events-auto">
        <div className="relative px-8 sm:px-14 md:px-20 py-3 sm:py-4 rounded-3xl wood-board-title border-[5px] sm:border-[6px] border-[#331302] shadow-[0_16px_30px_rgba(0,0,0,0.6)] transform -rotate-0.5">
          
          {/* Leaves on left & right */}
          <div className="absolute -left-4 -top-3 text-3xl sm:text-4xl filter drop-shadow-md transform -rotate-12 select-none">
            🌿
          </div>
          <div className="absolute -right-4 -top-3 text-3xl sm:text-4xl filter drop-shadow-md transform rotate-12 select-none">
            🍃
          </div>

          {/* Wooden plank texture nails */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#200b01] shadow-inner" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#200b01] shadow-inner" />

          {/* Title Text */}
          <h1 className="font-game font-black text-3xl sm:text-5xl md:text-6xl text-amber-300 tracking-wide text-stroke-amber uppercase text-center drop-shadow-lg">
            ZONA PETUALANGAN
          </h1>

          {/* Hanging Sub-Plank: "Pilih petualanganmu!" */}
          <div className="absolute left-1/2 -bottom-5 sm:-bottom-6 -translate-x-1/2 px-6 sm:px-10 py-1 sm:py-1.5 rounded-2xl wood-label-pill border-3 border-[#280e01] shadow-xl whitespace-nowrap">
            <span className="font-game font-black text-white text-xs sm:text-base md:text-lg text-stroke-wood tracking-wide">
              Pilih petualanganmu!
            </span>
          </div>
        </div>
      </div>

      {/* 6 ADVENTURE NODES: Exactly Arranged Across the Tambak Landscape */}
      <div className="relative z-20 w-full max-w-6xl flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-7 sm:gap-y-12 gap-x-4 sm:gap-x-10 items-center justify-items-center my-auto pt-10 sm:pt-14 pb-6 px-4">

        {/* 1. JELAJAH TAMBAK (Top-Left) */}
        <div 
          onClick={() => handleSelect('jelajah')}
          className="relative flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {/* Lock / Unlock Badge */}
          <LockBadge isUnlocked={isUnlocked} isJustUnlocked={isJustUnlocked} />

          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            {/* Glowing yellow magical ring halo around island */}
            <div className={`absolute inset-2 rounded-full border-4 ${isUnlocked ? 'border-emerald-300/90 shadow-[0_0_20px_rgba(52,211,153,0.7)]' : 'border-amber-300/90 island-halo-gold'} animate-water-glow`} />
            
            {/* Wooden sculpted island knoll with lush foliage */}
            <div className="relative w-28 h-28 sm:w-34 sm:h-34 rounded-3xl bg-gradient-to-b from-[#b26932] via-[#854313] to-[#592607] border-4 border-[#331302] p-2 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              {/* Turquoise mini-pond with lush foliage inside */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-400 border-2 border-amber-200/90 shadow-inner flex flex-col items-center justify-center relative">
                {/* Mangrove leaf accents */}
                <span className="absolute -top-1 left-2 text-xs">🌿</span>
                <span className="absolute -top-1 right-2 text-xs">🌱</span>
                
                {/* Footprint pair */}
                <div className="flex items-center gap-1">
                  <span className="text-2xl sm:text-3xl filter drop-shadow-sm transform -rotate-12">👣</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wooden Name Sign: JELAJAH TAMBAK */}
          <div className="mt-1 px-4 py-1.5 rounded-xl wood-board-carved text-center border-2 border-[#2b0e01] shadow-lg group-hover:brightness-110 flex items-center justify-center gap-1.5">
            <span className="font-game font-black text-xs sm:text-sm md:text-base text-amber-200 text-stroke-wood uppercase tracking-wider block">
              JELAJAH TAMBAK
            </span>
          </div>
        </div>

        {/* 2. TEBAK DULU (Top-Center) */}
        <div 
          onClick={() => handleSelect('tebak')}
          className="relative flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {/* Lock / Unlock Badge */}
          <LockBadge isUnlocked={isUnlocked} isJustUnlocked={isJustUnlocked} />

          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            {/* Wooden sculpted island knoll */}
            <div className="relative w-28 h-28 sm:w-34 sm:h-34 rounded-3xl bg-gradient-to-b from-[#b26932] via-[#854313] to-[#592607] border-4 border-[#331302] p-2 shadow-2xl flex flex-col items-center justify-center">
              {/* Leaping Milkfish (Left) and Shrimp (Right) */}
              <div className="absolute -left-2 top-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-200/90 border border-sky-400 flex items-center justify-center shadow-md transform -rotate-12">
                <span className="text-lg sm:text-xl">🐟</span>
              </div>

              <div className="absolute -right-2 top-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-200/90 border border-orange-400 flex items-center justify-center shadow-md transform rotate-12">
                <span className="text-lg sm:text-xl">🦐</span>
              </div>

              {/* Big 3D Orange-Amber Question Mark */}
              <div className="font-game font-black text-5xl sm:text-6xl text-amber-400 text-stroke-amber filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] transform -translate-y-1">
                ?
              </div>
            </div>
          </div>

          {/* Wooden Name Sign: TEBAK DULU */}
          <div className="mt-1 px-5 py-1.5 rounded-xl wood-board-carved text-center border-2 border-[#2b0e01] shadow-lg group-hover:brightness-110 flex items-center justify-center gap-1.5">
            <span className="font-game font-black text-xs sm:text-sm md:text-base text-amber-200 text-stroke-wood uppercase tracking-wider block">
              TEBAK DULU
            </span>
          </div>
        </div>

        {/* 3. BONGKAR RAHASIA (Top-Right) */}
        <div 
          onClick={() => handleSelect('bongkar')}
          className="relative flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {/* Lock / Unlock Badge */}
          <LockBadge isUnlocked={isUnlocked} isJustUnlocked={isJustUnlocked} />

          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            {/* Wooden sculpted island knoll */}
            <div className="relative w-28 h-28 sm:w-34 sm:h-34 rounded-3xl bg-gradient-to-b from-[#b26932] via-[#854313] to-[#592607] border-4 border-[#331302] p-2 shadow-2xl flex flex-col items-center justify-center">
              {/* Open Guide Book */}
              <div className="w-20 h-16 sm:w-24 sm:h-18 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 rounded-xl border-2 border-amber-900 shadow-lg flex items-center justify-between px-2 py-1 relative">
                {/* Book spine divider */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-800/60" />
                
                {/* Left page: Fish */}
                <div className="flex flex-col items-center z-10">
                  <span className="text-xl sm:text-2xl">🐟</span>
                  <div className="w-4 h-1 bg-amber-800/30 rounded-full mt-0.5" />
                </div>

                {/* Right page: Shrimp */}
                <div className="flex flex-col items-center z-10">
                  <span className="text-xl sm:text-2xl">🦐</span>
                  <div className="w-4 h-1 bg-amber-800/30 rounded-full mt-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Wooden Name Sign: BONGKAR RAHASIA */}
          <div className="mt-1 px-4 py-1.5 rounded-xl wood-board-carved text-center border-2 border-[#2b0e01] shadow-lg group-hover:brightness-110 flex items-center justify-center gap-1.5">
            <span className="font-game font-black text-xs sm:text-sm md:text-base text-amber-200 text-stroke-wood uppercase tracking-wider block">
              BONGKAR RAHASIA
            </span>
          </div>
        </div>

        {/* 4. SELAMATKAN TAMBAK (Bottom-Left) */}
        <div 
          onClick={() => handleSelect('selamatkan')}
          className="relative flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {/* Lock / Unlock Badge */}
          <LockBadge isUnlocked={isUnlocked} isJustUnlocked={isJustUnlocked} />

          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            {/* Wooden sculpted island knoll */}
            <div className="relative w-28 h-28 sm:w-34 sm:h-34 rounded-3xl bg-gradient-to-b from-[#b26932] via-[#854313] to-[#592607] border-4 border-[#331302] p-2 shadow-2xl flex flex-col items-center justify-center">
              {/* Leaping Milkfish with dynamic blue water splash */}
              <div className="relative flex items-center justify-center">
                <div className="text-3xl sm:text-4xl filter drop-shadow-md transform -rotate-12 animate-soft-float">
                  🐟
                </div>
                {/* Blue Water Splash & Shield */}
                <div className="absolute -bottom-1 -right-2 flex items-center gap-0.5">
                  <span className="text-xl">🌊</span>
                  <span className="text-xl filter drop-shadow-md">🛡️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wooden Name Sign: SELAMATKAN TAMBAK */}
          <div className="mt-1 px-4 py-1.5 rounded-xl wood-board-carved text-center border-2 border-[#2b0e01] shadow-lg group-hover:brightness-110 flex items-center justify-center gap-1.5">
            <span className="font-game font-black text-xs sm:text-sm md:text-base text-amber-200 text-stroke-wood uppercase tracking-wider block">
              SELAMATKAN TAMBAK
            </span>
          </div>
        </div>

        {/* 5. MISI PETAMBAK CILIK (Bottom-Center) */}
        <div 
          onClick={() => handleSelect('misi')}
          className="relative flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {/* Lock / Unlock Badge */}
          <LockBadge isUnlocked={isUnlocked} isJustUnlocked={isJustUnlocked} />

          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            {/* Wooden sculpted island knoll */}
            <div className="relative w-28 h-28 sm:w-34 sm:h-34 rounded-3xl bg-gradient-to-b from-[#b26932] via-[#854313] to-[#592607] border-4 border-[#331302] p-2 shadow-2xl flex flex-col items-center justify-center">
              {/* Explorer Hat */}
              <div className="text-2xl sm:text-3xl filter drop-shadow-md">
                👒
              </div>

              {/* Footprints in center surrounded by shrimp and fish */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-sm sm:text-base">🦐</span>
                <span className="text-lg sm:text-xl">👣</span>
                <span className="text-sm sm:text-base">🐟</span>
              </div>
            </div>
          </div>

          {/* Wooden Name Sign: MISI PETAMBAK CILIK */}
          <div className="mt-1 px-3 py-1.5 rounded-xl wood-board-carved text-center border-2 border-[#2b0e01] shadow-lg group-hover:brightness-110 flex items-center justify-center gap-1.5">
            <span className="font-game font-black text-xs sm:text-sm md:text-base text-amber-200 text-stroke-wood uppercase tracking-wider block">
              MISI PETAMBAK CILIK
            </span>
          </div>
        </div>

        {/* 6. LENCANA PETAMBAK CILIK (Bottom-Right) */}
        <div 
          onClick={() => handleSelect('lencana')}
          className="relative flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {/* Lock / Unlock Badge */}
          <LockBadge isUnlocked={isUnlocked} isJustUnlocked={isJustUnlocked} />

          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            {/* Wooden sculpted island knoll */}
            <div className="relative w-28 h-28 sm:w-34 sm:h-34 rounded-3xl bg-gradient-to-b from-[#b26932] via-[#854313] to-[#592607] border-4 border-[#331302] p-2 shadow-2xl flex flex-col items-center justify-center">
              {/* Golden Laurel Wreath Badge */}
              <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-orange-500 border-3 border-yellow-100 shadow-xl flex items-center justify-center animate-gentle-pulse">
                {/* Wreath leaves */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-600/40" />
                
                {/* Blue circular core with fish and shrimp */}
                <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-sky-600 to-blue-500 border-2 border-white shadow-inner flex items-center justify-center gap-0.5">
                  <span className="text-base sm:text-lg">🐟</span>
                  <span className="text-base sm:text-lg">🦐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wooden Name Sign: LENCANA PETAMBAK CILIK */}
          <div className="mt-1 px-3 py-1.5 rounded-xl wood-board-carved text-center border-2 border-[#2b0e01] shadow-lg group-hover:brightness-110 flex items-center justify-center gap-1.5">
            <span className="font-game font-black text-xs sm:text-sm md:text-base text-amber-200 text-stroke-wood uppercase tracking-wider block">
              LENCANA PETAMBAK CILIK
            </span>
          </div>
        </div>

      </div>

      {/* KARAKTER TAMBI ON BOTTOM-LEFT (holding binoculars looking through them) */}
      <div className="absolute bottom-0 left-1 sm:left-4 md:left-8 z-30 pointer-events-none select-none">
        <div className="w-44 h-56 sm:w-60 sm:h-76 md:w-72 md:h-96 relative">
          <img 
            src={tambiBinocularsImg} 
            alt="Tambi Mengamati dengan Teropong" 
            onError={(e) => {
              // Graceful fallback to existing tambi asset if needed
              (e.target as HTMLImageElement).src = '/assets/tambi-binoculars.jpg';
            }}
            className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)] rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};
