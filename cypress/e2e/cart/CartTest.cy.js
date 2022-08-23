import AppHelper from "../../support/AppHelper";
import CartHelper from "../../support/cart/CartHelper";
import ProductsHelper from "../../support/products/ProductsHelper";

describe('testing adding products to cart', () => {

    before(() => {
        cy.visit(ProductsHelper.LOCATORS.PATH.CATEGORIES.WOMEN);
    });

    it('Validating summation of the products in cart checkout', () => {
        ProductsHelper.addProductToCart(cy, 1, ProductsHelper.LOCATORS.PRODUCT_ADDED_CART_LAYER.AND_DO.CONTINUE_SHOPPING);
        ProductsHelper.addProductToCart(cy, 1, ProductsHelper.LOCATORS.PRODUCT_ADDED_CART_LAYER.AND_DO.CONTINUE_SHOPPING);
        ProductsHelper.addProductToCart(cy, 1, ProductsHelper.LOCATORS.PRODUCT_ADDED_CART_LAYER.AND_DO.CONTINUE_SHOPPING);
        ProductsHelper.addProductToCart(cy, 2, ProductsHelper.LOCATORS.PRODUCT_ADDED_CART_LAYER.AND_DO.CONTINUE_SHOPPING);
        ProductsHelper.addProductToCart(cy, 3, ProductsHelper.LOCATORS.PRODUCT_ADDED_CART_LAYER.AND_DO.CONTINUE_SHOPPING);
        ProductsHelper.addProductToCart(cy, 3, ProductsHelper.LOCATORS.PRODUCT_ADDED_CART_LAYER.AND_DO.CONTINUE_SHOPPING);

        ProductsHelper.goToCart(cy);
        const expectedCart = {
            totalProducts: 128.53,
            totalShipping: 2,
            totalNoTax: 130.53,
            totalTax: 0,
            total: 130.53,
            productsList: [
                {
                    name: "Faded Short Sleeve T-shirts",
                    unitPrice: "$16.51",
                    quantity: "3",
                    unitsPrice: "$49.53"
                },
                {
                    name: "Blouse",
                    unitPrice: "$27.00",
                    quantity: "1",
                    unitsPrice: "$27.00"
                },
                {
                    name: "Printed Dress",
                    unitPrice: "$26.00",
                    quantity: "2",
                    unitsPrice: "$52.00"
                }
            ]
        };
        CartHelper.checkSummation(cy, expectedCart, (msg, rs) => console.log(msg, rs));
    });

    it('Validating removing a product from the cart', () => {
        cy.get(ProductsHelper.LOCATORS.BUTTONS.MAIN.CART).trigger('mouseover').then(() => {
            AppHelper.click(cy, ProductsHelper.LOCATORS.MAIN.MENU.CART.CART_ITEM.DELETE(2));
            ProductsHelper.goToCart(cy);
            const expectedCart = {
                totalProducts: 101.53,
                totalShipping: 2,
                totalNoTax: 103.53,
                totalTax: 0,
                total: 103.53,
                productsList: [
                    {
                        name: "Faded Short Sleeve T-shirts",
                        unitPrice: "$16.51",
                        quantity: "3",
                        unitsPrice: "$49.53"
                    },
                    {
                        name: "Printed Dress",
                        unitPrice: "$26.00",
                        quantity: "2",
                        unitsPrice: "$52.00"
                    }
                ]
            };
            CartHelper.checkSummation(cy, expectedCart, (msg, rs) => console.log(msg, rs));
        });
    });
});