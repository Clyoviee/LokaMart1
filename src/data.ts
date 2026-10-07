import imgBukuAgendaBatik from './assets/images/buku_agenda_batik_1791105661882.jpg';
import imgBukuJurnalDaun from './assets/images/buku_jurnal_daun_1791105509705.jpg';
import imgBukuSketsaBambu from './assets/images/buku_sketsa_bambu_1791103156931.jpg';
import imgCangkirKeramik from './assets/images/cangkir_keramik_kasongan_1791105550085.jpg';
import imgCardHolderKulit from './assets/images/card_holder_kulit_1791103145323.jpg';
import imgDompetPandan from './assets/images/dompet_anyaman_pandan_1791105537902.jpg';
import imgEmpalGentong from './assets/images/empal_gentong_cirebon_1791103210086.jpg';
import imgGantunganKunciKulit from './assets/images/gantungan_kunci_kulit_1791105633334.jpg';
import imgGelangCendana from './assets/images/gelang_kayu_cendana_1791105524135.jpg';
import imgKainBatikMegamendung from './assets/images/kain_batik_megamendung_1791103091067.jpg';
import imgKalungEtnikKayu from './assets/images/kalung_etnik_kayu_1791103133225.jpg';
import imgKemejaBatikCirebon from './assets/images/kemeja_batik_cirebon_1791105563651.jpg';
import imgKeranjangRotan from './assets/images/keranjang_tanaman_rotan_1791105484244.jpg';
import imgKerupukUdang from './assets/images/kerupuk_udang_cirebon_1791103227780.jpg';
import imgKipasCoasterBambu from './assets/images/kipas_coaster_bambu_1791105457082.jpg';
import imgKopiRobusta from './assets/images/kopi_robusta_puntang_1791103195777.jpg';
import imgKotakPensilJati from './assets/images/kotak_pensil_jati_1791105593674.jpg';
import imgLilinKopiBatok from './assets/images/lilin_kopi_batok_1791105470650.jpg';
import imgLilinPotGerabah from './assets/images/lilin_pot_gerabah_1791105674742.jpg';
import imgNampanRotan from './assets/images/nampan_rotan_cirebon_1791103168552.jpg';
import imgOuterKimonoBatik from './assets/images/outer_kimono_batik_1791103117755.jpg';
import imgPouchBambu from './assets/images/pouch_anyaman_bambu_1791105727395.jpg';
import imgSyalTenunIndigo from './assets/images/syal_tenun_indigo_1791105607621.jpg';
import imgTasAnyamanPandan from './assets/images/tas_anyaman_pandan_1791105688580.jpg';
import imgTasRanselTenun from './assets/images/tas_ransel_tenun_1791105577326.jpg';
import imgTasRotanBulat from './assets/images/tas_rotan_bulat_1791105704595.jpg';
import imgTasSelempangGoni from './assets/images/tas_selempang_goni_1791105717086.jpg';
import imgTasSelempangTenun from './assets/images/tas_selempang_tenun_1791105497753.jpg';
import imgTempatTisuRotan from './assets/images/tempat_tisu_rotan_1791105620809.jpg';
import imgTotebagMegamendung from './assets/images/totebag_megamendung_cirebon_1791105649537.jpg';
import imgVasGerabahKasongan from './assets/images/vas_gerabah_kasongan_1791103182059.jpg';
import imgWedangUwuh from './assets/images/wedang_uwuh_rempah_1791103241059.jpg';

export type ScreenId =
  | 'splash'
  | 'login'
  | 'register'
  | 'beranda'
  | 'kategori'
  | 'pencarian'
  | 'detail-produk'
  | 'keranjang'
  | 'alamat'
  | 'checkout'
  | 'pembayaran-va'
  | 'pembayaran-berhasil'
  | 'pesanan'
  | 'detail-pesanan'
  | 'profil';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  prodi: string;
  program?: string;
  campus: string;
  nim?: string;
  studentId?: string;
  memberLevel: string;
  memberTier?: string;
  avatarUrl?: string;
}

export const LOKAMART_LOGO_URL = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
    <rect width="120" height="120" rx="28" fill="#041B3C"/>
    <path d="M60 14L106 60L60 106L14 60L60 14Z" fill="#172B4D" stroke="#D97724" stroke-width="4"/>
    <path d="M38 50V44C38 31.8497 47.8497 22 60 22C72.1503 22 82 31.8497 82 44V50" stroke="#F8D8B8" stroke-width="6" stroke-linecap="round"/>
    <rect x="28" y="46" width="64" height="50" rx="12" fill="#D97724"/>
    <path d="M40 70C46 62 54 62 60 70C66 78 74 78 80 70" stroke="#FFF8F4" stroke-width="5" stroke-linecap="round"/>
    <circle cx="60" cy="57" r="4" fill="#FFF8F4"/>
  </svg>`
)}`;

export const DEFAULT_AVATAR_URL = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
    <rect width="120" height="120" rx="60" fill="#172B4D"/>
    <circle cx="60" cy="45" r="22" fill="#F8D8B8"/>
    <path d="M22 106C26 82 42 74 60 74C78 74 94 82 98 106" fill="#D97724"/>
  </svg>`
)}`;

export const SELLER_AVATAR_URL = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
    <rect width="120" height="120" rx="60" fill="#8B5A2B"/>
    <path d="M26 48L36 28H84L94 48V54C94 60 88 64 82 64C76 64 72 60 70 56C68 60 64 64 60 64C56 64 52 60 50 56C48 60 44 64 38 64C32 64 26 60 26 54V48Z" fill="#F8D8B8"/>
    <rect x="34" y="62" width="52" height="34" rx="6" fill="#FFF8F4"/>
    <rect x="52" y="72" width="16" height="24" rx="3" fill="#041B3C"/>
  </svg>`
)}`;

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Fajar Pratama',
  email: 'fajar.pratama@mhs.ikmi.ac.id',
  phone: '0812-3456-7890',
  prodi: 'Rekayasa Perangkat Lunak (RPL)',
  program: 'Rekayasa Perangkat Lunak (RPL)',
  campus: 'STMIK IKMI CIREBON',
  nim: '41220089',
  studentId: '41220089',
  memberLevel: 'Member Perak',
  memberTier: 'Member Perak • Sejak 2026',
  avatarUrl: DEFAULT_AVATAR_URL,
};

export type OrderStatus =
  | 'Menunggu Pembayaran'
  | 'Diproses'
  | 'Dikirim'
  | 'Selesai'
  | 'Dibatalkan';

export type CategoryName =
  | 'Semua'
  | 'Tas Etnik'
  | 'Batik Lokal'
  | 'Aksesoris'
  | 'Alat Tulis'
  | 'Kerajinan Rotan'
  | 'Kuliner Khas'
  | 'Dekorasi';

export interface ProductCategoryMeta {
  id: CategoryName;
  label: string;
  icon: string;
  description: string;
  isHighlight?: boolean;
}

