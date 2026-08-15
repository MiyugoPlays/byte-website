// Página de detalhes da receita: lê data/receitas.json e renderiza a receita
// correspondente ao parâmetro "id" da URL (ex.: receita.html?id=lasanha-a-bolonhesa).

const estadoCarregando = document.getElementById('estado-carregando');
const estadoErro = document.getElementById('estado-erro');
const receitaConteudo = document.getElementById('receita-conteudo');

function mostrarErro() {
  if (estadoCarregando) estadoCarregando.hidden = true;
  if (receitaConteudo) receitaConteudo.hidden = true;
  if (estadoErro) estadoErro.hidden = false;

  const breadcrumbAtual = document.getElementById('breadcrumb-atual');
  if (breadcrumbAtual) breadcrumbAtual.textContent = 'Receita não encontrada';
}

function renderizarReceita(receita) {
  const tituloPagina = document.getElementById('titulo-pagina');
  if (tituloPagina) tituloPagina.textContent = `${receita.nome} - Byte`;

  const metaDesc = document.getElementById('meta-descricao');
  if (metaDesc) metaDesc.setAttribute('content', receita.descricao);

  const ogTitle = document.getElementById('og-title');
  if (ogTitle) ogTitle.setAttribute('content', `${receita.nome} - Byte`);

  const ogDesc = document.getElementById('og-description');
  if (ogDesc) ogDesc.setAttribute('content', receita.descricao);

  const ogImg = document.getElementById('og-image');
  if (ogImg) ogImg.setAttribute('content', receita.imagem);

  const breadcrumbAtual = document.getElementById('breadcrumb-atual');
  if (breadcrumbAtual) breadcrumbAtual.textContent = receita.nome;

  const imagem = document.getElementById('receita-imagem');
  if (imagem) {
    imagem.src = receita.imagem;
    imagem.alt = receita.nome;
  }

  const elCategoria = document.getElementById('receita-categoria');
  if (elCategoria) elCategoria.textContent = receita.categoria;

  const elNome = document.getElementById('receita-nome');
  if (elNome) elNome.textContent = receita.nome;

  const elTempo = document.getElementById('receita-tempo');
  if (elTempo) elTempo.textContent = receita.tempoPreparo;

  const elPorcoes = document.getElementById('receita-porcoes');
  if (elPorcoes) elPorcoes.textContent = receita.porcoes;

  const elDificuldade = document.getElementById('receita-dificuldade');
  if (elDificuldade) elDificuldade.textContent = receita.dificuldade;

  const elDescricao = document.getElementById('receita-descricao');
  if (elDescricao) elDescricao.textContent = receita.descricao;

  const listaIngredientes = document.getElementById('receita-ingredientes');
  if (listaIngredientes && Array.isArray(receita.ingredientes)) {
    listaIngredientes.innerHTML = '';
    receita.ingredientes.forEach((ingrediente) => {
      const item = document.createElement('li');
      item.textContent = ingrediente;
      listaIngredientes.appendChild(item);
    });
  }

  const listaModoPreparo = document.getElementById('receita-modo-preparo');
  if (listaModoPreparo && Array.isArray(receita.modoPreparo)) {
    listaModoPreparo.innerHTML = '';
    receita.modoPreparo.forEach((passo) => {
      const item = document.createElement('li');
      item.textContent = passo;
      listaModoPreparo.appendChild(item);
    });
  }

  const elDica = document.getElementById('receita-dica');
  const elDicaTexto = document.getElementById('receita-dica-texto');
  if (receita.dicaDoChef && elDica && elDicaTexto) {
    elDicaTexto.textContent = receita.dicaDoChef;
    elDica.hidden = false;
  }

  if (estadoCarregando) estadoCarregando.hidden = true;
  if (estadoErro) estadoErro.hidden = true;
  if (receitaConteudo) receitaConteudo.hidden = false;
}

const idReceita = new URLSearchParams(window.location.search).get('id');

if (!idReceita) {
  mostrarErro();
} else {
  fetch('data/receitas.json')
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