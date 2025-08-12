// Funções do Carrinho

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, name, price) {
    let cart = getCart();
    let existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: productId, name, price, quantity: 1 });
    }

    saveCart(cart);
    alert(`${name} adicionado ao carrinho!`);
}

function removeFromCart(productId) {
    let cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
}

function updateQuantity(productId, quantity) {
    let cart = getCart();
    let item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = quantity;
    }
    saveCart(cart);
}

function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cart = getCart();

    cartItems.innerHTML = "";
    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${item.name}</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
            <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)">
            <button onclick="removeFromCart('${item.id}')">Remover</button>
        `;
        cartItems.appendChild(div);
    });

    document.getElementById("total").textContent =
        "Total: R$ " + cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