export const PRODUCT_CATEGORIES: ProductCategoryMeta[] = [
  {
    id: 'Tas Etnik',
    label: 'Tas Etnik',
    icon: 'shopping_bag',
    description: 'Tas tenun, selempang kulit, tote bag batik, dan dompet anyaman tangan',
  },
  {
    id: 'Batik Lokal',
    label: 'Batik Lokal',
    icon: 'texture',
    description: 'Kemeja batik cap, batik tulis Trusmi Cirebon, dan syal tenun ikat',
  },
  {
    id: 'Aksesoris',
    label: 'Aksesoris',
    icon: 'diamond',
    description: 'Gelang kayu cendana, gantungan kunci kulit grafir, dan perhiasan etnik',
  },
  {
    id: 'Alat Tulis',
    label: 'Alat Tulis',
    icon: 'edit_note',
    description: 'Buku jurnal daur ulang, agenda sampul batik, dan kotak pensil ukir jati',
  },
  {
    id: 'Kerajinan Rotan',
    label: 'Kerajinan Rotan',
    icon: 'chair',
    description: 'Keranjang rotan Tegalwangi Cirebon, tempat tisu anyaman, dan kriya bambu',
  },
  {
    id: 'Kuliner Khas',
    label: 'Kuliner Khas',
    icon: 'restaurant',
    description: 'Oleh-oleh khas Cirebon, kopi Nusantara, dan rempah tradisional kemasan',
  },
  {
    id: 'Dekorasi',
    label: 'Dekorasi',
    icon: 'potted_plant',
    description: 'Lilin aromaterapi batok kelapa, cangkir keramik, dan gerabah Kasongan',
  },
  {
    id: 'Semua',
    label: 'Semua',
    icon: 'apps',
    description: 'Seluruh koleksi produk kriya & UMKM lokal Nusantara terkurasi',
    isHighlight: true,
  },
];

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  soldCount?: string;
  soldNumeric?: number;
  origin: string;
  badge?: string;
  badgeType?: 'official' | 'terlaris' | 'handmade';
  image: string;
  category: Exclude<CategoryName, 'Semua'>;
  storeId: string;
  storeName: string;
  variants: string[];
  stockLeft?: number;
  stockProgress?: number;
  stockLabel?: string;
  isUrgentStock?: boolean;
  freeShipping?: boolean;
  description?: string;
  specs?: {
    material: string;
    dimensions: string;
    strapOrFeature: string;
    weight: string;
    compartmentOrDetail: string;
  };
}

export interface CartItem {
  id: string;
  productId: string;
  storeId: string;
  storeName: string;
  storeOrigin: string;
  title: string;
  variant: string;
  availableVariants?: string[];
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  badge: string;
  image: string;
  quantity: number;
  checked: boolean;
}

export interface AddressItem {
  id: number;
  label: string;
  isMain: boolean;
  recipient: string;
  phoneOrSub: string;
  fullAddress: string;
  patokan?: string;
  shortLabel: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  origin: string;
}

export interface OrderTrackingStep {
  title: string;
  time: string;
  active: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  dateStr: string;
  timeStr: string;
  status: OrderStatus;
  storeId: string;
  storeName: string;
  storeOrigin: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  shippingDiscount: number;
  voucherDiscount: number;
  serviceFee: number;
  totalPayment: number;
  shippingService: 'Reguler' | 'Express';
  courierName: string;
  resiNumber: string;
  etaText: string;
  paymentMethod: string;
  vaNumber: string;
  address: AddressItem;
  trackingSteps: OrderTrackingStep[];
  reviewed?: boolean;
  userRating?: number;
}

export const FLASH_PROMO_PRODUCTS: Product[] = [
  {
    id: 'flash-1',
    title: 'Set Kipas & Coaster Anyaman Bambu Alami',
    price: 26000,
    originalPrice: 40000,
    discountPercent: 35,
    rating: 4.9,
    reviewCount: 92,
    soldCount: '215 terjual',
    soldNumeric: 215,
    origin: 'Tasikmalaya',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Kerajinan Rotan',
    storeId: 'store-tasik',
    storeName: 'Saung Kriya Tasikmalaya',
    variants: ['Bambu Natural', 'Bambu Motif Batik', 'Set Lengkap 4 Pcs'],
    freeShipping: true,
    image: imgKipasCoasterBambu,
    stockProgress: 78,
    stockLabel: 'Segera Habis',
    stockLeft: 6,
    specs: {
      material: 'Bambu Apus Pilihan & Rotan Halus',
      dimensions: 'Kipas 22 cm, Coaster Diameter 10 cm',
      strapOrFeature: 'Anyaman Tangan Anti Jamur',
      weight: '180 gram (1 Set)',
      compartmentOrDetail: '1 Kipas Tradisional + 3 Tatakan Gelas',
    },
  },
  {
    id: 'flash-2',
    title: 'Lilin Aromaterapi Kopi Batok Kelapa',
    price: 38400,
    originalPrice: 48000,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 64,
    soldCount: '140 terjual',
    soldNumeric: 140,
    origin: 'Bandung',
    badge: 'Terlaris',
    badgeType: 'terlaris',
    category: 'Dekorasi',
    storeId: 'store-bandung',
    storeName: 'Aroma Bumi Priangan',
    variants: ['Kopi Robusta', 'Kayu Manis & Vanila', 'Cendana Alami'],
    freeShipping: true,
    image: imgLilinKopiBatok,
    stockProgress: 45,
    stockLabel: 'Tersisa 12 pcs',
    stockLeft: 12,
    specs: {
      material: 'Soy Wax 100% Alami & Batok Kelapa Poles',
      dimensions: 'Diameter 11 cm x Tinggi 7 cm',
      strapOrFeature: 'Sumbu Kayu Ganda (Durasi Bakar 30 Jam)',
      weight: '280 gram',
      compartmentOrDetail: 'Topping Biji Kopi Asli & Rempah Nusantara',
    },
  },
  {
    id: 'flash-3',
    title: 'Keranjang Tanaman Rotan Anyaman Bohemian',
    price: 51000,
    originalPrice: 85000,
    discountPercent: 40,
    rating: 4.9,
    reviewCount: 118,
    soldCount: '190 terjual',
    soldNumeric: 190,
    origin: 'Cirebon',
    badge: 'Official Store',
    badgeType: 'official',
    category: 'Kerajinan Rotan',
    storeId: 'store-cirebon-rotan',
    storeName: 'Sentra Rotan Tegalwangi Cirebon',
    variants: ['Natural Honey M', 'Natural Honey L', 'Kombinasi Putih'],
    freeShipping: true,
    image: imgKeranjangRotan,
    stockProgress: 90,
    stockLabel: 'Tersisa 3 pcs!',
    isUrgentStock: true,
    stockLeft: 3,
    specs: {
      material: 'Rotan Alami Tegalwangi Cirebon Grade A',
      dimensions: 'Diameter 25 cm x Tinggi 28 cm',
      strapOrFeature: 'Dilengkapi Handel Rotan Kokoh',
      weight: '550 gram',
      compartmentOrDetail: 'Cocok untuk Cover Pot Tanaman Indoor & Penyimpanan',
    },
  },
];

