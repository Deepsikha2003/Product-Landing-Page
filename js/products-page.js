// js/products-page.js

document.addEventListener("DOMContentLoaded", () => {
  const productListContainer = document.getElementById("product-list");

  // ⭐ Render star icons based on rating
  const renderStars = (rating) => {
    let starsHtml = "";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }

    return starsHtml;
  };

  // ☕ Render all coffee products
  const renderAllProducts = () => {
    if (!productListContainer) {
      console.error("Missing #product-list container");
      return;
    }

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.dataset.id = product.id;

      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image" />
        </div>
        <div class="card-content">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-info">${product.info}</p>
          <div class="product-rating">
            ${renderStars(product.rating)}
          </div>
          <p class="product-price">₹${product.price.toFixed(2)}</p>
        </div>
        <div class="add-to-cart-btn" title="Add to Cart">
          <i class="fas fa-shopping-cart"></i>
        </div>
      `;

      productListContainer.appendChild(productCard);
    });
  };

  renderAllProducts();
});
