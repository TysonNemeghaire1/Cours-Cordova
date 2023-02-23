const pizzasTag = document.querySelector('#pizzas-list');


export default class Pizza {

    static ingredients = ['chèvre', 'jambon', 'emmental', 'olives', 'anchois', 'reblochon'];
    constructor(name = 'margarita', ingredients = 'tomate', category = 'tomato-base') {
        this.name = name;
        this.ingredients = ingredients;
        this.category = category;
    }

    createItemList = () => {
        const ionItem = document.createElement('ion-item');
        ionItem.innerHTML = `
    <ion-label>
      <h1>${this.name}</h1>
      <h3>(${this.ingredients})</h3>
    </ion-label>
  `;
        pizzasTag.insertBefore(ionItem, pizzasTag.firstElementChild);
    }

    promptPizza = async (title = 'Choisissez vos ingrédients', firstLaunch = true) => {
        const alert = document.createElement('ion-alert');
        alert.header = title;

        if (firstLaunch) {
            alert.backdropDismiss = false;
            alert.inputs = ingredients.map(ingredient => ({
                label: capitalizeFirstLetter(ingredient), type: 'checkbox', value: ingredient,
            }));
            alert.buttons = [{
                text: 'Ok', handler: (ingredients) => {
                    this.ingredients = formatIngredients(ingredients);
                    return !!ingredients.length;
                }
            }];
        } else {
            alert.inputs = [{
                type: 'text', name: 'pizzaName', placeholder: 'Nouvelle pizza', attibutes: {
                    maxlength: 50
                }
            }];
            alert.buttons = [{
                text: 'Go !', handler: ({pizzaName}) => {
                    if (!isValid(pizzaName)) return false;
                    this.name = pizzaName;
                    this.createItemList(capitalizeFirstLetter(pizzaName), this.ingredients,);
                }
            }];
        }

        document.body.appendChild(alert);
        await alert.present();

        if (firstLaunch) {
            alert
                .onDidDismiss()
                .then(() => this.promptPizza('Créer une pizza', false));
        }

        function capitalizeFirstLetter(value) {
            return value.trim().slice(0, 1).toUpperCase() + value.trim().slice(1);
        }

        function formatIngredients(value) {
            return value.join(' ').trim().replaceAll(' ', ', ');
        }

        function isValid(value) {
            return value && value.length > 2 && value.length < 50;
        }
    }
}
