function addItem(item) {
    const panier=list()
    if (panier.find((product) => product._id === item._id)) {
        return
    }
    panier.push(item)
    const panierstring=JSON.stringify(panier)
    localStorage.setItem("panier", panierstring)
}

function list() {
    const panierstring=localStorage.getItem("panier")
    if (panierstring){
        return (JSON.parse(panierstring))
    }
    return []
}

function removeItem(item) {
    let panier = list()
    panier = panier.filter((currentItem) => {
        if (currentItem._id !== item._id){
            return true
        }
        return false
    })
    localStorage.setItem("panier", JSON.stringify(panier))
}