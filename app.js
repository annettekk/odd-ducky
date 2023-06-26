"use strict";
console.log("Messi is... ");

// global varaibles
// querySelector returns the first element in the document that matches
const productContainer = document.querySelector("section");
const resultsButton = document.querySelector("div");
const image1 = document.querySelector("section img:first-child");
const image2 = document.querySelector("section img:nth-child(2)");
const image3 = document.querySelector("section img:nth-child(3)");

let clicks = 0;
const maxClicksAllowed = 25;

let allProducts = [];

let clickedProduct = null

function getRandomNumber() {
  return Math.floor(Math.random() * allProducts.length);
}

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

function renderProducts() {
  // we need to generate a number to reference the goat we want to render onto the page
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();
  
  console.log(clickedProduct)
  // how could we prevent goat1 being the same number a goat2?
  while (product1 === product2 || product1 === product3 || product2 === product3 || allProducts[product1].name === clickedProduct || allProducts[product2].name === clickedProduct || allProducts[product3].name === clickedProduct) {
    product1 = getRandomNumber();
    product2 = getRandomNumber();
    product3 = getRandomNumber();
  }
  
  //while (allProducts[product1].name === clickedProduct ) {
    //product1 = getRandomNumber()
  //}
  //while (allProducts[product2].name === clickedProduct) {
    //product2 = getRandomNumber()
  //}
  //while (allProducts[product3].name === clickedProduct) {
    //product3 = getRandomNumber()
  //}

  // now we have three random numbers lets set the attributes of our images in the document.
  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image3.src = allProducts[product3].src;
  image1.alt = allProducts[product1].name;
  image2.alt = allProducts[product2].name;
  image3.alt = allProducts[product3].name;
  allProducts[product1].views++;
  allProducts[product2].views++;
  allProducts[product3].views++;
}

function handleProductClick(event) {
  if (event.target === productContainer) {
    alert("Please click on a product");
  } else {
    clicks++;
    // console.log(clicks);
    clickedProduct = event.target.alt;
    for (let i = 0; i < allProducts.length; i++) {
      if (clickedProduct === allProducts[i].name) {
        allProducts[i].clicks++;
        break;
      }
    }
    if (clicks === maxClicksAllowed) {
      productContainer.removeEventListener("click", handleProductClick);
      productContainer.className = "no-voting";
      resultsButton.addEventListener("click", renderResults);
      resultsButton.className = "clicks-allowed";
    
    } else {
      renderProducts();
    }
  }
}

function renderResults() {
  // console.log("Your results are in!");
  let ul = document.querySelector("ul");
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }
}

const mug = new Product("Cat Mug", "images/cat-mug.jpg");
const crisp = new Product("Crisp Holder", "images/crisp-holder.jpg");
const gloves = new Product("Gloves", "images/gloves.jpg");
const knife = new Product("Knife Holder", "images/knife-holder.jpg");
const mop = new Product("Mop", "images/mop.jpg");
const pillow = new Product("Pillow", "images/pillow.jpg");
const slippers = new Product("Slippers", "images/slippers.jpg");
const tea = new Product("Tea Infuser", "images/tea-infuser.jpg");
const umbrella = new Product("Umbrella", "images/umbrella.jpg");

renderProducts();

productContainer.addEventListener("click", handleProductClick);