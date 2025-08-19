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
// ======================
// REGISTRO (corrigido)
// ======================
if (document.querySelector("#register-form")) {
  document.querySelector("#register-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (document.querySelector("#reg-name")?.value || "").trim();
    const email = document.querySelector("#reg-email").value.trim();
    const password = document.querySelector("#reg-password").value;
    const confirm = document.querySelector("#reg-confirm").value;

    if (password.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      alert("As senhas não coincidem.");
      return;
    }

    let users = getUsers(); // usa a chave "users" no localStorage

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      alert("Esse email já está cadastrado!");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);

    alert("Cadastro realizado com sucesso! Faça login para continuar.");
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
