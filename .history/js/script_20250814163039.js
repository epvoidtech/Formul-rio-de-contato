/* script.js - VoidTech Store */

// ======= Banco de dados de produtos (exemplo inicial) =======
const products = [
    {
        id: 1,
        name: "Placa-mãe ASUS ATX Z790",
        category: "placa-mae",
        price: 1599.99,
        brand: "ASUS",
        img: "img/placa-mae-asus.jpg",
        specs: "Compatível com Intel 12ª/13ª Geração, DDR5"
    },
    {
        id: 2,
        name: "Processador AMD Ryzen 7 5800X",
        category: "processador",
        price: 1349.99,
        brand: "AMD",
        img: "img/ryzen7.jpg",
        specs: "8 núcleos, 16 threads, até 4.7GHz"
    },
    {
        id: 3,
        name: "Memória RAM Corsair Vengeance 16GB DDR4",
        category: "memoria-ram",
        price: 399.99,
        brand: "Corsair",
        img: "img/ram-corsair.jpg",
        specs: "DDR4, 3200MHz, CL16"
    }
    // ... adicionar mais produtos depois
];

// ======= Funções de Carrinho =======
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(id) {
    let cart = getCart();
    let product = products.find(p => p.id === id);
    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart(cart);
    alert("Produto adicionado ao carrinho!");
}

function removeFromCart(id) {
    let cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
    renderCart();
}

function updateCartCount() {
    let cart = getCart();
    let count = cart.reduce((acc, item) => acc + item.qty, 0);
    document.querySelector("#cart-count").textContent = count;
}

// ======= Renderização de Produtos =======
function renderProducts(list = products) {
    const container = document.querySelector("#product-list");
    container.innerHTML = "";

    list.forEach(prod => {
        const item = document.createElement("div");
        item.classList.add("product-card");
        item.innerHTML = `
            <img src="${prod.img}" alt="${prod.name}">
            <h3>${prod.name}</h3>
            <p>${prod.specs}</p>
            <span class="price">R$ ${prod.price.toFixed(2)}</span>
            <button onclick="addToCart(${prod.id})">Adicionar ao Carrinho</button>
        `;
        container.appendChild(item);
    });
}

// ======= Sistema de Filtros =======
function searchProducts() {
    const query = document.querySelector("#search-input").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

// ======= Modo Claro/Escuro =======
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
}

// ======= Sistema de Login/Cadastro =======
function login() {
    const email = document.querySelector("#login-email").value;
    const pass = document.querySelector("#login-pass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let found = users.find(u => u.email === email && u.password === pass);

    if (found) {
        localStorage.setItem("loggedUser", JSON.stringify(found));
        alert("Login realizado com sucesso!");
        location.href = "index.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

function register() {
    const email = document.querySelector("#reg-email").value;
    const pass = document.querySelector("#reg-pass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
        alert("Este email já está cadastrado!");
        return;
    }

    users.push({ email, password: pass });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Cadastro realizado com sucesso!");
}

// ======= Inicialização =======
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#product-list")) {
        renderProducts();
    }
    loadTheme();
    updateCartCount();
});
