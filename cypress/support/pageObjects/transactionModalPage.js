class FormPage {
  get descriptionField() {
    return cy.get("#description");
  }

  get amountField() {
    return cy.get("#amount");
  }

  get dateField() {
    return cy.get("#date");
  }

  get saveButton() {
    return cy.get("button").contains("Salvar");
  }

  get cancelButton() {
    return cy.get("a.button.cancel");
  }

  get helpText() {
    return cy.get(".help");
  }

  fillDescription(description) {
    this.descriptionField.type(description);
  }

  fillAmount(amount) {
    this.amountField.type(amount);
  }

  fillDate(date) {
    this.dateField.type(date);
  }

  submitForm() {
    this.saveButton.click();
  }

  cancelForm() {
    this.cancelButton.click();
  }
}

export default new FormPage();
