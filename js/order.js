// js/form.js

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация формы заказа
    initOrderForm();
    
    // Инициализация динамического расчета
    initOrderCalculator();
});

// Функция инициализации формы заказа
function initOrderForm() {
    const orderForm = document.getElementById('orderForm');
    const orderSummary = document.getElementById('orderSummary');
    
    if (!orderForm) return;
    
    // Валидация формы перед отправкой
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            sendOrderData();
        }
    });
    
    // Обновление сводки заказа при изменении формы
    orderForm.addEventListener('change', updateOrderSummary);
    orderForm.addEventListener('input', updateOrderSummary);
    
    // Инициализация сводки
    updateOrderSummary();
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
    
    // Проверка количества
    const quantityField = document.getElementById('quantity');
    if (quantityField.value && quantityField.value < 100) {
        markFieldAsInvalid(quantityField);
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
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
    return phoneRegex.test(phone);
}

// Функция отметки поля как невалидного
function markFieldAsInvalid(field) {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
}

// Функция отметки поля как валидного
function markFieldAsValid(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

// Функция обновления сводки заказа
function updateOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    
    if (!orderSummary) return;
    
    // Получаем значения из формы
    const productType = document.getElementById('productType').value;
    const quantity = document.getElementById('quantity').value || 0;
    const urgency = document.querySelector('input[name="urgency"]:checked')?.value;
    const paymentType = document.querySelector('input[name="paymentType"]:checked')?.value;
    
    // Рассчитываем стоимость
    const pricePerUnit = getPricePerUnit(productType);
    const totalPrice = calculateTotalPrice(pricePerUnit, quantity, urgency);
    
    // Формируем HTML для сводки
    let summaryHTML = `
        <h5>Детали заказа:</h5>
        <table class="table table-sm">
    `;
    
    if (productType) {
        const productName = getProductName(productType);
        summaryHTML += `
            <tr>
                <td>Тип коробки:</td>
                <td>${productName}</td>
            </tr>
        `;
    }
    
    summaryHTML += `
            <tr>
                <td>Количество:</td>
                <td>${quantity} шт</td>
            </tr>
    `;
    
    if (pricePerUnit > 0) {
        summaryHTML += `
            <tr>
                <td>Цена за шт:</td>
                <td>${pricePerUnit} руб.</td>
            </tr>
        `;
    }
    
    if (urgency) {
        const urgencyText = urgency === 'express' ? 'Срочная (3-5 дней)' : 'Стандартная (7-10 дней)';
        summaryHTML += `
            <tr>
                <td>Срок производства:</td>
                <td>${urgencyText}</td>
            </tr>
        `;
    }
    
    if (paymentType) {
        const paymentText = paymentType === 'cash' ? 'Наличные' : 'Безналичный расчет';
        summaryHTML += `
            <tr>
                <td>Оплата:</td>
                <td>${paymentText}</td>
            </tr>
        `;
    }
    
    if (totalPrice > 0) {
        summaryHTML += `
            <tr class="table-primary fw-bold">
                <td>Итого:</td>
                <td>${totalPrice.toLocaleString('ru-RU')} руб.</td>
            </tr>
        `;
    }
    
    summaryHTML += `
        </table>
    `;
    
    orderSummary.innerHTML = summaryHTML;
}

// Функция получения цены за единицу
function getPricePerUnit(productType) {
    const prices = {
        'small': 12,
        'medium': 18,
        'large': 25,
        'special': 35
    };
    
    return prices[productType] || 0;
}

// Функция получения названия продукта
function getProductName(productType) {
    const names = {
        'small': 'Малая коробка',
        'medium': 'Средняя коробка',
        'large': 'Крупная коробка',
        'special': 'Специальная коробка'
    };
    
    return names[productType] || 'Не выбрано';
}

// Функция расчета общей стоимости
function calculateTotalPrice(pricePerUnit, quantity, urgency) {
    let total = pricePerUnit * quantity;
    
    // Наценка за срочность
    if (urgency === 'express') {
        total *= 1.2; // +20% за срочность
    }
    
    // Скидка за объем
    if (quantity >= 1000) {
        total *= 0.9; // -10%
    } else if (quantity >= 500) {
        total *= 0.95; // -5%
    }
    
    return Math.round(total);
}

// Функция инициализации калькулятора
function initOrderCalculator() {
    const quantityInput = document.getElementById('quantity');
    
    if (quantityInput) {
        quantityInput.addEventListener('input', function() {
            // Автоматически добавляем значения по умолчанию, если поле пустое
            if (!this.value && this.hasAttribute('data-default')) {
                this.value = this.getAttribute('data-default');
            }
        });
    }
}

// Функция отправки данных заказа
function sendOrderData() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);
    const orderData = {};
    
    // Преобразуем FormData в объект
    formData.forEach((value, key) => {
        orderData[key] = value;
    });
    
    // Добавляем дополнительную информацию
    orderData.orderDate = new Date().toISOString();
    orderData.orderId = 'ORD-' + Date.now();
    
    // Рассчитываем итоговую стоимость
    const productType = document.getElementById('productType').value;
    const quantity = document.getElementById('quantity').value || 0;
    const urgency = document.querySelector('input[name="urgency"]:checked')?.value;
    const pricePerUnit = getPricePerUnit(productType);
    orderData.totalPrice = calculateTotalPrice(pricePerUnit, quantity, urgency);
    
    console.log('Данные для отправки:', orderData);
    
    // Отправка данных на удаленный сервер (JSONPlaceholder для примера)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Успешно отправлено:', data);
        showSuccessMessage();
        form.reset();
    })
    .catch(error => {
        console.error('Ошибка:', error);
        showErrorMessage();
    });
}

// Функция показа сообщения об успехе
function showSuccessMessage() {
    alert('Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
    
    // Или более красивое уведомление:
    // const alertDiv = document.createElement('div');
    // alertDiv.className = 'alert alert-success alert-dismissible fade show';
    // alertDiv.innerHTML = `
    //     <strong>Успешно!</strong> Ваш заказ отправлен. Номер заказа: ORD-${Date.now()}
    //     <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    // `;
    // document.querySelector('.container').prepend(alertDiv);
}

// Функция показа сообщения об ошибке
function showErrorMessage() {
    alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.');
}
