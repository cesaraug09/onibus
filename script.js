document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "Riquelme Batera" && password === "senha123") {
        alert("Login bem-sucedido!");
    } else {
        alert("Nome de usuário ou senha incorretos.");
    }
});

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("regPassword").value;
    const cpf = document.getElementById("cpf").value;

    if (name && email && password && cpf) {
        alert("Conta criada com sucesso!");
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});
