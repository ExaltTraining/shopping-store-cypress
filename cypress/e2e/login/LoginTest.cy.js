import { defaultLogin, LOCATORS } from "../../support/login/LoginHelper";

describe('training', () => {
    it('test1', () => {

        cy.visit("/");
        cy.get("#header a[class=login]").click();

        defaultLogin(cy);

        cy.get(LOCATORS.HEADERS.MAIN.TITLE).should("contain.text", "My account");
    });
});