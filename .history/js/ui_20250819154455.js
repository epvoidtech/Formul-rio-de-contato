const UI = {
  initHeader() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) document.getElementById('navUser').textContent = loggedUser.name;
    this.updateCartCount();

    document.getElementById('themeToggle').addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
    });

    // Fechar carrinho
    document.getElementById('closeCart').addEventListener('click', () => {
      document.getElementById('cart').classList.remove('open');
    });
  },

  renderProducts(productsList) {
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = '';
    if (!productsList.length) {
      document.getElementById('resultsEmpty').classList.remove('hidden');
      return;
    }
    document.getElementById('resultsEmpty').classList.add('hidden');

    productsList.forEach(p => {
      const discountedPrice = p.promo && p.promo.active 
        ? (p.price * (1 - p.promo.discount/100)).toFixed(2) 
        : p.price.toFixed(2);

      const promoLabel = p.promo && p.promo.active ? `<span class="promo">-${p.promo.discount}%</span>` : '';

      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p>${p.brand}</p>
        <p>${promoLabel} R$ ${discountedPrice}</p>
        <button class="btn btn-neon" onclick="App.addToCart(${p.id})">Adicionar</button>
      `;
      grid.appendChild(card);
    });
  },

  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cartCount').textContent = cart.length;
  },

  renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
      const price = item.promo && item.promo.active 
        ? item.price * (1 - item.promo.discount/100)
        : item.price;

      subtotal += price;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <span>${item.name}</span>
        <strong>R$ ${price.toFixed(2)}</strong>
        <button class="remove-btn" onclick="App.removeFromCart(${index})">✖</button>
      `;
      cartItems.appendChild(div);
    });

    document.getElementById('cartSubtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
  },

  populateFilters(products) {
    const categories = [...new Set(products.map(p => p.category))];
    const brands = [...new Set(products.map(p => p.brand))];

    const catSelect = document.getElementById('fCategory');
    const brandSelect = document.getElementById('fBrand');

    catSelect.innerHTML = `<option value="">Todas</option>`;
    brandSelect.innerHTML = `<option value="">Todas</option>`;

    categories.forEach(c => catSelect.innerHTML += `<option value="${c}">${c}</option>`);
    brands.forEach(b => brandSelect.innerHTML += `<option value="${b}">${b}</option>`);
  }
};
