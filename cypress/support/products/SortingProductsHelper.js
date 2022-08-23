import AppHelper from "../AppHelper";
import ProductsHelper from "./ProductsHelper";

const LOCATORS = {
    MAIN: {
        MENU: {
            SORT: {
                ELEMENT: "#selectProductSort",
                OPTION_VALUES: {
                    PRICE_ASC: "price:asc",
                    PRICE_DESC: "price:desc",
                    NAME_ASC: "name:asc",
                    NAME_DESC: "name:desc",
                    QUANTITY_DESC: "quantity:desc",
                    REFERENCE_ASC: "reference:asc", // I didn't find anything about reference to check/test it 
                    REFERENCE_DESC: "reference:desc" // same
                }
            },
        },
    }
}

const checkProductsSortedAsNameAsc = (cy, callback) => {
    let prevValue = "a";
    cy.get(ProductsHelper.LOCATORS.MAIN.LIST.PRODUCTS).each((e) => cy.wrap(e).within(() => {
        AppHelper.getContentText(cy, "a.product-name", "text", (name) => {
            console.log(name.toLowerCase().localeCompare(prevValue.toLowerCase()));
            if (name.toLowerCase().localeCompare(prevValue.toLowerCase()) == -1)
                callback(false);
            prevValue = name;
        });
        callback(true);
    }));
}

const checkProductsSortedAsNameDecs = (cy, callback) => {
    let prevValue = "z";
    cy.get(ProductsHelper.LOCATORS.MAIN.LIST.PRODUCTS).each((e) => cy.wrap(e).within(() => {
        AppHelper.getContentText(cy, "a.product-name", "text", (name) => {
            console.log(name.toLowerCase().localeCompare(prevValue.toLowerCase()));
            if (name.toLowerCase().localeCompare(prevValue.toLowerCase()) == -1)
                callback(false);
            prevValue = name;
        });
        callback(true);
    }));
}

const checkProductsSortedAsPriceAsc = (cy, callback) => {
    let prevValue = -1;
    cy.get(ProductsHelper.LOCATORS.MAIN.LIST.PRODUCTS).each((e) => cy.wrap(e).within(() => {
        AppHelper.getContentText(cy, "div.right-block span.price.product-price", "text", (price) => {
            price = price.trim().replace("$", "");
            console.log(price);
            if (price < prevValue)
                callback(false);
            prevValue = price;
        });
        callback(true);
    }));
}

const checkProductsSortedAsPriceDesc = (cy, callback) => {
    let prevValue = Number.MAX_VALUE;
    cy.get(ProductsHelper.LOCATORS.MAIN.LIST.PRODUCTS).each((e) => cy.wrap(e).within(() => {
        AppHelper.getContentText(cy, "div.right-block span.price.product-price", "text", (price) => {
            price = price.trim().replace("$", "");
            console.log(price);
            if (price > prevValue)
                callback(false);
            prevValue = price;
        });
        callback(true);
    }));
}

const checkOnlyAvailableProductsViewed = (cy) => {
    cy.get(ProductsHelper.LOCATORS.MAIN.LIST.PRODUCTS).each((e) => cy.wrap(e).within(() => {
        cy.get(".product-container .offers .available-now").should("exist");
    }));
}

export default {
    LOCATORS,
    checkProductsSortedAsNameDecs, checkProductsSortedAsPriceAsc,
    checkProductsSortedAsNameAsc, checkProductsSortedAsPriceDesc,
    checkOnlyAvailableProductsViewed
}