async function getProductList() {
  const productsJson = await fetch('http://localhost:3000/api/teddies');
  const products = await productsJson.json();
  // retourne une liste de produits
  return products;
}

function displayProductCard(product) {
  // aficher une carte pour un produit donné
  const element = document.createElement("div");
  element.innerHTML = `
  <div class="produit">
    <a class="detailprod" href="detail.html?id=${product._id}">
      <img src="${product.imageUrl}" alt="description d'images">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <span>${product.price / 100} €</span>
    </a>
    <button id="${product._id}">Ajouter au panier</button>
  </div>
`;
  document.getElementById("app").appendChild(element);
  document.getElementById(product._id).addEventListener("click", ()=>{
    addItem(product)
  })
}

async function start() {
  const products = await getProductList();
  for (let product of products) {
    displayProductCard(product);
  }
}

start();