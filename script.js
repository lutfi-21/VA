// ==========================================
// 1. INISIALISASI VARIABEL & ELEMEN
// ==========================================
const music = document.getElementById('bg-music');
const video = document.querySelector('.video-container-special video');
const bars = document.querySelectorAll('.bar');

// ==========================================
// 2. FUNGSI UTAMA: BUKA UNDANGAN
// ==========================================
function bukaUndangan() {
    const opening = document.getElementById('opening');
    const main = document.getElementById('main-container');

    // Jalankan sapaan waktu
    setPersonalGreeting();

    // Mainkan Musik
    if (music) {
        music.play().catch(e => console.log("Musik butuh interaksi user"));
        toggleVisualizer(true);
    }

    // Transisi Halaman (Opening ke Main)
    if (opening && main) {
        opening.style.opacity = '0';
        setTimeout(() => {
            opening.style.display = 'none';
            main.style.display = 'block';
            setTimeout(() => {
                main.style.opacity = '1';
                // Panggil fungsi munculkan teks pertama kali
                reveal();
            }, 100);
        }, 1100);
    }
}

// ==========================================
// 3. FUNGSI GREETING (SAPAAN OTOMATIS)
// ==========================================
function setPersonalGreeting() {
    const greetingElement = document.getElementById('greeting-text');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greeting = "";

    if (hour >= 5 && hour < 11) greeting = "Selamat Pagi";
    else if (hour >= 11 && hour < 15) greeting = "Selamat Siang";
    else if (hour >= 15 && hour < 18) greeting = "Selamat Sore";
    else greeting = "Selamat Malam";

    greetingElement.innerText = `${greeting}, va.`;
}

// ==========================================
// 4. SMART MUSIC CONTROL & SECRET MESSAGE
// ==========================================
if (video) {
    video.onplay = function() {
        if (music) music.pause();
        toggleVisualizer(false);
    };
    
    video.onpause = function() {
        if (music) {
            music.play();
            toggleVisualizer(true);
        }
    };

    // SAAT VIDEO SELESAI DIPUTAR
    video.onended = function() {
        if (music) {
            music.play();
            toggleVisualizer(true);
        }
        
        // MUNCULKAN PESAN RAHASIA
        const secretMessage = document.getElementById('secret-message');
        if (secretMessage) {
            secretMessage.classList.add('show-secret');
            
            // Otomatis scroll pelan ke arah pesan rahasia supaya dia sadar ada teks baru
            setTimeout(() => {
                secretMessage.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    };
}

// ==========================================
// 5. VISUALIZER ANIMATION CONTROL
// ==========================================
function toggleVisualizer(isActive) {
    bars.forEach(bar => {
        bar.style.animationPlayState = isActive ? 'running' : 'paused';
    });
}

// ==========================================
// 6. SCROLL REVEAL (MUNCULIN KONTEN SAAT SCROLL)
// ==========================================
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);

// ==========================================
// 7. COUNTDOWN TAHUN BARU
// ==========================================
function updateCountdown() {
    const nextYear = new Date("Jan 1, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const distance = nextYear - now;

    if (distance > 0) {
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("days").innerText = d.toString().padStart(2, '0');
        document.getElementById("hours").innerText = h.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
    }
}
setInterval(updateCountdown, 1000);

// ==========================================
// 8. DOUBLE TAP HEART (PADA FOTO)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    // Cari semua gambar di dalam gallery dan graduation section
    const images = document.querySelectorAll('.gallery img, .grad-photo');
    
    images.forEach(img => {
        let lastTap = 0;
        img.addEventListener('click', function(e) {
            let now = new Date().getTime();
            let timesince = now - lastTap;
            if (timesince < 300 && timesince > 0) {
                createHeart(e);
            }
            lastTap = now;
        });
    });
});

function createHeart(e) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.className = "heart-pop"; // Pastikan CSS .heart-pop sudah ada
    
    // Posisi muncul hati
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.position = "fixed";
    heart.style.zIndex = "9999";
    
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 800);
}


