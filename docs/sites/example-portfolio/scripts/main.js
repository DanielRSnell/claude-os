// Load global components
async function loadComponent(placeholder, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(placeholder).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', async () => {
    // Determine current page structure
    const currentPath = window.location.pathname;
    const isHomePage = currentPath.includes('/pages/home/');
    
    if (isHomePage) {
        // Load global components for home page
        await loadComponent('header-placeholder', '../../globals/header.html');
        await loadComponent('footer-placeholder', '../../globals/footer.html');
        
        // Load page sections
        await loadComponent('hero-section', './hero.html');
        await loadComponent('about-section', './about.html');
        await loadComponent('projects-section', './projects.html');
        await loadComponent('contact-section', './contact.html');
    } else {
        // Load global components for other pages
        await loadComponent('header-placeholder', '../globals/header.html');
        await loadComponent('footer-placeholder', '../globals/footer.html');
    }
    
    // Load project cards
    loadProjectCards();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize animations
    initializeAnimations();
});

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 80; // Account for fixed header
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Load project cards
function loadProjectCards() {
    const projectsData = [
        {
            title: "E-commerce Platform",
            description: "A full-featured e-commerce platform with modern design and smooth user experience.",
            technologies: ["HTML", "CSS", "JavaScript", "Tailwind"],
            image: "https://via.placeholder.com/400x225",
            github: "#",
            live: "#"
        },
        {
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates.",
            technologies: ["React", "Node.js", "MongoDB", "Tailwind"],
            image: "https://via.placeholder.com/400x225",
            github: "#",
            live: "#"
        },
        {
            title: "Portfolio Website",
            description: "A responsive portfolio website showcasing web development projects.",
            technologies: ["HTML", "CSS", "JavaScript", "Tailwind"],
            image: "https://via.placeholder.com/400x225",
            github: "#",
            live: "#"
        }
    ];
    
    const projectCardsContainer = document.getElementById('project-cards');
    
    if (projectCardsContainer) {
        projectCardsContainer.innerHTML = projectsData.map(project => `
            <div class="card hover:shadow-md transition-all duration-300 group">
                <div class="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
                    <img src="${project.image}" alt="${project.title} preview" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                </div>
                
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <h3 class="h5">
                            ${project.title}
                        </h3>
                        <div class="flex space-x-2">
                            <a href="${project.github}" class="text-muted hover:text-foreground transition-colors">
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="${project.live}" class="text-muted hover:text-foreground transition-colors">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    <p class="text-muted text-sm">
                        ${project.description}
                    </p>
                    
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => `
                            <span class="badge primary">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize animations on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll('.card, h2, h3');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Form submission handling
document.addEventListener('submit', (e) => {
    if (e.target.tagName === 'FORM') {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        console.log('Form submitted:', data);
        
        // Show success message (you would typically send to a server)
        alert('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        e.target.reset();
    }
});

// Accordion functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.accordion-trigger')) {
        const trigger = e.target.closest('.accordion-trigger');
        const content = trigger.nextElementSibling;
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        
        // Toggle current accordion
        trigger.setAttribute('aria-expanded', !isExpanded);
        content.setAttribute('aria-hidden', isExpanded);
        
        // The CSS handles the chevron rotation via the transform class
        // No need for inline styles since we have CSS rules for this
    }
});

// Tabs functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tabs-trigger')) {
        const trigger = e.target;
        const tabsList = trigger.closest('.tabs-list');
        const tabsContainer = trigger.closest('.tabs');
        const triggerText = trigger.textContent.trim();
        
        // Remove active class from all triggers in this tabs container
        tabsList.querySelectorAll('.tabs-trigger').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked trigger
        trigger.classList.add('active');
        
        // Update content based on the clicked tab
        const contentContainer = tabsContainer.querySelector('.tabs-content');
        if (contentContainer) {
            updateTabContent(contentContainer, triggerText);
        }
        
        console.log('Tab clicked:', triggerText);
    }
});

// Update tab content based on selected tab
function updateTabContent(contentContainer, tabName) {
    const contentMap = {
        'Overview': {
            title: 'Overview',
            content: 'This framework provides a comprehensive set of utility classes and components for building modern web interfaces quickly and efficiently.'
        },
        'Features': {
            title: 'Features',
            content: 'The framework includes semantic classes, responsive design utilities, interactive components, and consistent design tokens for rapid development.'
        },
        'Usage': {
            title: 'Usage',
            content: 'Simply add the CSS classes to your HTML elements. Use modifier classes like .primary, .sm, .lg to customize components.'
        },
        'Components': {
            title: 'Components',
            content: 'The framework includes buttons, cards, forms, badges, alerts, and other interactive components.',
            badges: ['Buttons', 'Cards', 'Forms', 'Badges']
        },
        'Layout': {
            title: 'Layout',
            content: 'Layout utilities include containers, grids, flexbox helpers, and spacing utilities for consistent layouts.'
        },
        'Typography': {
            title: 'Typography',
            content: 'Typography classes provide consistent heading styles, text sizes, and font weights across your application.'
        },
        'Utilities': {
            title: 'Utilities',
            content: 'Utility classes for colors, spacing, borders, shadows, and other common styling needs.'
        }
    };
    
    const content = contentMap[tabName] || contentMap['Overview'];
    
    let html = `
        <div class="stack">
            <h4 class="h4">${content.title}</h4>
            <p class="small">${content.content}</p>
    `;
    
    if (content.badges) {
        html += `
            <div class="cluster">
                ${content.badges.map(badge => `<span class="badge primary">${badge}</span>`).join('')}
            </div>
        `;
    }
    
    html += '</div>';
    
    contentContainer.innerHTML = html;
}