import AppHelper from "../../support/AppHelper";
import { defaultLogin, invalidLogin, LOCATORS } from "../../support/login/LoginHelper";

describe('testing login', () => {

    beforeEach(() => {
        cy.visit("/");
        AppHelper.click(cy, AppHelper.LOCATORS.BUTTONS.HEADER.LOGIN_PAGE);
    });

    it('login with valid email and password', () => {
        defaultLogin(cy);
        cy.get(LOCATORS.HEADERS.MAIN.TITLE.ELEMENT).should("contain.text", LOCATORS.HEADERS.MAIN.TITLE.MESSAGE);
    });

    it('login with invalid email and password', () => {
        invalidLogin(cy);
        cy.get(LOCATORS.ALERT.INVALID_EMAIL.ELEMENT).should("contain.text", LOCATORS.ALERT.INVALID_EMAIL.MESSAGE);
    });
});