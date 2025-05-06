// Gallery JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Gallery filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Initialize gallery filtering
  function initFiltering() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filterValue === 'all' || filterValue === itemCategory) {
            // Show item with animation
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            // Hide item with animation
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // Initialize gallery lightbox
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxTitle = lightboxCaption.querySelector('h3');
    const lightboxCategory = lightboxCaption.querySelector('span');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-arrow.prev');
    const lightboxNext = document.querySelector('.lightbox-arrow.next');
    
    let currentIndex = 0;
    let visibleItems = [];
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        visibleItems = Array.from(galleryItems).filter(item => {
          return window.getComputedStyle(item).display !== 'none';
        });
        
        currentIndex = visibleItems.indexOf(item);
        openLightbox(item);
      });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Navigate through lightbox
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    });
    
    // Open lightbox with the selected item
    function openLightbox(item) {
      const imgSrc = item.querySelector('img').getAttribute('src');
      const title = item.querySelector('.item-overlay h3').textContent;
      const category = item.querySelector('.item-overlay span').textContent;
      
      lightboxImage.setAttribute('src', imgSrc);
      lightboxImage.setAttribute('alt', title);
      lightboxTitle.textContent = title;
      lightboxCategory.textContent = category;
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Add loading animation
      lightboxImage.style.opacity = '0';
      setTimeout(() => {
        lightboxImage.style.opacity = '1';
      }, 100);
    }
    
    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Show previous image
    function showPrevImage() {
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      updateLightboxContent();
    }
    
    // Show next image
    function showNextImage() {
      currentIndex = (currentIndex + 1) % visibleItems.length;
      updateLightboxContent();
    }
    
    // Update lightbox content
    function updateLightboxContent() {
      const item = visibleItems[currentIndex];
      const imgSrc = item.querySelector('img').getAttribute('src');
      const title = item.querySelector('.item-overlay h3').textContent;
      const category = item.querySelector('.item-overlay span').textContent;
      
      // Add transition effect
      lightboxImage.style.opacity = '0';
      
      setTimeout(() => {
        lightboxImage.setAttribute('src', imgSrc);
        lightboxImage.setAttribute('alt', title);
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = category;
        lightboxImage.style.opacity = '1';
      }, 300);
    }
  }
  
  // Initialize the gallery features
  initFiltering();
  initLightbox();
  
  // Initialize AOS (Animation On Scroll) effect for gallery items
  galleryItems.forEach((item, index) => {
    // Add staggered entrance animation
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 100);
  });
});