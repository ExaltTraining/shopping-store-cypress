import AppHelper from "../../support/AppHelper";
import ProductsHelper from "../../support/products/ProductsHelper";
import SortingProductsHelper from "../../support/products/SortingProductsHelper";

describe('testing products - women category', () => {

    before(() => {
        cy.visit(ProductsHelper.LOCATORS.PATH.CATEGORIES.WOMEN);
    });

    it('Sorting products by name in descending order', () => {
        AppHelper.selectFromMenuByValue(cy, ProductsHelper.LOCATORS.MAIN.MENU.SORT.ELEMENT,
            SortingProductsHelper.LOCATORS.MAIN.MENU.SORT.OPTION_VALUES.NAME_DESC);
        AppHelper.waitUntillNotExist(cy, 20, ProductsHelper.LOCATORS.MAIN.LOADING);
        SortingProductsHelper.checkProductsSortedAsNameDecs(cy, (rs) => expect(rs).to.be.true);
    });

    it('Sorting products by price in ascending order', () => {
        AppHelper.selectFromMenuByValue(cy, ProductsHelper.LOCATORS.MAIN.MENU.SORT.ELEMENT,
            SortingProductsHelper.LOCATORS.MAIN.MENU.SORT.OPTION_VALUES.PRICE_ASC);
        AppHelper.waitUntillNotExist(cy, 20, ProductsHelper.LOCATORS.MAIN.LOADING);
        SortingProductsHelper.checkProductsSortedAsPriceAsc(cy, (rs) => expect(rs).to.be.true);
    });

    it('Sorting products by name in ascending order', () => {
        AppHelper.selectFromMenuByValue(cy, ProductsHelper.LOCATORS.MAIN.MENU.SORT.ELEMENT,
            SortingProductsHelper.LOCATORS.MAIN.MENU.SORT.OPTION_VALUES.NAME_ASC);
        AppHelper.waitUntillNotExist(cy, 20, ProductsHelper.LOCATORS.MAIN.LOADING);
        SortingProductsHelper.checkProductsSortedAsNameAsc(cy, (rs) => expect(rs).to.be.true);
    });

    it('Sorting products by price in descending order', () => {
        AppHelper.selectFromMenuByValue(cy, ProductsHelper.LOCATORS.MAIN.MENU.SORT.ELEMENT,
            SortingProductsHelper.LOCATORS.MAIN.MENU.SORT.OPTION_VALUES.PRICE_DESC);
        AppHelper.waitUntillNotExist(cy, 20, ProductsHelper.LOCATORS.MAIN.LOADING);
        SortingProductsHelper.checkProductsSortedAsPriceDesc(cy, (rs) => expect(rs).to.be.true);
    });

    it('Sorting products by availability', () => {
        AppHelper.selectFromMenuByValue(cy, ProductsHelper.LOCATORS.MAIN.MENU.SORT.ELEMENT,
            SortingProductsHelper.LOCATORS.MAIN.MENU.SORT.OPTION_VALUES.QUANTITY_DESC);
        AppHelper.waitUntillNotExist(cy, 20, ProductsHelper.LOCATORS.MAIN.LOADING);
        SortingProductsHelper.checkOnlyAvailableProductsViewed(cy);
    });

});