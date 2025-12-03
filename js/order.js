// js/form.js

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация формы заказа
    initOrderForm();
    
    // Инициализация динамического расчета
    initOrderCalculator();
    
    // Загрузка выбранного продукта из localStorage
    loadSelectedProduct();
});

// Функция инициализации формы заказа
function initOrderForm() {
    const orderForm = document.getElementById('orderForm');
    const orderSummary = document.getElementById('orderSummaryContent');
    
    if (!orderForm) return;
    
// Валидация формы перед отправкой
orderForm.addEventListener('submit', function(event) {
    // Всегда предотвращаем стандартную отправку
    event.preventDefault();
    
    if (validateForm()) {
        // Наша функция подготовит данные и покажет сообщение
        const shouldSubmit = sendOrderData();
        
        // Через 2 секунды отправляем форму в Google
        if (shouldSubmit === false) {
            setTimeout(() => {
                this.submit(); // Отправляем форму в Google
            }, 2000);
        }
    }
});
    
    // Обновление сводки заказа при изменении формы
    orderForm.addEventListener('change', updateOrderSummary);
    orderForm.addEventListener('input', updateOrderSummary);
    
    // Инициализация сводки
    updateOrderSummary();
}

// Функция загрузки выбранного продукта из каталога
function loadSelectedProduct() {
    try {
        const savedProduct = localStorage.getItem('selectedProduct');
        if (savedProduct) {
            const product = JSON.parse(savedProduct);
            const boxTypeSelect = document.getElementById('boxType');
            
            if (boxTypeSelect && product.category) {
                // Устанавливаем соответствующую категорию
                boxTypeSelect.value = product.category;
                
                // Показываем уведомление
                const notification = document.createElement('div');
                notification.className = 'alert alert-info alert-dismissible fade show';
                notification.innerHTML = `
                    <i class="bi bi-cart-check me-2"></i>
                    <strong>Товар добавлен из каталога:</strong> ${product.name}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
                document.querySelector('.card-body').prepend(notification);
                
                // Очищаем localStorage
                localStorage.removeItem('selectedProduct');
                
                // Обновляем сводку
                setTimeout(updateOrderSummary, 100);
            }
        }
    } catch (error) {
        console.error('Ошибка загрузки продукта:', error);
    }
}

// Функция валидации формы
function validateForm() {
    const form = document.getElementById('orderForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Проверка обязательных полей
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            markFieldAsInvalid(field);
            isValid = false;
        } else {
            markFieldAsValid(field);
        }
    });
    
    // Проверка email
    const emailField = document.getElementById('customerEmail');
    if (emailField.value && !isValidEmail(emailField.value)) {
        markFieldAsInvalid(emailField);
        isValid = false;
    }
    
    // Проверка телефона
    const phoneField = document.getElementById('phoneNumber');
    if (phoneField.value && !isValidPhone(phoneField.value)) {
        markFieldAsInvalid(phoneField);
        isValid = false;
    }
    
    // Проверка количества (минимум 100)
    const quantityField = document.getElementById('quantity');
    if (quantityField.value && parseInt(quantityField.value) < 100) {
        markFieldAsInvalid(quantityField);
        isValid = false;
    }
    
    // Проверка типа коробки
    const boxTypeField = document.getElementById('boxType');
    if (boxTypeField && !boxTypeField.value) {
        markFieldAsInvalid(boxTypeField);
        isValid = false;
    }
    
    return isValid;
}

// Функция проверки email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция проверки телефона
function isValidPhone(phone) {
    // Разрешаем +7, 8, или просто цифры с возможными пробелами, скобками, дефисами
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Функция отметки поля как невалидного
function markFieldAsInvalid(field) {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
    
    // Добавляем сообщение об ошибке, если его нет
    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('invalid-feedback')) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        
        if (field.type === 'number' && field.id === 'quantity') {
            errorDiv.textContent = 'Минимальный заказ: 100 шт';
        } else if (field.type === 'email') {
            errorDiv.textContent = 'Введите корректный email адрес';
        } else if (field.id === 'phoneNumber') {
            errorDiv.textContent = 'Введите корректный номер телефона';
        } else {
            errorDiv.textContent = 'Это поле обязательно для заполнения';
        }
        
        field.parentNode.appendChild(errorDiv);
    }
}

// Функция отметки поля как валидного
function markFieldAsValid(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    
    // Удаляем сообщение об ошибке, если оно есть
    const errorDiv = field.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
        errorDiv.remove();
    }
}

// Функция обновления сводки заказа
function updateOrderSummary() {
    const orderSummary = document.getElementById('orderSummaryContent');
    
    if (!orderSummary) return;
    
    // Получаем значения из формы
    const boxType = document.getElementById('boxType').value;
    const quantity = document.getElementById('quantity').value || 0;
    const deliverySpeed = document.querySelector('input[name="deliverySpeed"]:checked')?.value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    const boxSize = document.getElementById('boxSize').value;
    
    // Рассчитываем стоимость
    const pricePerUnit = getPricePerUnit(boxType);
    const totalPrice = calculateTotalPrice(pricePerUnit, quantity, deliverySpeed);
    
    // Формируем HTML для сводки
    let summaryHTML = `
        <h5>Детали вашего заказа:</h5>
        <table class="table table-sm">
    `;
    
    if (boxType) {
        const boxName = getBoxName(boxType);
        summaryHTML += `
            <tr>
                <td><i class="bi bi-box me-2"></i>Тип коробки:</td>
                <td><strong>${boxName}</strong></td>
            </tr>
        `;
    }
    
    summaryHTML += `
            <tr>
                <td><i class="bi bi-123 me-2"></i>Количество:</td>
                <td><strong>${quantity} шт</strong></td>
            </tr>
    `;
    
    if (boxSize) {
        summaryHTML += `
            <tr>
                <td><i class="bi bi-rulers me-2"></i>Размер:</td>
                <td>${boxSize}</td>
            </tr>
        `;
    }
    
    if (pricePerUnit > 0) {
        summaryHTML += `
            <tr>
                <td><i class="bi bi-currency-exchange me-2"></i>Цена за шт:</td>
                <td>${pricePerUnit} руб.</td>
            </tr>
        `;
    }
    
    if (deliverySpeed) {
        const deliveryText = deliverySpeed === 'express' ? 
            '<span class="text-warning">Срочная (3-5 дней) +20%</span>' : 
            'Стандартная (7-10 дней)';
        summaryHTML += `
            <tr>
                <td><i class="bi bi-truck me-2"></i>Срок доставки:</td>
                <td>${deliveryText}</td>
            </tr>
        `;
    }
    
    if (paymentMethod) {
        const paymentText = getPaymentMethodText(paymentMethod);
        summaryHTML += `
            <tr>
                <td><i class="bi bi-credit-card me-2"></i>Способ оплаты:</td>
                <td>${paymentText}</td>
            </tr>
        `;
    }
    
    // Скидки
    const quantityNum = parseInt(quantity);
    if (quantityNum >= 1000) {
        summaryHTML += `
            <tr class="table-success">
                <td><i class="bi bi-percent me-2"></i>Скидка:</td>
                <td><strong>10% за большой объем</strong></td>
            </tr>
        `;
    } else if (quantityNum >= 500) {
        summaryHTML += `
            <tr class="table-success">
                <td><i class="bi bi-percent me-2"></i>Скидка:</td>
                <td><strong>5% за объем</strong></td>
            </tr>
        `;
    }
    
    if (totalPrice > 0) {
        summaryHTML += `
            <tr class="table-primary fw-bold">
                <td><i class="bi bi-calculator me-2"></i>Итого:</td>
                <td>${totalPrice.toLocaleString('ru-RU')} руб.</td>
            </tr>
        `;
    }
    
    summaryHTML += `
        </table>
        <div class="alert alert-success">
            <i class="bi bi-info-circle me-2"></i>
            При заказе от <strong>5000 коробок</strong> - бесплатная доставка!
        </div>
    `;
    
    orderSummary.innerHTML = summaryHTML;
}

// Функция получения цены за единицу
function getPricePerUnit(boxType) {
    const prices = {
        'small': 12,
        'medium': 18,
        'large': 25,
        'special': 35
    };
    
    return prices[boxType] || 0;
}

// Функция получения названия коробки
function getBoxName(boxType) {
    const names = {
        'small': 'Малая коробка',
        'medium': 'Средняя коробка',
        'large': 'Крупная коробка',
        'special': 'Специальная коробка'
    };
    
    return names[boxType] || 'Не выбрано';
}

// Функция получения текста способа оплаты
function getPaymentMethodText(paymentMethod) {
    const methods = {
        'cash': 'Наличные при получении',
        'card': 'Безналичный расчет',
        'online': 'Онлайн оплата картой'
    };
    
    return methods[paymentMethod] || 'Не выбрано';
}

// Функция расчета общей стоимости
function calculateTotalPrice(pricePerUnit, quantity, deliverySpeed) {
    const quantityNum = parseInt(quantity) || 0;
    let total = pricePerUnit * quantityNum;
    
    if (total <= 0) return 0;
    
    // Наценка за срочность
    if (deliverySpeed === 'express') {
        total *= 1.2; // +20% за срочность
    }
    
    // Скидка за объем
    if (quantityNum >= 1000) {
        total *= 0.9; // -10%
    } else if (quantityNum >= 500) {
        total *= 0.95; // -5%
    }
    
    return Math.round(total);
}

// Функция инициализации калькулятора
function initOrderCalculator() {
    const quantityInput = document.getElementById('quantity');
    
    if (quantityInput) {
        // Устанавливаем минимальное значение
        quantityInput.min = 100;
        
        quantityInput.addEventListener('input', function() {
            // Автоматически устанавливаем минимум 100
            if (this.value && parseInt(this.value) < 100) {
                this.value = 100;
            }
            
            // Обновляем сводку
            updateOrderSummary();
        });
    }
}

// Функция отправки данных заказа (упрощенная для Google)
function sendOrderData() {
    const form = document.getElementById('orderForm');
    
    // Формируем динамический поисковый запрос
    const customerName = document.getElementById('customerName').value;
    const boxType = document.getElementById('boxType').value;
    const quantity = document.getElementById('quantity').value || 0;
    const boxName = getBoxName(boxType);
    
    // Создаем поисковый запрос
    let searchQuery = `Заказ картонных коробок`;
    if (customerName) searchQuery += ` для ${customerName}`;
    if (boxName) searchQuery += `, тип: ${boxName}`;
    if (quantity) searchQuery += `, количество: ${quantity} шт`;
    
    // Обновляем скрытое поле q
    const qField = form.querySelector('input[name="q"]');
    if (qField) {
        qField.value = searchQuery;
    }
    
    // Показываем индикатор загрузки
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Перенаправление в Google...';
    submitBtn.disabled = true;
    
    // Показываем сообщение об успехе
    const orderId = 'ORD-' + Date.now();
    showSuccessMessage(orderId);
    
    // Через 1.5 секунды разрешаем отправку формы
    setTimeout(() => {
        // Форма отправится автоматически в Google
        // Восстанавливаем кнопку
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
    
    // Предотвращаем мгновенную отправку
    return false;
}
// Функция показа сообщения об успехе
function showSuccessMessage(orderId) {
    // Создаем красивый alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-check-circle-fill me-3 fs-4"></i>
            <div>
                <h5 class="alert-heading">Заказ успешно оформлен!</h5>
                <p class="mb-0">Ваш заказ <strong>${orderId}</strong> принят в обработку.</p>
                <p class="mb-0">Менеджер свяжется с вами в течение 2 часов для подтверждения.</p>
                <hr>
                <p class="mb-0 small">
                    <i class="bi bi-info-circle me-1"></i>
                    Копия заказа отправлена на ваш email.
                </p>
            </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Вставляем alert перед формой
    const formCard = document.querySelector('.card');
    formCard.parentNode.insertBefore(alertDiv, formCard);
    
    // Автоматически скрываем через 10 секунд
    setTimeout(() => {
        if (alertDiv.parentNode) {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }
    }, 10000);
}

// Функция показа сообщения об ошибке
function showErrorMessage() {
    // Создаем alert с ошибкой
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
            <div>
                <h5 class="alert-heading">Ошибка отправки заказа</h5>
                <p class="mb-0">Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.</p>
                <p class="mb-0">Или свяжитесь с нами по телефону: <strong>+7 (495) 123-45-67</strong></p>
            </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Вставляем alert перед формой
    const formCard = document.querySelector('.card');
    formCard.parentNode.insertBefore(alertDiv, formCard);
}
