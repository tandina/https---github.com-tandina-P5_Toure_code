let productSection = document.querySelector("#cart__items");
let cartItems = JSON.parse(localStorage.getItem('products'));
let cartFormOrder = document.querySelector('.cart__order__form');
let totalPrice = document.querySelector('#totalPrice');
let totalQuantity = document.querySelector('#totalQuantity');
let totalArticle = [];
let totalOrder = [];


//   Mise à jour du LocaStorage en cas de changement dans le panier
//   @cartItems: array qui contient une liste d'objets (produits)
 
function updateCart(cartItem) {
    if (cartItems.length === 0) {
        localStorage.removeItem('products');
    }else {
        localStorage.setItem('products', JSON.stringify(cartItem));
    }
    setTimeout(function(){window.location.href = 'cart.html'}, 2000);
}

//   affiche une notification d'erreur selon l'action de l'utilisateur
//   supprime le message après un certain délais

let deleteNotification = () => {
    let notificationMessage = document.querySelector('#message')
    setTimeout(function () {
        notificationMessage.remove()
    }, 3000)
}

//  condition globale pour afficher tous les détails du panier si celui-ci existe(
//  donc: liste des produits, affichages des totaux, vérification des données de formulaire)
//  sinon le formulaire est caché et un message 'panier vide s'affiche'

