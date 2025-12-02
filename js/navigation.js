// js/navigation.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Активация текущей страницы в навигации
    activateCurrentPage();
    
    // 2. Инициализация кнопки "Наверх"
    initBackToTopButton();
    
    // 3. Плавная прокрутка для якорных ссылок
    initSmoothScrolling();
    
    // 4. Добавление активного класса при прокрутке для внутренней навигации
    initScrollSpy();
});

// Функция активации текущей страницы
function activateCurrentPage() {
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Если мы на главной странице (путь заканчивается на / или index.html)
    const isHomePage = path.endsWith('/') || path.endsWith('index.html') || currentPage === '' || currentPage === 'index.html';
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');
        
        // Для главной страницы
        if (isHomePage && linkHref === 'index.html') {
            link.classList.add('active');
        }
        // Для других страниц - точное совпадение
        else if (!isHomePage && linkHref === currentPage) {
            link.classList.add('active');
        }
        // Для случая, когда currentPage может быть пустым на GitHub Pages
        else if (currentPage === '' && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });
}

// Функция инициализации кнопки "Наверх"
function initBackToTopButton() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    // Сначала скрываем кнопку
    backToTopButton.style.display = 'none';
    
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
            
            // Игнорируем простые ссылки на "#"
            if (href === '#' || href === '#!') {
                return;
            }
            
            e.preventDefault();
            
            if (href === '#top') {
                window.scrollTo({top: 0, behavior: 'smooth'});
            } else {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // Учитываем высоту фиксированной навигации
                    const navbarHeight = document.querySelector('.navbar').offsetHeight || 80;
                    const offsetTop = targetElement.offsetTop - navbarHeight;
                    window.scrollTo({top: offsetTop, behavior: 'smooth'});
                }
            }
        });
    });
}

// Функция отслеживания прокрутки для внутренней навигации (если есть)
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], h2[id], h3[id], .anchor-section[id]');
    const navLinks = document.querySelectorAll('.page-nav a, .internal-nav a, .toc a');
    
    // Если нет секций с id или навигационных ссылок, выходим
    if (sections.length === 0 || navLinks.length === 0) {
        return;
    }
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Добавляем небольшой отступ
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Активируем первую ссылку при загрузке
    if (window.scrollY === 0 && sections.length > 0) {
        const firstLink = document.querySelector('.page-nav a, .internal-nav a, .toc a');
        if (firstLink) {
            firstLink.classList.add('active');
        }
    }
}
