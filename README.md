# 🍳 Byte - Catálogo de Receitas

> Uma aplicação web simples e intuitiva para navegar e visualizar receitas culinárias.

---

## 📌 Sobre o Projeto

O **Byte** é um catálogo de receitas desenvolvido com o objetivo de oferecer uma experiência rápida e prática de navegação. O usuário pode explorar uma lista prévia de receitas cadastradas, consultar detalhes de preparo, ingredientes e selecionar a receita desejada.

---

## 🛠️ Tecnologias Utilizadas

O projeto será desenvolvido utilizando as seguintes tecnologias:

* **HTML5:** Estrutura semântica das páginas.
* **CSS3:** Estilização customizada e layout.
* **JavaScript (ES6+):** Manipulação do DOM, lógica de seleção e consumo dos dados.
* **JSON:** Estrutura de dados para armazenamento do catálogo de receitas.
* **Bootstrap 5:** Framework para responsividade e componentes visuais de interface.

## 🌳 Organização do Git
# Padrão de Branches

Para manter a organização do projeto, cada funcionalidade ou correção deve ser desenvolvida em uma branch separada.

## Convenção de nomes

Utilize os seguintes padrões:

- `feature/nome-da-funcionalidade` – Desenvolvimento de novas funcionalidades.
- `fix/nome-do-problema` – Correção de bugs.
- `docs/descricao` – Alterações na documentação.
- `refactor/descricao` – Refatoração de código sem alterar funcionalidades.

### Exemplos

```text
feature/pagina-receitas
feature/carrossel-home
feature/detalhes-receita
fix/correcao-layout
docs/readme
```

---

# Merge Requests (MR)

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

# Boas práticas

- Criar uma branch para cada tarefa.
- Fazer commits pequenos e com mensagens descritivas.
- Manter a branch sincronizada com a `main`.
- Resolver conflitos antes de solicitar o Merge Request.
- Excluir a branch após o merge, quando não for mais necessária.

---

# Exemplo de fluxo

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
