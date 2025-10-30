/// <reference types="cypress" />"

import { getRandomEmail } from "../../support/helpers";

import { faker } from "@faker-js/faker";

describe("Validações de usuário", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com");
    cy.get('a[href="/login"]').click();
  });

  it("Cadastrar usuário", () => {
    cy.get('input[data-qa="signup-name"]').type(
      `${faker.person.firstName()} ${faker.person.lastName()}`
    );
    cy.get('input[data-qa="signup-email"]').type(getRandomEmail());
    cy.contains("button", "Signup").click();
    // cy.get("input[type=radio]").check("Mrs");
    cy.get("#id_gender2").click();
    // cy.get("#id_gender2").check();

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
    cy.url("includes", "account_created");
    cy.contains("b", "Account Created!");
  });

  it("Logar com usuário", () => {
    cy.get('[data-qa="login-email"]').type("qatesterpgats.Ward@yahoo.com");
    cy.get('[data-qa="login-password"]').type("123456");
    cy.get('[data-qa="login-button"]').click();
    cy.get("i.fa-user").parent().should("contain", "QA PAGTS ANA");
    cy.get('a[href="/logout"]').should("be.visible");
    cy.get(":nth-child(10) > a")
      .should("be.visible")
      .and("have.text", ` Logged in as QA PAGTS ANA`);
    cy.contains("b", "QA PAGTS ANA");
  });

  it("Logar com senha incorreta", () => {
    cy.get('[data-qa="login-email"]').type("qatesterpgats.Ward@yahoo.com");
    cy.get('[data-qa="login-password"]').type("12345");
    cy.get('[data-qa="login-button"]').click();
    cy.get(".login-form > form > p").should(
      "contain",
      "Your email or password is incorrect!"
    );
  });

  it("Loggout de usuário", () => {
    cy.get('[data-qa="login-email"]').type("qatesterpgats.Ward@yahoo.com");
    cy.get('[data-qa="login-password"]').type("123456");
    cy.get('[data-qa="login-button"]').click();
    cy.get("i.fa-user").parent().should("contain", "QA PAGTS ANA");
    cy.get('a[href="/logout"]').should("be.visible").click();
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
