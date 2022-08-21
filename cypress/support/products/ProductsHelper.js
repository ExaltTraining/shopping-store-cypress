import mainData from "../../fixtures/mainData.json";
import AppHelper from "../AppHelper";

const LOCATORS = {
    MAIN: {
        VIEW: {
            GRID: "ul.display #grid a",
            LIST: "ul.display #list a"
        },
        MENU: {
            SORT: {
                ELEMENT: "#selectProductSort",
                OPTION_VALUES: {
                    PRICE_ASC: "price:asc",
                    NAME_DESC: "name:desc"
                }
            }
        },
        LIST: {
            PRODUCTS_LIST: "#center_column ul.product_list",
            PRODUCTS: "#center_column ul.product_list > li",
            PRODUCTS_NUMBER: "#center_column .top-pagination-content .product-count",
            PRODUCT: {
                ELEMENT: (index) => LOCATORS.MAIN.LIST.PRODUCTS_LIST + " > li:nth-child(" + index + ")",
                NAME: (index) => LOCATORS.MAIN.LIST.PRODUCT.ELEMENT(index) + " a.product-name",
                PRICE: (index) => LOCATORS.MAIN.LIST.PRODUCT.ELEMENT(index) + " div.right-block span.product-price",
                ADD_TO_CART: (index) => LOCATORS.MAIN.LIST.PRODUCT.ELEMENT(index) + " a.ajax_add_to_cart_button",
            }
        },
        LOADING: "#center_column ul.product_list > p"
    },
    CATALOG: {
        COLORS: {
            YELLOW: "#layered_id_attribute_group_16"
        },
        COMPOSITIONS: {
            COTTON: "#layered_id_feature_5"
        },
        CONDITION: {
            NEW: "#layered_condition_new"
        },
        PRICE: {
            RANGE: "#layered_price_range",
            MIN_SLIDER: "#layered_price_slider > a:nth-child(2)",
            MAX_SLIDER: "#layered_price_slider > a:nth-child(3)"
        },
        AVAILABILITY: {
            IN_STOCK: "#layered_quantity_1"
        },
        PROPERTIES: {
            SHORT_SLEEVE: "#layered_id_feature_17"
        }
    },
    BUTTONS: {
        MAIN: {
            LOGIN: "#SubmitLogin"
        }
    },
    HEADERS: {
        MAIN: {
            TITLE: {
                ELEMENT: "#center_column > h1",
                MESSAGE: "My account"
            }
        }
    },
    ALERT: {
        INVALID_EMAIL: {
            ELEMENT: "#center_column ol > li",
            MESSAGE: "Invalid email address."
        }
    }
}

const login = (cy, email, password) => {
    AppHelper.enterText(cy, LOCATORS.ACCOUNT.EMAIL, email);
    AppHelper.enterText(cy, LOCATORS.ACCOUNT.PASSWORD, password);
    AppHelper.click(cy, LOCATORS.BUTTONS.MAIN.LOGIN);
}

const defaultLogin = (cy) => {
    login(cy, mainData.MAIN_ACCOUNT.EMAIL, mainData.MAIN_ACCOUNT.PASSWORD);
}

const invalidLogin = (cy) => {
    login(cy, "invalidAccount@website", "qq");
}

const getView = (cy, callback) => {
    cy.get(LOCATORS.MAIN.LIST.PRODUCTS_LIST).invoke("attr", "class").then(classes => {
        console.log(classes);
        callback(classes.replace("row", "").replace("product_list", "").trim().toLowerCase())
    });
}

const setView = (cy, type) => {
    AppHelper.click(cy, type);
}

const getMinPriceValue = (cy, callback) => {
    AppHelper.getContentText(cy, LOCATORS.CATALOG.PRICE.RANGE, (value) => callback(value.split("-")[0].replace("$", "").trim()));
}

const getMaxPriceValue = (cy, callback) => {
    AppHelper.getContentText(cy, LOCATORS.CATALOG.PRICE.RANGE, (value) => callback(value.split("-")[1].replace("$", "").trim()));
}

const getNumberOfProducts = (cy, callback) => {
    AppHelper.getContentText(cy, LOCATORS.MAIN.LIST.PRODUCTS_NUMBER, (text) => callback(text.split(" ")[5].trim()));
}

const setMaxPrice = (cy, maxValue) => {
    getMaxPriceValue(cy, (cMax) => {
        getMinPriceValue(cy, (cMin) => {
            let steps = Math.abs(cMax - maxValue) / ((cMax - cMin) / 100);
            cy.get(LOCATORS.CATALOG.PRICE.MAX_SLIDER).focus().type("{leftarrow}".repeat(steps));
        });
    });
}

const checkProductsSortedAsNameDecs = (cy, callback) => {
    let prevValue = "z";
    cy.get(LOCATORS.MAIN.LIST.PRODUCTS).each((e) => cy.wrap(e).within(() => {
        AppHelper.getContentText(cy, "a.product-name", (name) => {
            if (name.toLowerCase().localeCompare(prevValue.toLowerCase()) == -1)
                callback(false);
            prevValue = name;
        });
        callback(true);
    }));
}

const checkProductsSortedAsPriceAsc = (cy, callback) => {
    let prevValue = -1;
    cy.get(LOCATORS.MAIN.LIST.PRODUCTS).each((e) => cy.wrap(e).within(() => {
        AppHelper.getContentText(cy, "div.right-block span.price.product-price", (price) => {
            price = price.trim().replace("$", "");
            console.log(price);
            if (price < prevValue)
                callback(false);
            prevValue = price;
        });
        callback(true);
    }));
}

const checkProductsShallBe = (cy, expectedList, callback) => {
    cy.get(LOCATORS.MAIN.LIST.PRODUCTS).each((e) => cy.wrap(e).within(() => {
        AppHelper.getContentText(cy, "a.product-name", (name) => {
            let found = false;
            expectedList.forEach(expectedName => {
                if (expectedName.toLowerCase() === name.toLowerCase()) { found = true; return; }
            });
            if (!found)
                callback(false);
        });
        callback(true);
    }));
}

export default {
    LOCATORS, login, defaultLogin, invalidLogin, getView, setView,
    getMinPriceValue, getMaxPriceValue, getNumberOfProducts,
    checkProductsSortedAsNameDecs, checkProductsSortedAsPriceAsc, checkProductsShallBe,
    setMaxPrice
}