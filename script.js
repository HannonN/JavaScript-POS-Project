"use strict";

// create array of objects with div, img, p, button, to make it all dynamic
// event delegation - listen for event on products container
// listens for click on html
// gets price from js (obj/arr)

let productArray = [
  {
    type: "coffee", // filter for groups on page
    name: "Aeropress",
    image: "assets/aeropress.jpg",
    price: 22,
  },
  {
    type: "coffee", // filter for groups on page
    name: "Chemex",
    image: "assets/chemex-other.jpg",
    price: 40,
  },
  {
    type: "coffee", // filter for groups on page
    name: "Chiapas Roast",
    image: "assets/chiapas.jpg",
    price: 12,
  },
  {
    type: "coffee", // filter for groups on page
    name: "Ethiopian",
    image: "assets/ethiopian.jpg",
    price: 13,
  },
  {
    type: "coffee", // filter for groups on page
    name: "Espresso double",
    image: "assets/espresso.jpg",
    price: 3,
  },
  {
    type: "tea", // filter for groups on page
    name: "Assam Tea",
    image: "assets/assam-tea.jpg",
    price: 3.5,
  },
  {
    type: "tea", // filter for groups on page
    name: "Boba Tea",
    image: "assets/boba-tea.jpg",
    price: 4,
  },
  {
    type: "tea", // filter for groups on page
    name: "Chamomile",
    image: "assets/chamomile.jpg",
    price: 2,
  },
  {
    type: "tea", // filter for groups on page
    name: "Green Tea",
    image: "assets/green-tea.jpg",
    price: 2,
  },
  {
    type: "tea", // filter for groups on page
    name: "Teapot",
    image: "assets/teapot.jpg",
    price: 35,
  },
  {
    type: "smoothie", // filter for groups on page
    name: "Smoothie",
    image: "assets/smoothie.jpg",
    price: 5,
  },
  {
    type: "smoothie", // filter for groups on page
    name: "Juicer",
    image: "assets/juicer.jpg",
    price: 38,
  },
  {
    type: "smoothie", // filter for groups on page
    name: "Ninja-Blender",
    image: "assets/ninja-blender-2.jpg",
    price: 43,
  },
  {
    type: "smoothie", // filter for groups on page
    name: "Whey Protein",
    image: "assets/whey-protein.jpg",
    price: 18,
  },
];
let myCartArray = [];
let productContainer = document.querySelector(".product-container");
let product = document.querySelectorAll(".product");
let coffee = document.querySelector(".coffee");
let tea = document.querySelector(".tea");
let smoothie = document.querySelector(".smoothie");
let displayMyCart = document.querySelector(".display-my-cart");
let checkOutButton = document.querySelector(".checkout-button");
let formContainer = document.querySelector(".form-container");
let cartItems = 0;
let subTotal = 0;
let finalTotal = 0;
let tax = 0.06;

const display = () => {
  productArray.forEach((product, index) => {
    let card = document.createElement("div");
    let paragraph = document.createElement("p");
    let addButton = document.createElement("button");
    let image = document.createElement("img");
    card.classList.add("product");
    paragraph.classList.add("name-price");
    addButton.classList.add("cart-button");
    addButton.setAttribute("data-index", index);
    image.classList.add("product-image");
    image.setAttribute("src", product.image);
    paragraph.textContent = `${product.name} $${product.price}`;
    image.textContent = product.image;
    addButton.textContent = "Add to Cart";
    card.append(image, paragraph, addButton);
    if (product.type === "coffee") {
      coffee.append(card);
    } else if (product.type === "tea") {
      tea.append(card);
    } else if (product.type === "smoothie") {
      smoothie.append(card);
    }
  });
};
display();

productContainer.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("cart-button")) {
    let index = e.target.getAttribute("data-index");
    myCartArray.push(productArray[index].price, productArray[index].name);
    console.log(myCartArray);
  }
});

let purchaseList = document.querySelector(".purchase-list");
checkOutButton.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.style.display = "flex";
  let totalContainer = document.createElement("p");
  let subtotalContainer = document.createElement("p");
  let taxContainer = document.createElement("p");

  //for (let i = 0; i < myCartArray.length; i += 2) {
  // }
  for (let i = 0; i < myCartArray.length; i += 2) {
    subTotal += myCartArray[i];
  }
  for (let j = 1; j < myCartArray.length; j += 2) {
    let purchaseListItem = document.createElement("li");
    purchaseListItem.textContent = `${myCartArray[j]}: $${myCartArray[j - 1]}`;
    purchaseList.append(purchaseListItem);
  }
  finalTotal = subTotal * 1.06;
  tax *= subTotal;
  subtotalContainer.textContent = `Subtotal: $${subTotal}`;
  taxContainer.textContent = `Tax: $${tax.toFixed(2)}`;
  totalContainer.textContent = `Total: $${finalTotal.toFixed(2)}`;
  displayMyCart.append(subtotalContainer);
  displayMyCart.append(taxContainer);
  displayMyCart.append(totalContainer);
});

let cardRadioButton = document.querySelector("#card");
let cardForm = document.querySelector(".card-form");
let cashRadioButton = document.querySelector("#cash");
let cashForm = document.querySelector(".cash-form");
let cashAmount = document.querySelector("#cash-amount");
let submitPayment = document.querySelector(".submit-payment");
let receipt = document.querySelector(".receipt-container");
// trying to set the variable to the name in our radio buttons

cardRadioButton.addEventListener("click", () => {
  cardForm.style.display = "flex";
  cashForm.style.display = "none";
});

cashRadioButton.addEventListener("click", () => {
  cashForm.style.display = "flex";
  cardForm.style.display = "none";
  // cashAmount.textContent = finalTotal; // trying to make the total amount appear in the label.
  cashAmount.setAttribute("min", finalTotal);
});

submitPayment.addEventListener("click", (e) => {
  e.preventDefault();
  let snapshot = new FormData(cashForm);
  let cashPayment = snapshot.get("cash-amount");
  let change = cashPayment - finalTotal;
  cashForm.append(`Your Change: $${change.toFixed(2)}`);
  // displayReceipt(myCartArray,Subtotal,tax,finalTotal,`$('input[name="payment-method"]:checked').val()`);
});

console.log(`${'input[name="payment-method"]:checked'.val()}`);
// const displayReceipt = (myCartArray,Subtotal,tax,finalTotal, payment,)=>{
