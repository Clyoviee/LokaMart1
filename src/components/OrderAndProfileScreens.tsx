import React, { useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_USER_PROFILE,
  Order,
  OrderStatus,
  ScreenId,
  UserProfile,
  formatRp,
} from '../data';
import { SafeImage } from './ShellComponents';

interface PembayaranBerhasilScreenProps {
  activeOrder: Order;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const PembayaranBerhasilScreen: React.FC<PembayaranBerhasilScreenProps> = ({
  activeOrder,
  onNavigate,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyOrder = () => {
    navigator.clipboard?.writeText(activeOrder.orderNumber);
    setCopied(true);
    onShowToast('Nomor pesanan berhasil disalin!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto pb-8 @md:py-6">
      <div className="relative w-full flex flex-col items-center justify-center px-margin pt-4 pb-2 overflow-hidden text-center">
        <div className="relative flex items-center justify-center mb-space-md">
          <div className="absolute -top-3 -left-4 w-3 h-3 rounded-full bg-secondary-fixed opacity-75 animate-bounce"></div>
          <div className="absolute top-1 -right-5 w-2.5 h-2.5 rounded-full bg-tertiary-fixed opacity-90 animate-pulse"></div>
          <div className="absolute -bottom-2 -left-6 w-2 h-2 rounded-full bg-secondary-container"></div>
          <div className="absolute -bottom-1 -right-3 w-3.5 h-1.5 rounded-full bg-tertiary-fixed-dim rotate-45"></div>
          <div className="absolute -top-5 right-2 w-1.5 h-3 rounded-full bg-primary-fixed-dim -rotate-12"></div>
          <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center shadow-sm relative">
            <div className="w-16 h-16 rounded-full bg-[#15803d] flex items-center justify-center text-white shadow-md">
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
              >
                check
              </span>
            </div>
          </div>
        </div>
        <h2 className="font-headline-md text-headline-md text-primary mb-space-xs">
          Pembayaran Berhasil!
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs leading-relaxed">
          Terima kasih! Pesanan Anda telah diverifikasi otomatis dan diteruskan ke pengrajin lokal
          untuk dipersiapkan.
        </p>
      </div>

      {/* Receipt Card */}
      <div className="px-margin my-space-sm">
        <div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden relative">
          <div className="p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Status Pembayaran
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#15803d] font-label-md text-label-md">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                Lunas (Otomatis)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Nomor Pesanan
              </span>
              <div className="flex items-center gap-space-xs">
                <span className="font-title-sm text-title-sm text-on-surface">
                  {activeOrder.orderNumber}
                </span>
                <button
                  type="button"
                  aria-label="Salin nomor pesanan"
                  onClick={handleCopyOrder}
                  className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-secondary active:scale-95 transition-transform"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      copied ? 'text-[#15803d]' : ''
                    }`}
                  >
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Waktu Transaksi
              </span>
              <span className="font-body-md text-body-md text-on-surface text-right">
                {activeOrder.timeStr}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Metode Pembayaran
              </span>
              <div className="flex items-center gap-1.5 text-right">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  account_balance
                </span>
                <span className="font-body-md text-body-md text-on-surface">
                  {activeOrder.paymentMethod.split('(')[0].trim()}
                </span>
              </div>
            </div>
          </div>

          <div className="relative w-full flex items-center justify-between px-2">
            <div className="w-4 h-4 rounded-full bg-surface -ml-4 shadow-inner"></div>
            <div className="flex-1 mx-2 border-b-2 border-dashed border-surface-variant"></div>
            <div className="w-4 h-4 rounded-full bg-surface -mr-4 shadow-inner"></div>
          </div>

          <div className="p-space-lg flex items-center justify-between bg-surface-container-low/50">
            <div>
              <span className="font-body-sm text-body-sm text-on-surface-variant block">
                Total Pembayaran
              </span>
              <span className="font-label-sm text-label-sm text-secondary">
                Termasuk Pajak &amp; Biaya Layanan
              </span>
            </div>
            <span className="font-headline-md text-headline-md text-primary">
              {formatRp(activeOrder.totalPayment)}
            </span>
          </div>
        </div>
      </div>

      {/* Langkah Selanjutnya */}
      <div className="px-margin my-space-sm">
        <div
          onClick={() => onNavigate('detail-pesanan')}
          className="bg-surface-container-low rounded-xl p-space-md shadow-sm cursor-pointer active:scale-[0.99] transition-transform"
        >
          <div className="flex items-start gap-space-md">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-title-sm text-title-sm text-primary truncate">
                  Langkah Selanjutnya
                </span>
                <span className="font-label-sm text-label-sm text-secondary bg-surface-container-highest px-2 py-0.5 rounded-full shrink-0">
                  {activeOrder.status}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Pengrajin sedang mengemas barang pesanan Anda dari sentra kriya{' '}
                <span className="font-label-md text-label-md text-on-surface">
                  {activeOrder.storeOrigin || 'Cirebon & Jepara'}
                </span>
                .
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px] text-secondary">
                verified_user
              </span>
              <span>Garansi Kualitas Karya Lokal 100%</span>
            </div>
            <span className="material-symbols-outlined text-outline text-[16px]">
              chevron_right
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-margin mt-space-md flex flex-col @md:flex-row gap-space-sm">
        <button
          type="button"
          onClick={() => onNavigate('detail-pesanan')}
          className="w-full h-12 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-md active:opacity-90 active:scale-[0.99] transition-all"
        >
          <span>Lihat Rincian Pesanan</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('beranda')}
          className="w-full h-12 rounded-xl bg-surface-container-low text-primary-container font-label-lg text-label-lg flex items-center justify-center gap-space-xs active:bg-surface-container transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">storefront</span>
          <span>Kembali Belanja ke Beranda</span>
        </button>
      </div>
    </div>
  );
};

interface PesananScreenProps {
  orders: Order[];
  initialTab?: string;
  onSelectOrder: (order: Order, targetScreen: ScreenId) => void;
  onUpdateOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
  onReviewOrder: (orderId: string) => void;
  onReorder: (order: Order) => void;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const PesananScreen: React.FC<PesananScreenProps> = ({
  orders,
  initialTab = 'Semua',
  onSelectOrder,
  onUpdateOrderStatus,
  onReviewOrder,
  onReorder,
  onNavigate,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const statusTabs = [
    { key: 'Semua', label: 'Semua' },
    { key: 'Menunggu Pembayaran', label: 'Menunggu Pembayaran' },
    { key: 'Diproses (Aktif)', label: 'Diproses (Aktif)' },
    { key: 'Dikirim', label: 'Dikirim' },
    { key: 'Selesai', label: 'Selesai' },
    { key: 'Dibatalkan', label: 'Dibatalkan' },
  ];

  const filteredOrders = useMemo(() => {
    let list = orders;

    if (activeTab === 'Menunggu Pembayaran') {
      list = list.filter((o) => o.status === 'Menunggu Pembayaran');
    } else if (activeTab === 'Diproses (Aktif)') {
      // Show Diproses; if user hasn't clicked another tab and wants to see active ones, include Diproses
      const diprosesOnly = list.filter((o) => o.status === 'Diproses');
      list = diprosesOnly.length > 0 ? diprosesOnly : list;
    } else if (activeTab === 'Dikirim') {
      list = list.filter((o) => o.status === 'Dikirim');
    } else if (activeTab === 'Selesai') {
      list = list.filter((o) => o.status === 'Selesai');
    } else if (activeTab === 'Dibatalkan') {
      list = list.filter((o) => o.status === 'Dibatalkan');
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.storeName.toLowerCase().includes(q) ||
          o.items.some((i) => i.title.toLowerCase().includes(q))
      );
    }

    return list;
  }, [orders, activeTab, searchQuery]);

  const renderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Menunggu Pembayaran':
        return (
          <div className="shrink-0 bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            Belum Bayar
          </div>
        );
      case 'Diproses':
        return (
          <div className="shrink-0 bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            Diproses
          </div>
        );
      case 'Dikirim':
        return (
          <div className="shrink-0 bg-secondary-fixed text-on-secondary-fixed-variant px-2.5 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px] animate-pulse">
              local_shipping
            </span>
            Dikirim
          </div>
        );
      case 'Selesai':
        return (
          <div className="shrink-0 bg-surface-container-high text-secondary px-2.5 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Selesai
          </div>
        );
      case 'Dibatalkan':
        return (
          <div className="shrink-0 bg-error-container text-on-error-container px-2.5 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">cancel</span>
            Dibatalkan
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-6 @md:px-6 @lg:px-8 @md:pt-4">
      {/* Dynamic Search */}
      <div className="px-margin @md:px-0 pt-space-xs pb-space-sm">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            className="w-full h-11 pl-10 pr-10 bg-surface-container-low rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all"
            placeholder="Cari no. pesanan atau nama produk..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="material-symbols-outlined absolute right-3 text-outline text-[18px] hover:text-primary transition-colors"
            >
              close
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setActiveTab('Semua');
                onShowToast('Menampilkan seluruh riwayat pesanan');
              }}
              className="material-symbols-outlined absolute right-3 text-secondary text-[20px] hover:text-primary transition-colors"
            >
              tune
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Scroll Filter Chips */}
      <div className="w-full overflow-x-auto no-scrollbar py-space-xs px-margin @md:px-0 mb-space-sm">
        <div className="flex items-center gap-space-xs whitespace-nowrap min-w-max">
          {statusTabs.map((tab) => {
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content List Section */}
      <div className="px-margin @md:px-0 flex flex-col gap-space-md">
        {filteredOrders.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col items-center text-center gap-2 my-2">
            <span className="material-symbols-outlined text-outline text-[36px]">receipt_long</span>
            <h3 className="font-title-md text-title-md text-primary">
              Belum Ada Pesanan di Status Ini
            </h3>
            <p className="font-body-sm text-body-sm text-outline">
              Ketuk tab &quot;Semua&quot; untuk melihat seluruh pesanan Anda atau mulai belanja dari
              Keranjang.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('Semua')}
              className="mt-2 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md"
            >
              Lihat Semua Pesanan ({orders.length})
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 @lg:grid-cols-2 gap-space-md @lg:gap-5">
          {filteredOrders.map((order) => {
            const totalItemsCount = order.items.reduce((acc, i) => acc + i.quantity, 0);
            const firstItem = order.items[0];
            const extraItemsCount = order.items.length - 1;

            return (
              <div
                key={order.id}
                className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md"
              >
                {/* Store Header */}
                <div className="p-space-md bg-surface-container-low flex items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        order.status === 'Dikirim'
                          ? 'bg-secondary-fixed text-secondary'
                          : order.status === 'Selesai'
                          ? 'bg-surface-variant text-primary'
                          : 'bg-primary-fixed text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {order.status === 'Dikirim'
                          ? 'local_shipping'
                          : order.status === 'Selesai'
                          ? 'verified'
                          : 'storefront'}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-title-sm text-title-sm text-on-surface truncate">
                        {order.storeName}
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">
                        {order.dateStr}
                      </span>
                    </div>
                  </div>
                  {renderStatusBadge(order.status)}
                </div>

                {/* Order ID or Shipping Resi Banner */}
                {order.status === 'Dikirim' ? (
                  <div className="px-space-md py-2 bg-secondary-container/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">
                      directions_transit
                    </span>
                    <p className="font-body-sm text-body-sm text-on-secondary-container truncate">
                      <span className="font-semibold">
                        {order.courierName} ({order.resiNumber}):
                      </span>{' '}
                      {order.etaText}
                    </p>
                  </div>
                ) : (
                  <div className="px-space-md py-1.5 bg-surface-container-high/40 flex items-center justify-between text-outline">
                    <span className="font-body-sm text-body-sm font-medium">
                      No. Pesanan: {order.orderNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(order.orderNumber);
                        setCopiedId(order.id);
                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                      className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5 hover:underline"
                    >
                      <span>{copiedId === order.id ? 'Tersalin!' : 'Salin'}</span>
                      <span className="material-symbols-outlined text-[14px]">
                        {copiedId === order.id ? 'done' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                )}

                {/* Product Details */}
                <div
                  onClick={() => onSelectOrder(order, 'detail-pesanan')}
                  className="p-space-md flex flex-col gap-space-sm cursor-pointer"
                >
                  <div className="flex gap-space-md">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0 relative">
                      <SafeImage
                        className="w-full h-full object-cover"
                        src={firstItem.image}
                        alt={firstItem.title}
                      />
                      <span className="absolute bottom-1 left-1 bg-surface-container-lowest/90 px-1 py-0.5 rounded font-label-sm text-[9px] text-primary">
                        {firstItem.origin}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <h4 className="font-title-sm text-title-sm text-on-surface line-clamp-2">
                          {firstItem.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                          <span className="bg-surface-container px-2 py-0.5 rounded-md font-body-sm text-body-sm text-on-surface-variant">
                            {firstItem.variant}
                          </span>
                          {extraItemsCount > 0 && (
                            <span className="font-label-sm text-[10px] text-secondary bg-secondary-fixed/50 px-1.5 py-0.5 rounded">
                              +{extraItemsCount} produk lainnya
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {totalItemsCount} barang
                        </span>
                        <span className="font-currency-display text-currency-display text-primary">
                          {formatRp(firstItem.price * firstItem.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Breakdown */}
                <div className="px-space-md py-space-sm bg-surface-container-low/60 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-outline">
                    Total Pesanan (termasuk ongkir):
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    {formatRp(order.totalPayment)}
                  </span>
                </div>

                {/* Dynamic Action Buttons Based on Status */}
                <div className="p-space-md flex items-center gap-space-sm justify-end bg-surface-container-lowest flex-wrap">
                  {order.status === 'Menunggu Pembayaran' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(order.id, 'Dibatalkan')}
                        className="px-3.5 py-2 rounded-xl bg-surface-container-low text-error font-label-md text-label-md hover:bg-error-container/30 active:scale-95 transition-all"
                      >
                        Batalkan
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectOrder(order, 'pembayaran-va')}
                        className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">payments</span>
                        <span>Bayar Sekarang</span>
                      </button>
                    </>
                  )}

                  {order.status === 'Diproses' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(order.id, 'Dikirim')}
                        className="px-3.5 py-2 rounded-xl bg-surface-container-low text-secondary font-label-md text-label-md flex items-center gap-1 hover:bg-surface-container active:scale-95 transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          local_shipping
                        </span>
                        <span>Simulasi Kirim</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectOrder(order, 'detail-pesanan')}
                        className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container active:scale-95 transition-all"
                      >
                        Detail Pesanan
                      </button>
                    </>
                  )}

                  {order.status === 'Dikirim' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(order.id, 'Selesai')}
                        className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-label-md text-label-md hover:bg-emerald-100 active:scale-95 transition-all flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>Pesanan Diterima</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectOrder(order, 'detail-pesanan')}
                        className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          location_searching
                        </span>
                        <span>Lacak Pengiriman</span>
                      </button>
                    </>
                  )}

                  {order.status === 'Selesai' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onReviewOrder(order.id)}
                        className={`px-4 py-2 rounded-xl font-label-md text-label-md flex items-center gap-1 active:scale-95 transition-all ${
                          order.reviewed
                            ? 'bg-surface-container text-secondary'
                            : 'bg-tertiary-fixed text-on-tertiary-fixed-variant hover:bg-tertiary-fixed-dim'
                        }`}
                      >
                        <span>{order.reviewed ? 'Ulasan Terkirim ★5.0' : 'Beri Ulasan'}</span>
                        <span
                          className="material-symbols-outlined text-[16px] text-on-tertiary-container"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onReorder(order)}
                        className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">sync</span>
                        <span>Beli Lagi</span>
                      </button>
                    </>
                  )}

                  {order.status === 'Dibatalkan' && (
                    <button
                      type="button"
                      onClick={() => onReorder(order)}
                      className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">sync</span>
                      <span>Beli Lagi</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-space-lg mx-margin @md:mx-0 p-space-md rounded-2xl bg-surface-container-low flex items-center gap-space-md">
        <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center text-on-secondary-container shrink-0">
          <span className="material-symbols-outlined text-[20px]">inventory_2</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-title-sm text-title-sm text-on-surface">
            Menampilkan {filteredOrders.length} dari {orders.length} pesanan
          </span>
          <span className="font-body-sm text-body-sm text-outline">
            Status transaksi selalu sinkron otomatis dengan Keranjang &amp; Profil.
          </span>
        </div>
      </div>
    </div>
  );
};

interface DetailPesananScreenProps {
  activeOrder: Order;
  onUpdateOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const DetailPesananScreen: React.FC<DetailPesananScreenProps> = ({
  activeOrder,
  onUpdateOrderStatus,
  onNavigate,
  onShowToast,
}) => {
  const [copiedResi, setCopiedResi] = useState(false);

  const stageMeta = useMemo(() => {
    switch (activeOrder.status) {
      case 'Menunggu Pembayaran':
        return {
          step: 1,
          badge: 'Tahap 1 dari 4',
          title: 'Menunggu Pembayaran VA',
          desc: `Silakan selesaikan pembayaran sebesar ${formatRp(
            activeOrder.totalPayment
          )} agar pesanan segera diproses oleh ${activeOrder.storeName}.`,
          icon: 'payments',
          nextLabel: 'Bayar Virtual Account Sekarang',
          nextAction: () => onNavigate('pembayaran-va'),
        };
      case 'Diproses':
        return {
          step: 2,
          badge: 'Tahap 2 dari 4',
          title: 'Pesanan Sedang Dipersiapkan',
          desc: `Pengrajin ${activeOrder.storeName} sedang mengemas produk pesanan Anda dengan aman.`,
          icon: 'package_2',
          nextLabel: 'Simulasi Kurir Jemput & Kirim Paket →',
          nextAction: () => onUpdateOrderStatus(activeOrder.id, 'Dikirim'),
        };
      case 'Dikirim':
        return {
          step: 3,
          badge: 'Tahap 3 dari 4',
          title: 'Pesanan Dalam Pengiriman',
          desc: `Kurir ${activeOrder.courierName} sedang mengantar paket kriya Anda menuju ${activeOrder.address.shortLabel}.`,
          icon: 'local_shipping',
          nextLabel: 'Konfirmasi Pesanan Diterima (Selesai) ✓',
          nextAction: () => onUpdateOrderStatus(activeOrder.id, 'Selesai'),
        };
      case 'Selesai':
        return {
          step: 4,
          badge: 'Tahap 4 dari 4',
          title: 'Pesanan Selesai Diterima',
          desc: `Paket telah diterima oleh ${activeOrder.address.recipient}. Terima kasih telah mendukung UMKM lokal!`,
          icon: 'verified',
          nextLabel: null,
          nextAction: undefined,
        };
      case 'Dibatalkan':
        return {
          step: 0,
          badge: 'Dibatalkan',
          title: 'Pesanan Telah Dibatalkan',
          desc: 'Pesanan ini telah dibatalkan atas permintaan pembeli.',
          icon: 'cancel',
          nextLabel: null,
          nextAction: undefined,
        };
    }
  }, [activeOrder, onNavigate, onUpdateOrderStatus]);

  const totalItemsQty = activeOrder.items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-margin @md:px-6 @lg:px-8 pb-space-xl pt-2 @md:pt-5">
      <div className="flex flex-col @lg:grid @lg:grid-cols-12 gap-space-md @lg:gap-6 @lg:items-start">
      <div className="@lg:col-span-7 flex flex-col gap-space-md">
      {/* Status Header Card */}
      <div className="w-full rounded-xl bg-gradient-to-br from-primary via-primary-container to-secondary p-space-lg text-on-primary shadow-sm relative overflow-hidden">
        <div className="absolute -right-4 -bottom-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none"></div>
        <div className="absolute right-8 top-2 w-16 h-16 rounded-full bg-secondary-container/10 pointer-events-none"></div>
        <div className="flex items-start gap-space-md relative z-10">
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 text-secondary-fixed">
            <span
              className="material-symbols-outlined text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {stageMeta.icon}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-space-xs px-2 py-0.5 rounded-full bg-secondary-fixed/20 text-secondary-fixed text-label-sm font-label-sm mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
              {stageMeta.badge}
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-primary leading-snug">
              {stageMeta.title}
            </h2>
            <p className="font-body-sm text-body-sm text-surface-variant/90 mt-1 leading-relaxed">
              {stageMeta.desc}
            </p>
          </div>
        </div>

        {/* 4-Step Progress Bar */}
        <div className="mt-space-md pt-space-sm flex items-center justify-between gap-1 relative z-10">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`flex-1 h-1.5 rounded-full ${
                num <= stageMeta.step
                  ? num === stageMeta.step && stageMeta.step < 4
                    ? 'bg-secondary-fixed animate-pulse'
                    : 'bg-secondary-fixed'
                  : 'bg-white/20'
              }`}
            ></div>
          ))}
        </div>

        {/* Interactive Status Advancement Button */}
        {stageMeta.nextLabel && stageMeta.nextAction && (
          <button
            type="button"
            onClick={stageMeta.nextAction}
            className="mt-3 w-full py-2 px-3 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-1 relative z-10"
          >
            <span>{stageMeta.nextLabel}</span>
          </button>
        )}
      </div>

      {/* Info Pelacakan Pengiriman */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <h3 className="font-title-md text-title-md text-on-surface">Informasi Pengiriman</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-secondary text-label-sm font-label-sm">
            {activeOrder.shippingService}
          </span>
        </div>

        <div className="bg-surface-container-low rounded-lg p-space-md mb-space-md">
          <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
            <span>{activeOrder.courierName}</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(activeOrder.resiNumber);
                setCopiedResi(true);
                onShowToast(`Nomor resi ${activeOrder.resiNumber} disalin!`);
                setTimeout(() => setCopiedResi(false), 2000);
              }}
              className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-primary transition-colors active:scale-95"
            >
              <span>{activeOrder.resiNumber}</span>
              <span className="material-symbols-outlined text-[16px]">
                {copiedResi ? 'check' : 'content_copy'}
              </span>
            </button>
          </div>
          <div className="text-label-sm font-label-sm text-outline">{activeOrder.etaText}</div>
        </div>

        <div className="relative pl-6 space-y-3">
          <div className="absolute left-2.5 top-1.5 bottom-1.5 w-0.5 bg-surface-container-highest"></div>
          {activeOrder.trackingSteps.map((step, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col ${idx === 0 ? '' : 'opacity-60'}`}
            >
              <div
                className={`absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full ${
                  idx === 0
                    ? 'bg-secondary ring-4 ring-secondary-container/40'
                    : 'bg-outline-variant'
                }`}
              ></div>
              <p
                className={`${
                  idx === 0
                    ? 'font-label-md text-label-md text-on-surface'
                    : 'font-body-sm text-body-sm text-on-surface'
                }`}
              >
                {step.title}
              </p>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {step.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alamat Penerima */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
        <div className="flex items-center gap-space-sm mb-space-md">
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">location_on</span>
          </div>
          <h3 className="font-title-md text-title-md text-on-surface">Alamat Penerima</h3>
        </div>
        <div className="space-y-1.5 pl-10">
          <div className="flex items-center gap-2">
            <span className="font-title-sm text-title-sm text-on-surface">
              {activeOrder.address.recipient}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {activeOrder.address.phoneOrSub}
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {activeOrder.address.fullAddress}
          </p>
          <div className="inline-flex items-center gap-1 pt-1 text-label-sm font-label-sm text-outline">
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>Alamat Utama {activeOrder.address.label}</span>
          </div>
        </div>
      </div>
      </div>

      <div className="@lg:col-span-5 flex flex-col gap-space-md">
      {/* Rincian Produk Dipesan */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
        <div
          onClick={() => onNavigate('kategori')}
          className="flex items-center justify-between pb-space-xs cursor-pointer"
        >
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </div>
            <div>
              <h4 className="font-title-sm text-title-sm text-on-surface">
                {activeOrder.storeName}
              </h4>
              <span className="font-body-sm text-body-sm text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-tertiary">
                  verified
                </span>{' '}
                Mitra Kriya Terkurasi
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
        </div>

        {activeOrder.items.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate('detail-produk')}
            className="flex items-start gap-space-md bg-surface-container-low/60 rounded-xl p-space-md cursor-pointer"
          >
            <SafeImage
              className="w-18 h-18 rounded-lg object-cover bg-surface-container shrink-0"
              src={item.image}
              alt={item.title}
              style={{ width: 72, height: 72 }}
            />
            <div className="flex-1 min-w-0">
              <h5 className="font-body-md text-body-md text-on-surface line-clamp-2 leading-tight">
                {item.title}
              </h5>
              <div className="mt-1 inline-block px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                Varian: {item.variant}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {item.quantity}x
                </span>
                <span className="font-currency-display text-currency-display text-primary">
                  {formatRp(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-space-xs flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
          <span>
            No. Pesanan: <strong className="text-on-surface">{activeOrder.orderNumber}</strong>
          </span>
          <span className="text-label-sm font-label-sm text-outline">{activeOrder.dateStr}</span>
        </div>
      </div>

      {/* Rincian Pembayaran */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </div>
            <h3 className="font-title-md text-title-md text-on-surface">Rincian Pembayaran</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
            {activeOrder.status === 'Menunggu Pembayaran' ? 'Belum Lunas' : 'Lunas'}
          </span>
        </div>

        <div className="flex items-center justify-between py-1 text-body-sm font-body-sm text-on-surface-variant">
          <span>Metode Pembayaran</span>
          <span className="font-title-sm text-title-sm text-on-surface text-right">
            {activeOrder.paymentMethod}
          </span>
        </div>
        <div className="h-px bg-surface-container-high my-1"></div>

        <div className="space-y-2 text-body-sm font-body-sm text-on-surface-variant">
          <div className="flex justify-between items-center">
            <span>Subtotal Produk ({totalItemsQty} barang)</span>
            <span className="text-on-surface">{formatRp(activeOrder.subtotal)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Biaya Pengiriman</span>
            <span className="text-on-surface">{formatRp(activeOrder.shippingFee)}</span>
          </div>
          {activeOrder.shippingDiscount > 0 && (
            <div className="flex justify-between items-center text-secondary">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">local_offer</span> Diskon
                Ongkos Kirim
              </span>
              <span className="font-label-md text-label-md">
                -{formatRp(activeOrder.shippingDiscount)}
              </span>
            </div>
          )}
          {activeOrder.voucherDiscount > 0 && (
            <div className="flex justify-between items-center text-on-tertiary-container">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">redeem</span> Voucher Diskon
                LokaMart
              </span>
              <span className="font-label-md text-label-md">
                -{formatRp(activeOrder.voucherDiscount)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span>Biaya Layanan</span>
            <span className="text-on-surface">{formatRp(activeOrder.serviceFee)}</span>
          </div>
        </div>

        <div className="h-px bg-surface-container-high my-2"></div>
        <div className="flex justify-between items-center pt-1">
          <div>
            <span className="font-title-md text-title-md text-on-surface">Total Pembayaran</span>
            <p className="font-label-sm text-label-sm text-outline">Sudah termasuk PPN</p>
          </div>
          <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
            {formatRp(activeOrder.totalPayment)}
          </span>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="w-full pt-space-xs space-y-space-sm pb-space-md">
        <div className="grid grid-cols-2 gap-space-md">
          <button
            type="button"
            onClick={() => onShowToast(`Membuka ruang pesan dengan ${activeOrder.storeName}...`)}
            className="h-12 w-full rounded-xl bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-container-low active:bg-surface-container transition-all flex items-center justify-center gap-2 font-label-lg text-label-lg"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">chat</span>
            <span>Chat Penjual</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('pesanan')}
            className="h-12 w-full rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-label-lg text-label-lg"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              receipt_long
            </span>
            <span>Daftar Pesanan</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full py-2.5 text-center font-label-md text-label-md text-outline hover:text-primary transition-colors flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">keyboard_arrow_up</span>
          <span>Kembali ke atas</span>
        </button>
      </div>
      </div>
      </div>
    </div>
  );
};

interface ProfilScreenProps {
  userProfile?: UserProfile;
  orders: Order[];
  cartCount: number;
  addressCount: number;
  selectedAddressShort: string;
  onOpenOrdersWithTab: (tab: string) => void;
  onSelectOrder: (order: Order, targetScreen: ScreenId) => void;
  onUpdateProfile?: (updated: UserProfile) => void;
  onLogout?: () => void;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const ProfilScreen: React.FC<ProfilScreenProps> = ({
  userProfile = DEFAULT_USER_PROFILE,
  orders,
  cartCount,
  addressCount,
  selectedAddressShort,
  onOpenOrdersWithTab,
  onSelectOrder,
  onUpdateProfile,
  onLogout,
  onNavigate,
  onShowToast,
}) => {
  const [lokaPayBalance, setLokaPayBalance] = useState(150000);
  const [koinKriya, setKoinKriya] = useState(1250);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editName, setEditName] = useState(userProfile.name || DEFAULT_USER_PROFILE.name);
  const [editEmail, setEditEmail] = useState(userProfile.email || DEFAULT_USER_PROFILE.email);
  const [editPhone, setEditPhone] = useState(userProfile.phone || DEFAULT_USER_PROFILE.phone);
  const [editStudentId, setEditStudentId] = useState(
    userProfile.nim || userProfile.studentId || DEFAULT_USER_PROFILE.nim || '41220089'
  );

  useEffect(() => {
    setEditName(userProfile.name || DEFAULT_USER_PROFILE.name);
    setEditEmail(userProfile.email || DEFAULT_USER_PROFILE.email);
    setEditPhone(userProfile.phone || DEFAULT_USER_PROFILE.phone);
    setEditStudentId(
      userProfile.nim || userProfile.studentId || DEFAULT_USER_PROFILE.nim || '41220089'
    );
  }, [userProfile]);

  const fajarAvatar =
    userProfile.avatarUrl || DEFAULT_USER_PROFILE.avatarUrl || DEFAULT_AVATAR_URL;
  const displayTier = (
    userProfile.memberLevel ||
    userProfile.memberTier ||
    'Member Perak'
  )
    .split('•')[0]
    .trim();
  const displayProdi = userProfile.prodi || userProfile.program || 'RPL';
  const displayNim = userProfile.nim || userProfile.studentId || '41220089';

  const belumBayarCount = orders.filter((o) => o.status === 'Menunggu Pembayaran').length;
  const diprosesCount = orders.filter((o) => o.status === 'Diproses').length;
  const dikirimCount = orders.filter((o) => o.status === 'Dikirim').length;
  const beriNilaiCount = orders.filter((o) => o.status === 'Selesai' && !o.reviewed).length;

  const ongoingOrder =
    orders.find((o) => o.status === 'Dikirim' || o.status === 'Diproses') || orders[0];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      <div className="px-margin @md:px-6 @lg:px-8 pt-space-sm @md:pt-6 pb-space-lg flex flex-col @lg:grid @lg:grid-cols-12 gap-space-lg @lg:gap-6 @lg:items-start">
        <div className="@lg:col-span-5 flex flex-col gap-space-lg">
        {/* User Profile Header Card */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-secondary-fixed/30 pointer-events-none blur-xl"></div>
          <div className="absolute right-12 bottom-0 w-16 h-16 rounded-full bg-tertiary-fixed/20 pointer-events-none blur-lg"></div>
          <div className="flex items-center gap-space-md z-10">
            <div className="relative shrink-0">
              <SafeImage
                className="w-16 h-16 rounded-full object-cover shadow-sm bg-surface-container"
                src={fajarAvatar}
                alt="Fajar Pratama"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-space-xs">
                <h2 className="font-title-lg text-title-lg text-primary truncate">
                  {userProfile.name}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(true)}
                  className="px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm flex items-center gap-1 active:bg-surface-variant transition-colors shrink-0"
                >
                  <span className="material-symbols-outlined text-[13px]">edit</span>
                  <span>Ubah</span>
                </button>
              </div>
              <div className="mt-0.5 flex items-center gap-1 flex-wrap">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-bold">
                  <span
                    className="material-symbols-outlined text-[12px] mr-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                  {displayTier}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] font-semibold">
                  {displayProdi.includes('RPL') ? 'RPL' : displayProdi} •{' '}
                  {userProfile.campus || 'STMIK IKMI Cirebon'}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 truncate">
                {userProfile.email}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {userProfile.phone} • NIM/ID: {displayNim}
              </p>
            </div>
          </div>

          <div className="z-10 bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                verified_user
              </span>
              <span className="font-label-sm text-label-sm text-on-surface truncate">
                Kriya Nusantara Level Perak
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-bold shrink-0">
              {koinKriya.toLocaleString('id-ID')} / 2.000 XP
            </span>
          </div>
        </div>

        {/* Saldo, Koin & Voucher Horizontal Quick Banner */}
        <div className="grid grid-cols-3 gap-gutter">
          {/* LokaPay */}
          <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[16px]">
                account_balance_wallet
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">LokaPay</span>
            </div>
            <div className="my-1.5">
              <div className="font-label-sm text-[11px] text-outline">Saldo</div>
              <div className="font-title-sm text-title-sm text-primary font-bold truncate">
                {formatRp(lokaPayBalance)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setLokaPayBalance((prev) => prev + 50000);
                onShowToast('Top-up Sandbox +Rp 50.000 berhasil masuk ke LokaPay!');
              }}
              className="w-full py-1 rounded bg-primary-container text-on-primary font-label-sm text-[11px] flex items-center justify-center gap-0.5 active:opacity-90"
            >
              <span className="material-symbols-outlined text-[13px]">add_circle</span>
              <span>Isi Ulang</span>
            </button>
          </div>

          {/* Poin Nusantara */}
          <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-on-tertiary-container text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                monetization_on
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Poin</span>
            </div>
            <div className="my-1.5">
              <div className="font-label-sm text-[11px] text-outline">Koin Kriya</div>
              <div className="font-title-sm text-title-sm text-tertiary font-bold truncate">
                {koinKriya.toLocaleString('id-ID')}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setKoinKriya((prev) => prev + 100);
                onShowToast('+100 Koin Kriya berhasil diklaim!');
              }}
              className="w-full py-1 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-[11px] flex items-center justify-center gap-0.5 active:opacity-90"
            >
              <span className="material-symbols-outlined text-[13px]">sync_alt</span>
              <span>Tukar</span>
            </button>
          </div>

          {/* Voucher Saya */}
          <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[16px]">
                local_activity
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Voucher</span>
            </div>
            <div className="my-1.5">
              <div className="font-label-sm text-[11px] text-outline">Tersedia</div>
              <div className="font-title-sm text-title-sm text-secondary font-bold truncate">
                4 Kupon
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onShowToast('Membuka Keranjang dengan Voucher Kriya aktif');
                onNavigate('keranjang');
              }}
              className="w-full py-1 rounded bg-surface-container text-on-surface font-label-sm text-[11px] flex items-center justify-center gap-0.5 active:bg-surface-variant"
            >
              <span className="material-symbols-outlined text-[13px]">redeem</span>
              <span>Klaim</span>
            </button>
          </div>
        </div>
        </div>

        <div className="@lg:col-span-7 flex flex-col gap-space-lg">
        {/* Shortcut Pesanan Saya Card */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <h3 className="font-title-md text-title-md text-primary font-bold">Pesanan Saya</h3>
            <button
              type="button"
              onClick={() => onOpenOrdersWithTab('Semua')}
              className="font-label-sm text-label-sm text-secondary flex items-center hover:underline"
            >
              <span>Riwayat Pesanan ({orders.length})</span>
              <span className="material-symbols-outlined text-[15px]">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-space-xs pt-1">
            <button
              type="button"
              onClick={() => onOpenOrdersWithTab('Menunggu Pembayaran')}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform group"
            >
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary relative">
                <span className="material-symbols-outlined text-[24px]">payments</span>
                {belumBayarCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-[10px] flex items-center justify-center font-bold shadow-sm">
                    {belumBayarCount}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center leading-tight">
                Belum Bayar
              </span>
            </button>

            <button
              type="button"
              onClick={() => onOpenOrdersWithTab('Diproses (Aktif)')}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-primary-container relative">
                <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                {diprosesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-[10px] flex items-center justify-center font-bold shadow-sm">
                    {diprosesCount}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center leading-tight">
                Diproses
              </span>
            </button>

            <button
              type="button"
              onClick={() => onOpenOrdersWithTab('Dikirim')}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-primary-container relative">
                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                {dikirimCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-[10px] flex items-center justify-center font-bold shadow-sm">
                    {dikirimCount}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center leading-tight">
                Dikirim
              </span>
            </button>

            <button
              type="button"
              onClick={() => onOpenOrdersWithTab('Selesai')}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-primary-container relative">
                <span className="material-symbols-outlined text-[24px]">rate_review</span>
                {beriNilaiCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-[10px] flex items-center justify-center font-bold shadow-sm">
                    {beriNilaiCount}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center leading-tight">
                Beri Nilai
              </span>
            </button>
          </div>

          {ongoingOrder && (
            <div
              onClick={() => onSelectOrder(ongoingOrder, 'detail-pesanan')}
              className="mt-1 bg-surface-container-low rounded-lg p-space-sm flex items-center gap-space-sm cursor-pointer hover:bg-surface-container transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[18px]">near_me</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] text-primary font-bold truncate">
                    {ongoingOrder.items[0]?.title || 'Batik Megamendung Silk'}
                  </span>
                  <span className="font-label-sm text-[10px] text-secondary font-bold shrink-0 ml-1">
                    {ongoingOrder.status === 'Dikirim' ? 'Dalam Perjalanan' : ongoingOrder.status}
                  </span>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                  {ongoingOrder.trackingSteps[0]?.title ||
                    'Kurir LokaExpress sedang menuju Cirebon Timur'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Menu Akun & Pengaturan */}
        <div className="flex flex-col gap-space-xs">
          <div className="px-space-xs">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              Pengaturan Akun &amp; Layanan
            </span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
            {/* Item 1: Daftar Alamat */}
            <button
              type="button"
              onClick={() => onNavigate('alamat')}
              className="px-space-lg py-3.5 flex items-center justify-between hover:bg-surface-container-low active:bg-surface-container transition-colors text-left"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    Daftar Alamat Pengiriman
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {selectedAddressShort} • {addressCount} Alamat Tersimpan
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </div>
            </button>
            <div className="h-[1px] bg-surface-container mx-space-lg"></div>

            {/* Item 2: Keranjang Belanja Tersimpan */}
            <button
              type="button"
              onClick={() => onNavigate('keranjang')}
              className="px-space-lg py-3.5 flex items-center justify-between hover:bg-surface-container-low active:bg-surface-container transition-colors text-left"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    Keranjang Belanja Tersimpan
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Kriya bambu, tas tenun &amp; batik
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-primary font-label-sm text-[11px] font-bold">
                  {cartCount} Produk
                </span>
                <span className="material-symbols-outlined text-[20px] text-outline">
                  chevron_right
                </span>
              </div>
            </button>
            <div className="h-[1px] bg-surface-container mx-space-lg"></div>

            {/* Item 3: Toko & Pengrajin Favorit */}
            <button
              type="button"
              onClick={() => {
                onShowToast('Menampilkan 8 Sanggar UMKM yang Anda ikuti');
                onNavigate('kategori');
              }}
              className="px-space-lg py-3.5 flex items-center justify-between hover:bg-surface-container-low active:bg-surface-container transition-colors text-left"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    storefront
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    Toko &amp; Pengrajin Favorit
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    8 Sanggar UMKM Diikuti
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </div>
            </button>
            <div className="h-[1px] bg-surface-container mx-space-lg"></div>

            {/* Item 4: Keamanan & PIN LokaPay */}
            <button
              type="button"
              onClick={() => setShowEditProfileModal(true)}
              className="px-space-lg py-3.5 flex items-center justify-between hover:bg-surface-container-low active:bg-surface-container transition-colors text-left"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    Edit Profil &amp; Keamanan Akun
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Ubah nama, email, nomor HP &amp; NIM ({displayNim})
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </div>
            </button>
            <div className="h-[1px] bg-surface-container mx-space-lg"></div>

            {/* Item 4b: Daftar Akun Baru / Ganti Akun */}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="px-space-lg py-3.5 flex items-center justify-between hover:bg-surface-container-low active:bg-surface-container transition-colors text-left"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed/60 flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    Registrasi Akun Baru
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Buat akun member baru atau masuk dengan akun lain
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </div>
            </button>
            <div className="h-[1px] bg-surface-container mx-space-lg"></div>

            {/* Item 5: Pusat Bantuan & Layanan Kampus */}
            <button
              type="button"
              onClick={() =>
                onShowToast('Pusat Bantuan LokaMart • Mahasiswa RPL STMIK IKMI Cirebon')
              }
              className="px-space-lg py-3.5 flex items-center justify-between hover:bg-surface-container-low active:bg-surface-container transition-colors text-left"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    Pusat Bantuan &amp; Layanan Kampus
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    FAQ, Live Chat Pengurus, Komplain
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </div>
            </button>
            <div className="h-[1px] bg-surface-container mx-space-lg"></div>

            {/* Item 6: Tentang Proyek LokaMart */}
            <button
              type="button"
              onClick={() => {
                setShowProjectModal(true);
                onShowToast(
                  'LokaMart v1.0.0 — Karya Mahasiswa RPL (Rekayasa Perangkat Lunak) STMIK IKMI CIREBON'
                );
              }}
              className="px-space-lg py-3.5 flex items-center justify-between hover:bg-surface-container-low active:bg-surface-container transition-colors text-left"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">info</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    Tentang Proyek LokaMart
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Karya Mahasiswa RPL • STMIK IKMI CIREBON
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </div>
            </button>
          </div>
        </div>

        {/* Log Out & Switch Account Buttons */}
        <div className="pt-space-xs flex flex-col gap-space-md">
          <div className="grid grid-cols-2 gap-space-sm">
            <button
              type="button"
              onClick={() => {
                if (onLogout) {
                  onLogout();
                } else {
                  onNavigate('login');
                }
              }}
              className="h-12 rounded-xl bg-error-container text-on-error-container font-label-lg text-label-lg flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span>Keluar Akun</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="h-12 rounded-xl bg-surface-container text-primary font-label-lg text-label-lg flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-[20px]">login</span>
              <span>Masuk / Ganti</span>
            </button>
          </div>

          <div className="text-center flex flex-col items-center gap-1 px-space-md pb-space-sm text-on-surface-variant">
            <p className="font-label-sm text-label-sm font-semibold text-outline">
              LokaMart v1.0.0 • Mahasiswa RPL (Rekayasa Perangkat Lunak)
            </p>
            <p className="font-body-sm text-[11px] text-outline font-medium">
              STMIK IKMI CIREBON
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[380px] bg-surface-container-lowest rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-title-md text-primary font-bold">
                Edit Profil Pengguna
              </h3>
              <button
                type="button"
                onClick={() => setShowEditProfileModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-space-sm">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Email Akun
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                    No. WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                    NIM / ID Member
                  </label>
                  <input
                    type="text"
                    value={editStudentId}
                    onChange={(e) => setEditStudentId(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowEditProfileModal(false)}
                className="flex-1 h-11 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onUpdateProfile) {
                    onUpdateProfile({
                      ...userProfile,
                      name: editName.trim() || userProfile.name,
                      email: editEmail.trim() || userProfile.email,
                      phone: editPhone.trim() || userProfile.phone,
                      nim: editStudentId.trim() || displayNim,
                      studentId: editStudentId.trim() || displayNim,
                    });
                  }
                  setShowEditProfileModal(false);
                  onShowToast('Profil pengguna berhasil diperbarui!');
                }}
                className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-label-md text-label-md"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tentang Proyek Mahasiswa RPL STMIK IKMI CIREBON */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-end @md:items-center justify-center pb-safe p-0 @md:p-4">
          <div className="w-full max-w-[440px] bg-surface-container-lowest rounded-t-2xl @md:rounded-2xl p-space-xl flex flex-col gap-space-md shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">school</span>
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-primary font-bold">
                    Tentang Proyek LokaMart
                  </h3>
                  <span className="font-label-sm text-label-sm text-secondary">
                    Versi 1.0.0 (Prototype E-Commerce UMKM)
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProjectModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-2 text-body-sm font-body-sm">
              <div className="flex justify-between items-center">
                <span className="text-outline">Pengembang</span>
                <span className="font-semibold text-on-surface text-right">
                  Mahasiswa RPL (Rekayasa Perangkat Lunak)
                </span>
              </div>
              <div className="h-px bg-surface-container"></div>
              <div className="flex justify-between items-center">
                <span className="text-outline">Perguruan Tinggi</span>
                <span className="font-bold text-primary text-right">STMIK IKMI CIREBON</span>
              </div>
              <div className="h-px bg-surface-container"></div>
              <div className="flex justify-between items-center">
                <span className="text-outline">Fokus Aplikasi</span>
                <span className="font-semibold text-on-surface text-right">
                  Marketplace Kriya &amp; UMKM Lokal Cirebon
                </span>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Aplikasi <strong>LokaMart</strong> dirancang oleh Mahasiswa Program Studi{' '}
              <strong>Rekayasa Perangkat Lunak (RPL) STMIK IKMI CIREBON</strong> untuk memfasilitasi
              pemasaran digital pengrajin batik, rotan, keramik, serta kuliner khas UMKM lokal.
            </p>

            <button
              type="button"
              onClick={() => setShowProjectModal(false)}
              className="w-full h-11 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-sm active:scale-95 transition-transform"
            >
              Tutup Informasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
