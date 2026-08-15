# 🍳 Byte - Catálogo de Receitas

> Uma aplicação web simples e intuitiva para navegar e visualizar receitas culinárias.

---

## 📌 Sobre o Projeto

O **Byte** é um catálogo de receitas desenvolvido com o objetivo de oferecer uma experiência rápida e prática de navegação. O usuário pode explorar uma lista prévia de receitas cadastradas, consultar detalhes de preparo, ingredientes e selecionar a receita desejada.

---

## 🏠 Página Inicial

A página inicial (`index.html`) está dividida em blocos independentes. Para editar o conteúdo:

| O que editar | Onde editar |
|---|---|
| Texto do logo e itens de menu | `<header id="cabecalho">` em `index.html` |
| Título e texto de apresentação | `<section class="hero">` em `index.html` |
| Receitas do carrossel de destaque | `<section class="destaques">` em `index.html` (cada `.carousel-item` é uma receita) |
| Links e redes sociais do rodapé | `<footer id="rodape">` em `index.html` |
| Cores do site (tema claro/escuro) | variáveis `:root` no início de `css/style.css` |

As receitas do carrossel estão fixas como exemplo nesta etapa; a Issue 2 substitui esses itens por dados
carregados dinamicamente do arquivo JSON. O tema claro/escuro é controlado pelo botão no cabeçalho
(lógica em `js/app.js`) e a preferência escolhida é salva no navegador do usuário.

## 📄 Página de Detalhes da Receita

A página `receita.html` é um template único reutilizado para todas as receitas. Os dados são lidos em
tempo de execução a partir de `data/recipes.json` e a receita exibida é definida pelo parâmetro `id` na
URL, por exemplo: `receita.html?id=lasanha-a-bolonhesa`.

| O que editar | Onde editar |
|---|---|
| Estrutura/layout da página de detalhes | `receita.html` |
| Lógica de leitura do JSON e renderização | `js/receita.js` |
| Estilos da página de detalhes | Bloco "Página de detalhes da receita" em `css/style.css` |
| Dados das receitas (adicionar/editar receitas) | `data/recipes.json` |

Formato esperado de cada receita em `data/recipes.json`:

```json
{
  "id": "identificador-unico-da-receita",
  "nome": "Nome da Receita",
  "categoria": "Categoria",
  "destaque": false,
  "imagem": "URL da imagem",
  "tempoPreparo": "90 minutos",
  "porcoes": 6,
  "dificuldade": "Fácil | Média | Difícil",
  "descricao": "Texto curto de apresentação da receita.",
  "ingredientes": ["Ingrediente 1", "Ingrediente 2"],
  "modoPreparo": ["Passo 1", "Passo 2"],
  "dicaDoChef": "Dica opcional exibida em destaque no final da página."
}
```

O campo `id` deve ser único e é o valor usado no parâmetro `?id=` da URL. O campo `dicaDoChef` é opcional;
quando ausente, o bloco "Dica do chef" não é exibido. Caso o `id` da URL não exista no JSON (ou o parâmetro
esteja ausente), a página exibe automaticamente uma mensagem de receita não encontrada.

## 📋 Página de Listagem de Receitas

A página `receitas.html` exibe todo o catálogo em uma grade de cards, também lida dinamicamente a partir de
`data/recipes.json` (mesmo arquivo usado na página inicial e na página de detalhes).

| O que editar | Onde editar |
|---|---|
| Estrutura/layout da página de listagem | `receitas.html` |
| Lógica de leitura do JSON, busca, filtro, ordenação e paginação | `js/receitas.js` |
| Dados das receitas (adicionar/editar receitas) | `data/recipes.json` |

Funcionalidades da página:
- **Busca** por nome da receita (`#busca-receita`), em tempo real conforme o usuário digita.
- **Filtro por categoria** (`#filtro-categoria`): as opções são geradas automaticamente a partir das
  categorias presentes no JSON, não precisam ser editadas manualmente.
