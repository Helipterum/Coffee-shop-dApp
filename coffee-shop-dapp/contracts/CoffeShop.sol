// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract CoffeeShop {
    uint public totalFunds;

    receive() external payable {
        totalFunds += msg.value;
    }

    function withdrawFunds() public {
        payable(msg.sender).transfer(totalFunds);
        totalFunds = 0;
    }

    function getBalance() public view returns (uint) {
        return totalFunds;
    }

    // get user balance
    function getUserBalance() public view returns (uint) {
        return msg.sender.balance;
    }

    struct Order {
        address customer;
        string coffeeName;
        string image;
        uint price;
        uint quantity;
    }

    Order[] public orders;

    function orderCoffee(
        string memory coffeeName,
        string memory image,
        uint price,
        uint quantity
    ) public payable {
        require(msg.value == price, "Incorrect payment amount");

        Order memory order = Order(
            msg.sender,
            coffeeName,
            image,
            price,
            quantity
        );
        orders.push(order);

        // use the recieve method to store the payment
        totalFunds += msg.value;
    }

    function getOrdersCount() public view returns (uint) {
        return orders.length;
    }

    // get orders
    function getOrders() public view returns (Order[] memory) {
        return orders;
    }
}
