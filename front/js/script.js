// let canapData = [];

// const fetchCanap = async () => {
//     await fetch ("http://localhost:3000/api/products")
//     .then((res) => res.json())
//     .then((promise) => { canapData = promise;
//     console.log(canapData);
//     });
// };
// const showProducts = async () => {
//     await fetchCanap();
// };

// fetchCanap();


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
    console.log(productData);



// async function recupererData() {
  
//   const requete = await fetch(url, {
//     method: 'GET'
//   });
  
//   if(!requete.ok) {
//     alert('Un problème est survenu.');
//   } else {
//     let donnees = await requete.json();
//     console.log(donnees);
//     const canapData =document.querySelector('#items');
//     document.querySelector('#items').innerHTML = donnees.EUR.last;
//   }
// }


// const url = 'http://localhost:3000/api/products';
// async function recupererData() {
//     const requete = await fetch(url, {
//         method:'GET'
//     });

//     if(!requete.ok) {
//         alert('un problème est survenu');
//     } else
//     { let donnees =await requete.json();
//     console.log(donnees);
//     donnees.foreach(donnees) => console.log(donnees);
//     // document.querySelector('#items').innerHTML=
//     // donnees.innerHTML += `
//     //         <a href="./product.html?id=${donnees._id}">
//     //             <article>
//     //                 <img src="${donnees.imageUrl}" alt="${donnees.altTxt}"/>
//     //                 <h3 class="productName">${donnees.name}</h3>
//     //                 <p class="productDescription">${donnees.description}</p>
//     //             </article>
//     //         </a>
//     //     `      
//     }
// }
// recupererData();






