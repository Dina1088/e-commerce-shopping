let bar = document.getElementById("bar");
let nav = document.getElementById("nav");
let openCart = document.getElementById("openCart");
let cart = document.querySelector(".cart");
let closeCart = document.getElementById("closeCart");
let content = document.querySelector(".content");
let cartList = document.querySelector(".cart-list");
let quantity = document.querySelector(".quantity");
let total = document.querySelector(".total-price");

if (
  bar.addEventListener("click", function () {
    nav.style.display = "block";
  })
) {
} else if (
  bar.addEventListener("dblclick", function () {
    nav.style.display = "none";
  })
) {
  nav.style.display = "block";
}

openCart.addEventListener("click", () => {
  cart.classList.add("active");
});
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

let products = [
  {
    id: 1,
    image: "OIP.jpg",
    name: "T-shirt",
    price: "250",
  },
  {
    id: 2,
    image: "OIP (1).jpg",
    name: "T-shirt",
    price: "250",
  },
  {
    id: 3,
    image: "image.jpg",
    name: "T-shirt",
    price: "200 ",
  },
  {
    id: 4,
    image: "th (1).jpg",
    name: "T-shirt",
    price: "250",
  },
  {
    id: 5,
    image: "large_2102_13.jpg",
    name: "T-shirt",
    price: "400",
  },
  {
    id: 6,
    image: "5a8fcf90a500a7da27ba49ed093ae866.jpg",
    name: "T-shirt",
    price: "250",
  },
];
let listCards ;
if(localStorage.products != null){
  listCards = JSON.parse(localStorage.products)
}
else{
  listCards =[]
}
getProductLocalStorage()
function initialApp() {
  products.forEach((value) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("product-box");
    newDiv.innerHTML = `
     <img src="images/${value.image}" />
     <h2>${value.name}</h2>
     <span>${value.price}</span>
     <br>
     <button type="button" class="btn btn-dark" onclick="addToCart(${value.id})">Add to cart</button>
     <button type="button" class="btn btn-dark" onclick="buyNow()">Buy Now</button>
     `;
    content.appendChild(newDiv);
  });
}
initialApp();

function addToCart(id) {
  let product = products.find((pro) => pro.id === id);
  //    listCards.push(product)
  let productIndex = listCards.findIndex((pro) => pro.id === id);
  if (productIndex > -1) {
    listCards[productIndex].quantity += 1;
  } else {
    listCards.push({ ...product, quantity: 1 });
  }
  reloadCard();
}

function reloadCard() {
  cartList.innerHTML = "";
  let totalPrice = 0;
  let count = 0;
  listCards.forEach((value) => {
    totalPrice += value.price * value.quantity;
    count += value.quantity;
    let newLi = document.createElement("li");
    newLi.classList.add("box");
    newLi.innerHTML = `
     <img src="images/${value.image}" />
     <h2>${value.name}</h2>
     <span>${value.price}</span>
     <div>
     <button class="btn btn-primary"onclick=changeQuantity(${value.id},${
      value.quantity + 1
    }) >+</button>
    
     <div>${value.quantity}</div>
      <button class="btn btn-dark"onclick=changeQuantity(${value.id},${
      value.quantity - 1
    })>-</button>
     </div>
        `;
    cartList.appendChild(newLi);
  });

  quantity.innerHTML = count;
  total.innerHTML = totalPrice +"EGP";
  localStorage.setItem("products", JSON.stringify(listCards))
}
function changeQuantity(id, newQuantity) {
  let productIndex = listCards.findIndex((pro) => pro.id === id);
  if (newQuantity === 0) {
    listCards.splice(productIndex, 1);
  } else {
    listCards[productIndex].quantity = newQuantity;
  }
  reloadCard();
}

function buyNow() {
  window.open("form.html", "", "width=900,height=900");
}
function getProductLocalStorage(){
  localStorage.getItem("products")
  reloadCard()
}
getProductLocalStorage();
