function getProductList() {
    const products=localStorage.getItem("panier")
    return JSON.parse(products);
  }
  
function displayDetail(product) {
    const element = document.createElement("div");
    element.innerHTML = `
    <div class="panierlist">
      <div class="produit">
        <img src="${product.imageUrl}" alt="description d'images">
        <h2>${product.name}</h2>
        <span>${product.price / 100} €</span>
        <button id="${product._id}">Retirer du panier</button>
      </div>
    </div>
  `;
    document.getElementById("app").appendChild(element);
    document.getElementById(product._id).addEventListener("click", ()=>{
        removeItem(product)
        location.reload()
      })
  }

function displayForm(product) {
  const element = document.createElement("div");
  const total = getProductList().reduce((total, product) => total + product.price, 0)
  element.innerHTML = `
  <div class="panier">
    <div>
      <p id="table">Montant du panier: ${total / 100}€</p>
    </div>
    <form action="confirmation.html" method="POST" id="orderForm">
    <div>
      <input name="firstname" id="firstname" value="Prénom">
      <input name="lastname" id="lastname" value="Nom">
    </div>
    <div>
      <input name="address" id="address" value="Adresse">
      <input name="city" id="city" value="Ville">
    </div>
    <div>
      <input name="email" id="email" value="Email">
      <button>Commander</button>
    </div>
    </form>
  </div>
  `;
  document.getElementById("app").appendChild(element);
  document.getElementById("orderForm").addEventListener("submit", sendOrder)
}

async function sendOrder(event) {
  event.preventDefault()
  const form = event.currentTarget
  const contact = {
    firstName: form.firstname.value,
    lastName: form.lastname.value,
    address: form.address.value,
    city: form.city.value,
    email: form.email.value
  }
  if (new RegExp(/[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$/, "i").test(contact.firstName) === false) {
    alert("Merci de saisir un Prénom conforme.")
    return
  }
  if (new RegExp(/[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$/, "i").test(contact.lastName) === false) {
    alert("Merci de saisir un Nom conforme.")
    return
  }
  if (new RegExp(/[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{5,}$/, "i").test(contact.address) === false) {
    alert("Merci de saisir une adresse conforme.")
    return
  }
  if (new RegExp(/[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$/, "i").test(contact.city) === false) {
    alert("Merci de saisir une adresse conforme.")
    return
  }
  if (new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, "i").test(contact.email) === false) {
    alert("Merci de saisir une adresse mail conforme.")
    return
  }
  const order = await fetch('http://localhost:3000/api/teddies/order', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contact,
      products: getProductList().map((product) => product._id)
    })
  })
  localStorage.setItem("order", JSON.stringify(await order.json()))
  location.href="confirmation.html"
}
  
function start() {
    let products = getProductList();
    for (product of products) {
      displayDetail(product);
    }
    displayForm(product);
  }
  
  start();