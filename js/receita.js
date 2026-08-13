// Página de detalhes da receita: lê data/recipes.json e renderiza a receita
// correspondente ao parâmetro "id" da URL (ex.: receita.html?id=lasanha-a-bolonhesa).

const estadoCarregando = document.getElementById('estado-carregando');
const estadoErro = document.getElementById('estado-erro');
const receitaConteudo = document.getElementById('receita-conteudo');

function mostrarErro() {
  estadoCarregando.hidden = true;
  receitaConteudo.hidden = true;
  estadoErro.hidden = false;
  document.getElementById('breadcrumb-atual').textContent = 'Receita não encontrada';
}

function renderizarReceita(receita) {
  document.getElementById('titulo-pagina').textContent = `${receita.nome} - Byte`;
  document.getElementById('meta-descricao').setAttribute('content', receita.descricao);
  document.getElementById('og-title').setAttribute('content', `${receita.nome} - Byte`);
  document.getElementById('og-description').setAttribute('content', receita.descricao);
  document.getElementById('og-image').setAttribute('content', receita.imagem);
  document.getElementById('breadcrumb-atual').textContent = receita.nome;

  const imagem = document.getElementById('receita-imagem');
  imagem.src = receita.imagem;
  imagem.alt = receita.nome;

  document.getElementById('receita-categoria').textContent = receita.categoria;
  document.getElementById('receita-nome').textContent = receita.nome;
  document.getElementById('receita-tempo').textContent = receita.tempoPreparo;
  document.getElementById('receita-porcoes').textContent = receita.porcoes;
  document.getElementById('receita-dificuldade').textContent = receita.dificuldade;
  document.getElementById('receita-descricao').textContent = receita.descricao;

  const listaIngredientes = document.getElementById('receita-ingredientes');
  listaIngredientes.innerHTML = '';
  receita.ingredientes.forEach((ingrediente) => {
    const item = document.createElement('li');
    item.textContent = ingrediente;
    listaIngredientes.appendChild(item);
  });

  const listaModoPreparo = document.getElementById('receita-modo-preparo');
  listaModoPreparo.innerHTML = '';
  receita.modoPreparo.forEach((passo) => {
    const item = document.createElement('li');
    item.textContent = passo;
    listaModoPreparo.appendChild(item);
  });

  if (receita.dicaDoChef) {
    document.getElementById('receita-dica-texto').textContent = receita.dicaDoChef;
    document.getElementById('receita-dica').hidden = false;
  }

  estadoCarregando.hidden = true;
  estadoErro.hidden = true;
  receitaConteudo.hidden = false;
}

const idReceita = new URLSearchParams(window.location.search).get('id');

if (!idReceita) {
  mostrarErro();
} else {
  fetch('data/recipes.json')
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(`Falha ao carregar receitas: ${resposta.status}`);
      }
      return resposta.json();
    })
    .then((receitas) => {
      const receita = receitas.find((item) => item.id === idReceita);
      if (receita) {
        renderizarReceita(receita);
      } else {
        mostrarErro();
      }
    })
    .catch((erro) => {
      console.error(erro);
      mostrarErro();
    });
}
