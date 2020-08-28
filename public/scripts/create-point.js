function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        for( state of states) {
            ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`
        }
        
    })
}

populateUFs()

function getCities(event) { //Nesse event, contém o id do uf selecionado
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex //Atribui um index de 0 a x pra cada elemento
    stateInput.value = event.target.options[indexOfSelectedState].text //Acha o elemento e vê seu text
    //Essa parte é pra deixar pronto pro backend o nome do uf, ao invés do id
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    //Essa parte é pra resetar antes de fzr uma nova chamada
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then( res => res.json())
    .then( cities => {
        for(city of cities) {
            citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) //Ñ põe o (), e o event vai de brinde se eu quiser pegar

//Ítens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click",handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    //Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id //guarda o id do elemento selecionado

    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados
    const alrealdySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //Isso será true ou false
        return itemFound
    })
    //se já tiver selecionado, tirar da seleção
    if(alrealdySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //Se for false não entra
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        //se não tiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }
    
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}

