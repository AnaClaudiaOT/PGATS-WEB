import { faker } from "@faker-js/faker";

class Menu {
  navegarParaLogin() {
    cy.get('a[href="/login"]').click();
  }

  efetuarLogout() {
    cy.get('a[href="/logout"]').should("be.visible").click();
  }

  navegarParaPaginaInicial() {
    cy.visit("https://automationexercise.com");
  }

  scrollParaRodape() {
    cy.scrollTo("bottom");
  }

  preencherAssinatura() {
    cy.get("#susbscribe_email").type(faker.internet.email());
    cy.get("#subscribe").click();
  }
}

export default new Menu();
