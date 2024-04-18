document.addEventListener('DOMContentLoaded', () => {
    const clienteForm = document.getElementById('clienteForm');
    const clientesTable = document.getElementById('clientesBody');
    
    // Array para armazenar os clientes
    let clientes = [];
    
    // Função para carregar a lista de clientes ao carregar a página
    function carregarClientes() {
        fetch('http://localhost:3000/clientes')
            .then(response => response.json())
            .then(data => {
                clientes = data;
                renderizarClientes();
            })
            .catch(error => console.error('Erro ao carregar clientes:', error));
    }
    
    // Função para renderizar a lista de clientes
    function renderizarClientes() {
        clientesTable.innerHTML = '';
        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td><button class="editar" data-id="${cliente.id}">Editar</button></td>
            `;
            clientesTable.appendChild(row);
        });
    }
    
    // Event listener para enviar o formulário de adicionar cliente
    clienteForm.addEventListener('submit', event => {
        event.preventDefault();
        
        const formData = new FormData(clienteForm);
        const novoCliente = {
            nome: formData.get('nome'),
            email: formData.get('email')
        };
        
        fetch('http://localhost:3000/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoCliente)
        })
        .then(response => response.json())
        .then(() => {
            clienteForm.reset();
            carregarClientes();
        })
        .catch(error => console.error('Erro ao adicionar cliente:', error));
    });
    
    // Event listener para o botão de editar
    clientesTable.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('editar')) {
            const id = parseInt(target.getAttribute('data-id'));
            const cliente = clientes.find(c => c.id === id);
            if (cliente) {
                const novoNome = prompt('Digite o novo nome:', cliente.nome);
                const novoEmail = prompt('Digite o novo email:', cliente.email);
                if (novoNome !== null && novoEmail !== null) {
                    editarCliente(id, novoNome, novoEmail);
                }
            }
        }
    });
    
    // Função para editar um cliente
    function editarCliente(id, novoNome, novoEmail) {
        fetch(`http://localhost:3000/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: novoNome, email: novoEmail })
        })
        .then(response => response.json())
        .then(() => {
            carregarClientes();
        })
        .catch(error => console.error('Erro ao editar cliente:', error));
    }
    
    // Carregar a lista de clientes ao carregar a página
    carregarClientes();
});
