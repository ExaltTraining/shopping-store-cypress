import AppHelper from "../../support/AppHelper";
import ProductsHelper from "../../support/products/ProductsHelper";

describe('testing products - women category', () => {

    beforeEach(() => {
        cy.visit(ProductsHelper.LOCATORS.PATH.CATEGORIES.WOMEN);
    });

    it('Validating setting the view of the products list', () => {
        ProductsHelper.setView(cy, ProductsHelper.LOCATORS.MAIN.VIEW.LIST);
        ProductsHelper.getView(cy, (rs) => expect(rs).to.equal("list"));
        AppHelper.isElementExist(cy, ProductsHelper.LOCATORS.MAIN.LIST.PRODUCT.NAME(1));
        AppHelper.isElementExist(cy, ProductsHelper.LOCATORS.MAIN.LIST.PRODUCT.PRICE(1));
        AppHelper.isElementExist(cy, ProductsHelper.LOCATORS.MAIN.LIST.PRODUCT.ADD_TO_CART(1));
    });

    it('Sorting products by name in descending order', () => {
        AppHelper.selectFromMenuByValue(cy, ProductsHelper.LOCATORS.MAIN.MENU.SORT.ELEMENT,
            ProductsHelper.LOCATORS.MAIN.MENU.SORT.OPTION_VALUES.NAME_DESC);
        AppHelper.waitUntillNotExist(cy, 20, ProductsHelper.LOCATORS.MAIN.LOADING);
        ProductsHelper.checkProductsSortedAsNameDecs(cy, (rs) => expect(rs).to.be.true);
    });

    it('Sorting products by price in ascending order', () => {
        AppHelper.selectFromMenuByValue(cy, ProductsHelper.LOCATORS.MAIN.MENU.SORT.ELEMENT,
            ProductsHelper.LOCATORS.MAIN.MENU.SORT.OPTION_VALUES.PRICE_ASC);
        AppHelper.waitUntillNotExist(cy, 20, ProductsHelper.LOCATORS.MAIN.LOADING);
        ProductsHelper.checkProductsSortedAsPriceAsc(cy, (rs) => expect(rs).to.be.true);
    });

    it('Check in stock availability products filter', () => {
        AppHelper.click(cy, ProductsHelper.LOCATORS.CATALOG.AVAILABILITY.IN_STOCK);
        AppHelper.waitUntillNotExist(cy, 20, ProductsHelper.LOCATORS.MAIN.LOADING);
        cy.get(ProductsHelper.LOCATORS.MAIN.LIST.PRODUCTS).should("have.length", 7);
    });

    it('Validating (cotton, new, short sleeve, and max price 20$) filters', () => {
        AppHelper.click(cy, ProductsHelper.LOCATORS.CATALOG.COMPOSITIONS.COTTON);
        AppHelper.click(cy, ProductsHelper.LOCATORS.CATALOG.PROPERTIES.SHORT_SLEEVE);
        AppHelper.click(cy, ProductsHelper.LOCATORS.CATALOG.CONDITION.NEW);
        // using setMaxPrice overload the website and it won't responed anymore???
        ProductsHelper.setMaxPrice(cy, 20);
        AppHelper.waitUntillNotExist(cy, 20, ProductsHelper.LOCATORS.MAIN.LOADING);
        cy.get(ProductsHelper.LOCATORS.MAIN.LIST.PRODUCTS).should("have.lengthOf", 1);
        const expectedList = ["Faded Short Sleeve T-shirts"];
        ProductsHelper.checkProductsShallBe(cy, expectedList, (rs) => expect(rs).to.be.true);
    });

});