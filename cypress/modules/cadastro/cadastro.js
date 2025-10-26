import { faker } from "@faker-js/faker";

class Cadastro {
  preencherFormularioCadastro() {
    cy.get("#id_gender2").click();
    cy.get('input[data-qa="password"]').type("123456", { log: false });
    cy.get('select[data-qa="days"]').select("20");
    cy.get('select[data-qa="months"]').select("March");
    cy.get('select[data-qa="years"]').select("2021");
    cy.get("input[type=checkbox]#newsletter").check();
    cy.get("input[type=checkbox]#optin").check();
    cy.get("input#first_name").type(faker.person.firstName());
    cy.get("input#last_name").type(faker.person.lastName());
    cy.get("input#company").type(`PGATS ${faker.company.name()}`);
    cy.get("input#address1").type(faker.location.streetAddress());
    cy.get("input#address2").type(faker.number.hex());
    cy.get('select[data-qa="country"]').select("India");
    cy.get('input[data-qa="state"]').type(faker.location.state());
    cy.get('[data-qa="city"]').type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]').type("5511970707070");
    cy.get('[data-qa="create-account"]').click();
  }
}

export default new Cadastro();
