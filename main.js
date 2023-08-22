let listaItens = []
let itemAEditar
const form = document.getElementById("form-itens")
const itenInput = document.getElementById("receber-item")
const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById("itens-comprados")
const campoEdicao = document.getElementsByClassName("edita")

form.addEventListener("submit", (evento)=>{
    evento.preventDefault()
    salvarItem()
    mostrarItem()
    itenInput.focus()//mantem o foco na area de input
})

function salvarItem (){
    const comprasItem = itenInput.value
    const checarDuplicado = listaItens.some((elemento)=> elemento.valor.toUpperCase() === comprasItem.toUpperCase())
    
    if(checarDuplicado){
        alert("item ja existe")
    }else{
        listaItens.push ({
            valor:comprasItem,
            checar: false
        })
    }
    itenInput.value = ''//reseta o valor no input 
}

function mostrarItem(){
    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''
    listaItens.forEach((elemento, index)=>{
        if (elemento.checar){
            ulItensComprados.innerHTML+=
            `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${elemento.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        }else{
            ulItens.innerHTML+=
            `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5 edita" value="${elemento.valor}"></input>
                </div>
                <div>
                    <button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>
                    <i class="fa-regular is-clickable fa-pen-to-square editar"></i>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        }
    })
    checaitens()
    deletaItens()   
    editaItens()
}

function checaitens(){
    const inputCheck = document.querySelectorAll('input[type="checkbox"]')
    inputCheck.forEach(i=>{
        i.addEventListener('click', (evento)=>{
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute("data-value")
            listaItens[valorDoElemento].checar = evento.target.checked
            console.log(listaItens[valorDoElemento].checar)
            mostrarItem()
        })
    })
}

function deletaItens(){
    const deletarObejtos = document.querySelectorAll('.deletar')

    deletarObejtos.forEach(i=>{
        i.addEventListener('click', (evento)=>{
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaItens.splice(valorDoElemento,1)
            mostrarItem()
        })
    })
}
function editaItens(){ 
    const editarItens = document.querySelectorAll('.editar')
    editarItens.forEach(i=>{
        i.addEventListener('click', (evento)=>{
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            campoEdicao.focus()
            mostrarItem()
        })
    })
}
function salvarEdicao (){
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    console.log(itemEditado.value)
}