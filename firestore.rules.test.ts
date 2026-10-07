/**
 * Firestore Security Rules Verification Spec ("Dirty Dozen" TDD Suite)
 * Validates all 12 adversarial payloads against the 8 Pillars of Hardened Rules.
 */

export interface DirtyPayloadTestCase {
  id: number;
  name: string;
  collectionPath: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  authUid: string | null;
  emailVerified: boolean;
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_TESTS: DirtyPayloadTestCase[] = [
  {
    id: 1,
    name: 'Identity Spoofing on User Create',
    collectionPath: '/users/user_1',
    operation: 'create',
    authUid: 'user_1',
    emailVerified: true,
    payload: {
      ownerId: 'victim_uid_999',
      name: 'Attacker',
      email: 'att@ikmi.ac.id',
      phone: '08123456',
      nim: '41220001',
      prodi: 'RPL',
      campus: 'STMIK IKMI',
      memberLevel: 'Perak',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Shadow Field Injection (isAdmin: true)',
    collectionPath: '/users/user_1',
    operation: 'create',
    authUid: 'user_1',
    emailVerified: true,
    payload: {
      ownerId: 'user_1',
      name: 'Fajar',
      email: 'fajar@ikmi.ac.id',
      phone: '08123456',
      nim: '41220089',
      prodi: 'RPL',
      campus: 'STMIK IKMI',
      memberLevel: 'Perak',
      isAdmin: true,
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Unverified Email Write Attempt',
    collectionPath: '/users/user_1',
    operation: 'create',
    authUid: 'user_1',
    emailVerified: false,
    payload: {
      ownerId: 'user_1',
      name: 'Fajar',
      email: 'fajar@ikmi.ac.id',
      phone: '08123456',
      nim: '41220089',
      prodi: 'RPL',
      campus: 'STMIK IKMI',
      memberLevel: 'Perak',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Orphaned Subcollection Write Without Parent User Doc',
    collectionPath: '/users/non_existent_user/cart/cart_1',
    operation: 'create',
    authUid: 'non_existent_user',
    emailVerified: true,
    payload: {
      ownerId: 'non_existent_user',
      productId: 'rec-1',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'ID Poisoning via Invalid Characters',
    collectionPath: '/users/user_1/cart/invalid$id!',
    operation: 'create',
    authUid: 'user_1',
    emailVerified: true,
    payload: { ownerId: 'user_1' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Value Poisoning on Cart Quantity (Negative Quantity)',
    collectionPath: '/users/user_1/cart/cart_1',
    operation: 'update',
    authUid: 'user_1',
    emailVerified: true,
    payload: { quantity: -5 },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Terminal State Mutation on Cancelled Order',
    collectionPath: '/users/user_1/orders/ord_cancelled',
    operation: 'update',
    authUid: 'user_1',
    emailVerified: true,
    payload: { status: 'Selesai' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Immortal Field Mutation on Order Update (createdAt)',
    collectionPath: '/users/user_1/orders/ord_1',
    operation: 'update',
    authUid: 'user_1',
    emailVerified: true,
    payload: { createdAt: '2099-01-01T00:00:00Z' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Client Timestamp Forgery on Order Create',
    collectionPath: '/users/user_1/orders/ord_1',
    operation: 'create',
    authUid: 'user_1',
    emailVerified: true,
    payload: { createdAt: '2020-01-01T00:00:00Z' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Cross-User PII Read on Addresses',
    collectionPath: '/users/user_2/addresses/addr_1',
    operation: 'get',
    authUid: 'user_1',
    emailVerified: true,
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Denial of Wallet Oversized String on Address',
    collectionPath: '/users/user_1/addresses/addr_1',
    operation: 'create',
    authUid: 'user_1',
    emailVerified: true,
    payload: { fullAddress: 'A'.repeat(1000) },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Self-Assigned Admin Privilege Escalation',
    collectionPath: '/admins/user_1',
    operation: 'create',
    authUid: 'user_1',
    emailVerified: true,
    payload: { uid: 'user_1', email: 'fajar@ikmi.ac.id' },
    expectedResult: 'PERMISSION_DENIED',
  },
];
