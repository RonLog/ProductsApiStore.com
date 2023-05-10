// fetch("https://fakestoreapi.com/products")
//     .then((data) => {
//         return data.json();
//     })
//     .then((completedata) => {
//         let data1 = "";
//         completedata.map((values) => {
//             data1 += `<div class="card">
//         <h1 class="title">${values.title}</h1>
//         <img src="${values.image}" alt="img" class="images" />
//         <p class="category">${values.category}</p>
//         <p class="rating">${values.rating.rate}☆☆☆☆☆ <span class="count">${values.rating.count} ratings</span></p>
//         <p class="price">price: <span class="price_value">$ ${price}</span></p>
//         <div class="addBuy">
//           <p class="addtocart">Add to Cart</p>
//           <p class="buynow">Buy Now</p>
//         </div>
//     </div>`;
//             document.getElementById("cards").innerHTML = data1;
//         });
//     })
//     .catch((err) => {
//         console.log(err);
//     });

//Side images using prev,next arrow
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
// Auto Slide
var slideIndex = 0;
showSlides();
function showSlides() {
    var i;
   var slides = document.getElementsByClassName("mySlides");
   for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
   }
   slideIndex++;
   if (slideIndex > slides.length) { slideIndex = 1 }
   slides[slideIndex - 1].style.display = "block";
   setTimeout(showSlides, 2000); // Change image every 2 seconds
}
let cards = document.querySelector(".cards");
let filterInput = document.getElementById("filterInput");

fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
        console.log(json);

        buildRating(json);

        // iterating products
        for (let value of json) {
            addElement(cards, value);
        }
    });

filterInput.addEventListener("keyup", filterProducts);

// callback function
function filterProducts() {
    let filterValue = filterInput.value.toUpperCase();
    let item = cards.querySelectorAll(".item");
    // console.log(filterValue);

    for (let i = 0; i < item.length; i++) {
        let span = item[i].querySelector(".title");

        if (span.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            item[i].style.display = "initial";
        } else {
            item[i].style.display = "none";
        }
    }
}

// fetch("https://fakestoreapi.com/products")
//     .then((res) => res.json())
//     .then((json) => {
//         buildRating(json);
//     });

function buildRating(data) {
  data.forEach(function(v) {
    createRatingElement(v.rating.rate);
  });
}

 function createRatingElement(numberOfStars) {
  var wrapper = document.createElement('div');
  for (var i = 1; i <= 5; i++) {
    var span = document.createElement('span')
    span.innerHTML = (i <= numberOfStars ? '★' : '☆');
    span.className = (i <= numberOfStars ? 'high' : '');
    wrapper.appendChild(span);
  }
  document.getElementById('img-container').appendChild(wrapper);
}

 
// get value from the api create dynamic element
function addElement(appendIn, value) {
    let div = document.createElement("div");
    div.className = "card";

    let { image, title, category, price } = value;

    div.innerHTML = `
                <h1 class="title">${title}</h1>
                <img src="${image}" alt="img" class="images" />
                <p class="category">${category}</p>
                <div class="banner-section" id="img-container"></div>
                <p class="price">price: <span class="price_value">$ ${price}</span></p>
                <div class="addBuy">
                  <p class="addtocart">Add to Cart</p>
                  <p class="buynow">Buy Now</p>
                </div>
            `;
    appendIn.appendChild(div);
}


  
function filterProducts() {
    // remove all the childs from the current element
    while (cards.childNodes.length > 1) {
        cards.removeChild(cards.lastChild);
    }

    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
            let filterValue = filterInput.value.toUpperCase();
            let filterData = match(json, "title", filterValue);

            for (const value of filterData) {
                addElement(cards, value);
            }
        });
}

// match
const match = (values, filterby, input) => {
    const p = Array.from(input).reduce((a, v, i) => `${a}[^${input.substr(i)}]*?${v}`, '');
    const re = RegExp(p);

    return values.filter((v) => v[filterby].toUpperCase().match(re));
    console.log(p);
};


