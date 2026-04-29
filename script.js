let products = [
{
name:"Laptop",
price:50000,
category:"Electronics",
rating:"⭐⭐⭐⭐⭐",
image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
},
{
name:"Mobile",
price:25000,
category:"Electronics",
rating:"⭐⭐⭐⭐",
image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
},
{
name:"Shoes",
price:3000,
category:"Fashion",
rating:"⭐⭐⭐⭐",
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
},
{
name:"Watch",
price:4000,
category:"Accessories",
rating:"⭐⭐⭐⭐⭐",
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
},
{
name:"Headphones",
price:2000,
category:"Electronics",
rating:"⭐⭐⭐⭐",
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
},
{
name:"Bag",
price:1500,
category:"Fashion",
rating:"⭐⭐⭐⭐",
image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"
},
{
name:"Keyboard",
price:1200,
category:"Accessories",
rating:"⭐⭐⭐⭐",
image:"https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400"
},
{
name:"Speaker",
price:1800,
category:"Accessories",
rating:"⭐⭐⭐⭐",
image:"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400"
}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function displayProducts(list = products){
let output = "";

list.forEach((item,index)=>{
output += `
<div class="card">
<img src="${item.image}">
<h3>${item.name}</h3>
<p>${item.rating}</p>
<p>₹${item.price}</p>
<button onclick="addCart(${index})">Add Cart</button>
<button onclick="addWish(${index})">❤️ Wishlist</button>
</div>
`;
});

document.getElementById("products").innerHTML = output;
}

function addCart(index){
let found = cart.find(item => item.name === products[index].name);

if(found){
found.qty++;
}else{
cart.push({...products[index], qty:1});
}

saveCart();
showCart();
alert("Added to cart");
}

function showCart(){
let output = "";
let total = 0;

cart.forEach((item,index)=>{
let subtotal = item.price * item.qty;
total += subtotal;

output += `
<div class="cart-item">
${item.name} - ₹${item.price}
<button onclick="minus(${index})">-</button>
${item.qty}
<button onclick="plus(${index})">+</button>
= ₹${subtotal}
<button onclick="removeCart(${index})">Remove</button>
</div>
`;
});

document.getElementById("cart").innerHTML = output;
document.getElementById("total").innerText = "Total: ₹" + total;
}

function plus(i){
cart[i].qty++;
saveCart();
showCart();
}

function minus(i){
if(cart[i].qty > 1){
cart[i].qty--;
}
saveCart();
showCart();
}

function removeCart(i){
cart.splice(i,1);
saveCart();
showCart();
}

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function addWish(index){
wishlist.push(products[index]);
localStorage.setItem("wishlist", JSON.stringify(wishlist));
showWish();
alert("Added to wishlist");
}

function showWish(){
let output = "";

wishlist.forEach(item=>{
output += `
<div class="wish-item">
${item.name} - ₹${item.price}
</div>
`;
});

document.getElementById("wishlist").innerHTML = output;
}

function checkout(){
let address = document.getElementById("address").value;

if(address === ""){
alert("Please enter address");
return;
}

if(cart.length === 0){
alert("Cart is empty");
return;
}

orders.push({
date:new Date().toLocaleString(),
items:[...cart]
});

localStorage.setItem("orders", JSON.stringify(orders));

alert("Order placed successfully!");

cart = [];
saveCart();
showCart();
document.getElementById("address").value = "";
}

function showOrders(){
document.getElementById("ordersPopup").style.display = "block";

let output = "";

orders.forEach(order=>{
output += `
<div class="cart-item">
<b>${order.date}</b><br>
Items: ${order.items.map(i=>i.name).join(", ")}
</div>
`;
});

document.getElementById("ordersList").innerHTML = output || "No Orders Yet";
}

function closeOrders(){
document.getElementById("ordersPopup").style.display = "none";
}

function searchProducts(){
let text = document.getElementById("search").value.toLowerCase();

let filtered = products.filter(item =>
item.name.toLowerCase().includes(text)
);

displayProducts(filtered);
}

function filterCategory(cat){
if(cat === "All"){
displayProducts(products);
return;
}

let filtered = products.filter(item => item.category === cat);
displayProducts(filtered);
}

function toggleDarkMode(){
document.body.classList.toggle("dark");
}

function scrollToProducts(){
document.getElementById("productsTitle").scrollIntoView({
behavior:"smooth"
});
}

displayProducts();
showCart();
showWish();