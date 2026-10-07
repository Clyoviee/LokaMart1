import React, { useEffect, useState } from 'react';
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_USER_PROFILE,
  LOKAMART_LOGO_URL,
  ScreenId,
  UserProfile,
} from '../data';
import { SafeImage } from './ShellComponents';

export interface RegisteredAccount extends UserProfile {
  password: string;
}

interface SplashScreenProps {
  onFinishSplash: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinishSplash,
  onNavigate,
}) => {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 8;
      });
    }, 150);

    const timer = setTimeout(() => {
      onFinishSplash();
    }, 2300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinishSplash]);

  return (
    <div className="flex flex-col justify-between w-full min-h-[780px] @lg:min-h-[680px] flex-1 bg-gradient-to-b from-[#041B3C] via-[#132A4E] to-[#3B2314] text-white px-margin @md:px-10 py-8 @lg:py-12 relative overflow-hidden select-none">
      {/* Decorative Heritage Background Ornaments */}
      <svg
        className="absolute -top-16 -right-16 w-72 h-72 text-white opacity-5 pointer-events-none"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <path d="M50 0 L100 50 L50 100 L0 50 Z"></path>
        <circle cx="50" cy="50" fill="none" r="32" stroke="currentColor" strokeWidth="3"></circle>
        <circle cx="50" cy="50" fill="none" r="18" stroke="currentColor" strokeWidth="2"></circle>
      </svg>
      <svg
        className="absolute -bottom-20 -left-20 w-80 h-80 text-[#D97724] opacity-10 pointer-events-none"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <path d="M50 5 L95 50 L50 95 L5 50 Z"></path>
        <path
          d="M50 20 L80 50 L50 80 L20 50 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        ></path>
      </svg>

      {/* Top Decorative Spacer */}
      <div className="relative z-10 pt-2" />

      {/* Center Brand Identity & Emblem */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-8">
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-[36px] bg-tertiary-fixed/20 blur-xl animate-pulse"></div>
          <div className="w-28 h-28 rounded-[28px] bg-surface-container-lowest p-4 shadow-2xl flex items-center justify-center relative border-2 border-tertiary-fixed/50">
            <SafeImage
              src={LOKAMART_LOGO_URL}
              alt="LokaMart Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-[#D97724] text-white flex items-center justify-center shadow-lg border-2 border-[#041B3C]">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
        </div>

        <span className="font-label-sm text-xs uppercase tracking-[0.22em] text-tertiary-fixed font-bold">
          E-Commerce Kriya Nusantara
        </span>
        <h1 className="font-headline-lg text-[32px] font-extrabold text-white tracking-tight mt-1">
          LokaMart
        </h1>
        <p className="font-body-md text-body-md text-white/80 max-w-[290px] mt-2 leading-relaxed">
          Pasar Digital Kerajinan Tangan, Batik Trusmi, Anyaman Rotan &amp; Kuliner Khas UMKM
          Cirebon
        </p>

        {/* Academic Attribution Card */}
        <div className="mt-6 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-[320px] flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">school</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-[10px] text-tertiary-fixed uppercase tracking-wider font-bold">
              Karya Akademik Mahasiswa
            </span>
            <span className="font-title-sm text-title-sm text-white font-bold leading-snug">
              RPL (Rekayasa Perangkat Lunak)
            </span>
            <span className="font-body-sm text-[11px] text-white/85 font-semibold">
              STMIK IKMI CIREBON
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar & Action */}
      <div className="relative z-10 flex flex-col gap-3 w-full max-w-md mx-auto">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-white/80 font-label-sm">
            <span>Memuat katalog kriya &amp; autentikasi...</span>
            <span className="font-bold text-tertiary-fixed">{Math.min(100, progress)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-tertiary-fixed to-[#D97724] transition-all duration-150"
              style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
          </div>
        </div>

        <button
          type="button"
          onClick={onFinishSplash}
          className="mt-2 w-full h-12 rounded-xl bg-surface-container-lowest text-primary font-label-lg text-label-lg font-bold shadow-lg flex items-center justify-center gap-2 active:scale-[0.99] transition-transform"
        >
          <span>Lanjut ke Halaman Login</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('register')}
          className="w-full py-1.5 text-center font-label-sm text-xs text-white/75 hover:text-white underline"
        >
          Belum punya akun? Daftar Akun Baru
        </button>
      </div>
    </div>
  );
};

