// Ano atual exibido no rodapé
const anoAtual = document.getElementById('ano-atual');
if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

// Alternância de tema claro/escuro, com preferência salva no navegador
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
