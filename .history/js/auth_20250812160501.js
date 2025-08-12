// Verifica login ao carregar páginas protegidas
function checkLogin() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html";
    }
}

// Verifica se o usuário é admin
function checkAdmin() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.email !== "leonardoeliann0@gmail.com") {
        alert("Acesso negado. Somente administradores.");
        window.location.href = "login.html";
    }
}

// Login
function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let validUser = users.find(u => u.email === email && u.password === password);

    if (validUser) {
        localStorage.setItem("user", JSON.stringify(validUser));
        alert("Login bem-sucedido!");
        if (email === "leonardoeliann0@gmail.com") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "index.html";
        }
    } else {
        alert("Email ou senha inválidos!");
    }
}

// Registro
function register() {
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    if (!email || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.email === email)) {
        alert("Usuário já registrado!");
        return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registro concluído! Faça login.");
}

// Logout
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
