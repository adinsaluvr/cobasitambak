import { AdventureMenu } from '../types';

export const ADVENTURE_MENUS: AdventureMenu[] = [
  {
    id: 'jelajah',
    title: 'JELAJAH TAMBAK',
    subtitle: 'Mengenal Dunia Tambak Tradisional Sidoarjo',
    topic: 'Komponen Biotik & Abiotik',
    description: 'Ayo berjalan bersama Tambi di sepanjang pematang tambak! Temukan berbagai makhluk hidup (biotik) seperti ikan bandeng, udang windu, kepiting bakau, burung kuntul, fitoplankton, serta faktor tak hidup (abiotik) seperti air payau, sinar matahari, lumpur, dan kadar garam.',
    iconType: 'explore',
    color: 'from-emerald-500 to-teal-700',
    badgeTag: 'Misi Eksplorasi 01',
    stageNumber: 1,
    previewGoals: [
      'Identifikasi komponen biotik: Bandeng, Udang Windu, Plankton, Bakau',
      'Identifikasi komponen abiotik: Air payau, Sinar matahari, Suhu, Tanah pematang',
      'Mengukur kadar garam (salinitas) tambak bersama Tambi'
    ]
  },
  {
    id: 'tebak',
    title: 'TEBAK DULU!',
    subtitle: 'Uji Pengetahuan Awal Petambak Cilik',
    topic: 'Interaksi Antarkomponen Ekosistem',
    description: 'Siap bermain tebak-tebakan seru? Tambi menyiapkan teka-teki interaktif tentang siapa saja penghuni tambak Sidoarjo dan bagaimana mereka saling membutuhkan untuk bertahan hidup!',
    iconType: 'quiz',
    color: 'from-amber-500 to-orange-600',
    badgeTag: 'Kuis Ceria 02',
    stageNumber: 2,
    previewGoals: [
      'Tebak peran organisme di tambak: Produsen, Konsumen, Pengurai',
      'Tantangan interaksi makhluk hidup dan lingkungannya',
      'Kumpulkan poin bintang petualang bersama Tambi'
    ]
  },
  {
    id: 'bongkar',
    title: 'BONGKAR RAHASIA',
    subtitle: 'Rantai & Jaring-Jaring Makanan Tambak',
    topic: 'Rantai Makanan & Jaring Makanan',
    description: 'Bongkar rahasia kehidupan di dalam air tambak: Siapa makan siapa ya? Pelajari bagaimana energi matahari ditangkap fitoplankton, dimakan zooplankton & udang kecil, lalu dimakan ikan bandeng hingga burung pemangsa!',
    iconType: 'book',
    color: 'from-yellow-600 to-amber-700',
    badgeTag: 'Laboratorium Sains 03',
    stageNumber: 3,
    previewGoals: [
      'Menyusun rantai makanan tambak yang benar',
      'Menggabungkan rantai menjadi jaring-jaring makanan kompleks',
      'Mengetahui peran dekomposer (pengurai) di dasar lumpur tambak'
    ]
  },
  {
    id: 'selamatkan',
    title: 'SELAMATKAN TAMBAK',
    subtitle: 'Menjaga Keseimbangan & Aliran Energi',
    topic: 'Tingkat Trofik & Aliran Energi',
    description: 'Gawat! Ekosistem tambak sedang menghadapi ancaman ketidakseimbangan! Bantu Tambi menghitung perpindahan energi dari Produsen (Trofik 1) ke Konsumen Puncak agar tambak tetap lestari dan panen melimpah!',
    iconType: 'shield',
    color: 'from-sky-500 to-blue-700',
    badgeTag: 'Simulasi Penyelamatan 04',
    stageNumber: 4,
    previewGoals: [
      'Memahami piramida makanan dan tingkat trofik I, II, III, IV',
      'Menghitung aliran energi yang berkurang di setiap tingkat',
      'Mengambil keputusan bijak saat populasi salah satu organisme terganggu'
    ]
  },
  {
    id: 'misi',
    title: 'MISI PETAMBAK CILIK',
    subtitle: 'Tantangan Praktik Mengelola Tambak Harmonis',
    topic: 'Harmoni Ekosistem Tambak',
    description: 'Saatnya menjadi Petambak Cilik sejati! Kerjakan mini-game tantangan merawat ekosistem tambak Sidoarjo dengan mengatur sirkulasi air, menjaga populasi pakan alami, dan merawat pematang tambak.',
    iconType: 'mission',
    color: 'from-amber-600 to-yellow-800',
    badgeTag: 'Tantangan Lapangan 05',
    stageNumber: 5,
    previewGoals: [
      'Mini-game memelihara keseimbangan rantai pakan bandeng & udang',
      'Menjaga kebersihan dan kualitas air tambak tradisional',
      'Menyelesaikan skenario petambak cilik teladan'
    ]
  },
  {
    id: 'lencana',
    title: 'LENCANA PETAMBAK CILIK',
    subtitle: 'Galeri Prestasi & Sertifikat Petualang',
    topic: 'Evaluasi & Refleksi Belajar',
    description: 'Lihat koleksi lencana kehormatan yang berhasil kamu kumpulkan selama menjelajahi ekosistem tambak Sidoarjo! Capai gelar tertinggi: "Master Petambak Cilik Sidoarjo"!',
    iconType: 'badge',
    color: 'from-yellow-500 to-amber-600',
    badgeTag: 'Prestasi Juara 06',
    stageNumber: 6,
    previewGoals: [
      'Lencana Penjelajah Pematang (Biotik & Abiotik)',
      'Lencana Arsitek Jaring Makanan (Rantai & Jaring)',
      'Lencana Penjaga Energi (Tingkat Trofik & Piramida Energi)',
      'Sertifikat Resmi Petambak Cilik Kelas V SD'
    ]
  }
];
