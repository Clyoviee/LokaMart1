/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  LoginScreen,
  RegisterScreen,
  RegisteredAccount,
  SplashScreen,
} from './components/AuthScreens';
import {
  BerandaScreen,
  DetailProdukScreen,
  KategoriScreen,
  PencarianScreen,
} from './components/CatalogScreens';
import {
  DetailPesananScreen,
  PembayaranBerhasilScreen,
  PesananScreen,
  ProfilScreen,
} from './components/OrderAndProfileScreens';
import {
  BottomGesturePill,
  BottomNav,
  DesktopFooter,
  TopHeader,
} from './components/ShellComponents';
import {
  AlamatScreen,
  CheckoutScreen,
  KeranjangScreen,
  PembayaranVAScreen,
} from './components/TransactionScreens';
import {
  AddressItem,
  CartItem,
  CategoryName,
  DEFAULT_USER_PROFILE,
  INITIAL_ADDRESSES,
  INITIAL_CART_ITEMS,
  INITIAL_ORDERS,
  Order,
  OrderStatus,
  Product,
  ScreenId,
  UserProfile,
} from './data';
import {
  removeCartItemFromFirestore,
  saveAddressToFirestore,
  saveCartItemToFirestore,
  saveOrderToFirestore,
  saveRegisteredAccountToFirestore,
  subscribeToAuthChanges,
  subscribeToUserFirestoreCollections,
  testConnection,
  updateOrderReviewInFirestore,
  updateOrderStatusInFirestore,
  upsertUserProfileInFirestore,
} from './firebase';

interface ScreenMeta {
  id: ScreenId;
  label: string;
  headerTitle: string;
  mode: 'tab' | 'stack';
  icon: string;
  subtitle: string;
}

const PUBLIC_SCREENS: ScreenId[] = ['splash', 'login', 'register'];

const ALL_SCREENS: ScreenMeta[] = [
  {
    id: 'splash',
    label: '1. Splashscreen',
    headerTitle: 'LokaMart Nusantara',
    mode: 'stack',
    icon: 'auto_awesome',
    subtitle: 'Layar Pembuka Aplikasi & Identitas RPL',
  },
  {
    id: 'login',
    label: '2. Masuk (Login)',
    headerTitle: 'Masuk Akun',
    mode: 'stack',
    icon: 'login',
    subtitle: 'Login Wajib Sebelum Masuk Beranda',
  },
  {
    id: 'register',
    label: '3. Daftar (Register)',
    headerTitle: 'Daftar Akun Baru',
    mode: 'stack',
    icon: 'person_add',
    subtitle: 'Daftar Akun → Lanjut ke Login',
  },
  {
    id: 'beranda',
    label: '4. Beranda',
    headerTitle: 'Beranda',
    mode: 'tab',
    icon: 'home',
    subtitle: 'Storefront, Flash Promo & Rekomendasi',
  },
  {
    id: 'kategori',
    label: '5. Kategori',
    headerTitle: 'Kategori',
    mode: 'tab',
    icon: 'category',
    subtitle: 'Katalog Kerajinan & Filter Produk',
  },
  {
    id: 'pencarian',
    label: '6. Pencarian',
    headerTitle: 'Kategori',
    mode: 'tab',
    icon: 'search',
    subtitle: 'Autocomplete, Riwayat & Hasil Cari',
  },
  {
    id: 'detail-produk',
    label: '7. Detail Produk',
    headerTitle: 'Detail Produk',
    mode: 'stack',
    icon: 'shopping_bag',
    subtitle: 'Galeri Kriya, Varian & Ulasan Pembeli',
  },
  {
    id: 'keranjang',
    label: '8. Keranjang',
    headerTitle: 'Keranjang',
    mode: 'tab',
    icon: 'shopping_cart',
    subtitle: 'Grup Toko, Kuantitas & Voucher Kriya',
  },
  {
    id: 'alamat',
    label: '9. Pilih Alamat',
    headerTitle: 'Pilih Alamat',
    mode: 'stack',
    icon: 'location_on',
    subtitle: 'Jangkauan Cirebon & Daftar Alamat',
  },
  {
    id: 'checkout',
    label: '10. Checkout',
    headerTitle: 'Checkout Pembayaran',
    mode: 'stack',
    icon: 'lock',
    subtitle: 'Opsi Pengiriman & Ringkasan Tagihan',
  },
  {
    id: 'pembayaran-va',
    label: '11. Bayar VA (Sandbox)',
    headerTitle: 'Pembayaran Virtual Account',
    mode: 'stack',
    icon: 'account_balance',
    subtitle: 'Simulasi BCA VA & Countdown Timer',
  },
  {
    id: 'pembayaran-berhasil',
    label: '12. Pembayaran Berhasil',
    headerTitle: 'Status Pembayaran',
    mode: 'stack',
    icon: 'check_circle',
    subtitle: 'Konfirmasi Lunas & Resi Otomatis',
  },
  {
    id: 'pesanan',
    label: '13. Pesanan',
    headerTitle: 'Pesanan',
    mode: 'tab',
    icon: 'receipt_long',
    subtitle: 'Daftar Transaksi Diproses, Dikirim & Selesai',
  },
  {
    id: 'detail-pesanan',
    label: '14. Rincian Pesanan',
    headerTitle: 'Rincian Pesanan',
    mode: 'stack',
    icon: 'local_shipping',
    subtitle: 'Status Tahap 1-4 & Lacak Resi',
  },
  {
    id: 'profil',
    label: '15. Profil',
    headerTitle: 'Profil',
    mode: 'tab',
    icon: 'account_circle',
    subtitle: 'Member Perak, LokaPay & Pengaturan',
  },
];

