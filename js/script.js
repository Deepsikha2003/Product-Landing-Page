document.addEventListener('DOMContentLoaded', () => {
    // Scroll-triggered animation for the "Why Choose Us" section
    const featuresSection = document.querySelector('.why-choose-us');
    if (featuresSection) {
        const featureItems = document.querySelectorAll('.why-choose-us .feature-item');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    featureItems.forEach(item => {
                        item.classList.add('animate-bounce');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        observer.observe(featuresSection);
    }

    // Cart Functionality (Global)
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total-price');
    const cartCountElement = document.querySelector('.cart-count');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    };

    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalElement.textContent = '0.00';
            return;
        }

        let total = 0;
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toFixed(2)}</p>
                </div>
                <div class="item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            total += item.price * item.quantity;
        });
        cartTotalElement.textContent = total.toFixed(2);
    };

    const handleCartActions = (e) => {
        if (e.target.closest('.increase-quantity')) {
            const id = e.target.closest('.increase-quantity').dataset.id;
            const item = cart.find(i => i.id === id);
            if (item) item.quantity++;
        } else if (e.target.closest('.decrease-quantity')) {
            const id = e.target.closest('.decrease-quantity').dataset.id;
            const itemIndex = cart.findIndex(i => i.id === id);
            if (itemIndex > -1) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    cart.splice(itemIndex, 1);
                }
            }
        } else if (e.target.closest('.remove-item-btn')) {
            const id = e.target.closest('.remove-item-btn').dataset.id;
            cart = cart.filter(item => item.id !== id);
        } else {
            return;
        }
        saveCart();
        renderCartItems();
    };

    // Event Listeners for the global cart modal
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            if (cartModal) {
                cartModal.style.display = 'block';
                renderCartItems();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', handleCartActions);
    }

    updateCartCount();
});