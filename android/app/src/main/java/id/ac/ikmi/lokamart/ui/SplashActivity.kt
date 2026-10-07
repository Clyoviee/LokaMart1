package id.ac.ikmi.lokamart.ui

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
