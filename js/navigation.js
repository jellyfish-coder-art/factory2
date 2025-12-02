// js/navigation.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Активация текущей страницы в навигации
    activateCurrentPage();
    
    // 2. Инициализация кнопки "Наверх"
    initBackToTopButton();
    
    // 3. Плавная прокрутка для якорных ссылок
    initSmoothScrolling();
    
    // 4. Добавление активного класса при прокрутке
    initScrollSpy();
});

// Функция активации текущей страницы
function activateCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Для главной страницы
        if (currentPage === '' || currentPage === 'index.html') {
            if (link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
        }
        // Для других страниц
        else if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Функция инициализации кнопки "Наверх"
function initBackToTopButton() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}

// Функция плавной прокрутки
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                if (href === '#top') {
                    window.scrollTo({top: 0, behavior: 'smooth'});
                } else {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80;
                        window.scrollTo({top: offsetTop, behavior: 'smooth'});
                    }
                }
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Функция отслеживания прокрутки
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], h2[id], h3[id]');
    const navLinks = document.querySelectorAll('.page-nav a, .internal-nav a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
