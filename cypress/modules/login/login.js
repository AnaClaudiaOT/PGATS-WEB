import { faker } from "@faker-js/faker";
import { getRandomEmail } from "../../support/helpers";

class Login {
  preencherFormularioPreCadastro() {
    cy.get('input[data-qa="signup-name"]').type(
      `${faker.person.firstName()} ${faker.person.lastName()}`
    );
    cy.get('input[data-qa="signup-email"]').type(getRandomEmail());
    cy.contains("button", "Signup").click();
  }

  preencherFormularioDeLogin(user, pass) {
    cy.get('[data-qa="login-email"]').type(user);
    cy.get('[data-qa="login-password"]').type(pass);
    cy.get('[data-qa="login-button"]').click();
  }
}

export default new Login();