export const HOME_RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: 'rec-1',
    title: 'Tas Selempang Kulit & Tenun Troso',
    price: 185000,
    originalPrice: 230000,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 128,
    soldCount: '340+ terjual',
    soldNumeric: 340,
    origin: 'Kab. Jepara',
    badge: 'Official Store',
    badgeType: 'official',
    category: 'Tas Etnik',
    storeId: 'store-1',
    storeName: 'Galeri Kriya Troso & Cirebon',
    variants: ['Tenun Hitam Navy', 'Tenun Etnik Merah Bata', 'Tenun Cokelat Tanah'],
    freeShipping: true,
    stockLeft: 14,
    image: imgTasSelempangTenun,
    specs: {
      material: 'Kulit Sapi Asli & Tenun Troso Jepara',
      dimensions: '26 x 8 x 18 cm (Muat iPad Mini)',
      strapOrFeature: 'Adjustable strap (Hingga 120 cm)',
      weight: '450 gram (Ringan & Ergonomis)',
      compartmentOrDetail: '1 Utama, 1 Saku Belakang, 2 Kantung Kartu',
    },
  },
  {
    id: 'rec-2',
    title: 'Buku Jurnal Daur Ulang Daun Kering',
    price: 45000,
    rating: 4.8,
    reviewCount: 84,
    soldCount: '165 terjual',
    soldNumeric: 165,
    origin: 'Kota Bandung',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Alat Tulis',
    storeId: 'store-bandung',
    storeName: 'Kertas Nusantara Studio',
    variants: ['Daun Jati Autumn', 'Daun Pakis Hutan', 'Kertas Polos A5'],
    freeShipping: true,
    stockLeft: 22,
    image: imgBukuJurnalDaun,
    specs: {
      material: 'Kertas Daur Ulang Serat Alam & Daun Asli',
      dimensions: 'Ukuran A5 (14.8 x 21 cm)',
      strapOrFeature: 'Jilid Benang Jahit Tangan (Lay-flat 180°)',
      weight: '310 gram',
      compartmentOrDetail: '120 Halaman Bookpaper 90gsm Ramah Lingkungan',
    },
  },
  {
    id: 'rec-3',
    title: 'Gelang Manik Kayu Cendana Asli',
    price: 32500,
    originalPrice: 38000,
    discountPercent: 15,
    rating: 5.0,
    reviewCount: 210,
    soldCount: '410 terjual',
    soldNumeric: 410,
    origin: 'Cirebon',
    badge: 'Terlaris',
    badgeType: 'terlaris',
    category: 'Aksesoris',
    storeId: 'store-1',
    storeName: 'Galeri Kriya Troso & Cirebon',
    variants: ['Butir 8mm Natural', 'Butir 10mm Klasik', 'Kombinasi Batu Giok'],
    freeShipping: true,
    stockLeft: 30,
    image: imgGelangCendana,
    specs: {
      material: 'Kayu Cendana Wangi Alami NTT & Cirebon',
      dimensions: 'Diameter Lingkar Tangan 17-19 cm (Elastis)',
      strapOrFeature: 'Tali Karet Korea Serat Ganda Kuat',
      weight: '45 gram',
      compartmentOrDetail: '24 Butir Kayu Halus + Kotak Penyimpanan Bludru',
    },
  },
  {
    id: 'rec-4',
    title: 'Dompet Anyaman Pandan Natural',
    price: 68000,
    rating: 4.7,
    reviewCount: 95,
    soldCount: '132 terjual',
    soldNumeric: 132,
    origin: 'Tasikmalaya',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Tas Etnik',
    storeId: 'store-tasik',
    storeName: 'Saung Kriya Tasikmalaya',
    variants: ['Serat Pandan Alami', 'Pandan Motif Tenun', 'Pandan Cokelat Kopi'],
    freeShipping: false,
    stockLeft: 18,
    image: imgDompetPandan,
    specs: {
      material: 'Anyaman Daun Pandan Laut & Furing Katun',
      dimensions: '20 x 3 x 11 cm',
      strapOrFeature: 'Kancing Magnet & Tali Pergelangan Kulit',
      weight: '160 gram',
      compartmentOrDetail: '2 Slot Uang Kertas, 1 Saku Koin Resleting, 6 Slot Kartu',
    },
  },
  {
    id: 'rec-5',
    title: 'Cangkir Keramik Gerabah Kasongan',
    price: 55000,
    rating: 4.9,
    reviewCount: 150,
    soldCount: '280 terjual',
    soldNumeric: 280,
    origin: 'Yogyakarta',
    badge: 'Official Store',
    badgeType: 'official',
    category: 'Dekorasi',
    storeId: 'store-kasongan',
    storeName: 'Sentra Keramik Kasongan',
    variants: ['Natural Terracotta', 'Glasir Hitam Klasik', 'Set 2 Pcs Cangkir'],
    freeShipping: true,
    stockLeft: 25,
    image: imgCangkirKeramik,
    specs: {
      material: 'Tanah Liat Terakota Bakar Suhu Tinggi (Food Grade)',
      dimensions: 'Diameter 8.5 cm x Tinggi 9.5 cm (300 ml)',
      strapOrFeature: 'Tahan Panas & Dingin, Gagang Ergonomis',
      weight: '420 gram (Termasuk Bubble Wrap Kayu)',
      compartmentOrDetail: '2 Cangkir Keramik + Tatakan Kayu Jati',
    },
  },
  {
    id: 'rec-6',
    title: 'Kemeja Batik Cap Pesisir Cirebonan',
    price: 195000,
    originalPrice: 260000,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 340,
    soldCount: '490 terjual',
    soldNumeric: 490,
    origin: 'Cirebon',
    badge: 'Terlaris',
    badgeType: 'terlaris',
    category: 'Batik Lokal',
    storeId: 'store-2',
    storeName: 'Batik Pesisir Cirebon',
    variants: ['Biru Mega Mendung (L)', 'Biru Mega Mendung (XL)', 'Navy Klasik (M)'],
    freeShipping: true,
    stockLeft: 11,
    image: imgKemejaBatikCirebon,
    specs: {
      material: 'Katun Primisima Cap Lilin Tradisional Trusmi',
      dimensions: 'Ukuran M, L, XL (Regular Fit Nyaman)',
      strapOrFeature: 'Lapis Furing Trikot Adem & Tidak Luntur',
      weight: '290 gram',
      compartmentOrDetail: 'Saku Dada Menyatu Motif & Kancing Tersembunyi',
    },
  },
];

