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
    price: 22,
  },
  {
    type: "tea", // filter for groups on page
    name: "Boba Tea",
    image: "assets/boba-tea.jpg",
    price: 22,
  },
  {
    type: "tea", // filter for groups on page
    name: "Chamomile",
    image: "assets/chamomile.jpg",
    price: 22,
  },
  {
    type: "tea", // filter for groups on page
    name: "Green Tea",
    image: "assets/green-tea.jpg",
    price: 22,
  },
  {
    type: "tea", // filter for groups on page
    name: "Teapot",
    image: "assets/teapot.jpg",
    price: 22,
  },
  {
    type: "smoothie", // filter for groups on page
    name: "Smoothie",
    image: "assets/smoothie.jpg",
    price: 22,
  },
  {
    type: "smoothie", // filter for groups on page
    name: "Juicer",
    image: "assets/juicer.jpg",
    price: 22,
  },
  {
    type: "smoothie", // filter for groups on page
    name: "Ninja-Blender",
    image: "assets/ninja-blender-2.jpg",
    price: 22,
  },
  {
    type: "smoothie", // filter for groups on page
    name: "Whey Protein",
    image: "assets/whey-protein.jpg",
    price: 22,
  },
];
let productContainer = document.querySelector(".product-container");
let product = document.querySelectorAll(".product");
let cartItems = 0;
let subTotal = 0;
let finalTotal = 0;

const display = () => {
  productArray.forEach((product) => {
    let card = document.createElement("div");
    let paragraph = document.createElement("p");
    let addButton = document.createElement("button");
    let image = document.createElement("img");
    card.classList.add("product");
    paragraph.classList.add("name-price");
    addButton.classList.add("cart-button");
    image.classList.add("product-image");
    image.setAttribute("src", product.image);
    paragraph.textContent = `${product.name} $${product.price}`;
    image.textContent = product.image;
    addButton.textContent = "Add to Cart";
    card.append(image, paragraph, addButton);
    productContainer.append(card);
  });
  //   if (product.type === coffee) {
  //   }
};

// productContainer.addEventListener;
display();
console.log(productArray);
console.dir(productArray);
