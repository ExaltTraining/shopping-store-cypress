import mainData from "../../fixtures/mainData.json";
import AppHelper from "../AppHelper";
import ProductsHelper from "../products/ProductsHelper";

const LOCATORS = {
    MAIN: {
        SUMMERY: {
            PRODUCTS: {
                LIST: "#cart_summary > tbody",
                ITEMS_LIST: "#cart_summary > tbody > tr",
                PRODUCT: {
                    ELEMENT: (index) => LOCATORS.MAIN.SUMMERY.PRODUCTS.LIST + " > tr:nth-child(" + index + ")",
                    NAME: (index) => LOCATORS.MAIN.SUMMERY.PRODUCTS.PRODUCT.ELEMENT(index) + " .product-name a",
                    PRICE: (index) => LOCATORS.MAIN.SUMMERY.PRODUCTS.PRODUCT.ELEMENT(index) + " .cart_unit span.price span.price",
                    QUANTITY: (index) => LOCATORS.MAIN.SUMMERY.PRODUCTS.PRODUCT.ELEMENT(index) + " td.cart_quantity input:nth-child(1)",
                    TOTAL_PRICE: (index) => LOCATORS.MAIN.SUMMERY.PRODUCTS.PRODUCT.ELEMENT(index) + " .cart_total .price",
                    DELETE: (index) => LOCATORS.MAIN.SUMMERY.PRODUCTS.PRODUCT.ELEMENT(index) + " .cart_delete a.cart_quantity_delete"
                }
            },
            TOTAL: {
                PRODUCTS: "#total_product",
                SHIPPING: "#total_shipping",
                WITHOUT_TAX: "#total_price_without_tax",
                TAX: "#total_tax",
                ALL: "#total_price"
            },
            CONTINUE: ".cart_navigation a.standard-checkout"
        },
        SIGNIN: {
            EMAIL: "#email",
            PASSWORD: "#passwd",
            CONTINUE: "button#SubmitLogin"
        },
        ADDRESS: {
            CONTINUE: ".cart_navigation button.btn-default"
        },
        SHIPPING: {
            CHECK_POLICY_AGREENMENT: "#cgv",
            CONTINUE: "#cart_navigation button.standard-checkout"
        },
        PAYMENT: {
            PAYMENT_METHOD: {
                PAY_BY_CHECK: "#HOOK_PAYMENT div.row:nth-child(2) a.cheque"
            },
            TOTAL: {
                ALL: "#total_price"
            },
            CONTINUE: "form .cart_navigation button.btn-default"
        },
        LOADING: "#center_column ul.product_list > p"
    },
    ALERT: {
        ORDER: {
            MESSAGE: {
                COMPLETE: "Your order on My Store is complete."
            },
            ELEMENT: {
                COMPLETE: "#center_column p.alert-success"
            }
        }
    }
}

const defaultCartSignin = (cy) => {
    ProductsHelper.login(cy, LOCATORS.MAIN.SIGNIN.EMAIL, mainData.MAIN_ACCOUNT.EMAIL,
        LOCATORS.MAIN.SIGNIN.PASSWORD, mainData.MAIN_ACCOUNT.PASSWORD, LOCATORS.MAIN.SIGNIN.CONTINUE);
}

const getPriceValue = (cy, lctr, callback) => {
    AppHelper.getContentText(cy, lctr, "text", (value) => callback(value.replace("$", "").trim()));
}

const checkSummation = (cy, expectedCart, callback) => {
    const valuesLctrs = {
        name: { element: ".product-name a", invoker: "text" },
        unitPrice: { element: ".cart_unit span.price span.price", invoker: "text" },
        quantity: { element: "td.cart_quantity input:nth-child(1)", invoker: "val" },
        unitsPrice: { element: ".cart_total .price", invoker: "text" }
    };

    let length = expectedCart.productsList.length, counter = 0, found = true;
    cy.get(LOCATORS.MAIN.SUMMERY.PRODUCTS.ITEMS_LIST).each((e) => cy.wrap(e).within(() => {
        counter++;
        AppHelper.getMultiContentText(cy, valuesLctrs, (rs) => {
            for (const product in expectedCart.productsList) {
                Object.keys(rs).forEach(key => found &= (expectedCart.productsList[product][key] == rs[key]));
                if (found) break;
                found = true;
            }
            if ((counter == length - 1) && !found)
                callback("Name not found" + " " + rs["name"], false);
        });
    }));
    getPriceValue(cy, LOCATORS.MAIN.SUMMERY.TOTAL.PRODUCTS, (rs) => expectedCart.totalProducts == rs ? "" : callback("totalProducts", false));
    getPriceValue(cy, LOCATORS.MAIN.SUMMERY.TOTAL.SHIPPING, (rs) => expectedCart.totalShipping == rs ? "" : callback("totalShipping", false));
    getPriceValue(cy, LOCATORS.MAIN.SUMMERY.TOTAL.WITHOUT_TAX, (rs) => expectedCart.totalNoTax == rs ? "" : callback("totalNoTax", false));
    getPriceValue(cy, LOCATORS.MAIN.SUMMERY.TOTAL.TAX, (rs) => expectedCart.totalTax == rs ? "" : callback("totalTax", false));
    getPriceValue(cy, LOCATORS.MAIN.SUMMERY.TOTAL.ALL, (rs) => expectedCart.total == rs ? "" : callback("total", false));
}

export default {
    LOCATORS, defaultCartSignin,
    getPriceValue, checkSummation
}