export const CATEGORY_PRODUCTS: Product[] = [
  {
    id: 'cat-1',
    title: 'Tas Ransel Kanvas Kombinasi Tenun Ikat',
    price: 245000,
    originalPrice: 290000,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 312,
    soldCount: '312 terjual',
    soldNumeric: 312,
    origin: 'Cirebon',
    badge: 'Official Store',
    badgeType: 'official',
    category: 'Tas Etnik',
    storeId: 'store-1',
    storeName: 'Galeri Kriya Troso & Cirebon',
    variants: ['Kanvas Khaki Navy', 'Kanvas Olive Tenun', 'Kanvas Hitam Etnik'],
    freeShipping: true,
    stockLeft: 9,
    image: imgTasRanselTenun,
    specs: {
      material: 'Kanvas Tebal Water-Repellent & Tenun Ikat Asli',
      dimensions: '42 x 30 x 14 cm (Muat Laptop 15.6 Inch)',
      strapOrFeature: 'Bantalan Bahu Empuk & Gesper Kuningan',
      weight: '680 gram',
      compartmentOrDetail: 'Slot Laptop Berlapis Busa, 2 Saku Botol, Saku Depan',
    },
  },
  {
    id: 'cat-2',
    title: 'Kotak Pensil Kayu Jati Ukir Halus',
    price: 38000,
    rating: 4.8,
    reviewCount: 89,
    soldCount: '89 terjual',
    soldNumeric: 89,
    origin: 'Jepara',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Alat Tulis',
    storeId: 'store-1',
    storeName: 'Galeri Kriya Troso & Cirebon',
    variants: ['Ukir Lung-lungan Jati', 'Jati Polos Natural', 'Set Pena & Kotak'],
    freeShipping: false,
    stockLeft: 19,
    image: imgKotakPensilJati,
    specs: {
      material: 'Kayu Jati Perhutani Tua Pilihan',
      dimensions: '21 x 7 x 5 cm',
      strapOrFeature: 'Engsel Kuningan Tanam & Pengunci Magnet',
      weight: '240 gram',
      compartmentOrDetail: '2 Sekat Alat Tulis Dalam Berlapis Kain Flanel Halus',
    },
  },
  {
    id: 'cat-3',
    title: 'Syal Tenun Pewarna Alami Indigo',
    price: 120000,
    originalPrice: 150000,
    discountPercent: 20,
    rating: 5.0,
    reviewCount: 64,
    soldCount: '64 terjual',
    soldNumeric: 64,
    origin: 'Pekalongan',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Batik Lokal',
    storeId: 'store-pekalongan',
    storeName: 'Tenun Indigo Pekalongan',
    variants: ['Biru Indigo Tua', 'Biru Langit Cerah', 'Kombinasi Lurik'],
    freeShipping: true,
    stockLeft: 8,
    image: imgSyalTenunIndigo,
    specs: {
      material: 'Benang Katun Pintal Tangan & Pewarna Daun Tarum Indigo',
      dimensions: '180 x 35 cm (Termasuk Rumbai Tangan)',
      strapOrFeature: 'Tenun ATBM (Alat Tenun Bukan Mesin) Lembut di Kulit',
      weight: '210 gram',
      compartmentOrDetail: 'Kemasan Pouch Blacu Ramah Lingkungan',
    },
  },
  {
    id: 'cat-4',
    title: 'Tempat Tisu Anyaman Rotan Sintetis',
    price: 52000,
    rating: 4.7,
    reviewCount: 145,
    soldCount: '145 terjual',
    soldNumeric: 145,
    origin: 'Cirebon',
    badge: 'Official Store',
    badgeType: 'official',
    category: 'Kerajinan Rotan',
    storeId: 'store-cirebon-rotan',
    storeName: 'Sentra Rotan Tegalwangi Cirebon',
    variants: ['Honey Beige', 'Cokelat Tua Klasik', 'Putih Minimalis'],
    freeShipping: true,
    stockLeft: 27,
    image: imgTempatTisuRotan,
    specs: {
      material: 'Rangka Kayu Mahoni & Anyaman Rotan Cirebon',
      dimensions: '24 x 13 x 10 cm (Ukuran Tisu Wajah Standar)',
      strapOrFeature: 'Tutup Bukaan Atas dengan Kancing Kait Rotan',
      weight: '320 gram',
      compartmentOrDetail: 'Mudah Dibersihkan & Tahan Lembap',
    },
  },
  {
    id: 'cat-5',
    title: 'Gantungan Kunci Kulit Custom Grafir',
    price: 18500,
    rating: 4.9,
    reviewCount: 520,
    soldCount: '520 terjual',
    soldNumeric: 520,
    origin: 'Yogyakarta',
    badge: 'Terlaris',
    badgeType: 'terlaris',
    category: 'Aksesoris',
    storeId: 'store-yogya',
    storeName: 'Kriya Kulit Malioboro',
    variants: ['Tan Brown Grafir Nama', 'Dark Havana Polos', 'Set 3 Pcs Souvenir'],
    freeShipping: false,
    stockLeft: 50,
    image: imgGantunganKunciKulit,
    specs: {
      material: 'Kulit Sapi Pull-Up Asli & Pengait Kuningan Bakar',
      dimensions: '10 x 2.5 cm',
      strapOrFeature: 'Gratis Grafir Laser Nama / Inisial',
      weight: '35 gram',
      compartmentOrDetail: '1 Ring Utama + 1 Pengait Carabiner',
    },
  },
  {
    id: 'cat-6',
    title: 'Tote Bag Blacu Motif Mega Mendung Cirebon',
    price: 65000,
    originalPrice: 85000,
    discountPercent: 23,
    rating: 4.9,
    reviewCount: 410,
    soldCount: '410 terjual',
    soldNumeric: 410,
    origin: 'Cirebon',
    badge: 'Terlaris',
    badgeType: 'terlaris',
    category: 'Tas Etnik',
    storeId: 'store-2',
    storeName: 'Batik Pesisir Cirebon',
    variants: ['Biru Mega Mendung', 'Navy Blue Canvas', 'Merah Terakota Cirebon'],
    freeShipping: true,
    stockLeft: 16,
    image: imgTotebagMegamendung,
    specs: {
      material: 'Kanvas Blacu Serat Tebal & Batik Cap Mega Mendung',
      dimensions: '38 x 34 x 8 cm (Muat Buku Kuliah & Laptop 14 Inch)',
      strapOrFeature: 'Tali Bahu Webbing Katun Jahit Silang Kuat',
      weight: '260 gram',
      compartmentOrDetail: 'Penutup Resleting YKK + 1 Saku Dalam',
    },
  },
  {
    id: 'cat-7',
    title: 'Buku Agenda Hardcover Batik Tulis',
    price: 75000,
    rating: 4.8,
    reviewCount: 112,
    soldCount: '112 terjual',
    soldNumeric: 112,
    origin: 'Solo',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Alat Tulis',
    storeId: 'store-solo',
    storeName: 'Pustaka Batik Laweyan',
    variants: ['Motif Parang Kencana', 'Motif Sekar Jagad', 'Motif Kawung Klasik'],
    freeShipping: true,
    stockLeft: 15,
    image: imgBukuAgendaBatik,
    specs: {
      material: 'Hardcover Lapis Kain Batik Asli & Kertas HVS Ivory',
      dimensions: '15 x 21.5 cm (Ukuran A5 Eksklusif)',
      strapOrFeature: 'Pita Pembatas Halaman & Karet Penutup',
      weight: '390 gram',
      compartmentOrDetail: '160 Halaman Bergaris Halus + Saku Kartu Belakang',
    },
  },
  {
    id: 'cat-8',
    title: 'Lilin Aromaterapi Pot Gerabah Alami',
    price: 42000,
    rating: 4.9,
    reviewCount: 98,
    soldCount: '98 terjual',
    soldNumeric: 98,
    origin: 'Bandung',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Dekorasi',
    storeId: 'store-bandung',
    storeName: 'Aroma Bumi Priangan',
    variants: ['Frangipani & Cinnamon', 'Lavender & Sandalwood', 'Lemongrass Segar'],
    freeShipping: false,
    stockLeft: 21,
    image: imgLilinPotGerabah,
    specs: {
      material: 'Pot Gerabah Terakota Handmade & Minyak Atsiri Murni',
      dimensions: 'Diameter 9 cm x Tinggi 8 cm',
      strapOrFeature: 'Aroma Relaksasi Ruangan tahan hingga 25 Jam',
      weight: '260 gram',
      compartmentOrDetail: 'Pot Gerabah Dapat Digunakan Kembali untuk Sukulen',
    },
  },
];