if (cartItems !== null) {
    productSection.innerHTML = '';
    cartItems.forEach((product) => {
        fetch('http://localhost:3000/api/products/'+`${product.currentProductId}`)
        .then((res) => res.json())
        .then((productAPi) => {
            productSection.innerHTML += `
                <article class="cart__item" data-id=${productAPi.productId}>
                    <div class="cart__item__img">
                        <img src=${productAPi.imageUrl} alt=${productAPi.altTxt}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__titlePrice">
                            <h2>${productAPi.name}</h2>
                            <p>${productAPi.price}€</p>
                            <p>${product.productSelectedColor}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"
                                value="${product.productSelectedQuantity}">
                            </div>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </article>
            `;
            const changeQuantity = document.querySelectorAll('.itemQuantity');
            let notification = document.querySelectorAll('.cart__item__content__settings__quantity');
            const regexQuantity = /^(100|[1-9][0-9]?)$/;

            changeQuantity.forEach((input, i) => {
                input.addEventListener('change', (e) => {
                    if (input.value.match(regexQuantity)) {
                        const finalQuantity = parseInt(e.target.value);
                        cartItems[i].productSelectedQuantity = finalQuantity;
                        updateCart(cartItems);
                    }else{
                        let myItem = cartItems.find(item => item.productSelectedColor === cartItems[i].productSelectedColor 
                            && item.currentProductId === cartItems[i].currentProductId)
                        if (myItem) {
                            notification[i].insertAdjacentHTML('afterend', '<span id="message" style="text-align: center; font-weight: bold;"><br>La quantité doit être comprise entre 1 et 100</span>');
                            deleteNotification();
                        }
                    }
                });
            });
            //Calcul prix total
            totalOrder.push(productAPi.price * product.productSelectedQuantity);
            let sumOrder = 0;
            for (let i = 0; i < totalOrder.length; i++) {
                sumOrder += totalOrder[i];
            }
            totalPrice.innerHTML = sumOrder.toString(); 
            //Calcul articles total
            totalArticle.push(product.productSelectedQuantity);
            let sumArticles = 0;
            for (let j = 0; j < totalArticle.length; j++) {
                sumArticles += totalArticle[j];
            }    
            totalQuantity.innerHTML = sumArticles + ' ';
            //suppression article
            const suppressButtons = document.querySelectorAll('.deleteItem');
            suppressButtons.forEach((button, i) => { 
                if (cartItems.find(item => item.productSelectedColor === cartItems[i].productSelectedColor 
                && item.currentProductId === cartItems[i].currentProductId)) {
                    button.addEventListener('click', () => {
                        cartItems.splice(i, 1);
                        updateCart(cartItems);
                    });
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
    });
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const address = document.querySelector("#address");
    const city = document.querySelector("#city");
    const email = document.querySelector("#email");
    
    const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    const addressErrorMsg = document.getElementById('addressErrorMsg');
    const cityErrorMsg = document.getElementById('cityErrorMsg');
    const emailErrorMsg = document.getElementById('emailErrorMsg');

    const regexForName = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
    const regexForAddress = /^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/;
    const regexForEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    //Vérification du champ prénom
    firstName.addEventListener('change', e => {
        if (!firstName.value.match(regexForName)) {
            firstNameErrorMsg.innerHTML = "le champ prénom est incorecte";
            firstName.style.border = 'solid 2px red';
            firstNameErrorMsg.style.color = '#fbbcbc';
        }else if (firstName.value.match(regexForName)) {
            firstName.style.border = 'solid 2px #D5FCB4';
            firstNameErrorMsg.style.color = '#D5FCB4';
            firstNameErrorMsg.innerHTML = "Valide";
        }
    });
    //Vérification du champ nom
    lastName.addEventListener('change', e => {
        if (!lastName.value.match(regexForName)) {
            lastNameErrorMsg.innerText = "le nom est incorecte";
            lastName.style.border = 'solid 2px red';
            lastNameErrorMsg.style.color = '#fbbcbc';
        }else if (lastName.value.match(regexForName)) {
            lastName.style.border = 'solid 2px #D5FCB4';
            lastNameErrorMsg.style.color = '#D5FCB4';
            lastNameErrorMsg.innerText = "Valide";
        }
    });
    //Vérification du champ adresse
    address.addEventListener('change', e => {
        if (!address.value.match(regexForAddress)) {
            addressErrorMsg.innerHTML = "l'addresse est incorecte";
            address.style.border = 'solid 2px red';
            addressErrorMsg.style.color = '#fbbcbc';
        }else if (address.value.match(regexForAddress)) {
            address.style.border = 'solid 2px #D5FCB4';
            addressErrorMsg.style.color = '#D5FCB4';
            addressErrorMsg.innerHTML = "Valide";
        }
    });
    //Vérification du champ ville
    city.addEventListener('change', e => {
        if (!city.value.match(regexForName)) {
            cityErrorMsg.innerHTML = "la ville est incorecte";
            city.style.border = 'solid 2px red';
            cityErrorMsg.style.color = '#fbbcbc';
        }else if (city.value.match(regexForName)) {
            city.style.border = 'solid 2px #D5FCB4';
            cityErrorMsg.style.color = '#D5FCB4';
            cityErrorMsg.innerHTML = "Valide";
        }
    });
    //Vérification du champ e-mail
    email.addEventListener('change', e => {
        if (!email.value.match(regexForEmail)) {
            emailErrorMsg.innerHTML = "l'email est incorecte";
            email.style.border = 'solid 2px red';
            emailErrorMsg.style.color = '#fbbcbc';
        }else if (email.value.match(regexForEmail)) {
            email.style.border = 'solid 2px #D5FCB4';
            emailErrorMsg.style.color = '#D5FCB4';
            emailErrorMsg.innerHTML = "Valide";
        }
    });

  
    //  double vérification des données champs du formulaire
    //  si toutes les données sont correctes le formulaire est envoyé
    //   sinon la commande ne peut être passée et les données ne seront pas envoyées
   
    function checkFormValidity() {
        cartFormOrder.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!email.value.match(regexForEmail) ||
                !city.value.match(regexForName) ||
                !address.value.match(regexForAddress) ||
                !lastName.value.match(regexForName) ||
                !firstName.value.match(regexForName)) {
            } else{
                sendCommand();
            }
        });
    }
    checkFormValidity();

    const products = Object.values(cartItems).map((product) => {
        return product.currentProductId;
    });
   
    //  envoie au serveur les données du formulaire plus le contenu du panier
    //  une fois la commande passé l'utilisateur est redirigé vers la page de confirmation
    //  le serveur renvoie le numéro de commande
   
    function sendCommand() {
        const firstNameValue = document.querySelector("#firstName").value;
        const lastNameValue = document.querySelector("#lastName").value;
        const addressValue = document.querySelector("#address").value;
        const cityValue = document.querySelector("#city").value;
        const emailValue = document.querySelector("#email").value;

        const orderProducts = {
            contact: {
                firstName: firstNameValue,
                lastName: lastNameValue,
                address: addressValue,
                city: cityValue,
                email: emailValue,
            },
            products: products,
        }
        
        fetch('http://localhost:3000/api/products/order', {
            method: "POST",
            body: JSON.stringify(orderProducts),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then (data => {
            const orderID = data.orderId;
            window.location = `confirmation.html?orderId=${orderID}`
        })
    }
}else{
    cartFormOrder.style = 'display: none';
    productSection.innerHTML = '<h2 id="title"> Votre panier est vide ! </h2>';
    let title = document.getElementById('title');
    title.style.textAlign = "center";
}