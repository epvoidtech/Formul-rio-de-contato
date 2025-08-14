// ======= Verificação de Acesso =======
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user || user.email !== "leonardoeliann0@gmail.com") {
        alert("Acesso negado! Somente administradores podem entrar.");
        location.href = "login.html";
        return;
    }

    renderAdminProducts();
    renderAdminUsers();
});

// ======= Funções de Produto =======
function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

document.querySelector("#add-product-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let products = getProducts();

    const newProduct = {
        id: Date.now(),
        name: document.querySelector("#prod-name").value,
        price: parseFloat(document.querySelector("#prod-price").value),
        category: document.querySelector("#prod-category").value,
        brand: document.querySelector("#prod-brand").value,
        img: document.querySelector("#prod-img").value,
        specs: document.querySelector("#prod-specs").value
    };

    products.push(newProduct);
    saveProducts(products);
    renderAdminProducts();
    e.target.reset();
    alert("Produto adicionado!");
});

function renderAdminProducts() {
    const container = document.querySelector("#admin-product-list");
    const products = getProducts();

    if (products.length === 0) {
        container.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    container.innerHTML = products.map(p => `
        <div class="admin-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>R$ ${p.price.toFixed(2)}</p>
            <p>${p.category} - ${p.brand}</p>
            <button onclick="deleteProduct(${p.id})">Excluir</button>
        </div>
    `).join("");
}

function deleteProduct(id) {
    let products = getProducts().filter(p => p.id !== id);
    saveProducts(products);
    renderAdminProducts();
}

// ======= Funções de Usuário =======
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function renderAdminUsers() {
    const container = document.querySelector("#admin-user-list");
    const users = getUsers();

    if (users.length === 0) {
        container.innerHTML = "<p>Nenhum usuário cadastrado.</p>";
        return;
    }

    container.innerHTML = users.map(u => `
        <div class="admin-card">
            <p>${u.email}</p>
            <button onclick="deleteUser('${u.email}')">Excluir</button>
        </div>
    `).join("");
}

function deleteUser(email) {
    let users = getUsers().filter(u => u.email !== email);
    saveUsers(users);
    renderAdminUsers();
}

// ======= Logout =======
function logout() {
    localStorage.removeItem("loggedUser");
    location.href = "login.html";
}
