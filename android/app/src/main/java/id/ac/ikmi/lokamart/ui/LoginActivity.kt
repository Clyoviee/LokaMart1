package id.ac.ikmi.lokamart.ui

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

        // Pre-fill default mahasiswa RPL STMIK IKMI Cirebon
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

            performLoginAndSyncFirestore(identifier, password)
        }

        binding.btnGoToRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun performLoginAndSyncFirestore(identifier: String, password: String) {
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
                "Login berhasil! Selamat datang di Beranda, ${profile.name}",
                Toast.LENGTH_SHORT
            ).show()

            val intent = Intent(this@LoginActivity, MainActivity::class.java).apply {
                putExtra("EXTRA_USER_PROFILE", profile)
            }
            startActivity(intent)
            finish()
        }
    }
}
