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
            })
            .catch(function (error) {
                showError('Falha ao adicionar tarefa: ', error);
            });

    } else {
        alert('O nome da tarefa não pode estar vazio.');
    }
};

// Exibir a lista de tarefas do usuário
function fillTodoList(dataSnapshot) {

    ulTodoList.innerHTML = '';  

    var num = dataSnapshot.numChildren();
    todoCount.innerHTML = num + (num > 1 ? ' tarefas' :  ' tarefa' + ':');

    dataSnapshot.forEach(function (item) {
        var value = item.val();

        var li = document.createElement('li');
        var spanLi = document.createElement('span');
        spanLi.appendChild(document.createTextNode(value.name));
        li.appendChild(spanLi);
        ulTodoList.appendChild(li);
    });
}