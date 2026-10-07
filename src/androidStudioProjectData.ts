import JSZip from 'jszip';
import { ScreenId } from './data';
import { FIREBASE_PROJECT_INFO } from './firebase';

export interface AndroidProjectFile {
  path: string;
  fileName: string;
  folder: 'java/ui' | 'java/data' | 'java/model' | 'res/layout' | 'res/values' | 'res/menu' | 'gradle' | 'manifest';
  language: 'kotlin' | 'xml' | 'json' | 'gradle' | 'rules';
  relatedScreen?: ScreenId;
  description: string;
  content: string;
}

export interface ScreenAndroidMapping {
  screenId: ScreenId;
  kotlinFile: string;
  xmlFile: string;
  className: string;
  firestoreCollection: string;
}

export const SCREEN_ANDROID_MAPPINGS: Record<ScreenId, ScreenAndroidMapping> = {
  splash: {
    screenId: 'splash',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/SplashActivity.kt',
    xmlFile: 'app/src/main/res/layout/activity_splash.xml',
    className: 'SplashActivity',
    firestoreCollection: '/test/connection',
  },
  login: {
    screenId: 'login',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/LoginActivity.kt',
    xmlFile: 'app/src/main/res/layout/activity_login.xml',
    className: 'LoginActivity',
    firestoreCollection: '/users/{userId}/accounts',
  },
  register: {
    screenId: 'register',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/RegisterActivity.kt',
    xmlFile: 'app/src/main/res/layout/activity_register.xml',
    className: 'RegisterActivity',
    firestoreCollection: '/users/{userId}/accounts',
  },
  beranda: {
    screenId: 'beranda',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/BerandaFragment.kt',
    xmlFile: 'app/src/main/res/layout/fragment_beranda.xml',
    className: 'BerandaFragment',
    firestoreCollection: '/users/{userId}/cart',
  },
  kategori: {
    screenId: 'kategori',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/KategoriFragment.kt',
    xmlFile: 'app/src/main/res/layout/fragment_kategori.xml',
    className: 'KategoriFragment',
    firestoreCollection: '/users/{userId}/cart',
  },
  pencarian: {
    screenId: 'pencarian',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/PencarianActivity.kt',
    xmlFile: 'app/src/main/res/layout/activity_pencarian.xml',
    className: 'PencarianActivity',
    firestoreCollection: '/users/{userId}/cart',
  },
  'detail-produk': {
    screenId: 'detail-produk',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/DetailProdukActivity.kt',
    xmlFile: 'app/src/main/res/layout/activity_detail_produk.xml',
    className: 'DetailProdukActivity',
    firestoreCollection: '/users/{userId}/cart',
  },
  keranjang: {
    screenId: 'keranjang',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/KeranjangActivity.kt',
    xmlFile: 'app/src/main/res/layout/activity_keranjang.xml',
    className: 'KeranjangActivity',
    firestoreCollection: '/users/{userId}/cart/{cartId}',
  },
  alamat: {
    screenId: 'alamat',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/AlamatActivity.kt',
    xmlFile: 'app/src/main/res/layout/activity_alamat.xml',
    className: 'AlamatActivity',
    firestoreCollection: '/users/{userId}/addresses/{addressId}',
  },
  checkout: {
    screenId: 'checkout',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/CheckoutActivity.kt',
    xmlFile: 'app/src/main/res/layout/activity_checkout.xml',
    className: 'CheckoutActivity',
    firestoreCollection: '/users/{userId}/orders/{orderId}',
  },
  'pembayaran-va': {
    screenId: 'pembayaran-va',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/PembayaranVAActivity.kt',
    xmlFile: 'app/src/main/res/layout/activity_pembayaran_va.xml',
    className: 'PembayaranVAActivity',
    firestoreCollection: '/users/{userId}/orders/{orderId}',
  },
  'pembayaran-berhasil': {
    screenId: 'pembayaran-berhasil',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/PembayaranBerhasilActivity.kt',
    xmlFile: 'app/src/main/res/layout/activity_pembayaran_berhasil.xml',
    className: 'PembayaranBerhasilActivity',
    firestoreCollection: '/users/{userId}/orders/{orderId}',
  },
  pesanan: {
    screenId: 'pesanan',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/PesananFragment.kt',
    xmlFile: 'app/src/main/res/layout/fragment_pesanan.xml',
    className: 'PesananFragment',
    firestoreCollection: '/users/{userId}/orders',
  },
  'detail-pesanan': {
    screenId: 'detail-pesanan',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/DetailPesananActivity.kt',
    xmlFile: 'app/src/main/res/layout/activity_detail_pesanan.xml',
    className: 'DetailPesananActivity',
    firestoreCollection: '/users/{userId}/orders/{orderId}',
  },
  profil: {
    screenId: 'profil',
    kotlinFile: 'app/src/main/java/id/ac/ikmi/lokamart/ui/ProfilFragment.kt',
    xmlFile: 'app/src/main/res/layout/fragment_profil.xml',
    className: 'ProfilFragment',
    firestoreCollection: '/users/{userId}',
  },
};

