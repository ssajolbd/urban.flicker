// Carousel JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicators .indicator');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  
  if (!slides.length) return;
  
  let currentIndex = 0;
  let interval;
  const intervalTime = 5000; // 5 seconds per slide
  
  // Initialize carousel
  function initCarousel() {
    // Show first slide
    slides[0].classList.add('active');
    indicators[0].classList.add('active');
    
    // Start autoplay
    startAutoplay();
    
    // Add event listeners
    prevBtn.addEventListener('click', showPrevSlide);
    nextBtn.addEventListener('click', showNextSlide);
    
    // Add indicator click events
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    // Pause autoplay on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', handleKeyboardNav);
    
    // Handle swipe on touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        showNextSlide();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        showPrevSlide();
      }
    }
  }
  
  // Show previous slide
  function showPrevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // Show next slide
  function showNextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  // Go to specific slide
  function goToSlide(index) {
    // Remove active class from current slide
    slides[currentIndex].classList.remove('active');
    indicators[currentIndex].classList.remove('active');
    
    // Calculate new index with wrap-around
    currentIndex = (index + slides.length) % slides.length;
    
    // Add active class to new slide
    slides[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
    
    // Reset autoplay
    if (interval) {
      stopAutoplay();
      startAutoplay();
    }
  }
  
  // Start autoplay
  function startAutoplay() {
    if (!interval) {
      interval = setInterval(showNextSlide, intervalTime);
    }
  }
  
  // Stop autoplay
  function stopAutoplay() {
    clearInterval(interval);
    interval = null;
  }
  
  // Handle keyboard navigation
  function handleKeyboardNav(e) {
    // Only handle if carousel is in viewport
    const carousel = document.querySelector('.hero-carousel');
    const rect = carousel.getBoundingClientRect();
    const isInViewport = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    
    if (isInViewport) {
      if (e.key === 'ArrowLeft') {
        showPrevSlide();
      } else if (e.key === 'ArrowRight') {
        showNextSlide();
      }
    }
  }
  
  // Initialize the carousel
  initCarousel();
});