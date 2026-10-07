import React, { useEffect, useState } from 'react';
import {
  CategoryName,
  DEFAULT_AVATAR_URL,
  LOKAMART_LOGO_URL,
  ScreenId,
  UserProfile,
} from '../data';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  style,
  fallbackText,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        className={`bg-surface-container flex flex-col items-center justify-center text-secondary p-2 text-center ${className}`}
        style={style}
      >
        <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
        {fallbackText && (
          <span className="font-label-sm text-[10px] mt-1 line-clamp-2 text-on-surface-variant">
            {fallbackText}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'LokaMart Product'}
      referrerPolicy="no-referrer"
      className={className}
      style={style}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
};

interface TopHeaderProps {
  mode: 'tab' | 'stack';
  currentScreen: ScreenId;
  title: string;
  cartCount?: number;
  ordersCount?: number;
  isAuthenticated?: boolean;
  userProfile?: UserProfile;
  selectedAddressShort?: string;
  onBack?: () => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenSearchWithQuery?: (query: string) => void;
  onLogout?: () => void;
  onShowToast?: (msg: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  mode,
  currentScreen,
  title,
  cartCount = 0,
  ordersCount = 0,
  isAuthenticated = false,
  userProfile,
  selectedAddressShort = 'Kesambi, Cirebon',
  onBack,
  onNavigate,
  onOpenSearchWithQuery,
  onLogout,
  onShowToast,
}) => {
  const [desktopSearch, setDesktopSearch] = useState('');

  const desktopNavItems: {
    id: ScreenId;
    label: string;
    icon: string;
    badge?: number;
  }[] = [
    { id: 'beranda', label: 'Beranda', icon: 'home' },
    { id: 'kategori', label: 'Kategori', icon: 'category' },
    { id: 'keranjang', label: 'Keranjang', icon: 'shopping_cart', badge: cartCount },
    { id: 'pesanan', label: 'Pesanan', icon: 'receipt_long', badge: ordersCount },
    { id: 'alamat', label: 'Alamat', icon: 'location_on' },
    { id: 'profil', label: 'Profil', icon: 'account_circle' },
  ];

  const effectiveTab = currentScreen === 'pencarian' ? 'kategori' : currentScreen;

  const handleDesktopSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = desktopSearch.trim() || 'Tas Anyaman';
    if (onOpenSearchWithQuery) {
      onOpenSearchWithQuery(q);
    } else {
      onNavigate('pencarian');
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-surface/95 backdrop-blur-xl shadow-[0_2px_12px_rgba(4,27,60,0.06)] pt-safe border-b border-surface-container">
      {/* =====================================================================
          1. ANDROID / MOBILE TOP BAR (Visible when container < 768px / @md:hidden)
         ===================================================================== */}
      <div className="flex flex-col @md:hidden">
        {/* Android Status Bar */}
        <div className="h-6 px-margin flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm select-none bg-surface-container-low/60">
          <div className="flex items-center gap-1.5">
            <span>09:41</span>
            <span className="text-[9px] text-outline">• Android</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[14px]">wifi</span>
            <span className="material-symbols-outlined text-[14px]">battery_full</span>
          </div>
        </div>

        {/* Mobile App Bar */}
        {mode === 'tab' ? (
          <div className="h-14 px-margin flex items-center justify-between gap-space-sm">
            <div
              className="flex items-center gap-space-sm overflow-hidden flex-1 cursor-pointer"
              onClick={() => onNavigate('beranda')}
            >
              <SafeImage
                alt="LokaMart Brand Logo"
                className="h-8 w-8 rounded-lg object-contain shrink-0 bg-surface-container p-0.5"
                src={LOKAMART_LOGO_URL}
              />
              <div className="flex flex-col truncate">
                <span className="font-label-sm text-[9px] uppercase tracking-wider text-secondary leading-none">
                  LokaMart Nusantara
                </span>
                <h1 className="font-title-lg text-title-lg text-primary truncate">{title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                aria-label="Cari Produk"
                onClick={() => onNavigate('pencarian')}
                className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container active:bg-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined text-[21px]">search</span>
              </button>
              <button
                type="button"
                aria-label="Keranjang"
                onClick={() => onNavigate('keranjang')}
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container active:bg-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined text-[21px]">shopping_cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-[9px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                aria-label="Profil"
                onClick={() => onNavigate('profil')}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden active:scale-95 transition-transform ml-0.5 ring-2 ring-secondary-fixed"
              >
                {userProfile?.avatarUrl ? (
                  <SafeImage
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-on-primary text-[18px]">
                    person
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="h-14 px-margin flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm overflow-hidden flex-1">
              <button
                type="button"
                aria-label="Kembali"
                onClick={onBack}
                className="w-10 h-10 -ml-1.5 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container active:bg-surface-variant transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[22px]">arrow_back</span>
              </button>
              <SafeImage
                alt="LokaMart Brand Logo"
                className="h-7 w-7 rounded-lg object-contain shrink-0 cursor-pointer bg-surface-container p-0.5"
                src={LOKAMART_LOGO_URL}
                onClick={() => onNavigate('beranda')}
              />
              <h1 className="font-title-lg text-title-lg text-primary truncate">{title}</h1>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                aria-label="Bagikan"
                onClick={() => onShowToast?.('Tautan halaman berhasil disalin!')}
                className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container active:bg-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <button
                type="button"
                aria-label="Profil"
                onClick={() => onNavigate('profil')}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden active:scale-95 transition-transform ring-2 ring-secondary-fixed"
              >
                {userProfile?.avatarUrl ? (
                  <SafeImage
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-on-primary text-[18px]">
                    person
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          2. KOMPUTER / DESKTOP & TABLET NAVBAR (Visible when container >= 768px / hidden @md:flex)
         ===================================================================== */}
      <div className="hidden @md:flex flex-col w-full">
        {/* Top Utility Strip */}
        <div className="bg-primary text-on-primary px-6 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4 min-w-0">
            <button
              type="button"
              onClick={() => onNavigate('alamat')}
              className="flex items-center gap-1 text-secondary-fixed hover:text-white transition-colors truncate"
            >
              <span className="material-symbols-outlined text-[15px]">location_on</span>
              <span className="font-label-sm">Dikirim ke: {selectedAddressShort}</span>
            </button>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1.5 text-white/90 truncate">
              <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">
                school
              </span>
              <span className="font-label-sm">
                Mahasiswa RPL (Rekayasa Perangkat Lunak) • STMIK IKMI CIREBON
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                onShowToast?.('Jaminan 100% produk asli dari sentra kriya Cirebon & Nusantara')
              }
              className="text-white/80 hover:text-white font-label-sm flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                verified
              </span>
              <span>Garansi UMKM Asli</span>
            </button>
            <span className="text-white/30">|</span>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 font-label-sm text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Sesi Aktif
                </span>
                {onLogout && (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="text-tertiary-fixed hover:underline font-label-sm text-[11px] flex items-center gap-0.5"
                  >
                    <span className="material-symbols-outlined text-[14px]">logout</span>
                    <span>Keluar</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-tertiary-fixed hover:underline font-label-sm text-[11px]"
                >
                  Masuk Akun
                </button>
                <span className="text-white/30">/</span>
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="text-secondary-fixed hover:underline font-label-sm text-[11px]"
                >
                  Daftar Baru
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Desktop E-Commerce Navigation Bar */}
        <div className="px-6 py-3 flex items-center justify-between gap-4 bg-surface-container-lowest">
          {/* Brand Logo */}
          <div
            onClick={() => onNavigate('beranda')}
            className="flex items-center gap-3 cursor-pointer shrink-0 group"
          >
            <div className="w-11 h-11 rounded-xl bg-surface-container p-1.5 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <SafeImage
                src={LOKAMART_LOGO_URL}
                alt="LokaMart Nusantara"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-primary font-extrabold tracking-tight leading-none">
                  LokaMart
                </span>
                <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-primary font-label-sm text-[9px] uppercase tracking-wider">
                  Nusantara
                </span>
              </div>
              <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                Pasar Digital Kriya &amp; UMKM Cirebon
              </span>
            </div>
          </div>

          {/* Desktop Global Search Input */}
          {isAuthenticated && (
            <form
              onSubmit={handleDesktopSearchSubmit}
              className="flex-1 max-w-md flex items-center bg-surface-container-low rounded-xl px-3.5 py-2 border border-transparent focus-within:border-secondary focus-within:bg-surface-container-lowest transition-all shadow-2xs"
            >
              <span className="material-symbols-outlined text-outline text-[20px] mr-2">
                search
              </span>
              <input
                type="text"
                value={desktopSearch}
                onChange={(e) => setDesktopSearch(e.target.value)}
                placeholder="Cari tas tenun, batik Mega Mendung, rotan Cirebon..."
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
              />
              {desktopSearch && (
                <button
                  type="button"
                  onClick={() => setDesktopSearch('')}
                  className="text-outline hover:text-on-surface mr-1"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors shrink-0"
              >
                Cari
              </button>
            </form>
          )}

          {/* Desktop Primary Navigation Links */}
          <nav className="flex items-center gap-1 @xl:gap-2">
            {desktopNavItems.map((item) => {
              const isActive = effectiveTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-3 py-2 rounded-xl flex items-center gap-2 font-label-md text-label-md transition-all ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-xs font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={
                      isActive
                        ? { fontVariationSettings: "'FILL' 1" }
                        : { fontVariationSettings: "'FILL' 0" }
                    }
                  >
                    {item.icon}
                  </span>
                  <span className="hidden @lg:inline">{item.label}</span>
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                          : 'bg-on-tertiary-container text-on-tertiary'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop User Account Pill */}
          <div className="flex items-center gap-2 shrink-0 pl-2 border-l border-surface-container">
            {isAuthenticated && userProfile ? (
              <button
                type="button"
                onClick={() => onNavigate('profil')}
                className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-left"
              >
                <SafeImage
                  src={userProfile.avatarUrl || DEFAULT_AVATAR_URL}
                  alt={userProfile.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-secondary-fixed shrink-0"
                />
                <div className="hidden @xl:flex flex-col min-w-0 max-w-[130px]">
                  <span className="font-label-md text-label-md text-primary font-bold truncate">
                    {userProfile.name}
                  </span>
                  <span className="font-label-sm text-[10px] text-secondary truncate">
                    RPL • STMIK IKMI
                  </span>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="px-3.5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-xs hover:bg-primary-container transition-colors"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="px-3.5 py-2 rounded-xl bg-secondary-fixed text-on-secondary-fixed-variant font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim transition-colors"
                >
                  Daftar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Sub-Header Breadcrumb Bar for Stack / Inner Screens */}
        {mode === 'stack' && (
          <div className="px-6 py-2 bg-surface-container-low/80 border-t border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-2xs hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Kembali</span>
              </button>
              <span className="text-outline">/</span>
              <button
                type="button"
                onClick={() => onNavigate('beranda')}
                className="hover:text-primary hover:underline"
              >
                Beranda
              </button>
              <span className="text-outline">/</span>
              <span className="font-label-md text-primary font-bold">{title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onShowToast?.('Tautan halaman berhasil disalin!')}
                className="px-2.5 py-1 rounded-lg text-on-surface-variant hover:bg-surface-container flex items-center gap-1 font-label-sm text-label-sm"
              >
                <span className="material-symbols-outlined text-[15px]">share</span>
                <span>Bagikan Halaman</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

interface BottomNavProps {
  activeTab: ScreenId;
  cartCount: number;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  cartCount,
  onNavigate,
}) => {
  const tabs: { id: ScreenId; label: string; icon: string; badge?: number }[] = [
    { id: 'beranda', label: 'Beranda', icon: 'home' },
    { id: 'kategori', label: 'Kategori', icon: 'category' },
    { id: 'keranjang', label: 'Keranjang', icon: 'shopping_cart', badge: cartCount },
    { id: 'pesanan', label: 'Pesanan', icon: 'receipt_long' },
    { id: 'profil', label: 'Profil', icon: 'account_circle' },
  ];

  const effectiveTab = activeTab === 'pencarian' ? 'kategori' : activeTab;

  return (
    /* Visible only on Android / Mobile viewports (@md:hidden) */
    <nav className="@md:hidden sticky bottom-0 w-full z-40 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_10px_rgba(23,43,77,0.06)] pb-safe border-t border-surface-container">
      <div className="h-16 px-space-xs flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = effectiveTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-colors relative ${
                isActive
                  ? 'text-primary-container font-semibold'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              <div
                className={`w-12 h-7 rounded-full flex items-center justify-center transition-colors relative ${
                  isActive ? 'bg-secondary-container/30' : ''
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={
                    isActive
                      ? { fontVariationSettings: "'FILL' 1" }
                      : { fontVariationSettings: "'FILL' 0" }
                  }
                >
                  {tab.icon}
                </span>
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-[10px] flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-label-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="h-4 flex items-center justify-center">
        <div className="w-28 h-1 rounded-full bg-on-surface/20"></div>
      </div>
    </nav>
  );
};

export const BottomGesturePill: React.FC = () => (
  <div className="@md:hidden w-full z-40 pointer-events-none pb-safe bg-surface">
    <div className="h-4 flex items-center justify-center">
      <div className="w-28 h-1 rounded-full bg-on-surface/20 pointer-events-auto"></div>
    </div>
  </div>
);

interface DesktopFooterProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectCategory?: (cat: CategoryName) => void;
}

export const DesktopFooter: React.FC<DesktopFooterProps> = ({
  onNavigate,
  onSelectCategory,
}) => {
  return (
    <footer className="hidden @md:block w-full bg-surface-container-lowest border-t border-surface-container mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 @lg:grid-cols-12 gap-8">
        {/* Col 1: Brand & Academic Info */}
        <div className="@lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container p-1.5 flex items-center justify-center">
              <SafeImage
                src={LOKAMART_LOGO_URL}
                alt="LokaMart Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-title-lg text-title-lg text-primary">LokaMart Nusantara</h3>
              <p className="font-label-sm text-label-sm text-secondary">
                E-Commerce Kriya &amp; UMKM Lokal Cirebon
              </p>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed max-w-md">
            Platform pasar digital kurasi kerajinan tangan, Batik Trusmi, anyaman rotan Tegalwangi,
            dan kuliner khas Cirebon. Dikembangkan sebagai proyek aplikasi oleh Mahasiswa{' '}
            <strong className="text-primary">Rekayasa Perangkat Lunak (RPL)</strong>{' '}
            <strong className="text-primary">STMIK IKMI CIREBON</strong>.
          </p>
        </div>

        {/* Col 2: Kategori Kriya */}
        <div className="@lg:col-span-3 flex flex-col gap-2">
          <h4 className="font-title-sm text-title-sm text-primary font-bold">Kategori Populer</h4>
          <div className="grid grid-cols-2 gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
            {(
              [
                'Tas Etnik',
                'Batik Lokal',
                'Kerajinan Rotan',
                'Aksesoris',
                'Alat Tulis',
                'Kuliner Khas',
                'Dekorasi',
                'Semua',
              ] as CategoryName[]
            ).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(cat);
                  } else {
                    onNavigate('kategori');
                  }
                }}
                className="text-left hover:text-primary hover:underline truncate py-0.5"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Col 3: Navigasi & Layanan */}
        <div className="@lg:col-span-4 flex flex-col gap-2">
          <h4 className="font-title-sm text-title-sm text-primary font-bold">
            Navigasi &amp; Layanan Pelanggan
          </h4>
          <div className="grid grid-cols-2 gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
            <button
              type="button"
              onClick={() => onNavigate('beranda')}
              className="text-left hover:text-primary hover:underline py-0.5"
            >
              Beranda Utama
            </button>
            <button
              type="button"
              onClick={() => onNavigate('keranjang')}
              className="text-left hover:text-primary hover:underline py-0.5"
            >
              Keranjang Belanja
            </button>
            <button
              type="button"
              onClick={() => onNavigate('pesanan')}
              className="text-left hover:text-primary hover:underline py-0.5"
            >
              Status &amp; Lacak Pesanan
            </button>
            <button
              type="button"
              onClick={() => onNavigate('alamat')}
              className="text-left hover:text-primary hover:underline py-0.5"
            >
              Daftar Alamat
            </button>
            <button
              type="button"
              onClick={() => onNavigate('profil')}
              className="text-left hover:text-primary hover:underline py-0.5"
            >
              Profil &amp; LokaPay
            </button>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-left hover:text-primary hover:underline py-0.5"
            >
              Ganti Akun / Login
            </button>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low px-8 py-3 border-t border-surface-container flex flex-col @lg:flex-row items-center justify-between gap-2 text-xs text-on-surface-variant">
        <span>
          © 2026 LokaMart Nusantara • Proyek Mahasiswa RPL STMIK IKMI Cirebon
        </span>
        <span className="font-label-sm text-secondary">
          Responsif Multi-Device: Komputer (Desktop), Tablet &amp; Android (Mobile)
        </span>
      </div>
    </footer>
  );
};