export const SEARCH_PRODUCTS: Product[] = [
  {
    id: 'srch-1',
    title: 'Tas Anyaman Pandan Etnik Premium',
    price: 85000,
    originalPrice: 100000,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 142,
    soldCount: '142 terjual',
    soldNumeric: 142,
    origin: 'Cirebon',
    badge: 'Official Store',
    badgeType: 'official',
    category: 'Tas Etnik',
    storeId: 'store-cirebon-rotan',
    storeName: 'Sentra Rotan Tegalwangi Cirebon',
    variants: ['Natural Tan Handle Kulit', 'Motif Geometris Cirebon', 'Ukuran Besar Tote'],
    freeShipping: true,
    stockLeft: 10,
    image: imgTasAnyamanPandan,
    specs: {
      material: 'Anyaman Pandan Pilihan & Handel Kulit Sapi',
      dimensions: '30 x 12 x 24 cm',
      strapOrFeature: 'Furing Dalam Serut Katun Lembut',
      weight: '380 gram',
      compartmentOrDetail: '1 Ruang Utama Luas + 2 Saku HP Dalam',
    },
  },
  {
    id: 'srch-2',
    title: 'Tas Jinjing Rotan Bulat Kombinasi Kulit',
    price: 135000,
    rating: 4.8,
    reviewCount: 88,
    soldCount: '88 terjual',
    soldNumeric: 88,
    origin: 'Cirebon',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Tas Etnik',
    storeId: 'store-cirebon-rotan',
    storeName: 'Sentra Rotan Tegalwangi Cirebon',
    variants: ['Diameter 20cm Natural', 'Diameter 22cm Smoked', 'Tali Kulit Cokelat Tua'],
    freeShipping: true,
    stockLeft: 7,
    image: imgTasRotanBulat,
    specs: {
      material: 'Rotan Ate Asli Asap Tradisional & Tali Kulit',
      dimensions: 'Diameter 20 cm x Tebal 8 cm',
      strapOrFeature: 'Kancing Klip Kulit & Lapisan Kain Batik Dalam',
      weight: '340 gram',
      compartmentOrDetail: 'Muat Smartphone, Dompet Lipat & Kosmetik',
    },
  },
  {
    id: 'srch-3',
    title: 'Tas Selempang Goni Ramah Lingkungan',
    price: 48000,
    rating: 4.7,
    reviewCount: 54,
    soldCount: '54 terjual',
    soldNumeric: 54,
    origin: 'Bandung',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Tas Etnik',
    storeId: 'store-bandung',
    storeName: 'Kertas Nusantara Studio',
    variants: ['Goni Natural List Tenun', 'Goni Khaki Polos', 'Goni Saku Dua'],
    freeShipping: false,
    stockLeft: 19,
    image: imgTasSelempangGoni,
    specs: {
      material: 'Serat Goni Burlap Premium & Aksen Tenun',
      dimensions: '23 x 6 x 17 cm',
      strapOrFeature: 'Tali Katun Kepang Bisa Diatur Panjangnya',
      weight: '220 gram',
      compartmentOrDetail: '1 Ruang Utama Resleting + 1 Saku Depan Kancing Kayu',
    },
  },
  {
    id: 'srch-4',
    title: 'Pouch Anyaman Bambu Mini Serbaguna',
    price: 25000,
    rating: 4.9,
    reviewCount: 210,
    soldCount: '210 terjual',
    soldNumeric: 210,
    origin: 'Tasikmalaya',
    badge: 'Terlaris',
    badgeType: 'terlaris',
    category: 'Tas Etnik',
    storeId: 'store-tasik',
    storeName: 'Saung Kriya Tasikmalaya',
    variants: ['Anyaman Kepang Natural', 'Anyaman Kancing Kayu', 'Paket Souvenir 5 Pcs'],
    freeShipping: true,
    stockLeft: 35,
    image: imgPouchBambu,
    specs: {
      material: 'Bambu Serut Halus & Kain Blacu Dalam',
      dimensions: '18 x 5 x 12 cm',
      strapOrFeature: 'Resleting Halus dengan Bandul Manik Kayu',
      weight: '95 gram',
      compartmentOrDetail: 'Cocok untuk Pouch Kosmetik, Kabel, atau Souvenir',
    },
  },
];

