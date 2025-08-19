renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.innerHTML = '';
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name}</span>
      <strong>R$ ${item.price.toFixed(2)}</strong>
      <button class="remove-btn" onclick="App.removeFromCart(${index})">✖</button>
    `;
    cartItems.appendChild(div);
  });

  document.getElementById('cartSubtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
}
