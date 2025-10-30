import data from "../../fixtures/example.json";

class Contato {
  navegarParaFaleConosco() {
    cy.get('a[href="/contact_us"]').click();
  }

  preencherFormularioContato() {
    cy.get('[data-qa="name"]').type(data.name);
    cy.get('[data-qa="email"]').type(data.email);
    cy.get('[data-qa="subject"]').type(data.subject);
    cy.get('[data-qa="message"]').type(data.message);
    cy.fixture("example.json").as("arquivo");
    cy.get('[name="upload_file"]').selectFile("@arquivo");
    cy.get('[data-qa="submit-button"]').click();
  }
}

export default new Contato();