// Additional category-specific products so every category on Beranda & Kategori has complete, matching items
export const EXTRA_CATEGORY_PRODUCTS: Product[] = [
  // BATIK LOKAL
  {
    id: 'batik-3',
    title: 'Kain Batik Tulis Mega Mendung Trusmi Cirebon',
    price: 275000,
    originalPrice: 340000,
    discountPercent: 19,
    rating: 5.0,
    reviewCount: 186,
    soldCount: '186 terjual',
    soldNumeric: 186,
    origin: 'Cirebon',
    badge: 'Official Store',
    badgeType: 'official',
    category: 'Batik Lokal',
    storeId: 'store-2',
    storeName: 'Batik Pesisir Cirebon',
    variants: ['Biru Samudra Klasik', 'Merah Marun Keraton', 'Hijau Toska Pesisir'],
    freeShipping: true,
    stockLeft: 8,
    image: imgKainBatikMegamendung,
    specs: {
      material: 'Katun Primisima Canting Tulis Malam Asli',
      dimensions: '240 x 115 cm (Kain Panjang Utuh)',
      strapOrFeature: 'Pewarnaan Celup Tradisional Tidak Luntur',
      weight: '350 gram',
      compartmentOrDetail: 'Dilengkapi Sertifikat Keaslian Kampung Batik Trusmi',
    },
  },
  {
    id: 'batik-4',
    title: 'Outer Kimono Tenun Ikat & Batik Pesisir',
    price: 165000,
    originalPrice: 210000,
    discountPercent: 21,
    rating: 4.9,
    reviewCount: 142,
    soldCount: '230 terjual',
    soldNumeric: 230,
    origin: 'Cirebon',
    badge: 'Terlaris',
    badgeType: 'terlaris',
    category: 'Batik Lokal',
    storeId: 'store-2',
    storeName: 'Batik Pesisir Cirebon',
    variants: ['Indigo Mega Mendung (All Size)', 'Sogan Parang (All Size)', 'Navy Lurik (L-XL)'],
    freeShipping: true,
    stockLeft: 12,
    image: imgOuterKimonoBatik,
    specs: {
      material: 'Kombinasi Tenun ATBM & Batik Cap Halus',
      dimensions: 'Lingkar Dada 112 cm x Panjang 72 cm',
      strapOrFeature: 'Potongan Cardigan Modern Unisex',
      weight: '310 gram',
      compartmentOrDetail: '2 Saku Samping Dalam & Tali Ikat Pinggang Lepas-Pasang',
    },
  },

  // AKSESORIS
  {
    id: 'aks-3',
    title: 'Kalung Etnik Manik Kayu & Liontin Tenun',
    price: 45000,
    originalPrice: 55000,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 115,
    soldCount: '195 terjual',
    soldNumeric: 195,
    origin: 'Cirebon',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Aksesoris',
    storeId: 'store-1',
    storeName: 'Galeri Kriya Troso & Cirebon',
    variants: ['Cendana Natural', 'Eboni Hitam Klasik', 'Merah Marun Etnik'],
    freeShipping: true,
    stockLeft: 20,
    image: imgKalungEtnikKayu,
    specs: {
      material: 'Manik Kayu Cendana & Tali Kulit Suede Halus',
      dimensions: 'Panjang Kalung Adjustable 45 - 65 cm',
      strapOrFeature: 'Simpul Geser Mudah Disesuaikan',
      weight: '55 gram',
      compartmentOrDetail: 'Cocok Dipadukan dengan Busana Batik & Kasual',
    },
  },
  {
    id: 'aks-4',
    title: 'Card Holder Kulit Sapi Asli Grafir Motif Nusantara',
    price: 58000,
    rating: 4.9,
    reviewCount: 174,
    soldCount: '260 terjual',
    soldNumeric: 260,
    origin: 'Yogyakarta',
    badge: 'Official Store',
    badgeType: 'official',
    category: 'Aksesoris',
    storeId: 'store-yogya',
    storeName: 'Kriya Kulit Malioboro',
    variants: ['Tan Vintage Ukir', 'Cokelat Kopi Polos', 'Hitam Grafir Nama'],
    freeShipping: true,
    stockLeft: 24,
    image: imgCardHolderKulit,
    specs: {
      material: '100% Kulit Sapi Crazy Horse Asli',
      dimensions: '10.5 x 8 cm (Slim Fit Saku)',
      strapOrFeature: 'Jahitan Tangan Benang Wax (Hand-stitched)',
      weight: '60 gram',
      compartmentOrDetail: '6 Slot Kartu ATM/KTM + 1 Slot Tengah Uang Lipat',
    },
  },

  // ALAT TULIS
  {
    id: 'atk-4',
    title: 'Set Buku Sketsa A5 & Pena Bambu Ukir',
    price: 54000,
    originalPrice: 68000,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 96,
    soldCount: '150 terjual',
    soldNumeric: 150,
    origin: 'Bandung',
    badge: 'Terlaris',
    badgeType: 'terlaris',
    category: 'Alat Tulis',
    storeId: 'store-bandung',
    storeName: 'Kertas Nusantara Studio',
    variants: ['Paket Sketsa Kraft + Pena', 'Paket Kertas Cat Air', 'Paket Kuliah Lengkap'],
    freeShipping: true,
    stockLeft: 17,
    image: imgBukuSketsaBambu,
    specs: {
      material: 'Kertas Sketsa 150gsm Bebas Asam & Pena Bambu',
      dimensions: '21 x 15 cm (A5)',
      strapOrFeature: 'Termasuk Pena Bambu Isi Ulang Tinta Gel Hitam',
      weight: '340 gram',
      compartmentOrDetail: '100 Lembar Kertas + Pembatas Buku Serat Daun',
    },
  },

  // KERAJINAN ROTAN
  {
    id: 'rotan-4',
    title: 'Nampan Baki Saji Anyaman Rotan Tegalwangi',
    price: 78000,
    originalPrice: 95000,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 134,
    soldCount: '220 terjual',
    soldNumeric: 220,
    origin: 'Cirebon',
    badge: 'Official Store',
    badgeType: 'official',
    category: 'Kerajinan Rotan',
    storeId: 'store-cirebon-rotan',
    storeName: 'Sentra Rotan Tegalwangi Cirebon',
    variants: ['Persegi Panjang 35x25cm', 'Bulat Diameter 30cm', 'Set 2 Pcs (M & L)'],
    freeShipping: true,
    stockLeft: 14,
    image: imgNampanRotan,
    specs: {
      material: 'Rotan Alami Pilihan Khas Tegalwangi Cirebon',
      dimensions: '35 x 25 x 6 cm',
      strapOrFeature: 'Finishing Melamin Food-Safe & Handel Samping',
      weight: '480 gram',
      compartmentOrDetail: 'Cocok untuk Saji Kopi/Teh & Dekorasi Meja Ruang Tamu',
    },
  },

  // DEKORASI
  {
    id: 'dek-4',
    title: 'Vas Meja Estetik Gerabah Terakota Kasongan',
    price: 64000,
    originalPrice: 80000,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 112,
    soldCount: '185 terjual',
    soldNumeric: 185,
    origin: 'Yogyakarta',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Dekorasi',
    storeId: 'store-kasongan',
    storeName: 'Sentra Keramik Kasongan',
    variants: ['Terakota Ukir Garis', 'Putih Rustic Minimalis', 'Paket Vas + Bunga Kering'],
    freeShipping: true,
    stockLeft: 15,
    image: imgVasGerabahKasongan,
    specs: {
      material: 'Tanah Liat Terakota Bakar Halus Kasongan',
      dimensions: 'Diameter 12 cm x Tinggi 20 cm',
      strapOrFeature: 'Tekstur Natural Rustic untuk Dekorasi Meja & Rak',
      weight: '520 gram',
      compartmentOrDetail: '1 Vas Gerabah + Pelindung Alas Gabus Anti Gores',
    },
  },

  // KULINER KHAS
  {
    id: 'kul-1',
    title: 'Kopi Robusta Puntang & Gula Aren Organik',
    price: 48000,
    originalPrice: 60000,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 245,
    soldCount: '420 terjual',
    soldNumeric: 420,
    origin: 'Bandung',
    badge: 'Terlaris',
    badgeType: 'terlaris',
    category: 'Kuliner Khas',
    storeId: 'store-kuliner-crb',
    storeName: 'Dapur Warisan Cirebon & Priangan',
    variants: ['Biji Sangrai (250g)', 'Bubuk Halus (250g)', 'Paket Kopi + Gula Aren'],
    freeShipping: true,
    stockLeft: 28,
    image: imgKopiRobusta,
    specs: {
      material: '100% Biji Kopi Petik Merah Gunung Puntang Jawa Barat',
      dimensions: 'Kemasan Pouch Aluminium Foil Katup Udara 250g',
      strapOrFeature: 'Roasting Medium-Dark Aroma Cokelat & Rempah',
      weight: '275 gram',
      compartmentOrDetail: 'Bersertifikat Halal & P-IRT UMKM Lokal',
    },
  },
  {
    id: 'kul-2',
    title: 'Empal Gentong Bumbu Rempah Khas Cirebon (Kemasan Vakum)',
    price: 65000,
    originalPrice: 78000,
    discountPercent: 17,
    rating: 5.0,
    reviewCount: 318,
    soldCount: '540 terjual',
    soldNumeric: 540,
    origin: 'Cirebon',
    badge: 'Official Store',
    badgeType: 'official',
    category: 'Kuliner Khas',
    storeId: 'store-kuliner-crb',
    storeName: 'Dapur Warisan Cirebon & Priangan',
    variants: ['Daging Sapi Empuk (2 Porsi)', 'Campur Babat & Daging', 'Paket Ekstra Sambal Cabai Kering'],
    freeShipping: true,
    stockLeft: 19,
    image: imgEmpalGentong,
    specs: {
      material: 'Daging Sapi Segar Pilihan & Bumbu Rempah Tradisional Cirebon',
      dimensions: 'Kemasan Vakum Higienis Tahan Pengiriman Antar Kota',
      strapOrFeature: 'Praktis Tinggal Dipanaskan 5 Menit',
      weight: '450 gram (Untuk 2-3 Porsi Makan)',
      compartmentOrDetail: 'Daging Sapi + Bumbu Kuah Kental + Kucai & Sambal Cabai Kering',
    },
  },
  {
    id: 'kul-3',
    title: 'Oleh-Oleh Kerupuk Udang & Sambal Terasi Pesisir Cirebon',
    price: 35000,
    rating: 4.9,
    reviewCount: 290,
    soldCount: '610 terjual',
    soldNumeric: 610,
    origin: 'Cirebon',
    badge: 'Terlaris',
    badgeType: 'terlaris',
    category: 'Kuliner Khas',
    storeId: 'store-kuliner-crb',
    storeName: 'Dapur Warisan Cirebon & Priangan',
    variants: ['Kerupuk Udang Matang + Sambal', 'Kerupuk Udang Mentah Super 500g', 'Paket Hampers Bambu Cirebon'],
    freeShipping: true,
    stockLeft: 32,
    image: imgKerupukUdang,
    specs: {
      material: 'Udang Laut Segar Pesisir Cirebon & Tepung Tapioka Pilihan',
      dimensions: 'Kemasan Besek Anyaman Bambu / Pouch Ziplock 350g',
      strapOrFeature: 'Renyah Tanpa Bahan Pengawet Buatan',
      weight: '380 gram',
      compartmentOrDetail: '1 Pak Kerupuk Udang + 1 Jar Sambal Terasi Khas Cirebon',
    },
  },
  {
    id: 'kul-4',
    title: 'Wedang Uwuh & Teh Rempah Secang Tradisional (Isi 10 Sachet)',
    price: 32000,
    originalPrice: 40000,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 168,
    soldCount: '310 terjual',
    soldNumeric: 310,
    origin: 'Yogyakarta',
    badge: 'Handmade',
    badgeType: 'handmade',
    category: 'Kuliner Khas',
    storeId: 'store-kuliner-crb',
    storeName: 'Dapur Warisan Cirebon & Priangan',
    variants: ['Original Gula Batu (10 Pcs)', 'Jahe Merah Ekstra Hangat', 'Tanpa Gula (Diet Friendly)'],
    freeShipping: true,
    stockLeft: 40,
    image: imgWedangUwuh,
    specs: {
      material: 'Kayu Secang, Jahe Kering, Cengkeh, Kayu Manis, Kapulaga & Gula Batu',
      dimensions: 'Besek Bambu Tradisional (18 x 18 x 8 cm)',
      strapOrFeature: '100% Rempah Alami Pengeringan Higienis',
      weight: '350 gram',
      compartmentOrDetail: '10 Sachet Seduh Lengkap + Besek Anyaman Bambu',
    },
  },
];

