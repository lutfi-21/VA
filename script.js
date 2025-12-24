// ==========================================
// 1. VARIABEL GLOBAL (Pastikan ID sesuai HTML)
// ==========================================
const music = document.getElementById('bg-music');
const opening = document.getElementById('opening');
const main = document.getElementById('main-container');
const greet = document.getElementById('greeting-text');
const video = document.querySelector('video');
const bars = document.querySelectorAll('.bar');

// ==========================================
// 2. FUNGSI BUKA HALAMAN (Pemicu Utama)
// ==========================================
function bukaUndangan() {
    // Jalankan Musik & Visualizer
    if (music) {
        music.play().catch(e => console.log("Musik butuh interaksi user"));
        // Memunculkan wrapper visualizer dan bar
        const wrapper = document.querySelector('.visualizer-wrapper');
        if (wrapper) wrapper.style.display = 'flex';
        bars.forEach(bar => bar.classList.add('animating'));
    }

    // Set Sapaan Waktu
    if (greet) {
        const hr = new Date().getHours();
        let sapa = (hr < 11) ? "Selamat Pagi" : (hr < 15) ? "Selamat Siang" : (hr < 18) ? "Selamat Sore" : "Selamat Malam";
        greet.innerText = `${sapa}, va.`;
    }

    // Transisi Halaman
    if (opening && main) {
        opening.style.opacity = '0';
        setTimeout(() => {
            opening.style.display = 'none';
            main.style.display = 'block';
            setTimeout(() => {
                main.style.opacity = '1';
                if (typeof reveal === "function") reveal(); 
            }, 100);
        }, 1100);
    }
}

// ==========================================
// 3. LOGIKA VIDEO & TOMBOL SELESAI
// ==========================================
if (video) {
    video.onplay = () => {
        if (music) music.pause();
        bars.forEach(bar => bar.classList.remove('animating'));
    };

    video.onpause = () => {
        if (music) music.play();
        bars.forEach(bar => bar.classList.add('animating'));
    };

    video.onended = () => {
        if (music) music.play();
        bars.forEach(bar => bar.classList.add('animating'));

        // Munculkan area tombol "Klik Selesai"
        const secretArea = document.getElementById('secret-message');
        if (secretArea) {
            secretArea.style.display = 'block';
            setTimeout(() => {
                secretArea.style.opacity = '1';
                secretArea.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };
}

// Fungsi untuk tombol Selesai (dipanggil di HTML: onclick="tampilkanPesanAkhir()")
function tampilkanPesanAkhir() {
    const tombol = document.getElementById('btn-selesai');
    const kartu = document.getElementById('kartu-pesan');
    if (tombol) tombol.style.display = 'none';
    if (kartu) {
        kartu.style.display = 'block';
        kartu.style.opacity = '1';
    }
}

// ==========================================
// 4. FITUR PENDUKUNG (Love, Scroll, Timer)
// ==========================================
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) el.classList.add("active");
    });
}
window.addEventListener("scroll", reveal);

let pressTimer;
const voiceNote = document.getElementById('voice-note');

document.addEventListener('touchstart', function (e) {
    if (e.target.tagName === 'IMG') {
        // --- LOGIKA DOUBLE TAP (LOVE) ---
        let now = new Date().getTime();
        let lastTouch = e.target.getAttribute('data-last-touch') || 0;
        if (now - lastTouch < 300 && now - lastTouch > 0) {
            createHeart(e.touches[0].clientX, e.touches[0].clientY);
        }
        e.target.setAttribute('data-last-touch', now);

        // --- LOGIKA LONG PRESS (SUARA) ---
        // Kalau ditekan selama 1 detik (1000ms), suara bunyi
        pressTimer = window.setTimeout(function() {
            if (voiceNote) {
                // Kecilkan musik latar sebentar agar suara kamu jelas
                if (music) music.volume = 0.2; 
                voiceNote.play();
                
                // Balikkan volume musik saat suara kamu selesai
                voiceNote.onended = () => { if (music) music.volume = 1; };
                
                // Kasih getaran dikit di HP kalau support
                if (navigator.vibrate) navigator.vibrate(50); 
                alert("Mendengarkan pesan suara..."); // Opsional, biar dia tahu ada suara
            }
        }, 1000);
    }
}, { passive: true });

document.addEventListener('touchend', function () {
    // Kalau jari diangkat sebelum 1 detik, jangan bunyi suara
    clearTimeout(pressTimer);
});

// Countdown
setInterval(() => {
    const target = new Date("Jan 1, 2026 00:00:00").getTime();
    const diff = target - new Date().getTime();
    const d = document.getElementById("days"), h = document.getElementById("hours"), m = document.getElementById("minutes");
    if (d && h && m && diff > 0) {
        d.innerText = Math.floor(diff / 86400000).toString().padStart(2, '0');
        h.innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
        m.innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    }
}, 1000);

