// script.js
const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function showSlide(slideIndex) {
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}
// Start the slider directly after page load
document.addEventListener('DOMContentLoaded', () => {
    // Add the active class to the first slide
    slides[0].classList.add('active');
    // Start the slider interval
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
});

// Cart object to store selected items
const cart = [];
// Function to add an item to the cart
function addToCart(itemName, itemPrice, itemImage) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            image: itemImage
        });
    }
    updateCart();
}
// Function to update the cart display
function updateCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;
    // Clear the existing cart list
    cartList.innerHTML = '';
    // Populate the cart list with selected items
    cart.forEach(item => {
        const listItem = document.createElement('li');
        // Create a div to hold the item details (image, name, price, and remove buttons)
        const itemDetails = document.createElement('div');
        itemDetails.className = 'item-details';
        // Create the image element and set its source
        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemDetails.appendChild(itemImage);
        // Create the item name and quantity display
        const itemNameAndQuantity = document.createElement('div');
        itemNameAndQuantity.textContent = `${item.name} x ${item.quantity}`;
        itemDetails.appendChild(itemNameAndQuantity);
        // Create the item price
        const itemPrice = document.createElement('div');
        itemPrice.textContent = `$${(item.price * item.quantity).toFixed(1)}`;
        itemDetails.appendChild(itemPrice);
        // Create the remove F
        const removeButtons = document.createElement('div');
        const removeOneButton = document.createElement('button');
        const removeAllButton = document.createElement('button');
        
        removeOneButton.textContent = 'Remove One';
        removeAllButton.textContent = 'Remove All';
        
        removeOneButton.addEventListener('click', () => removeOneFromCart(item));
        removeAllButton.addEventListener('click', () => removeAllFromCart(item));
        
        // Apply styles to the buttons
        removeOneButton.style.backgroundColor = 'grey';
        removeOneButton.style.color = 'white';
        removeOneButton.style.padding = '10px';
        removeOneButton.style.border = 'none';
        removeOneButton.style.borderRadius = '5px';
        removeOneButton.style.cursor = 'pointer';
        removeOneButton.style.marginRight = '10px';
        // Add more styles as needed
        
        removeAllButton.style.backgroundColor = 'darkred';
        removeAllButton.style.color = 'white';
        removeAllButton.style.padding = '10px';
        removeAllButton.style.border = 'none';
        removeAllButton.style.borderRadius = '5px';
        removeAllButton.style.cursor = 'pointer';
        // Add more styles as needed
        
        // Append the buttons to the container
        removeButtons.appendChild(removeOneButton);
        removeButtons.appendChild(removeAllButton);
        itemDetails.appendChild(removeButtons);
        
        
        listItem.appendChild(itemDetails);
        cartList.appendChild(listItem);
        total += item.price * item.quantity;
    });
    // Update the cart total
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}
// Function to remove one item from the cart
function removeOneFromCart(item) {
    const index = cart.indexOf(item);
    if (index !== -1) {
        cart[index].quantity--;
        if (cart[index].quantity === 0) {
            cart.splice(index, 1);
        }
        updateCart();
    }
}
// Function to remove all items of a certain type from the cart
function removeAllFromCart(item) {
    const index = cart.indexOf(item);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}
// Event listener to add items to the cart when clicking "Add to Cart" button
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const itemElement = event.currentTarget.parentNode;
        const itemName = itemElement.querySelector('.dish').textContent;
        const itemPrice = parseFloat(itemElement.querySelector('.price').textContent.slice(0));
        const itemImage = itemElement.querySelector('img').src;
        addToCart(itemName, itemPrice, itemImage);
    });
});
// Scroll to Cart Section when clicking on the cart icon
document.querySelector('.cart-icon a').addEventListener('click', event => {
    event.preventDefault();
    const cartSection = document.getElementById('cart');
    cartSection.scrollIntoView({ behavior: 'smooth' });
});
