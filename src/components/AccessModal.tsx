import React, { useState } from 'react';
import { Lock, Unlock, X, Sparkles, AlertCircle, CheckCircle2, KeyRound, Loader2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { getOrCreateDeviceKey } from '../utils/deviceKey';

interface AccessModalProps {
  isOpen: boolean;
  targetAdventureTitle?: string;
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * ============================================================================
 * [SUPABASE EDGE FUNCTION CONFIGURATION - DEVICE BINDING]
 * ----------------------------------------------------------------------------
 * Endpoint Supabase Edge Function resmi untuk verifikasi kode akses.
 * Function menerima POST JSON:
 * {
 *   "code": "KODE_PENGGUNA",
 *   "deviceKey": "IDENTITAS_BROWSER"
 * }
 * 
 * Response:
 * - Sukses: { "success": true, "message": "Kode akses valid" }
 * - Gagal (perangkat lain): { "success": false, "message": "...perangkat lain..." }
 * - Gagal (kode tidak sesuai): { "success": false, "message": "...tidak valid..." }
 * ============================================================================
 */
const SUPABASE_VERIFY_ENDPOINT = 'https://vkgnfyzcjgpwwhvbzyaj.supabase.co/functions/v1/verify-access-code';

export const AccessModal: React.FC<AccessModalProps> = ({
  isOpen,
  targetAdventureTitle,
  onClose,
  onSuccess,
}) => {
  const [accessCode, setAccessCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    // Cegah menutup saat request sedang dikirim
    if (status === 'loading') return;
    sound.playClick();
    setStatus('idle');
    setErrorMessage('');
    setAccessCode('');
    onClose();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    const cleanCode = accessCode.trim();

    if (!cleanCode) {
      sound.playError();
      setStatus('error');
      setErrorMessage('Ups! Kode belum diisi. Masukkan kode aksesmu.');
      return;
    }

    sound.playClick();
    setStatus('loading');
    setErrorMessage('');

    // Dapatkan deviceKey acak dari localStorage (atau buat baru jika belum ada)
    const deviceKey = getOrCreateDeviceKey();

    try {
      const response = await fetch(SUPABASE_VERIFY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: cleanCode,
          deviceKey: deviceKey,
        }),
      });

      const data = await response.json().catch(() => null);

      if (data && data.success === true) {
        // VALIDASI BERHASIL
        sound.playUnlock();
        sound.playSuccess();
        setStatus('success');
        setErrorMessage('');

        // Tampilkan animasi unlock sejenak lalu buka menu pembelajaran
        setTimeout(() => {
          onSuccess();
          setStatus('idle');
          setAccessCode('');
        }, 1100);
      } else {
        // VALIDASI GAGAL
        sound.playError();
        setStatus('error');

        const serverMessage = (data?.message || '').toLowerCase();

        // Cek jika kegagalan disebabkan karena kode sudah terikat ke perangkat lain
        if (
          serverMessage.includes('perangkat lain') ||
          serverMessage.includes('device') ||
          serverMessage.includes('perangkat') ||
          data?.code === 'DEVICE_MISMATCH'
        ) {
          setErrorMessage('Kode ini sudah digunakan pada perangkat lain.');
        } else {
          setErrorMessage('Ups! Kode belum sesuai. Coba lagi.');
        }
      }
    } catch {
      // GANGGUAN SERVER ATAU NETWORK
      sound.playError();
      setStatus('error');
      setErrorMessage('Petualangan sedang mengalami gangguan. Coba lagi sebentar.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#2e1507] via-[#431f0a] to-[#240e04] border-4 border-[#351503] rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col items-center text-center overflow-hidden">
        
        {/* Subtle Decorative Golden/Water Glow behind */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close button (top right) */}
        <button
          onClick={handleClose}
          disabled={status === 'loading'}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-amber-900/80 hover:bg-amber-800 disabled:opacity-50 text-amber-200 border-2 border-amber-600/80 flex items-center justify-center font-bold transition-transform active:scale-95 shadow-md cursor-pointer"
          title="Tutup Popup"
          aria-label="Tutup"
        >
          <X className="w-5 h-5 text-amber-300" />
        </button>

        {/* Big Lock Icon with animated pulse & wood halo */}
        <div className="relative my-2 sm:my-3">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-4 border-amber-200 shadow-[0_8px_20px_rgba(245,158,11,0.4)] flex items-center justify-center">
            {status === 'success' ? (
              <Unlock className="w-10 h-10 sm:w-12 sm:h-12 text-amber-950 animate-bounce" />
            ) : status === 'loading' ? (
              <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-amber-950 animate-spin" />
            ) : (
              <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-amber-950" />
            )}
          </div>
          {status === 'success' && (
            <span className="absolute -top-1 -right-1 text-2xl animate-spin" style={{ animationDuration: '3s' }}>
              ✨
            </span>
          )}
        </div>

        {/* Title: PETUALANGAN TERKUNCI / AKSES BERHASIL */}
        <h2 className="font-game font-black text-2xl sm:text-3xl text-amber-300 text-stroke-amber uppercase tracking-wide drop-shadow-md">
          {status === 'success' ? 'AKSES BERHASIL!' : 'PETUALANGAN TERKUNCI'}
        </h2>

        {/* Target Adventure subtitle if specified */}
        {targetAdventureTitle && status !== 'success' && (
          <div className="mt-1 px-3 py-0.5 rounded-full bg-amber-950/70 border border-amber-600/40 text-xs sm:text-sm text-amber-200/90 font-game">
            Zona: {targetAdventureTitle}
          </div>
        )}

        {/* Subtitle instructions */}
        <p className="font-body text-amber-100/90 text-sm sm:text-base mt-2 sm:mt-3 leading-snug max-w-xs">
          {status === 'success'
            ? 'Petualangan terbuka! Bersiaplah menjelajah ekosistem tambak bersama Tambi...'
            : status === 'loading'
            ? 'Memeriksa kode bersama penjaga tambak...'
            : 'Masukkan kode aksesmu untuk membuka petualangan.'}
        </p>

        {/* Feedback Messages */}
        {status === 'error' && (
          <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-red-900/85 border border-red-500/80 text-red-100 text-xs sm:text-sm flex items-center gap-2 animate-shake shadow-md text-left">
            <AlertCircle className="w-5 h-5 text-red-300 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {status === 'success' && (
          <div className="mt-3 px-4 py-2 rounded-xl bg-emerald-900/80 border border-emerald-400 text-emerald-100 text-xs sm:text-sm flex items-center gap-2 animate-pulse shadow-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span className="font-game font-bold">AKSES BERHASIL! Membuka gerbang...</span>
          </div>
        )}

        {/* Input Form */}
        {status !== 'success' && (
          <form onSubmit={handleFormSubmit} className="w-full mt-4 sm:mt-5 space-y-3.5">
            <div className="relative w-full">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-600 pointer-events-none">
                <KeyRound className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={accessCode}
                disabled={status === 'loading'}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Masukkan kode akses"
                autoFocus
                className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-2xl bg-amber-950/90 border-2 border-amber-600/80 text-amber-100 placeholder-amber-400/50 font-game text-center uppercase tracking-widest text-base sm:text-lg focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 shadow-inner disabled:opacity-60"
              />
            </div>

            {/* BUKA AKSES BUTTON with loading feedback */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 sm:py-3.5 rounded-2xl font-game font-black text-white text-base sm:text-lg tracking-wider uppercase btn-game-orange border-2 border-amber-300 shadow-[0_6px_16px_rgba(217,119,6,0.6)] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 text-amber-200 animate-spin" />
                  <span>Memeriksa kode...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>BUKA AKSES</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
