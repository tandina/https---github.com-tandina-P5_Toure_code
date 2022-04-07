const url='http://localhost:3000/api/products';
const productData = document.querySelector('#items');
      (async function fetchProducts() {
        try {
            // after this line, our function will wait for the `fetch()` call to be settled
            // the `fetch()` call will either return a Response or throw an error
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            // after this line, our function will wait for the `response.json()` call to be settled
            // the `response.json()` call will either return the JSON object or throw an error
            const products = await response.json();
            products.forEach(product => {
                        productData.innerHTML += `
                            <a href="./product.html?id=${product._id}">
                                <article>
                                    <img src="${product.imageUrl}" alt="${product.altTxt}"/>
                                    <h3 class="productName">${product.name}</h3>
                                    <p class="productDescription">${product.description}</p>
                                </article>
                            </a>
                        `
            });
        }
        catch(error) {
          console.error(`Could not get products: ${error}`);
        }
      })();

      