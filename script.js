/* ===== Image Data ===== */
const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=533&fit=crop', title: 'Misty Forest', category: 'nature' },
  { id: 2, src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=533&fit=crop', title: 'Mountain Stream', category: 'nature' },
  { id: 3, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=533&fit=crop', title: 'Sunlit Canopy', category: 'nature' },
  { id: 4, src: 'https://images.unsplash.com/photo-1503785640985-f62e3aeee448?w=800&h=533&fit=crop', title: 'Autumn Path', category: 'nature' },
  { id: 5, src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=533&fit=crop', title: 'Laptop & Coffee', category: 'technology' },
  { id: 6, src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=533&fit=crop', title: 'Circuit Board', category: 'technology' },
  { id: 7, src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=533&fit=crop', title: 'Keyboard Detail', category: 'technology' },
  { id: 8, src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=533&fit=crop', title: 'Data Center', category: 'technology' },
  { id: 9, src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=533&fit=crop', title: 'Curious Cat', category: 'animals' },
  { id: 10, src: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=800&h=533&fit=crop', title: 'Mountain Goat', category: 'animals' },
  { id: 11, src: 'https://images.unsplash.com/photo-1465156799763-2c087c332922?w=800&h=533&fit=crop', title: 'Garden Bird', category: 'animals' },
  { id: 12, src: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=533&fit=crop', title: 'Puppy Portrait', category: 'animals' },
  { id: 13, src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=533&fit=crop', title: 'City Skyline', category: 'travel' },
  { id: 14, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=533&fit=crop', title: 'Mountain Road', category: 'travel' },
  { id: 15, src: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=800&h=533&fit=crop', title: 'Golden Gate', category: 'travel' },
  { id: 16, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=533&fit=crop', title: 'Tropical Shore', category: 'travel' },
];

/* ===== DOM References ===== */
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let currentCategory = 'all';
let filteredImages = [...images];

/* ===== Render Gallery ===== */
function renderGallery(category = 'all') {
  currentCategory = category;
  filteredImages = category === 'all'
    ? [...images]
    : images.filter(img => img.category === category);

  gallery.innerHTML = '';

  filteredImages.forEach((img, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-card fade-in';
    card.style.animationDelay = `${index * 0.05}s`;

    card.innerHTML = `
      <img src="${img.src}" alt="${img.title}" loading="lazy">
      <div class="caption">${img.title}</div>
    `;

    card.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(card);
  });
}

/* ===== Filter Buttons ===== */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.category);
  });
});

/* ===== Lightbox ===== */
function openLightbox(index) {
  currentIndex = index;
  const img = filteredImages[currentIndex];

  lightboxImage.classList.remove('fade-out');
  lightboxImage.src = img.src;
  lightboxImage.alt = img.title;
  lightboxCaption.textContent = img.title;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function navigate(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = filteredImages.length - 1;
  } else if (currentIndex >= filteredImages.length) {
    currentIndex = 0;
  }

  const img = filteredImages[currentIndex];

  lightboxImage.classList.add('fade-out');

  setTimeout(() => {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.title;
    lightboxCaption.textContent = img.title;
    lightboxImage.classList.remove('fade-out');
  }, 200);
}

/* ===== Lightbox Event Listeners ===== */
lightboxClose.addEventListener('click', closeLightbox);

lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  navigate(-1);
});

lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  navigate(1);
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

/* ===== Keyboard Navigation ===== */
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    navigate(-1);
  } else if (e.key === 'ArrowRight') {
    navigate(1);
  }
});

/* ===== Initialize ===== */
renderGallery('all');
