let cart = [];

function addToCart(productName, productPrice, button) {
    const product = { name: productName, price: productPrice };
    cart.push(product);
    updateCart();

    // Показать уведомление рядом с кнопкой
    const notification = button.nextElementSibling;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Убираем уведомление через 3 секунды
}

function updateCart() {
    let cartContent = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        cartContent += `<p>${item.name} — ${item.price} руб. <button class="delete-btn" onclick="removeFromCart(${index})">Удалить</button></p>`;
        totalPrice += item.price;
    });

    if (cart.length === 0) {
        cartContent = '<p>В вашей корзине пока нет товаров.</p>';
    } else {
        cartContent += `<p><strong>Общая сумма: ${totalPrice} руб.</strong></p>`;
    }

    document.getElementById('cart-content').innerHTML = cartContent;
    document.getElementById('cart-count').innerText = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function goToCheckout() {
    if (cart.length > 0) {
        showSection('checkout');
    } else {
        alert("Ваша корзина пуста!");
    }
}

// Функция для переключения между разделами
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';
}

// Переход к форме оформления заказа
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Заказ оформлен! Мы свяжемся с вами.");
    cart = []; // Очищаем корзину после оформления
    updateCart(); // Обновляем корзину
    showSection('shop'); // Возвращаем на страницу с товарами
});
