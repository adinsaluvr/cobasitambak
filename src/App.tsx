/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, AdventureId } from './types';
import { CoverScreen } from './components/CoverScreen';
import { IntroScreen } from './components/IntroScreen';
import { AdventureZoneScreen } from './components/AdventureZoneScreen';
import { PlaceholderScreen } from './components/PlaceholderScreen';
import { HeaderNav } from './components/HeaderNav';
import { GameModals } from './components/Modals';
import { AccessModal } from './components/AccessModal';
import { ADVENTURE_MENUS } from './data/adventureData';
import { getOrCreateDeviceKey } from './utils/deviceKey';

const SESSION_ACCESS_KEY = 'sitambak_session_unlocked';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('cover');
  const [currentAdventure, setCurrentAdventure] = useState<AdventureId>('jelajah');
  const [modalType, setModalType] = useState<'info' | 'guide' | 'author' | 'glossary' | null>(null);

  // Inisialisasi deviceKey pada saat aplikasi pertama kali dimuat
  useEffect(() => {
    getOrCreateDeviceKey();
  }, []);

  // Status akses petualangan selama sesi browser
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem(SESSION_ACCESS_KEY) === 'true';
    }
    return false;
  });

  // Flag untuk memicu efek animasi unlock ringan saat pertama kali berhasil
  const [isJustUnlocked, setIsJustUnlocked] = useState(false);

  // Modal akses gembok
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [pendingAdventure, setPendingAdventure] = useState<AdventureId | null>(null);

  // Sinkronisasi session storage
  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      if (isUnlocked) {
        sessionStorage.setItem(SESSION_ACCESS_KEY, 'true');
      } else {
        sessionStorage.removeItem(SESSION_ACCESS_KEY);
      }
    }
  }, [isUnlocked]);

  // Navigation handlers
  const handleStartAdventure = () => {
    setCurrentScreen('intro');
  };

  const handleIntroNext = () => {
    setCurrentScreen('adventure_zone');
  };

  const handleIntroBack = () => {
    setCurrentScreen('cover');
  };

  // Handler saat menu petualangan diklik di Zona Petualangan
  const handleSelectAdventure = (id: AdventureId) => {
    // Jika belum memiliki akses, tahan dan tampilkan modal akses
    if (!isUnlocked) {
      setPendingAdventure(id);
      setIsAccessModalOpen(true);
      return;
    }

    // Jika sudah memiliki akses sesi, langsung buka menu pembelajaran
    setCurrentAdventure(id);
    setCurrentScreen('placeholder');
  };

  // Handler ketika kode simulasi / Supabase berhasil divalidasi di modal
  const handleAccessSuccess = () => {
    setIsUnlocked(true);
    setIsJustUnlocked(true);
    setIsAccessModalOpen(false);

    // Buka menu petualangan yang sebelumnya diklik pengguna
    const target = pendingAdventure || 'jelajah';
    setCurrentAdventure(target);
    setPendingAdventure(null);
    setCurrentScreen('placeholder');

    // Reset flag just unlocked setelah jeda waktu animasi selesai
    setTimeout(() => {
      setIsJustUnlocked(false);
    }, 2000);
  };

  // Handler untuk mengunci sesi kembali (tanpa menghapus deviceKey di localStorage)
  const handleLockSession = () => {
    setIsUnlocked(false);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem(SESSION_ACCESS_KEY);
    }
    setCurrentScreen('adventure_zone');
  };

  const handleBackToZone = () => {
    setCurrentScreen('adventure_zone');
  };

  const pendingMenu = pendingAdventure 
    ? ADVENTURE_MENUS.find((m) => m.id === pendingAdventure) 
    : undefined;

  return (
    <main className="min-h-screen w-full bg-[#1e1007] flex items-center justify-center p-0 sm:p-2 md:p-4 font-game overflow-x-hidden">
      {/* 16:9 Landscape Game Cabinet Container */}
      <div className="relative w-full max-w-[1440px] aspect-[16/9] min-h-[600px] max-h-[100vh] bg-amber-950 rounded-none sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-0 sm:border-4 border-amber-800/80 overflow-hidden flex flex-col">
        
        {/* Floating Header UI (Home, Back, Sound, Fullscreen, dan Tombol Sesi) */}
        <HeaderNav
          currentScreen={currentScreen}
          isUnlocked={isUnlocked}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenModal={(type) => setModalType(type)}
          onLockSession={handleLockSession}
        />

        {/* Dynamic Screen View */}
        <div className="relative w-full h-full flex-1 overflow-y-auto overflow-x-hidden">
          {currentScreen === 'cover' && (
            <CoverScreen onStart={handleStartAdventure} />
          )}

          {currentScreen === 'intro' && (
            <IntroScreen onNext={handleIntroNext} onBack={handleIntroBack} />
          )}

          {currentScreen === 'adventure_zone' && (
            <AdventureZoneScreen 
              isUnlocked={isUnlocked}
              isJustUnlocked={isJustUnlocked}
              onSelectAdventure={handleSelectAdventure}
              onBackToCover={() => setCurrentScreen('cover')}
            />
          )}

          {currentScreen === 'placeholder' && (
            <PlaceholderScreen 
              adventureId={currentAdventure}
              onBackToZone={handleBackToZone}
              onSwitchAdventure={(id) => setCurrentAdventure(id)}
            />
          )}
        </div>

        {/* Global Modals (Info, Panduan, Pengembang, Glosarium) */}
        <GameModals type={modalType} onClose={() => setModalType(null)} />

        {/* Modal Validasi Kode Akses Supabase + Device Binding */}
        <AccessModal 
          isOpen={isAccessModalOpen}
          targetAdventureTitle={pendingMenu?.title}
          onClose={() => {
            setIsAccessModalOpen(false);
            setPendingAdventure(null);
          }}
          onSuccess={handleAccessSuccess}
        />
      </div>
    </main>
  );
}
