import React, { useEffect, useMemo, useState } from 'react';
import {
  ALL_CATALOG_PRODUCTS,
  CATEGORY_PRODUCTS,
  CategoryName,
  FLASH_PROMO_PRODUCTS,
  HOME_RECOMMENDED_PRODUCTS,
  LOKAMART_LOGO_URL,
  PRODUCT_CATEGORIES,
  Product,
  SEARCH_PRODUCTS,
  SELLER_AVATAR_URL,
  ScreenId,
  formatRp,
} from '../data';
import { SafeImage } from './ShellComponents';

interface CommonScreenProps {
  userName?: string;
  onNavigate: (screen: ScreenId) => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory?: (cat: CategoryName) => void;
  onOpenSearchWithQuery?: (query: string) => void;
  onAddToCart: (product: Product, variant: string, qty: number) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  selectedAddressShort: string;
  onShowToast: (msg: string) => void;
}

export const BerandaScreen: React.FC<CommonScreenProps> = ({
  userName = 'Fajar Pratama',
  onNavigate,
  onSelectProduct,
  onSelectCategory,
  onOpenSearchWithQuery,
  wishlistIds,
  onToggleWishlist,
  selectedAddressShort,
  onShowToast,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 45 * 60 + 10);
  const [voucherClaimed, setVoucherClaimed] = useState(false);
  const [activeHomeCategory, setActiveHomeCategory] = useState<CategoryName>('Semua');

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Deduplicate ALL_CATALOG_PRODUCTS by id
  const uniqueAllProducts = useMemo(() => {
    return Array.from(new Map(ALL_CATALOG_PRODUCTS.map((p) => [p.id, p])).values());
  }, []);

  const homeDisplayedProducts = useMemo(() => {
    if (activeHomeCategory === 'Semua') {
      return HOME_RECOMMENDED_PRODUCTS;
    }
    return uniqueAllProducts.filter((p) => p.category === activeHomeCategory);
  }, [activeHomeCategory, uniqueAllProducts]);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      {/* Welcoming Section & Delivery Header */}
      <div className="px-margin @md:px-6 @lg:px-8 pt-space-sm @md:pt-5 pb-space-xs flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center p-1.5 shadow-sm shrink-0">
              <SafeImage
                alt="LokaMart Brand Logo"
                className="w-full h-full object-contain"
                src={LOKAMART_LOGO_URL}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-label-md text-label-md text-on-surface truncate">
                  Halo, {userName}
                </span>
                <span className="text-base">👋</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('alamat')}
                className="flex items-center gap-0.5 text-secondary text-left group hover:opacity-80"
              >
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                <span className="font-label-sm text-label-sm truncate max-w-[170px]">
                  Dikirim ke: {selectedAddressShort}
                </span>
                <span className="material-symbols-outlined text-[14px] text-outline">
                  expand_more
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              aria-label="Notifikasi"
              onClick={() => onNavigate('pesanan')}
              className="relative w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-lowest text-on-surface-variant shadow-sm active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-[9px] flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <button
              type="button"
              aria-label="Pesan"
              onClick={() => onShowToast('Ruang obrolan pengrajin: Semua pesan telah dibaca')}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-lowest text-on-surface-variant shadow-sm active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">chat_bubble_outline</span>
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div
          onClick={() => {
            if (onOpenSearchWithQuery) {
              onOpenSearchWithQuery('Tas Anyaman');
            } else {
              onNavigate('pencarian');
            }
          }}
          className="flex items-center gap-space-xs bg-surface-container-lowest rounded-xl px-space-md py-2.5 shadow-sm mt-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-outline text-[20px]">search</span>
          <input
            readOnly
            className="bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline w-full focus:outline-none cursor-pointer"
            placeholder="Cari tas batik, anyaman rotan, keramik..."
            type="text"
          />
          <button
            type="button"
            aria-label="Pindai kamera"
            onClick={(e) => {
              e.stopPropagation();
              onShowToast('Pencarian kamera: Arahkan ke produk kriya');
              onNavigate('pencarian');
            }}
            className="p-1 rounded-lg text-secondary hover:bg-surface-container active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </button>
        </div>
      </div>

      {/* Hero Promotional Banner */}
      <div className="px-margin @md:px-6 @lg:px-8 mt-space-md">
        <div className="relative overflow-hidden rounded-xl @md:rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary p-space-lg @md:p-8 text-on-primary shadow-md">
          <svg
            className="absolute -right-6 -bottom-6 w-44 h-44 text-on-primary opacity-10 pointer-events-none"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <path d="M50 0 L100 50 L50 100 L0 50 Z"></path>
            <circle cx="50" cy="50" fill="none" r="28" stroke="currentColor" strokeWidth="4"></circle>
            <path
              d="M50 15 L85 50 L50 85 L15 50 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            ></path>
          </svg>
          <div className="relative z-10 flex flex-col gap-1.5 max-w-[78%]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-on-tertiary-container/30 backdrop-blur-sm self-start">
              <span className="material-symbols-outlined text-tertiary-fixed text-[14px]">
                local_fire_department
              </span>
              <span className="font-label-sm text-label-sm text-tertiary-fixed tracking-wide uppercase">
                Pesta Karya Nusantara
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-primary leading-tight mt-0.5">
              Diskon s/d 50% Koleksi Kriya
            </h2>
            <p className="font-body-sm text-body-sm text-surface-container opacity-90 line-clamp-1">
              Dukung Pengrajin Lokal Cirebon &amp; Jawa Barat
            </p>
            <div className="mt-space-xs">
              <button
                type="button"
                onClick={() => {
                  setVoucherClaimed(true);
                  onShowToast('Voucher Kriya Rp 20.000 berhasil diklaim & siap dipakai di Keranjang!');
                }}
                className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-sm active:scale-95 transition-transform flex items-center gap-1"
              >
                <span>{voucherClaimed ? 'Voucher Rp 20.000 Aktif ✓' : 'Klaim Voucher Sekarang'}</span>
                {!voucherClaimed && (
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                )}
              </button>
            </div>
          </div>
          <div className="absolute bottom-2.5 right-3.5 flex items-center gap-1">
            <div className="w-4 h-1.5 rounded-full bg-surface-container-lowest"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/50"></div>
          </div>
        </div>
      </div>

      {/* Quick Category Grid (Synced 1-to-1 with Kategori Screen) */}
      <div className="px-margin @md:px-6 @lg:px-8 mt-space-lg">
        <div className="flex items-center justify-between mb-2 @md:mb-3">
          <span className="font-title-sm @md:text-title-md text-title-sm text-on-surface font-bold">
            Kategori Pilihan
          </span>
          <button
            type="button"
            onClick={() => {
              if (onSelectCategory) {
                onSelectCategory(activeHomeCategory);
              } else {
                onNavigate('kategori');
              }
            }}
            className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5 hover:underline"
          >
            <span>Buka Halaman Kategori</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>
        <div className="grid grid-cols-4 @md:grid-cols-8 gap-y-3.5 gap-x-2 @md:gap-3">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelectedOnHome = activeHomeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveHomeCategory(cat.id);
                  if (onSelectCategory) {
                    onSelectCategory(cat.id);
                  } else {
                    onNavigate('kategori');
                  }
                }}
                className="flex flex-col items-center gap-1.5 text-center cursor-pointer group"
              >
                <div
                  className={`w-13 h-13 p-3 rounded-2xl flex items-center justify-center shadow-sm group-active:scale-95 transition-all ${
                    isSelectedOnHome && cat.id !== 'Semua'
                      ? 'bg-primary text-on-primary ring-2 ring-secondary-fixed'
                      : cat.isHighlight
                      ? 'bg-surface-variant text-secondary'
                      : 'bg-surface-container-low text-primary hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                </div>
                <span
                  className={`font-label-sm text-label-sm text-on-surface line-clamp-1 ${
                    cat.isHighlight || isSelectedOnHome ? 'font-bold text-primary' : ''
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Flash Promo / Penawaran Terbatas */}
      <div className="mt-space-xl bg-surface-container-low/70 py-space-md @md:py-6 @md:mx-6 @lg:mx-8 @md:rounded-2xl">
        <div className="px-margin @md:px-6 flex items-center justify-between mb-space-sm @md:mb-4">
          <div className="flex items-center gap-space-xs">
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-on-tertiary-container text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              <span className="font-title-md text-title-md text-on-surface font-bold">
                Flash Promo
              </span>
            </div>
            <div className="flex items-center gap-1 bg-tertiary-container/10 px-2 py-0.5 rounded-full ml-1">
              <span className="material-symbols-outlined text-on-tertiary-container text-[12px]">
                timer
              </span>
              <span className="font-label-sm text-label-sm text-on-tertiary-container font-bold tracking-tight">
                {formatTimer(secondsLeft)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onSelectCategory) {
                onSelectCategory('Semua');
              } else {
                onNavigate('kategori');
              }
            }}
            className="font-label-md text-label-md text-secondary hover:underline flex items-center"
          >
            Lihat Semua
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Horizontal Product Scroll on Android, 5-Col Grid on Desktop */}
        <div className="flex @lg:grid @lg:grid-cols-5 gap-gutter @md:gap-4 overflow-x-auto px-margin @md:px-6 no-scrollbar pb-1">
          {FLASH_PROMO_PRODUCTS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="w-[148px] @lg:w-full shrink-0 bg-surface-container-lowest rounded-xl p-2 @md:p-3 shadow-sm flex flex-col justify-between cursor-pointer active:scale-[0.98] hover:shadow-md transition-all"
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-surface-container">
                <SafeImage
                  className="w-full h-full object-cover"
                  src={item.image}
                  alt={item.title}
                  fallbackText={item.title}
                />
                {item.discountPercent && (
                  <span className="absolute top-1 left-1 bg-on-tertiary-container text-on-tertiary font-label-sm text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                    -{item.discountPercent}%
                  </span>
                )}
                <span className="absolute bottom-1 left-1 bg-surface/90 backdrop-blur-xs font-label-sm text-[8px] text-primary px-1.5 py-0.5 rounded">
                  {item.category}
                </span>
              </div>
              <div className="mt-2 flex flex-col">
                <span className="font-body-sm text-[11px] text-on-surface line-clamp-1 font-medium mb-0.5">
                  {item.title}
                </span>
                <span className="font-currency-display text-currency-display text-primary leading-none">
                  {formatRp(item.price)}
                </span>
                {item.originalPrice && (
                  <span className="font-label-sm text-label-sm text-outline line-through mt-0.5">
                    {formatRp(item.originalPrice)}
                  </span>
                )}
                <div className="mt-2">
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-on-tertiary-container h-full rounded-full"
                      style={{ width: `${item.stockProgress || 50}%` }}
                    ></div>
                  </div>
                  <span
                    className={`font-label-sm text-[9px] mt-0.5 block ${
                      item.isUrgentStock
                        ? 'text-on-tertiary-container font-bold'
                        : 'text-outline'
                    }`}
                  >
                    {item.stockLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rekomendasi Untuk Anda (Responsive Product Grid: 2 Cols Android, 3-5 Cols Desktop) */}
      <div className="px-margin @md:px-6 @lg:px-8 mt-space-lg">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[22px]">
              auto_awesome
            </span>
            <h3 className="font-title-lg text-title-lg text-on-surface">
              {activeHomeCategory === 'Semua'
                ? 'Rekomendasi Untuk Anda'
                : `Koleksi ${activeHomeCategory}`}
            </h3>
          </div>
          {activeHomeCategory !== 'Semua' ? (
            <button
              type="button"
              onClick={() => setActiveHomeCategory('Semua')}
              className="font-label-sm text-label-sm text-secondary hover:underline"
            >
              Reset Filter
            </button>
          ) : (
            <span className="font-label-sm text-label-sm text-outline">Produk Terkurasi</span>
          )}
        </div>

        {/* Interactive Category Filter Pills right above Recommended Products */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2.5 -mx-margin px-margin">
          {(['Semua', ...PRODUCT_CATEGORIES.filter((c) => c.id !== 'Semua').map((c) => c.id)] as CategoryName[]).map(
            (catName) => {
              const isSelected = activeHomeCategory === catName;
              return (
                <button
                  key={catName}
                  type="button"
                  onClick={() => setActiveHomeCategory(catName)}
                  className={`shrink-0 px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                    isSelected
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {catName}
                </button>
              );
            }
          )}
        </div>

        <div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 gap-gutter @md:gap-4">
          {homeDisplayedProducts.map((item) => {
            const isLiked = wishlistIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="bg-surface-container-lowest rounded-xl p-2.5 shadow-sm flex flex-col justify-between group active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div>
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-surface-container">
                    <SafeImage
                      className="w-full h-full object-cover"
                      src={item.image}
                      alt={item.title}
                      fallbackText={item.title}
                    />
                    <span className="absolute top-1.5 left-1.5 bg-surface/90 backdrop-blur-xs font-label-sm text-[9px] text-primary px-1.5 py-0.5 rounded shadow-xs">
                      {item.origin}
                    </span>
                    <span className="absolute bottom-1.5 left-1.5 bg-primary/85 backdrop-blur-xs font-label-sm text-[9px] text-on-primary px-1.5 py-0.5 rounded shadow-xs">
                      {item.category}
                    </span>
                    <button
                      type="button"
                      aria-label="Simpan ke Wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(item.id);
                      }}
                      className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-xs flex items-center justify-center active:scale-90 transition-all shadow-xs ${
                        isLiked ? 'text-error' : 'text-outline hover:text-error'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={
                          isLiked
                            ? { fontVariationSettings: "'FILL' 1" }
                            : { fontVariationSettings: "'FILL' 0" }
                        }
                      >
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="mt-2">
                    <span className="font-body-md text-body-md text-on-surface line-clamp-2 leading-snug font-medium">
                      {item.title}
                    </span>
                  </div>
                </div>
                <div className="mt-2 pt-1">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-currency-display text-currency-display text-primary">
                      {formatRp(item.price)}
                    </span>
                    {item.discountPercent && (
                      <span className="bg-on-tertiary-container/10 text-on-tertiary-container font-label-sm text-[10px] px-1 py-0.5 rounded font-bold">
                        {item.discountPercent}%
                      </span>
                    )}
                  </div>
                  {item.originalPrice && (
                    <span className="font-body-sm text-body-sm text-outline line-through leading-none block mt-0.5">
                      {formatRp(item.originalPrice)}
                    </span>
                  )}
                  <div
                    className={`flex items-center gap-1 ${
                      item.originalPrice ? 'mt-1.5' : 'mt-2'
                    } text-on-surface-variant font-label-sm text-label-sm`}
                  >
                    <span
                      className="material-symbols-outlined text-[14px] text-tertiary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-bold text-on-surface">{item.rating.toFixed(1)}</span>
                    <span className="text-outline text-[11px]">({item.reviewCount})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* End of Feed Encouragement Footer */}
      <div className="px-margin my-space-lg text-center flex flex-col items-center">
        <div className="w-12 h-1 rounded-full bg-surface-container-highest mb-3"></div>
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
          Lestarikan Karya Nusantara
        </span>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Setiap pembelian Anda langsung memajukan ekonomi seniman &amp; UMKM lokal.
        </p>
      </div>
    </div>
  );
};

interface KategoriScreenProps extends CommonScreenProps {
  initialCategory?: CategoryName;
}

export const KategoriScreen: React.FC<KategoriScreenProps> = ({
  initialCategory = 'Semua',
  onNavigate,
  onSelectProduct,
  onSelectCategory,
  onOpenSearchWithQuery,
  wishlistIds,
  onToggleWishlist,
  onShowToast,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>(initialCategory);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'sesuai' | 'terlaris' | 'termurah' | 'rating'>('sesuai');
  const [showAllExtended, setShowAllExtended] = useState(true);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Exact same categories as BerandaScreen
  const categories: CategoryName[] = [
    'Semua',
    'Tas Etnik',
    'Batik Lokal',
    'Aksesoris',
    'Alat Tulis',
    'Kerajinan Rotan',
    'Kuliner Khas',
    'Dekorasi',
  ];

  const handleCategoryChange = (cat: CategoryName) => {
    setSelectedCategory(cat);
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      onShowToast(`Kategori dipilih: ${cat}`);
    }
  };

  const toggleQuickFilter = (label: string) => {
    setActiveQuickFilters((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const cycleSort = () => {
    const order: ('sesuai' | 'terlaris' | 'termurah' | 'rating')[] = [
      'sesuai',
      'terlaris',
      'termurah',
      'rating',
    ];
    const next = order[(order.indexOf(sortBy) + 1) % order.length];
    setSortBy(next);
    const labelMap = {
      sesuai: 'Paling Sesuai',
      terlaris: 'Paling Laris',
      termurah: 'Harga Terendah',
      rating: 'Rating Tertinggi',
    };
    onShowToast(`Diurutkan berdasarkan: ${labelMap[next]}`);
  };

  const sortLabelMap = {
    sesuai: 'Paling Sesuai',
    terlaris: 'Paling Laris',
    termurah: 'Harga Terendah',
    rating: 'Rating Tertinggi',
  };

  const uniqueAllProducts = useMemo(() => {
    return Array.from(new Map(ALL_CATALOG_PRODUCTS.map((p) => [p.id, p])).values());
  }, []);

  const displayedProducts = useMemo(() => {
    let filtered: Product[] = [];

    // Strict category filtering: products MUST match the selected category
    if (selectedCategory === 'Semua') {
      filtered = showAllExtended ? uniqueAllProducts : CATEGORY_PRODUCTS;
    } else {
      filtered = uniqueAllProducts.filter((p) => p.category === selectedCategory);
    }

    // Search filter within the selected category
    const trimmedSearch = searchValue.trim().toLowerCase();
    if (trimmedSearch) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmedSearch) ||
          p.origin.toLowerCase().includes(trimmedSearch) ||
          p.category.toLowerCase().includes(trimmedSearch) ||
          p.storeName.toLowerCase().includes(trimmedSearch)
      );
    }

    // Apply quick filters
    if (activeQuickFilters.includes('Rating 4.5+')) {
      filtered = filtered.filter((p) => p.rating >= 4.8);
    }
    if (activeQuickFilters.includes('Cirebon & Sekitar')) {
      filtered = filtered.filter((p) => p.origin.toLowerCase().includes('cirebon'));
    }
    if (activeQuickFilters.includes('Diskon Spesial')) {
      filtered = filtered.filter((p) => Boolean(p.discountPercent));
    }
    if (activeQuickFilters.includes('Gratis Ongkir')) {
      filtered = filtered.filter((p) => Boolean(p.freeShipping));
    }

    if (sortBy === 'termurah') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'terlaris') {
      filtered = [...filtered].sort((a, b) => (b.soldNumeric || 100) - (a.soldNumeric || 100));
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [selectedCategory, searchValue, activeQuickFilters, sortBy, showAllExtended, uniqueAllProducts]);

  const activeCategoryMeta = useMemo(() => {
    return (
      PRODUCT_CATEGORIES.find((c) => c.id === selectedCategory) ||
      PRODUCT_CATEGORIES[PRODUCT_CATEGORIES.length - 1]
    );
  }, [selectedCategory]);

  const activeFilterCount =
    activeQuickFilters.length + (selectedCategory !== 'Semua' ? 1 : 0) + (sortBy !== 'sesuai' ? 1 : 0);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-6">
      {/* Search & Category Header Area */}
      <div className="px-margin @md:px-6 @lg:px-8 flex flex-col gap-space-sm pt-space-sm @md:pt-5">
        <div className="flex items-center gap-space-sm w-full">
          <div className="flex-1 flex items-center bg-surface-container-lowest rounded-xl px-space-md py-2.5 shadow-sm">
            <button
              type="button"
              onClick={() => {
                if (onOpenSearchWithQuery) {
                  onOpenSearchWithQuery(searchValue.trim() || 'Tas Anyaman');
                } else {
                  onNavigate('pencarian');
                }
              }}
              className="material-symbols-outlined text-outline text-[20px] mr-2 shrink-0 hover:text-primary"
            >
              search
            </button>
            <input
              aria-label="Cari produk kerajinan"
              className="bg-transparent border-0 outline-none w-full text-on-surface font-body-md text-body-md placeholder:text-outline"
              type="text"
              placeholder={`Cari di kategori ${selectedCategory}...`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchValue.trim()) {
                  if (onOpenSearchWithQuery) {
                    onOpenSearchWithQuery(searchValue.trim());
                  } else {
                    onNavigate('pencarian');
                  }
                }
              }}
            />
            {searchValue && (
              <button
                aria-label="Hapus teks"
                onClick={() => setSearchValue('')}
                className="text-outline hover:text-primary active:scale-95 transition-transform shrink-0"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            )}
          </div>
          <button
            aria-label="Buka pencarian & filter lanjutan"
            onClick={() => onNavigate('pencarian')}
            className="w-11 h-11 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm shrink-0 active:scale-95 transition-transform relative"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-on-tertiary-container ring-2 ring-surface"></span>
          </button>
        </div>

        {/* Category Chips (Synced with Beranda) */}
        <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1 -mx-margin px-margin">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const catMeta = PRODUCT_CATEGORIES.find((c) => c.id === cat);
            const countInCat =
              cat === 'Semua'
                ? uniqueAllProducts.length
                : uniqueAllProducts.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {catMeta && (
                  <span className="material-symbols-outlined text-[15px]">{catMeta.icon}</span>
                )}
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-surface-container-lowest/20 text-on-primary'
                      : 'bg-surface-container text-outline'
                  }`}
                >
                  {countInCat}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Info Card */}
      <div className="px-margin @md:px-6 @lg:px-8 mt-space-xs">
        <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[20px]">
                {activeCategoryMeta.icon}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-title-sm text-title-sm text-primary font-bold truncate">
                  Kategori: {activeCategoryMeta.label}
                </span>
              </div>
              <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-1">
                {activeCategoryMeta.description}
              </p>
            </div>
          </div>
          {selectedCategory !== 'Semua' && (
            <button
              type="button"
              onClick={() => handleCategoryChange('Semua')}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-label-sm shadow-xs active:scale-95"
            >
              Semua
            </button>
          )}
        </div>
      </div>

      {/* Sorting, Filter Summary & Quick Filters Section */}
      <div className="mt-space-sm px-margin @md:px-6 @lg:px-8 flex flex-col gap-space-xs">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-1.5">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Menampilkan
            </span>
            <span className="font-title-sm text-title-sm text-primary">
              {displayedProducts.length} Produk {selectedCategory !== 'Semua' ? selectedCategory : ''}
            </span>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={cycleSort}
              className="flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded-full text-on-surface font-label-sm text-label-sm active:bg-surface-variant transition-colors"
            >
              <span>{sortLabelMap[sortBy]}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
          </div>
        </div>

        {/* Fast Toggle Filters */}
        <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1 -mx-margin px-margin">
          <button
            type="button"
            onClick={() => toggleQuickFilter('Rating 4.5+')}
            className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm shadow-sm active:scale-95 transition-transform ${
              activeQuickFilters.includes('Rating 4.5+')
                ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                : 'bg-surface-container-lowest text-on-surface'
            }`}
          >
            <span
              className="material-symbols-outlined text-on-tertiary-container text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span>Rating 4.5+</span>
          </button>
          <button
            type="button"
            onClick={() => toggleQuickFilter('Diskon Spesial')}
            className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm shadow-sm active:scale-95 transition-transform ${
              activeQuickFilters.includes('Diskon Spesial')
                ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                : 'bg-surface-container-lowest text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">local_offer</span>
            <span>Diskon Spesial</span>
          </button>
          <button
            type="button"
            onClick={() => toggleQuickFilter('Gratis Ongkir')}
            className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm shadow-sm active:scale-95 transition-transform ${
              activeQuickFilters.includes('Gratis Ongkir')
                ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                : 'bg-surface-container-lowest text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-secondary text-[14px]">
              local_shipping
            </span>
            <span>Gratis Ongkir</span>
          </button>
          <button
            type="button"
            onClick={() => toggleQuickFilter('Cirebon & Sekitar')}
            className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm shadow-sm active:scale-95 transition-transform ${
              activeQuickFilters.includes('Cirebon & Sekitar')
                ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                : 'bg-surface-container-lowest text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-primary text-[14px]">near_me</span>
            <span>Cirebon &amp; Sekitar</span>
          </button>
        </div>
      </div>

      {/* Product Grid: 2 Columns */}
      {displayedProducts.length === 0 ? (
        <div className="mx-margin mt-space-md bg-surface-container-lowest rounded-xl p-space-xl text-center flex flex-col items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-outline text-[36px]">inventory_2</span>
          <h3 className="font-title-md text-title-md text-primary">
            Tidak Ada Produk yang Sesuai Filter
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Coba reset filter cepat atau kata kunci pencarian untuk melihat semua koleksi{' '}
            {selectedCategory}.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveQuickFilters([]);
              setSearchValue('');
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md"
          >
            Reset Filter Tambahan
          </button>
        </div>
      ) : (
        <div className="px-margin @md:px-6 @lg:px-8 mt-space-md grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 gap-gutter @md:gap-4">
          {displayedProducts.map((item) => {
            const isLiked = wishlistIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="relative w-full aspect-square bg-surface-container-low overflow-hidden">
                  <SafeImage
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.image}
                    alt={item.title}
                    fallbackText={item.title}
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                    {item.badge && (
                      <span
                        className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] tracking-wide shadow-sm ${
                          item.badgeType === 'terlaris'
                            ? 'bg-tertiary text-on-tertiary'
                            : 'bg-primary-container text-on-primary'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span className="px-1.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface-variant font-label-sm text-[9px] shadow-sm flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]">location_on</span>{' '}
                      {item.origin}
                    </span>
                  </div>
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-primary/85 backdrop-blur-xs text-on-primary font-label-sm text-[9px] shadow-xs">
                    {item.category}
                  </span>
                  <button
                    type="button"
                    aria-label="Simpan ke Wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(item.id);
                    }}
                    className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform shadow-sm ${
                      isLiked ? 'text-error' : 'text-on-surface-variant'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={
                        isLiked
                          ? { fontVariationSettings: "'FILL' 1" }
                          : { fontVariationSettings: "'FILL' 0" }
                      }
                    >
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-2.5 flex flex-col flex-1 justify-between gap-1.5">
                  <div>
                    <h2 className="font-body-md text-body-md text-on-surface line-clamp-2 leading-tight">
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className="font-currency-display text-currency-display text-primary">
                        {formatRp(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="font-label-sm text-[10px] line-through text-outline">
                          {formatRp(item.originalPrice)}
                        </span>
                      )}
                      {item.discountPercent && (
                        <span className="px-1 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-[9px] font-bold">
                          {item.discountPercent}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-outline text-[11px] font-body-sm pt-1">
                    <div className="flex items-center gap-0.5 text-on-surface">
                      <span
                        className="material-symbols-outlined text-[14px] text-on-tertiary-container"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-label-sm text-label-sm">{item.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-on-surface-variant text-[11px]">
                      {item.soldCount || `${item.reviewCount} terjual`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Infinite Scroll / Loading More Indicator */}
      <div className="w-full py-6 flex flex-col items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (selectedCategory !== 'Semua') {
              handleCategoryChange('Semua');
              setShowAllExtended(true);
            } else {
              setShowAllExtended((prev) => !prev);
            }
          }}
          className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low px-4 py-2 rounded-full shadow-sm active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">
            check_circle
          </span>
          <span>
            {selectedCategory === 'Semua'
              ? `Menampilkan seluruh ${displayedProducts.length} produk UMKM Nusantara`
              : `Menampilkan seluruh produk kategori ${selectedCategory} • Lihat Semua Kategori`}
          </span>
        </button>
        <span className="font-label-sm text-[10px] text-outline">
          Karya UMKM Nusantara Terkurasi
        </span>
      </div>

      {/* Floating Quick Filter Action Button (FAB) */}
      <div className="sticky bottom-20 self-end mr-4 z-40">
        <button
          aria-label="Filter cepat"
          onClick={() => {
            if (activeFilterCount > 0) {
              handleCategoryChange('Semua');
              setActiveQuickFilters([]);
              setSortBy('sesuai');
              setSearchValue('');
              onShowToast('Filter direset: Menampilkan semua kategori');
            } else {
              handleCategoryChange('Tas Etnik');
              onShowToast('Menampilkan kategori: Tas Etnik');
            }
          }}
          className="flex items-center gap-1.5 bg-primary text-on-primary px-4 py-2.5 rounded-full shadow-lg active:scale-95 transition-all duration-200"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">filter_list</span>
          <span className="font-label-md text-label-md">Filter ({activeFilterCount})</span>
        </button>
      </div>
    </div>
  );
};

interface PencarianScreenProps extends CommonScreenProps {
  initialQuery?: string;
}

export const PencarianScreen: React.FC<PencarianScreenProps> = ({
  initialQuery = 'Tas Anyaman',
  onNavigate,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onShowToast,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [recentSearches, setRecentSearches] = useState([
    'Tas selempang tenun',
    'Batik Mega Mendung',
    'Dompet kulit',
    'Kerajinan rotan Cirebon',
  ]);
  const [activeSort, setActiveSort] = useState('Terkait');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const applySearchKeyword = (kw: string) => {
    setQuery(kw);
    setShowSuggestions(false);
    if (kw.trim()) {
      setRecentSearches((prev) =>
        [kw, ...prev.filter((item) => item.toLowerCase() !== kw.toLowerCase())].slice(0, 6)
      );
    }
  };

  const suggestions = [
    { prefix: query || 'tas anyaman', suffix: 'rotan', full: 'tas anyaman rotan' },
    { prefix: query || 'tas anyaman', suffix: 'pandan cirebon', full: 'tas anyaman pandan cirebon' },
    { prefix: query || 'tas anyaman', suffix: 'wanita kekinian', full: 'tas anyaman wanita kekinian' },
  ];

  const popularTags = [
    { label: 'Tas Etnik', hot: true },
    { label: 'Batik Lokal', hot: true },
    { label: 'Kerajinan Rotan', hot: false },
    { label: 'Kuliner Khas', hot: false },
    { label: 'Dekorasi', hot: false },
  ];

  const sortOptions = ['Terkait', 'Terbaru', 'Terlaris', 'Harga Terendah'];

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    let results: Product[] = SEARCH_PRODUCTS;

    if (q && q !== 'tas anyaman' && q !== 'tas anyaman pandan') {
      const matched = ALL_CATALOG_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          q
            .split(' ')
            .some(
              (word) =>
                word.length > 2 &&
                (p.title.toLowerCase().includes(word) || p.category.toLowerCase().includes(word))
            )
      );
      const uniqueMatched = Array.from(new Map(matched.map((p) => [p.id, p])).values());
      if (uniqueMatched.length > 0) {
        results = uniqueMatched;
      }
    }

    if (activeSort === 'Harga Terendah') {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (activeSort === 'Terlaris') {
      results = [...results].sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (activeSort === 'Terbaru') {
      results = [...results].reverse();
    }

    return results;
  }, [query, activeSort]);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-6">
      {/* Search Bar Input Section */}
      <div className="px-margin @md:px-6 @lg:px-8 pt-2 pb-3 bg-surface sticky top-20 z-20 shadow-sm">
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            aria-label="Kembali"
            onClick={() => onNavigate('kategori')}
            className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <div className="flex-1 relative flex items-center bg-surface-container-low rounded-xl px-3 py-2 shadow-sm transition-all focus-within:shadow-md focus-within:bg-surface-container-lowest">
            <span className="material-symbols-outlined text-secondary text-[20px] mr-2 select-none">
              search
            </span>
            <input
              autoComplete="off"
              className="w-full bg-transparent text-on-surface font-body-md text-body-md focus:outline-none placeholder:text-outline"
              placeholder="Cari tas etnik, batik lokal, kuliner..."
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(e.target.value.trim().length > 0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applySearchKeyword(query);
                }
              }}
            />
            {query && (
              <button
                type="button"
                aria-label="Hapus kata kunci"
                onClick={() => {
                  setQuery('');
                  setShowSuggestions(false);
                }}
                className="w-6 h-6 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-variant transition-colors mr-1"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
            <button
              type="button"
              aria-label="Pencarian suara"
              onClick={() => {
                applySearchKeyword('Batik Lokal');
                onShowToast('Pencarian suara: "Batik Lokal"');
              }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-primary active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
          </div>
        </div>

        {/* Live Autocomplete Suggestion Dropdown Simulation */}
        {showSuggestions && (
          <div className="mt-2 bg-surface-container-lowest rounded-xl shadow-lg p-2 flex flex-col gap-1">
            {suggestions.map((sug) => (
              <button
                key={sug.full}
                type="button"
                onClick={() => applySearchKeyword(sug.full)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-surface-container-low active:bg-surface-container text-on-surface transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-[18px]">search</span>
                  <span className="font-body-md text-body-md">
                    <span className="font-title-sm text-primary">tas anyaman</span> {sug.suffix}
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline-variant text-[16px]">
                  north_west
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pencarian Terakhir (Recent Searches) */}
      <section className="px-margin @md:px-6 @lg:px-8 mt-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[18px]">history</span>
            <h2 className="font-title-sm text-title-sm text-on-surface">Pencarian Terakhir</h2>
          </div>
          <button
            type="button"
            onClick={() => setRecentSearches([])}
            className="font-label-md text-label-md text-error hover:opacity-80 active:scale-95 transition-all"
          >
            Hapus Riwayat
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {recentSearches.length === 0 ? (
            <span className="font-body-sm text-body-sm text-outline italic">
              Riwayat pencarian telah dibersihkan
            </span>
          ) : (
            recentSearches.map((item) => (
              <div
                key={item}
                onClick={() => applySearchKeyword(item)}
                className="inline-flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm text-on-surface hover:bg-surface-container transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-outline text-[15px]">schedule</span>
                <span className="font-body-sm text-body-sm">{item}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRecentSearches((prev) => prev.filter((r) => r !== item));
                  }}
                  className="ml-1 text-outline hover:text-error flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Kata Kunci Populer / Tren */}
      <section className="px-margin @md:px-6 @lg:px-8 mb-5">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="material-symbols-outlined text-on-tertiary-container text-[18px]">
            trending_up
          </span>
          <h2 className="font-title-sm text-title-sm text-on-surface">
            Tren Kategori &amp; Pencarian
          </h2>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-margin px-margin">
          {popularTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => applySearchKeyword(tag.label)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-sm active:scale-95 transition-all ${
                tag.hot
                  ? 'bg-tertiary-fixed/30 hover:bg-tertiary-fixed/50 text-tertiary-container'
                  : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface'
              }`}
            >
              {tag.hot && <span className="text-[13px]">🔥</span>}
              <span className="font-label-md text-label-md">{tag.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Divider Ribbon Craft Notice */}
      <div className="mx-margin @md:mx-6 @lg:mx-8 mb-4 p-3 bg-secondary-container/30 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-secondary-container leading-tight">
              100% Karya Pengrajin Asli
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Terverifikasi kualitas kurasi LokaMart
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-secondary text-[20px]">storefront</span>
      </div>

      {/* Hasil Pencarian Terkait Section */}
      <section className="px-margin @md:px-6 @lg:px-8 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-title-md text-title-md text-primary">
              Hasil untuk &quot;{query || 'Semua Kriya'}&quot;
            </p>
            <p className="font-body-sm text-body-sm text-outline">
              Menampilkan {searchResults.length} produk terkurasi
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery('Tas Anyaman');
              setActiveSort('Terkait');
              onShowToast('Filter pencarian direset');
            }}
            className="flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded-lg text-primary font-label-md text-label-md shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            Filter
          </button>
        </div>

        {/* Quick Tab Sorting Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
          {sortOptions.map((tab) => {
            const isActive = activeSort === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveSort(tab)}
                className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md shadow-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest text-outline hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Responsive Product Grid: 2 Cols Android, 3-5 Cols Desktop */}
        <div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 gap-gutter @md:gap-4">
          {searchResults.map((item) => {
            const isLiked = wishlistIds.includes(item.id);
            return (
              <article
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col group transition-transform active:scale-[0.98] cursor-pointer"
              >
                <div className="relative w-full aspect-square bg-surface-container overflow-hidden">
                  <SafeImage
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.image}
                    alt={item.title}
                    fallbackText={item.title}
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-[12px]">
                      location_on
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface">
                      {item.origin}
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-primary/85 text-on-primary font-label-sm text-[9px]">
                    {item.category}
                  </span>
                  {item.discountPercent && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-label-sm font-bold shadow-sm">
                      {item.discountPercent}%
                    </span>
                  )}
                  <button
                    type="button"
                    aria-label="Favorit"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(item.id);
                    }}
                    className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-all shadow-sm ${
                      isLiked ? 'text-error' : 'text-outline hover:text-error'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={
                        isLiked
                          ? { fontVariationSettings: "'FILL' 1" }
                          : { fontVariationSettings: "'FILL' 0" }
                      }
                    >
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-3 flex flex-col flex-1 justify-between gap-1.5">
                  <div>
                    <h3 className="font-body-md text-body-md text-on-surface line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    {item.originalPrice && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="font-label-sm text-label-sm text-outline line-through">
                          {formatRp(item.originalPrice)}
                        </span>
                      </div>
                    )}
                    <p
                      className={`font-currency-display text-currency-display text-primary leading-none ${
                        item.originalPrice ? 'mt-0.5' : 'mt-2'
                      }`}
                    >
                      {formatRp(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-0.5 text-on-surface-variant">
                      <span
                        className="material-symbols-outlined text-on-tertiary-container text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-label-sm text-label-sm font-bold">
                        {item.rating.toFixed(1)}
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">
                        ({item.reviewCount})
                      </span>
                    </div>
                    <button
                      type="button"
                      aria-label="Tambah ke Keranjang"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item, item.variants?.[0] || 'Standar Natural', 1);
                      }}
                      className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary active:bg-primary active:text-on-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        add_shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Craftsmanship Guarantee Note */}
        <div className="mt-6 p-4 rounded-xl bg-surface-container-low flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary text-[28px] shrink-0">
            handshake
          </span>
          <div>
            <p className="font-title-sm text-title-sm text-primary">Dukungan Nyata UMKM</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Setiap transaksi diteruskan langsung ke tangan pengrajin daerah di seluruh penjuru
              Indonesia.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

