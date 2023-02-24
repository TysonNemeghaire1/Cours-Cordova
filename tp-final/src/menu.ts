import {createAllHTMLGraphicCard} from "./index";

let firstRender = true;

const homeBtn = document.getElementById('btn-home');
const listBtn = document.getElementById('btn-list');
const formBtn = document.getElementById('btn-form');

const buttons = [homeBtn, formBtn, listBtn];

const homeSection = document.getElementById('home');
const listSection = document.getElementById('list');
const formSection = document.getElementById('form');
const sectionExist = !!homeSection && !!listSection && !!formSection;

export const list = document.querySelector('ul');

for (const button of buttons) {
    if (button) {
        button.addEventListener('click', (e) => {
            if (e.target !== null && e.target instanceof Element)
                handleClick(e.target.id);
        })
    }
}

const showHome = (btnId: string) => {
    if (btnId === 'btn-home' && sectionExist) {
        homeSection.hidden = false;
        listSection.hidden = true;
        formSection.hidden = true;
    }
}

export function showList(btnId: string, isEdited: boolean) {
    if (btnId === 'btn-list' && sectionExist) {
        homeSection.hidden = true;
        listSection.hidden = false;
        formSection.hidden = true;
        if (!firstRender && list) list.replaceChildren();
        if (!isEdited) createAllHTMLGraphicCard();
        firstRender = false;
    }
}

export function showForm(btnId: string) {
    if (btnId === 'btn-form' && sectionExist) {
        homeSection.hidden = true;
        listSection.hidden = true;
        formSection.hidden = false;
    }
}

const handleClick = (btnId: string) => {

    showHome(btnId);

    showList(btnId, false);

    showForm(btnId);
}