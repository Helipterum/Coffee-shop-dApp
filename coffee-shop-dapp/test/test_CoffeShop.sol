// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "../contracts/CoffeShop.sol";

contract TestCoffeeShop {
    CoffeeShop coffeeShop;

    function beforeEach() public {
        coffeeShop = new CoffeeShop();
    }

    function testOrderCoffee() public {
        string memory coffeeName = "Espresso";
        uint256 price = 100;
        uint256 quantity = 2;

        coffeeShop.orderCoffee{value: price * quantity}(
            addressToString(msg.sender),
            coffeeName,
            price,
            quantity
        );

        uint256 expectedOrdersCount = 1;
        Assert.equal(
            coffeeShop.getOrdersCount(),
            expectedOrdersCount,
            "Incorrect orders count"
        );

        (
            address customer,
            string memory orderedCoffeeName,
            uint256 orderedPrice,
            uint256 orderedQuantity
        ) = coffeeShop.getOrder(0);
        Assert.equal(customer, address(this), "Incorrect customer address");
        Assert.equal(orderedCoffeeName, coffeeName, "Incorrect coffee name");
        Assert.equal(orderedPrice, price, "Incorrect price");
        Assert.equal(orderedQuantity, quantity, "Incorrect quantity");
    }

    function testWithdrawFunds() public {
        uint256 initialBalance = address(this).balance;

        coffeeShop.orderCoffee{value: 100}("Espresso", 100, 1);
        coffeeShop.orderCoffee{value: 200}("Latte", 200, 2);

        uint256 expectedBalance = initialBalance + 300;
        Assert.equal(
            coffeeShop.getBalance(),
            expectedBalance,
            "Incorrect contract balance"
        );

        coffeeShop.withdrawFunds();

        expectedBalance = initialBalance;
        Assert.equal(
            coffeeShop.getBalance(),
            expectedBalance,
            "Incorrect contract balance"
        );
    }

    function testChangeOwner() public {
        address newOwner = address(0x123);

        coffeeShop.changeOwner(newOwner);

        Assert.equal(
            coffeeShop.getContractOwner(),
            newOwner,
            "Incorrect contract owner"
        );
    }
}