- **Ordenação** A-Z / Z-A pelo nome da receita (`#ordenar-receitas`).
- **Carregar mais receitas**: os cards são exibidos em lotes de 6 (constante `ITENS_POR_PAGINA` em
  `js/receitas.js`); o botão só aparece quando ainda há receitas fora da página atual.
- **Estados de carregamento, vazio e erro**: mensagens dedicadas para enquanto o JSON carrega, quando a
  busca/filtro não encontra nenhuma receita e quando o arquivo JSON falha ao carregar.

Cada card usa os mesmos componentes e classes de tema já usados no carrossel da página inicial
(`card recipe-card`, `btn-outline-recipe`), garantindo visual consistente entre as duas páginas, e leva
para `receita.html?id=<id-da-receita>`.

## ℹ️ Página Sobre o Projeto

A página `sobre.html` reaproveita o mesmo cabeçalho, rodapé e tema claro/escuro das demais páginas (nenhum
CSS novo foi necessário — as seções usam apenas classes já existentes, como `recipe-card` e
`btn-outline-recipe`, e componentes nativos do Bootstrap).

| O que editar | Onde editar |
|---|---|
| Texto de descrição do projeto | Primeira `<section>` de `sobre.html` |
| Lista de tecnologias utilizadas | Seção "🛠️ Tecnologias Utilizadas" em `sobre.html` |
| Integrantes da equipe (nome, foto, link) | Seção "👩‍💻 Equipe" em `sobre.html` — cada integrante é um
`.card` com a foto de perfil do GitHub (`https://github.com/<usuário>.png`), nome e link para o perfil |

O link "Sobre o Projeto" no menu de navegação já existe no cabeçalho de `index.html`, `receitas.html` e
`receita.html` desde suas respectivas implementações; `sobre.html` reutiliza a mesma marcação de cabeçalho.

## 🗂️ Organização do Catálogo (data/recipes.json)

Todas as receitas ficam em um único arquivo (`data/recipes.json`), evitando duplicar dados em múltiplos
lugares. Para marcar quais receitas aparecem no carrossel de destaque da página inicial, cada receita tem
um campo booleano `destaque` (`true` ou `false`) em vez de existir um segundo arquivo só com as receitas
em destaque — assim há uma única fonte de dados para todo o catálogo.

Atualmente o catálogo tem 9 receitas em 7 categorias (Pratos Principais, Sobremesas, Doces, Saladas,
Bebidas, Salgados e Café da Manhã), das quais 3 estão marcadas como `destaque: true` (as mesmas exibidas
hoje no carrossel da página inicial). A Issue #2 é responsável por fazer o carrossel ler esse campo
dinamicamente em vez de usar os itens de exemplo fixos em `index.html`.

Para adicionar uma nova receita, inclua um novo objeto seguindo o formato acima ao final do array,
garantindo um `id` único (sem espaços ou acentos) e preenchendo todos os campos obrigatórios.

### 📷 Créditos das imagens

