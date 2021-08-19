// Tratar a submissão do formulário de criação de uma nova tarefa
todoForm.onsubmit = function (event) {

    event.preventDefault();

    if (todoForm.name.value != '') {
        var data = {
            name: todoForm.name.value
        };

        dbRefUsers.child(firebase.auth().currentUser.uid).push(data)
            .then(function () {
                console.log('Tarefa \"' + data.name + '\" adicionada com sucesso.');
            })
            .catch(function (error) {
                showError('Falha ao adicionar tarefa: ', error);
            });
        
        todoForm.name.value = '';

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
        spanLi.id = item.key;
        li.appendChild(spanLi);

        var liRemoveBtn = document.createElement('button');
        liRemoveBtn.appendChild(document.createTextNode('Excluir'));
        liRemoveBtn.setAttribute('onclick', 'removeTodo(\"' + item.key + '\")');
        liRemoveBtn.setAttribute('class', 'danger todoBtn');
        li.appendChild(liRemoveBtn);

        var liUpdateBtn = document.createElement('button');
        liUpdateBtn.appendChild(document.createTextNode('Editar'));
        liUpdateBtn.setAttribute('onclick', 'updateTodo(\"' + item.key + '\")');
        liUpdateBtn.setAttribute('class', 'alternative todoBtn');
        li.appendChild(liUpdateBtn);

        ulTodoList.appendChild(li);
    });
}

// Remove tarefas
function removeTodo(key) {
    var selectedItem = document.getElementById(key);
    var confirmation = confirm('Realmente deseja remover a terefa \"' + selectedItem.innerHTML + '\"?');

    if (confirmation) {
        dbRefUsers.child(firebase.auth().currentUser.uid)
            .child(key)
            .remove()
                .then(function () {
                    console.log('Tarefa \"' + selectedItem.innerHTML + '\" removida com sucesso');
                })
                .catch(function (error) {
                    showError('Falha ao remover a tarefa: ', error);
                });
    }
}

// Atualizar tarefas
function updateTodo(key) {
    var selectedItem = document.getElementById(key);
    var newTodoName = prompt('Informe um novo nome para a tarefa \"' + selectedItem.innerHTML + '\":', selectedItem.innerHTML);

    if (newTodoName !== '') {
        var data = {
            name: newTodoName
        }

        dbRefUsers.child(firebase.auth().currentUser.uid)
            .child(key)
            .update(data)
                .then(function () {
                    console.log('Tarefa "' + data.name + '\" atualizada com sucesso.');
                })
                .catch(function () {
                    showError('Falha ao atualizar tarefa: ', error);
                })

    } else {
        alert('O nome da tarefa não pode ser vazio.');
    }
}