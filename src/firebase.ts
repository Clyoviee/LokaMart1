import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocFromServer,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { AddressItem, CartItem, Order, OrderStatus, UserProfile } from './data';
import { RegisteredAccount } from './components/AuthScreens';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const FIREBASE_PROJECT_INFO = {
  projectId: firebaseConfig.projectId,
  appId: firebaseConfig.appId,
  firestoreDatabaseId: firebaseConfig.firestoreDatabaseId,
  authDomain: firebaseConfig.authDomain,
  storageBucket: firebaseConfig.storageBucket,
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection to Firestore on boot as required
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
      return false;
    }
    // Permission denied on /test/connection means the client IS online and reached Firestore rules!
    return true;
  }
}

testConnection();

// Defensive sanitization helpers matching firebase-blueprint.json constraints
function sanitizeId(raw: string, fallback = 'doc_1'): string {
  const cleaned = String(raw || fallback)
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 120);
  return cleaned.length > 0 ? cleaned : fallback;
}

function clampStr(val: string | undefined, minLen: number, maxLen: number, fallback: string): string {
  const s = (val || fallback).trim().slice(0, maxLen);
  if (s.length < minLen) {
    return fallback.slice(0, maxLen);
  }
  return s;
}

export async function signInWithGoogleFirebase(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutFirebase(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Ensures the parent `/users/{userId}` document exists in Firestore (Master Gate requirement)
 */
export async function upsertUserProfileInFirestore(
  uid: string,
  profile: UserProfile,
  isCreate = false
): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) return;
  const safeUid = sanitizeId(uid, 'user_1');
  const docPath = `users/${safeUid}`;
  const payload = {
    ownerId: safeUid,
    name: clampStr(profile.name, 1, 100, 'Fajar Pratama'),
    email: clampStr(profile.email, 3, 120, 'fajar.pratama@mhs.ikmi.ac.id'),
    phone: clampStr(profile.phone, 5, 30, '0812-3456-7890'),
    nim: clampStr(profile.nim || profile.studentId, 1, 30, '41220089'),
    prodi: clampStr(profile.prodi || profile.program, 1, 100, 'Rekayasa Perangkat Lunak (RPL)'),
    campus: clampStr(profile.campus, 1, 100, 'STMIK IKMI CIREBON'),
    memberLevel: clampStr(profile.memberLevel, 1, 50, 'Member Perak'),
    ...(isCreate ? { createdAt: serverTimestamp() } : {}),
    updatedAt: serverTimestamp(),
  };

  try {
    if (isCreate) {
      await setDoc(doc(db, 'users', safeUid), {
        ...payload,
        createdAt: serverTimestamp(),
      });
    } else {
      await updateDoc(doc(db, 'users', safeUid), {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        nim: payload.nim,
        prodi: payload.prodi,
        campus: payload.campus,
        memberLevel: payload.memberLevel,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    // If update fails because doc doesn't exist yet, create it
    if (!isCreate) {
      try {
        await setDoc(doc(db, 'users', safeUid), {
          ...payload,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return;
      } catch (createErr) {
        handleFirestoreError(createErr, OperationType.WRITE, docPath);
      }
    }
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function saveRegisteredAccountToFirestore(
  uid: string,
  account: RegisteredAccount
): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) return;
  const safeUid = sanitizeId(uid, 'user_1');
  const accountId = sanitizeId(account.email || account.nim || account.name, 'acc_1');
  const docPath = `users/${safeUid}/accounts/${accountId}`;

  try {
    await setDoc(doc(db, 'users', safeUid, 'accounts', accountId), {
      ownerId: safeUid,
      name: clampStr(account.name, 1, 100, 'Mahasiswa RPL'),
      email: clampStr(account.email, 3, 120, 'mahasiswa@mhs.ikmi.ac.id'),
      phone: clampStr(account.phone, 5, 30, '0812-3456-7890'),
      nim: clampStr(account.nim || account.studentId, 1, 30, '41220089'),
      prodi: clampStr(account.prodi, 1, 100, 'Rekayasa Perangkat Lunak (RPL)'),
      campus: clampStr(account.campus, 1, 100, 'STMIK IKMI CIREBON'),
      memberLevel: clampStr(account.memberLevel, 1, 50, 'Member Perak'),
      passwordHash: clampStr(account.password, 1, 128, 'password123'),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function saveCartItemToFirestore(uid: string, item: CartItem): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) return;
  const safeUid = sanitizeId(uid, 'user_1');
  const cartId = sanitizeId(item.id, 'cart_1');
  const docPath = `users/${safeUid}/cart/${cartId}`;

  try {
    await setDoc(doc(db, 'users', safeUid, 'cart', cartId), {
      ownerId: safeUid,
      productId: sanitizeId(item.productId, 'rec-1').slice(0, 64),
      storeId: clampStr(item.storeId, 1, 64, 'store-1'),
      storeName: clampStr(item.storeName, 1, 120, 'Galeri Kriya Troso'),
      storeOrigin: clampStr(item.storeOrigin, 1, 80, 'Kab. Jepara'),
      title: clampStr(item.title, 1, 160, 'Produk Kriya'),
      variant: clampStr(item.variant, 1, 80, 'Standar'),
      price: Math.max(0, Math.min(100000000, Number(item.price) || 0)),
      quantity: Math.max(1, Math.min(999, Number(item.quantity) || 1)),
      checked: Boolean(item.checked),
      badge: clampStr(item.badge, 1, 50, 'Handmade'),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function removeCartItemFromFirestore(uid: string, itemId: string): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) return;
  const safeUid = sanitizeId(uid, 'user_1');
  const cartId = sanitizeId(itemId, 'cart_1');
  const docPath = `users/${safeUid}/cart/${cartId}`;

  try {
    await deleteDoc(doc(db, 'users', safeUid, 'cart', cartId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}

export async function saveAddressToFirestore(uid: string, address: AddressItem): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) return;
  const safeUid = sanitizeId(uid, 'user_1');
  const addressId = sanitizeId(`addr_${address.id}`, 'addr_1');
  const docPath = `users/${safeUid}/addresses/${addressId}`;

  try {
    await setDoc(doc(db, 'users', safeUid, 'addresses', addressId), {
      ownerId: safeUid,
      label: clampStr(address.label, 1, 60, 'Rumah'),
      recipient: clampStr(address.recipient, 1, 100, 'Fajar Pratama'),
      phoneOrSub: clampStr(address.phoneOrSub, 1, 80, '(0812-3456-7890)'),
      fullAddress: clampStr(
        address.fullAddress,
        5,
        300,
        'Jl. Kesambi Raya No. 45, Kota Cirebon, Jawa Barat'
      ),
      shortLabel: clampStr(address.shortLabel, 1, 80, 'Kesambi, Cirebon'),
      isMain: Boolean(address.isMain),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function saveOrderToFirestore(uid: string, order: Order): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) return;
  const safeUid = sanitizeId(uid, 'user_1');
  const orderId = sanitizeId(order.id, 'ord_1');
  const docPath = `users/${safeUid}/orders/${orderId}`;
  const summaryText = order.items
    .map((i) => `${i.quantity}x ${i.title} (${i.variant})`)
    .join('; ');

  try {
    await setDoc(doc(db, 'users', safeUid, 'orders', orderId), {
      ownerId: safeUid,
      orderNumber: clampStr(order.orderNumber, 3, 60, 'LKM-2026-0001'),
      dateStr: clampStr(order.dateStr, 1, 40, 'Hari Ini'),
      timeStr: clampStr(order.timeStr, 1, 60, 'Hari Ini, WIB'),
      status: order.status,
      storeId: clampStr(order.storeId, 1, 64, 'store-1'),
      storeName: clampStr(order.storeName, 1, 120, 'Galeri Kriya Troso & Cirebon'),
      storeOrigin: clampStr(order.storeOrigin, 1, 80, 'Cirebon & Jepara'),
      subtotal: Math.max(0, Math.min(100000000, Number(order.subtotal) || 0)),
      shippingFee: Math.max(0, Math.min(10000000, Number(order.shippingFee) || 0)),
      shippingDiscount: Math.max(0, Math.min(10000000, Number(order.shippingDiscount) || 0)),
      voucherDiscount: Math.max(0, Math.min(10000000, Number(order.voucherDiscount) || 0)),
      serviceFee: Math.max(0, Math.min(1000000, Number(order.serviceFee) || 0)),
      totalPayment: Math.max(0, Math.min(100000000, Number(order.totalPayment) || 0)),
      shippingService: order.shippingService === 'Express' ? 'Express' : 'Reguler',
      courierName: clampStr(order.courierName, 1, 60, 'J&T Express'),
      resiNumber: clampStr(order.resiNumber, 1, 60, 'JT-1234567890'),
      etaText: clampStr(order.etaText, 1, 100, 'Estimasi 2-3 Hari'),
      paymentMethod: clampStr(order.paymentMethod, 1, 100, 'BCA Virtual Account'),
      vaNumber: clampStr(order.vaNumber, 1, 50, '1234 5678 90'),
      addressShort: clampStr(order.address?.shortLabel, 1, 100, 'Kesambi, Cirebon'),
      itemsSummary: clampStr(summaryText, 1, 500, '1x Produk Kriya LokaMart'),
      reviewed: Boolean(order.reviewed),
      userRating: Math.max(0, Math.min(5, Number(order.userRating) || 0)),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function updateOrderStatusInFirestore(
  uid: string,
  orderIdRaw: string,
  nextStatus: OrderStatus,
  etaText: string
): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) return;
  const safeUid = sanitizeId(uid, 'user_1');
  const orderId = sanitizeId(orderIdRaw, 'ord_1');
  const docPath = `users/${safeUid}/orders/${orderId}`;

  try {
    await updateDoc(doc(db, 'users', safeUid, 'orders', orderId), {
      status: nextStatus,
      etaText: clampStr(etaText, 1, 100, 'Diproses'),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

export async function updateOrderReviewInFirestore(
  uid: string,
  orderIdRaw: string,
  rating = 5
): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) return;
  const safeUid = sanitizeId(uid, 'user_1');
  const orderId = sanitizeId(orderIdRaw, 'ord_1');
  const docPath = `users/${safeUid}/orders/${orderId}`;

  try {
    await updateDoc(doc(db, 'users', safeUid, 'orders', orderId), {
      reviewed: true,
      userRating: Math.max(0, Math.min(5, rating)),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

export async function syncInitialDataToFirestore(
  uid: string,
  profile: UserProfile,
  accounts: RegisteredAccount[],
  cartItems: CartItem[],
  addresses: AddressItem[],
  orders: Order[]
): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) return;
  // 1. Ensure parent user document exists first (Master Gate)
  await upsertUserProfileInFirestore(uid, profile, true);
  // 2. Sync subcollections
  for (const acc of accounts) {
    await saveRegisteredAccountToFirestore(uid, acc);
  }
  for (const item of cartItems) {
    await saveCartItemToFirestore(uid, item);
  }
  for (const addr of addresses) {
    await saveAddressToFirestore(uid, addr);
  }
  for (const ord of orders) {
    await saveOrderToFirestore(uid, ord);
  }
}

export interface FirestoreCollectionSnapshotCounts {
  accountsCount: number;
  cartCount: number;
  addressesCount: number;
  ordersCount: number;
  lastSyncedAt: string;
}

export function subscribeToUserFirestoreCollections(
  uid: string,
  onUpdateCounts: (counts: Partial<FirestoreCollectionSnapshotCounts>) => void
): () => void {
  const safeUid = sanitizeId(uid, 'user_1');
  const accountsPath = `users/${safeUid}/accounts`;
  const cartPath = `users/${safeUid}/cart`;
  const addressesPath = `users/${safeUid}/addresses`;
  const ordersPath = `users/${safeUid}/orders`;

  const unsubAccounts = onSnapshot(
    collection(db, accountsPath),
    (snap) => {
      onUpdateCounts({
        accountsCount: snap.size,
        lastSyncedAt: new Date().toLocaleTimeString('id-ID'),
      });
    },
    (err) => handleFirestoreError(err, OperationType.GET, accountsPath)
  );

  const unsubCart = onSnapshot(
    collection(db, cartPath),
    (snap) => {
      onUpdateCounts({
        cartCount: snap.size,
        lastSyncedAt: new Date().toLocaleTimeString('id-ID'),
      });
    },
    (err) => handleFirestoreError(err, OperationType.GET, cartPath)
  );

  const unsubAddresses = onSnapshot(
    collection(db, addressesPath),
    (snap) => {
      onUpdateCounts({
        addressesCount: snap.size,
        lastSyncedAt: new Date().toLocaleTimeString('id-ID'),
      });
    },
    (err) => handleFirestoreError(err, OperationType.GET, addressesPath)
  );

  const unsubOrders = onSnapshot(
    collection(db, ordersPath),
    (snap) => {
      onUpdateCounts({
        ordersCount: snap.size,
        lastSyncedAt: new Date().toLocaleTimeString('id-ID'),
      });
    },
    (err) => handleFirestoreError(err, OperationType.GET, ordersPath)
  );

  return () => {
    unsubAccounts();
    unsubCart();
    unsubAddresses();
    unsubOrders();
  };
}
