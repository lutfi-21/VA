// ==========================================
// 1. FUNGSI UTAMA: BUKA UNDANGAN
// ==========================================
function bukaUndangan() {
    const opening = document.getElementById('opening');
    const main = document.getElementById('main-container');
    const music = document.getElementById('bg-music');

    // Set greeting berdasarkan waktu saat tombol diklik
    setPersonalGreeting();

    // Jalankan Musik
    if (music) {
        music.play().catch(error => console.log("Musik butuh interaksi user"));
        if (typeof toggleVisualizer === "function") {
            toggleVisualizer(true);
        }
    }

    // Transisi Smooth (Tanpa Tinta yang bikin error)
    if (opening) {
        opening.style.opacity = '0';
        setTimeout(() => {
            opening.style.display = 'none';
            if (main) {
                main.style.display = 'block';
                setTimeout(() => {
                    main.style.opacity = '1';
                }, 100);
            }
        }, 1100);
    }
}

// ==========================================
// 2. FUNGSI GREETING (SAPAAN PERSONAL)
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

    greetingElement.innerText = `${greeting}, Kamu.`;
}

// ==========================================
// 3. FUNGSI DOUBLE TAP HEART
// ==========================================
function createHeart(e) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.className = "heart-pop"; // Pastikan CSS .heart-pop masih ada
    
    // Support untuk Mouse dan Touch
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    heart.style.left = clientX + "px";
    heart.style.top = clientY + "px";
    
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 800);
}

// Pasang event double tap setelah halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    const photos = document.querySelectorAll('.grad-photo, .photo-item');
    
    photos.forEach(photo => {
        // Untuk Laptop/PC
        photo.addEventListener('dblclick', createHeart);
        
        // Untuk HP (Touch)
        let lastTap = 0;
        photo.addEventListener('touchstart', function(e) {
            let curTime = new Date().getTime();
            let tapLen = curTime - lastTap;
            if (tapLen < 300 && tapLen > 0) {
                createHeart(e);
            }
            lastTap = curTime;
        });
    });
});

// ==========================================
// 4. FUNGSI SCROLL REVEAL (OPSIONAL)
// ==========================================
window.addEventListener("scroll", function() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
});
