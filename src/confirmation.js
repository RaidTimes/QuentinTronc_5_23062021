function getOrder() {
    const orders=localStorage.getItem("order")
    return JSON.parse(orders);
  }

function displayConfirmation(order) {
    const element = document.createElement("div");
    let contact = order.contact
    //const total = getOrder().reduce((total, order) => total+order.products.price, 0)
    element.innerHTML = `
    <div class="confirm">
      <h2>Merci pour vos achats ${contact.fistname} ${contact.lastname}</h2>
      <p>Commande numéro: ${order.orderId}</p>
    </div>
  `;
    document.getElementById("app").appendChild(element);
  }

function start() {
    let orders = getOrder();
    displayConfirmation(orders);
  }
  
  start();