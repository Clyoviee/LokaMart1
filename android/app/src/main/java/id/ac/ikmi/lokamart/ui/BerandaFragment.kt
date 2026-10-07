package id.ac.ikmi.lokamart.ui

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
                    id = "cart-${System.currentTimeMillis()}",
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
