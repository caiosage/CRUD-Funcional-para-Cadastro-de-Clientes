document.addEventListener('DOMContentLoaded', () => {
    const clienteForm = document.getElementById('clienteForm');
    const clientesContainer = document.getElementById('clientesBody');

    clienteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        const clienteId = clienteForm.dataset.clienteId;

        if (clienteId) {
            // Editar cliente existente
            try {
                const response = await fetch(`http://localhost:3000/clientes/${clienteId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nome, email }),
                });

                if (response.ok) {
                    const cliente = await response.json();
                    const clienteRow = document.querySelector(`tr[data-cliente-id="${cliente._id}"]`);
                    clienteRow.innerHTML = `
                        <td>${cliente._id}</td>
                        <td>${cliente.nome}</td>
                        <td>${cliente.email}</td>
                        <td><button class="edit" data-cliente-id="${cliente._id}">Editar</button></td>
                        <td><button class="delete" data-cliente-id="${cliente._id}">Excluir</button></td>
                    `;
                    clienteForm.reset();
                    clienteForm.removeAttribute('data-cliente-id');
                } else {
                    console.error('Erro ao editar cliente:', response.statusText);
                }
            } catch (err) {
                console.error('Erro ao editar cliente:', err);
            }
        } else {
            // Adicionar novo cliente
            try {
                const response = await fetch('http://localhost:3000/clientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nome, email }),
                });

                if (response.ok) {
                    const cliente = await response.json();
                    adicionarClienteNaLista(cliente);
                    clienteForm.reset();
                } else {
                    console.error('Erro ao adicionar cliente:', response.statusText);
                }
            } catch (err) {
                console.error('Erro ao adicionar cliente:', err);
            }
        }
    });

    async function carregarClientes() {
        try {
            const response = await fetch('http://localhost:3000/clientes');
            const clientes = await response.json();
            clientesContainer.innerHTML = '';
            clientes.forEach(adicionarClienteNaLista);
        } catch (err) {
            console.error('Erro ao carregar clientes:', err);
        }
    }

    function adicionarClienteNaLista(cliente) {
        const clienteRow = document.createElement('tr');
        clienteRow.dataset.clienteId = cliente._id;
        clienteRow.innerHTML = `
            <td>${cliente._id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td><button class="edit" data-cliente-id="${cliente._id}">Editar</button></td>
            <td><button class="delete" data-cliente-id="${cliente._id}">Excluir</button></td>
        `;

        const editButton = clienteRow.querySelector('.edit');
        editButton.addEventListener('click', () => {
            clienteForm.dataset.clienteId = cliente._id;
            document.getElementById('nome').value = cliente.nome;
            document.getElementById('email').value = cliente.email;
        });

        const deleteButton = clienteRow.querySelector('.delete');
        deleteButton.addEventListener('click', async () => {
            const clienteId = cliente._id;
            try {
                const response = await fetch(`http://localhost:3000/clientes/${clienteId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    clienteRow.remove();
                }
            } catch (err) {
                console.error('Erro ao excluir cliente:', err);
            }
        });

        clientesContainer.appendChild(clienteRow);
    }

    carregarClientes();
});
