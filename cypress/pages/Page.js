export default class Page {
    constructor(url = '/') {
        this.url = url;
    }

    visit() {
        cy.wait(1000);
        cy.visit(this.url);
    }

    login() {
        cy.task('TakeScreenShot', {
            root: Cypress.config('baseUrl')
        }).then(value => {
            console.log(value);
        })
    }
}