As fotos das receitas e a imagem da página inicial vêm do [Wikimedia Commons](https://commons.wikimedia.org),
sob licenças livres que exigem atribuição (exceto a marcada como CC0). Créditos:

| Receita / uso | Autor | Licença | Fonte |
|---|---|---|---|
| Página inicial (hero) | JIP | CC BY-SA 3.0 | [Spaghetti bolognese at restaurant Persilja](https://commons.wikimedia.org/wiki/File:Spaghetti_bolognese_at_restaurant_Persilja.jpg) |
| Lasanha à Bolonhesa | Kgbo | CC BY-SA 4.0 | [Lasagna bolognese dish with minced meat, Brisbane](https://commons.wikimedia.org/wiki/File:Lasagna_bolognese_dish_with_minced_meat,_Brisbane.jpg) |
| Bolo de Chocolate | Tracy Hunter | CC BY 2.0 | [Chocolate fudge cake](https://commons.wikimedia.org/wiki/File:Chocolate_fudge_cake.jpg) |
| Brigadeiro Tradicional | Márcia Cristina Machado | CC BY-SA 4.0 | [Brigadeiros Tradicionais](https://commons.wikimedia.org/wiki/File:Brigadeiros_Tradicionais.jpg) |
| Panqueca de Carne | David Monniaux | CC BY-SA 3.0 | [Crepe fourree](https://commons.wikimedia.org/wiki/File:Crepe_fourree_p1040332.jpg) |
| Salada Caesar | Geoff Peters | CC BY 2.0 | [Caesar salad (2)](https://commons.wikimedia.org/wiki/File:Caesar_salad_(2).jpg) |
| Suco de Maracujá | Dr. Chinchu C. | CC BY-SA 4.0 | [Passion Fruit juice](https://commons.wikimedia.org/wiki/File:Passion_Fruit_juice.jpg) |
| Pão de Queijo | Joy | CC BY 2.0 | [Pão de Queijo (Brazilian Cheese Bread)](https://commons.wikimedia.org/wiki/File:P%C3%A3o_de_Queijo_(Brazilian_Cheese_Bread).jpg) |
| Torta de Limão | PDPhoto.org | Domínio público | [A Lemon Meringue Tart](https://commons.wikimedia.org/wiki/File:A_Lemon_Meringue_Tart.jpg) |
| Panqueca Americana | Mae Mu | CC0 | [Foodiesfeed.com pouring-honey-on-pancakes-with-walnuts](https://commons.wikimedia.org/wiki/File:Foodiesfeed.com_pouring-honey-on-pancakes-with-walnuts.jpg) |

## 🛠️ Tecnologias Utilizadas

O projeto será desenvolvido utilizando as seguintes tecnologias:

* **HTML5:** Estrutura semântica das páginas.
* **CSS3:** Estilização customizada e layout.
* **JavaScript (ES6+):** Manipulação do DOM, lógica de seleção e consumo dos dados.
* **JSON:** Estrutura de dados para armazenamento do catálogo de receitas.
* **Bootstrap 5:** Framework para responsividade e componentes visuais de interface.

## 🌳 Organização do Git
Para manter a organização do projeto, cada funcionalidade ou correção deve ser desenvolvida em uma branch separada.

### Convenção de nomes

Utilize os seguintes padrões:

- `feature/nome-da-funcionalidade` – Desenvolvimento de novas funcionalidades.
- `fix/nome-do-problema` – Correção de bugs.
- `docs/descricao` – Alterações na documentação.
- `refactor/descricao` – Refatoração de código sem alterar funcionalidades.

#### Exemplos

```text
feature/pagina-receitas
feature/carrossel-home
feature/detalhes-receita
fix/correcao-layout
docs/readme
```

---

### Merge Requests (MR)

Nenhuma alteração deve ser enviada diretamente para a branch `main`.

O fluxo de trabalho adotado é:

1. Atualizar a branch `main`.
2. Criar uma nova branch para a atividade.
3. Desenvolver e realizar commits frequentes.
4. Enviar a branch para o repositório remoto.
5. Abrir um **Merge Request (MR)** para a branch `main`.
6. O outro integrante realiza a revisão.
7. Após aprovação, efetuar o merge.

---

### Boas práticas

- Criar uma branch para cada tarefa.
- Fazer commits pequenos e com mensagens descritivas.
- Manter a branch sincronizada com a `main`.
- Resolver conflitos antes de solicitar o Merge Request.
- Excluir a branch após o merge, quando não for mais necessária.

---

### Exemplo de fluxo

```bash
git checkout main
git pull

git checkout -b feature/pagina-receitas

# Desenvolver...

git add .
git commit -m "Adiciona página de receitas"

git push origin feature/pagina-receitas
```

Após o envio da branch, deve ser aberto um **Merge Request** para que outro integrante revise as alterações antes da integração à `main`.
