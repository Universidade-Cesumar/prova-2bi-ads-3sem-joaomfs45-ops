
const API_URL = 'https://6a31d0d37bc5e1c612663048.mockapi.io/materiais';


const inputNome       = document.getElementById('input-nome');
const inputQtd        = document.getElementById('input-quantidade');
const inputCategoria  = document.getElementById('input-categoria');
const inputValidade   = document.getElementById('input-validade');
const btnCadastrar    = document.getElementById('btn-cadastrar');
const listaMateriais  = document.getElementById('lista-materiais');
const tabelaCorpo     = document.getElementById('tabela-corpo');
const inputBusca      = document.getElementById('input-busca');
const btnAtualizar    = document.getElementById('btn-atualizar');
const loadingState    = document.getElementById('loading-state');
const emptyState      = document.getElementById('empty-state');
const tableWrap       = document.getElementById('table-wrap');
const contador        = document.getElementById('contador');


let todosMateriais = [];



/**
 * Exibe um toast de notificação na tela.
 * @param {string} mensagem - Texto da notificação
 * @param {'success'|'error'|'warning'} tipo - Tipo visual do toast
 */
function mostrarToast(mensagem, tipo = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = mensagem;
  toast.className = `toast ${tipo} show`;

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}


/**
 * Valida os campos obrigatórios do formulário.
 * @returns {boolean} true se válido, false caso contrário
 */
function validarFormulario() {
  const nome = inputNome.value.trim();
  const qtd  = inputQtd.value.trim();
  let valido = true;

  // Limpa erros anteriores
  inputNome.classList.remove('error');
  inputQtd.classList.remove('error');

  if (!nome) {
    inputNome.classList.add('error');
    valido = false;
  }

  if (!qtd || isNaN(Number(qtd)) || Number(qtd) < 0) {
    inputQtd.classList.add('error');
    valido = false;
  }

  if (!valido) {
    mostrarToast('Preencha os campos obrigatórios: Nome e Quantidade.', 'warning');
  }

  return valido;
}


