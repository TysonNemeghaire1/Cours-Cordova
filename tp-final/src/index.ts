import './index.scss';
import {getGraphicCards, addGraphicCards, editGraphicCards, deleteGraphicCards} from "./fetch";
import GraphicCard from "./interfaces";
import {list, showForm, showList} from "./menu";

document.addEventListener('deviceready', onDeviceReady, false)

const idInput = document.querySelector('#idInput') as HTMLInputElement;
const manufacturerInput = document.getElementById('manufacturerInput') as HTMLInputElement;
const modelInput = document.getElementById('modelInput') as HTMLInputElement;
const stockInput = document.getElementById('stockInput') as HTMLInputElement;

let editNode: false | { manufacturer: HTMLParagraphElement, stock: HTMLParagraphElement, model: HTMLParagraphElement }
editNode = false

function onDeviceReady() {
    const form = document.getElementById('addForm') as HTMLFormElement;

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const manufacturer = manufacturerInput.value;
            const model = modelInput.value;
            const stock = stockInput.value;
            if (editNode) {
                const id = idInput.value;
                await editGraphicCards({id: parseInt(id), stock: parseInt(stock), model, manufacturer})
                showList('btn-list', true);
                editNode.manufacturer.textContent = manufacturer;
                editNode.stock.textContent = stock;
                editNode.model.textContent = model;
                console.log(editNode)
                editNode = false;
            } else {
                await addGraphicCards({manufacturer, model, stock: parseInt(stock)})
            }
            form.reset();
            navigator.notification.alert('Votre Formulaire a bien été envoyé', () => console.log('cocojaco'))
        })
    }
}

function editGraphicCardHTML(graphicCard: GraphicCard, item: { manufacturer: HTMLParagraphElement, stock: HTMLParagraphElement, model: HTMLParagraphElement }) {
    editNode = item;
    idInput.value = graphicCard.id.toString();
    manufacturerInput.value = graphicCard.manufacturer;
    modelInput.value = graphicCard.model;
    stockInput.value = graphicCard.stock.toString();
    showForm('btn-form');
}

const createHTMLGraphicCard = (graphicCard: GraphicCard) => {
    const listItem = document.createElement('li');

    if (list) {
        list.appendChild(listItem);
    }

    const manufacturer = document.createElement('p');
    const model = document.createElement('p');
    const stock = document.createElement('p');
    const btnDelete = document.createElement("button");
    const btnEdit = document.createElement("button");
    const properties = {manufacturer, model, stock};

    btnEdit.textContent = 'Edit';
    btnEdit.style.backgroundColor = 'blue';
    btnDelete.textContent = 'Delete';
    btnDelete.style.backgroundColor = 'red';

    btnDelete.onclick = () => {
        if (window.confirm('Voulez-vous supprimer cette CG du stock ?')) {
            deleteGraphicCards(graphicCard.id)
            listItem.remove();
        }
    };
    btnEdit.onclick = () => editGraphicCardHTML(graphicCard, {model, stock, manufacturer});

    let property: keyof typeof properties
    for (property in properties) {
        properties[property].textContent = `${property} : ${graphicCard[property]}`;
        listItem.appendChild(properties[property]);
    }
    listItem.appendChild(btnEdit);
    listItem.appendChild(btnDelete);
}
export const createAllHTMLGraphicCard = async () => {
    const graphicCards = await getGraphicCards();
    for (const graphicCard of graphicCards) {
        createHTMLGraphicCard(graphicCard);
    }
}










