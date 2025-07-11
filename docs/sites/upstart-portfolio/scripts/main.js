// Upstart Portfolio - Main JavaScript
// Modern component loading and interactions

class UpstartPortfolio {
    constructor() {
        this.currentPage = 'home';
        this.portfolioProjects = [];
        this.visibleProjects = 6;
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Upstart Portfolio...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    async setup() {
        try {
            // Load global components
            await this.loadComponents();
            
            // Initialize interactive features
            this.initializeNavigation();
            this.initializeScrollEffects();
            this.initializePortfolio();
            this.initializeAnimations();
            this.initializeForms();
            
            console.log('✅ Upstart Portfolio initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing portfolio:', error);
        }
    }

    async loadComponents() {
        console.log('📦 Loading components...');
        
        // Determine current page structure
        const currentPath = window.location.pathname;
        const isHomePage = currentPath.includes('/home/') || currentPath.includes('/index.html') || currentPath === '/';
        
        try {
            // Load header
            await this.loadComponent('header-placeholder', '../globals/header.html');
            
            // Load footer
            await this.loadComponent('footer-placeholder', '../globals/footer.html');
            
            if (isHomePage) {
                // Load home page sections
                await this.loadComponent('hero-section', './hero.html');
                await this.loadComponent('services-section', './services.html');
                await this.loadComponent('portfolio-section', './portfolio.html');
                await this.loadComponent('contact-section', './contact.html');
            }
            
            console.log('✅ Components loaded successfully');
        } catch (error) {
            console.error('❌ Error loading components:', error);
        }
    }

    async loadComponent(placeholderId, componentPath) {
        try {
            const placeholder = document.getElementById(placeholderId);
            if (!placeholder) {
                console.warn(`⚠️ Placeholder ${placeholderId} not found`);
                return;
            }

            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentPath}: ${response.status}`);
            }
            
            const html = await response.text();
            placeholder.innerHTML = html;
            
            console.log(`✅ Component loaded: ${placeholderId}`);
        } catch (error) {
            console.error(`❌ Error loading component ${placeholderId}:`, error);
        }
    }

    initializeNavigation() {
        console.log('🧭 Initializing navigation...');
        
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // Animate hamburger icon
                const icon = mobileMenuButton.querySelector('svg');
                if (icon) {
                    icon.classList.toggle('rotate-45');
                }
            });
            
            // Close mobile menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
        
        // Smooth scrolling for navigation links
        this.initializeSmoothScrolling();
        
        // Active navigation highlighting
        this.initializeActiveNavigation();
    }

    initializeSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initializeActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    
                    // Update active navigation link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }

    initializeScrollEffects() {
        console.log('📜 Initializing scroll effects...');
        
        // Header background on scroll
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('bg-background/95');
                    header.classList.add('backdrop-blur-sm');
                } else {
                    header.classList.remove('bg-background/95');
                    header.classList.remove('backdrop-blur-sm');
                }
            });
        }
        
        // Parallax effects for hero section
        const heroSection = document.querySelector('#hero');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                const backgroundElements = heroSection.querySelectorAll('.absolute');
                backgroundElements.forEach(element => {
                    element.style.transform = `translateY(${rate}px)`;
                });
            });
        }
    }

    initializePortfolio() {
        console.log('💼 Initializing portfolio...');
        
        // Load portfolio projects
        this.loadPortfolioProjects();
        
        // Initialize filter functionality
        this.initializePortfolioFilters();
        
        // Initialize load more functionality
        this.initializeLoadMore();
    }

    loadPortfolioProjects() {
        // Sample portfolio data - in real app, this would come from API
        this.portfolioProjects = [
            {
                id: 1,
                title: "E-Commerce Platform",
                description: "A modern e-commerce solution with advanced features including real-time inventory management, secure payment processing, and comprehensive analytics dashboard.",
                category: "ecommerce",
                technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                image: "https://via.placeholder.com/600x400/3B82F6/ffffff?text=E-Commerce+Platform",
                liveUrl: "#",
                githubUrl: "#",
                completedDate: "March 2024",
                status: "Success",
                rating: "98%"
            },
            {
                id: 2,
                title: "Mobile Banking App",
                description: "Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.",
                category: "mobile",
                technologies: ["React Native", "Firebase", "Node.js", "Express"],
                image: "https://via.placeholder.com/600x400/10B981/ffffff?text=Banking+App",
                liveUrl: "#",
                githubUrl: "#",
                completedDate: "February 2024",
                status: "Success",
                rating: "99%"
            },
            {
                id: 3,
                title: "SaaS Dashboard",
                description: "Comprehensive dashboard for SaaS applications with advanced analytics, user management, and real-time data visualization.",
                category: "web",
                technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
                image: "https://via.placeholder.com/600x400/8B5CF6/ffffff?text=SaaS+Dashboard",
                liveUrl: "#",
                githubUrl: "#",
                completedDate: "January 2024",
                status: "Success",
                rating: "97%"
            },
            {
                id: 4,
                title: "Brand Identity Design",
                description: "Complete brand identity design including logo design, color palette, typography, and comprehensive brand guidelines.",
                category: "design",
                technologies: ["Figma", "Adobe Creative Suite", "Sketch", "InVision"],
                image: "https://via.placeholder.com/600x400/F59E0B/ffffff?text=Brand+Identity",
                liveUrl: "#",
                githubUrl: "#",
                completedDate: "December 2023",
                status: "Success",
                rating: "100%"
            },
            {
                id: 5,
                title: "Restaurant Website",
                description: "Modern restaurant website with online ordering system, table reservations, and integrated payment processing.",
                category: "web",
                technologies: ["Vue.js", "Nuxt.js", "Tailwind CSS", "Strapi"],
                image: "https://via.placeholder.com/600x400/EF4444/ffffff?text=Restaurant+Website",
                liveUrl: "#",
                githubUrl: "#",
                completedDate: "November 2023",
                status: "Success",
                rating: "96%"
            },
            {
                id: 6,
                title: "Fitness Tracking App",
                description: "Comprehensive fitness tracking mobile application with workout plans, nutrition tracking, and social features.",
                category: "mobile",
                technologies: ["Flutter", "Firebase", "Dart", "REST API"],
                image: "https://via.placeholder.com/600x400/06B6D4/ffffff?text=Fitness+App",
                liveUrl: "#",
                githubUrl: "#",
                completedDate: "October 2023",
                status: "Success",
                rating: "95%"
            },
            {
                id: 7,
                title: "Marketplace Platform",
                description: "Multi-vendor marketplace platform with advanced search, seller management, and integrated payment systems.",
                category: "ecommerce",
                technologies: ["Laravel", "Vue.js", "MySQL", "Redis"],
                image: "https://via.placeholder.com/600x400/84CC16/ffffff?text=Marketplace",
                liveUrl: "#",
                githubUrl: "#",
                completedDate: "September 2023",
                status: "Success",
                rating: "94%"
            },
            {
                id: 8,
                title: "Portfolio Website",
                description: "Creative portfolio website for a digital artist with interactive galleries and smooth animations.",
                category: "design",
                technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
                image: "https://via.placeholder.com/600x400/A855F7/ffffff?text=Portfolio+Site",
                liveUrl: "#",
                githubUrl: "#",
                completedDate: "August 2023",
                status: "Success",
                rating: "98%"
            }
        ];
        
        this.renderPortfolioProjects();
    }

    initializePortfolioFilters() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filter projects
                this.currentFilter = filter;
                this.visibleProjects = 6; // Reset visible count
                this.renderPortfolioProjects();
            });
        });
    }

    renderPortfolioProjects() {
        const portfolioGrid = document.getElementById('portfolio-grid');
        if (!portfolioGrid) return;
        
        // Filter projects
        const filteredProjects = this.currentFilter === 'all' 
            ? this.portfolioProjects 
            : this.portfolioProjects.filter(project => project.category === this.currentFilter);
        
        // Get visible projects
        const visibleProjects = filteredProjects.slice(0, this.visibleProjects);
        
        // Render projects
        portfolioGrid.innerHTML = visibleProjects.map(project => `
            <div class="card hover animate-fade-in-up group" data-category="${project.category}">
                <div class="relative overflow-hidden rounded-md mb-4">
                    <img src="${project.image}" alt="${project.title}" class="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="absolute bottom-4 left-4 right-4">
                            <div class="flex justify-between items-end">
                                <div>
                                    <h3 class="text-white font-semibold text-lg mb-1">${project.title}</h3>
                                    <p class="text-white/80 text-sm">${project.description.substring(0, 80)}...</p>
                                </div>
                                <div class="flex space-x-2">
                                    <a href="${project.liveUrl}" class="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                        </svg>
                                    </a>
                                    <a href="${project.githubUrl}" class="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors">
                                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="stack">
                    <div class="flex justify-between items-start">
                        <h3 class="h5 group-hover:text-primary transition-colors">
                            ${project.title}
                        </h3>
                        <span class="badge outline">${this.getCategoryLabel(project.category)}</span>
                    </div>
                    
                    <p class="text-muted text-sm leading-relaxed">
                        ${project.description}
                    </p>
                    
                    <div class="cluster sm">
                        ${project.technologies.map(tech => `<span class="badge primary sm">${tech}</span>`).join('')}
                    </div>
                    
                    <div class="flex items-center justify-between text-sm text-muted">
                        <span>Completed: ${project.completedDate}</span>
                        <div class="flex items-center space-x-4">
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                ${project.status}
                            </span>
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                                </svg>
                                ${project.rating} Rating
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Update load more button visibility
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = this.visibleProjects >= filteredProjects.length ? 'none' : 'block';
        }
    }

    getCategoryLabel(category) {
        const labels = {
            'web': 'Web Development',
            'mobile': 'Mobile App',
            'design': 'UI/UX Design',
            'ecommerce': 'E-Commerce'
        };
        return labels[category] || category;
    }

    initializeLoadMore() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.visibleProjects += 6;
                this.renderPortfolioProjects();
            });
        }
    }

    initializeAnimations() {
        console.log('✨ Initializing animations...');
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements with animation classes
        const elementsToAnimate = document.querySelectorAll('.animate-fade-in-up, .card');
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }

    initializeForms() {
        console.log('📝 Initializing forms...');
        
        // Form submission handling
        document.addEventListener('submit', (e) => {
            if (e.target.tagName === 'FORM') {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            }
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('📨 Form submitted:', data);
        
        // Show success message
        this.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Initialize the portfolio when DOM is ready
new UpstartPortfolio();