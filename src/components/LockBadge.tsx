import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface LockBadgeProps {
  isUnlocked: boolean;
  isJustUnlocked?: boolean;
}

export const LockBadge: React.FC<LockBadgeProps> = ({ isUnlocked, isJustUnlocked }) => {
  if (isUnlocked) {
    return (
      <div 
        className={`absolute -top-2 -right-2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-700 border-2 border-emerald-200 shadow-[0_4px_10px_rgba(16,185,129,0.5)] flex items-center justify-center text-white ${
          isJustUnlocked ? 'animate-unlock-glow' : ''
        }`}
        title="Petualangan Terbuka"
      >
        <Unlock className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-100" />
      </div>
    );
  }

  return (
    <div 
      className="absolute -top-2 -right-2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-amber-400 via-amber-600 to-amber-900 border-2 border-amber-200 shadow-[0_4px_10px_rgba(0,0,0,0.6)] flex items-center justify-center text-amber-100"
      title="Terkunci - Masukkan Kode Akses"
    >
      <Lock className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-200" />
    </div>
  );
};
