// js/products.js

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация продукции
    initProducts();
    
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
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        name: "Картонная коробка средняя",
        description: "Подходит для упаковки книг, обуви, бытовой техники.",
        price: "от 18 руб./шт",
        category: "medium",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        name: "Картонная коробка большая",
        description: "Для крупногабаритных товаров, переездов, хранения вещей.",
        price: "от 25 руб./шт",
        category: "large",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        name: "Подарочная коробка",
        description: "Элегантная упаковка для подарков с дизайнерской печатью.",
        price: "от 35 руб./шт",
        category: "special",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 5,
        name: "Коробка для пиццы",
        description: "Специальная коробка для доставки пиццы и другой еды.",
        price: "от 8 руб./шт",
        category: "special",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 6,
        name: "Коробка для переезда",
        description: "Прочная коробка для переездов с усиленными стенками.",
        price: "от 30 руб./шт",
        category: "large",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 7,
        name: "Коробка для электроники",
        description: "Защитная упаковка для телефонов, планшетов и другой техники.",
        price: "от 15 руб./шт",
        category: "small",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 8,
        name: "Коробка для косметики",
        description: "Стильная упаковка для косметических средств и парфюмерии.",
        price: "от 20 руб./шт",
        category: "medium",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 9,
        name: "Коробка для вина",
        description: "Специальная упаковка для бутылок вина и других напитков.",
        price: "от 22 руб./шт",
        category: "special",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 10,
        name: "Коробка для документов",
        description: "Архивная коробка для хранения документов и бумаг.",
        price: "от 28 руб./шт",
        category: "medium",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 11,
        name: "Коробка для игрушек",
        description: "Яркая коробка для детских игрушек с безопасными краями.",
        price: "от 16 руб./шт",
        category: "small",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 12,
        name: "Коробка для цветов",
        description: "Элегантная коробка для букетов и цветочных композиций.",
        price: "от 32 руб./шт",
        category: "special",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
];

// Функция инициализации продукции
function initProducts() {
    const container = document.getElementById('productsContainer');
    
    if (!container) return;
    
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Создаем карточки для каждого продукта
    productsData.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
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
    const category = document.getElementById('categoryFilter').value;
    const container = document.getElementById('productsContainer');
    
    if (!container) return;
    
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Фильтруем продукты
    const filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || product.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    // Отображаем отфильтрованные продукты
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3>Продукты не найдены</h3>
                <p>Попробуйте изменить параметры поиска</p>
            </div>
        `;
    } else {
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
        });
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
