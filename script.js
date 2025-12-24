// 1. Inisialisasi Variable
const music = document.getElementById('bg-music');
const voiceNote = document.getElementById('voice-note');
const opening = document.getElementById('opening');
const main = document.getElementById('main-container');
const greet = document.getElementById('greeting-text');
const video = document.querySelector('video');
const bars = document.querySelectorAll('.bar');
let pressTimer;

// 2. Fungsi Buka Halaman
function bukaUndangan() {
    if (music) {
        music.play().catch(e => console.log("Izin musik diperlukan"));
        const wrapper = document.querySelector('.visualizer-wrapper');
        if (wrapper) wrapper.style.display = 'flex';
        bars.forEach(bar => bar.classList.add('animating'));
    }

    if (greet) {
        const hr = new Date().getHours();
        let sapa = (hr < 11) ? "Selamat Pagi" : (hr < 15) ? "Selamat Siang" : (hr < 18) ? "Selamat Sore" : "Selamat Malam";
        greet.innerText = `${sapa}, va.`;
    }

    if (opening && main) {
        opening.style.opacity = '0';
        setTimeout(() => {
            opening.style.display = 'none';
            main.style.display = 'block';
            setTimeout(() => {
                main.style.opacity = '1';
                reveal(); 
            }, 100);
        }, 1100);
    }
}

// 3. Fungsi Love (Heart Pop)
function createHeart(x, y) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.cssText = `
        position: fixed; left: ${x}px; top: ${y}px; 
        font-size: 50px; pointer-events: none; z-index: 999999; 
        transform: translate(-50%, -50%); animation: heartPop 0.8s ease-out forwards;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
}

// 4. Logika Tap & Tekan Lama pada Foto
document.addEventListener('touchstart', function (e) {
    if (e.target.tagName === 'IMG') {
        // A. Double Tap Love
        let now = new Date().getTime();
        let lastTouch = e.target.getAttribute('data-last-touch') || 0;
        let diff = now - lastTouch;
        if (diff < 300 && diff > 0) {
            createHeart(e.touches[0].clientX, e.touches[0].clientY);
        }
        e.target.setAttribute('data-last-touch', now);

        // B. Long Press Suara
        pressTimer = window.setTimeout(function() {
            if (voiceNote) {
                if (music) music.volume = 0.05; // Kecilkan musik latar
                voiceNote.currentTime = 0;
                voiceNote.play();
                if (navigator.vibrate) navigator.vibrate(50);
                
                voiceNote.onended = () => { if (music) music.volume = 1.0; };
            }
        }, 800);
    }
}, { passive: true });

document.addEventListener('touchend', function () {
    clearTimeout(pressTimer);
});

// 5. Logika Video & Tombol Selesai
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

// 6. Fungsi Tombol Selesai
function tampilkanPesanAkhir() {
    const tombol = document.getElementById('btn-selesai');
    const kartu = document.getElementById('kartu-pesan');
    if (tombol) tombol.style.display = 'none';
    if (kartu) {
        kartu.style.display = 'block';
        kartu.style.opacity = '1';
    }
}

// 7. Reveal Animation on Scroll
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) el.classList.add("active");
    });
}
window.addEventListener("scroll", reveal);

// ==========================================
// 8. FITUR HITUNG MUNDUR (COUNTDOWN)
// ==========================================
setInterval(() => {
    // Target waktu: 1 Januari 2026 jam 00:00:00
    const target = new Date("Jan 1, 2026 00:00:00").getTime();
    const sekarang = new Date().getTime();
    const selisih = target - sekarang;

    // Ambil elemen HTML-nya
    const d = document.getElementById("days");
    const h = document.getElementById("hours");
    const m = document.getElementById("minutes");
    const s = document.getElementById("seconds"); // Tambahkan ini jika ada ID seconds

    if (selisih > 0) {
        // Hitung hari, jam, menit
        const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
        const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
        const detik = Math.floor((selisih % (1000 * 60)) / 1000);

        // Update tampilan ke HTML (tambahkan padStart agar tetap 2 digit, misal: 09)
        if (d) d.innerText = hari.toString().padStart(2, '0');
        if (h) h.innerText = jam.toString().padStart(2, '0');
        if (m) m.innerText = menit.toString().padStart(2, '0');
        if (s) s.innerText = detik.toString().padStart(2, '0');
    } else {
        // Kalau sudah lewat waktunya
        if (d) d.innerText = "00";
        if (h) h.innerText = "00";
        if (m) m.innerText = "00";
        if (s) s.innerText = "00";
    }
}, 1000);

