# 🌐 Projeto Plataforma ONG (Experiência Prática Front-End)

Este repositório contém o projeto final da disciplina de Desenvolvimento Front-End. O objetivo foi construir uma plataforma web completa para uma ONG fictícia, evoluindo de uma estrutura básica de HTML/CSS para uma **Single Page Application (SPA)** robusta e acessível.

O projeto demonstra a aplicação de HTML5 semântico, CSS3 moderno (variáveis, grid, flexbox) e JavaScript modular para criar uma experiência de usuário interativa, responsiva e alinhada com as diretrizes de acessibilidade (WCAG 2.1).

---

## ✨ Funcionalidades Principais

* **Navegação SPA:** O site carrega novas páginas (Projetos, Cadastro) sem recarregar, usando a `fetch` API e a History API (`spa.js`).
* **Validação de Formulário:** Validação completa em tempo real (ao sair do campo) e no envio para todos os campos do formulário de cadastro (`validation.js`).
* **Máscaras de Input:** Aplicação automática de máscaras para CPF, CEP e Telefone, melhorando a experiência de usuário (`masks.js`).
* **Tema de Alto Contraste:** Um botão ☀️/🌙 permite ao usuário alternar para um modo de alto contraste, focado em acessibilidade (`theme.js` e `style.min.css`).
* **Design Responsivo:** O layout se adapta a dispositivos móveis, tablets e desktops.
* **Menus Acessíveis:** O menu hambúrguer (mobile) e o submenu "Projetos" (desktop) são totalmente funcionais e acessíveis via teclado (`main.js`).

---

## 🚀 Tecnologias e Conceitos Aplicados

* **HTML5 Semântico:** Estrutura clara usando tags como `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` e atributos ARIA para acessibilidade.
* **CSS3 Moderno:**
    * **Variáveis CSS (Custom Properties):** Para gerenciamento fácil de temas e design system.
    * **Flexbox e Grid Layout:** Para a construção de layouts responsivos e complexos.
    * **Metodologia Mobile-First:** O design foi pensado primeiro para telas pequenas.
* **JavaScript (ES6+):**
    * **Arquitetura Modular:** O código é dividido em módulos com responsabilidades únicas (`spa.js`, `validation.js`, `theme.js`, `masks.js`, `main.js`).
    * **Manipulação do DOM:** Para criar interatividade e atualizar o conteúdo da SPA.
    * **`fetch` API:** Para carregar o conteúdo das páginas de forma assíncrona.
    * **`localStorage`:** Para salvar a preferência do usuário para o tema (alto contraste).
* **Acessibilidade (WCAG 2.1):** Foco em contraste de cores, navegação por teclado, semântica correta e atributos `aria-*`.
* **Otimização de Produção:**
    * **Minificação:** Os arquivos CSS e JS são minificados (`.min.css`, `.min.js`) para reduzir o tempo de carregamento.

---

## 📁 Estrutura do Projeto

A organização dos arquivos separa o código-fonte (desenvolvimento) dos arquivos de produção (minificados) e dos assets.

```

EXPERIENCIA-PRATICA-1-FRONT-END/
│
├── index.html       \# Página inicial (container principal da SPA)
├── projetos.html    \# O *conteúdo* da página de projetos
├── cadastro.html    \# O *conteúdo* da página de cadastro
│
├── css/
│   ├── style.css        \# Código-fonte CSS (comentado)
│   └── style.min.css    \# Arquivo de produção (minificado e usado no HTML)
│
├── js/
│   ├── main.js          \# Lógica dos menus (hambúrguer, dropdown)
│   ├── main.min.js
│   ├── masks.js         \# Máscaras de formulário (CPF, CEP, Tel)
│   ├── masks.min.js
│   ├── spa.js           \# Lógica da Single Page Application (fetch, history)
│   ├── spa.min.js
│   ├── theme.js         \# Lógica do modo de alto contraste
│   ├── theme.min.js
│   ├── validation.js    \# Validação de todos os campos do formulário
│   └── validation.min.js
│
├── imagens/           \# Imagens e ícones do projeto
│
└── README.md          \# Esta documentação

````

---

## 🛠️ Como Executar o Projeto Localmente

**Importante:** Este projeto é uma Single Page Application (SPA) e usa a `fetch()` API para carregar o conteúdo das páginas. Por razões de segurança (política de CORS), ele **não funcionará corretamente** se você abrir o `index.html` diretamente do seu sistema de arquivos (protocolo `file://`).

Você **precisa** executá-lo a partir de um servidor local.

A forma mais simples de fazer isso é:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Igor-Bortoluzzi-98/EXPERIENCIA-PRATICA-1-FRONT-END.git](https://github.com/Igor-Bortoluzzi-98/EXPERIENCIA-PRATICA-1-FRONT-END.git)
    ```

2.  **Navegue até a pasta:**
    ```bash
    cd EXPERIENCIA-PRATICA-1-FRONT-END
    ```

3.  **Use a extensão "Live Server" (VS Code):**
    * Se você usa o VS Code, instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
    * Clique com o botão direito no arquivo `index.html`.
    * Selecione "Open with Live Server".
    * Isso abrirá o projeto no seu navegador em um endereço como `http://127.0.0.1:5500`, e tudo funcionará perfeitamente.

---

## 👨‍💻 Autor

* **Igor Bortoluzzi Fernandes** - [GitHub](https://github.com/Igor-Bortoluzzi-98) | [LinkedIn](https://www.linkedin.com/in/igor-bortoluzzi-fernandes)
````