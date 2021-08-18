function displayDetail(product) {
    const element = document.createElement("div");
    element.innerHTML = `
    <div class="produit">
    <img src="${product.imageUrl}" alt="description d'images">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <select>
    ${product.colors.map((color) => `<option>${color}</option>`)}
    </select>
    <span>${product.price / 100} €</span>
    <button id="${product._id}">ajouter du panier</button>
    </div>
  `;
    document.getElementById("app").appendChild(element);
    document.getElementById(product._id).addEventListener("click", ()=>{
        addItem(product)
      })
  }

async function getProduct(id) {
    const productJson = await fetch(`http://localhost:3000/api/teddies/${id}`);
    const product = await productJson.json();
    return product;
  }
  
async function start() {
    let params = (new URL(document.location)).searchParams
    let product = await getProduct(params.get("id"))
    displayDetail(product);
  }
  
  start();