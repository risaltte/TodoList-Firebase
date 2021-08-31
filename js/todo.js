// Tratar a submissão do formulário de criação de uma nova tarefa
todoForm.onsubmit = function (event) {

    event.preventDefault();

    if (todoForm.name.value != '') {

        var file = todoForm.file.files[0]; // seleciona o primeiro arquivo da seleção de arquivos
        if (file != null) { // Verifica se o arquivo foi selecionado
            if (file.type.includes('image')) { // verifica se o arquivo é uma imagem
                var imgName = firebase.database().ref().push().key + '-' + file.name;

                var imgPath = 'todoListFiles/' + firebase.auth().currentUser.uid + '/' + imgName;

                // Criar uma referência do arquivo usando o caminho criado anteriormente
                var storageRef = firebase.storage().ref(imgPath);

                // Upload do arquivo
                var upload = storageRef.put(file);

                trackUpload(upload)
                    .then(function () {

                        storageRef.getDownloadURL()
                            .then(function (downloadURL) {
                                var data = {
                                    imgUrl: downloadURL,
                                    name: todoForm.name.value,
                                    nameLowerCase: todoForm.name.value.toLowerCase()
                                };

                                dbRefUsers.child(firebase.auth().currentUser.uid).push(data)
                                    .then(function () {
                                        console.log('Tarefa \"' + data.name + '\" adicionada com sucesso.');
                                    })
                                    .catch(function (error) {
                                        showError('Falha ao adicionar tarefa: ', error);
                                    });

                                todoForm.name.value = '';
                                todoForm.file.value = '';
                            });
                            
                    })
                    .catch(function (error) {
                        showError('Falha ao adicionar tarefa: ', error);
                    });

            } else {
                alert('O arquivo selecionado precisa ser uma imagem.');
            }

        } else {
            var data = {
                name: todoForm.name.value,
                nameLowerCase: todoForm.name.value.toLowerCase()
            };
    
            dbRefUsers.child(firebase.auth().currentUser.uid).push(data)
                .then(function () {
                    console.log('Tarefa \"' + data.name + '\" adicionada com sucesso.');
                })
                .catch(function (error) {
                    showError('Falha ao adicionar tarefa: ', error);
                });
            
            todoForm.name.value = '';
        }       

    } else {
        alert('O nome da tarefa não pode estar vazio.');
    }
};

// Rastreia  o progresso de upload
function trackUpload(upload) {

    return new Promise(function (resolve, reject) {

        showItem(progressFeedback);

        upload.on(
            'state_changed',

            function (snapshot) { // Segundo argumento: Recebe informações sobre o upload
                console.log((snapshot.bytesTransferred / snapshot.totalBytes * 100).toFixed(2) + '%');
                progress.value = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            },

            function (error) { // Terceiro argumento: Função executada em caso de erro no upload
                hideItem(progressFeedback);
                reject(error);
            },

            function () { // Quarto argumento: Função excutada em caso de sucesso no upload
                console.log('Sucesso no upload.');
                hideItem(progressFeedback);
                resolve();
            }
        )

        var playPauseUpload = true // Estado de controle do Upload (pausado ou em andamento)

        playPauseBtn.onclick = function () {
            playPauseUpload = !playPauseUpload; // Inverte o estado de controle do upload

            if (playPauseUpload) {
                upload.resume() // Retoma o upload

                playPauseBtn.innerHTML = 'Pausar';
                console.log('Upload retomado');
            } else {
                upload.pause(); // Pausa o upload

                playPauseBtn.innerHTML = 'Continuar';
                console.log('Upload pausado');
            }
        }

        cancelBtn.onclick = function () { // Botão para cancelar o upload
            upload.cancel() // Cancela o Upload

            hideItem(progressFeedback);
            playPauseBtn.innerHTML = 'Pausar';
        }
    });
}

// Exibir a lista de tarefas do usuário
function fillTodoList(dataSnapshot) {

    ulTodoList.innerHTML = '';  

    var num = dataSnapshot.numChildren();
    todoCount.innerHTML = num + (num > 1 ? ' tarefas' :  ' tarefa' + ':');

    dataSnapshot.forEach(function (item) {
        var value = item.val();

        var li = document.createElement('li');

        var imgLi = document.createElement('img');
        imgLi.src = value.imgUrl ? value.imgUrl : 'img/defaultTodo.png';
        imgLi.setAttribute('class',  'imgTodo');
        li.appendChild(imgLi);

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
    } else { // Improvement
        console.log('Exclusão da tarefa cancelada pelo usuário.');
    }
}

// Atualizar tarefas
function updateTodo(key) {
    var selectedItem = document.getElementById(key);
    var newTodoName = prompt('Informe um novo nome para a tarefa \"' + selectedItem.innerHTML + '\":', selectedItem.innerHTML);

    if (newTodoName !== '') {
        var data = {
            name: newTodoName,
            nameLowerCase: newTodoName.toLowerCase()
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