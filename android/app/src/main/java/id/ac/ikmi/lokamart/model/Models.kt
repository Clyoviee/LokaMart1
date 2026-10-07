package id.ac.ikmi.lokamart.model

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
