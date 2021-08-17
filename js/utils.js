var authForm = document.getElementById('authForm');
var ahthFormTitle = document.getElementById('authFormTitle');
var register = document.getElementById('register');
var access = document.getElementById('access');
var passwordReset = document.getElementById('passwordReset');

var loading = document.getElementById('loading');

var auth = document.getElementById('auth');
var userContent = document.getElementById('userContent');

var userEmail = document.getElementById('userEmail');
var userImg = document.getElementById('userImg');
var userName = document.getElementById('userName');

var sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv');
var emailVerified = document.getElementById('emailVerified');

// Alterar do formulário de autenticação para o cadastro de novas contas
function toggleToRegister() {
    authForm.submitAuthForm.innerHTML = 'Cadastrar conta';
    authFormTitle.innerHTML = 'Insira seus dados para se cadastrar';

    hideItem(register);
    hideItem(passwordReset);
    showItem(access);
}

// Auternar da tela de cadastro para a tela de autenticação
function toggleToAccess() {
    authForm.submitAuthForm.innerHTML = 'Acessar';
    authFormTitle.innerHTML = 'Acesse a sua conta para continuar';
    hideItem(access);
    showItem(passwordReset);
    showItem(register);
}

function showItem(element) {
    element.style.display = 'block';
}

function hideItem(element) {
    element.style.display = 'none';
}

// Exibir o conteúdo do usuário
function showUserContent (user) {
    console.log(user);

    if (user.providerData[0].providerId != 'password') {
        
        emailVerified.innerHTML = 'Autenticado por provedor confiável: ' + user.providerData[0].providerId;
        hideItem(sendEmailVerificationDiv);
        
    } else {

        if (user.emailVerified) {
            emailVerified.innerHTML = 'Email verificado';
            hideItem(sendEmailVerificationDiv);
        } else {
            emailVerified.innerHTML = 'E-mail não verificado';
            showItem(sendEmailVerificationDiv);
        }
    }


    userImg.src = user.photoURL ? user.photoURL : '../img/unknownUser.png';
    userName.innerHTML = user.displayName;

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

// Centralizar e traduzir erros
function showError(prefix, error) {
    console.log(error);
    hideItem(loading);

    switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            alert(prefix + ' ' + 'E-mail ou senha inválidos.');
            break;    
        case 'auth/weak-password':
            alert(prefix + ' ' + 'A senha deve ter pelo mesno 6 caracteres.');
            break;    
        case 'auth/email-already-in-use':
            alert(prefix + ' ' + 'Este e-mail já está em uso.');
            break;    
        case 'auth/popup-closed-by-user':
            alert(prefix + ' ' + 'O popup de autenticação foi fechado antes da operação ser concluída.');
            break;    
        default:
            alert(prefix + ' ' + error.message);
    }
}

// Configurações Extra de e-mail
var actionCodeSettings = {
    url: 'https://todolist-udemy-ec916.firebaseapp.com'
}