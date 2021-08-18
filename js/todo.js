// Tratar a submissão do formulário de criação de uma nova tarefa
todoForm.onsubmit = function (event) {

    event.preventDefault();

    if (todoForm.name.value != '') {
        var data = {
            name: todoForm.name.value
        };

        dbRefUsers.child(firebase.auth().currentUser.uid).push(data)
            .then(function () {
                console.log('Tarefa ' + data.name + ' adicionada com sucesso.');
            });

    } else {
        alert('O nome da tarefa não pode estar vazio.');
    }
};