describe('CRUD de Clientes - Testes de Ponta a Ponta', () => {

    // Visita a página uma única vez antes de começar o fluxo
    before(() => {
       cy.visit('http://127.0.0.1:5500/index.html');
    });

    it('Deve exibir os componentes e executar o fluxo completo de CRUD', () => {
        
        // 1. VALIDAÇÃO DE ESTRUTURA
        cy.get('h1').should('have.text', 'CRUD de Clientes');
        cy.contains('button', 'Adicionar Cliente').should('be.visible');
        cy.contains('h2, h3, div', 'Lista de Clientes').should('be.visible');

        // 2. VALIDAÇÃO DE CAMPOS VAZIOS
        cy.get('#clienteForm > button').click();
        cy.get('[name="nome"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
        });

        // 3. FLUXO DE CADASTRO
        cy.fixture('client').then((dadosFixture) => {
            cy.get('[name="nome"]').type(dadosFixture.user);
            cy.get('[name="email"]').type(dadosFixture.email);
            cy.get('#clienteForm > button').click();

            // Valida se apareceu na tabela
            cy.get('#clientesBody').within(() => {
                cy.contains('td', dadosFixture.user).should('be.visible');
                cy.contains('td', dadosFixture.email).should('be.visible');
            });
        });

        // 4. FLUXO DE EDIÇÃO (Executa logo em seguida, aproveitando o elemento na tela)
        const novoNome = 'Caio Atualizado';
        const novoEmail = 'caio.novo@gmail.com';

        cy.window().then((win) => {
            const promptStub = cy.stub(win, 'prompt');
            promptStub.onCall(0).returns(novoNome);   // 1º prompt: Nome
            promptStub.onCall(1).returns(novoEmail);  // 2º prompt: Email
        });

        cy.contains('button', 'Editar').click();
        cy.get('#clientesBody').should('contain', novoNome);
        cy.get('#clientesBody').should('contain', novoEmail);

        // 5. FLUXO DE EXCLUSÃO
        const stubConfirm = cy.stub();
        cy.on('window:confirm', stubConfirm);

        cy.contains('tr', novoNome).within(() => {
            cy.contains('button', 'Excluir').click();
        });

        cy.wrap(stubConfirm).should('have.been.called');
        cy.get('#clientesBody').should('not.contain', novoNome);
    });
});