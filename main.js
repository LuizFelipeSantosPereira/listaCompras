let listaItens = []
const form = document.getElementById("form-itens")
const itenInput = document.getElementById("receber-item")
const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById("itens-comprados")

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
                    <input type="text" class="is-size-5" value="${elemento.valor}"></input>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        }
    })
    checaitens()
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