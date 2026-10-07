import React, { useEffect, useState } from 'react';
import {
  ALL_CATALOG_PRODUCTS,
  AddressItem,
  CartItem,
  Order,
  Product,
  ScreenId,
  formatRp,
} from '../data';
import { SafeImage } from './ShellComponents';

interface KeranjangScreenProps {
  cartItems: CartItem[];
  voucherAmount: number;
  onChangeVoucher: (amount: number) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCycleVariant: (id: string) => void;
  onToggleCheck: (id: string) => void;
  onToggleStoreCheck: (storeId: string, checked: boolean) => void;
  onToggleAllCheck: (checked: boolean) => void;
  onDeleteItem: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onProceedToCheckout: () => void;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const KeranjangScreen: React.FC<KeranjangScreenProps> = ({
  cartItems,
  voucherAmount,
  onChangeVoucher,
  onUpdateQty,
  onCycleVariant,
  onToggleCheck,
  onToggleStoreCheck,
  onToggleAllCheck,
  onDeleteItem,
  onSelectProduct,
  onProceedToCheckout,
  onNavigate,
  onShowToast,
}) => {
  const checkedItems = cartItems.filter((c) => c.checked);
  const totalQty = checkedItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = checkedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const effectiveVoucher = checkedItems.length > 0 ? Math.min(voucherAmount, subtotal) : 0;
  const specialSavings = checkedItems.reduce((acc, item) => {
    const orig = item.originalPrice || item.price;
    return acc + Math.max(0, orig - item.price) * item.quantity;
  }, 0);
  const totalSavings = effectiveVoucher + specialSavings;
  const finalTotal = Math.max(0, subtotal - effectiveVoucher);

  const allChecked = cartItems.length > 0 && cartItems.every((c) => c.checked);

  // Group by store
  const storesMap = new Map<
    string,
    { storeId: string; storeName: string; storeOrigin: string; items: CartItem[] }
  >();
  cartItems.forEach((item) => {
    if (!storesMap.has(item.storeId)) {
      storesMap.set(item.storeId, {
        storeId: item.storeId,
        storeName: item.storeName,
        storeOrigin: item.storeOrigin,
        items: [],
      });
    }
    storesMap.get(item.storeId)!.items.push(item);
  });

  const storeGroups = Array.from(storesMap.values());

  const handleCycleVoucher = () => {
    const options = [20000, 35000, 0];
    const next = options[(options.indexOf(voucherAmount) + 1) % options.length];
    onChangeVoucher(next);
    if (next === 0) {
      onShowToast('Voucher dinonaktifkan');
    } else {
      onShowToast(`Voucher Promo Kriya ${formatRp(next)} dipasang!`);
    }
  };

  const handleOpenProductDetail = (item: CartItem) => {
    const found = ALL_CATALOG_PRODUCTS.find(
      (p) => p.id === item.productId || p.title === item.title
    );
    if (found) {
      onSelectProduct(found);
    } else {
      onSelectProduct({
        id: item.productId,
        title: item.title,
        price: item.price,
        originalPrice: item.originalPrice,
        discountPercent: item.discountPercent,
        rating: 4.9,
        reviewCount: 120,
        origin: item.storeOrigin,
        image: item.image,
        category: 'Tas Etnik',
        storeId: item.storeId,
        storeName: item.storeName,
        variants: item.availableVariants || [item.variant],
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-4 @lg:pb-10 @md:px-6 @lg:px-8 @md:pt-4">
      {/* Free Shipping Festive Alert Banner */}
      <div className="px-margin @md:px-0 pt-space-xs pb-space-sm">
        <div className="relative overflow-hidden bg-secondary-fixed rounded-xl p-space-md shadow-sm">
          <div className="absolute -right-4 -bottom-6 w-20 h-20 rounded-full bg-secondary-fixed-dim/30 pointer-events-none"></div>
          <div className="flex items-center gap-space-sm relative z-10">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-label-md text-label-md text-on-secondary-fixed font-bold leading-tight truncate">
                🎉 Kamu Hemat Ongkir Rp 15.000!
              </p>
              <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant truncate">
                Gratis Ongkir otomatis aktif untuk pesanan ini
              </p>
            </div>
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
              check_circle
            </span>
          </div>
        </div>
      </div>

      {/* Main Shopping Cart Items Flow (1 Col on Android, 2 Cols on Desktop) */}
      <div className="flex flex-col @lg:grid @lg:grid-cols-12 gap-space-md @lg:gap-6 px-margin @md:px-0 @lg:items-start">
        <div className="@lg:col-span-8 flex flex-col gap-space-md">
        {cartItems.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col items-center text-center gap-space-sm my-4">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[32px]">shopping_cart</span>
            </div>
            <h3 className="font-title-md text-title-md text-primary">
              Keranjang Belanja Masih Kosong
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
              Yuk jelajahi koleksi kriya lokal, tas tenun, dan batik tulis dari pengrajin Nusantara.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('kategori')}
              className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm active:scale-95 transition-transform"
            >
              Mulai Belanja Sekarang
            </button>
          </div>
        ) : (
          storeGroups.map((group) => {
            const storeChecked = group.items.every((i) => i.checked);
            return (
              <section
                key={group.storeId}
                className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md"
              >
                {/* Store Header */}
                <div className="flex items-center justify-between pb-space-xs">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <label className="relative flex items-center justify-center w-6 h-6 cursor-pointer">
                      <input
                        checked={storeChecked}
                        onChange={(e) => onToggleStoreCheck(group.storeId, e.target.checked)}
                        className="peer sr-only"
                        type="checkbox"
                      />
                      <div className="w-5 h-5 rounded bg-surface-container peer-checked:bg-primary-container flex items-center justify-center transition-colors">
                        <span
                          className={`material-symbols-outlined text-surface-container-lowest text-[16px] transition-transform ${
                            storeChecked ? 'scale-100' : 'scale-0'
                          }`}
                        >
                          check
                        </span>
                      </div>
                    </label>
                    <div className="flex items-center gap-space-xs min-w-0">
                      <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">
                        storefront
                      </span>
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                        {group.storeName}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm shrink-0">
                        {group.storeOrigin}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('kategori')}
                    aria-label="Kunjungi toko"
                    className="text-secondary hover:text-primary font-label-sm text-label-sm shrink-0"
                  >
                    Kunjungi
                  </button>
                </div>

                {/* Items in Store */}
                {group.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-space-sm pt-space-xs">
                    <label className="relative flex items-center justify-center w-6 h-6 mt-6 cursor-pointer shrink-0">
                      <input
                        checked={item.checked}
                        onChange={() => onToggleCheck(item.id)}
                        className="peer sr-only"
                        type="checkbox"
                      />
                      <div className="w-5 h-5 rounded bg-surface-container peer-checked:bg-primary-container flex items-center justify-center transition-colors">
                        <span
                          className={`material-symbols-outlined text-surface-container-lowest text-[16px] transition-transform ${
                            item.checked ? 'scale-100' : 'scale-0'
                          }`}
                        >
                          check
                        </span>
                      </div>
                    </label>

                    {/* Product Image */}
                    <div
                      onClick={() => handleOpenProductDetail(item)}
                      className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0 cursor-pointer"
                    >
                      <SafeImage
                        className="w-full h-full object-cover"
                        src={item.image}
                        alt={item.title}
                      />
                      <span className="absolute bottom-1 left-1 bg-primary-container/85 backdrop-blur-xs text-surface-container-lowest font-label-sm text-[9px] px-1 rounded">
                        {item.badge}
                      </span>
                    </div>

                    {/* Product Details & Stepper */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <h2
                        onClick={() => handleOpenProductDetail(item)}
                        className="font-title-sm text-title-sm text-on-surface line-clamp-2 leading-snug cursor-pointer hover:text-primary"
                      >
                        {item.title}
                      </h2>

                      <button
                        type="button"
                        onClick={() => onCycleVariant(item.id)}
                        className="mt-1 inline-flex items-center gap-1 self-start px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant text-[11px] font-label-md cursor-pointer hover:bg-surface-container transition-colors"
                      >
                        <span className="truncate max-w-[130px]">{item.variant}</span>
                        <span className="material-symbols-outlined text-[14px]">expand_more</span>
                      </button>

                      <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-currency-display text-currency-display text-primary-container">
                          {formatRp(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="font-body-sm text-body-sm text-outline line-through text-[11px]">
                            {formatRp(item.originalPrice)}
                          </span>
                        )}
                        {item.discountPercent && (
                          <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-[10px] px-1 rounded font-bold">
                            {item.discountPercent}%
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <button
                          type="button"
                          aria-label="Hapus barang"
                          onClick={() => onDeleteItem(item.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-error hover:bg-error-container/40 active:scale-95 transition-all"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-surface-container-low rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-on-surface-variant bg-surface-container-lowest shadow-xs active:scale-90 transition-transform"
                          >
                            <span className="material-symbols-outlined text-[14px]">remove</span>
                          </button>
                          <span className="font-title-sm text-title-sm text-on-surface w-6 text-center select-none font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-on-surface-variant bg-surface-container-lowest shadow-xs active:scale-90 transition-transform"
                          >
                            <span className="material-symbols-outlined text-[14px]">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            );
          })
        )}
        </div>

        {/* Right Sticky Column on Desktop: Voucher + Summary + Desktop Checkout */}
        <div className="@lg:col-span-4 @lg:sticky @lg:top-28 flex flex-col gap-space-md">
        {/* Voucher & Promo Card Section */}
        <div
          onClick={handleCycleVoucher}
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between gap-space-sm cursor-pointer hover:bg-surface-container-low transition-colors"
          role="button"
          tabIndex={0}
        >
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant shrink-0">
              <span className="material-symbols-outlined text-[18px]">local_offer</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                Voucher Promo Kriya
              </span>
              <span className="font-label-sm text-label-sm text-on-tertiary-container font-bold truncate">
                {voucherAmount > 0
                  ? `Diskon ${formatRp(voucherAmount)} Terpasang`
                  : 'Ketuk untuk pasang voucher promo'}
              </span>
            </div>
          </div>
          <div className="flex items-center text-secondary shrink-0 font-label-md text-label-md font-semibold">
            <span>Ganti</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </div>
        </div>

        {/* Mini Ringkasan Belanja Summary Card */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs">
          <div className="flex items-center justify-between pb-1">
            <span className="font-title-sm text-title-sm text-on-surface font-semibold">
              Ringkasan Belanja
            </span>
            <span className="font-label-sm text-label-sm text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded-full font-bold">
              {totalQty} Produk
            </span>
          </div>
          <div className="flex justify-between items-center text-body-sm font-body-sm text-on-surface-variant">
            <span>Subtotal Produk ({totalQty} barang)</span>
            <span className="font-title-sm text-title-sm text-on-surface">
              {formatRp(subtotal)}
            </span>
          </div>
          <div className="flex justify-between items-center text-body-sm font-body-sm text-on-surface-variant">
            <span>Diskon Voucher Belanja</span>
            <span className="font-title-sm text-title-sm text-on-tertiary-container font-semibold">
              -{formatRp(effectiveVoucher)}
            </span>
          </div>
          <div className="flex justify-between items-center text-body-sm font-body-sm text-on-surface-variant">
            <span>Hemat Potongan Khusus</span>
            <span className="font-title-sm text-title-sm text-on-secondary-container font-semibold">
              -{formatRp(specialSavings)}
            </span>
          </div>
          <div className="h-px bg-surface-container my-1"></div>
          <div className="flex justify-between items-center">
            <span className="font-label-md text-label-md text-on-surface font-bold">
              Total Hemat Belanja
            </span>
            <span className="font-label-md text-label-md text-secondary font-bold">
              {formatRp(totalSavings)}
            </span>
          </div>
        </div>

        {/* Curated Local Artisan Assurance Note */}
        <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low/70">
          <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
            verified_user
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            100% Produk kurasi UMKM lokal terverifikasi dengan jaminan retur 7 hari.
          </p>
        </div>

        {/* Desktop Checkout Action Card (Visible on Komputer / @lg:flex) */}
        <div className="hidden @lg:flex flex-col gap-3 bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                checked={allChecked}
                onChange={(e) => onToggleAllCheck(e.target.checked)}
                className="peer sr-only"
                type="checkbox"
              />
              <div className="w-5 h-5 rounded bg-surface-container peer-checked:bg-primary-container flex items-center justify-center transition-colors">
                <span
                  className={`material-symbols-outlined text-surface-container-lowest text-[16px] transition-transform ${
                    allChecked ? 'scale-100' : 'scale-0'
                  }`}
                >
                  check
                </span>
              </div>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Pilih Semua ({cartItems.length})
              </span>
            </label>
            <span className="font-currency-display text-title-lg text-primary font-bold">
              {formatRp(finalTotal)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (checkedItems.length === 0) {
                onShowToast('Pilih minimal 1 produk di keranjang untuk checkout!');
                return;
              }
              onProceedToCheckout();
            }}
            className="w-full h-12 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-primary transition-colors"
          >
            <span>Lanjut ke Checkout ({totalQty} Barang)</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
        </div>
      </div>

      {/* Sticky Floating Dock Checkout Bar (Android / Mobile only) */}
      <div className="@lg:hidden sticky bottom-20 left-0 right-0 z-40 mt-4 bg-surface-container-lowest shadow-[0_-4px_14px_rgba(23,43,77,0.08)] px-margin py-space-sm flex items-center justify-between gap-space-sm">
        <label className="flex items-center gap-space-xs cursor-pointer select-none shrink-0">
          <input
            checked={allChecked}
            onChange={(e) => onToggleAllCheck(e.target.checked)}
            className="peer sr-only"
            type="checkbox"
          />
          <div className="w-5 h-5 rounded bg-surface-container peer-checked:bg-primary-container flex items-center justify-center transition-colors">
            <span
              className={`material-symbols-outlined text-surface-container-lowest text-[16px] transition-transform ${
                allChecked ? 'scale-100' : 'scale-0'
              }`}
            >
              check
            </span>
          </div>
          <span className="font-label-md text-label-md text-on-surface font-semibold">
            Semua ({cartItems.length})
          </span>
        </label>

        <div className="flex items-center gap-space-md min-w-0">
          <div className="flex flex-col items-end text-right min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
              Total Belanja
            </span>
            <span className="font-currency-display text-currency-display text-primary-container leading-tight mt-0.5 truncate">
              {formatRp(finalTotal)}
            </span>
            <span className="font-label-sm text-[10px] text-on-tertiary-container font-bold leading-none">
              Hemat {formatRp(totalSavings)}
            </span>
          </div>
          <button
            type="button"
            aria-label="Lanjutkan ke Pembayaran"
            onClick={() => {
              if (checkedItems.length === 0) {
                onShowToast('Pilih minimal 1 produk di keranjang untuk checkout!');
                return;
              }
              onProceedToCheckout();
            }}
            className="h-11 px-space-lg rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform hover:bg-primary shrink-0"
          >
            <span>Checkout</span>
            <span className="w-5 h-5 rounded-full bg-secondary-fixed/20 text-surface-container-lowest flex items-center justify-center text-[11px] font-bold">
              {totalQty}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface AlamatScreenProps {
  addresses: AddressItem[];
  selectedAddressId: number;
  onSelectAddress: (id: number) => void;
  onSetMainAddress: (id: number) => void;
  onAddAddress: (newAddr: Omit<AddressItem, 'id' | 'isMain'>) => void;
  onConfirmAddress: () => void;
  onShowToast: (msg: string) => void;
}

export const AlamatScreen: React.FC<AlamatScreenProps> = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onSetMainAddress,
  onAddAddress,
  onConfirmAddress,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLabel, setNewLabel] = useState('Kos / Kampus');
  const [newRecipient, setNewRecipient] = useState('Fajar Pratama');
  const [newPhone, setNewPhone] = useState('(0812-3456-7890)');
  const [newFullAddr, setNewFullAddr] = useState(
    'Jl. Pemuda Raya No. 32, Sunyaragi, Kec. Kesambi, Kota Cirebon, Jawa Barat 45132'
  );
  const [newShort, setNewShort] = useState('Pemuda, Cirebon');

  const mapBgUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCXNOQwv18bsi9wvKNfRztXQIIEfYrbLj-CyQUsqQBYB-qRXk8CypFSbUCthHM0cf9DrrcR20omVVGos1kPShy23b1tVAWITzZfGnuzNJJD0mBz788s0ZIXbgJUoZxWzOzhQQEAl0DhsVXU6wpMXfmg6IKGFIbsVCg5imBhXxZqriGMRkgmNO2yDDZ6Ji4JbaWNcfMbL2AY2HPxHSRosNAwnv-uulzKi1M9ZE33W1wIHoOiLtgSM4eR';

  const filteredAddresses = addresses.filter((addr) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      addr.recipient.toLowerCase().includes(q) ||
      addr.fullAddress.toLowerCase().includes(q) ||
      addr.label.toLowerCase().includes(q)
    );
  });

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient.trim() || !newFullAddr.trim()) return;
    onAddAddress({
      label: newLabel.trim() || 'Rumah',
      recipient: newRecipient.trim(),
      phoneOrSub: newPhone.trim() || '(0812-3456-7890)',
      fullAddress: newFullAddr.trim(),
      shortLabel: newShort.trim() || 'Cirebon Kota',
    });
    setShowAddModal(false);
    onShowToast('Alamat baru berhasil ditambahkan & dipilih!');
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto pb-24 @lg:pb-12 @md:px-6 @lg:px-8 @md:pt-4">
      <div className="px-margin @md:px-0 pt-space-sm pb-space-md flex flex-col @md:flex-row gap-space-sm">
        <div className="w-full bg-surface-container-low rounded-xl px-space-md py-space-sm flex items-center gap-space-sm shadow-sm">
          <span className="material-symbols-outlined text-outline text-[20px]">search</span>
          <input
            className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
            placeholder="Cari alamat tersimpan..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="w-full @md:w-auto @md:px-6 shrink-0 h-12 rounded-xl bg-surface-container-low text-primary flex items-center justify-center gap-space-xs shadow-sm active:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px] font-bold">add</span>
          <span className="font-label-lg text-label-lg tracking-wide">Tambah Alamat Baru</span>
        </button>
      </div>

      {/* Area Jangkauan Pengiriman */}
      <div className="px-margin @md:px-0 mb-space-md">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                location_on
              </span>
              <span className="font-label-md text-label-md text-on-surface">
                Area Jangkauan Pengiriman
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded-full">
              1-2 Hari Kerja
            </span>
          </div>
          <div className="relative w-full h-24 rounded-lg overflow-hidden bg-surface-container">
            <SafeImage
              src={mapBgUrl}
              alt="Cirebon Kota Map"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-on-primary">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                  near_me
                </span>
                <span className="font-label-sm text-label-sm tracking-tight drop-shadow-sm">
                  Cirebon Kota &amp; Sekitarnya
                </span>
              </div>
              <span className="font-label-sm text-label-sm bg-primary/80 backdrop-blur-sm px-2 py-0.5 rounded text-white text-[10px]">
                Radius Prioritas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Daftar Alamat Saya */}
      <div className="px-margin @md:px-0 flex flex-col gap-space-sm">
        <div className="flex items-center justify-between mb-1">
          <span className="font-label-md text-label-md text-on-surface-variant">
            Daftar Alamat Saya
          </span>
          <span className="font-label-sm text-label-sm text-outline">
            {addresses.length} Alamat Tersimpan
          </span>
        </div>

        <div className="grid grid-cols-1 @lg:grid-cols-2 gap-space-sm @md:gap-4">
        {filteredAddresses.map((addr) => {
          const isSelected = selectedAddressId === addr.id;
          return (
            <div
              key={addr.id}
              onClick={() => {
                onSelectAddress(addr.id);
                onShowToast(`Dipilih: ${addr.shortLabel}`);
              }}
              className={`relative w-full bg-surface-container-lowest rounded-xl p-space-md transition-all duration-200 cursor-pointer ${
                isSelected ? 'shadow-md bg-surface-container-low/40' : 'shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-space-sm mb-2">
                <div className="flex items-center gap-space-xs flex-wrap">
                  {addr.isMain && (
                    <span className="font-label-sm text-label-sm bg-primary text-on-primary px-2 py-0.5 rounded-full">
                      Utama
                    </span>
                  )}
                  <span className="font-label-sm text-label-sm bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded-full">
                    {addr.label}
                  </span>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-highest text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-space-xs mb-1">
                <span className="font-title-md text-title-md text-on-surface font-bold">
                  {addr.recipient}
                </span>
                <span className="text-on-surface-variant font-body-sm text-body-sm">
                  {addr.phoneOrSub}
                </span>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-2">
                {addr.fullAddress}
              </p>

              {addr.patokan && (
                <div className="bg-surface-container/60 rounded-lg p-space-xs px-space-sm flex items-start gap-space-xs mb-3">
                  <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">
                    info
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    <span className="font-bold text-on-surface">Patokan:</span> {addr.patokan}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-space-xs">
                {addr.isMain ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowToast('Tautan pinpoint tersalin ke papan klip');
                    }}
                    className="flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[16px]">share_location</span>
                    <span>Bagikan Pinpoint</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSetMainAddress(addr.id);
                      onShowToast(`Alamat ${addr.label} kini disetel sebagai Alamat Utama`);
                    }}
                    className="font-label-md text-label-md text-secondary hover:text-primary"
                  >
                    Jadikan Alamat Utama
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectAddress(addr.id);
                    onShowToast(`Alamat ${addr.label} dipilih untuk pengiriman`);
                  }}
                  className="font-label-md text-label-md text-primary font-bold hover:underline"
                >
                  Ubah Alamat
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Pengiriman Terlindungi */}
      <div className="px-margin mt-space-lg flex items-center gap-space-sm bg-surface-container/40 p-space-md rounded-xl mx-margin @md:mx-0">
        <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-on-secondary-container text-[18px]">
            verified_user
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-on-surface font-bold">
            Pengiriman Terlindungi
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Kurir kurasi LokaMart mengonfirmasi titik koordinat sebelum pengantaran kriya.
          </span>
        </div>
      </div>

      {/* Bottom Floating CTA Container */}
      <div className="sticky bottom-4 left-0 w-full px-margin z-30 mt-4">
        <div className="bg-surface/80 backdrop-blur-lg p-2 rounded-2xl shadow-xl">
          <button
            type="button"
            onClick={onConfirmAddress}
            className="w-full h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center gap-space-xs shadow-md active:scale-[0.99] transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            <span className="font-label-lg text-label-lg tracking-wide">Gunakan Alamat Ini</span>
          </button>
        </div>
      </div>

      {/* Modal Tambah Alamat Baru */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-end @md:items-center justify-center pb-safe p-0 @md:p-4">
          <form
            onSubmit={handleSaveNewAddress}
            className="w-full max-w-[460px] bg-surface-container-lowest rounded-t-2xl @md:rounded-2xl p-space-lg flex flex-col gap-space-sm shadow-2xl"
          >
            <div className="flex items-center justify-between pb-1">
              <h3 className="font-title-lg text-title-lg text-primary">Tambah Alamat Baru</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">
                Label Alamat
              </label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none"
                placeholder="Rumah / Kantor / Kampus"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant">
                  Nama Penerima
                </label>
                <input
                  type="text"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant">
                  Area Singkat
                </label>
                <input
                  type="text"
                  value={newShort}
                  onChange={(e) => setNewShort(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">
                Alamat Lengkap
              </label>
              <textarea
                rows={2}
                value={newFullAddr}
                onChange={(e) => setNewFullAddr(e.target.value)}
                className="p-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full h-11 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-md"
            >
              Simpan &amp; Gunakan Alamat
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

interface CheckoutScreenProps {
  checkoutItems: CartItem[];
  voucherAmount: number;
  selectedAddress: AddressItem;
  shippingType: 'reguler' | 'express';
  paymentBank: 'BCA' | 'MANDIRI' | 'BRI' | 'LOKAPAY';
  onChangeShipping: (type: 'reguler' | 'express') => void;
  onChangePaymentBank: (bank: 'BCA' | 'MANDIRI' | 'BRI' | 'LOKAPAY') => void;
  onPlaceOrder: () => void;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  checkoutItems,
  voucherAmount,
  selectedAddress,
  shippingType,
  paymentBank,
  onChangeShipping,
  onChangePaymentBank,
  onPlaceOrder,
  onNavigate,
  onShowToast,
}) => {
  const [isCreating, setIsCreating] = useState(false);

  const totalItemsCount = checkoutItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalProduk = checkoutItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = shippingType === 'express' ? 26000 : 14000;
  const shippingDiscount = 14000;
  const effectiveVoucher = Math.min(voucherAmount, subtotalProduk);
  const serviceFee = 1000;
  const totalPayment = Math.max(
    0,
    subtotalProduk + shippingFee - shippingDiscount - effectiveVoucher + serviceFee
  );

  const bankMeta = {
    BCA: { code: 'BCA', name: 'BCA Virtual Account', sub: 'Verifikasi Otomatis' },
    MANDIRI: { code: 'MDR', name: 'Mandiri Virtual Account', sub: 'Verifikasi Otomatis' },
    BRI: { code: 'BRI', name: 'BRIVA Virtual Account', sub: 'Verifikasi Otomatis' },
    LOKAPAY: { code: 'LPY', name: 'Saldo LokaPay Nusantara', sub: 'Potong Saldo Instan' },
  };

  const cycleBank = () => {
    const order: ('BCA' | 'MANDIRI' | 'BRI' | 'LOKAPAY')[] = [
      'BCA',
      'MANDIRI',
      'BRI',
      'LOKAPAY',
    ];
    const next = order[(order.indexOf(paymentBank) + 1) % order.length];
    onChangePaymentBank(next);
    onShowToast(`Metode Pembayaran: ${bankMeta[next].name}`);
  };

  const handleCreateOrder = () => {
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      onPlaceOrder();
    }, 500);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-24 @lg:pb-12 @md:px-6 @lg:px-8 @md:pt-4">
      <div className="px-margin @md:px-0 pt-space-md pb-space-xs flex items-center justify-between">
        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
          <span
            className="material-symbols-outlined text-[18px] text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <span>Transaksi Terenkripsi 256-bit</span>
        </div>
        <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded-full">
          Langkah Terakhir
        </span>
      </div>

      <div className="px-margin @md:px-0 flex flex-col @lg:grid @lg:grid-cols-12 gap-space-md @lg:gap-6 mt-space-sm @lg:items-start">
        <div className="@lg:col-span-7 flex flex-col gap-space-md">
        {/* Alamat Pengiriman */}
        <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
          <div className="flex items-center justify-between pb-space-sm">
            <div className="flex items-center gap-space-xs text-primary">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                location_on
              </span>
              <h2 className="font-title-md text-title-md text-on-surface">Alamat Pengiriman</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('alamat')}
              className="font-label-md text-label-md text-secondary active:opacity-70 flex items-center gap-0.5"
            >
              <span>Ubah</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
          <div className="flex flex-col gap-1 mt-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-title-sm text-title-sm text-on-surface">
                {selectedAddress.recipient}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {selectedAddress.phoneOrSub}
              </span>
              <span className="bg-primary/10 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full">
                Alamat {selectedAddress.label}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
              {selectedAddress.fullAddress}
            </p>
          </div>
        </section>

        {/* Rincian Produk */}
        <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                inventory_2
              </span>
              <h2 className="font-title-md text-title-md text-on-surface">Rincian Produk</h2>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
              {totalItemsCount} Barang
            </span>
          </div>

          {checkoutItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              {idx > 0 && <div className="h-px bg-surface-container w-full"></div>}
              <div className="flex items-start gap-space-md">
                <SafeImage
                  className="w-16 h-16 rounded-lg object-cover bg-surface-container shrink-0"
                  src={item.image}
                  alt={item.title}
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="font-title-sm text-title-sm text-on-surface line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Varian: {item.variant}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.quantity}x
                    </span>
                    <span className="font-currency-display text-currency-display text-primary">
                      {formatRp(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </section>

        {/* Pilih Opsi Pengiriman */}
        <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center gap-space-xs text-primary">
            <span className="material-symbols-outlined text-[20px] text-secondary">
              local_shipping
            </span>
            <h2 className="font-title-md text-title-md text-on-surface">
              Pilih Opsi Pengiriman
            </h2>
          </div>

          <div className="flex flex-col gap-space-sm">
            <label
              className={`cursor-pointer flex items-start justify-between p-space-md rounded-lg transition-all ${
                shippingType === 'reguler'
                  ? 'bg-surface-container-low'
                  : 'bg-surface-container-lowest hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-start gap-space-sm min-w-0">
                <input
                  checked={shippingType === 'reguler'}
                  onChange={() => onChangeShipping('reguler')}
                  className="mt-1 accent-primary w-4 h-4 cursor-pointer"
                  name="shipping_service"
                  type="radio"
                  value="reguler"
                />
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm text-on-surface">
                    Reguler J&amp;T / SiCepat
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Estimasi tiba 2-3 hari
                  </span>
                </div>
              </div>
              <span className="font-title-sm text-title-sm text-primary shrink-0">
                Rp 14.000
              </span>
            </label>

            <label
              className={`cursor-pointer flex items-start justify-between p-space-md rounded-lg transition-all ${
                shippingType === 'express'
                  ? 'bg-surface-container-low'
                  : 'bg-surface-container-lowest hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-start gap-space-sm min-w-0">
                <input
                  checked={shippingType === 'express'}
                  onChange={() => onChangeShipping('express')}
                  className="mt-1 accent-primary w-4 h-4 cursor-pointer"
                  name="shipping_service"
                  type="radio"
                  value="express"
                />
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm text-on-surface">
                    Express Kilat 1 Hari
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Estimasi tiba besok sore
                  </span>
                </div>
              </div>
              <span className="font-title-sm text-title-sm text-primary shrink-0">
                Rp 26.000
              </span>
            </label>
          </div>

          <div className="flex items-center gap-space-xs bg-surface-container-high/50 p-2.5 rounded-lg text-on-surface-variant">
            <span
              className="material-symbols-outlined text-[18px] text-secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield
            </span>
            <p className="font-body-sm text-body-sm">
              Gratis perlindungan asuransi produk kriya kerajinan
            </p>
          </div>
        </section>
        </div>

        <div className="@lg:col-span-5 @lg:sticky @lg:top-28 flex flex-col gap-space-md">
        {/* Metode Pembayaran */}
        <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs text-primary">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                account_balance_wallet
              </span>
              <h2 className="font-title-md text-title-md text-on-surface">Metode Pembayaran</h2>
            </div>
            <button
              type="button"
              onClick={cycleBank}
              className="font-label-md text-label-md text-secondary active:opacity-70 flex items-center gap-0.5"
            >
              <span>Ubah</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div
            onClick={cycleBank}
            className="flex items-center justify-between p-space-md bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-11 h-8 rounded bg-primary flex items-center justify-center font-headline-sm text-headline-sm text-on-primary tracking-tight font-bold shrink-0 text-[14px]">
                {bankMeta[paymentBank].code}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-title-sm text-title-sm text-on-surface truncate">
                  {bankMeta[paymentBank].name}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {bankMeta[paymentBank].sub}
                </span>
              </div>
            </div>
            <span className="bg-secondary/10 text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded-full shrink-0">
              Instan
            </span>
          </div>
        </section>

        {/* Ringkasan Pembayaran */}
        <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm">
          <h2 className="font-title-md text-title-md text-on-surface mb-1">
            Ringkasan Pembayaran
          </h2>
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Subtotal Produk ({totalItemsCount} barang)
            </span>
            <span className="font-body-sm text-body-sm text-on-surface">
              {formatRp(subtotalProduk)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Subtotal Pengiriman ({shippingType === 'express' ? 'Express' : 'Reguler'})
            </span>
            <span className="font-body-sm text-body-sm text-on-surface">
              {formatRp(shippingFee)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-tertiary-container">
              Diskon Ongkos Kirim
            </span>
            <span className="font-body-sm text-body-sm text-on-tertiary-container">
              -{formatRp(shippingDiscount)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-tertiary-container">
              Voucher Diskon LokaMart
            </span>
            <span className="font-body-sm text-body-sm text-on-tertiary-container">
              -{formatRp(effectiveVoucher)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Biaya Layanan Aplikasi
            </span>
            <span className="font-body-sm text-body-sm text-on-surface">
              {formatRp(serviceFee)}
            </span>
          </div>
          <div className="h-px bg-surface-container w-full my-1"></div>
          <div className="flex items-center justify-between">
            <span className="font-title-sm text-title-sm text-on-surface">Total Pembayaran</span>
            <span className="font-title-lg text-title-lg text-primary">
              {formatRp(totalPayment)}
            </span>
          </div>

          {/* Desktop Inline Buat Pesanan Button */}
          <button
            type="button"
            onClick={handleCreateOrder}
            className="hidden @lg:flex mt-3 w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold items-center justify-center gap-2 shadow-md hover:bg-primary-container transition-all"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isCreating ? 'animate-spin' : ''
              }`}
            >
              {isCreating ? 'sync' : 'lock'}
            </span>
            <span>{isCreating ? 'Memproses Pesanan...' : 'Buat Pesanan Sekarang'}</span>
          </button>
        </section>
        </div>
      </div>

      {/* Bottom Sticky Action Bar (Android / Mobile only) */}
      <div className="@lg:hidden sticky bottom-0 left-0 right-0 z-40 mt-4 bg-surface-container-lowest/95 backdrop-blur-md px-margin py-3 shadow-[0_-4px_16px_rgba(23,43,77,0.06)]">
        <div className="flex items-center justify-between gap-space-md">
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Total Tagihan
            </span>
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
              {formatRp(totalPayment)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCreateOrder}
            className="h-12 px-6 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-space-xs shadow-md shrink-0"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isCreating ? 'animate-spin' : ''
              }`}
            >
              {isCreating ? 'sync' : 'lock'}
            </span>
            <span>{isCreating ? 'Memproses...' : 'Buat Pesanan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface PembayaranVAScreenProps {
  activeOrder: Order;
  onConfirmPaymentSuccess: (orderId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const PembayaranVAScreen: React.FC<PembayaranVAScreenProps> = ({
  activeOrder,
  onConfirmPaymentSuccess,
  onNavigate,
  onShowToast,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(23 * 3600 + 59 * 60 + 42);
  const [openAccordion, setOpenAccordion] = useState<string | null>('mbca');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = String(Math.floor(remainingSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(remainingSeconds % 60).padStart(2, '0');

  const vaClean = (activeOrder.vaNumber || '1234 5678 90').replace(/\s+/g, '');

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldId);
    onShowToast('Tersalin ke papan klip!');
    setTimeout(() => setCopiedField(null), 1500);
  };

  const handleSimulatePay = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setShowSuccessModal(true);
    }, 700);
  };

  const isWaiting = activeOrder.status === 'Menunggu Pembayaran';

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto pb-8 px-margin @md:px-6 @lg:px-8 gap-space-lg select-none pt-2 @md:pt-5">
      {/* Academic Project Simulation Disclaimer Banner */}
      <div className="rounded-xl bg-tertiary-container text-on-tertiary p-space-md shadow-sm relative overflow-hidden">
        <div className="flex items-start gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-on-tertiary/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
              school
            </span>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-md text-label-md text-tertiary-fixed uppercase tracking-wider font-semibold">
                Simulasi Proyek RPL • STMIK IKMI Cirebon
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
                Sandbox
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-tertiary-fixed-dim leading-snug">
              Halaman ini dirancang oleh Mahasiswa Rekayasa Perangkat Lunak (RPL) STMIK IKMI Cirebon
              untuk pengujian teknis simulasi transaksi. Tidak ada dana riil yang ditarik.
            </p>
          </div>
        </div>
      </div>

      {/* Countdown Timer Card */}
      <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col items-center text-center gap-space-sm relative">
        <div className="flex items-center gap-space-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
          <span className="font-label-md text-label-md">Selesaikan Pembayaran Dalam</span>
        </div>

        <div className="flex items-center gap-space-xs my-1">
          <div className="flex flex-col items-center">
            <div className="w-12 h-11 bg-primary text-on-primary rounded-lg flex items-center justify-center font-headline-sm text-headline-sm tracking-widest shadow-inner">
              {hrs}
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Jam</span>
          </div>
          <span className="font-headline-sm text-headline-sm text-primary -mt-4">:</span>
          <div className="flex flex-col items-center">
            <div className="w-12 h-11 bg-primary text-on-primary rounded-lg flex items-center justify-center font-headline-sm text-headline-sm tracking-widest shadow-inner">
              {mins}
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
              Menit
            </span>
          </div>
          <span className="font-headline-sm text-headline-sm text-primary -mt-4">:</span>
          <div className="flex flex-col items-center">
            <div className="w-12 h-11 bg-primary text-on-primary rounded-lg flex items-center justify-center font-headline-sm text-headline-sm tracking-widest shadow-inner">
              {secs}
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
              Detik
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm">
          <span className="material-symbols-outlined text-[14px]">event</span>
          <span>
            Jatuh tempo: <strong className="font-semibold text-on-surface">Besok, pukul 10:15 WIB</strong>
          </span>
        </div>
      </div>

      {/* Virtual Account Details Card */}
      <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
        <div className="flex items-center justify-between pb-space-sm">
          <div className="flex items-center gap-space-sm">
            <div className="w-11 h-8 rounded-lg bg-surface-container flex items-center justify-center px-1 font-label-lg text-label-lg font-bold text-primary">
              BCA
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-title-md text-on-surface leading-tight">
                BCA Virtual Account
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Verifikasi instan otomatis
              </span>
            </div>
          </div>
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-xs ${
              isWaiting
                ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                : 'bg-[#dcfce7] text-[#15803d]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isWaiting ? 'bg-on-tertiary-container animate-pulse' : 'bg-[#15803d]'
              }`}
            ></span>
            <span className="font-label-sm text-label-sm font-semibold">
              {isWaiting ? 'Menunggu' : 'Lunas'}
            </span>
          </div>
        </div>

        {/* VA Number Row */}
        <div className="flex flex-col gap-1 p-space-md rounded-xl bg-surface-container-low">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Nomor Virtual Account
          </span>
          <div className="flex items-center justify-between">
            <span className="font-headline-md text-headline-md text-primary tracking-wider font-bold">
              {activeOrder.vaNumber || '1234 5678 90'}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(vaClean, 'va')}
              className="h-8 px-3 rounded-full bg-surface-container text-primary font-label-md text-label-md flex items-center gap-1 active:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copiedField === 'va' ? 'check' : 'content_copy'}
              </span>
              <span>{copiedField === 'va' ? 'Tersalin' : 'Salin'}</span>
            </button>
          </div>
        </div>

        {/* Amount Row */}
        <div className="flex flex-col gap-1 p-space-md rounded-xl bg-surface-container-low">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Total Tagihan Pembayaran
          </span>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-label-lg text-label-lg font-bold text-primary">Rp</span>
              <span className="font-headline-md text-headline-md text-primary font-bold">
                {activeOrder.totalPayment.toLocaleString('id-ID')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(String(activeOrder.totalPayment), 'amount')}
              className="h-8 px-3 rounded-full bg-surface-container text-primary font-label-md text-label-md flex items-center gap-1 active:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copiedField === 'amount' ? 'check' : 'content_copy'}
              </span>
              <span>{copiedField === 'amount' ? 'Tersalin' : 'Salin'}</span>
            </button>
          </div>
        </div>

        {/* Order Recipient Brief */}
        <div className="flex items-center justify-between text-body-sm font-body-sm pt-1 px-1 text-on-surface-variant">
          <span>Nama Pelanggan</span>
          <span className="font-semibold text-on-surface">
            LokaMart - {activeOrder.address.recipient}
          </span>
        </div>
      </div>

      {/* Petunjuk Cara Pembayaran */}
      <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-center gap-space-xs mb-1">
          <span className="material-symbols-outlined text-primary text-[20px]">help_outline</span>
          <h2 className="font-title-lg text-title-lg text-primary">Petunjuk Pembayaran</h2>
        </div>

        {/* Accordion 1: m-BCA */}
        <div className="rounded-xl bg-surface-container-low overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenAccordion(openAccordion === 'mbca' ? null : 'mbca')}
            className="w-full p-space-md flex items-center justify-between text-left active:bg-surface-container-high transition-colors"
          >
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                smartphone
              </span>
              <span className="font-title-sm text-title-sm text-on-surface">
                m-BCA (BCA Mobile)
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-200 ${
                openAccordion === 'mbca' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordion === 'mbca' && (
            <div className="px-space-md pb-space-md pt-0 flex flex-col gap-space-sm text-body-sm font-body-sm text-on-surface-variant">
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-on-surface leading-tight">
                  Buka aplikasi <strong>m-BCA</strong>, masukkan kode akses, lalu pilih menu{' '}
                  <strong>m-Transfer</strong>.
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-on-surface leading-tight">
                  Pilih menu <strong>BCA Virtual Account</strong>.
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-on-surface leading-tight">
                  Masukkan nomor VA{' '}
                  <strong className="text-primary font-semibold">{vaClean}</strong> dan klik{' '}
                  <strong>Send</strong>.
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  4
                </div>
                <p className="text-on-surface leading-tight">
                  Pastikan nama penerima tertera{' '}
                  <strong>LokaMart - {activeOrder.address.recipient}</strong> dengan nominal pas{' '}
                  <strong>{formatRp(activeOrder.totalPayment)}</strong>.
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  5
                </div>
                <p className="text-on-surface leading-tight">
                  Masukkan PIN m-BCA Anda dan simpan bukti konfirmasi transaksi.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: ATM BCA */}
        <div className="rounded-xl bg-surface-container-low overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenAccordion(openAccordion === 'atm' ? null : 'atm')}
            className="w-full p-space-md flex items-center justify-between text-left active:bg-surface-container-high transition-colors"
          >
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                local_atm
              </span>
              <span className="font-title-sm text-title-sm text-on-surface">ATM BCA</span>
            </div>
            <span
              className={`material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-200 ${
                openAccordion === 'atm' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordion === 'atm' && (
            <div className="px-space-md pb-space-md pt-0 flex flex-col gap-space-sm text-body-sm font-body-sm text-on-surface-variant">
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-on-surface leading-tight">
                  Masukkan Kartu ATM BCA dan PIN Anda di mesin ATM.
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-on-surface leading-tight">
                  Pilih <strong>Transaksi Lainnya</strong> &gt; <strong>Transfer</strong> &gt;{' '}
                  <strong>ke Rekening BCA Virtual Account</strong>.
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-on-surface leading-tight">
                  Masukkan nomor <strong>{vaClean}</strong> lalu pilih <strong>Benar</strong>.
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  4
                </div>
                <p className="text-on-surface leading-tight">
                  Periksa rincian pada layar, lalu tekan <strong>Ya</strong> untuk menyelesaikan
                  transfer.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 3: KlikBCA */}
        <div className="rounded-xl bg-surface-container-low overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenAccordion(openAccordion === 'klikbca' ? null : 'klikbca')}
            className="w-full p-space-md flex items-center justify-between text-left active:bg-surface-container-high transition-colors"
          >
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                laptop_mac
              </span>
              <span className="font-title-sm text-title-sm text-on-surface">
                KlikBCA Internet Banking
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-200 ${
                openAccordion === 'klikbca' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordion === 'klikbca' && (
            <div className="px-space-md pb-space-md pt-0 flex flex-col gap-space-sm text-body-sm font-body-sm text-on-surface-variant">
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-on-surface leading-tight">
                  Login ke situs <strong>KlikBCA Individual</strong>.
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-on-surface leading-tight">
                  Pilih menu <strong>Transfer Dana</strong> &gt;{' '}
                  <strong>Transfer ke BCA Virtual Account</strong>.
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-on-surface leading-tight">
                  Ketikkan <strong>{vaClean}</strong> dan otorisasi menggunakan respon KeyBCA Appli
                  1.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sandbox Testing Controls & Action Buttons */}
      <div className="flex flex-col gap-space-sm pt-2">
        <button
          type="button"
          disabled={isSimulating}
          onClick={handleSimulatePay}
          className="w-full h-12 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md active:bg-primary-container transition-all"
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              isSimulating ? 'animate-spin' : ''
            }`}
          >
            sync
          </span>
          <span>
            {isSimulating
              ? 'Memverifikasi Sandbox...'
              : 'Cek Status Pembayaran (Simulasi Berhasil)'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('pesanan')}
          className="w-full h-12 rounded-xl bg-surface-container text-primary font-label-lg text-label-lg flex items-center justify-center gap-space-sm active:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Kembali ke Beranda Transaksi</span>
        </button>
      </div>

      {/* Simulated Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-end @md:items-center justify-center pb-safe p-0 @md:p-4">
          <div className="w-full max-w-[440px] bg-surface-container-lowest rounded-t-2xl @md:rounded-2xl p-space-xl flex flex-col items-center text-center gap-space-md shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-1">
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm self-center font-bold">
                Simulasi Berhasil
              </span>
              <h3 className="font-headline-md text-headline-md text-primary mt-1">
                Pembayaran Diterima!
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant px-4">
                Sandbox mendeteksi pelunasan Virtual Account sebesar{' '}
                <strong>{formatRp(activeOrder.totalPayment)}</strong>. Pesanan kriya lokal Anda
                segera disiapkan oleh pengrajin.
              </p>
            </div>
            <div className="w-full p-space-md rounded-xl bg-surface-container-low flex flex-col gap-2 my-1 text-left text-body-sm font-body-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Nomor Pesanan</span>
                <span className="font-mono text-on-surface font-semibold">
                  {activeOrder.orderNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Status Pesanan Baru</span>
                <span className="text-secondary font-semibold">Sedang Diproses Toko</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowSuccessModal(false);
                onConfirmPaymentSuccess(activeOrder.id);
              }}
              className="w-full h-12 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center shadow-md active:bg-primary-container transition-all"
            >
              Lihat Bukti &amp; Status Pesanan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
