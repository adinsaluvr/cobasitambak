import React from 'react';
import { X, Info, BookOpen, User, Sparkles, HelpCircle, Compass, Fish, ShieldAlert, Award } from 'lucide-react';
import { sound } from '../utils/sound';

interface ModalProps {
  type: 'info' | 'guide' | 'author' | 'glossary' | null;
  onClose: () => void;
}

export const GameModals: React.FC<ModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-900 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-amber-200">
          <div className="flex items-center gap-3">
            {type === 'info' && <Info className="w-8 h-8 text-amber-700" />}
            {type === 'guide' && <BookOpen className="w-8 h-8 text-emerald-700" />}
            {type === 'author' && <User className="w-8 h-8 text-sky-700" />}
            {type === 'glossary' && <Sparkles className="w-8 h-8 text-yellow-600" />}
            
            <h2 className="text-2xl sm:text-3xl font-game font-bold text-amber-950">
              {type === 'info' && 'Petunjuk Petualangan'}
              {type === 'guide' && 'Panduan Guru & Siswa'}
              {type === 'author' && 'Tentang Pengembang'}
              {type === 'glossary' && 'Kamus Sains Tambak'}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 flex items-center justify-center font-bold text-lg transition-transform active:scale-95 shadow-md"
            aria-label="Tutup modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 overflow-y-auto font-body text-slate-700 text-base sm:text-lg leading-relaxed flex-1 space-y-4 pr-1">
          {type === 'info' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-100/70 rounded-2xl border border-amber-300">
                <h3 className="font-game font-bold text-lg text-amber-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-700" /> Cara Bermain:
                </h3>
                <ol className="list-decimal list-inside space-y-2 mt-2 text-sm sm:text-base font-semibold text-amber-950">
                  <li>Ikuti petualangan bersama <span className="text-amber-800 font-bold">Tambi</span> di kawasan tambak Sidoarjo.</li>
                  <li>Kunjungi 6 zona belajar mulai dari <strong>Jelajah Tambak</strong> hingga <strong>Misi Petambak Cilik</strong>.</li>
                  <li>Masukkan kode akses petualangan untuk membuka gerbang belajar di <strong>Zona Petualangan</strong> 🔒.</li>
                  <li>Selesaikan tantangan sains untuk mengumpulkan <span className="text-amber-800 font-bold">Lencana Petambak Cilik</span>!</li>
                  <li>Nyalakan tombol <strong>Suara Tambak</strong> di pojok kiri atas untuk mendengarkan suasana alam dan gemericik air tambak secara imersif.</li>
                  <li>Gunakan tombol suara atau speaker untuk mendengarkan Tambi berbicara.</li>
                </ol>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300">
                <h4 className="font-game font-bold text-emerald-900">Materi Pelajaran Sains SD Kelas V:</h4>
                <p className="text-sm sm:text-base text-emerald-800 mt-1">
                  Ekosistem tambak Sidoarjo mengajarkan komponen biotik & abiotik, interaksi makhluk hidup, rantai makanan, jaring-jaring makanan, tingkat trofik, dan aliran energi.
                </p>
              </div>
            </div>
          )}

          {type === 'guide' && (
            <div className="space-y-3">
              <div className="p-4 bg-white/80 rounded-2xl border border-amber-200 shadow-sm">
                <h4 className="font-game font-bold text-amber-900 text-lg">Tujuan Pembelajaran:</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm sm:text-base">
                  <li>Murid dapat menganalisis komponen biotik dan abiotik di ekosistem perairan tambak Sidoarjo.</li>
                  <li>Murid dapat menyusun rantai makanan dan jaring-jaring makanan perairan payau.</li>
                  <li>Murid mampu mengidentifikasi tingkat trofik dan perpindahan/aliran energi matahari hingga konsumen puncak.</li>
                  <li>Murid menghargai kearifan lokal petambak tradisional Sidoarjo dalam menjaga harmoni alam.</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <h4 className="font-game font-bold text-blue-900">Target Pengguna:</h4>
                <p className="text-sm sm:text-base text-blue-800">
                  Siswa-siswi Sekolah Dasar Kelas V (usia 10-11 tahun), guru mata pelajaran IPAS, serta pendidik sains interaktif.
                </p>
              </div>
            </div>
          )}

          {type === 'author' && (
            <div className="text-center py-2 space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 p-1 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl">
                  👩‍🏫
                </div>
              </div>
              <div>
                <h3 className="font-game font-bold text-2xl text-amber-950">SI TAMBAK</h3>
                <p className="font-semibold text-amber-800">Media Pembelajaran Sains Berbasis Game Edukasi</p>
                <p className="text-sm text-slate-600 mt-1">Ekosistem Tambak Tradisional Sidoarjo — IPAS SD Kelas V</p>
              </div>

              <div className="p-4 bg-amber-100/60 rounded-2xl text-left border border-amber-200 text-sm space-y-1">
                <p><strong>Pengembang Media:</strong> Tim SI TAMBAK</p>
                <p><strong>Fokus Kajian:</strong> Pendidikan Sains Dasar, Kearifan Lokal Tambak Sidoarjo</p>
                <p><strong>Karakter Utama:</strong> Tambi (Petambak Cilik Ceria & Cerdas)</p>
              </div>
            </div>
          )}

          {type === 'glossary' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-xs">
                  <span className="font-game font-bold text-amber-900 block text-base">🌱 Biotik</span>
                  <span className="text-xs sm:text-sm text-slate-600">Semua makhluk hidup di tambak, seperti ikan bandeng, udang windu, kepiting, lumut, plankton, dan pohon bakau.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-xs">
                  <span className="font-game font-bold text-amber-900 block text-base">☀️ Abiotik</span>
                  <span className="text-xs sm:text-sm text-slate-600">Komponen tak hidup yang mendukung kehidupan, seperti air payau, suhu, lumpur pematang, sinar matahari, dan oksigen.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-xs">
                  <span className="font-game font-bold text-amber-900 block text-base">🐟 Rantai Makanan</span>
                  <span className="text-xs sm:text-sm text-slate-600">Peristiwa makan dan dimakan dengan urutan tertentu dalam ekosistem (contoh: Plankton ➔ Udang kecil ➔ Ikan Bandeng ➔ Burung Kuntul).</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-xs">
                  <span className="font-game font-bold text-amber-900 block text-base">⚡ Aliran Energi</span>
                  <span className="text-xs sm:text-sm text-slate-600">Perpindahan energi dari cahaya matahari ke produsen dan terus berpindah ke konsumen trofik berikutnya.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-amber-200 text-center">
          <button
            onClick={handleClose}
            className="btn-game-orange px-8 py-2.5 rounded-full font-game font-bold text-white text-lg tracking-wide inline-flex items-center gap-2"
          >
            Mengerti!
          </button>
        </div>
      </div>
    </div>
  );
};
