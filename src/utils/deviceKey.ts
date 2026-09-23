/**
 * Device Key Management (Tahap 3 - Device Binding)
 * 
 * Sesuai panduan arsitektur:
 * 1. Menghasilkan deviceKey acak otomatis menggunakan crypto.randomUUID() pada penggunaan pertama.
 * 2. Menyimpan deviceKey di localStorage agar browser yang sama menggunakan deviceKey yang konsisten.
 * 3. Tidak menggunakan hardware serial number, MAC address, IP address, atau fingerprinting.
 */

const DEVICE_KEY_STORAGE_KEY = 'sitambak_device_key';

export function getOrCreateDeviceKey(): string {
  if (typeof window === 'undefined') {
    return 'ssr-device-key';
  }

  try {
    const existing = localStorage.getItem(DEVICE_KEY_STORAGE_KEY);
    if (existing && existing.trim()) {
      return existing.trim();
    }

    // Buat UUID acak standar menggunakan Web Crypto API
    let newKey: string;
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      newKey = crypto.randomUUID();
    } else {
      // Fallback format UUIDv4 jika crypto.randomUUID belum tersedia di browser lawas
      newKey = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    localStorage.setItem(DEVICE_KEY_STORAGE_KEY, newKey);
    return newKey;
  } catch {
    // Fallback jika localStorage dibatasi
    return 'volatile-' + Math.random().toString(36).substring(2);
  }
}