export const ALL_CATALOG_PRODUCTS: Product[] = [
  ...HOME_RECOMMENDED_PRODUCTS,
  ...CATEGORY_PRODUCTS,
  ...SEARCH_PRODUCTS,
  ...FLASH_PROMO_PRODUCTS,
  ...EXTRA_CATEGORY_PRODUCTS,
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-1',
    productId: 'rec-1',
    storeId: 'store-1',
    storeName: 'Galeri Kriya Troso',
    storeOrigin: 'Kab. Jepara',
    title: 'Tas Selempang Kulit & Tenun Troso Handmade',
    variant: 'Tenun Hitam Navy',
    availableVariants: ['Tenun Hitam Navy', 'Tenun Etnik Merah Bata', 'Tenun Cokelat Tanah'],
    price: 185000,
    originalPrice: 230000,
    discountPercent: 20,
    badge: 'Handmade',
    image: imgTasSelempangTenun,
    quantity: 1,
    checked: true,
  },
  {
    id: 'cart-2',
    productId: 'cat-6',
    storeId: 'store-2',
    storeName: 'Batik Pesisir Cirebon',
    storeOrigin: 'Kota Cirebon',
    title: 'Tote Bag Blacu Motif Mega Mendung Cirebon',
    variant: 'Biru Mega Mendung',
    availableVariants: ['Biru Mega Mendung', 'Navy Blue Canvas', 'Merah Terakota Cirebon'],
    price: 65000,
    originalPrice: 85000,
    discountPercent: 23,
    badge: 'Batik Cap',
    image: imgTotebagMegamendung,
    quantity: 1,
    checked: true,
  },
];

