// TRADUZIR AUTENTICAÇÃO PARA PORTUGUÊS BRASILEIRO
firebase.auth().languageCode = 'pt-BR';

// TRATAR SUBMISSÃO DO FORMULÁRIO DE AUTENTICAÇÃO
authForm.onsubmit = function (event) {    
    
    event.preventDefault();

    showItem(loading);

    if (authForm.submitAuthForm.innerHTML == 'Acessar') {
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value)
            .catch(function (error) {
                console.log('Falha no acesso');
                console.log(error);
                hideItem(loading);
            });

    } else {
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value)
            .catch(function (error) {
                console.log('Falha ao cadastrar');
                console.log(error);
                hideItem(loading);
            });
    }
}

// TRATAMENTO DA AUTENTICAÇÃO
firebase.auth().onAuthStateChanged(function (user) {

    hideItem(loading);

    if (user) {
        showUserContent(user);
        console.log(user);
    } else {
        showAuth();
    }
});

function signOut() {
    firebase.auth().signOut()
        .catch(function (error) {
            console.log('Falha ao sair da conta');
            console.log(error);
        });
}

// VERIFICAÇÃO DE E-MAIL
function sendEmailVerification () {
    showItem(loading);

    var user = firebase.auth().currentUser;

    user.sendEmailVerification(actionCodeSettings)
        .then(function () {
            alert('E-mail de verificação foi enviado para ' + user.email + '! Verifique a sua caixa de entrada.');
        })
        .catch(function (error) {
            alert('Houve um erro ao enviar o email de verificação.');
            console.log(error);
        })
        .finally(function () {
            hideItem(loading);
        });
}

// REDEFINIÇÃO DE SENHA
function sendPasswordResetEmail() {
    var email = prompt('Redefinir senha! Informe o seu endereço de e-mail.', authForm.email.value);

    if (email) {
        showItem(loading);

        firebase.auth().sendPasswordResetEmail(email, actionCodeSettings)
            .then(function () {
                alert('E-mail de redefinição de senha enviado para ' + email + '.');
            })
            .catch(function (error) {
                alert('Houve um erro ao enviar o e-mail de redefinição de senha.');
                console.log(error);
            })
            .finally(function () {
                hideItem(loading);
            });

    } else {
        alert('É preciso preencher o campo de e-mail para redefinir a senha.');
    }
}

// AUTENTICAÇÃO PELO GOOGLE
function signInWithGoogle() {
    showItem(loading);

    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        .catch(function (error) {
            alert('Houve um erro ao autenticar usando o Google.');
            console.log(error);
            hideItem(loading);
        });
}