export const ANDROID_STUDIO_PROJECT_FILES: AndroidProjectFile[] = [
  // ===========================================================================
  // 1. CORE DATA & FIREBASE REPOSITORY (.kt)
  // ===========================================================================
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/data/FirebaseRepository.kt',
    fileName: 'FirebaseRepository.kt',
    folder: 'java/data',
    language: 'kotlin',
    description: 'Singleton Repository Kotlin untuk Cloud Firestore & Firebase Auth',
    content: `package id.ac.ikmi.lokamart.data

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ListenerRegistration
import id.ac.ikmi.lokamart.model.*
import kotlinx.coroutines.tasks.await

/**
 * LokaMart Nusantara - Firebase Cloud Firestore Repository
 * Project ID: ${FIREBASE_PROJECT_INFO.projectId}
 * Database ID: ${FIREBASE_PROJECT_INFO.firestoreDatabaseId}
 * Mahasiswa RPL • STMIK IKMI CIREBON
 */
object FirebaseRepository {

    private const val DATABASE_ID = "${FIREBASE_PROJECT_INFO.firestoreDatabaseId}"

    val auth: FirebaseAuth by lazy { FirebaseAuth.getInstance() }
    val db: FirebaseFirestore by lazy { FirebaseFirestore.getInstance(DATABASE_ID) }

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

    suspend fun saveRegisteredAccount(account: RegisteredAccountDoc): Result<Unit> = runCatching {
        val uid = currentUid ?: throw IllegalStateException("User belum login")
        val docId = account.email.replace(Regex("[^a-zA-Z0-9_-]"), "_")
        val data = hashMapOf(
            "ownerId" to uid,
            "name" to account.name,
            "email" to account.email,
            "phone" to account.phone,
            "nim" to account.nim,
            "prodi" to account.prodi,
            "campus" to account.campus,
            "memberLevel" to account.memberLevel,
            "passwordHash" to account.passwordHash,
            "createdAt" to FieldValue.serverTimestamp(),
            "updatedAt" to FieldValue.serverTimestamp()
        )
        db.collection("users").document(uid)
            .collection("accounts").document(docId)
            .set(data).await()
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

    suspend fun updateOrderStatus(orderId: String, nextStatus: String, etaText: String): Result<Unit> = runCatching {
        val uid = currentUid ?: throw IllegalStateException("User belum login")
        db.collection("users").document(uid)
            .collection("orders").document(orderId)
            .update(
                mapOf(
                    "status" to nextStatus,
                    "etaText" to etaText,
                    "updatedAt" to FieldValue.serverTimestamp()
                )
            ).await()
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
}
`,
  },
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/model/Models.kt',
    fileName: 'Models.kt',
    folder: 'java/model',
    language: 'kotlin',
    description: 'Data Classes Kotlin (@Parcelize) sesuai skema koleksi Cloud Firestore',
    content: `package id.ac.ikmi.lokamart.model

import android.os.Parcelable
import com.google.firebase.Timestamp
import kotlinx.parcelize.Parcelize

@Parcelize
data class UserProfile(
    val ownerId: String = "",
    val name: String = "Fajar Pratama",
    val email: String = "fajar.pratama@mhs.ikmi.ac.id",
    val phone: String = "0812-3456-7890",
    val nim: String = "41220089",
    val prodi: String = "Rekayasa Perangkat Lunak (RPL)",
    val campus: String = "STMIK IKMI CIREBON",
    val memberLevel: String = "Member Perak",
    val createdAt: Timestamp? = null,
    val updatedAt: Timestamp? = null
) : Parcelable

@Parcelize
data class RegisteredAccountDoc(
    val ownerId: String = "",
    val name: String = "",
    val email: String = "",
    val phone: String = "",
    val nim: String = "",
    val prodi: String = "Rekayasa Perangkat Lunak (RPL)",
    val campus: String = "STMIK IKMI CIREBON",
    val memberLevel: String = "Member Perak",
    val passwordHash: String = ""
) : Parcelable

@Parcelize
data class Product(
    val id: String = "",
    val title: String = "",
    val price: Long = 0L,
    val originalPrice: Long? = null,
    val discountPercent: Int? = null,
    val rating: Double = 4.9,
    val reviewCount: Int = 0,
    val soldCount: String = "",
    val origin: String = "Cirebon",
    val badge: String = "Handmade",
    val category: String = "Tas Etnik",
    val storeId: String = "store-1",
    val storeName: String = "Galeri Kriya Troso & Cirebon",
    val variants: List<String> = emptyList(),
    val freeShipping: Boolean = true,
    val stockLeft: Int = 10
) : Parcelable

@Parcelize
data class CartItem(
    val id: String = "",
    val ownerId: String = "",
    val productId: String = "",
    val storeId: String = "",
    val storeName: String = "",
    val storeOrigin: String = "",
    val title: String = "",
    val variant: String = "",
    val price: Long = 0L,
    val quantity: Int = 1,
    val checked: Boolean = true,
    val badge: String = "Handmade"
) : Parcelable

@Parcelize
data class AddressItem(
    val id: String = "",
    val ownerId: String = "",
    val label: String = "Rumah",
    val recipient: String = "",
    val phoneOrSub: String = "",
    val fullAddress: String = "",
    val shortLabel: String = "Kesambi, Cirebon",
    val isMain: Boolean = true
) : Parcelable

@Parcelize
data class OrderDoc(
    val id: String = "",
    val ownerId: String = "",
    val orderNumber: String = "",
    val dateStr: String = "",
    val timeStr: String = "",
    val status: String = "Diproses",
    val storeId: String = "",
    val storeName: String = "",
    val storeOrigin: String = "",
    val subtotal: Long = 0L,
    val shippingFee: Long = 14000L,
    val shippingDiscount: Long = 14000L,
    val voucherDiscount: Long = 20000L,
    val serviceFee: Long = 1000L,
    val totalPayment: Long = 0L,
    val shippingService: String = "Reguler",
    val courierName: String = "J&T Express",
    val resiNumber: String = "",
    val etaText: String = "",
    val paymentMethod: String = "",
    val vaNumber: String = "1234 5678 90",
    val addressShort: String = "Kesambi, Cirebon",
    val itemsSummary: String = "",
    val reviewed: Boolean = false,
    val userRating: Int = 0
) : Parcelable
`,
  },

  // ===========================================================================
  // 2. SCREEN 1: SPLASHSCREEN (.kt & .xml)
  // ===========================================================================
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/SplashActivity.kt',
    fileName: 'SplashActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'splash',
    description: '1. SplashActivity.kt - Layar Pembuka & Inisialisasi Koneksi Firebase',
    content: `package id.ac.ikmi.lokamart.ui

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity
import id.ac.ikmi.lokamart.databinding.ActivitySplashBinding

class SplashActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySplashBinding
    private val handler = Handler(Looper.getMainLooper())
    private var progressStatus = 12

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)

        startSplashProgress()

        binding.btnToLogin.setOnClickListener {
            navigateToLogin()
        }

        binding.btnToRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
            finish()
        }
    }

    private fun startSplashProgress() {
        val runnable = object : Runnable {
            override fun run() {
                if (progressStatus < 100) {
                    progressStatus = (progressStatus + 12).coerceAtMost(100)
                    binding.progressSplash.progress = progressStatus
                    binding.tvProgressPercent.text = "$progressStatus%"
                    handler.postDelayed(this, 160L)
                } else {
                    navigateToLogin()
                }
            }
        }
        handler.postDelayed(runnable, 160L)
    }

    private fun navigateToLogin() {
        handler.removeCallbacksAndMessages(null)
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }

    override fun onDestroy() {
        handler.removeCallbacksAndMessages(null)
        super.onDestroy()
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_splash.xml',
    fileName: 'activity_splash.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'splash',
    description: '1. activity_splash.xml - ConstraintLayout Splashscreen LokaMart',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/primary_navy"
    android:padding="24dp">

    <TextView
        android:id="@+id/tvFlowPill"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingHorizontal="14dp"
        android:paddingVertical="6dp"
        android:text="ALUR APLIKASI: SPLASHSCREEN → LOGIN → BERANDA"
        android:textColor="@color/tertiary_amber"
        android:textSize="11sp"
        android:textStyle="bold"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <LinearLayout
        android:id="@+id/centerBrandContainer"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:orientation="vertical"
        app:layout_constraintBottom_toTopOf="@+id/bottomProgressContainer"
        app:layout_constraintTop_toBottomOf="@+id/tvFlowPill">

        <com.google.android.material.card.MaterialCardView
            android:layout_width="112dp"
            android:layout_height="112dp"
            app:cardBackgroundColor="@color/white"
            app:cardCornerRadius="28dp"
            app:cardElevation="12dp"
            app:strokeColor="@color/tertiary_amber"
            app:strokeWidth="2dp">

            <ImageView
                android:id="@+id/ivBrandLogo"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:contentDescription="@string/app_name"
                android:padding="16dp"
                android:src="@drawable/ic_lokamart_logo" />
        </com.google.android.material.card.MaterialCardView>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="18dp"
            android:letterSpacing="0.18"
            android:text="E-COMMERCE KRIYA NUSANTARA"
            android:textColor="@color/tertiary_amber"
            android:textSize="12sp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/tvAppTitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="4dp"
            android:text="LokaMart"
            android:textColor="@color/white"
            android:textSize="32sp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="290dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:gravity="center"
            android:text="Pasar Digital Kerajinan Tangan, Batik Trusmi, Anyaman Rotan &amp; Kuliner Khas UMKM Cirebon"
            android:textColor="#CCFFFFFF"
            android:textSize="13sp" />

        <com.google.android.material.card.MaterialCardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            app:cardBackgroundColor="#1AFFFFFF"
            app:cardCornerRadius="16dp"
            app:strokeColor="#26FFFFFF"
            app:strokeWidth="1dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="14dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="KARYA AKADEMIK MAHASISWA"
                    android:textColor="@color/tertiary_amber"
                    android:textSize="10sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="2dp"
                    android:text="RPL (Rekayasa Perangkat Lunak)"
                    android:textColor="@color/white"
                    android:textSize="14sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="STMIK IKMI CIREBON • Firebase Cloud Firestore"
                    android:textColor="#D9FFFFFF"
                    android:textSize="11sp" />
            </LinearLayout>
        </com.google.android.material.card.MaterialCardView>
    </LinearLayout>

    <LinearLayout
        android:id="@+id/bottomProgressContainer"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        app:layout_constraintBottom_toBottomOf="parent">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Memuat katalog kriya &amp; Firebase Firestore..."
                android:textColor="#CCFFFFFF"
                android:textSize="12sp" />

            <TextView
                android:id="@+id/tvProgressPercent"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="100%"
                android:textColor="@color/tertiary_amber"
                android:textSize="12sp"
                android:textStyle="bold" />
        </LinearLayout>

        <ProgressBar
            android:id="@+id/progressSplash"
            style="?android:attr/progressBarStyleHorizontal"
            android:layout_width="match_parent"
            android:layout_height="8dp"
            android:layout_marginTop="6dp"
            android:max="100"
            android:progress="100"
            android:progressTint="@color/tertiary_amber" />

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btnToLogin"
            android:layout_width="match_parent"
            android:layout_height="52dp"
            android:layout_marginTop="16dp"
            android:backgroundTint="@color/white"
            android:text="Lanjut ke Halaman Login"
            android:textAllCaps="false"
            android:textColor="@color/primary_navy"
            android:textStyle="bold"
            app:cornerRadius="12dp" />

        <TextView
            android:id="@+id/btnToRegister"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:gravity="center"
            android:padding="6dp"
            android:text="Belum punya akun? Daftar Akun Baru"
            android:textColor="#CCFFFFFF"
            android:textSize="12sp" />
    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
`,
  },

  // ===========================================================================
  // 3. SCREEN 2: LOGIN (.kt & .xml)
  // ===========================================================================
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/LoginActivity.kt',
    fileName: 'LoginActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'login',
    description: '2. LoginActivity.kt - Autentikasi Akun Mahasiswa & Firebase Auth',
    content: `package id.ac.ikmi.lokamart.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import id.ac.ikmi.lokamart.data.FirebaseRepository
import id.ac.ikmi.lokamart.databinding.ActivityLoginBinding
import id.ac.ikmi.lokamart.model.UserProfile
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.etEmailOrNim.setText("fajar.pratama@mhs.ikmi.ac.id")
        binding.etPassword.setText("password123")

        binding.btnSubmitLogin.setOnClickListener {
            val identifier = binding.etEmailOrNim.text.toString().trim()
            val password = binding.etPassword.text.toString()

            if (identifier.isEmpty() || password.isEmpty()) {
                Toast.makeText(
                    this,
                    "Harap isi Email/NIM dan Kata Sandi terlebih dahulu",
                    Toast.LENGTH_SHORT
                ).show()
                return@setOnClickListener
            }

            performLoginAndSyncFirestore(identifier)
        }

        binding.btnGoToRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun performLoginAndSyncFirestore(identifier: String) {
        binding.btnSubmitLogin.isEnabled = false
        binding.btnSubmitLogin.text = "Memverifikasi ke Firebase Firestore..."

        lifecycleScope.launch {
            val profile = UserProfile(
                ownerId = FirebaseRepository.currentUid ?: "mhs_ikmi_41220089",
                name = "Fajar Pratama",
                email = identifier,
                phone = "0812-3456-7890",
                nim = "41220089",
                prodi = "Rekayasa Perangkat Lunak (RPL)",
                campus = "STMIK IKMI CIREBON",
                memberLevel = "Member Perak"
            )

            if (FirebaseRepository.currentUid != null) {
                FirebaseRepository.upsertUserProfile(profile)
            }

            Toast.makeText(
                this@LoginActivity,
                "Login berhasil! Selamat datang di Beranda, \${profile.name}",
                Toast.LENGTH_SHORT
            ).show()

            startActivity(Intent(this@LoginActivity, MainActivity::class.java))
            finish()
        }
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_login.xml',
    fileName: 'activity_login.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'login',
    description: '2. activity_login.xml - Layout Form Login & Daftar Akun Database',
    content: `<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg"
    android:fillViewport="true">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <com.google.android.material.card.MaterialCardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:cardBackgroundColor="@color/primary_navy"
            app:cardCornerRadius="20dp"
            app:cardElevation="4dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:gravity="center"
                android:orientation="vertical"
                android:padding="20dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="Login LokaMart Nusantara"
                    android:textColor="@color/white"
                    android:textSize="20sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="4dp"
                    android:gravity="center"
                    android:text="Silakan masuk terlebih dahulu untuk mengakses Beranda &amp; Katalog Kriya UMKM."
                    android:textColor="#D9FFFFFF"
                    android:textSize="12sp" />
            </LinearLayout>
        </com.google.android.material.card.MaterialCardView>

        <com.google.android.material.card.MaterialCardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            app:cardBackgroundColor="@color/white"
            app:cardCornerRadius="16dp"
            app:cardElevation="2dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="18dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="Masuk ke Akun Anda"
                    android:textColor="@color/primary_navy"
                    android:textSize="16sp"
                    android:textStyle="bold" />

                <com.google.android.material.textfield.TextInputLayout
                    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="14dp"
                    android:hint="Email">

                    <com.google.android.material.textfield.TextInputEditText
                        android:id="@+id/etEmailOrNim"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:inputType="textEmailAddress" />
                </com.google.android.material.textfield.TextInputLayout>

                <com.google.android.material.textfield.TextInputLayout
                    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="12dp"
                    android:hint="Kata Sandi"
                    app:endIconMode="password_toggle">

                    <com.google.android.material.textfield.TextInputEditText
                        android:id="@+id/etPassword"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:inputType="textPassword" />
                </com.google.android.material.textfield.TextInputLayout>

                <com.google.android.material.button.MaterialButton
                    android:id="@+id/btnSubmitLogin"
                    android:layout_width="match_parent"
                    android:layout_height="52dp"
                    android:layout_marginTop="18dp"
                    android:backgroundTint="@color/primary_navy"
                    android:text="Masuk ke Beranda LokaMart"
                    android:textAllCaps="false"
                    android:textColor="@color/white"
                    android:textStyle="bold"
                    app:cornerRadius="12dp" />

                <com.google.android.material.button.MaterialButton
                    android:id="@+id/btnGoToRegister"
                    style="@style/Widget.MaterialComponents.Button.OutlinedButton"
                    android:layout_width="match_parent"
                    android:layout_height="48dp"
                    android:layout_marginTop="8dp"
                    android:text="Daftar Akun Baru"
                    android:textAllCaps="false"
                    android:textColor="@color/primary_navy"
                    app:cornerRadius="12dp" />
            </LinearLayout>
        </com.google.android.material.card.MaterialCardView>
    </LinearLayout>
