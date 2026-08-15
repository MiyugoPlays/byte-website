// Página de listagem de receitas: lê data/recipes.json e renderiza os cards
// na grade, com busca por nome, filtro por categoria, ordenação e paginação
// simples ("Carregar mais receitas").

const ITENS_POR_PAGINA = 6;

const estadoCarregando = document.getElementById('estado-carregando');
const estadoVazio = document.getElementById('estado-vazio');
const estadoErro = document.getElementById('estado-erro');
const gradeReceitas = document.getElementById('grade-receitas');
const campoBusca = document.getElementById('busca-receita');
const filtroCategoria = document.getElementById('filtro-categoria');
const campoOrdenar = document.getElementById('ordenar-receitas');
const botaoCarregarMais = document.getElementById('botao-carregar-mais');

let todasReceitas = [];
let receitasFiltradas = [];
let itensExibidos = 0;

function criarCard(receita) {
  const coluna = document.createElement('div');
  coluna.className = 'col';

  const card = document.createElement('div');
  card.className = 'card recipe-card h-100';

  const imagem = document.createElement('img');
  imagem.className = 'card-img-top recipe-card-img object-fit-cover';
  imagem.src = receita.imagem;
  imagem.alt = receita.nome;
  imagem.loading = 'lazy';
  card.appendChild(imagem);

  const corpo = document.createElement('div');
  corpo.className = 'card-body d-flex flex-column';

  const categoria = document.createElement('span');
  categoria.className = 'badge rounded-pill text-bg-primary fw-semibold mb-2 align-self-start';
  categoria.textContent = receita.categoria;
  corpo.appendChild(categoria);

  const titulo = document.createElement('h3');
  titulo.className = 'card-title fs-5 fw-bold mb-1';
  titulo.textContent = receita.nome;
  corpo.appendChild(titulo);

  const tempo = document.createElement('p');
  tempo.className = 'card-text text-body-secondary small mb-2';
  tempo.textContent = `⏱ ${receita.tempoPreparo}`;
  corpo.appendChild(tempo);

  const descricao = document.createElement('p');
  descricao.className = 'card-text small mb-3';
  descricao.textContent = receita.descricao;
  corpo.appendChild(descricao);

  const link = document.createElement('a');
  link.className = 'btn btn-outline-recipe rounded-pill fw-semibold mt-auto align-self-start';
  link.href = `receita.html?id=${receita.id}`;
  link.textContent = 'Ver detalhes';
  corpo.appendChild(link);

  card.appendChild(corpo);
  coluna.appendChild(card);
  return coluna;
}

function preencherCategorias(receitas) {
  const categorias = [...new Set(receitas.map((receita) => receita.categoria))]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));

  categorias.forEach((categoria) => {
    const opcao = document.createElement('option');
    opcao.value = categoria;
    opcao.textContent = categoria;
    filtroCategoria.appendChild(opcao);
  });
}

function ordenarReceitas() {
  const ordem = campoOrdenar.value;
  receitasFiltradas.sort((a, b) => {
    return ordem === 'za'
      ? b.nome.localeCompare(a.nome, 'pt-BR')
      : a.nome.localeCompare(b.nome, 'pt-BR');
  });
}

function mostrarMaisReceitas() {
  const proximas = receitasFiltradas.slice(itensExibidos, itensExibidos + ITENS_POR_PAGINA);
  proximas.forEach((receita) => gradeReceitas.appendChild(criarCard(receita)));
  itensExibidos += proximas.length;

  botaoCarregarMais.hidden = itensExibidos >= receitasFiltradas.length;

  const vazio = receitasFiltradas.length === 0;
  estadoVazio.hidden = !vazio;
  gradeReceitas.hidden = vazio;
}

function aplicarFiltros() {
  const termo = campoBusca.value.trim().toLowerCase();
  const categoria = filtroCategoria.value;

  receitasFiltradas = todasReceitas.filter((receita) => {
    const combinaBusca = receita.nome.toLowerCase().includes(termo);
    const combinaCategoria = !categoria || receita.categoria === categoria;
    return combinaBusca && combinaCategoria;
  });

  ordenarReceitas();
  itensExibidos = 0;
  gradeReceitas.innerHTML = '';
  mostrarMaisReceitas();
}

campoBusca.addEventListener('input', aplicarFiltros);
filtroCategoria.addEventListener('change', aplicarFiltros);
campoOrdenar.addEventListener('change', aplicarFiltros);
botaoCarregarMais.addEventListener('click', mostrarMaisReceitas);

fetch('data/recipes.json')
  .then((resposta) => {
    if (!resposta.ok) {
      throw new Error(`Falha ao carregar receitas: ${resposta.status}`);
    }
    return resposta.json();
  })
  .then((receitas) => {
    estadoCarregando.hidden = true;
    todasReceitas = receitas;

    if (receitas.length === 0) {
      estadoVazio.hidden = false;
      return;
    }

    preencherCategorias(receitas);
    aplicarFiltros();
  })
  .catch((erro) => {
    console.error(erro);
    estadoCarregando.hidden = true;
    estadoErro.hidden = false;
  });
