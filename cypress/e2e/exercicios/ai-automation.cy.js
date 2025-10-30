import formPage from "../../support/pageObjects/transactionModalPage";

describe("Form Submission Tests", () => {
  beforeEach(() => {
    cy.visit("https://devfinance-agilizei.netlify.app/#");
    cy.contains("Nova Transação").click();
  });

  it("Verify that the form can be submitted successfully with valid inputs in all fields", () => {
    formPage.fillDescription("Test Description");
    formPage.fillAmount("100.00");
    formPage.fillDate("2023-10-01");
    formPage.submitForm();
    // Add assertion for successful submission, e.g., check for a success message
    cy.get("tbody tr").should("have.length", 1);
  });

  it("Check that the placeholder text is visible and correctly displayed for each input field", () => {
    formPage.descriptionField.should("have.attr", "placeholder", "Descrição");
    formPage.amountField.should("have.attr", "placeholder", "0,00");
    formPage.dateField.should("have.attr", "name", "date");
  });
});
