// js/products.js

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация продукции по категориям
    initProductsByCategory();
    
    // Настройка фильтров
    initFilters();
});

// Данные о продукции (12 повторяющихся блоков)
const productsData = [
    {
        id: 1,
        name: "Картонная коробка малая",
        description: "Идеальна для упаковки небольших товаров, канцелярии, косметики.",
        price: "от 12 руб./шт",
        category: "small",
        image: "images/small-box.jpg"
    },
    {
        id: 2,
        name: "Картонная коробка средняя",
        description: "Подходит для упаковки книг, обуви, бытовой техники.",
        price: "от 18 руб./шт",
        category: "medium",
        image: "images/box.avif"
    },
    {
        id: 3,
        name: "Картонная коробка большая",
        description: "Для крупногабаритных товаров, переездов, хранения вещей.",
        price: "от 25 руб./шт",
        category: "large",
        image: "images/large-box.jpg"
    },
    {
        id: 4,
        name: "Подарочная коробка",
        description: "Элегантная упаковка для подарков с дизайнерской печатью.",
        price: "от 35 руб./шт",
        category: "special",
        image: "images/gift-box.jpg"
    },
    {
        id: 5,
        name: "Коробка для пиццы",
        description: "Специальная коробка для доставки пиццы и другой еды.",
        price: "от 8 руб./шт",
        category: "special",
        image: "images/pizza-box.png"
    },
    {
        id: 6,
        name: "Коробка для переезда",
        description: "Прочная коробка для переездов с усиленными стенками.",
        price: "от 30 руб./шт",
        category: "large",
        image: "images/move-box.webp"
    },
    {
        id: 7,
        name: "Коробка для электроники",
        description: "Защитная упаковка для телефонов, планшетов и другой техники.",
        price: "от 15 руб./шт",
        category: "small",
        image: "images/electronic-box.jpg"
    },
    {
        id: 8,
        name: "Коробка для косметики",
        description: "Стильная упаковка для косметических средств и парфюмерии.",
        price: "от 20 руб./шт",
        category: "medium",
        image: "image/cosmetics-box.jpg"
    },
    {
        id: 9,
        name: "Коробка для вина",
        description: "Специальная упаковка для бутылок вина и других напитков.",
        price: "от 22 руб./шт",
        category: "special",
        image: "images/vine-box.jpg"
    },
    {
        id: 10,
        name: "Коробка для документов",
        description: "Архивная коробка для хранения документов и бумаг.",
        price: "от 28 руб./шт",
        category: "medium",
        image: "images/office-box.webp"
    },
    {
        id: 11,
        name: "Коробка для игрушек",
        description: "Яркая коробка для детских игрушек с безопасными краями.",
        price: "от 16 руб./шт",
        category: "small",
        image: "images/kids-box.jpg"
    },
    {
        id: 12,
        name: "Коробка для цветов",
        description: "Элегантная коробка для букетов и цветочных композиций.",
        price: "от 32 руб./шт",
        category: "special",
        image: "images/flower-box.jpg"
    }
];

// Функция инициализации продукции по категориям
function initProductsByCategory() {
    // Контейнеры для каждой категории
    const containers = {
        'small': document.getElementById('smallBoxesContainer'),
        'medium': document.getElementById('mediumBoxesContainer'),
        'large': document.getElementById('largeBoxesContainer'),
        'special': document.getElementById('specialBoxesContainer')
    };
    
    // Очищаем все контейнеры
    Object.values(containers).forEach(container => {
        if (container) container.innerHTML = '';
    });
    
    // Распределяем продукты по категориям
    productsData.forEach(product => {
        const container = containers[product.category];
        if (container) {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
        }
    });
    
    // Скрываем пустые секции
    Object.entries(containers).forEach(([category, container]) => {
        if (container && container.children.length === 0) {
            // Находим заголовок секции и скрываем его
            const sectionHeader = document.querySelector(`#${category}-boxes`);
            if (sectionHeader) {
                sectionHeader.style.display = 'none';
            }
            container.style.display = 'none';
        }
    });
}

// Функция создания карточки продукта
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    
    col.innerHTML = `
        <div class="card product-card h-100">
            <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <div class="mt-auto">
                    <p class="price">${product.price}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-primary add-to-order" data-id="${product.id}">
                            Заказать
                        </button>
                        <span class="badge bg-secondary">${getCategoryName(product.category)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем обработчик события для кнопки "Заказать"
    const orderBtn = col.querySelector('.add-to-order');
    orderBtn.addEventListener('click', function() {
        addToOrder(product.id);
    });
    
    return col;
}

// Функция получения названия категории
function getCategoryName(categoryCode) {
    const categories = {
        'small': 'Малая',
        'medium': 'Средняя',
        'large': 'Крупная',
        'special': 'Специальная'
    };
    
    return categories[categoryCode] || categoryCode;
}

// Функция инициализации фильтров
function initFilters() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', filterProducts);
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                filterProducts();
            }
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
}

// Функция фильтрации продуктов
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    // Контейнеры для каждой категории
    const containers = {
        'small': document.getElementById('smallBoxesContainer'),
        'medium': document.getElementById('mediumBoxesContainer'),
        'large': document.getElementById('largeBoxesContainer'),
        'special': document.getElementById('specialBoxesContainer')
    };
    
    // Очищаем все контейнеры
    Object.values(containers).forEach(container => {
        if (container) container.innerHTML = '';
    });
    
    // Сначала скрываем все секции
    Object.keys(containers).forEach(category => {
        const sectionHeader = document.querySelector(`#${category}-boxes`);
        const container = containers[category];
        
        if (sectionHeader) sectionHeader.style.display = 'none';
        if (container) container.style.display = 'none';
    });
    
    // Фильтруем продукты
    const filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    // Распределяем отфильтрованные продукты по категориям
    filteredProducts.forEach(product => {
        const container = containers[product.category];
        if (container) {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
        }
    });
    
    // Показываем только непустые секции
    Object.entries(containers).forEach(([category, container]) => {
        if (container && container.children.length > 0) {
            const sectionHeader = document.querySelector(`#${category}-boxes`);
            if (sectionHeader) {
                sectionHeader.style.display = 'block';
            }
            container.style.display = 'flex';
        }
    });
    
    // Если нет товаров, показываем сообщение
    if (filteredProducts.length === 0) {
        const mainContainer = document.getElementById('productsContainer');
        if (mainContainer) {
            const noProductsMsg = document.createElement('div');
            noProductsMsg.className = 'col-12 text-center py-5';
            noProductsMsg.innerHTML = `
                <h3>Продукты не найдены</h3>
                <p>Попробуйте изменить параметры поиска</p>
            `;
            mainContainer.appendChild(noProductsMsg);
        }
    }
}

// Функция добавления в заказ
function addToOrder(productId) {
    const product = productsData.find(p => p.id === productId);
    
    if (product) {
        // Сохраняем в localStorage для передачи на страницу заказа
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        
        // Перенаправляем на страницу заказа
        window.location.href = 'order.html';
        
        // Или показываем уведомление
        alert(`Товар "${product.name}" добавлен в заказ!`);
    }
}
