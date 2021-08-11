function getProductList() {
    const products=localStorage.getItem("panier")
    return JSON.parse(products);
  }
  
function displayDetail(product) {
    const element = document.createElement("div");
    element.innerHTML = `
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <span>${product.price / 100} €</span>
      <button id="${product._id}">Retirer du panier</button>
  `;
    document.getElementById("app").appendChild(element);
    document.getElementById(product._id).addEventListener("click", ()=>{
        removeItem(product)
        location.reload()
      })
  }
  
function start() {
    let products = getProductList();
    for (product of products) {
      displayDetail(product);
    }
  }
  
  start();