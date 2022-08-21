
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

const getContentText = (cy, lctr, callback) => {
    cy.get(lctr).invoke("text").then(text => callback(text.trim()));
}

const printContentText = (cy, lctr) => {
    getContentText(cy, lctr, (text) => console.log(text));
}

const waitUntillNotExist = (cy, secs, lctr) => {
    cy.get(lctr, { timeout: secs * 1000 }).should('not.exist');
}

export default {
    LOCATORS,
    click, isElementExist,
    selectFromMenuByValue, selectFromMenuByText,
    enterText, addText, printContentText, getContentText,
    waitUntillNotExist
}