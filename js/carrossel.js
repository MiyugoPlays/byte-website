/**
 * Componente Reutilizável de Carrossel de Receitas
 */

const FALLBACK_RECEITAS = [
  {
    id: "bolo-de-chocolate",
    nome: "Bolo de Chocolate",
    categoria: "Sobremesas",
    destaque: true,
    tempoPreparo: "60 min",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/5/55/Chocolate_fudge_cake.jpg",
    alt: "Bolo de chocolate fatiado"
  },
  {
    id: "lasanha-a-bolonhesa",
    nome: "Lasanha à Bolonhesa",
    categoria: "Pratos Principais",
    destaque: true,
    tempoPreparo: "90 min",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lasagna_bolognese_dish_with_minced_meat%2C_Brisbane.jpg/960px-Lasagna_bolognese_dish_with_minced_meat%2C_Brisbane.jpg",
    alt: "Lasanha à bolonhesa gratinada"
  },
  {
    id: "brigadeiro-tradicional",
    nome: "Brigadeiro Tradicional",
    categoria: "Doces",
    destaque: true,
    tempoPreparo: "30 min",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Brigadeiros_Tradicionais.jpg/960px-Brigadeiros_Tradicionais.jpg",
    alt: "Brigadeiros tradicionais em forminhas"
  }
];

async function iniciaReceitaCarrossel({
  containerId = 'receita-carrossel-container',
  jsonPath = 'data/receitas.json',
  autoplay = true,
  interval = 4000
} = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Estado de Carregamento
  container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center my-5" aria-live="polite">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Carregando receitas em destaque...</span>
            </div>
        </div>
    `;

  let recipes = [];

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error(`Status HTTP: ${response.status}`);
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const receitasDestaque = data.filter(recipe => recipe.destaque === true);
      const listaFinal = receitasDestaque.length > 0 ? receitasDestaque : data;
      recipes = listaFinal.slice(0, 5);
    } else {
      recipes = FALLBACK_RECEITAS;
    }
  } catch (error) {
    console.error('Erro ao carregar o JSON de receitas:', error);
    recipes = FALLBACK_RECEITAS;
  }

  const carouselId = 'carrosselReceitas';
  const autoplayAttr = autoplay ? `data-bs-ride="carousel" data-bs-interval="${interval}"` : 'data-bs-ride="false"';

  // 1. Gerar os Slides
  const itemsHtml = recipes.map((recipe, index) => {
    const nome = recipe.nome || recipe.titulo || 'Receita';
    const categoria = recipe.categoria || 'Geral';
    const tempo = recipe.tempoPreparo || recipe.tempo || 'N/I';
    const imagem = recipe.imagem || 'https://via.placeholder.com/600x350?text=Sem+Imagem';
    const altText = recipe.alt || nome;

    return `
        <div class="carousel-item ${index === 0 ? 'active' : ''}" data-bs-interval="${interval}">
            <div class="d-flex flex-column align-items-center text-center mx-auto" style="max-width: 580px;">
                
                <!-- Container da Imagem com Moldura Suave -->
                <div class="ratio ratio-16x9 rounded-4 overflow-hidden mb-3 shadow border border-secondary border-opacity-25">
                    <img 
                        src="${imagem}" 
                        class="object-fit-cover w-100 h-100" 
                        alt="${altText}"
                        loading="${index === 0 ? 'eager' : 'lazy'}"
                    >
                </div>

                <!-- Bloco de Texto Centralizado com Alto Contraste -->
                <div class="px-2">
                    <!-- Título em Destaque Claro (Acessível no Dark Mode) -->
                    <h3 class="fw-bold fs-3 text-emphasis mb-2">${nome}</h3>
                    
                    <!-- Subtítulo e Meta Informações -->
                    <p class="text-body-secondary fs-6 mb-3">
                        <span class="badge text-bg-primary text-uppercase me-1">${categoria}</span> 
                        <span class="ms-1">⏱️ ${tempo}</span>
                    </p>

                    <!-- Botão Responsivo de Ação -->
                    <a class="btn text-bg-primary rounded-pill px-4 py-2 fw-semibold shadow-sm" href="receita.html?id=${recipe.id}">
                        Ver detalhes
                    </a>
                </div>

            </div>
        </div>
        `;
  }).join('');

  // 2. Gerar Indicadores
  const indicatorsHtml = recipes.map((recipe, index) => `
        <button 
            type="button" 
            data-bs-target="#${carouselId}" 
            data-bs-slide-to="${index}" 
            class="${index === 0 ? 'active' : ''}"
            aria-current="${index === 0 ? 'true' : 'false'}" 
            aria-label="${recipe.nome || recipe.titulo || 'Slide ' + (index + 1)}">
        </button>
    `).join('');

  // 3. Renderizar o HTML Final
  container.innerHTML = `
        <section aria-label="Carrossel de Receitas em Destaque">
            <div class="col-12 col-md-9 col-lg-8 mx-auto position-relative px-4">
                
                <div id="${carouselId}" class="carousel slide" ${autoplayAttr}>
                    
                    <div class="carousel-inner py-2">
                        ${itemsHtml}
                    </div>

                    <!-- Botão Anterio com Acessibilidade / Alinhamento -->
                    <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bg-dark bg-opacity-50 rounded-circle p-3" aria-hidden="true"></span>
                        <span class="visually-hidden">Receita anterior</span>
                    </button>

                    <!-- Botão Próximo com Acessibilidade / Alinhamento -->
                    <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                        <span class="carousel-control-next-icon bg-dark bg-opacity-50 rounded-circle p-3" aria-hidden="true"></span>
                        <span class="visually-hidden">Próxima receita</span>
                    </button>

                    <!-- Indicadores com Espaçamento Adequado -->
                    <div class="carousel-indicators position-relative mt-4 mb-0">
                        ${indicatorsHtml}
                    </div>

                </div>

            </div>
        </section>
    `;

  // 4. Inicializar Bootstrap JS
  const carouselElement = document.getElementById(carouselId);
  if (carouselElement && typeof bootstrap !== 'undefined') {
    new bootstrap.Carousel(carouselElement, {
      interval: interval,
      ride: autoplay ? 'carousel' : false,
      pause: 'hover',
      keyboard: true,
      wrap: true
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  iniciaReceitaCarrossel({
    containerId: 'receita-carrossel-container',
    jsonPath: 'data/receitas.json',
    autoplay: true,
    interval: 4000
  });
});