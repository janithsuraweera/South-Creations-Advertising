// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-toggle');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navbar = document.querySelector('.navbar');
    navbar.insertBefore(menuButton, navLinks);

    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
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

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Portfolio Image Loading Animation
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Scroll to Top Button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.classList.add('scroll-top');
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--secondary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: background-color 0.3s ease;
    }

    .scroll-top:hover {
        background-color: #2980b9;
    }

    .menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--primary-color);
    }

    @media (max-width: 480px) {
        .menu-toggle {
            display: block;
        }
    }
`;
document.head.appendChild(style);

// Facebook Graph API Integration
const FB_PAGE_ID = 'SouthCreationsAdvertising'; // Your Facebook page ID
const FB_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // You'll need to get this from Facebook Developers

// Function to fetch photos from Facebook
async function fetchFacebookPhotos() {
    try {
        const response = await fetch(`https://graph.facebook.com/v18.0/${FB_PAGE_ID}/photos?fields=images,link&access_token=${FB_ACCESS_TOKEN}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching Facebook photos:', error);
        return [];
    }
}

// Function to create portfolio items
function createPortfolioItem(photo) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    
    // Get the highest resolution image
    const imageUrl = photo.images[0].source;
    
    portfolioItem.innerHTML = `
        <img src="${imageUrl}" alt="Portfolio Work">
        <div class="portfolio-overlay">
            <h3>Our Work</h3>
            <p>View on Facebook</p>
            <a href="${photo.link}" target="_blank" class="portfolio-link">
                <i class="fab fa-facebook"></i>
            </a>
        </div>
    `;
    
    portfolioGrid.appendChild(portfolioItem);
}

// Load portfolio items when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const photos = await fetchFacebookPhotos();
    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioGrid.innerHTML = ''; // Clear existing items
    
    photos.forEach(photo => {
        createPortfolioItem(photo);
    });
}); 