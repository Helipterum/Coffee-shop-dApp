const CoffeeShop = artifacts.require('CoffeeShop');

module.exports = function (deployer) {
	deployer.deploy(CoffeeShop);
};
