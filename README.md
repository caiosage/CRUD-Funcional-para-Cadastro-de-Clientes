# 🚀 CRUD Funcional para Cadastro de Clientes

Este repositório contém uma aplicação web completa (Full-stack) para o cadastro e gerenciamento de clientes, projetada para demonstrar a integração de desenvolvimento, testes automatizados e DevOps em um único fluxo.

---

## 🎯 O que este repositório faz?

O projeto simula um ambiente real de desenvolvimento contínuo. Ele não apenas fornece a interface e a API para criar, ler, editar e excluir clientes, mas também garante que tudo funcione perfeitamente através de uma esteira automatizada.

O ecossistema é composto por:
* **Frontend:** Uma interface de usuário limpa e responsiva feita com HTML, CSS e JavaScript puro (Vanilla).
* **Backend:** Uma API RESTful construída em Node.js com Express para lidar com os dados.
* **Testes de API (Newman/Postman):** Validação automatizada dos endpoints da API garantindo os Status Codes e respostas corretas antes da interface ser testada.
* **Testes E2E (Cypress):** Uma suíte de testes automatizados que simula um usuário real interagindo com a tela, validando todo o fluxo do CRUD e comportamentos do navegador.
* **Integração Contínua (CI/CD):** Um workflow configurado no **GitHub Actions** (`e2e.yml`).

---

## 🏗️ Estrutura do Diretório

```text
├── .github/workflows/   # Configuração da esteira de CI/CD (e2e.yml)
├── backend/             # Servidor Express, rotas e lógica da API REST
├── cypress/             # Cenários de testes E2E do frontend (.cy.js)
├── frontend/            # Interface visual (HTML, CSS e JavaScript local)
├── postman/             # Collections e Environments para testes de API
├── package.json         # Scripts unificados de inicialização e dependências
└── cypress.config.js    # Configurações globais e baseUrl do Cypress
```

---

## 📦 Como Executar e Testar Localmente

Certifique-se de ter o **Node.js** (v18.16.0+) e o **Git** instalados.

1. **Clone o repositório e instale as dependências:**
   ```bash
   git clone https://github.com/caiosage/CRUD-Funcional-para-Cadastro-de-Clientes.git
   cd CRUD-Funcional-para-Cadastro-de-Clientes
   npm install
   ```

2. **Inicie a Aplicação (Frontend + Backend em paralelo):**
   ```bash
   npm run teste:ci
   ```
   *Acesse no navegador: `http://localhost:5500/index.html`*

### ⚙️ Executando os Testes de API (Newman)
Com o servidor rodando, você pode validar a API via terminal usando o Newman (motor do Postman):
```bash
# Instale o Newman globalmente (apenas na primeira vez)
npm install -g newman

# Execute a suíte de testes apontando para a collection e o ambiente
newman run postman/Impacta.postman_collection.json -e 'postman/Projeto Impacta.postman_environment.json'
```

### 💻 Executando os Testes de Interface (Cypress)
```bash
# Para abrir o modo interativo (com interface visual)
npx cypress open

# Para rodar rapidamente em segundo plano (Headless)
npm run cypress:run
```

---

## ☁️ Como funciona a automação (Workflow)

O grande diferencial deste repositório é a sua **esteira de CI/CD automatizada**. 

Toda vez que uma nova alteração de código é enviada para o GitHub (via `push` ou `Pull Request`), a nuvem entra em ação:
1. O GitHub Actions provisiona um servidor Linux isolado.
2. Levanta o banco de dados (API) e a interface visual simultaneamente.
3. Dispara os testes de API via Newman (validação de contrato).
4. Dispara os testes do Cypress em segundo plano (modo headless).
5. Se a aplicação passar em todos os testes, o commit é aprovado com sucesso (✅). Se algo quebrar, a automação acusa o erro e protege o projeto principal.

Essa arquitetura garante que nenhuma atualização quebre as funcionalidades existentes!

## Exemplo
<img width="2456" height="964" alt="image" src="https://github.com/user-attachments/assets/de26a974-4394-4a7a-9a45-611547a97ef4" />

<img width="2531" height="896" alt="image" src="https://github.com/user-attachments/assets/c608e24d-f81d-4023-b82d-7ae6cc39256d" />

<img width="2538" height="917" alt="image" src="https://github.com/user-attachments/assets/c6cad35a-15d5-41ca-8eb6-f8de8dcb0a6e" />

