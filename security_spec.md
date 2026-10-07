# Security Specification (Phase 0: Payload-First Security TDD)

## 1. Data Invariants
1. **Master Gate & Ownership Invariant**: Every subcollection (`/users/{userId}/accounts/{accountId}`, `/users/{userId}/cart/{cartId}`, `/users/{userId}/addresses/{addressId}`, `/users/{userId}/orders/{orderId}`) cannot exist or be modified without a valid parent `/users/{userId}` document (`exists(/databases/$(database)/documents/users/$(userId))`) and the authenticated user's UID strictly matching `userId` and `ownerId`.
2. **PII Isolation Invariant**: User profiles (`/users/{userId}`), accounts, addresses, and orders contain PII (`email`, `phone`, `nim`, `fullAddress`) and can ONLY be read (`get`/`list`) by the owner (`request.auth.uid == userId` and `resource.data.ownerId == request.auth.uid`) or a verified admin.
3. **Strict Schema & Key Whitelisting Invariant**: Every `create` and `update` must pass `isValid[Entity](incoming())` enforcing `hasAll()`, `hasOnly()`, string `.size()` bounds, regex patterns, and server timestamps (`request.time`).
4. **Terminal State Locking Invariant**: Once an Order document reaches `status == 'Dibatalkan'`, no further client updates are permitted unless performed by an admin.
5. **Immortal Fields Invariant**: `ownerId` and `createdAt` can never be mutated during an `update`.

## 2. The "Dirty Dozen" Payloads (Designed to Break Identity, Integrity, and State)

1. **Payload 1 (Identity Spoofing on User Create)**:
   `{ "ownerId": "victim_uid_999", "name": "Attacker", "email": "att@ikmi.ac.id", "phone": "081234", "nim": "41220001", "prodi": "RPL", "campus": "STMIK IKMI", "memberLevel": "Perak", "createdAt": "SERVER_TIME", "updatedAt": "SERVER_TIME" }` -> Must return `PERMISSION_DENIED`.
2. **Payload 2 (Shadow Field / Ghost Key Injection on User Profile)**:
   `{ "ownerId": "auth_uid", "name": "Fajar", "email": "fajar@ikmi.ac.id", "phone": "0812345", "nim": "41220089", "prodi": "RPL", "campus": "STMIK IKMI", "memberLevel": "Perak", "isAdmin": true, "createdAt": "SERVER_TIME", "updatedAt": "SERVER_TIME" }` -> Must return `PERMISSION_DENIED`.
3. **Payload 3 (Unverified Email Write Attempt)**:
   Authenticated user with `email_verified: false` attempting to create `/users/{userId}` -> Must return `PERMISSION_DENIED`.
4. **Payload 4 (Orphaned Subcollection Write - Master Gate Bypass)**:
   Creating `/users/{userId}/cart/cart_1` when `/users/{userId}` does not exist -> Must return `PERMISSION_DENIED`.
5. **Payload 5 (ID Poisoning / Oversized Path Variable)**:
   Creating document with 200-char ID or invalid characters `cart$#@^!` -> Must return `PERMISSION_DENIED`.
6. **Payload 6 (Value Poisoning on Cart Quantity)**:
   Updating `/users/{userId}/cart/cart_1` with `{ "quantity": -5, "updatedAt": "SERVER_TIME" }` or `{ "quantity": "999999", "updatedAt": "SERVER_TIME" }` -> Must return `PERMISSION_DENIED`.
7. **Payload 7 (Terminal State Mutation on Cancelled Order)**:
   Updating an order whose existing `status` is `'Dibatalkan'` to `'Selesai'` -> Must return `PERMISSION_DENIED`.
8. **Payload 8 (Immortal Field Mutation on Order Update)**:
   Updating `createdAt` or `ownerId` on an existing `/users/{userId}/orders/{orderId}` -> Must return `PERMISSION_DENIED`.
9. **Payload 9 (Client Timestamp Forgery)**:
   Creating `/users/{userId}/orders/{orderId}` with `createdAt` set to a past timestamp instead of `request.time` -> Must return `PERMISSION_DENIED`.
10. **Payload 10 (Cross-User PII Read on Addresses)**:
    User A (`uid_A`) attempting `get` or `list` on `/users/uid_B/addresses` -> Must return `PERMISSION_DENIED`.
11. **Payload 11 (Unbounded String / Denial of Wallet Payload)**:
    Creating `/users/{userId}/addresses/addr_1` with a 5,000-character `fullAddress` (exceeding `maxLength: 300`) -> Must return `PERMISSION_DENIED`.
12. **Payload 12 (Self-Assigned Admin Escalation)**:
    Writing to `/admins/{auth_uid}` from the client SDK -> Must return `PERMISSION_DENIED`.
