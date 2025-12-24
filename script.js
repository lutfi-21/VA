// 1. ELEMEN DASAR
const music = document.getElementById('bg-music');
const opening = document.getElementById('opening');
const main = document.getElementById('main-container');
const greet = document.getElementById('greeting-text');
const video = document.querySelector('video'); 
const secret = document.getElementById('secret-message');
const bars = document.querySelectorAll('.bar');

// 2. FUNGSI BUKA UNDANGAN
function bukaUndangan() {
    const opening = document.getElementById('opening');
    const main = document.getElementById('main-container');
    const music = document.getElementById('bg-music');
    const wrapper = document.querySelector('.visualizer-wrapper'); // Ambil bungkusnya
    const bars = document.querySelectorAll('.bar'); // Ambil batang-batangnya

    // 1. Sapaan Waktu
    if (greet) {
        const hr = new Date().getHours();
        let sapa = (hr < 11) ? "Selamat Pagi" : (hr < 15) ? "Selamat Siang" : (hr < 18) ? "Selamat Sore" : "Selamat Malam";
        greet.innerText = `${sapa}, va.`;
    }

    // 2. Musik & Visualizer (PAKSA MUNCUL & GOYANG)
    if (music) {
        music.play().catch(() => console.log("Izin audio diperlukan"));
        
        // Membuka kunci 'display: none' di CSS
        if (wrapper) {
            wrapper.style.display = 'flex'; 
        }
        
        // Menambahkan class 'animating' supaya @keyframes bounce jalan
        bars.forEach(bar => {
            bar.classList.add('animating');
        });
    }

    // 3. Transisi Halaman
    if (opening && main) {
        opening.style.opacity = '0';
        setTimeout(() => {
            opening.style.display = 'none';
            main.style.display = 'block';
            setTimeout(() => {
                main.style.opacity = '1';
                reveal(); // Munculkan teks satu per satu
            }, 100);
        }, 1100);
    }
}

// 3. SMART VIDEO & PESAN RAHASIA
if (video) {
    video.onplay = () => {
        if (music) music.pause();
        bars.forEach(bar => bar.style.animationPlayState = 'paused');
    };

    video.onpause = () => {
        if (music) music.play();
        bars.forEach(bar => bar.style.animationPlayState = 'running');
    };

   video.onended = function() {
    if (music) music.play();
    bars.forEach(bar => bar.classList.add('animating'));

    // MUNCULKAN AREA TOMBOL
    const secretArea = document.getElementById('secret-message');
    if (secretArea) {
        secretArea.style.display = 'block'; // Lawan dari display: none di CSS
        setTimeout(() => {
            secretArea.style.opacity = '1'; // Jalankan efek pudar (transition)
            secretArea.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
};

// FUNGSI UNTUK MEMBUKA KARTU PESAN SAAT TOMBOL DI-KLIK
function tampilkanPesanAkhir() {
    const tombol = document.getElementById('btn-selesai');
    const kartu = document.getElementById('kartu-pesan');
    
    if (tombol) tombol.style.display = 'none'; // Sembunyikan tombolnya
    if (kartu) {
        kartu.style.display = 'block'; // Munculkan kartu pesan rahasiamu
        kartu.style.animation = 'fadeIn 1s ease forwards';
    }
}

// 4. SCROLL REVEAL
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) el.classList.add("active");
    });
}
window.addEventListener("scroll", reveal);

// 5. DOUBLE TAP LOVE (HP & LAPTOP)
function createHeart(x, y) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.className = "heart-pop-manual"; // Nama class unik agar tidak bentrok
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
}

document.addEventListener('touchstart', function (e) {
    if (e.target.tagName === 'IMG') {
        let now = new Date().getTime();
        let lastTouch = e.target.getAttribute('data-last-touch') || 0;
        if (now - lastTouch < 300 && now - lastTouch > 0) {
            createHeart(e.touches[0].clientX, e.touches[0].clientY);
        }
        e.target.setAttribute('data-last-touch', now);
    }
}, { passive: true });

document.addEventListener('dblclick', (e) => {
    if (e.target.tagName === 'IMG') createHeart(e.clientX, e.clientY);
});

// 6. COUNTDOWN 2026
setInterval(() => {
    const target = new Date("Jan 1, 2026 00:00:00").getTime();
    const diff = target - new Date().getTime();
    if (diff > 0) {
        document.getElementById("days").innerText = Math.floor(diff / 86400000).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
        document.getElementById("minutes").innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    }
}, 1000);

// Munculkan popup saat tombol Selesai diklik
function tampilkanPesanAkhir() {
    const modal = document.getElementById('final-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Tutup popup
function tutupModal() {
    const modal = document.getElementById('final-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}



