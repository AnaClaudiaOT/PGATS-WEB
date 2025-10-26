import data from "../fixtures/example.json";

describe("Formulário Contact us", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com");
    cy.get('a[href="/contact_us"]').should("be.visible").click();
  });

  it("Preenchimento formulário", () => {
    cy.get('[data-qa="name"]').type(data.name);
    cy.get('[data-qa="email"]').type(data.email);
    cy.get('[data-qa="subject"]').type(data.subject);
    cy.get('[data-qa="message"]').type(data.message);
    cy.fixture("example.json").as("arquivo");
    cy.get('[name="upload_file"]').selectFile("@arquivo");
    cy.get('[data-qa="submit-button"]').click();
    cy.get(".status").should("be.visible");
    cy.get(".status").should(
      "have.text",
      "Success! Your details have been submitted successfully."
    );
  });
});