interface DetailProdukScreenProps {
  selectedProduct?: Product;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onSelectCategory?: (cat: CategoryName) => void;
  onAddToCart: (product: Product, variant: string, qty: number) => void;
  onBuyNow: (product: Product, variant: string, qty: number) => void;
  onShowToast: (msg: string) => void;
}

export const DetailProdukScreen: React.FC<DetailProdukScreenProps> = ({
  selectedProduct,
  wishlistIds,
  onToggleWishlist,
  onNavigate,
  onSelectCategory,
  onAddToCart,
  onBuyNow,
  onShowToast,
}) => {
  const activeProduct: Product = selectedProduct || HOME_RECOMMENDED_PRODUCTS[0];
  const isDefaultTroso = !selectedProduct || selectedProduct.id === 'rec-1';

  const displayImage = activeProduct.image;
  const sellerAvatar = SELLER_AVATAR_URL;
  const reviewPhoto = activeProduct.image;
  const displayTitle = isDefaultTroso
    ? 'Tas Selempang Pria & Wanita Kulit Asli Kombinasi Tenun Troso Handmade Edisi Nusantara'
    : activeProduct.title;
  const displayPrice = activeProduct.price;
  const displayOriginPrice = activeProduct.originalPrice;
  const displayDiscount = activeProduct.discountPercent;
  const displayOrigin = isDefaultTroso ? 'Jepara, Jawa Tengah' : activeProduct.origin;
  const displayStoreName = activeProduct.storeName || 'Galeri Kriya Troso & Cirebon';
  const maxStock = activeProduct.stockLeft || 14;

  const productSpecs = activeProduct.specs || {
    material: 'Kulit Sapi Asli & Tenun Troso Jepara',
    dimensions: '26 x 8 x 18 cm (Muat iPad Mini)',
    strapOrFeature: 'Adjustable strap (Hingga 120 cm)',
    weight: '450 gram (Ringan & Ergonomis)',
    compartmentOrDetail: '1 Utama, 1 Saku Belakang, 2 Kantung Kartu',
  };

  const variantOptions = useMemo(() => {
    const names = activeProduct.variants?.length
      ? activeProduct.variants
      : ['Tenun Hitam Navy', 'Tenun Etnik Merah Bata', 'Tenun Cokelat Tanah'];
    const dots = ['bg-primary-container', 'bg-tertiary-container', 'bg-amber-800'];
    return names.map((name, idx) => ({
      id: `var-${idx}`,
      name,
      dotClass: dots[idx % dots.length],
    }));
  }, [activeProduct]);

  const [selectedVariant, setSelectedVariant] = useState(variantOptions[0].name);
  const [qty, setQty] = useState(1);
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    setSelectedVariant(variantOptions[0].name);
    setQty(1);
  }, [activeProduct.id, variantOptions]);

  const isWishlist = wishlistIds.includes(activeProduct.id);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-24 @lg:pb-12 @lg:px-8 @lg:pt-6">
      <div className="flex flex-col @lg:grid @lg:grid-cols-12 @lg:gap-8 @lg:items-start">
      {/* Left Column on Desktop: Hero Gallery Section */}
      <div className="@lg:col-span-5 @lg:sticky @lg:top-28 flex flex-col gap-4">
      <div className="relative w-full aspect-square bg-surface-container-low overflow-hidden @lg:rounded-2xl @lg:shadow-md">
        <SafeImage
          className="w-full h-full object-cover select-none"
          src={displayImage}
          alt={displayTitle}
          fallbackText={displayTitle}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none"></div>

        {/* Floating Top Badges */}
        <button
          type="button"
          onClick={() => {
            if (onSelectCategory) {
              onSelectCategory(activeProduct.category);
            } else {
              onNavigate('kategori');
            }
          }}
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md rounded-full shadow-sm active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[15px] text-tertiary">
            workspace_premium
          </span>
          <span className="font-label-sm text-label-sm text-tertiary">
            {activeProduct.category} • Karya Nusantara
          </span>
        </button>

        {/* Action Icons Over Gallery */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            type="button"
            aria-label="Simpan ke Wishlist"
            onClick={() => onToggleWishlist(activeProduct.id)}
            className="w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-md active:scale-95 transition-transform"
          >
            <span
              className={`material-symbols-outlined text-[20px] transition-colors ${
                isWishlist ? 'text-error' : ''
              }`}
              style={
                isWishlist
                  ? { fontVariationSettings: "'FILL' 1" }
                  : { fontVariationSettings: "'FILL' 0" }
              }
            >
              favorite
            </span>
          </button>
          <button
            type="button"
            aria-label="Perbesar Foto"
            onClick={() => onShowToast('Ketuk ganda untuk memperbesar detail kriya')}
            className="w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-md active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">zoom_in</span>
          </button>
        </div>

        {/* Gallery Counter Pill */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-primary/80 backdrop-blur-md text-on-primary rounded-full font-label-md text-label-md flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-[14px]">photo_camera</span>
          <span>1/5</span>
        </div>

        {/* Small Origin Tag */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md rounded-full shadow-sm text-on-surface font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[14px] text-secondary">
            location_on
          </span>
          <span>{displayOrigin}</span>
        </div>
      </div>
      </div>

      {/* Right Column on Desktop: Product Details, Variants, Actions & Reviews */}
      <div className="@lg:col-span-7 flex flex-col">
      {/* Price & Key Title Section */}
      <div className="px-margin pt-space-lg pb-space-md flex flex-col gap-space-sm bg-surface">
        <div className="flex items-baseline gap-space-sm flex-wrap">
          <span className="font-headline-lg text-headline-lg text-primary tracking-tight">
            {formatRp(displayPrice)}
          </span>
          {displayOriginPrice && (
            <span className="font-body-md text-body-md text-outline line-through">
              {formatRp(displayOriginPrice)}
            </span>
          )}
          {displayDiscount && (
            <span className="px-2 py-0.5 rounded-full bg-on-tertiary-container/15 text-on-tertiary-container font-label-sm text-label-sm font-bold uppercase tracking-wider">
              Hemat {displayDiscount}%
            </span>
          )}
        </div>

        <h2 className="font-title-lg text-title-lg text-on-background leading-snug">
          {displayTitle}
        </h2>

        <div className="flex items-center gap-space-sm flex-wrap pt-1 font-body-sm text-body-sm text-on-surface-variant">
          <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded-lg text-on-surface">
            <span
              className="material-symbols-outlined text-[16px] text-amber-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label-md text-label-md">{activeProduct.rating.toFixed(1)}</span>
            <span className="text-outline text-label-sm font-label-sm">
              ({activeProduct.reviewCount} Ulasan)
            </span>
          </div>
          <span>•</span>
          <span className="font-label-md text-label-md text-on-surface">
            Terjual {activeProduct.soldNumeric || 340}+ pcs
          </span>
          <span>•</span>
          <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="font-label-sm text-label-sm">Stok Sisa {maxStock} pcs</span>
          </div>
        </div>
      </div>

      {/* Micro Value Props Banner */}
      <div className="mx-margin mb-space-md p-space-md bg-surface-container-low rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-primary">
              Garansi Produk {activeProduct.category} Asli 100%
            </span>
            <span className="font-body-sm text-body-sm text-outline">
              Kurasi langsung dari sentra UMKM {displayOrigin}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[16px]">local_shipping</span>
          <span>Siap Kirim Hari Ini</span>
        </div>
      </div>

      {/* Pilihan Varian */}
      <div className="px-margin py-space-md bg-surface flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-title-sm text-title-sm text-on-surface">
            Pilihan Varian / Corak:
          </span>
          <span className="font-label-md text-label-md text-secondary">{selectedVariant}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {variantOptions.map((v) => {
            const isSelected = selectedVariant === v.name;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  setSelectedVariant(v.name);
                  onShowToast(`Varian dipilih: ${v.name}`);
                }}
                className={`px-3 py-2 rounded-xl flex items-center gap-2 shadow-sm transition-all text-left ${
                  isSelected
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface'
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${v.dotClass}`}></div>
                <span className="font-label-md text-label-md">{v.name}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px] text-on-primary">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="px-margin py-space-md bg-surface flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-title-sm text-title-sm text-on-surface">Jumlah Pembelian:</span>
          <span className="font-body-sm text-body-sm text-outline">Tersedia {maxStock} buah</span>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-xl shadow-sm">
          <button
            type="button"
            aria-label="Kurangi kuantitas"
            disabled={qty <= 1}
            onClick={() => setQty((prev) => Math.max(1, prev - 1))}
            className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center text-on-surface active:bg-surface-variant transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[18px]">remove</span>
          </button>
          <span className="w-8 text-center font-title-md text-title-md text-primary">{qty}</span>
          <button
            type="button"
            aria-label="Tambah kuantitas"
            disabled={qty >= maxStock}
            onClick={() => setQty((prev) => Math.min(maxStock, prev + 1))}
            className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center text-on-surface active:bg-surface-variant transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>
      </div>

      {/* Desktop Inline CTA Buttons (Visible on Komputer / @lg:flex) */}
      <div className="hidden @lg:flex items-center gap-3 px-margin py-3 bg-surface">
        <button
          type="button"
          onClick={() => onShowToast(`Menghubungkan ke perajin ${displayStoreName}...`)}
          className="h-12 px-4 rounded-xl bg-surface-container text-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">chat</span>
          <span>Chat Pengrajin</span>
        </button>
        <button
          type="button"
          onClick={() => onAddToCart(activeProduct, selectedVariant, qty)}
          className="flex-1 h-12 rounded-xl bg-surface-container-high text-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
          <span>+ Tambah ke Keranjang</span>
        </button>
        <button
          type="button"
          onClick={() => onBuyNow(activeProduct, selectedVariant, qty)}
          className="flex-1 h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">bolt</span>
          <span>Beli Sekarang</span>
        </button>
      </div>

      {/* Seller / Toko Pengrajin Card */}
      <div className="mx-margin my-space-md p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-md">
        <div className="flex items-start justify-between gap-space-sm">
          <div className="flex items-center gap-space-md min-w-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface-variant">
              <SafeImage
                className="w-full h-full object-cover"
                src={sellerAvatar}
                alt={displayStoreName}
              />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest"></div>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-title-sm text-title-sm text-primary truncate">
                  {displayStoreName}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>Pengrajin Terverifikasi</span>
              </div>
              <span className="font-body-sm text-body-sm text-outline truncate">
                {displayOrigin} • Aktif 10 mnt lalu
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-space-sm pt-1">
          <button
            type="button"
            onClick={() => onShowToast(`Menghubungkan ke ruang pesan ${displayStoreName}...`)}
            className="h-10 px-3 rounded-lg bg-surface-container text-primary font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Chat Toko</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (onSelectCategory) {
                onSelectCategory(activeProduct.category);
              } else {
                onNavigate('kategori');
              }
            }}
            className="h-10 px-3 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant font-label-md text-label-md flex items-center justify-center gap-1.5 active:bg-secondary-fixed-dim transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            <span>Lihat Kategori {activeProduct.category}</span>
          </button>
        </div>
      </div>

      {/* Spesifikasi & Deskripsi Produk (Dynamic per Product & Category) */}
      <div className="px-margin py-space-md bg-surface flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-title-md text-primary">Spesifikasi Produk</h3>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm">
            {activeProduct.category}
          </span>
        </div>
        <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-2.5">
          <div className="flex justify-between items-center text-body-md font-body-md py-1 gap-4">
            <span className="text-outline shrink-0">Bahan / Komposisi</span>
            <span className="text-on-surface font-semibold text-right">
              {productSpecs.material}
            </span>
          </div>
          <div className="flex justify-between items-center text-body-md font-body-md py-1 gap-4">
            <span className="text-outline shrink-0">Ukuran / Dimensi</span>
            <span className="text-on-surface font-semibold text-right">
              {productSpecs.dimensions}
            </span>
          </div>
          <div className="flex justify-between items-center text-body-md font-body-md py-1 gap-4">
            <span className="text-outline shrink-0">Keunggulan Kriya</span>
            <span className="text-on-surface font-semibold text-right">
              {productSpecs.strapOrFeature}
            </span>
          </div>
          <div className="flex justify-between items-center text-body-md font-body-md py-1 gap-4">
            <span className="text-outline shrink-0">Bobot Produk</span>
            <span className="text-on-surface font-semibold text-right">
              {productSpecs.weight}
            </span>
          </div>
          <div className="flex justify-between items-center text-body-md font-body-md py-1 gap-4">
            <span className="text-outline shrink-0">Detail Kelengkapan</span>
            <span className="text-on-surface font-semibold text-right">
              {productSpecs.compartmentOrDetail}
            </span>
          </div>
        </div>

        {/* Deskripsi Lengkap */}
        <div className="flex flex-col gap-2 pt-2">
          <h4 className="font-title-sm text-title-sm text-primary">Deskripsi Lengkap</h4>
          <p
            className={`font-body-md text-body-md text-on-surface-variant leading-relaxed ${
              descExpanded ? '' : 'line-clamp-3'
            }`}
          >
            Dibuat penuh dedikasi oleh perajin lokal di {displayOrigin} dalam kategori{' '}
            <strong>{activeProduct.category}</strong>, produk kurasi Nusantara dari{' '}
            {displayStoreName} ini menyatukan material pilihan ({productSpecs.material}) dengan
            sentuhan tangan tradisional. Setiap detail dikerjakan secara presisi untuk kualitas
            terbaik. Cocok untuk kebutuhan harian modern, koleksi pribadi, maupun buah tangan
            berkesan bagi pecinta produk UMKM Indonesia.
          </p>
          <button
            type="button"
            onClick={() => setDescExpanded((prev) => !prev)}
            className="self-start text-secondary font-label-md text-label-md flex items-center gap-1 pt-1"
          >
            <span>{descExpanded ? 'Sembunyikan' : 'Baca Selengkapnya'}</span>
            <span className="material-symbols-outlined text-[16px]">
              {descExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </div>

      {/* Ulasan Pembeli Snippet */}
      <div className="px-margin pt-space-lg pb-space-md bg-surface flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-title-md text-title-md text-primary">Ulasan Pembeli</h3>
            <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface">
              {activeProduct.reviewCount}
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              onShowToast(`Menampilkan semua ${activeProduct.reviewCount} ulasan pembeli...`)
            }
            className="font-label-md text-label-md text-secondary flex items-center"
          >
            <span>Lihat Semua</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Rating Highlight Card */}
        <div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="font-headline-lg text-headline-lg text-primary">
              {activeProduct.rating.toFixed(1)}
            </span>
            <div className="flex flex-col">
              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="font-body-sm text-body-sm text-outline">
                98% pembeli merasa puas
              </span>
            </div>
          </div>
          <div className="px-3 py-1.5 bg-surface-container rounded-lg text-primary font-label-sm text-label-sm font-semibold">
            Top Rated
          </div>
        </div>

        {/* Review Card Item */}
        <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-title-sm text-title-sm font-bold">
                RS
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface">Rian S.</span>
                <span className="font-body-sm text-body-sm text-outline">
                  Varian: {selectedVariant} • 2 hari lalu
                </span>
              </div>
            </div>
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Kualitas produk {activeProduct.title.toLowerCase()} sangat rapi dan otentik! Benar-benar
            bangga pakai karya pengrajin {displayOrigin}. Pengemasan dari {displayStoreName} juga
            sangat aman dan estetik.
          </p>
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-variant mt-1">
            <SafeImage
              className="w-full h-full object-cover"
              src={isDefaultTroso ? reviewPhoto : activeProduct.image}
              alt="Review Photo"
            />
          </div>
        </div>
      </div>
      </div>
      </div>

      {/* Fixed Bottom Sticky Action Bar (Visible on Android/Mobile, hidden on @lg Desktop where inline bar is shown) */}
      <div className="@lg:hidden sticky bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-lg px-margin py-3 shadow-[0_-4px_20px_rgba(4,27,60,0.08)] flex items-center gap-space-sm">
        <button
          type="button"
          aria-label="Chat Toko"
          onClick={() => onShowToast(`Menghubungkan ke perajin ${displayStoreName}...`)}
          className="w-12 h-12 rounded-xl bg-surface-container text-primary flex flex-col items-center justify-center shrink-0 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">chat</span>
          <span className="font-label-sm text-[10px]">Chat</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onAddToCart(activeProduct, selectedVariant, qty);
          }}
          className="flex-1 h-12 rounded-xl bg-surface-container-high text-primary font-label-lg text-label-lg flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
          <span>+ Keranjang</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onBuyNow(activeProduct, selectedVariant, qty);
          }}
          className="flex-1 h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">bolt</span>
          <span>Beli Sekarang</span>
        </button>
      </div>
    </div>
  );
};
