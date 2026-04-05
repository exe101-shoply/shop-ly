const products = [
  {
    id: 1,
    name: "Ly sứ trắng",
    price: 50000,
    img: "https://images.unsplash.com/photo-1580910051074-3eb694886505"
  },
  {
    id: 2,
    name: "Ly thủy tinh",
    price: 70000,
    img: "https://images.unsplash.com/photodata:image/jpeg;base64,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-1600857544200-b2f666a9a2ec"
  },
  {
    id: 3,
    name: "Ly giữ nhiệt",
    price: 120000,
    img: "https://images.unsplash.com/photo-1590080877777-52d6f9c7e9b5"
  }
];

// lấy cart từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// lưu cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// cập nhật số lượng
function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

// thêm vào giỏ
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  saveCart();
  updateCartCount();
  alert("Đã thêm vào giỏ!");
}

// render sản phẩm + search
function renderProducts() {
  const list = document.getElementById("product-list");
  const keyword = document.getElementById("search").value.toLowerCase();

  list.innerHTML = "";

  products
    .filter(p => p.name.toLowerCase().includes(keyword))
    .forEach(p => {
      list.innerHTML += `
        <div class="bg-white p-4 rounded-xl shadow hover:scale-105 transition duration-300">
          
          <img src="${p.img}" class="w-full h-40 object-cover rounded mb-2">

          <h3 class="font-bold">${p.name}</h3>

          <p class="text-red-500 font-bold">${p.price.toLocaleString()}đ</p>

          <button onclick="addToCart(${p.id})"
            class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 mt-2 rounded w-full">
            Thêm vào giỏ
          </button>
        </div>
      `;
    });

  updateCartCount();
}
function getTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}
function renderTotal() {
  document.getElementById("total").innerText =
    "Tổng: " + getTotal().toLocaleString() + "đ";
}
renderTotal();

// chạy
renderProducts();