// js/about.js

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация закладок
    initTabs();
    
    // Настройка быстрой навигации
    initQuickLinks();
    
    // Активируем первую закладку
    switchTab('history');
});

// Функция инициализации закладок
function initTabs() {
    // Отключаем стандартное поведение Bootstrap для наших закладок
    const tabTriggers = document.querySelectorAll('[data-bs-toggle="tab"]');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-bs-target');
            if (targetId) {
                switchTab(targetId.replace('#', ''));
            }
        });
    });
    
    // Навигационные кнопки внизу страницы
    const navButtons = document.querySelectorAll('.tab-navigation button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('onclick')?.match(/switchTab\('(\w+)'\)/)?.[1];
            if (tabId) {
                switchTab(tabId);
            }
        });
    });
}

// Функция переключения закладок
function switchTab(tabId) {
    // Получаем текущую позицию прокрутки (чтобы страница не прыгала)
    const scrollPosition = window.scrollY;
    
    // Скрываем все закладки
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('show', 'active');
    });
    
    // Показываем выбранную закладку
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('show', 'active');
    }
    
    // Обновляем активную ссылку в навигации
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-bs-target') === `#${tabId}`) {
            item.classList.add('active');
        }
    });
    
    // Обновляем активные кнопки навигации
    updateNavigationButtons(tabId);
    
    // Восстанавливаем позицию прокрутки (фикс от прыжков)
    window.scrollTo(0, scrollPosition);
}

// Функция обновления навигационных кнопок
function updateNavigationButtons(activeTabId) {
    const buttons = document.querySelectorAll('.tab-indicators .btn');
    buttons.forEach(button => {
        button.classList.remove('active');
        const buttonTabId = button.getAttribute('onclick')?.match(/switchTab\('(\w+)'\)/)?.[1];
        if (buttonTabId === activeTabId) {
            button.classList.add('active');
            button.classList.add('btn-primary');
            button.classList.remove('btn-outline-primary');
        } else {
            button.classList.add('btn-outline-primary');
            button.classList.remove('btn-primary');
        }
    });
}

// Функция инициализации быстрых ссылок
function initQuickLinks() {
    document.querySelectorAll('.quick-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '#top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const tabId = href.replace('#', '').replace('-tab', '');
            if (tabId && ['history', 'process', 'equipment', 'ecology'].includes(tabId)) {
                switchTab(tabId);
            }
        });
    });
    
    // Обработчик для всех якорных ссылок на странице
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#top') {
                const tabId = href.replace('#', '').replace('-tab', '');
                if (tabId && ['history', 'process', 'equipment', 'ecology'].includes(tabId)) {
                    e.preventDefault();
                    switchTab(tabId);
                }
            }
        });
    });
}
