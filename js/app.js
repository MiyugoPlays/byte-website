// ==========================================
// 1. Ano atual exibido no rodapé
// ==========================================
const anoAtual = document.getElementById('ano-atual');
if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

// ==========================================
// 2. Alternância de tema claro/escuro
// ==========================================
const CHAVE_TEMA = 'byte-theme';
const botaoTema = document.getElementById('alternar-tema');

function aplicarTema(tema) {
  document.documentElement.setAttribute('data-theme', tema);
  if (botaoTema) {
    const escuro = tema === 'dark';
    botaoTema.setAttribute('aria-pressed', String(escuro));
    botaoTema.setAttribute('aria-label', escuro ? 'Alternar para tema claro' : 'Alternar para tema escuro');
    botaoTema.textContent = escuro ? '☀️' : '🌙';
  }
}

const temaSalvo = localStorage.getItem(CHAVE_TEMA);
const prefereEscuroPeloSistema = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (temaSalvo) {
  aplicarTema(temaSalvo);
} else if (prefereEscuroPeloSistema && botaoTema) {
  botaoTema.setAttribute('aria-label', 'Alternar para tema claro');
  botaoTema.textContent = '☀️';
}

if (botaoTema) {
  botaoTema.addEventListener('click', () => {
    const temaAtual = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    aplicarTema(novoTema);
    localStorage.setItem(CHAVE_TEMA, novoTema);
  });
}

// ==========================================
// 3. Imagem aleatória em destaque na Hero
// ==========================================
async function carregarHeroDestaque() {
  const imgHero = document.getElementById('hero-img');

  // Executa apenas se o elemento imgHero existir na página (ex: no index.html)
  if (!imgHero) return;

  try {
    const resposta = await fetch('data/receitas.json');
    if (!resposta.ok) throw new Error('Falha ao carregar o arquivo JSON');

    const receitas = await resposta.json();

    // Filtra apenas receitas marcadas com destaque: true
    const receitasDestaque = receitas.filter(receita => receita.destaque === true);

    if (receitasDestaque.length > 0) {
      // Sorteia uma das receitas em destaque
      const indiceAleatorio = Math.floor(Math.random() * receitasDestaque.length);
      const receitaSorteada = receitasDestaque[indiceAleatorio];

      // Atualiza imagem e alt no HTML
      imgHero.src = receitaSorteada.imagem;
      imgHero.alt = receitaSorteada.titulo || receitaSorteada.nome;
    }
  } catch (erro) {
    console.error('Erro ao carregar a imagem do hero:', erro);
  }
}

// Carrega o destaque ao abrir a página
document.addEventListener('DOMContentLoaded', carregarHeroDestaque);