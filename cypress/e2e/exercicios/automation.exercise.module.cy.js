/// <reference types="cypress" />"
import data from "../../fixtures/example.json";
import menu from "../../modules/menu/menu";
import login from "../../modules/login/login";
import cadastro from "../../modules/cadastro/cadastro";

describe("Validações de usuário", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com");
    menu.navegarParaLogin();
  });

  it("Cadastrar usuário", () => {
    login.preencherFormularioPreCadastro();
    cadastro.preencherFormularioCadastro();
    cy.url("includes", "account_created");
    cy.contains("b", "Account Created!");
  });

  it("Logar com usuário", () => {
    login.preencherFormularioDeLogin(data.user, data.password);
    cy.get("i.fa-user").parent().should("contain", data.name);
    cy.get('a[href="/logout"]').should("be.visible");
    cy.get(":nth-child(10) > a")
      .should("be.visible")
      .and("have.text", ` Logged in as ${data.name}`);
    cy.contains("b", data.name);
  });

  it("Logar com senha incorreta", () => {
    login.preencherFormularioDeLogin(data.user, "54321");
    cy.get('[data-qa="login-button"]').click();
    cy.get(".login-form > form > p").should(
      "contain",
      "Your email or password is incorrect!"
    );
  });

  it("Loggout de usuário", () => {
    login.preencherFormularioDeLogin(data.user, data.password);
    cy.get("i.fa-user").parent().should("contain", data.name);
    menu.efetuarLogout();
    cy.url().should("contain", "login");
  });

  it("Logar com email existente", () => {
    cy.get('input[data-qa="signup-name"]').type("QA PAGTS ANA");
    cy.get('input[data-qa="signup-email"]').type(
      "qatesterpgats.Ward@yahoo.com"
    );
    cy.contains("button", "Signup").click();
    cy.get(".signup-form > form > p").should(
      "contain",
      "Email Address already exist!"
    );
  });
});
