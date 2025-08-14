// Mostrar mensagem de feedback
function showMessage(msg, isError = false) {
    let box = document.getElementById("messageBox");
    if (!box) {
        box = document.createElement("div");
        box.id = "messageBox";
        box.style.position = "fixed";
        box.style.top = "20px";
        box.style.right = "20px";
        box.style.padding = "10px 15px";
        box.style.borderRadius = "5px";
        box.style.zIndex = "9999";
        box.style.color = "white";
        document.body.appendChild(box);
    }
    box.style.background = isError ? "#d9534f" : "#5cb85c";
    box.innerText = msg;
    box.style.display = "block";
    setTimeout(() => { box.style.display = "none"; }, 3000);
}

// Atualiza o cabeçalho com status do usuário
function checkUserStatus() {
    const user = JSON.parse(localStorage.getItem("user"));
    const loginArea = document.getElementById("login-area");
    const adminLink = document.getElementById("adminLink");
    const loginLink = document.getElementById("loginLink");

    if (user && loginArea) {
        loginArea.innerHTML = `
            <span>Bem-vindo, ${user.email}</span>
            <button onclick="logout()" style="margin-left:10px;">Sair</button>
        `;
        if (loginLink) loginLink.style.display = "none";
        if (adminLink && user.email === "leonardoeliann0@gmail.com") {
            adminLink.style.display = "inline-block";
        }
    }
}

// Função de login
function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        showMessage("Preencha todos os campos!", true);
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let validUser = users.find(u => u.email === email && u.password === password);

    if (validUser) {
        localStorage.setItem("user", JSON.stringify(validUser));
        showMessage("Login realizado com sucesso!");
        setTimeout(() => {
            if (email === "leonardoeliann0@gmail.com") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "index.html";
            }
        }, 1000);
    } else {
        showMessage("Email ou senha inválidos!", true);
    }
}

// Função de registro
function register() {
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    if (!email || !password) {
        showMessage("Preencha todos os campos!", true);
        return;
    }
    if (password.length < 4) {
        showMessage("A senha deve ter pelo menos 4 caracteres!", true);
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.email === email)) {
        showMessage("Usuário já registrado!", true);
        return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    showMessage("Conta criada com sucesso! Faça login.");
}

// Logout
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// Rodar ao carregar a página
document.addEventListener("DOMContentLoaded", checkUserStatus);
