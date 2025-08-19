const App = {
  initProductsPage() {
    UI.populateFilters(products);
    UI.renderProducts(products);
    UI.renderCart();

    // Busca global
    document.getElementById('searchForm').addEventListener('submit', e => {
      e.preventDefault();
      const query = document.getElementById('q').value.toLowerCase();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.specs.toLowerCase().includes(query)
      );
      UI.renderProducts(filtered);
    });

    // Aplicar filtros
    document.getElementById('applyFilters').addEventListener('click', () => {
      const category = document.getElementById('fCategory').value;
      const brand = document.getElementById('fBrand').value;
      const min = parseFloat(document.getElementById('fMin').value) || 0;
      const max = parseFloat(document.getElementById('fMax').value) || Infinity;
      const spec = document.getElementById('fSpec').value.toLowerCase();

      const filtered = products.filter(p => 
        (!category || p.category === category) &&
        (!brand || p.brand === brand) &&
        p.price >= min &&
        p.price <= max &&
        (!spec || p.specs.toLowerCase().includes(spec))
      );
      UI.renderProducts(filtered);
    });

    // Ordenação
    document.getElementById('sortBy').addEventListener('change', () => {
      const sort = document.getElementById('sortBy').value;
      let sorted = [...products];
      if(sort === 'priceAsc') sorted.sort((a,b)=> a.price-b.price);
      if(sort === 'priceDesc') sorted.sort((a,b)=> b.price-a.price);
      if(sort === 'new') sorted.sort((a,b)=> b.id-b.id);
      UI.renderProducts(sorted);
    });

    // Finalizar compra
    document.getElementById('checkoutBtn').addEventListener('click', () => {
      alert("Compra finalizada! Obrigado por comprar na VoidTech.");
      localStorage.removeItem('cart');
      UI.renderCart();
      UI.updateCartCount();
    });
  },

  addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    if (product) cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    UI.updateCartCount();
    UI.renderCart();
  },

  removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    UI.updateCartCount();
    UI.renderCart();
  }
};
