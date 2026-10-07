package id.ac.ikmi.lokamart.ui

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

        binding.toolbarCart.setNavigationOnClickListener { finish() }

        // Listen real-time to Cloud Firestore /users/{uid}/cart
        cartListener = FirebaseRepository.listenToCart { items ->
            val total = items.filter { it.checked }.sumOf { it.price * it.quantity }
            val rupiah = NumberFormat.getCurrencyInstance(Locale("id", "ID")).format(total)
            binding.tvTotalCartPrice.text = rupiah
            binding.tvCartCountBadge.text = "${items.size} Produk di Cloud Firestore"
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