async function cadastrarMaterial() {
  if (!validarFormulario()) return;

  const material = {
    nome:       inputNome.value.trim(),
    quantidade: Number(inputQtd.value.trim()),
    categoria:  inputCategoria.value || null,
    validade:   inputValidade.value  || null,
  };

  // Desabilita botão para evitar duplo clique
  btnCadastrar.disabled = true;
  btnCadastrar.textContent = 'Enviando…';

  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(material),
    });

    if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);

    // Sucesso: limpa campos e atualiza lista
    limparFormulario();
    mostrarToast(`"${material.nome}" cadastrado com sucesso!`, 'success');
    await carregarMateriais(); // recarrega lista (GET)

  } catch (erro) {
    console.error('Erro ao cadastrar material:', erro);
    mostrarToast('Não foi possível salvar. Verifique a conexão e tente novamente.', 'error');
  } finally {
    // Reabilita botão independente do resultado
    btnCadastrar.disabled = false;
    btnCadastrar.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Cadastrar Material`;
  }
}

// ============================================================
// API: GET — Carregar materiais
// ============================================================

/**
 * Busca todos os materiais da MockAPI e popula a tabela.
 */
async function carregarMateriais() {
  mostrarCarregando(true);

  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);

    const materiais = await resposta.json();
    todosMateriais = materiais; // salva no cache local

    renderizarTabela(materiais);

  } catch (erro) {
    console.error('Erro ao carregar materiais:', erro);
    mostrarToast('Erro ao carregar estoque. Verifique a conexão.', 'error');
    mostrarCarregando(false);
    mostrarVazio(true);
  }
}

// ============================================================
// RENDERIZAÇÃO DA TABELA
// ============================================================

/**
 * Renderiza as linhas da tabela com os materiais recebidos.
 * @param {Array} materiais - Lista de materiais da API
 */
function renderizarTabela(materiais) {
  mostrarCarregando(false);

  if (!materiais || materiais.length === 0) {
    mostrarVazio(true);
    atualizarContador(0);
    return;
  }

  mostrarVazio(false);
  tableWrap.classList.remove('hidden');

  tabelaCorpo.innerHTML = materiais.map(m => `
    <tr>
      <td class="td-nome">${escaparHTML(m.nome)}</td>
      <td class="td-cat">${badgeCategoria(m.categoria)}</td>
      <td class="td-qty">${m.quantidade}</td>
      <td class="td-val">${formatarData(m.validade)}</td>
      <td class="td-status">${badgeStatus(m.quantidade, m.validade)}</td>
    </tr>
  `).join('');

  atualizarContador(materiais.length);
}



function badgeCategoria(categoria) {
  if (!categoria) return '<span class="badge" style="background:#F1F5F9;color:#94A3B8">—</span>';
  if (categoria === 'Consumo')   return '<span class="badge badge-consumo">Consumo</span>';
  if (categoria === 'Permanente') return '<span class="badge badge-perm">Permanente</span>';
  return `<span class="badge">${escaparHTML(categoria)}</span>`;
}


function badgeStatus(quantidade, validade) {
  // Estoque zerado
  if (!quantidade || quantidade <= 0) {
    return '<span class="badge badge-zero">Zerado</span>';
  }

  if (validade) {
    const diasRestantes = Math.ceil(
      (new Date(validade + 'T00:00:00') - new Date()) / (1000 * 60 * 60 * 24)
    );
    if (diasRestantes < 0)  return '<span class="badge badge-danger">Vencido</span>';
    if (diasRestantes <= 30) return '<span class="badge badge-warn">Vence em breve</span>';
  }

  return '<span class="badge badge-ok">OK</span>';
}

function formatarData(dataISO) {
  if (!dataISO) return '<span style="color:#CBD5E1">—</span>';
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

function escaparHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}



function mostrarCarregando(ativo) {
  loadingState.classList.toggle('hidden', !ativo);
  if (ativo) {
    tableWrap.classList.add('hidden');
    emptyState.classList.add('hidden');
  }
}

function mostrarVazio(ativo) {
  emptyState.classList.toggle('hidden', !ativo);
  tableWrap.classList.toggle('hidden', ativo);
}

function atualizarContador(total) {
  contador.textContent = total === 0 ? '' :
    total === 1 ? '1 material cadastrado' : `${total} materiais cadastrados`;
}

function filtrarMateriais(termo) {
  if (!termo.trim()) {
    renderizarTabela(todosMateriais);
    return;
  }

  const normalizado = termo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const filtrados = todosMateriais.filter(m => {
    const nome = (m.nome || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return nome.includes(normalizado);
  });

  renderizarTabela(filtrados);
}



function limparFormulario() {
  inputNome.value      = '';
  inputQtd.value       = '';
  inputCategoria.value = '';
  inputValidade.value  = '';
  inputNome.classList.remove('error');
  inputQtd.classList.remove('error');
  inputNome.focus();
}



btnCadastrar.addEventListener('click', cadastrarMaterial);

[inputNome, inputQtd, inputCategoria, inputValidade].forEach(el => {
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter') cadastrarMaterial();
  });
});

// Busca em tempo real
inputBusca.addEventListener('input', e => filtrarMateriais(e.target.value));

// Botão atualizar lista
btnAtualizar.addEventListener('click', async () => {
  inputBusca.value = '';
  await carregarMateriais();
});


document.addEventListener('DOMContentLoaded', carregarMateriais);
// ============================================================
// SPRINT 2
// ============================================================

// Necessário para os testes
function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (quantidadeRetirada <= 0) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}

// btn-baixar
async function baixarMaterial(id, estoqueAtual) {
  const inputRetirada = document.getElementById('input-retirada');

  if (!inputRetirada) return;

  const quantidadeRetirada = Number(inputRetirada.value);

  if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
    mostrarToast('Quantidade inválida para retirada.', 'warning');
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantidade: estoqueAtual - quantidadeRetirada
      })
    });

    mostrarToast('Estoque atualizado com sucesso!', 'success');
    carregarMateriais();

  } catch (erro) {
    console.error(erro);
    mostrarToast('Erro ao atualizar estoque.', 'error');
  }
}

// btn-excluir
async function excluirMaterial(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    mostrarToast('Material excluído com sucesso!', 'success');
    carregarMateriais();

  } catch (erro) {
    console.error(erro);
    mostrarToast('Erro ao excluir material.', 'error');
  }
}