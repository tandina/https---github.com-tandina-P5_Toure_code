
//  récupère l'url actuel
//  créer un nouvel objet url à partir de l'url actuelle
//   à travers le searchParams récupère l'id 
//   pour chaque produit pour ensuite afficher ses détails
 
function getProductUrl() {
    const urlLoca = window.location.href;
    const url = new URL(urlLoca);
    const urlId = url.searchParams.get("id");
    return urlId;
}
getProductUrl();

//stockage de la fontion dans une variable
const productId = getProductUrl();

let imgKanap = document.querySelector('.item__img');
let img = document.createElement('img');
imgKanap.appendChild(img);
let price = document.querySelector('#price');
let description = document.querySelector('#description');
let productName = document.querySelector('#title');
const chooseColor = document.createElement('option');
const selectOptions = document.querySelector('select').options;
selectOptions.add(chooseColor);
chooseColor.setAttribute('disabled', 'disabled');
chooseColor.setAttribute('selected', 'true');
chooseColor.textContent = '--SVP choisissez une couleur--';


//  récupère les données de l'APi d'un produit grace à son id unique
//  affiche les détail du produit

fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((kanap) => {
        img.src = kanap.imageUrl;
        img.alt = kanap.altTxt;
        price.innerHTML = kanap.price;
        description.innerHTML = kanap.description;
        productName.innerHTML = kanap.name;
        const colorList = kanap.colors;
        colorList.forEach((kanap) => {
            const pickColor = document.createElement("option");
            pickColor.setAttribute("value", kanap);
            pickColor.textContent = kanap;
            selectOptions.add(pickColor);
        });
        addProductToCart(kanap);
    })
    .catch(error => {
        console.log(error);
    });

const cart = JSON.parse(localStorage.getItem('products')) || [];
const addToCartButton = document.querySelector('#addToCart');
const select = document.querySelector('#colors');
const quantity = document.querySelector('#quantity');
let notification = document.querySelector(".item__content__addButton");

// 
//   affiche une notification d'erreur selon l'action de l'utilisateur
//   supprime le message après un certain délais
//  /
let deleteNotification = () => {
    let notificationMessage = document.querySelector('#message')
    setTimeout(function () {
        notificationMessage.remove()
    }, 2000)
}


//   ajoute un produit au panier au click sur le bouton 'ajouter au panier'
//  @kanap: article unique qu'on ajoute à partir de la page produit
//  stock le produit ajouté dans le localstorage avec les détails nécessaires


let sameItemQuantity = cart.find(item => item.productSelectedQuantity);

function addProductToCart(kanap) {
    const productImage = kanap.imageUrl;
    const productAltTxt = kanap.altTxt;
    const productName = kanap.name;

    let selectedColor = select.addEventListener('change', (e) => {
        selectedColor = e.target.value;
    });

    addToCartButton.addEventListener('click', () => {
        let sameItem = cart.find(item => item.productSelectedColor === selectedColor
        && item.currentProductId === productId);

        if (quantity.value <= 0 || quantity.value > 100) {
            notification.insertAdjacentHTML('afterend', '<span id="message" style="text-align: center; font-weight: bold;"><br>Veuillez saisir une quantité valide (entre 1-100)</span>');
            deleteNotification();
            
        }else if (select.value !== selectedColor) {
            notification.insertAdjacentHTML('afterend', '<span id="message" style="text-align: center; font-weight: bold;"><br>Veuillez choisir une couleur</span>');
            deleteNotification();
        }else{
            let currentProduct = {
                currentProductId: productId,
                productSelectedColor: selectedColor,
                productSelectedQuantity: parseInt(quantity.value),
                productName: productName,
                productImage: productImage,
                altTxt: productAltTxt,
            }
            if (sameItem) {
                sameItem.productSelectedQuantity += parseInt(quantity.value);
                if (sameItem.productSelectedQuantity > 100) {
                    notification.insertAdjacentHTML('afterend', '<span id="message" style="text-align: center; font-weight: bold;"><br>limite atteinte dans le panier</span>');
                    deleteNotification();
                    return;
                }else{
                    notification.insertAdjacentHTML('afterend', '<span id="message" style="text-align: center; font-weight: bold;"><br>La quantité a bien été modifiée</span>');
                    deleteNotification();
                }
            }else {
                currentProduct.productSelectedQuantity = parseInt(quantity.value);
                cart.push(currentProduct);
                notification.insertAdjacentHTML('afterend', '<span id="message" style="text-align: center; font-weight: bold;"><br>produit ajouté au panier !</span>');
                deleteNotification();
            }
            localStorage.setItem('products', JSON.stringify(cart));
        }
    });
}