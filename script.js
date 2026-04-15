// script.js

let currentIndex = 0;

// ==========================================
// LOGIKA ROTASI LAYAR (LANDSCAPE ONLY)
// ==========================================
function checkOrientation() {
    const rotateWarning = document.getElementById("rotate-warning");
    if (!rotateWarning) return;

    // Jika Tinggi lebih besar dari Lebar (Portrait)
    if (window.innerHeight > window.innerWidth) {
        rotateWarning.style.display = "flex";
        document.body.style.overflow = "hidden"; // Kunci scroll agar tidak berantakan
    } else {
        rotateWarning.style.display = "none";
        document.body.style.overflow = "auto"; // Aktifkan scroll kembali
    }
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", checkOrientation);
// Jalankan fungsi setiap kali layar diputar atau di-resize
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);


// ==========================================
// FUNGSI SLIDER BAWAAN ANDA
// ==========================================

// Fungsi Scroll Umum (Untuk halaman Portofolio utama/index)
function scrollWork(direction) {
    const container = document.getElementById('workSlider');
    if (container) {
        const scrollAmount = 500; 
        container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
}

// Fungsi Utama Slide (Untuk halaman detail kategori)
function updateSlide(direction) {
    const container = document.getElementById('categorySlider');
    const infoPanel = document.querySelector('.project-info-panel');
    const titleEl = document.getElementById('project-title');
    const descEl = document.getElementById('project-desc');
    const numEl = document.getElementById('project-number');
    const progressEl = document.getElementById('progress-line');

    // Cek apakah projectData tersedia (dimuat dari file lain)
    if (typeof projectData === 'undefined' || !container || !titleEl) return;

    // A. Update Index
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= projectData.length) currentIndex = projectData.length - 1;

    // B. Geser Foto
    container.scrollTo({ left: container.offsetWidth * currentIndex, behavior: 'smooth' });

    // C. Update Progress
    if (progressEl) {
        progressEl.style.width = `${((currentIndex + 1) / projectData.length) * 100}%`;
    }

    // D. Animasi Transisi (Fade Out)
    const elements = [titleEl, descEl, numEl].filter(el => el !== null);
    elements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.4s ease";
    });

    // E. Update Konten & Fade In
    setTimeout(() => {
        if (infoPanel) infoPanel.style.backgroundColor = projectData[currentIndex].color;
        
        titleEl.innerHTML = projectData[currentIndex].title;
        titleEl.style.color = projectData[currentIndex].titleColor;

        descEl.innerHTML = `<p>${projectData[currentIndex].desc}</p>`;
        descEl.style.color = projectData[currentIndex].descColor;

        if (numEl) numEl.innerHTML = projectData[currentIndex].number;
        
        elements.forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    }, 400);
}