export const INITIAL_ADDRESSES: AddressItem[] = [
  {
    id: 1,
    label: 'Rumah',
    isMain: true,
    recipient: 'Fajar Pratama',
    phoneOrSub: '(0812-3456-7890)',
    fullAddress:
      'Jl. Kesambi Raya No. 45, RT 03 / RW 06, Kel. Kesambi, Kec. Kesambi, Kota Cirebon, Jawa Barat 45134',
    patokan: 'Pagar hitam samping Apotek Sehat Mandiri, depan minimarket',
    shortLabel: 'Kesambi, Cirebon',
  },
  {
    id: 2,
    label: 'Kampus',
    isMain: false,
    recipient: 'Fajar Pratama',
    phoneOrSub: '(Mahasiswa RPL STMIK IKMI Cirebon)',
    fullAddress:
      'Kampus STMIK IKMI Cirebon, Jl. Perjuangan No. 10B, Karyamulya, Kec. Kesambi, Kota Cirebon, Jawa Barat 45135',
    shortLabel: 'STMIK IKMI, Cirebon',
  },
  {
    id: 3,
    label: 'Keluarga',
    isMain: false,
    recipient: 'Ibu Siti Rohmah',
    phoneOrSub: '(0857-9876-5432)',
    fullAddress: 'Jl. Tuparev No. 88, Kedawung, Cirebon, Jawa Barat 45153',
    shortLabel: 'Kedawung, Cirebon',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'LKM-20241028-8921',
    dateStr: '28 Okt 2024',
    timeStr: '28 Oktober 2024, 14:32 WIB',
    status: 'Diproses',
    storeId: 'store-1',
    storeName: 'Galeri Kriya Troso & Cirebon',
    storeOrigin: 'Cirebon & Jepara',
    items: [
      {
        id: 'oi-1',
        productId: 'rec-1',
        title: 'Tas Selempang Kulit & Tenun Troso Handmade',
        variant: 'Tenun Hitam Navy',
        price: 185000,
        quantity: 1,
        origin: 'Jepara',
        image: imgTasSelempangTenun,
      },
      {
        id: 'oi-2',
        productId: 'cat-6',
        title: 'Tote Bag Blacu Motif Mega Mendung Cirebon',
        variant: 'Biru Mega Mendung',
        price: 65000,
        quantity: 1,
        origin: 'Cirebon',
        image: imgTotebagMegamendung,
      },
    ],
    subtotal: 250000,
    shippingFee: 14000,
    shippingDiscount: 14000,
    voucherDiscount: 20000,
    serviceFee: 1000,
    totalPayment: 231000,
    shippingService: 'Reguler',
    courierName: 'J&T Express',
    resiNumber: 'JT-9283746210',
    etaText: 'Estimasi tiba: 30 Okt - 01 Nov 2024',
    paymentMethod: 'BCA Virtual Account (123 456 7890)',
    vaNumber: '1234 5678 90',
    address: INITIAL_ADDRESSES[0],
    trackingSteps: [
      {
        title: 'Resi telah dibuat, paket menunggu penjemputan kurir.',
        time: '28 Okt, 15:45 WIB',
        active: true,
      },
      {
        title: 'Pembayaran pesanan terkonfirmasi.',
        time: '28 Okt, 15:20 WIB',
        active: false,
      },
    ],
  },
  {
    id: 'ord-2',
    orderNumber: 'LKM-20241025-4410',
    dateStr: '25 Okt 2024',
    timeStr: '25 Oktober 2024, 10:15 WIB',
    status: 'Dikirim',
    storeId: 'store-kasongan',
    storeName: 'Sentra Keramik Kasongan',
    storeOrigin: 'Bantul, Yogyakarta',
    items: [
      {
        id: 'oi-3',
        productId: 'rec-5',
        title: 'Cangkir Keramik Gerabah Kasongan Set 2pcs',
        variant: 'Natural Terracotta',
        price: 55000,
        quantity: 1,
        origin: 'Bantul',
        image: imgCangkirKeramik,
      },
    ],
    subtotal: 55000,
    shippingFee: 18500,
    shippingDiscount: 0,
    voucherDiscount: 0,
    serviceFee: 1000,
    totalPayment: 74500,
    shippingService: 'Reguler',
    courierName: 'SiCepat',
    resiNumber: '00293847291',
    etaText: 'Sedang diantar ke Cirebon',
    paymentMethod: 'BCA Virtual Account (123 456 7890)',
    vaNumber: '1234 5678 90',
    address: INITIAL_ADDRESSES[0],
    trackingSteps: [
      {
        title: 'Kurir SiCepat sedang mengantar paket ke alamat tujuan di Kesambi, Cirebon.',
        time: '27 Okt, 09:30 WIB',
        active: true,
      },
      {
        title: 'Paket telah tiba di Hub Sortir Cirebon.',
        time: '26 Okt, 21:15 WIB',
        active: false,
      },
      {
        title: 'Paket telah diserahkan pengrajin Kasongan ke gerai kurir.',
        time: '25 Okt, 16:40 WIB',
        active: false,
      },
    ],
  },
  {
    id: 'ord-3',
    orderNumber: 'LKM-20241018-3109',
    dateStr: '18 Okt 2024',
    timeStr: '18 Oktober 2024, 19:05 WIB',
    status: 'Selesai',
    storeId: 'store-2',
    storeName: 'Batik Pesisir Cirebon',
    storeOrigin: 'Kota Cirebon',
    items: [
      {
        id: 'oi-4',
        productId: 'cat-6',
        title: 'Tote Bag Blacu Motif Mega Mendung Cirebon',
        variant: 'Navy Blue Canvas',
        price: 65000,
        quantity: 1,
        origin: 'Cirebon',
        image: imgTotebagMegamendung,
      },
    ],
    subtotal: 65000,
    shippingFee: 16000,
    shippingDiscount: 0,
    voucherDiscount: 0,
    serviceFee: 1000,
    totalPayment: 82000,
    shippingService: 'Reguler',
    courierName: 'J&T Express',
    resiNumber: 'JT-8812039481',
    etaText: 'Terkirim pada 20 Okt 2024',
    paymentMethod: 'BCA Virtual Account (123 456 7890)',
    vaNumber: '1234 5678 90',
    address: INITIAL_ADDRESSES[0],
    trackingSteps: [
      {
        title: 'Pesanan telah diterima oleh Fajar Pratama. Transaksi selesai.',
        time: '20 Okt, 14:10 WIB',
        active: true,
      },
      {
        title: 'Paket sedang diantar kurir menuju Kesambi, Cirebon.',
        time: '20 Okt, 08:45 WIB',
        active: false,
      },
    ],
  },
];

export function formatRp(amount: number): string {
  return 'Rp ' + Math.max(0, Math.round(amount)).toLocaleString('id-ID');
}
