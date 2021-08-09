var authForm = document.getElementById('authForm');
var ahthFormTitle = document.getElementById('authFormTitle');
var register = document.getElementById('register');
var access = document.getElementById('access');

var loading = document.getElementById('loading');

var auth = document.getElementById('auth');
var userContent = document.getElementById('userContent');

var userEmail = document.getElementById('userEmail');

var sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv');
var emailVerified = document.getElementById('emailVerified');

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

function showUserContent (user) {

    if (user.emailVerified) {
        emailVerified.innerHTML = 'Email verificado';
        hideItem(sendEmailVerificationDiv);
    } else {
        emailVerified.innerHTML = 'E-mail não verificado';
        showItem(sendEmailVerificationDiv);
    }

    userEmail.innerHTML = user.email;
    hideItem(auth);
    showItem(userContent);
}

function showAuth() {
    authForm.email.value = '';
    authForm.password.value = '';
    hideItem(userContent);
    showItem(auth);
}