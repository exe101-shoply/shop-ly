let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

function renderCart() {
  const list = document.getElementById("cart-list");
  const total = document.getElementById("total");

  if (!list || !total) return;

  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = `
      <div class="bg-white rounded-2xl p-8 text-center shadow">
        <p class="text-xl font-semibold mb-2">Giỏ hàng đang trống</p>
        <p class="text-stone-500">Hãy chọn thêm vài chiếc ly thật xinh nhé.</p>
      </div>
    `;
    total.innerText = "Tổng: 0đ";
    return;
  }

  cart.forEach((item, index) => {
    list.innerHTML += `
      <div class="bg-white rounded-2xl shadow p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="flex items-center gap-4 w-full">
          <img
            src="${item.img}"
            alt="${item.name}"
            class="w-28 h-28 object-cover rounded-xl border"
          />

          <div class="flex-1">
            <h3 class="text-xl font-bold">${item.name}</h3>
            <p class="text-orange-500 font-semibold text-lg mt-1">
              ${item.price.toLocaleString()}đ
            </p>
          </div>
        </div>

        <button
          onclick="removeItem(${index})"
          class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold"
        >
          Xóa
        </button>
      </div>
    `;
  });

  total.innerText = "Tổng: " + getTotal().toLocaleString() + "đ";
}

renderCart();