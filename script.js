fetch("https://fakestoreapi.com/products")
    .then((data) => {
        return data.json();
    })
    .then((completedata) => {
        let data1 = "";
        completedata.map((values) => {
            data1 += `<div class="card">
        <h1 class="title">${values.title}</h1>
        <img src="${values.image}" alt="img" class="images" />
        <p class="category">${values.category}</p>
        <p class="rating">${values.rating.rate}☆☆☆☆☆ <span class="count">${values.rating.count} ratings</span></p>
        <p class="price">price: $ ${values.price}</p>
        <div class="addBuy">
          <p class="addtocart">Add to Cart</p>
          <p class="buynow">Buy Now</p>
        </div>
    </div>`;
            document.getElementById("cards").innerHTML = data1;
        });
    })
    .catch((err) => {
        console.log(err);
    });