// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('button, a, .ingredient-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Smoothie Builder
const ingredientCards = document.querySelectorAll('.ingredient-card');
const smoothieGlass = document.getElementById('smoothieGlass');
const totalPrice = document.getElementById('totalPrice');
let selectedIngredient = null;

ingredientCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove previous selection
        ingredientCards.forEach(c => c.classList.remove('selected'));
        
        // Add selection to clicked card
        card.classList.add('selected');
        
        // Update smoothie preview
        const price = card.dataset.price;
        const color = card.dataset.color;
        const name = card.querySelector('.ingredient-name').textContent;
        
        smoothieGlass.style.background = `linear-gradient(to bottom, ${color}, #fff)`;
        smoothieGlass.style.transform = 'scale(1.1)';
        setTimeout(() => {
            smoothieGlass.style.transform = 'scale(1)';
        }, 300);
        
        totalPrice.textContent = `$${price}.99`;
        selectedIngredient = name;
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards
document.querySelectorAll('.ingredient-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add to cart functionality
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        if (selectedIngredient) {
            // Create success animation
            btn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
            btn.textContent = 'Added! ✓';
            
            setTimeout(() => {
                btn.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
                btn.textContent = 'Add to Cart';
            }, 2000);
        } else if (btn.textContent === 'Build Your Blend') {
            document.querySelector('#menu').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
