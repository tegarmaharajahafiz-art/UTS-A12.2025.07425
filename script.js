// ===== 1. Tahun otomatis di footer =====
const currentYear = document.getElementById("currentYear");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// ===== 2. Menu navigasi untuk layar kecil =====
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Tutup menu setelah salah satu tautan dipilih
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== 3. Tema terang / gelap =====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const rootEl = document.documentElement;

function applyTheme(theme) {
  rootEl.setAttribute("data-theme", theme);
  rootEl.setAttribute("data-bs-theme", theme);
  if (themeIcon && themeLabel) {
    // Tombol menampilkan tema tujuan berikutnya
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    themeLabel.textContent = theme === "dark" ? "Terang" : "Gelap";
  }
}

applyTheme(rootEl.getAttribute("data-theme") || "light");

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    const next = rootEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

// ===== 4. Validasi dan respons formulir pemesanan =====
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const kota = document.getElementById("kota").value;
    const berat = parseFloat(document.getElementById("berat").value);

    if (!nama || !alamat || !kota || isNaN(berat)) {
      formMessage.textContent = "Nama, alamat, kota, dan berat cucian wajib diisi.";
      formMessage.style.color = "#b91c1c";
      return;
    }

    if (berat < 1 || berat > 50) {
      formMessage.textContent = "Berat cucian harus antara 1 sampai 50 kg.";
      formMessage.style.color = "#b91c1c";
      return;
    }

    formMessage.textContent =
      "Terima kasih, " + nama + "! Kurir kami akan menjemput cucian Anda (" + berat + " kg) di " + kota + ".";
    formMessage.style.color = "#15803d";
    contactForm.reset();
  });
}
