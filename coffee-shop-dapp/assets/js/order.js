import { connectWallet, getOrders, getBalance } from './metamask.js';
const orderItems = document.querySelector('.order-items');
const customerWallet = document.querySelector('.customer-wallet');
const customerBalance = document.querySelector('.customer-balance');
const walletAddress = document.querySelector('.wallet-address');

async function renderOrders() {
	const { account } = await connectWallet();
	if (!account) {
		orderItems.innerHTML = '<p>Please connect your wallet to view orders</p>';
		return;
	}
	customerWallet.textContent = account;
	walletAddress.textContent = account;
	let balance = await getBalance();
	// format balance
	customerBalance.textContent = `${balance} CELO`;

	const orders = await getOrders();
	if (orders.length === 0) {
		orderItems.innerHTML = '<p>No orders available</p>';
		return;
	}

	orderItems.innerHTML = '';
	for (let order of orders) {
		const orderHTML = `
     <div class="order-item">
						<img src="./assets/img/${order.image}" alt="${order.coffeeName}" />
						<div class="order-details">
							<h3>${order.coffeeName}</h3>
							<p>Order ID: 00${orders.indexOf(order)}</p>
							<p>Price: ${order.price / order.quantity}</p>
							<p>Quantity: ${order.quantity}</p>
							<p>Total: ${order.price}</p>
						</div>
					</div>`;
		orderItems.innerHTML += orderHTML;
	}
}

renderOrders();
