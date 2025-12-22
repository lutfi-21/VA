// 1. Fungsi Utama untuk Membuka Halaman
function bukaUndangan() {
    const opening = document.getElementById('opening');
    const main = document.getElementById('main-container');
    const music = document.getElementById('bg-music');
    const bgPhoto = document.getElementById('bg-photo');

    // 1. Jalankan musik
    if (music) {
        music.volume = 0.5;
        music.play().catch(err => console.log("Autoplay musik diblokir."));
        
        // --- BARIS YANG DITAMBAHKAN ---
        toggleVisualizer(true); // <-- TAMBAHKAN INI agar batang visualizer mulai goyang
    }

    // 2. Efek transisi visual opening
    if (opening) {
        opening.style.opacity = '0';
        setTimeout(() => {
            opening.style.display = 'none';
            if (main) {
                main.style.display = 'block';
                setTimeout(() => {
                    main.style.opacity = '1';
                    mulaiSalju();
                    cekScroll();
                }, 100);
            }
        }, 1100);
    }
}

// 2. Fungsi Efek Salju
function mulaiSalju() {
    const container = document.body;
    for (let i = 0; i < 40; i++) {
        const snow = document.createElement('div');
        snow.className = 'snowflake';
        snow.innerHTML = '❄';
        snow.style.left = Math.random() * 100 + 'vw';
        snow.style.animationDuration = (Math.random() * 3 + 5) + 's';
        snow.style.fontSize = (Math.random() * 10 + 10) + 'px';
        container.appendChild(snow);
    }
}

// 3. Fungsi Animasi Scroll
function cekScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// --- KONTROL VIDEO, MUSIK, VISUALIZER & PESAN RAHASIA ---
window.onload = function() {
    const videoPlayer = document.querySelector('video');
    const musicPlayer = document.getElementById('bg-music');
    const secretMessage = document.getElementById('secret-message');

    if (videoPlayer) {
        // 1. Saat Video DIPUTAR
        videoPlayer.addEventListener('play', () => {
            if (musicPlayer) musicPlayer.pause(); // Musik latar mati
            toggleVisualizer(false);            // Animasi visualizer berhenti
        });

        // 2. Saat Video SELESAI
        videoPlayer.addEventListener('ended', () => {
            // Munculkan pesan rahasia
            if (secretMessage) {
                secretMessage.style.display = 'block';
                setTimeout(() => {
                    secretMessage.style.opacity = '1';
                    secretMessage.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
            
            // Putar musik lagi sebagai penutup (Outro)
            if (musicPlayer) {
                musicPlayer.volume = 0.3; // Volume lebih pelan agar syahdu
                musicPlayer.play();
                toggleVisualizer(true); // Animasi visualizer jalan lagi
            }
        });
    }
};

function updateCountdown() {
    const nextYear = new Date().getFullYear() + 1;
    const target = new Date(`Jan 1, ${nextYear} 00:00:00`).getTime();
    const now = new Date().getTime();
    const gap = target - now;

    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').innerText = d;
    document.getElementById('hours').innerText = h;
    document.getElementById('minutes').innerText = m;
}
setInterval(updateCountdown, 1000);

// Fungsi untuk menjalankan/menghentikan animasi bar visualizer
function toggleVisualizer(play) {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        if (play) {
            bar.classList.add('animating');
        } else {
            bar.classList.remove('animating');
        }
    });
}



