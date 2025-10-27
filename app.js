// 🔧 Configure aqui a URL da sua API Gateway
const API_BASE_URL = 'https://85b0q4fd0d.execute-api.us-east-1.amazonaws.com/v1';

async function carregarFatos() {
const response = await fetch(`${API_BASE_URL}/facts`);
const fatos = await response.json();

const lista = document.getElementById('lista-fatos');
lista.innerHTML = '';

fatos.forEach(fato => {
const item = document.createElement('li');
item.innerHTML = `
${fato.year} - ${fato.description}
EditarExcluir `;
lista.appendChild(item);
});
}

// Função para adicionar um novo fato
async function adicionarFato(event) {
event.preventDefault();

const year = document.getElementById('ano').value;
const description = document.getElementById('descricao').value;

await fetch(`${API_BASE_URL}/facts`, {
method: 'POST',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify({year, description})
});

await carregarFatos();
}

// Função para deletar um fato
async function deletarFato(year) {
await fetch(`${API_BASE_URL}/facts/${year}`, { method: 'DELETE' });
await carregarFatos();
}

// Função para editar um fato (PUT)
async function editarFato(year) {
const novoTexto = prompt('Digite a nova descrição:');
if (novoTexto) {
await fetch(`${API_BASE_URL}/facts/${year}`, {
method: 'PUT',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify({ description: novoTexto })
});
await carregarFatos();
}
}

// Inicialização
document.addEventListener('DOMContentLoaded', carregarFatos);
document.getElementById('form-fato').addEventListener('submit', adicionarFato);