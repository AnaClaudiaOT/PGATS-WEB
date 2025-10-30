/// <reference types="cypress" />"
import data from "../../fixtures/example.json";
import menu from "../../modules/menu/menu";
import login from "../../modules/login/login";
import cadastro from "../../modules/cadastro/cadastro";
import contato from "../../modules/contato/contato";
import produtos from "../../modules/produtos/produtos";

describe("Validações de usuário", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com");
    menu.navegarParaLogin();
  });

  it("Test Case 1 - Cadastrar usuário", () => {
    login.preencherFormularioPreCadastro();
    cadastro.preencherFormularioCadastro();
    cy.url().should("contain", "account_created");
    cy.contains("b", "Account Created!");
  });

  it("Test Case 2 - Logar com usuário", () => {
    login.preencherFormularioDeLogin(data.user, data.password);
    cy.get("i.fa-user").parent().should("contain", data.name);
    cy.get('a[href="/logout"]').should("be.visible");
    cy.get(":nth-child(10) > a")
      .should("be.visible")
      .and("have.text", ` Logged in as ${data.name}`);
    cy.contains("b", data.name);
  });

  it("Test Case 3 - Logar com senha incorreta", () => {
    login.preencherFormularioDeLogin(data.user, "54321");
    cy.get('[data-qa="login-button"]').click();
    cy.get(".login-form > form > p").should(
      "contain",
      "Your email or password is incorrect!"
    );
  });

  it("Test Case 4 - Loggout de usuário", () => {
    login.preencherFormularioDeLogin(data.user, data.password);
    cy.get("i.fa-user").parent().should("contain", data.name);
    menu.efetuarLogout();
    cy.url().should("contain", "login");
  });

  it("Test Case 5 - Logar com email existente", () => {
    cy.get('input[data-qa="signup-name"]').type("QA PAGTS ANA");
    cy.get('input[data-qa="signup-email"]').type(
      "qatesterpgats_Heidenreich78@yahoo.com"
    );
    cy.contains("button", "Signup").click();
    cy.get(".signup-form > form > p").should(
      "contain",
      "Email Address already exist!"
    );
  });

  it("Test Case 6 - Formulário de Contato", () => {
    menu.navegarParaPaginaInicial();
    cy.contains("Full-Fledged practice website for Automation Engineers");

    contato.navegarParaFaleConosco();

    cy.get(".contact-form").should("be.visible").contains("Get In Touch");

    contato.preencherFormularioContato();
    cy.get(".status").should("be.visible");
    cy.get(".status").should(
      "have.text",
      "Success! Your details have been submitted successfully."
    );

    menu.navegarParaPaginaInicial();
    cy.contains("Full-Fledged practice website for Automation Engineers");
  });

  it("Test Case 8 - Verifique todos os produtos e página de detalhe do produto", () => {
    menu.navegarParaPaginaInicial();
    cy.contains("Full-Fledged practice website for Automation Engineers");

    produtos.navegarParaProdutos();
    cy.url().should("contain", "products");
    cy.get(".title.text-center").should("be.visible").contains("All Products");

    produtos.visualizarProduto();
    cy.get(".product-information h2").should("have.text", "Blue Top");
    cy.get(".product-information p")
      .eq(0)
      .should("have.text", "Category: Women > Tops");
    cy.get(".product-information span span").should("have.text", "Rs. 500");
    cy.contains("p", "Availability").should("contain.text", "In Stock");
    cy.contains("p", "Condition").should("contain.text", "New");
    cy.contains("p", "Brand").should("contain.text", "Polo");
  });

  it("Test Case 9 - Pesquisar produto", () => {
    menu.navegarParaPaginaInicial();
    cy.contains("Full-Fledged practice website for Automation Engineers");

    produtos.navegarParaProdutos();
    cy.url().should("contain", "products");
    cy.get(".title.text-center").should("be.visible").contains("All Products");

    produtos.pesquisarProdutos("Men Tshirt");
    cy.get(".title.text-center")
      .should("be.visible")
      .contains("Searched Products");
    cy.get(".productinfo > p").should("be.visible").contains("Men Tshirt");
  });

  it("Test Case 10 - Verificar assinatura na página inicial", () => {
    menu.navegarParaPaginaInicial();
    cy.contains("Full-Fledged practice website for Automation Engineers");

    menu.scrollParaRodape();
    cy.get(".single-widget").contains("Subscription");

    menu.preencherAssinatura();
    cy.get(".alert-success", { timeout: 5000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("You have been successfully subscribed!");
      });
  });

  it("Test Case 15 - Fazer pedido - Fazer login antes do Checkout", () => {
    menu.navegarParaPaginaInicial();
    cy.contains("Full-Fledged practice website for Automation Engineers");

    menu.navegarParaLogin();

    login.preencherFormularioPreCadastro();

    cadastro.preencherFormularioCadastro();
    cy.url().should("contain", "account_created");
    cy.contains("b", "Account Created!");

    produtos.navegarParaProdutos();

    produtos.adicionarProduto();

    produtos.navegarParaCarrinho();

    produtos.fazerCheckout();

    produtos.preencherFormularioPagamento();
    cy.get('[data-qa="order-placed"]').should("have.text", "Order Placed!");
    cy.contains("p", "Congratulations! Your order has been confirmed!").should(
      "be.visible"
    );

    cadastro.deletarConta();
    cy.get('[data-qa="account-deleted"]').contains("Account Deleted!");

    cadastro.clicarNoBotaoContinuar();

    //     1. Iniciar navegador
    // 2 . Navegar para url ´http://automationexercise.com'
    // 3 . Verifique se a página inicial está visível com sucesso
    // 4 . Clique no botão 'Signup / Login'
    // 5 . Preencha todos os detalhes em Inscrição e crie conta
    // 6 . Verifique 'CONTA CRIADA!' e clique no botão 'Continuar'
    // 7 . Verifique 'Logado como nome de usuário' no topo
    // 8 . Adicionar produtos ao carrinho
    // 9 . Clique no botão 'Carrinho'
    // 10 . Verifique se a página do carrinho está sendo exibida
    // 11 . Clique em Prossiga para checkout
    // 12 . Verifique os Detalhes do Endereço e Reveja Seu Pedido
    // 13 . Digite descrição na área de texto do comentário e clique em 'Colocar Ordem'
    // 14 . Insira os dados de pagamento: Nome no Cartão, Número do Cartão, CVC, Data de validade
    // 15 . Clique no botão 'Pagar e Confirmar Pedido'
    // 16 . Verifique a mensagem de sucesso 'Seu pedido foi feito com sucesso!'
    // 17 . Clique no botão 'Excluir Conta'
    // 18 . Verifique 'CONTA EXCLUÍDA!' e clique no botão 'Continuar'
  });
});
