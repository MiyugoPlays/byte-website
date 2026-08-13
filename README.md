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

> A página `receitas.html` (listagem/catálogo) ainda será desenvolvida na Issue #3; até lá, o acesso a
> `receita.html` é feito diretamente pela URL com o parâmetro `id`.

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
