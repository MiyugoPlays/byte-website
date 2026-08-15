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
    jsonPath = 'data/recipes.json',
    autoplay = true,
    interval = 4000
} = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Estado de Carregamento
    container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center my-4" aria-live="polite">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando receitas...</span>
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
            recipes = listaFinal.slice(0, 3);
        } else {
            console.warn('JSON vazio. Carregando dados de exemplo.');
            recipes = FALLBACK_RECEITAS.slice(0, 3);
        }
    } catch (error) {
        console.error('Erro ao carregar o JSON de receitas:', error);
        recipes = FALLBACK_RECEITAS.slice(0, 3);
    }

    const carouselId = 'carrosselReceitas';

    // DECLARAÇÃO DA VARIÁVEL (Tinha faltado esta linha no escopo correto!)
    const autoplayAttr = autoplay ? `data-bs-ride="carousel" data-bs-interval="${interval}"` : 'data-bs-ride="false"';

    // 1. Gerar os Slides
    const itemsHtml = recipes.map((recipe, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}" data-bs-interval="${interval}">
      <div class="recipe-card mx-auto">
        <img 
          src="${recipe.imagem || 'https://via.placeholder.com/400x260?text=Sem+Imagem'}" 
          class="recipe-card-img"
          alt="${recipe.alt || recipe.nome || 'Imagem da receita'}" 
          width="400" 
          height="260" 
          loading="lazy"
        >
        <div class="recipe-card-body">
          <h3 class="recipe-card-title">${recipe.nome || recipe.titulo || 'Receita'}</h3>
          <p class="recipe-card-meta">${recipe.categoria || 'Geral'} · ⏱ ${recipe.tempoPreparo || recipe.tempo || 'N/I'}</p>
          <a class="btn btn-outline-recipe" href="receita.html?id=${recipe.id}">Ver detalhes</a>
        </div>
      </div>
    </div>
  `).join('');

    // 2. Gerar os Indicadores
    const indicatorsHtml = recipes.map((recipe, index) => `
    <button 
      type="button" 
      data-bs-target="#${carouselId}" 
      data-bs-slide-to="${index}" 
      class="${index === 0 ? 'active' : ''}"
      aria-current="${index === 0 ? 'true' : 'false'}" 
      aria-label="${recipe.nome || recipe.titulo || 'Slide'}">
    </button>
  `).join('');

    // 3. Renderizar o HTML Final
    container.innerHTML = `
    <section aria-label="Carrossel de Receitas em Destaque">
      <div class="col-12 col-md-7 mx-auto position-relative px-4">
        
        <div id="${carouselId}" class="carousel slide" ${autoplayAttr}>
          
          <div class="carousel-inner">
            ${itemsHtml}
          </div>

          <!-- Seta Esquerda: centralizada na altura exata com translate-middle -->
          <button class="carousel-control-prev position-absolute start-0 top-50 translate-middle" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Receita anterior</span>
          </button>

          <!-- Seta Direita: centralizada na altura exata com translate-middle -->
          <button class="carousel-control-next position-absolute start-100 top-50 translate-middle" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Próxima receita</span>
          </button>

          <!-- Indicadores fora do card -->
          <div class="carousel-indicators position-relative mt-3 mb-0">
            ${indicatorsHtml}
          </div>

        </div>
      </div>
    </section>
  `;

    // 4. Inicializar o Bootstrap JS
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
        jsonPath: 'data/recipes.json',
        autoplay: true,
        interval: 4000
    });
});