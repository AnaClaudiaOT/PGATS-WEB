import { faker } from "@faker-js/faker";

class Produtos {
  navegarParaProdutos() {
    cy.get('a[href="/products"]').click();
  }

  visualizarProduto() {
    cy.get('a[href="/product_details/1"]').click();
  }

  pesquisarProdutos(produto) {
    cy.get('[name="search"]').type(produto);
    cy.get("#submit_search > .fa").click();
  }

  adicionarProduto() {
    cy.get(
      ":nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn"
    ).click();
  }

  navegarParaCarrinho() {
    cy.get("u").contains("View Cart").click();
  }

  fazerCheckout() {
    cy.get(".btn.btn-default.check_out").click();
  }

  preencherFormularioPagamento() {
    cy.get('a[href="/payment"]').click();
    cy.get('[data-qa="name-on-card"]').type(faker.person.firstName());
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber());
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV());
    cy.get('[data-qa="expiry-month"]').type(
      faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0")
    );
    cy.get('[data-qa="expiry-year"]').type(
      faker.number.int({ min: 2025, max: 2035 }).toString()
    );
    cy.get('[data-qa="pay-button"]').click();
  }
}

export default new Produtos();
