// 1. Ambil semua elemen berdasarkan ID di HTML kamu
const music = document.getElementById('bg-music');
const opening = document.getElementById('opening');
const main = document.getElementById('main-container');
const greet = document.getElementById('greeting-text');
const video = document.querySelector('video'); // Mengambil tag video di dalam container
const secret = document.getElementById('secret-message');
const bars = document.querySelectorAll('.bar');

// 2. FUNGSI UTAMA: BUKA UNDANGAN (Dipanggil saat tombol diklik)
function bukaUndangan() {
    // Sapaan otomatis sesuai waktu
    if (greet) {
        const hr = new Date().getHours();
        let sapa = "Selamat Malam";
        if (hr < 11) sapa = "Selamat Pagi";
        else if (hr < 15) sapa = "Selamat Siang";
        else if (hr < 18) sapa = "Selamat Sore";
        greet.innerText = sapa + ", va.";
    }

    // Jalankan Musik & Animasi Visualizer
    if (music) {
        music.play();
        // Aktifkan animasi bar di pojok bawah
        bars.forEach(bar => {
            bar.style.animationPlayState = 'running';
        });
    }

    // Transisi Halaman (Pudar dan Ganti Konten)
    if (opening && main) {
        opening.style.opacity = '0';
        setTimeout(() => {
            opening.style.display = 'none';
            main.style.display = 'block';
            setTimeout(() => {
                main.style.opacity = '1';
                reveal(); // Jalankan efek muncul teks
            }, 100);
        }, 1100);
    }
}

// 3. SMART VIDEO CONTROL (Musik mati pas video play)
if (video) {
    video.onplay = function() {
        if (music) music.pause();
        // Matikan animasi visualizer pas video jalan
        bars.forEach(bar => { bar.style.animationPlayState = 'paused'; });
    };

    video.onpause = function() {
        if (music) music.play();
        // Hidupkan lagi visualizer pas video berhenti
        bars.forEach(bar => { bar.style.animationPlayState = 'running'; });
    };

    video.onended = function() {
        if (music) music.play();
        bars.forEach(bar => { bar.style.animationPlayState = 'running'; });
        
        // MUNCULKAN PESAN RAHASIA otomatis pas video habis
        if (secret) {
            secret.classList.add('show-secret');
            secret.scrollIntoView({ behavior: 'smooth' });
        }
    };
}

// 4. SCROLL REVEAL (Efek teks muncul pas di-scroll)
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", reveal);

// 5. COUNTDOWN TAHUN BARU
function updateCountdown() {
    const target = new Date("Jan 1, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff > 0) {
        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    }
}
setInterval(updateCountdown, 1000);

// 6. EFEK HATI PAS DOUBLE CLICK FOTO
document.addEventListener('dblclick', function(e) {
    if (e.target.tagName === 'IMG') {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.style.position = "fixed";
        heart.style.left = e.clientX + "px";
        heart.style.top = e.clientY + "px";
        heart.style.fontSize = "50px";
        heart.style.pointerEvents = "none";
        heart.style.animation = "heartPop 0.8s ease-out forwards";
        document.body.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 800);
    }
});
