document.addEventListener('DOMContentLoaded', () => {
    const clienteForm = document.getElementById('clienteForm');
    const clientesTable = document.getElementById('clientesBody');
    
    // Função para carregar a lista de clientes ao carregar a página
    function carregarClientes() {
        fetch('http://localhost:3000/clientes')
            .then(response => response.json())
            .then(clientes => {
                clientesTable.innerHTML = '';
                clientes.forEach(cliente => {
                    clientesTable.innerHTML += `
                        <tr>
                            <td>${cliente.id}</td>
                            <td>${cliente.nome}</td>
                            <td>${cliente.email}</td>
                        </tr>
                    `;
                });
            })
            .catch(error => console.error('Erro ao carregar clientes:', error));
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
    
    // Carregar a lista de clientes ao carregar a página
    carregarClientes();
});