const DEFAULT_REGISTERED_ACCOUNTS: RegisteredAccount[] = [
  {
    ...DEFAULT_USER_PROFILE,
    password: 'password123',
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [history, setHistory] = useState<ScreenId[]>(['splash']);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [justRegisteredAccount, setJustRegisteredAccount] = useState<RegisteredAccount | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<CategoryName>('Semua');
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('Tas Anyaman');
  const [activeOrdersTab, setActiveOrdersTab] = useState<string>('Semua');

  const [registeredAccounts, setRegisteredAccounts] = useState<RegisteredAccount[]>(() => {
    try {
      const saved = localStorage.getItem('lokamart_accounts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((acc: RegisteredAccount) => ({
            ...DEFAULT_USER_PROFILE,
            ...acc,
            password: acc.password || 'password123',
          }));
        }
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_REGISTERED_ACCOUNTS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('lokamart_active_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_USER_PROFILE, ...parsed };
        }
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_USER_PROFILE;
  });

  useEffect(() => {
    try {
      localStorage.setItem('lokamart_accounts', JSON.stringify(registeredAccounts));
    } catch {
      // ignore
    }
  }, [registeredAccounts]);

  useEffect(() => {
    try {
      localStorage.setItem('lokamart_active_user', JSON.stringify(userProfile));
    } catch {
      // ignore
    }
  }, [userProfile]);

  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [voucherAmount, setVoucherAmount] = useState<number>(20000);
  const [checkoutMode, setCheckoutMode] = useState<'cart' | 'buy-now'>('cart');
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);

  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<AddressItem[]>(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<number>(1);
  const [shippingType, setShippingType] = useState<'reguler' | 'express'>('reguler');
  const [paymentBank, setPaymentBank] = useState<'BCA' | 'MANDIRI' | 'BRI' | 'LOKAPAY'>('BCA');

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeOrderId, setActiveOrderId] = useState<string>(INITIAL_ORDERS[0].id);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Firebase Auth & Cloud Firestore Live State
  const [firebaseUid, setFirebaseUid] = useState<string | null>(null);

  useEffect(() => {
    testConnection().catch(() => {});
  }, []);

  useEffect(() => {
    let unsubFirestore: (() => void) | null = null;
    const unsubAuth = subscribeToAuthChanges((user) => {
      if (user) {
        setFirebaseUid(user.uid);
        unsubFirestore = subscribeToUserFirestoreCollections(user.uid, () => {});
      } else {
        setFirebaseUid(null);
        if (unsubFirestore) {
          unsubFirestore();
          unsubFirestore = null;
        }
      }
    });
    return () => {
      unsubAuth();
      if (unsubFirestore) unsubFirestore();
    };
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<number | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMsg(null);
    }, 2400);
  };

  const navigateTo = (screen: ScreenId, bypassAuth = false) => {
    const isProtected = !PUBLIC_SCREENS.includes(screen);
    if (isProtected && !isAuthenticated && !bypassAuth) {
      setCurrentScreen('login');
      setHistory((prev) => [...prev, 'login']);
      triggerToast('Silakan Login terlebih dahulu untuk mengakses Beranda LokaMart!');
      return;
    }
    if (screen === 'splash') {
      setIsAuthenticated(false);
    }
    setCurrentScreen(screen);
    setHistory((prev) => [...prev, screen]);
  };

  const handleBack = () => {
    if (!isAuthenticated) {
      if (currentScreen === 'register') {
        setCurrentScreen('login');
      } else {
        setCurrentScreen('splash');
      }
      return;
    }
    if (history.length > 1) {
      const nextHistory = history.slice(0, -1);
      const prevScreen = nextHistory[nextHistory.length - 1];
      setHistory(nextHistory);
      if (!isAuthenticated && !PUBLIC_SCREENS.includes(prevScreen)) {
        setCurrentScreen('login');
      } else {
        setCurrentScreen(prevScreen);
      }
    } else {
      setCurrentScreen(isAuthenticated ? 'beranda' : 'login');
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentScreen]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('detail-produk');
  };

  const handleSelectCategory = (cat: CategoryName) => {
    setActiveCategoryFilter(cat);
    if (currentScreen !== 'kategori') {
      navigateTo('kategori');
    }
    triggerToast(`Menampilkan kategori: ${cat}`);
  };

  const handleOpenSearchWithQuery = (query: string) => {
    setActiveSearchQuery(query);
    navigateTo('pencarian');
  };

  const handleOpenOrdersWithTab = (tab: string) => {
    setActiveOrdersTab(tab);
    navigateTo('pesanan');
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id);
      triggerToast(exists ? 'Dihapus dari Wishlist' : 'Disimpan ke Wishlist Anda ❤️');
      return exists ? prev.filter((item) => item !== id) : [...prev, id];
    });
  };

  const handleAddToCart = (product: Product, variant: string, qty: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.variant === variant
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
          checked: true,
        };
        return updated;
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        productId: product.id,
        storeId: product.storeId || 'store-1',
        storeName: product.storeName || 'Galeri Kriya Troso',
        storeOrigin: product.origin || 'Kab. Jepara',
        title: product.title,
        variant,
        availableVariants: product.variants || [variant],
        price: product.price,
        originalPrice: product.originalPrice,
        discountPercent: product.discountPercent,
        badge: product.badge || 'Handmade',
        image: product.image,
        quantity: qty,
        checked: true,
      };
      return [newItem, ...prev];
    });
    if (firebaseUid) {
      saveCartItemToFirestore(firebaseUid, {
        id: `cart-${Date.now()}`,
        productId: product.id,
        storeId: product.storeId || 'store-1',
        storeName: product.storeName || 'Galeri Kriya Troso',
        storeOrigin: product.origin || 'Kab. Jepara',
        title: product.title,
        variant,
        availableVariants: product.variants || [variant],
        price: product.price,
        originalPrice: product.originalPrice,
        discountPercent: product.discountPercent,
        badge: product.badge || 'Handmade',
        image: product.image,
        quantity: qty,
        checked: true,
      }).catch(() => {});
    }
    triggerToast(`${qty}x ${product.title} (${variant}) masuk Keranjang!`);
  };

  const handleBuyNow = (product: Product, variant: string, qty: number) => {
    const tempItem: CartItem = {
      id: `buynow-${Date.now()}`,
      productId: product.id,
      storeId: product.storeId || 'store-1',
      storeName: product.storeName || 'Galeri Kriya Troso',
      storeOrigin: product.origin || 'Kab. Jepara',
      title: product.title,
      variant,
      availableVariants: product.variants || [variant],
      price: product.price,
      originalPrice: product.originalPrice,
      discountPercent: product.discountPercent,
      badge: product.badge || 'Handmade',
      image: product.image,
      quantity: qty,
      checked: true,
    };
    setBuyNowItem(tempItem);
    setCheckoutMode('buy-now');
    triggerToast(`Menyiapkan checkout: ${qty}x ${variant}`);
    navigateTo('checkout');
  };

  const handleProceedToCheckoutFromCart = () => {
    setCheckoutMode('cart');
    navigateTo('checkout');
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleCycleCartVariant = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const vars = item.availableVariants?.length
          ? item.availableVariants
          : ['Tenun Hitam Navy', 'Tenun Etnik Merah Bata', 'Tenun Cokelat Tanah'];
        const nextVar = vars[(vars.indexOf(item.variant) + 1) % vars.length];
        triggerToast(`Varian diubah ke: ${nextVar}`);
        return { ...item, variant: nextVar };
      })
    );
  };

  const handleToggleCartCheck = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleToggleStoreCheck = (storeId: string, checked: boolean) => {
    setCartItems((prev) =>
      prev.map((item) => (item.storeId === storeId ? { ...item, checked } : item))
    );
  };

  const handleToggleAllCheck = (checked: boolean) => {
    setCartItems((prev) => prev.map((item) => ({ ...item, checked })));
  };

  const handleDeleteCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    if (firebaseUid) {
      removeCartItemFromFirestore(firebaseUid, id).catch(() => {});
    }
    triggerToast('Barang dihapus dari keranjang');
  };

  const handleSetMainAddress = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isMain: addr.id === id,
      }))
    );
    setSelectedAddressId(id);
  };

  const handleAddAddress = (newAddr: Omit<AddressItem, 'id' | 'isMain'>) => {
    const newId = Date.now();
    const createdAddr: AddressItem = {
      ...newAddr,
      id: newId,
      isMain: true,
    };
    setAddresses((prev) => [
      ...prev.map((a) => ({ ...a, isMain: false })),
      createdAddr,
    ]);
    setSelectedAddressId(newId);
    if (firebaseUid) {
      saveAddressToFirestore(firebaseUid, createdAddr).catch(() => {});
    }
  };

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const activeCheckoutItems = useMemo(() => {
    if (checkoutMode === 'buy-now' && buyNowItem) {
      return [buyNowItem];
    }
    const checked = cartItems.filter((c) => c.checked);
    return checked.length > 0 ? checked : cartItems;
  }, [checkoutMode, buyNowItem, cartItems]);

  const handlePlaceOrder = () => {
    if (activeCheckoutItems.length === 0) {
      triggerToast('Tidak ada produk untuk dipesan');
      return;
    }

    const subtotal = activeCheckoutItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shippingFee = shippingType === 'express' ? 26000 : 14000;
    const shippingDiscount = 14000;
    const effectiveVoucher = Math.min(voucherAmount, subtotal);
    const serviceFee = 1000;
    const totalPayment = Math.max(
      0,
      subtotal + shippingFee - shippingDiscount - effectiveVoucher + serviceFee
    );

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `LKM-20241028-${randomDigits}`;
    const resiDigits = Math.floor(1000000000 + Math.random() * 9000000000);

    const uniqueStores = Array.from(
      new Set(activeCheckoutItems.map((i) => i.storeName))
    );
    const combinedStoreName =
      uniqueStores.length > 1
        ? `${uniqueStores[0]} & ${uniqueStores[1]}`
        : uniqueStores[0] || 'Galeri Kriya Troso & Cirebon';

    const uniqueOrigins = Array.from(
      new Set(activeCheckoutItems.map((i) => i.storeOrigin))
    );
    const combinedOrigin = uniqueOrigins.join(' & ') || 'Cirebon & Jepara';

    const paymentMethodMap = {
      BCA: 'BCA Virtual Account (123 456 7890)',
      MANDIRI: 'Mandiri Virtual Account (887 0812 3456)',
      BRI: 'BRIVA Virtual Account (778 0812 3456)',
      LOKAPAY: 'Saldo LokaPay Nusantara (Otomatis)',
    };

    const isInstantPaid = paymentBank === 'LOKAPAY';
    const initialStatus: OrderStatus = isInstantPaid
      ? 'Diproses'
      : 'Menunggu Pembayaran';

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      dateStr: 'Hari Ini',
      timeStr: 'Hari Ini, 14:35 WIB',
      status: initialStatus,
      storeId: activeCheckoutItems[0].storeId,
      storeName: combinedStoreName,
      storeOrigin: combinedOrigin,
      items: activeCheckoutItems.map((c, idx) => ({
        id: `oi-${Date.now()}-${idx}`,
        productId: c.productId,
        title: c.title,
        variant: c.variant,
        price: c.price,
        quantity: c.quantity,
        image: c.image,
        origin: c.storeOrigin.replace('Kab. ', '').replace('Kota ', ''),
      })),
      subtotal,
      shippingFee,
      shippingDiscount,
      voucherDiscount: effectiveVoucher,
      serviceFee,
      totalPayment,
      shippingService: shippingType === 'express' ? 'Express' : 'Reguler',
      courierName: shippingType === 'express' ? 'SiCepat Best' : 'J&T Express',
      resiNumber: `JT-${resiDigits}`,
      etaText:
        shippingType === 'express'
          ? 'Estimasi tiba: Besok Sore'
          : 'Estimasi tiba: 2 - 3 Hari Kerja',
      paymentMethod: paymentMethodMap[paymentBank],
      vaNumber: '1234 5678 90',
      address: selectedAddress,
      trackingSteps: isInstantPaid
        ? [
            {
              title: 'Resi telah dibuat, paket sedang dikemas oleh pengrajin.',
              time: 'Baru saja',
              active: true,
            },
            {
              title: 'Pembayaran LokaPay terkonfirmasi otomatis.',
              time: 'Baru saja',
              active: false,
            },
          ]
        : [
            {
              title: 'Menunggu pembayaran Virtual Account dari pembeli.',
              time: 'Baru saja',
              active: true,
            },
          ],
    };

    // Add to orders list at the top
    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);

    if (firebaseUid) {
      saveOrderToFirestore(firebaseUid, newOrder).catch(() => {});
    }

    // If ordered from cart, remove those checked items from the cart
    if (checkoutMode === 'cart') {
      const orderedIds = new Set(activeCheckoutItems.map((i) => i.id));
      setCartItems((prev) => prev.filter((item) => !orderedIds.has(item.id)));
    } else {
      setBuyNowItem(null);
    }

    if (isInstantPaid) {
      setActiveOrdersTab('Diproses (Aktif)');
      triggerToast(`Pesanan ${orderNumber} berhasil dibayar via LokaPay & masuk ke Pesanan!`);
      navigateTo('pembayaran-berhasil');
    } else {
      setActiveOrdersTab('Menunggu Pembayaran');
      triggerToast(`Pesanan ${orderNumber} dibuat! Silakan selesaikan pembayaran VA.`);
      navigateTo('pembayaran-va');
    }
  };

  const handleConfirmPaymentSuccess = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          status: 'Diproses',
          trackingSteps: [
            {
              title: 'Resi telah dibuat, paket menunggu penjemputan kurir.',
              time: 'Baru saja, WIB',
              active: true,
            },
            {
              title: 'Pembayaran pesanan terkonfirmasi otomatis.',
              time: 'Baru saja, WIB',
              active: false,
            },
          ],
        };
      })
    );
    if (firebaseUid) {
      updateOrderStatusInFirestore(
        firebaseUid,
        orderId,
        'Diproses',
        'Resi telah dibuat, paket menunggu penjemputan kurir.'
      ).catch(() => {});
    }
    setActiveOrdersTab('Diproses (Aktif)');
    triggerToast('Pembayaran lunas! Status pesanan diupdate menjadi Diproses.');
    navigateTo('pembayaran-berhasil');
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const stepTitleMap: Record<OrderStatus, string> = {
          'Menunggu Pembayaran': 'Menunggu pembayaran Virtual Account.',
          Diproses: 'Pesanan sedang dikemas oleh pengrajin lokal.',
          Dikirim: `Paket sedang dibawa kurir ${o.courierName} menuju ${o.address.shortLabel}.`,
          Selesai: `Paket telah diterima oleh ${o.address.recipient}. Transaksi selesai.`,
          Dibatalkan: 'Pesanan telah dibatalkan.',
        };
        const updatedSteps = [
          {
            title: stepTitleMap[nextStatus],
            time: 'Baru saja, WIB',
            active: true,
          },
          ...o.trackingSteps.map((s) => ({ ...s, active: false })),
        ];
        return {
          ...o,
          status: nextStatus,
          etaText:
            nextStatus === 'Dikirim'
              ? `Sedang diantar ke ${o.address.shortLabel}`
              : nextStatus === 'Selesai'
              ? 'Telah diterima pembeli'
              : o.etaText,
          trackingSteps: updatedSteps,
        };
      })
    );

    if (firebaseUid) {
      updateOrderStatusInFirestore(firebaseUid, orderId, nextStatus, nextStatus).catch(() => {});
    }

    if (nextStatus === 'Dikirim') {
      setActiveOrdersTab('Dikirim');
      triggerToast('Status diupdate: Paket kini sedang DIKIRIM kurir!');
    } else if (nextStatus === 'Selesai') {
      setActiveOrdersTab('Selesai');
      triggerToast('Status diupdate: Pesanan SELESAI diterima!');
    } else if (nextStatus === 'Dibatalkan') {
      setActiveOrdersTab('Dibatalkan');
      triggerToast('Pesanan telah dibatalkan');
    } else {
      triggerToast(`Status pesanan diperbarui: ${nextStatus}`);
    }
  };

  const handleReviewOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, reviewed: true, userRating: 5 } : o))
    );
    if (firebaseUid) {
      updateOrderReviewInFirestore(firebaseUid, orderId, 5).catch(() => {});
    }
    triggerToast('Terima kasih! Ulasan ★5.0 berhasil dikirim untuk pengrajin.');
  };

  const handleReorder = (order: Order) => {
    setCartItems((prev) => {
      const updated = [...prev];
      order.items.forEach((oi) => {
        const existingIdx = updated.findIndex(
          (c) => c.title === oi.title && c.variant === oi.variant
        );
        if (existingIdx > -1) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + oi.quantity,
            checked: true,
          };
        } else {
          updated.unshift({
            id: `cart-re-${Date.now()}-${Math.random()}`,
            productId: oi.productId,
            storeId: order.storeId,
            storeName: order.storeName,
            storeOrigin: oi.origin,
            title: oi.title,
            variant: oi.variant,
            price: oi.price,
            badge: 'Handmade',
            image: oi.image,
            quantity: oi.quantity,
            checked: true,
          });
        }
      });
      return updated;
    });
    triggerToast('Produk dari pesanan berhasil dimasukkan kembali ke Keranjang!');
    navigateTo('keranjang');
  };

  const handleSelectOrder = (order: Order, targetScreen: ScreenId) => {
    setActiveOrderId(order.id);
    navigateTo(targetScreen);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setIsAuthenticated(true);
    setJustRegisteredAccount(null);
    setUserProfile(user);
    setAddresses((prev) =>
      prev.map((addr, idx) =>
        idx === 0
          ? {
              ...addr,
              recipient: user.name,
              phoneOrSub: `(${user.phone})`,
            }
          : addr
      )
    );
    if (firebaseUid) {
      upsertUserProfileInFirestore(firebaseUid, user, false).catch(() => {});
    }
    triggerToast(`Login berhasil! Selamat datang di Beranda, ${user.name}`);
    navigateTo('beranda', true);
  };

  const handleRegisterSuccess = (newAccount: RegisteredAccount) => {
    setRegisteredAccounts((prev) => [newAccount, ...prev]);
    setJustRegisteredAccount(newAccount);
    setIsAuthenticated(false);
    if (firebaseUid) {
      saveRegisteredAccountToFirestore(firebaseUid, newAccount).catch(() => {});
    }
    triggerToast(
      `Pendaftaran akun ${newAccount.name} berhasil! Silakan Login untuk masuk ke Beranda.`
    );
    setCurrentScreen('login');
    setHistory((prev) => [...prev, 'login']);
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    setRegisteredAccounts((prev) =>
      prev.map((acc) =>
        acc.email.toLowerCase() === userProfile.email.toLowerCase()
          ? { ...acc, ...updated }
          : acc
      )
    );
    if (firebaseUid) {
      upsertUserProfileInFirestore(firebaseUid, updated, false).catch(() => {});
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    triggerToast(`Berhasil keluar dari akun ${userProfile.name}. Silakan login kembali.`);
    setCurrentScreen('login');
    setHistory(['splash', 'login']);
  };

  const activeOrder =
    orders.find((o) => o.id === activeOrderId) || orders[0] || INITIAL_ORDERS[0];

  const currentMeta =
    ALL_SCREENS.find((s) => s.id === currentScreen) || ALL_SCREENS[0];

  const totalCartBadgeCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen w-full flex flex-col bg-surface">
      <div className="flex-1 w-full flex flex-col items-stretch justify-center">
        {/* Direct User-Facing Application Viewport */}
        <div className="@container bg-surface text-on-surface flex flex-col relative w-full flex-1 min-h-screen">
          {/* Scrollable Inner Viewport */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex flex-col w-full relative bg-surface"
          >
            {currentScreen !== 'splash' && (
              <TopHeader
                mode={currentMeta.mode}
                currentScreen={currentScreen}
                title={currentMeta.headerTitle}
                cartCount={totalCartBadgeCount}
                ordersCount={orders.length}
                isAuthenticated={isAuthenticated}
                userProfile={userProfile}
                selectedAddressShort={selectedAddress.shortLabel}
                onBack={handleBack}
                onNavigate={navigateTo}
                onOpenSearchWithQuery={handleOpenSearchWithQuery}
                onLogout={handleLogout}
                onShowToast={triggerToast}
              />
            )}

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative w-full bg-surface">
              {currentScreen === 'splash' && (
                <SplashScreen
                  onFinishSplash={() => {
                    setCurrentScreen('login');
                    setHistory((prev) => [...prev, 'login']);
                  }}
                  onNavigate={navigateTo}
                />
              )}

              {currentScreen === 'login' && (
                <LoginScreen
                  registeredAccounts={registeredAccounts}
                  justRegisteredAccount={justRegisteredAccount}
                  onLoginSuccess={handleLoginSuccess}
                  onNavigate={navigateTo}
                  onShowToast={triggerToast}
                />
              )}

            {currentScreen === 'register' && (
              <RegisterScreen
                registeredAccounts={registeredAccounts}
                onRegisterSuccess={handleRegisterSuccess}
                onNavigate={navigateTo}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'beranda' && (
              <BerandaScreen
                userName={userProfile.name}
                onNavigate={navigateTo}
                onSelectProduct={handleSelectProduct}
                onSelectCategory={handleSelectCategory}
                onOpenSearchWithQuery={handleOpenSearchWithQuery}
                onAddToCart={handleAddToCart}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                selectedAddressShort={selectedAddress.shortLabel}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'kategori' && (
              <KategoriScreen
                initialCategory={activeCategoryFilter}
                onNavigate={navigateTo}
                onSelectProduct={handleSelectProduct}
                onSelectCategory={handleSelectCategory}
                onOpenSearchWithQuery={handleOpenSearchWithQuery}
                onAddToCart={handleAddToCart}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                selectedAddressShort={selectedAddress.shortLabel}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'pencarian' && (
              <PencarianScreen
                initialQuery={activeSearchQuery}
                onNavigate={navigateTo}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                selectedAddressShort={selectedAddress.shortLabel}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'detail-produk' && (
              <DetailProdukScreen
                selectedProduct={selectedProduct}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onNavigate={navigateTo}
                onSelectCategory={handleSelectCategory}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'keranjang' && (
              <KeranjangScreen
                cartItems={cartItems}
                voucherAmount={voucherAmount}
                onChangeVoucher={setVoucherAmount}
                onUpdateQty={handleUpdateCartQty}
                onCycleVariant={handleCycleCartVariant}
                onToggleCheck={handleToggleCartCheck}
                onToggleStoreCheck={handleToggleStoreCheck}
                onToggleAllCheck={handleToggleAllCheck}
                onDeleteItem={handleDeleteCartItem}
                onSelectProduct={handleSelectProduct}
                onProceedToCheckout={handleProceedToCheckoutFromCart}
                onNavigate={navigateTo}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'alamat' && (
              <AlamatScreen
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onSelectAddress={setSelectedAddressId}
                onSetMainAddress={handleSetMainAddress}
                onAddAddress={handleAddAddress}
                onConfirmAddress={() => {
                  triggerToast(`Alamat pengiriman aktif: ${selectedAddress.shortLabel}`);
                  handleBack();
                }}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'checkout' && (
              <CheckoutScreen
                checkoutItems={activeCheckoutItems}
                voucherAmount={voucherAmount}
                selectedAddress={selectedAddress}
                shippingType={shippingType}
                paymentBank={paymentBank}
                onChangeShipping={setShippingType}
                onChangePaymentBank={setPaymentBank}
                onPlaceOrder={handlePlaceOrder}
                onNavigate={navigateTo}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'pembayaran-va' && (
              <PembayaranVAScreen
                activeOrder={activeOrder}
                onConfirmPaymentSuccess={handleConfirmPaymentSuccess}
                onNavigate={navigateTo}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'pembayaran-berhasil' && (
              <PembayaranBerhasilScreen
                activeOrder={activeOrder}
                onNavigate={navigateTo}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'pesanan' && (
              <PesananScreen
                orders={orders}
                initialTab={activeOrdersTab}
                onSelectOrder={handleSelectOrder}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onReviewOrder={handleReviewOrder}
                onReorder={handleReorder}
                onNavigate={navigateTo}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'detail-pesanan' && (
              <DetailPesananScreen
                activeOrder={activeOrder}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onNavigate={navigateTo}
                onShowToast={triggerToast}
              />
            )}

            {currentScreen === 'profil' && (
              <ProfilScreen
                userProfile={userProfile}
                orders={orders}
                cartCount={totalCartBadgeCount}
                addressCount={addresses.length}
                selectedAddressShort={selectedAddress.shortLabel}
                onOpenOrdersWithTab={handleOpenOrdersWithTab}
                onSelectOrder={handleSelectOrder}
                onUpdateProfile={handleUpdateProfile}
                onLogout={handleLogout}
                onNavigate={navigateTo}
                onShowToast={triggerToast}
              />
            )}
          </main>

          {/* Desktop Footer (Visible on Komputer / @md and up) */}
          {currentScreen !== 'splash' && (
            <DesktopFooter
              onNavigate={navigateTo}
              onSelectCategory={handleSelectCategory}
            />
          )}

          {/* Android Bottom Navigation Bar or Gesture Pill (Visible on Android / < @md) */}
          {currentMeta.mode === 'tab' ? (
            <BottomNav
              activeTab={currentScreen}
              cartCount={totalCartBadgeCount}
              onNavigate={navigateTo}
            />
          ) : (
            <BottomGesturePill />
          )}
        </div>

        {/* Floating Toast Notification */}
        {toastMsg && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-inverse-surface text-inverse-on-surface rounded-full font-label-md text-label-md shadow-xl flex items-center gap-2 whitespace-nowrap max-w-[90%] pointer-events-none">
            <span className="material-symbols-outlined text-[18px] text-tertiary-fixed shrink-0">
              check_circle
            </span>
            <span className="truncate">{toastMsg}</span>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
