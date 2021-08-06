var authForm = document.getElementById('authForm');
var ahthFormTitle = document.getElementById('authFormTitle');
var register = document.getElementById('register');
var access = document.getElementById('access');

// Alterar do formulário de autenticação para o cadastro de novas contas
function toggleToRegister() {
    authForm.submitAuthForm.innerHTML = 'Cadastrar conta';
    authFormTitle.innerHTML = 'Insira seus dados para se cadastrar';

    hideItem(register);
    showItem(access);
}

// Auternar da tela de cadastro para a tela de autenticação
function toggleToAccess() {
    authForm.submitAuthForm.innerHTML = 'Acessar';
    authFormTitle.innerHTML = 'Acesse a sua conta para continuar';
    hideItem(access);
    showItem(register);
}

function showItem(element) {
    element.style.display = 'block';
}

function hideItem(element) {
    element.style.display = 'none';
}