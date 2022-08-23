
const LOCATORS = {
    BUTTONS: {
        HEADER: {
            LOGIN_PAGE: "#header a[class=login]"
        }
    },
    HEADERS: {
        MAIN: {
            TITLE: "#center_column > h1"
        }
    }
}

const click = (cy, lctr) => {
    cy.get(lctr).click();
}

const isElementExist = (cy, lctr) => {
    cy.get(lctr).should('exist');
}

const selectFromMenuByValue = (cy, lctr, value) => {
    cy.get(lctr).select(value);
}

const selectFromMenuByText = (cy, lctr, text) => {
    cy.get(lctr).select(text);
}

const enterText = (cy, lctr, text) => {
    console.log(cy, lctr, text);
    cy.get(lctr).clear();
    cy.get(lctr).type(text);
}

const addText = (cy, lctr, text) => {
    cy.get(lctr).type(text);
}

const getContentText = (cy, lctr, invoker, callback) => {
    cy.get(lctr).invoke(invoker).then(text => callback(text.trim()));
}

const getMultiContentText = (cy, lctrs, callback) => {
    let rsString = "{";
    let counter = 0, length = Object.keys(lctrs).length;
    Object.keys(lctrs).forEach(key => {
        getContentText(cy, lctrs[key].element, lctrs[key].invoker, (text) => {
            counter++;
            if (rsString.length > 1) rsString += ", ";
            rsString += `"${key}": "${text}"`;
            if (counter == length - 1) {
                rsString += "}";
                callback(JSON.parse(rsString));
            }
        });
    });
}

const printContentText = (cy, lctr, invoker) => {
    getContentText(cy, lctr, invoker, (text) => console.log(text));
}

const waitUntillNotExist = (cy, timeOfSecs, lctr) => {
    cy.get(lctr, { timeout: timeOfSecs * 1000 }).should('not.exist');
}

const waitUntilPrecenseOf = (cy, timeOfSecs, lctr) => {
    cy.get(lctr, { timeout: timeOfSecs * 1000 }).should('be.visible');
}

export default {
    LOCATORS,
    click, isElementExist,
    selectFromMenuByValue, selectFromMenuByText,
    enterText, addText, printContentText, getContentText,
    waitUntillNotExist, waitUntilPrecenseOf, getMultiContentText
}