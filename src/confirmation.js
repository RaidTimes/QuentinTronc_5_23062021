function getOrder() {
    const orders=localStorage.getItem("order")
    return JSON.parse(orders);
  }

function displayConfirmation(order) {
    const element = document.createElement("div");
    const total = getOrder().products.reduce((total, products) => total + products.price, 0)
    element.innerHTML = `
    <div class="confirm">
      <h2>Merci pour vos achats ${order.contact.firstName} ${order.contact.lastName}</h2>
      <p>Commande numéro: ${order.orderId}</p>
      <p id="table">Montant de la commande ${total / 100}€</p>
    </div>
  `;
    document.getElementById("app").appendChild(element);
  }

function start() {
    let orders = getOrder();
    displayConfirmation(orders);
  }
  
  start();