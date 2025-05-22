let APIurl = "https://dummyjson.com/products";
const row = document.getElementById("row");
const categorySelect = document.getElementById("all-category");
const sortSelect = document.getElementById("sort");
const searchInput = document.querySelector("input");

let allProducts = [];

fetch(APIurl)
  .then(response => response.json())
  .then(res => {
    allProducts = res.products;
    renderProducts(allProducts);
  });

function renderProducts(products) {
  // Eski kartochkalarni tozalash
  const cards = document.querySelectorAll(".product-card");
  cards.forEach(card => card.remove());

  products.forEach(item => {
    let div = document.createElement("div");
    div.className = "product-card w-72 bg-blue-100 text-purple-800 rounded-xl p-4 shadow hover:scale-105 transition";
    div.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" class="h-40 w-full object-contain rounded mt-4 mb-2">
      <h1 class="font-bold text-lg">${item.title}</h1>
      <p class="text-sm">${item.description}</p>
      <p class="italic">Kategoriya: ${item.category}</p>
      <p class="text-green-600 font-bold mt-2">$${item.price}</p>
    `;
    row.appendChild(div);
  });
}


searchInput.addEventListener("input", filterAll);


categorySelect.addEventListener("change", filterAll);


sortSelect.addEventListener("change", filterAll);


function filterAll() {
  let filtered = [...allProducts];

 
  const search = searchInput.value.toLowerCase();
  if (search) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(search));
  }

  
  const selectedCategory = categorySelect.value;
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  
  const sortValue = sortSelect.selectedIndex;
  if (sortValue === 1) {
    filtered.sort((a, b) => a.price - b.price); 
  } else if (sortValue === 2) {
    filtered.sort((a, b) => b.price - a.price); 
  }

  renderProducts(filtered);
}








































