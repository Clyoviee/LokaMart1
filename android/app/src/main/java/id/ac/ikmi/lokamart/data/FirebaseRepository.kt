package id.ac.ikmi.lokamart.data

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ListenerRegistration
import id.ac.ikmi.lokamart.model.AddressItem
import id.ac.ikmi.lokamart.model.CartItem
import id.ac.ikmi.lokamart.model.OrderDoc
import id.ac.ikmi.lokamart.model.UserProfile
import kotlinx.coroutines.tasks.await

/**
 * Repository utama LokaMart untuk koneksi Cloud Firestore & Firebase Authentication
 * Project ID: southern-flash-kcf5x
 * Database ID: ai-studio-remixlokamartmar-f39c52e0-d478-4ce3-969a-f0922317bfb7
 */
object FirebaseRepository {

    private const val DATABASE_ID = "ai-studio-remixlokamartmar-f39c52e0-d478-4ce3-969a-f0922317bfb7"

    val auth: FirebaseAuth by lazy { FirebaseAuth.getInstance() }
    val db: FirebaseFirestore by lazy {
        FirebaseFirestore.getInstance(DATABASE_ID)
    }

    val currentUid: String?
        get() = auth.currentUser?.uid

    suspend fun upsertUserProfile(profile: UserProfile): Result<Unit> = runCatching {
        val uid = currentUid ?: throw IllegalStateException("User belum login ke Firebase Auth")
        val data = hashMapOf(
            "ownerId" to uid,
            "name" to profile.name.take(100),
            "email" to profile.email.take(120),
            "phone" to profile.phone.take(30),
            "nim" to profile.nim.take(30),
            "prodi" to profile.prodi.take(100),
            "campus" to profile.campus.take(100),
            "memberLevel" to profile.memberLevel.take(50),
            "createdAt" to FieldValue.serverTimestamp(),
            "updatedAt" to FieldValue.serverTimestamp()
        )
        db.collection("users").document(uid).set(data).await()
    }

    suspend fun saveCartItem(item: CartItem): Result<Unit> = runCatching {
        val uid = currentUid ?: throw IllegalStateException("User belum login")
        val data = hashMapOf(
            "ownerId" to uid,
            "productId" to item.productId,
            "storeId" to item.storeId,
            "storeName" to item.storeName,
            "storeOrigin" to item.storeOrigin,
            "title" to item.title,
            "variant" to item.variant,
            "price" to item.price,
            "quantity" to item.quantity,
            "checked" to item.checked,
            "badge" to item.badge,
            "createdAt" to FieldValue.serverTimestamp(),
            "updatedAt" to FieldValue.serverTimestamp()
        )
        db.collection("users").document(uid)
            .collection("cart").document(item.id)
            .set(data).await()
    }

    suspend fun saveOrder(order: OrderDoc): Result<Unit> = runCatching {
        val uid = currentUid ?: throw IllegalStateException("User belum login")
        val data = hashMapOf(
            "ownerId" to uid,
            "orderNumber" to order.orderNumber,
            "dateStr" to order.dateStr,
            "timeStr" to order.timeStr,
            "status" to order.status,
            "storeId" to order.storeId,
            "storeName" to order.storeName,
            "storeOrigin" to order.storeOrigin,
            "subtotal" to order.subtotal,
            "shippingFee" to order.shippingFee,
            "shippingDiscount" to order.shippingDiscount,
            "voucherDiscount" to order.voucherDiscount,
            "serviceFee" to order.serviceFee,
            "totalPayment" to order.totalPayment,
            "shippingService" to order.shippingService,
            "courierName" to order.courierName,
            "resiNumber" to order.resiNumber,
            "etaText" to order.etaText,
            "paymentMethod" to order.paymentMethod,
            "vaNumber" to order.vaNumber,
            "addressShort" to order.addressShort,
            "itemsSummary" to order.itemsSummary,
            "reviewed" to order.reviewed,
            "userRating" to order.userRating,
            "createdAt" to FieldValue.serverTimestamp(),
            "updatedAt" to FieldValue.serverTimestamp()
        )
        db.collection("users").document(uid)
            .collection("orders").document(order.id)
            .set(data).await()
    }

    fun listenToCart(onResult: (List<CartItem>) -> Unit): ListenerRegistration? {
        val uid = currentUid ?: return null
        return db.collection("users").document(uid).collection("cart")
            .whereEqualTo("ownerId", uid)
            .addSnapshotListener { snapshot, error ->
                if (error != null || snapshot == null) return@addSnapshotListener
                val items = snapshot.documents.mapNotNull { doc ->
                    doc.toObject(CartItem::class.java)?.copy(id = doc.id)
                }
                onResult(items)
            }
    }

    fun listenToOrders(onResult: (List<OrderDoc>) -> Unit): ListenerRegistration? {
        val uid = currentUid ?: return null
        return db.collection("users").document(uid).collection("orders")
            .whereEqualTo("ownerId", uid)
            .addSnapshotListener { snapshot, error ->
                if (error != null || snapshot == null) return@addSnapshotListener
                val orders = snapshot.documents.mapNotNull { doc ->
                    doc.toObject(OrderDoc::class.java)?.copy(id = doc.id)
                }
                onResult(orders)
            }
    }

    suspend fun saveAddress(addr: AddressItem): Result<Unit> = runCatching {
        val uid = currentUid ?: throw IllegalStateException("User belum login")
        val data = hashMapOf(
            "ownerId" to uid,
            "label" to addr.label,
            "recipient" to addr.recipient,
            "phoneOrSub" to addr.phoneOrSub,
            "fullAddress" to addr.fullAddress,
            "shortLabel" to addr.shortLabel,
            "isMain" to addr.isMain,
            "createdAt" to FieldValue.serverTimestamp(),
            "updatedAt" to FieldValue.serverTimestamp()
        )
        db.collection("users").document(uid)
            .collection("addresses").document(addr.id)
            .set(data).await()
    }
}
