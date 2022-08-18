
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
    console.log(cy.get(lctr));
}

const selectFromMenuByValue = (cy, lctr, value) => {

}

const selectFromMenuByText = (cy, lctr, text) => {

}

const enterText = (cy, lctr, text) => {
    console.log(cy, lctr, text);
    cy.get(lctr).clear();
    cy.get(lctr).type(text);
}

const addText = (cy, lctr, text) => {
    cy.get(lctr).type(text);
}

export default {
    LOCATORS,
    click, isElementExist,
    selectFromMenuByValue, selectFromMenuByText,
    enterText, addText
}