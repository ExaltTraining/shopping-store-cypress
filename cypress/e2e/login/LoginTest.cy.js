import AppHelper from "../../support/AppHelper";
import { defaultLogin, invalidLogin, LOCATORS } from "../../support/login/LoginHelper";

describe('testing login', () => {
    it('login with valid email and password', () => {
        cy.visit("/");
        AppHelper.click(cy, AppHelper.LOCATORS.BUTTONS.HEADER.LOGIN_PAGE);
        defaultLogin(cy);
        cy.get(LOCATORS.HEADERS.MAIN.TITLE).should("contain.text", "My account");
    });

    it.only('login with invalid email and password', () => {
        cy.visit("/");
        AppHelper.click(cy, AppHelper.LOCATORS.BUTTONS.HEADER.LOGIN_PAGE);
        invalidLogin(cy);
        cy.get("#center_column ol > li").should("contain.text", "Invalid email address.");
    });
});