interface LoginScreenProps {
  registeredAccounts: RegisteredAccount[];
  justRegisteredAccount?: RegisteredAccount | null;
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  registeredAccounts,
  justRegisteredAccount,
  onLoginSuccess,
  onNavigate,
  onShowToast,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState(
    justRegisteredAccount?.email || 'fajar.pratama@mhs.ikmi.ac.id'
  );
  const [password, setPassword] = useState(
    justRegisteredAccount?.password || 'password123'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('fajar.pratama@mhs.ikmi.ac.id');

  useEffect(() => {
    if (justRegisteredAccount) {
      setEmailOrPhone(justRegisteredAccount.email);
      setPassword(justRegisteredAccount.password);
    }
  }, [justRegisteredAccount]);

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const identifier = emailOrPhone.trim().toLowerCase();
    if (!identifier) {
      const msg = 'Silakan masukkan Email, Username, NIM, atau Nomor HP Anda.';
      setErrorMsg(msg);
      onShowToast(msg);
      return;
    }
    if (!password) {
      const msg = 'Silakan masukkan kata sandi (password) Anda.';
      setErrorMsg(msg);
      onShowToast(msg);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      const cleanDigits = identifier.replace(/\D/g, '');
      const matched = registeredAccounts.find(
        (acc) =>
          acc.email.trim().toLowerCase() === identifier ||
          acc.name.trim().toLowerCase() === identifier ||
          (acc.nim && acc.nim.trim().toLowerCase() === identifier) ||
          (cleanDigits.length >= 8 && acc.phone.replace(/\D/g, '') === cleanDigits)
      );

      // 1. Check if username / email exists in the registered accounts database
      if (!matched) {
        const notFoundMsg =
          'Login Gagal: Username / Email tidak ditemukan di database! Pastikan akun sudah terdaftar di menu Daftar (Register).';
        setErrorMsg(notFoundMsg);
        onShowToast('Login ditolak: Akun tidak ditemukan di database!');
        return;
      }

      // 2. Strictly check if password matches the account's password in the database
      if (matched.password !== password) {
        const wrongPassMsg =
          'Login Gagal: Kata sandi (Password) salah! Password tidak sesuai dengan data akun di database.';
        setErrorMsg(wrongPassMsg);
        onShowToast('Login ditolak: Password salah!');
        return;
      }

      // 3. Both username/email and password match the database -> Allow login to Beranda
      onLoginSuccess({
        name: matched.name,
        email: matched.email,
        phone: matched.phone,
        prodi: matched.prodi || 'Rekayasa Perangkat Lunak (RPL)',
        program: matched.program || matched.prodi || 'Rekayasa Perangkat Lunak (RPL)',
        campus: matched.campus || 'STMIK IKMI CIREBON',
        nim: matched.nim || '41220089',
        studentId: matched.studentId || matched.nim || '41220089',
        memberLevel: matched.memberLevel || 'Member Perak',
        memberTier: matched.memberTier || 'Member Perak • Sejak 2026',
        avatarUrl: matched.avatarUrl || DEFAULT_AVATAR_URL,
      });
    }, 300);
  };

  return (
    <div className="flex flex-col w-full min-h-full pb-8 bg-surface">
      {/* Top Hero Banner with Batik Ornament */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-container to-secondary px-margin pt-5 pb-8 text-on-primary shadow-md">
        <svg
          className="absolute -right-8 -bottom-8 w-48 h-48 text-on-primary opacity-10 pointer-events-none"
          fill="currentColor"
          viewBox="0 0 100 100"
        >
          <path d="M50 0 L100 50 L50 100 L0 50 Z"></path>
          <circle cx="50" cy="50" fill="none" r="28" stroke="currentColor" strokeWidth="4"></circle>
          <path
            d="M50 15 L85 50 L50 85 L15 50 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          ></path>
        </svg>

        <div className="relative z-10 flex flex-col items-center text-center gap-1.5">
          <div className="w-15 h-15 rounded-2xl bg-surface-container-lowest p-2.5 shadow-lg flex items-center justify-center">
            <SafeImage
              src={LOKAMART_LOGO_URL}
              alt="LokaMart Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="font-headline-sm text-headline-sm text-on-primary tracking-tight mt-1">
            Login LokaMart Nusantara
          </h1>
          <p className="font-body-sm text-body-sm text-surface-container/90 max-w-xs">
            Silakan masuk terlebih dahulu untuk mengakses Beranda &amp; Katalog Kriya UMKM.
          </p>
        </div>
      </div>

      {/* Auth Mode Switcher Pill */}
      <div className="px-margin @md:px-8 -mt-5 relative z-20 max-w-lg mx-auto w-full">
        <div className="bg-surface-container-lowest p-1.5 rounded-2xl shadow-md grid grid-cols-2 gap-1.5 w-full">
          <button
            type="button"
            className="py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">login</span>
            <span>Masuk (Login)</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="py-2.5 rounded-xl bg-transparent text-on-surface-variant hover:bg-surface-container-low font-label-lg text-label-lg flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Daftar (Register)</span>
          </button>
        </div>
      </div>

      {/* Main Centered Login Form */}
      <div className="px-margin @md:px-8 mt-space-md max-w-lg mx-auto w-full flex flex-col gap-space-md">
        {/* Banner when redirected from Register */}
        {justRegisteredAccount && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-start gap-2.5 shadow-xs">
            <span
              className="material-symbols-outlined text-emerald-700 text-[22px] shrink-0 mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="font-title-sm text-title-sm font-bold text-emerald-900">
                Pendaftaran Berhasil! Silakan Login
              </span>
              <span className="font-body-sm text-xs text-emerald-800">
                Akun <strong>{justRegisteredAccount.name}</strong> ({justRegisteredAccount.email})
                telah terdaftar. Klik tombol <strong>Masuk ke Beranda LokaMart</strong> di bawah
                untuk melanjutkan.
              </span>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmitLogin}
          className="bg-surface-container-lowest rounded-2xl p-space-lg @md:p-6 shadow-sm flex flex-col gap-space-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <h2 className="font-title-lg text-title-lg text-primary">Masuk ke Akun Anda</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Masukkan email dan kata sandi Anda untuk melanjutkan.
              </p>
            </div>
            <span className="material-symbols-outlined text-secondary text-[24px]">
              lock_open
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-error-container text-on-error-container font-body-sm text-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
              <span>Email</span>
              <span className="font-label-sm text-[10px] text-secondary">Wajib diisi</span>
            </label>
            <div className="flex items-center gap-2 bg-surface-container-low rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
              <span className="material-symbols-outlined text-secondary text-[20px]">mail</span>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
              />
              {emailOrPhone && (
                <button
                  type="button"
                  onClick={() => setEmailOrPhone('')}
                  className="text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </button>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface">Kata Sandi</label>
            <div className="flex items-center gap-2 bg-surface-container-low rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
              <span className="material-symbols-outlined text-secondary text-[20px]">lock</span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-outline hover:text-primary flex items-center"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-5 h-5 rounded bg-surface-container peer-checked:bg-primary flex items-center justify-center transition-colors">
                <span
                  className={`material-symbols-outlined text-on-primary text-[15px] ${
                    rememberMe ? 'scale-100' : 'scale-0'
                  }`}
                >
                  check
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Ingat sesi saya
              </span>
            </label>

            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="font-label-md text-label-md text-secondary hover:text-primary"
            >
              Lupa Kata Sandi?
            </button>
          </div>

          {/* Submit Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isLoading ? 'animate-spin' : ''
              }`}
            >
              {isLoading ? 'progress_activity' : 'login'}
            </span>
            <span>{isLoading ? 'Memverifikasi Login...' : 'Masuk ke Beranda LokaMart'}</span>
          </button>
        </form>

        {/* Switch to Register */}
        <div className="text-center py-2 flex flex-col items-center gap-1.5">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Belum memiliki akun LokaMart?{' '}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="font-title-sm text-title-sm text-primary font-bold underline ml-1"
            >
              Daftar Akun Baru
            </button>
          </p>
        </div>
      </div>

      {/* Modal Lupa Kata Sandi */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-end @md:items-center justify-center pb-safe p-0 @md:p-4">
          <div className="w-full max-w-[412px] bg-surface-container-lowest rounded-t-2xl @md:rounded-2xl p-space-xl flex flex-col gap-space-md shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-title-lg text-title-lg text-primary">Reset Kata Sandi</h3>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Masukkan email terdaftar Anda untuk menerima tautan pemulihan kata sandi LokaMart.
            </p>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md focus:outline-none"
              placeholder="nama@mhs.ikmi.ac.id"
            />
            <button
              type="button"
              onClick={() => {
                setShowForgotModal(false);
                onShowToast(`Tautan pemulihan dikirim ke ${resetEmail || 'email Anda'}`);
              }}
              className="w-full h-11 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md"
            >
              Kirim Tautan Pemulihan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface RegisterScreenProps {
  registeredAccounts?: RegisteredAccount[];
  onRegisterSuccess: (newAccount: RegisteredAccount) => void;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  registeredAccounts = [],
  onRegisterSuccess,
  onNavigate,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPasswordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;
  const isPasswordMatch =
    confirmPassword.length > 0 && password.length >= 6 && password === confirmPassword;

  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      const msg = 'Nama lengkap wajib diisi.';
      setErrorMsg(msg);
      onShowToast(msg);
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      const msg = 'Masukkan alamat email yang valid.';
      setErrorMsg(msg);
      onShowToast(msg);
      return;
    }
    const emailExists = registeredAccounts.some(
      (acc) => acc.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (emailExists) {
      const msg = 'Email ini sudah terdaftar. Silakan langsung masuk di halaman Login.';
      setErrorMsg(msg);
      onShowToast(msg);
      return;
    }
    if (password.length < 6) {
      const msg = 'Kata sandi minimal 6 karakter.';
      setErrorMsg(msg);
      onShowToast(msg);
      return;
    }
    if (!confirmPassword) {
      const msg = 'Konfirmasi kata sandi wajib diisi.';
      setErrorMsg(msg);
      onShowToast(msg);
      return;
    }
    if (password !== confirmPassword) {
      const msg =
        'Registrasi Gagal: Kata Sandi dan Konfirmasi Kata Sandi tidak sama!';
      setErrorMsg(msg);
      onShowToast('Kata Sandi & Konfirmasi Kata Sandi tidak sama!');
      return;
    }
    if (!agreeTerms) {
      const msg = 'Harap setujui Syarat & Ketentuan LokaMart.';
      setErrorMsg(msg);
      onShowToast(msg);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterSuccess({
        name: name.trim(),
        email: email.trim(),
        phone: DEFAULT_USER_PROFILE.phone,
        prodi: DEFAULT_USER_PROFILE.prodi,
        program: DEFAULT_USER_PROFILE.program,
        campus: DEFAULT_USER_PROFILE.campus,
        nim: DEFAULT_USER_PROFILE.nim,
        studentId: DEFAULT_USER_PROFILE.studentId,
        memberLevel: 'Member Perak',
        memberTier: 'Member Perak • Sejak 2026',
        avatarUrl: DEFAULT_AVATAR_URL,
        password,
      });
    }, 450);
  };

  return (
    <div className="flex flex-col w-full min-h-full pb-8 bg-surface">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-container to-secondary px-margin pt-5 pb-7 text-on-primary shadow-md">
        <div className="relative z-10 flex flex-col items-center text-center gap-1.5">
          <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest p-2 shadow-md flex items-center justify-center shrink-0">
            <SafeImage
              src={LOKAMART_LOGO_URL}
              alt="LokaMart Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="font-headline-sm text-headline-sm text-on-primary leading-tight mt-1">
            Daftar Akun Baru
          </h1>
          <p className="font-body-sm text-body-sm text-surface-container/90 max-w-xs">
            Buat akun LokaMart Nusantara Anda dalam beberapa langkah mudah.
          </p>
        </div>
      </div>

      {/* Auth Mode Switcher Pill */}
      <div className="px-margin @md:px-8 -mt-4 relative z-20 max-w-lg mx-auto w-full">
        <div className="bg-surface-container-lowest p-1.5 rounded-2xl shadow-md grid grid-cols-2 gap-1.5 w-full">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="py-2.5 rounded-xl bg-transparent text-on-surface-variant hover:bg-surface-container-low font-label-lg text-label-lg flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">login</span>
            <span>Masuk (Login)</span>
          </button>
          <button
            type="button"
            className="py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Daftar (Register)</span>
          </button>
        </div>
      </div>

      {/* Registration Form Card (Clean Centered 4-Field Form) */}
      <div className="px-margin @md:px-8 mt-space-md max-w-lg mx-auto w-full flex flex-col gap-space-md">
        <form
          onSubmit={handleSubmitRegister}
          className="bg-surface-container-lowest rounded-2xl p-space-lg @md:p-6 shadow-sm flex flex-col gap-space-md"
        >
          <div>
            <h2 className="font-title-lg text-title-lg text-primary">Formulir Pendaftaran</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Lengkapi data di bawah ini untuk membuat akun baru.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-error-container text-on-error-container font-body-sm text-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Nama Lengkap */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface">Nama Lengkap</label>
            <div className="flex items-center gap-2 bg-surface-container-low rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
              <span className="material-symbols-outlined text-secondary text-[19px]">badge</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
              />
            </div>
          </div>

          {/* 2. Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface">Email</label>
            <div className="flex items-center gap-2 bg-surface-container-low rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
              <span className="material-symbols-outlined text-secondary text-[19px]">
                alternate_email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
              />
            </div>
          </div>

          {/* 3. Kata Sandi */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface">Kata Sandi</label>
            <div className="flex items-center gap-2 bg-surface-container-low rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
              <span className="material-symbols-outlined text-secondary text-[19px]">lock</span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Minimal 6 karakter"
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-outline hover:text-primary flex items-center"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* 4. Konfirmasi Kata Sandi */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface">
              Konfirmasi Kata Sandi
            </label>
            <div
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 transition-all ${
                isPasswordMismatch
                  ? 'bg-error-container/30 ring-2 ring-error'
                  : isPasswordMatch
                  ? 'bg-emerald-50 ring-2 ring-emerald-500'
                  : 'bg-surface-container-low focus-within:ring-2 focus-within:ring-primary/30'
              }`}
            >
              <span className="material-symbols-outlined text-secondary text-[19px]">
                lock_reset
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Ketik ulang kata sandi"
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-outline hover:text-primary flex items-center"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {isPasswordMismatch && (
              <div className="px-3 py-2 rounded-xl bg-error-container text-on-error-container font-label-sm text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] shrink-0">cancel</span>
                <span>Kata Sandi dan Konfirmasi Kata Sandi tidak sama!</span>
              </div>
            )}

            {isPasswordMatch && (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-label-sm text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] shrink-0">
                  check_circle
                </span>
                <span>Kata Sandi dan Konfirmasi Kata Sandi sudah cocok.</span>
              </div>
            )}
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="peer sr-only"
            />
            <div className="w-5 h-5 mt-0.5 rounded bg-surface-container peer-checked:bg-primary flex items-center justify-center shrink-0 transition-colors">
              <span
                className={`material-symbols-outlined text-on-primary text-[15px] ${
                  agreeTerms ? 'scale-100' : 'scale-0'
                }`}
              >
                check
              </span>
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant leading-snug">
              Saya menyetujui Syarat Layanan &amp; Kebijakan Privasi{' '}
              <strong className="text-on-surface">LokaMart Nusantara</strong> serta mendukung UMKM
              lokal.
            </span>
          </label>

          {/* Submit Register CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            <span>{isSubmitting ? 'Menyimpan Akun...' : 'Daftar Sekarang'}</span>
          </button>
        </form>

        {/* Switch to Login */}
        <div className="text-center py-1">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Sudah punya akun?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="font-title-sm text-title-sm text-primary font-bold underline ml-1"
            >
              Masuk di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
