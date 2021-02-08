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
let purchaseList = document.querySelector(".purchase-list");
let cardRadioButton = document.querySelector("#card");
let cardForm = document.querySelector(".card-form");
let cashRadioButton = document.querySelector("#cash");
let cashForm = document.querySelector(".cash-form");
let cashAmount = document.querySelector("#cash-amount");
let submitPayment = document.querySelector(".submit-payment");
let receiptContainer = document.querySelector(".receipt-container");
let actualReceipt = document.querySelector(".actual-receipt");
let deleteReceipt = document.querySelector(".delete");
let checkoutForm = document.querySelector(".checkout-form");
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
    e.target.textContent = "Item Added to Cart!";
    e.target.style.backgroundColor = "#625133";
  }
});

checkOutButton.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.style.display = "flex";
  let totalContainer = document.createElement("p");
  let subtotalContainer = document.createElement("p");
  let taxContainer = document.createElement("p");
  purchaseList.classList.add("purchase-list-border");
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
  checkOutButton.style.backgroundColor = "#625133";
  checkOutButton.textContent = "All Set!";
  checkOutButton.disabled = true;
});

cardRadioButton.addEventListener("click", () => {
  cardForm.style.display = "flex";
  cashForm.style.display = "none";
});

cashRadioButton.addEventListener("click", () => {
  cashForm.style.display = "flex";
  cardForm.style.display = "none";
  cashAmount.setAttribute("min", finalTotal);
});

cashForm.addEventListener("submit", (e) => {
  e.preventDefault();
  receiptContainer.style.display = "flex";
  receiptContainer.append(actualReceipt);
  let snapshot = new FormData(cashForm);
  let cashPayment = snapshot.get("cash-amount");
  let change = cashPayment - finalTotal;
  cashForm.append(`Your Change: $${change.toFixed(2)}`);
  let receiptTitle = document.createElement("h3");
  let itemTitle = document.createElement("p");
  let thankYouMessage = document.createElement("p");
  let tenderMethod = document.createElement("p");
  let receiptSubtotal = document.createElement("p");
  let receiptTax = document.createElement("p");
  let receiptFinalTotal = document.createElement("p");
  receiptSubtotal.textContent = `Subtotal: $${subTotal}`;
  receiptTax.textContent = `Tax: $${tax.toFixed(2)}`;
  receiptFinalTotal.textContent = `Total: $${finalTotal.toFixed(2)}`;
  tenderMethod.textContent = "Payment type: Cash";
  itemTitle.textContent = "Items:";
  receiptTitle.textContent = "Cafe Necessitea";
  thankYouMessage.textContent =
    "Thanks for shopping with us! Have a great day!";
  actualReceipt.append(receiptTitle);
  actualReceipt.append(itemTitle);
  actualReceipt.append(purchaseList);
  actualReceipt.append(receiptSubtotal);
  actualReceipt.append(receiptTax);
  actualReceipt.append(receiptFinalTotal);
  actualReceipt.append(tenderMethod);
  actualReceipt.append(`Your change: $${change.toFixed(2)}`);
  actualReceipt.append(thankYouMessage);
});

cardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  receiptContainer.style.display = "flex";
  receiptContainer.append(actualReceipt);
  let receiptTitle = document.createElement("h3");
  let itemTitle = document.createElement("p");
  let thankYouMessage = document.createElement("p");
  let tenderMethod = document.createElement("p");
  let receiptSubtotal = document.createElement("p");
  let receiptTax = document.createElement("p");
  let receiptFinalTotal = document.createElement("p");
  receiptSubtotal.textContent = `Subtotal: $${subTotal}`;
  receiptTax.textContent = `Tax: $${tax.toFixed(2)}`;
  receiptFinalTotal.textContent = `Total: $${finalTotal.toFixed(2)}`;
  tenderMethod.textContent = "Payment type: Card";
  itemTitle.textContent = "Items:";
  receiptTitle.textContent = "Cafe Necessi Tea";
  thankYouMessage.textContent =
    "Thanks for shopping with us! Have a great day!";
  actualReceipt.append(receiptTitle);
  actualReceipt.append(itemTitle);
  actualReceipt.append(purchaseList);
  actualReceipt.append(receiptSubtotal);
  actualReceipt.append(receiptTax);
  actualReceipt.append(receiptFinalTotal);
  actualReceipt.append(tenderMethod);
  actualReceipt.append(thankYouMessage);
});

deleteReceipt.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    receiptContainer.style.display = "none";
    location.reload(); //highlight of the weekend***
    // formContainer.innerHTML = "";
    // displayMyCart.innerHTML = "";
    // checkoutForm.reset();
    // cashForm.reset();
    // cardForm.reset();
    // // formContainer.reset();
    // // myCartArray.reset();
    // displayMyCart.reset();
    // receiptContainer.reset();
    // totalContainer.reset();
  }
});