</ScrollView>
`,
  },

  // ===========================================================================
  // 4. SCREEN 3: REGISTER (.kt & .xml)
  // ===========================================================================
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/RegisterActivity.kt',
    fileName: 'RegisterActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'register',
    description: '3. RegisterActivity.kt - Registrasi Akun Baru (Nama Lengkap, Email, Kata Sandi, Konfirmasi Kata Sandi)',
    content: `package id.ac.ikmi.lokamart.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import id.ac.ikmi.lokamart.data.FirebaseRepository
import id.ac.ikmi.lokamart.databinding.ActivityRegisterBinding
import id.ac.ikmi.lokamart.model.RegisteredAccountDoc
import kotlinx.coroutines.launch

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnSubmitRegister.setOnClickListener {
            val name = binding.etFullName.text.toString().trim()
            val email = binding.etEmail.text.toString().trim()
            val pass = binding.etPassword.text.toString()
            val confirm = binding.etConfirmPassword.text.toString()

            if (name.isEmpty() || email.isEmpty() || pass.length < 6) {
                Toast.makeText(this, "Lengkapi nama lengkap, email, dan kata sandi min. 6 karakter", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (pass != confirm) {
                Toast.makeText(this, "Kata Sandi dan Konfirmasi Kata Sandi tidak sama!", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            lifecycleScope.launch {
                val doc = RegisteredAccountDoc(
                    ownerId = FirebaseRepository.currentUid ?: "user_1",
                    name = name,
                    email = email,
                    memberLevel = "Member Perak",
                    passwordHash = pass
                )
                FirebaseRepository.saveRegisteredAccount(doc)
                Toast.makeText(
                    this@RegisterActivity,
                    "Pendaftaran akun \$name berhasil! Silakan Login.",
                    Toast.LENGTH_LONG
                ).show()
                startActivity(Intent(this@RegisterActivity, LoginActivity::class.java))
                finish()
            }
        }
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_register.xml',
    fileName: 'activity_register.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'register',
    description: '3. activity_register.xml - Layout Pendaftaran Akun Baru (4 Kolom)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg"
    android:fillViewport="true">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <com.google.android.material.card.MaterialCardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:cardBackgroundColor="@color/white"
            app:cardCornerRadius="16dp"
            app:cardElevation="2dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="18dp">

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:text="Formulir Pendaftaran"
                    android:textColor="@color/primary_navy"
                    android:textSize="16sp"
                    android:textStyle="bold" />

                <EditText
                    android:id="@+id/etFullName"
                    android:layout_width="match_parent"
                    android:layout_height="48dp"
                    android:layout_marginTop="12dp"
                    android:hint="Nama Lengkap"
                    android:inputType="textPersonName" />

                <EditText
                    android:id="@+id/etEmail"
                    android:layout_width="match_parent"
                    android:layout_height="48dp"
                    android:layout_marginTop="8dp"
                    android:hint="Email"
                    android:inputType="textEmailAddress" />

                <EditText
                    android:id="@+id/etPassword"
                    android:layout_width="match_parent"
                    android:layout_height="48dp"
                    android:layout_marginTop="8dp"
                    android:hint="Kata Sandi (Min. 6 karakter)"
                    android:inputType="textPassword" />

                <EditText
                    android:id="@+id/etConfirmPassword"
                    android:layout_width="match_parent"
                    android:layout_height="48dp"
                    android:layout_marginTop="8dp"
                    android:hint="Konfirmasi Kata Sandi"
                    android:inputType="textPassword" />

                <com.google.android.material.button.MaterialButton
                    android:id="@+id/btnSubmitRegister"
                    android:layout_width="match_parent"
                    android:layout_height="52dp"
                    android:layout_marginTop="16dp"
                    android:backgroundTint="@color/primary_navy"
                    android:text="Daftar Sekarang"
                    android:textAllCaps="false"
                    android:textColor="@color/white"
                    android:textStyle="bold"
                    app:cornerRadius="12dp" />
            </LinearLayout>
        </com.google.android.material.card.MaterialCardView>
    </LinearLayout>
</ScrollView>
`,
  },

  // ===========================================================================
  // 5. SCREEN 4: BERANDA (.kt & .xml)
  // ===========================================================================
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/BerandaFragment.kt',
    fileName: 'BerandaFragment.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'beranda',
    description: '4. BerandaFragment.kt - Storefront Utama, Flash Promo & Rekomendasi UMKM',
    content: `package id.ac.ikmi.lokamart.ui

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import id.ac.ikmi.lokamart.data.FirebaseRepository
import id.ac.ikmi.lokamart.databinding.FragmentBerandaBinding
import id.ac.ikmi.lokamart.model.CartItem
import kotlinx.coroutines.launch

class BerandaFragment : Fragment() {

    private var _binding: FragmentBerandaBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentBerandaBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.tvGreeting.text = "Halo, Fajar Pratama 👋"
        binding.tvCampusBadge.text = "Mahasiswa RPL • STMIK IKMI CIREBON"

        binding.btnAddFeaturedToCart.setOnClickListener {
            viewLifecycleOwner.lifecycleScope.launch {
                val item = CartItem(
                    id = "cart-\${System.currentTimeMillis()}",
                    ownerId = FirebaseRepository.currentUid ?: "user_1",
                    productId = "rec-1",
                    storeId = "store-1",
                    storeName = "Galeri Kriya Troso & Cirebon",
                    storeOrigin = "Kab. Jepara",
                    title = "Tas Selempang Kulit & Tenun Troso",
                    variant = "Tenun Hitam Navy",
                    price = 185000L,
                    quantity = 1,
                    checked = true,
                    badge = "Official Store"
                )
                FirebaseRepository.saveCartItem(item)
                Toast.makeText(
                    requireContext(),
                    "Produk ditambahkan ke Keranjang & Cloud Firestore!",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }

        binding.btnOpenCart.setOnClickListener {
            startActivity(Intent(requireContext(), KeranjangActivity::class.java))
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/fragment_beranda.xml',
    fileName: 'fragment_beranda.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'beranda',
    description: '4. fragment_beranda.xml - NestedScrollView Banner Kriya, Kategori & RecyclerView',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.core.widget.NestedScrollView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <!-- Greeting & Campus Banner -->
        <com.google.android.material.card.MaterialCardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:cardBackgroundColor="@color/primary_navy"
            app:cardCornerRadius="20dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="18dp">

                <TextView
                    android:id="@+id/tvCampusBadge"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="Mahasiswa RPL • STMIK IKMI CIREBON"
                    android:textColor="@color/tertiary_amber"
                    android:textSize="11sp"
                    android:textStyle="bold" />

                <TextView
                    android:id="@+id/tvGreeting"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="4dp"
                    android:text="Halo, Fajar Pratama"
                    android:textColor="@color/white"
                    android:textSize="20sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="4dp"
                    android:text="Koleksi Batik Mega Mendung, Anyaman Rotan Tegalwangi &amp; Kuliner Cirebon"
                    android:textColor="#D9FFFFFF"
                    android:textSize="12sp" />
            </LinearLayout>
        </com.google.android.material.card.MaterialCardView>

        <!-- Quick Actions -->
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="14dp"
            android:orientation="horizontal">

            <com.google.android.material.button.MaterialButton
                android:id="@+id/btnAddFeaturedToCart"
                android:layout_width="0dp"
                android:layout_height="48dp"
                android:layout_marginEnd="6dp"
                android:layout_weight="1"
                android:backgroundTint="@color/primary_navy"
                android:text="+ Keranjang (Firestore)"
                android:textAllCaps="false"
                app:cornerRadius="12dp" />

            <com.google.android.material.button.MaterialButton
                android:id="@+id/btnOpenCart"
                style="@style/Widget.MaterialComponents.Button.OutlinedButton"
                android:layout_width="0dp"
                android:layout_height="48dp"
                android:layout_marginStart="6dp"
                android:layout_weight="1"
                android:text="Buka Keranjang"
                android:textAllCaps="false"
                app:cornerRadius="12dp" />
        </LinearLayout>

        <!-- Product Grid RecyclerView -->
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="18dp"
            android:text="Rekomendasi Kriya Pilihan"
            android:textColor="@color/primary_navy"
            android:textSize="16sp"
            android:textStyle="bold" />

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/rvRecommendedProducts"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="10dp"
            android:nestedScrollingEnabled="false" />
    </LinearLayout>
</androidx.core.widget.NestedScrollView>
`,
  },

  // ===========================================================================
  // 6. SCREEN 5 & 6: KATEGORI & PENCARIAN (.kt & .xml)
  // ===========================================================================
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/KategoriFragment.kt',
    fileName: 'KategoriFragment.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'kategori',
    description: '5. KategoriFragment.kt - Filter 7 Kategori Kriya & Urutan Harga',
    content: `package id.ac.ikmi.lokamart.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import id.ac.ikmi.lokamart.databinding.FragmentKategoriBinding

class KategoriFragment : Fragment() {

    private var _binding: FragmentKategoriBinding? = null
    private val binding get() = _binding!!

    private val categories = listOf(
        "Semua", "Tas Etnik", "Batik Lokal", "Aksesoris",
        "Alat Tulis", "Kerajinan Rotan", "Kuliner Khas", "Dekorasi"
    )

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentKategoriBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.tvActiveCategoryTitle.text = "Kategori: \${categories.first()}"
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/fragment_kategori.xml',
    fileName: 'fragment_kategori.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'kategori',
    description: '5. fragment_kategori.xml - ChipGroup Kategori & Grid Produk',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/tvActiveCategoryTitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Eksplorasi Kategori Kriya"
        android:textColor="@color/primary_navy"
        android:textSize="18sp"
        android:textStyle="bold" />

    <com.google.android.material.chip.ChipGroup
        android:id="@+id/chipGroupCategories"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        app:singleSelection="true" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rvCategoryCatalog"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_marginTop="12dp"
        android:layout_weight="1" />
</LinearLayout>
`,
  },
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/PencarianActivity.kt',
    fileName: 'PencarianActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'pencarian',
    description: '6. PencarianActivity.kt - Autocomplete & Pencarian Katalog Real-Time',
    content: `package id.ac.ikmi.lokamart.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.widget.doAfterTextChanged
import id.ac.ikmi.lokamart.databinding.ActivityPencarianBinding

class PencarianActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPencarianBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPencarianBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.etSearchInput.setText("Tas Anyaman")
        binding.etSearchInput.doAfterTextChanged { query ->
            binding.tvSearchResultSummary.text = "Hasil pencarian untuk: '\${query.toString()}'"
        }
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_pencarian.xml',
    fileName: 'activity_pencarian.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'pencarian',
    description: '6. activity_pencarian.xml - SearchBar & Daftar Hasil Produk',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/etSearchInput"
        android:layout_width="match_parent"
        android:layout_height="48dp"
        android:background="@color/white"
        android:hint="Cari produk kriya, batik, rotan..."
        android:inputType="text"
        android:paddingHorizontal="14dp" />

    <TextView
        android:id="@+id/tvSearchResultSummary"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:text="Hasil pencarian untuk: 'Tas Anyaman'"
        android:textColor="@color/primary_navy"
        android:textSize="14sp"
        android:textStyle="bold" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rvSearchResults"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_marginTop="8dp"
        android:layout_weight="1" />
</LinearLayout>
`,
  },

  // ===========================================================================
  // 7. SCREEN 7: DETAIL PRODUK (.kt & .xml)
  // ===========================================================================
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/DetailProdukActivity.kt',
    fileName: 'DetailProdukActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'detail-produk',
    description: '7. DetailProdukActivity.kt - Pilih Varian, Kuantitas & Tambah ke Firestore Cart',
    content: `package id.ac.ikmi.lokamart.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import id.ac.ikmi.lokamart.data.FirebaseRepository
import id.ac.ikmi.lokamart.databinding.ActivityDetailProdukBinding
import id.ac.ikmi.lokamart.model.CartItem
import kotlinx.coroutines.launch

class DetailProdukActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDetailProdukBinding
    private var selectedVariant = "Tenun Hitam Navy"
    private var quantity = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailProdukBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.tvProductTitle.text = "Tas Selempang Kulit & Tenun Troso"
        binding.tvProductPrice.text = "Rp185.000"

        binding.btnAddCart.setOnClickListener {
            lifecycleScope.launch {
                val newItem = CartItem(
                    id = "cart-\${System.currentTimeMillis()}",
                    ownerId = FirebaseRepository.currentUid ?: "user_1",
                    productId = "rec-1",
                    storeId = "store-1",
                    storeName = "Galeri Kriya Troso & Cirebon",
                    storeOrigin = "Kab. Jepara",
                    title = binding.tvProductTitle.text.toString(),
                    variant = selectedVariant,
                    price = 185000L,
                    quantity = quantity,
                    checked = true,
                    badge = "Official Store"
                )
                FirebaseRepository.saveCartItem(newItem)
                Toast.makeText(
                    this@DetailProdukActivity,
                    "\${quantity}x produk masuk ke Keranjang Cloud Firestore!",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }

        binding.btnBuyNow.setOnClickListener {
            startActivity(Intent(this, CheckoutActivity::class.java))
        }
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_detail_produk.xml',
    fileName: 'activity_detail_produk.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'detail-produk',
    description: '7. activity_detail_produk.xml - Galeri Produk, Spesifikasi & Bottom Action Bar',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg">

    <ScrollView
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toTopOf="@+id/bottomActionCard"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:padding="16dp">

            <TextView
                android:id="@+id/tvProductPrice"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Rp185.000"
                android:textColor="@color/primary_navy"
                android:textSize="24sp"
                android:textStyle="bold" />

            <TextView
                android:id="@+id/tvProductTitle"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="4dp"
                android:text="Tas Selempang Kulit &amp; Tenun Troso"
                android:textColor="@color/on_surface"
                android:textSize="18sp"
                android:textStyle="bold" />

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="12dp"
                android:text="Spesifikasi Pengrajin: Kulit Sapi Asli &amp; Tenun Troso Jepara (26 x 8 x 18 cm)."
                android:textColor="#43474F"
                android:textSize="13sp" />
        </LinearLayout>
    </ScrollView>

    <com.google.android.material.card.MaterialCardView
        android:id="@+id/bottomActionCard"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        app:cardBackgroundColor="@color/white"
        app:cardElevation="12dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:padding="12dp">

            <com.google.android.material.button.MaterialButton
                android:id="@+id/btnAddCart"
                style="@style/Widget.MaterialComponents.Button.OutlinedButton"
                android:layout_width="0dp"
                android:layout_height="48dp"
                android:layout_marginEnd="6dp"
                android:layout_weight="1"
                android:text="+ Keranjang"
                android:textAllCaps="false"
                app:cornerRadius="12dp" />

            <com.google.android.material.button.MaterialButton
                android:id="@+id/btnBuyNow"
                android:layout_width="0dp"
                android:layout_height="48dp"
                android:layout_marginStart="6dp"
                android:layout_weight="1"
                android:backgroundTint="@color/primary_navy"
                android:text="Beli Sekarang"
                android:textAllCaps="false"
                android:textColor="@color/white"
                app:cornerRadius="12dp" />
        </LinearLayout>
    </com.google.android.material.card.MaterialCardView>
</androidx.constraintlayout.widget.ConstraintLayout>
`,
  },

  // ===========================================================================
  // 8. SCREEN 8, 9, 10: KERANJANG, ALAMAT & CHECKOUT (.kt & .xml)
  // ===========================================================================
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/KeranjangActivity.kt',
    fileName: 'KeranjangActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'keranjang',
    description: '8. KeranjangActivity.kt - Sinkronisasi Real-Time Subkoleksi /cart di Firestore',
    content: `package id.ac.ikmi.lokamart.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.google.firebase.firestore.ListenerRegistration
import id.ac.ikmi.lokamart.data.FirebaseRepository
import id.ac.ikmi.lokamart.databinding.ActivityKeranjangBinding
import kotlinx.coroutines.launch
import java.text.NumberFormat
import java.util.Locale

class KeranjangActivity : AppCompatActivity() {

    private lateinit var binding: ActivityKeranjangBinding
    private var cartListener: ListenerRegistration? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityKeranjangBinding.inflate(layoutInflater)
        setContentView(binding.root)

        cartListener = FirebaseRepository.listenToCart { items ->
            val total = items.filter { it.checked }.sumOf { it.price * it.quantity }
            val rupiah = NumberFormat.getCurrencyInstance(Locale("id", "ID")).format(total)
            binding.tvTotalCartPrice.text = rupiah
            binding.tvCartCountBadge.text = "\${items.size} Produk di Cloud Firestore"
        }

        binding.btnCheckoutNow.setOnClickListener {
            lifecycleScope.launch {
                Toast.makeText(this@KeranjangActivity, "Lanjut ke Checkout Pembayaran", Toast.LENGTH_SHORT).show()
                startActivity(Intent(this@KeranjangActivity, CheckoutActivity::class.java))
            }
        }
    }

    override fun onDestroy() {
        cartListener?.remove()
        super.onDestroy()
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_keranjang.xml',
    fileName: 'activity_keranjang.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'keranjang',
    description: '8. activity_keranjang.xml - Daftar Item Keranjang & Ringkasan Harga',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/tvCartCountBadge"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Keranjang Belanja (Cloud Firestore)"
        android:textColor="@color/primary_navy"
        android:textSize="16sp"
        android:textStyle="bold" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rvCartItems"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_marginTop="12dp"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center_vertical"
        android:orientation="horizontal"
        android:paddingTop="12dp">

        <TextView
            android:id="@+id/tvTotalCartPrice"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="Rp250.000"
            android:textColor="@color/primary_navy"
            android:textSize="18sp"
            android:textStyle="bold" />

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btnCheckoutNow"
            android:layout_width="wrap_content"
            android:layout_height="48dp"
            android:backgroundTint="@color/primary_navy"
            android:text="Checkout Sekarang"
            android:textAllCaps="false"
            android:textColor="@color/white"
            app:cornerRadius="12dp" />
    </LinearLayout>
</LinearLayout>
`,
  },
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/AlamatActivity.kt',
    fileName: 'AlamatActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'alamat',
    description: '9. AlamatActivity.kt - Kelola Alamat Pengiriman Cirebon di Cloud Firestore',
    content: `package id.ac.ikmi.lokamart.ui

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import id.ac.ikmi.lokamart.data.FirebaseRepository
import id.ac.ikmi.lokamart.databinding.ActivityAlamatBinding
import id.ac.ikmi.lokamart.model.AddressItem
import kotlinx.coroutines.launch

class AlamatActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAlamatBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAlamatBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnSaveAddress.setOnClickListener {
            lifecycleScope.launch {
                val newAddr = AddressItem(
                    id = "addr_\${System.currentTimeMillis()}",
                    ownerId = FirebaseRepository.currentUid ?: "user_1",
                    label = binding.etLabel.text.toString().ifEmpty { "Kampus" },
                    recipient = binding.etRecipient.text.toString().ifEmpty { "Fajar Pratama" },
                    phoneOrSub = "(0812-3456-7890)",
                    fullAddress = binding.etFullAddress.text.toString().ifEmpty {
                        "Kampus STMIK IKMI Cirebon, Jl. Perjuangan No. 10B, Kesambi, Kota Cirebon"
                    },
                    shortLabel = "Kesambi, Cirebon",
                    isMain = true
                )
                FirebaseRepository.saveAddress(newAddr)
                Toast.makeText(this@AlamatActivity, "Alamat tersimpan ke Cloud Firestore!", Toast.LENGTH_SHORT).show()
                finish()
            }
        }
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_alamat.xml',
    fileName: 'activity_alamat.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'alamat',
    description: '9. activity_alamat.xml - Daftar & Form Tambah Alamat Pengiriman',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Pilih Alamat Pengiriman (Cirebon &amp; Sekitarnya)"
        android:textColor="@color/primary_navy"
        android:textSize="16sp"
        android:textStyle="bold" />

    <EditText
        android:id="@+id/etLabel"
        android:layout_width="match_parent"
        android:layout_height="48dp"
        android:layout_marginTop="12dp"
        android:hint="Label Alamat (Rumah / Kampus STMIK IKMI)" />

    <EditText
        android:id="@+id/etRecipient"
        android:layout_width="match_parent"
        android:layout_height="48dp"
        android:layout_marginTop="8dp"
        android:hint="Nama Penerima" />

    <EditText
        android:id="@+id/etFullAddress"
        android:layout_width="match_parent"
        android:layout_height="80dp"
        android:layout_marginTop="8dp"
        android:gravity="top"
        android:hint="Alamat Lengkap di Cirebon" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnSaveAddress"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginTop="16dp"
        android:backgroundTint="@color/primary_navy"
        android:text="Simpan Alamat ke Cloud Firestore"
        android:textAllCaps="false"
        android:textColor="@color/white"
        app:cornerRadius="12dp" />
</LinearLayout>
`,
  },
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/CheckoutActivity.kt',
    fileName: 'CheckoutActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'checkout',
    description: '10. CheckoutActivity.kt - Buat Transaksi Baru ke Koleksi /orders Firestore',
    content: `package id.ac.ikmi.lokamart.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import id.ac.ikmi.lokamart.data.FirebaseRepository
import id.ac.ikmi.lokamart.databinding.ActivityCheckoutBinding
import id.ac.ikmi.lokamart.model.OrderDoc
import kotlinx.coroutines.launch

class CheckoutActivity : AppCompatActivity() {

    private lateinit var binding: ActivityCheckoutBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCheckoutBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnPlaceOrder.setOnClickListener {
            lifecycleScope.launch {
                val orderId = "ord_\${System.currentTimeMillis()}"
                val orderNumber = "LKM-2026-\${(1000..9999).random()}"
                val newOrder = OrderDoc(
                    id = orderId,
                    ownerId = FirebaseRepository.currentUid ?: "user_1",
                    orderNumber = orderNumber,
                    dateStr = "Hari Ini",
                    timeStr = "Hari Ini, WIB",
                    status = "Menunggu Pembayaran",
                    storeId = "store-1",
                    storeName = "Galeri Kriya Troso & Cirebon",
                    storeOrigin = "Cirebon & Jepara",
                    subtotal = 250000L,
                    shippingFee = 14000L,
                    shippingDiscount = 14000L,
                    voucherDiscount = 20000L,
                    serviceFee = 1000L,
                    totalPayment = 231000L,
                    shippingService = "Reguler",
                    courierName = "J&T Express",
                    resiNumber = "JT-\${(100000000..999999999).random()}",
                    etaText = "Estimasi tiba: 2 - 3 Hari Kerja",
                    paymentMethod = "BCA Virtual Account (123 456 7890)",
                    vaNumber = "1234 5678 90",
                    addressShort = "Kesambi, Cirebon",
                    itemsSummary = "1x Tas Selempang Kulit & Tenun Troso; 1x Tote Bag Mega Mendung"
                )
                FirebaseRepository.saveOrder(newOrder)
                Toast.makeText(
                    this@CheckoutActivity,
                    "Pesanan \$orderNumber tersimpan ke Firebase Firestore!",
                    Toast.LENGTH_SHORT
                ).show()
                startActivity(Intent(this@CheckoutActivity, PembayaranVAActivity::class.java))
                finish()
            }
        }
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_checkout.xml',
    fileName: 'activity_checkout.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'checkout',
    description: '10. activity_checkout.xml - Opsi Kurir, Metode Bayar VA/LokaPay & Ringkasan Tagihan',
    content: `<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Checkout &amp; Pengiriman"
            android:textColor="@color/primary_navy"
            android:textSize="18sp"
            android:textStyle="bold" />

        <com.google.android.material.card.MaterialCardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="12dp"
            app:cardBackgroundColor="@color/white"
            app:cardCornerRadius="16dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="16dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="Total Tagihan: Rp231.000"
                    android:textColor="@color/primary_navy"
                    android:textSize="18sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="4dp"
                    android:text="Termasuk Gratis Ongkir &amp; Voucher Kriya Rp20.000"
                    android:textColor="#43474F"
                    android:textSize="12sp" />
            </LinearLayout>
        </com.google.android.material.card.MaterialCardView>

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btnPlaceOrder"
            android:layout_width="match_parent"
            android:layout_height="52dp"
            android:layout_marginTop="18dp"
            android:backgroundTint="@color/primary_navy"
            android:text="Buat Pesanan &amp; Simpan ke Firestore"
            android:textAllCaps="false"
            android:textColor="@color/white"
            android:textStyle="bold"
            app:cornerRadius="12dp" />
    </LinearLayout>
</ScrollView>
`,
  },

  // ===========================================================================
  // 9. SCREEN 11, 12, 13, 14, 15: VA, BERHASIL, PESANAN, DETAIL PESANAN, PROFIL
  // ===========================================================================
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/PembayaranVAActivity.kt',
    fileName: 'PembayaranVAActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'pembayaran-va',
    description: '11. PembayaranVAActivity.kt - Simulasi Pembayaran Virtual Account & Update Status Firestore',
    content: `package id.ac.ikmi.lokamart.ui

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import id.ac.ikmi.lokamart.data.FirebaseRepository
import id.ac.ikmi.lokamart.databinding.ActivityPembayaranVaBinding
import kotlinx.coroutines.launch

class PembayaranVAActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPembayaranVaBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPembayaranVaBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnCopyVa.setOnClickListener {
            val clipboard = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
            clipboard.setPrimaryClip(ClipData.newPlainText("VA", "1234567890"))
            Toast.makeText(this, "Nomor VA disalin!", Toast.LENGTH_SHORT).show()
        }

        binding.btnSimulatePaySuccess.setOnClickListener {
            lifecycleScope.launch {
                FirebaseRepository.updateOrderStatus("ord_1", "Diproses", "Menunggu penjemputan kurir")
                startActivity(Intent(this@PembayaranVAActivity, PembayaranBerhasilActivity::class.java))
                finish()
            }
        }
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_pembayaran_va.xml',
    fileName: 'activity_pembayaran_va.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'pembayaran-va',
    description: '11. activity_pembayaran_va.xml - Kartu Nomor VA BCA/Mandiri/BRI & Tombol Konfirmasi',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Pembayaran Virtual Account"
        android:textColor="@color/primary_navy"
        android:textSize="18sp"
        android:textStyle="bold" />

    <TextView
        android:id="@+id/tvVaNumber"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:text="1234 5678 90"
        android:textColor="@color/primary_navy"
        android:textSize="26sp"
        android:textStyle="bold" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnCopyVa"
        style="@style/Widget.MaterialComponents.Button.OutlinedButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:text="Salin Nomor VA"
        android:textAllCaps="false" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnSimulatePaySuccess"
        android:layout_width="match_parent"
        android:layout_height="52dp"
        android:layout_marginTop="24dp"
        android:backgroundTint="@color/primary_navy"
        android:text="Simulasi Bayar Lunas (Update Firestore)"
        android:textAllCaps="false"
        android:textColor="@color/white"
        app:cornerRadius="12dp" />
</LinearLayout>
`,
  },
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/PembayaranBerhasilActivity.kt',
    fileName: 'PembayaranBerhasilActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'pembayaran-berhasil',
    description: '12. PembayaranBerhasilActivity.kt - Konfirmasi Pembayaran Lunas & Cetak Resi',
    content: `package id.ac.ikmi.lokamart.ui

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import id.ac.ikmi.lokamart.databinding.ActivityPembayaranBerhasilBinding

class PembayaranBerhasilActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPembayaranBerhasilBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPembayaranBerhasilBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnTrackOrder.setOnClickListener {
            startActivity(Intent(this, DetailPesananActivity::class.java))
            finish()
        }
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_pembayaran_berhasil.xml',
    fileName: 'activity_pembayaran_berhasil.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'pembayaran-berhasil',
    description: '12. activity_pembayaran_berhasil.xml - Bukti Lunas & Nomor Resi Otomatis',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="24dp">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Pembayaran Berhasil!"
        android:textColor="@color/primary_navy"
        android:textSize="22sp"
        android:textStyle="bold" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:gravity="center"
        android:text="Status transaksi di Cloud Firestore telah diperbarui menjadi DIPROSES."
        android:textColor="#43474F"
        android:textSize="13sp" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnTrackOrder"
        android:layout_width="match_parent"
        android:layout_height="52dp"
        android:layout_marginTop="24dp"
        android:backgroundTint="@color/primary_navy"
        android:text="Lihat Rincian &amp; Lacak Pesanan"
        android:textAllCaps="false"
        android:textColor="@color/white"
        app:cornerRadius="12dp" />
</LinearLayout>
`,
  },
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/PesananFragment.kt',
    fileName: 'PesananFragment.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'pesanan',
    description: '13. PesananFragment.kt - Daftar Riwayat Transaksi Real-Time dari Firestore',
    content: `package id.ac.ikmi.lokamart.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.google.firebase.firestore.ListenerRegistration
import id.ac.ikmi.lokamart.data.FirebaseRepository
import id.ac.ikmi.lokamart.databinding.FragmentPesananBinding

class PesananFragment : Fragment() {

    private var _binding: FragmentPesananBinding? = null
    private val binding get() = _binding!!
    private var ordersListener: ListenerRegistration? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentPesananBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        ordersListener = FirebaseRepository.listenToOrders { orders ->
            binding.tvOrdersHeader.text = "Daftar Pesanan (\${orders.size} Transaksi di Firestore)"
        }
    }

    override fun onDestroyView() {
        ordersListener?.remove()
        super.onDestroyView()
        _binding = null
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/fragment_pesanan.xml',
    fileName: 'fragment_pesanan.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'pesanan',
    description: '13. fragment_pesanan.xml - Tab Status Pesanan & RecyclerView Transaksi',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/tvOrdersHeader"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Riwayat Pesanan Anda"
        android:textColor="@color/primary_navy"
        android:textSize="18sp"
        android:textStyle="bold" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rvOrders"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_marginTop="12dp"
        android:layout_weight="1" />
</LinearLayout>
`,
  },
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/DetailPesananActivity.kt',
    fileName: 'DetailPesananActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'detail-pesanan',
    description: '14. DetailPesananActivity.kt - Pelacakan Tahap 1-4 & Update Status Kurir',
    content: `package id.ac.ikmi.lokamart.ui

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import id.ac.ikmi.lokamart.data.FirebaseRepository
import id.ac.ikmi.lokamart.databinding.ActivityDetailPesananBinding
import kotlinx.coroutines.launch

class DetailPesananActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDetailPesananBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailPesananBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnAdvanceOrderStage.setOnClickListener {
            lifecycleScope.launch {
                FirebaseRepository.updateOrderStatus(
                    orderId = "ord_1",
                    nextStatus = "Selesai",
                    etaText = "Telah diterima pembeli"
                )
                Toast.makeText(
                    this@DetailPesananActivity,
                    "Status pesanan diupdate ke Cloud Firestore!",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_detail_pesanan.xml',
    fileName: 'activity_detail_pesanan.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'detail-pesanan',
    description: '14. activity_detail_pesanan.xml - Stepper Pelacakan Kurir & Rincian Resi',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Rincian &amp; Lacak Pesanan"
        android:textColor="@color/primary_navy"
        android:textSize="18sp"
        android:textStyle="bold" />

    <TextView
        android:id="@+id/tvResiNumber"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:text="Resi J&amp;T Express: JT-9283746210"
        android:textColor="#216393"
        android:textSize="13sp"
        android:textStyle="bold" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnAdvanceOrderStage"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginTop="20dp"
        android:backgroundTint="@color/primary_navy"
        android:text="Konfirmasi Pesanan Diterima (Firestore)"
        android:textAllCaps="false"
        android:textColor="@color/white"
        app:cornerRadius="12dp" />
</LinearLayout>
`,
  },
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/ProfilFragment.kt',
    fileName: 'ProfilFragment.kt',
    folder: 'java/ui',
    language: 'kotlin',
    relatedScreen: 'profil',
    description: '15. ProfilFragment.kt - Identitas Mahasiswa RPL STMIK IKMI & Update Profil Firestore',
    content: `package id.ac.ikmi.lokamart.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import id.ac.ikmi.lokamart.data.FirebaseRepository
import id.ac.ikmi.lokamart.databinding.FragmentProfilBinding
import id.ac.ikmi.lokamart.model.UserProfile
import kotlinx.coroutines.launch

class ProfilFragment : Fragment() {

    private var _binding: FragmentProfilBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProfilBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.etProfileName.setText("Fajar Pratama")
        binding.etProfileNim.setText("41220089")
        binding.etProfileProdi.setText("Rekayasa Perangkat Lunak (RPL)")
        binding.etProfileCampus.setText("STMIK IKMI CIREBON")

        binding.btnSaveProfileFirestore.setOnClickListener {
            viewLifecycleOwner.lifecycleScope.launch {
                val updated = UserProfile(
                    ownerId = FirebaseRepository.currentUid ?: "user_1",
                    name = binding.etProfileName.text.toString(),
                    email = "fajar.pratama@mhs.ikmi.ac.id",
                    phone = "0812-3456-7890",
                    nim = binding.etProfileNim.text.toString(),
                    prodi = binding.etProfileProdi.text.toString(),
                    campus = binding.etProfileCampus.text.toString(),
                    memberLevel = "Member Perak"
                )
                FirebaseRepository.upsertUserProfile(updated)
                Toast.makeText(
                    requireContext(),
                    "Profil Mahasiswa berhasil diperbarui di Cloud Firestore!",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/fragment_profil.xml',
    fileName: 'fragment_profil.xml',
    folder: 'res/layout',
    language: 'xml',
    relatedScreen: 'profil',
    description: '15. fragment_profil.xml - Kartu Member Perak, Identitas Kampus & Pengaturan Akun',
    content: `<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Profil Mahasiswa &amp; Akun LokaMart"
            android:textColor="@color/primary_navy"
            android:textSize="18sp"
            android:textStyle="bold" />

        <EditText
            android:id="@+id/etProfileName"
            android:layout_width="match_parent"
            android:layout_height="48dp"
            android:layout_marginTop="12dp"
            android:hint="Nama Mahasiswa" />

        <EditText
            android:id="@+id/etProfileNim"
            android:layout_width="match_parent"
            android:layout_height="48dp"
            android:layout_marginTop="8dp"
            android:hint="NIM" />

        <EditText
            android:id="@+id/etProfileProdi"
            android:layout_width="match_parent"
            android:layout_height="48dp"
            android:layout_marginTop="8dp"
            android:hint="Program Studi" />

        <EditText
            android:id="@+id/etProfileCampus"
            android:layout_width="match_parent"
            android:layout_height="48dp"
            android:layout_marginTop="8dp"
            android:hint="Institusi Kampus" />

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btnSaveProfileFirestore"
            android:layout_width="match_parent"
            android:layout_height="52dp"
            android:layout_marginTop="16dp"
            android:backgroundTint="@color/primary_navy"
            android:text="Simpan Profil ke Cloud Firestore"
            android:textAllCaps="false"
            android:textColor="@color/white"
            app:cornerRadius="12dp" />
    </LinearLayout>
</ScrollView>
`,
  },

  // ===========================================================================
  // 10. SHARED ANDROID STUDIO CONFIGS (MainActivity, Manifest, Gradle, Values)
  // ===========================================================================
  {
    path: 'app/src/main/java/id/ac/ikmi/lokamart/ui/MainActivity.kt',
    fileName: 'MainActivity.kt',
    folder: 'java/ui',
    language: 'kotlin',
    description: 'MainActivity.kt - Host BottomNavigationView (Beranda, Kategori, Keranjang, Pesanan, Profil)',
    content: `package id.ac.ikmi.lokamart.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import id.ac.ikmi.lokamart.R
import id.ac.ikmi.lokamart.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (savedInstanceState == null) {
            replaceFragment(BerandaFragment())
        }

        binding.bottomNavigation.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_beranda -> {
                    replaceFragment(BerandaFragment())
                    true
                }
                R.id.nav_kategori -> {
                    replaceFragment(KategoriFragment())
                    true
                }
                R.id.nav_pesanan -> {
                    replaceFragment(PesananFragment())
                    true
                }
                R.id.nav_profil -> {
                    replaceFragment(ProfilFragment())
                    true
                }
                else -> false
            }
        }
    }

    private fun replaceFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainer, fragment)
            .commit()
    }
}
`,
  },
  {
    path: 'app/src/main/res/layout/activity_main.xml',
    fileName: 'activity_main.xml',
    folder: 'res/layout',
    language: 'xml',
    description: 'activity_main.xml - Kontainer Fragment & BottomNavigationView Material 3',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/surface_bg">

    <FrameLayout
        android:id="@+id/fragmentContainer"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toTopOf="@+id/bottomNavigation"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottomNavigation"
        android:layout_width="0dp"
        android:layout_height="64dp"
        android:background="@color/white"
        app:itemIconTint="@color/primary_navy"
        app:itemTextColor="@color/primary_navy"
        app:labelVisibilityMode="labeled"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:menu="@menu/menu_bottom_nav" />

</androidx.constraintlayout.widget.ConstraintLayout>
`,
  },
  {
    path: 'app/src/main/res/menu/menu_bottom_nav.xml',
    fileName: 'menu_bottom_nav.xml',
    folder: 'res/menu',
    language: 'xml',
    description: 'menu_bottom_nav.xml - 5 Menu Navigasi Bawah LokaMart Android',
    content: `<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/nav_beranda"
        android:icon="@android:drawable/ic_menu_view"
        android:title="Beranda" />
    <item
        android:id="@+id/nav_kategori"
        android:icon="@android:drawable/ic_menu_sort_by_size"
        android:title="Kategori" />
    <item
        android:id="@+id/nav_keranjang"
        android:icon="@android:drawable/ic_menu_agenda"
        android:title="Keranjang" />
    <item
        android:id="@+id/nav_pesanan"
        android:icon="@android:drawable/ic_menu_recent_history"
        android:title="Pesanan" />
    <item
        android:id="@+id/nav_profil"
        android:icon="@android:drawable/ic_menu_myplaces"
        android:title="Profil" />
</menu>
`,
  },
  {
    path: 'app/src/main/res/values/colors.xml',
    fileName: 'colors.xml',
    folder: 'res/values',
    language: 'xml',
    description: 'colors.xml - Palet Warna Heritage Navy & Terracotta Cirebon',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_navy">#00254B</color>
    <color name="primary_container">#173B67</color>
    <color name="secondary_blue">#216393</color>
    <color name="tertiary_amber">#FFDBCA</color>
    <color name="accent_terracotta">#D97724</color>
    <color name="surface_bg">#F9F9FF</color>
    <color name="surface_card">#FFFFFF</color>
    <color name="on_surface">#041B3C</color>
    <color name="white">#FFFFFF</color>
</resources>
`,
  },
  {
    path: 'app/src/main/res/values/strings.xml',
    fileName: 'strings.xml',
    folder: 'res/values',
    language: 'xml',
    description: 'strings.xml - Resource String Aplikasi & Identitas STMIK IKMI Cirebon',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">LokaMart Nusantara</string>
    <string name="campus_identity">RPL (Rekayasa Perangkat Lunak) • STMIK IKMI CIREBON</string>
    <string name="firebase_project_id">${FIREBASE_PROJECT_INFO.projectId}</string>
    <string name="firestore_db_id">${FIREBASE_PROJECT_INFO.firestoreDatabaseId}</string>
</resources>
`,
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    fileName: 'AndroidManifest.xml',
    folder: 'manifest',
    language: 'xml',
    description: 'AndroidManifest.xml - Deklarasi Package id.ac.ikmi.lokamart, Izin Internet & Daftar Activity',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="id.ac.ikmi.lokamart">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/Theme.Material3.Light.NoActionBar">

        <activity
            android:name=".ui.SplashActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity android:name=".ui.LoginActivity" android:exported="false" />
        <activity android:name=".ui.RegisterActivity" android:exported="false" />
        <activity android:name=".ui.MainActivity" android:exported="false" />
        <activity android:name=".ui.PencarianActivity" android:exported="false" />
        <activity android:name=".ui.DetailProdukActivity" android:exported="false" />
        <activity android:name=".ui.KeranjangActivity" android:exported="false" />
        <activity android:name=".ui.AlamatActivity" android:exported="false" />
        <activity android:name=".ui.CheckoutActivity" android:exported="false" />
        <activity android:name=".ui.PembayaranVAActivity" android:exported="false" />
        <activity android:name=".ui.PembayaranBerhasilActivity" android:exported="false" />
        <activity android:name=".ui.DetailPesananActivity" android:exported="false" />
    </application>
</manifest>
`,
  },
  {
    path: 'app/build.gradle.kts',
    fileName: 'build.gradle.kts (:app)',
    folder: 'gradle',
    language: 'gradle',
    description: 'build.gradle.kts (Module :app) - Konfigurasi Kotlin, ViewBinding & Firebase SDK BoM',
    content: `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.gms.google-services")
    id("kotlin-parcelize")
}

android {
    namespace = "id.ac.ikmi.lokamart"
    compileSdk = 35

    defaultConfig {
        applicationId = "id.ac.ikmi.lokamart"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0-RPL-IKMI"
    }

    buildFeatures {
        viewBinding = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.constraintlayout:constraintlayout:2.2.0")
    implementation("androidx.recyclerview:recyclerview:1.3.2")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.9.0")

    // Firebase Cloud Firestore & Authentication
    implementation(platform("com.google.firebase:firebase-bom:33.6.0"))
    implementation("com.google.firebase:firebase-firestore-ktx")
    implementation("com.google.firebase:firebase-auth-ktx")
}
`,
  },
  {
    path: 'app/google-services.json',
    fileName: 'google-services.json',
    folder: 'gradle',
    language: 'json',
    description: 'google-services.json - Konfigurasi Resmi Firebase Project southern-flash-kcf5x',
    content: JSON.stringify(
      {
        project_info: {
          project_number: '240021215385',
          project_id: FIREBASE_PROJECT_INFO.projectId,
          storage_bucket: FIREBASE_PROJECT_INFO.storageBucket,
        },
        client: [
          {
            client_info: {
              mobilesdk_app_id: '1:240021215385:android:1539bfa7f8b56728e8c008',
              android_client_info: {
                package_name: 'id.ac.ikmi.lokamart',
              },
            },
            api_key: [
              {
                current_key: 'AIzaSyCK1UjMpXTjbPYzZ9IWKED0mHm_XDf9zyk',
              },
            ],
          },
        ],
        configuration_version: '1',
        firestore_database_id: FIREBASE_PROJECT_INFO.firestoreDatabaseId,
      },
      null,
      2
    ),
  },
];

export async function downloadAndroidStudioProjectZip(
  onProgress?: (msg: string) => void
): Promise<void> {
  onProgress?.('Menyiapkan paket project Android Studio (.kt, .xml, Gradle, Firebase)...');
  const zip = new JSZip();

  for (const file of ANDROID_STUDIO_PROJECT_FILES) {
    zip.file(file.path, file.content);
  }

  zip.file(
    'README-ANDROID-STUDIO.md',
    `# LokaMart Nusantara - Android Studio Project (Kotlin + XML + Firebase Firestore)

**Identitas Akademik:**
- **Program Studi:** Rekayasa Perangkat Lunak (RPL)
- **Kampus:** STMIK IKMI CIREBON
- **Package Name:** \`id.ac.ikmi.lokamart\`
- **Bahasa & UI:** Kotlin (\`.kt\`) + Android XML Layouts (\`res/layout/*.xml\`) + ViewBinding
- **Database:** Google Firebase Cloud Firestore & Firebase Authentication
- **Firebase Project ID:** \`${FIREBASE_PROJECT_INFO.projectId}\`
- **Firestore Database ID:** \`${FIREBASE_PROJECT_INFO.firestoreDatabaseId}\`

## Cara Membuka di Android Studio
1. Ekstrak file ZIP ini ke folder komputer Anda.
2. Buka **Android Studio** (Koala / Ladybug atau versi terbaru).
3. Pilih **Open** -> arahkan ke folder hasil ekstrak.
4. Tunggu proses **Gradle Sync** selesai.
5. Jalankan aplikasi di Emulator Android atau perangkat fisik via tombol **Run 'app' (Shift+F10)**.
`
  );

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'LokaMart-AndroidStudio-Kotlin-XML-Firebase.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  onProgress?.('Project Android Studio (.ZIP) berhasil diunduh!');
}
