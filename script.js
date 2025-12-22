// --- KONFIGURASI ---

// Fungsi saat tombol "Buka" diklik
function bukaUndangan() {
    const opening = document.getElementById('opening');
    const main = document.getElementById('main-container');
    const music = document.getElementById('bg-music');
    const bgPhoto = document.getElementById('bg-photo');

    // 1. Memutar Musik
    music.volume = 0.5; // Set volume 50%
    music.play().catch(error => {
        console.log("Browser memblokir autoplay, audio akan mulai setelah interaksi.");
    });

    // 2. Efek Zoom pada foto sebelum hilang
    bgPhoto.style.transform = 'scale(1.2)';

    // 3. Menghilangkan layer Opening
    opening.style.opacity = '0';
    opening.style.visibility = 'hidden'; // Supaya tidak bisa diklik lagi

    // 4. Memunculkan konten utama setelah transisi selesai (1.5 detik)
    setTimeout(() => {
        opening.style.display = 'none';
        main.style.display = 'block';
        
        // Sedikit delay agar efek fade-in CSS berjalan mulus
        setTimeout(() => {
            main.style.opacity = '1';
            mulaiSalju(); // Memanggil fungsi salju
            cekScroll(); // Memanggil fungsi scroll
        }, 100);
    }, 1500);
}

// Fungsi Efek Salju (Nuansa Desember)
function mulaiSalju() {
    const container = document.body;
    const jumlahSalju = 40; // Jumlah butiran

    for (let i = 0; i < jumlahSalju; i++) {
        const snow = document.createElement('div');
        snow.className = 'snowflake';
        snow.innerHTML = '❄'; // Ikon salju
        
        // Posisi random
        snow.style.left = Math.random() * 100 + 'vw';
        // Kecepatan jatuh random
        snow.style.animationDuration = (Math.random() * 3 + 5) + 's'; 
        // Ukuran random
        snow.style.fontSize = (Math.random() * 10 + 10) + 'px';
        
        container.appendChild(snow);
    }
}

// Fungsi Animasi Scroll (Intersection Observer)
// Ini membuat teks muncul perlahan saat digulir ke bawah
function cekScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Targetkan semua elemen <section>
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// --- KONTROL MUSIK OTOMATIS ---
// Ambil elemen video dan audio
const videoPlayer = document.querySelector('video');
const musicPlayer = document.getElementById('bg-music');

// Pastikan elemennya ada sebelum menjalankan perintah
if (videoPlayer && musicPlayer) {
    
    // DETEKSI: Saat video mulai diputar (play)
    videoPlayer.addEventListener('play', () => {
        // Matikan musik latar perlahan (opsional) atau langsung pause
        musicPlayer.pause(); 
    });

    // OPSIONAL: Jika ingin musik nyala lagi saat video di-pause
    videoPlayer.addEventListener('pause', () => {
        // Hapus tanda komentar (//) di bawah jika ingin musik nyala lagi saat pause
        // musicPlayer.play(); 
    });
    
    // OPSIONAL: Jika ingin musik nyala lagi saat video selesai
    videoPlayer.addEventListener('ended', () => {
        // musicPlayer.play();
    });
}