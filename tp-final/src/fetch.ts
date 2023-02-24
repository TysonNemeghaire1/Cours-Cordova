import GraphicCard from './interfaces';
import {createAllHTMLGraphicCard} from "./index";

export const getGraphicCards = async () => {
    const response = await fetch("http://localhost:3000/graphic_cards");
    return await response.json() as Promise<GraphicCard[]>;
}
export const addGraphicCards = async (graphicCard: { manufacturer: string, model: string, stock: number }) => {
    const response = await fetch('http://localhost:3000/graphic_cards', {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(graphicCard)
    });
    if (response.ok) {
        console.log('Data envoyée');
    } else {
        console.log(response);
    }
}
export const editGraphicCards = async (graphicCard: GraphicCard) => {
    const response = await fetch(`http://localhost:3000/graphic_cards/${graphicCard.id}`, {
        "method": "PATCH",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(graphicCard)
    });
    if (response.ok) {
        console.log('Data envoyée');
    } else {
        console.log(response);
    }
}
export const deleteGraphicCards = async (id: number) => {
    const response = await fetch(`http://localhost:3000/graphic_cards/${id}`, {
        "method": "DELETE",
    });
}
