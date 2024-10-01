const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let minhaListaDeItens = []


function adicionarNovaTarefa() {
    const valorTarefa = input.value.trim();

    const regex = /^[a-zA-ZÀ-ÿ\s]+$/; // (verifica se o input contem apenas letras; inclui letras acentuadas e espaços;)
    if (!regex.test(valorTarefa)){
        alert('Por favor, digite apenas letras!');
        return;
        
    }

    minhaListaDeItens.push ( {
        tarefa: input.value,
        concluida: false,
    });

    input.value = ''
    mostrarTarefas ()
}


function mostrarTarefas() {
    let novaLi = ''

    //['comprar cafe' , 'estudar']

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi = novaLi + 
        `
        <li class="task ${item.concluida && 'done'}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        
        `
  })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

    }

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
    

    mostrarTarefas()

}


function deletarItem(posicao){
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()

}


function recarregarTarefas(){
const tarefasDoLocalStorage = localStorage.getItem('lista')

if (tarefasDoLocalStorage){
minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
}

mostrarTarefas()

}

recarregarTarefas()

button.addEventListener('click', adicionarNovaTarefa)