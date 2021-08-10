// Traduzindo autenticação para português brasileiro
firebase.auth().languageCode = 'pt-BR';

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

firebase.auth().onAuthStateChanged(function (user) {

    hideItem(loading);

    if (user) {
        showUserContent(user);
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



