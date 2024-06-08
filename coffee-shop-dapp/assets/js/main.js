import { connectWallet, payTo } from './metamask.js';
import products from './products.js';
const productItems = document.querySelector('.product-items');
const popupOrder = document.querySelector('.order-popup');
const connectWalletBtn = document.querySelector('#connect-wallet');
const walletAddress = document.querySelector('.wallet-address');

async function renderProducts() {
	productItems.innerHTML = '';

	products.forEach((product) => {
		const productItem = document.createElement('div');
		productItem.classList.add('product-item');
		productItem.id = product.id;
		productItem.innerHTML = `
						<img src="./assets/img/${product.image}" alt="${product.name}" />
						<h3>${product.name}</h3>
						<div class="actions">
							<p>Price: R${product.price}</p>
							<button class="order-btn" id="${product.id}">Order</button>
						</div>
  `;

		productItems.appendChild(productItem);
	});

	const { account } = await connectWallet();
	walletAddress.textContent = account;
}

renderProducts();

// list click on products
const orderBtns = document.querySelectorAll('.order-btn');
orderBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		const productId = e.target.id;
		const product = products.find((product) => product.id == productId);
		showOrder(product);
	});
});

function showOrder(product) {
	const popupContent = `
 <h1>Place your Order</h1>
	<button class="close-btn"><i class="fa fa-sign-out-alt"></i></button>
 <div class="order-popup-content">
					<img src="./assets/img/${product.image}" alt="${product.name}" />
					<form id="order-form">
						<div class="form-group">
							<label for="quantity">Quantity</label>
							<input type="number" id="quantity" name="quantity" min="1" max="10" value="1" required />
						</div>
      <div class="form-group">
       <h3>Total: R<span id="total">${product.price}</span></h3>
      </div>
						<button class="place-order-btn" type="submit">Place Order</button>
					</form>
				</div>
 `;

	popupOrder.innerHTML = popupContent;
	popupOrder.style.display = 'flex';

	const closeOrder = document.querySelector('.close-btn');
	closeOrder.addEventListener('click', () => {
		popupOrder.style.display = 'none';
	});

	const quantityInput = document.querySelector('#quantity');
	const total = document.querySelector('#total');
	quantityInput.addEventListener('input', () => {
		if (quantityInput.value < 1) {
			quantityInput.value = 1;
		} else if (quantityInput.value > 10) {
			quantityInput.value = 10;
		} else if (quantityInput.value % 1 !== 0) {
			quantityInput.value = Math.round(quantityInput.value);
		}
		total.textContent = quantityInput.value * product.price;
	});

	const orderForm = document.querySelector('#order-form');
	const placeOrderBtn = document.querySelector('.place-order-btn');
	orderForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const order = {
			product,
			quantity: quantityInput.value,
			total: total.textContent,
		};
		placeOrder({ order, placeOrderBtn });
	});
}

async function placeOrder({ order, placeOrderBtn }) {
	placeOrderBtn.textContent = 'Processing...';
	const { account } = await connectWallet();
	order.total = parseFloat(order.total);

	try {
		await payTo({ account, order, placeOrderBtn });
	} catch (error) {
		alert(`Error placing order: ${error.message}`);
		placeOrderBtn.textContent = 'Try Again!';
	}
}
