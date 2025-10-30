# PGATS-WEB

Projeto de automação de testes web com Cypress, desenvolvido durante o programa de formação em automação de testes.

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- NPM (geralmente instalado com o Node.js)
- Um editor de código (recomendado: VS Code)

## 🚀 Instalação do Projeto

1. Clone o repositório:

```bash
git clone https://github.com/AnaClaudiaOT/PGATS-WEB.git
cd PGATS-WEB
```

2. Instale as dependências:

```bash
npm install
```

## ⚙️ Configuração

O projeto já vem configurado com:

- Cypress
- Faker para geração de dados
- Mochawesome Reporter para relatórios
- GitHub Actions para CI/CD

### 📁 Estrutura do Projeto

```
PGATS-WEB/
├── cypress/
│   ├── e2e/                    # Arquivos de teste
│   │   ├── exercicio*.cy.js    # Exercícios do curso
│   │   └── trabalho-final/     # Testes do trabalho final
│   ├── fixtures/               # Arquivos de dados para testes
│   ├── modules/                # Módulos com Page Objects
│   │   ├── cadastro/
│   │   ├── login/
│   │   └── menu/
│   └── support/               # Arquivos de suporte e comandos
│       ├── commands.js
│       ├── e2e.js
│       └── helpers.js
└── .github/
    └── workflows/            # Configurações do GitHub Actions
```

## 🎯 Executando os Testes

### Modo Interativo (Cypress GUI)

```bash
npx cypress open
```

### Modo Headless (CLI)

1. Executar todos os testes:

```bash
npm test
```

2. Executar apenas os exercícios:

```bash
npm run test:exercicios
```

3. Executar o trabalho final:

```bash
npm run test:trabalho-final
```

4. Executar com geração de relatório:

```bash
npm run test:report
```

### 📊 Relatórios

Os relatórios são gerados em:

- HTML: `cypress/reports/html`
- Screenshots: `cypress/screenshots`
- Vídeos: `cypress/videos`

## 🔄 Integração Contínua

O projeto usa GitHub Actions para CI/CD. A cada push:

- Executa os testes do trabalho final
- Gera relatórios
- Armazena artefatos (relatórios, screenshots e vídeos)
