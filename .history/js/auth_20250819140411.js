// ======================
// Funções utilitárias
// ======================
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function setLoggedUser(user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem("loggedUser")) || null;
}

function logoutUser() {
    localStorage.removeItem("loggedUser");
    location.href = "login.html";
}

// ======================
// LOGIN
// ======================
if (document.querySelector("#login-form")) {
    document.querySelector("#login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.querySelector("#login-email").value;
        const password = document.querySelector("#login-password").value;

        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert("Email ou senha inválidos!");
            return;
        }

        setLoggedUser(user);

        if (user.email === "leonardoeliann0@gmail.com") {
            location.href = "admin.html";
        } else {
            location.href = "index.html";
        }
    });
}

// ======================
// REGISTRO
// ======================
if (document.querySelector("#register-form")) {
    document.querySelector("#register-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.querySelector("#reg-email").value;
        const password = document.querySelector("#reg-password").value;

        let users = getUsers();

        if (users.some(u => u.email === email)) {
            alert("Esse email já está cadastrado!");
            return;
        }

        const newUser = { email, password };
        users.push(newUser);
        saveUsers(users);
        alert("Cadastro realizado com sucesso!");
        location.href = "login.html";
    });
}

// ======================
// EXIBIR USUÁRIO LOGADO NO INDEX
// ======================
if (document.querySelector("#user-info")) {
    const userInfo = document.querySelector("#user-info");
    const loggedUser = getLoggedUser();

    if (loggedUser) {
        userInfo.innerHTML = `
            <span>Bem-vindo, <strong>${loggedUser.email}</strong></span>
            <button id="logout-btn">Sair</button>
        `;
        document.querySelector("#logout-btn").addEventListener("click", logoutUser);
    } else {
        userInfo.innerHTML = `
            <a href="login.html">Entrar</a> | 
            <a href="register.html">Cadastrar</a>
        `;
    }
}
