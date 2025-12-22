// 1. Fungsi Utama untuk Membuka Halaman
function bukaUndangan() {
    const opening = document.getElementById('opening');
    const main = document.getElementById('main-container');
    const music = document.getElementById('bg-music');
    const bgPhoto = document.getElementById('bg-photo');

    // Coba putar musik
    if (music) {
        music.volume = 0.5;
        music.play().catch(err => console.log("Autoplay musik diblokir."));
    }

    // Efek transisi visual
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

// 4. Kontrol Video & Pesan Rahasia
// Kita gunakan window.onload agar memastikan elemen video sudah terbaca
window.onload = function() {
    const videoPlayer = document.querySelector('video');
    const musicPlayer = document.getElementById('bg-music');
    const secretMessage = document.getElementById('secret-message');

    if (videoPlayer) {
        videoPlayer.addEventListener('play', () => {
            if (musicPlayer) musicPlayer.pause();
        });

        videoPlayer.addEventListener('ended', () => {
            if (secretMessage) {
                secretMessage.style.display = 'block';
                setTimeout(() => {
                    secretMessage.style.opacity = '1';
                    secretMessage.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
            if (musicPlayer) {
                musicPlayer.volume = 0.2;
                musicPlayer.play();
            }
        });
    }
};
