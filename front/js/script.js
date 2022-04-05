// on récupére les données de l'api qui sont stocké dans un json.
// on intégrele résultat dans un parametre de then et integre le résultat dans les balises html par la string interpolation


const productData = document.querySelector('#items');
const url='http://localhost:3000/api/products';
fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((product) => product.forEach(product => {
        productData.innerHTML += `
            <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}"/>
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>
        `
    }))
    .catch(error => {
        console.log(error);
    });
    console.log(fetch);






