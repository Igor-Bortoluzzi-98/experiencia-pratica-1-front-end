/* ========================================= */
/* SCRIPT PARA NAVEGAÇÃO SPA (SINGLE PAGE) */
/* ENTREGA III - REQUISITO OBRIGATÓRIO       */
/* ========================================= */

document.addEventListener('DOMContentLoaded', function() {

    // Função para carregar o conteúdo da página via fetch
    async function loadPageContent(url) {
        try {
            // 1. Busca o arquivo HTML
            const response = await fetch(url);

            // 2. Converte a resposta para texto
            const text = await response.text();

            // 3. Usa um "truque" para converter o texto HTML em um documento DOM
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(text, 'text/html');

            // 4. Seleciona APENAS o conteúdo da tag <main id="main-content">
            const newMainContent = newDoc.querySelector('#main-content');

            // 5. Seleciona o <main> da página atual
            const mainContainer = document.querySelector('#main-content');

            // 6. Substitui o conteúdo do <main> atual pelo novo
            mainContainer.innerHTML = newMainContent.innerHTML;

            // 7. Atualiza o título da página (da aba do navegador)
            document.title = newDoc.title;

            // 8. (IMPORTANTE) Re-executa os scripts da página nova
            // Precisamos disso para as máscaras e validação funcionarem
            reinitializePageScripts(url);

        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            // Se falhar, apenas redireciona (comportamento padrão)
            window.location.href = url;
        }
    }

    // Função para reinicializar scripts específicos da página
    // (Isso é crucial para o formulário de cadastro)
    function reinitializePageScripts(url) {
        // Se a URL for do cadastro, recarrega os scripts de máscara e validação
        if (url.includes('cadastro.html')) {
            // Simula a recarga do script (versão simplificada)
            // Remove scripts antigos e adiciona novos
            document.querySelector('script[src="js/masks.js"]')?.remove();
            document.querySelector('script[src="js/validation.js"]')?.remove();

            const maskScript = document.createElement('script');
            maskScript.src = 'js/masks.js';
            document.body.appendChild(maskScript);

            const validationScript = document.createElement('script');
            validationScript.src = 'js/validation.js';
            document.body.appendChild(validationScript);
        }
    }

    // Intercepta todos os cliques nos links de navegação
    document.body.addEventListener('click', function(event) {

        // Verifica se o clique foi em um link (<a>)
        // e se é um link de navegação interno (não um link externo ou #)
        const link = event.target.closest('a');

        if (link && link.href.startsWith(window.location.origin) && !link.href.includes('#')) {

            // 1. Previne o recarregamento da página
            event.preventDefault(); 

            const url = link.href;

            // 2. Carrega o novo conteúdo
            loadPageContent(url);

            // 3. Atualiza a URL na barra de endereço
            window.history.pushState({path: url}, '', url);
        }
    });

    // Lida com os botões "Voltar" e "Avançar" do navegador
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.path) {
            loadPageContent(event.state.path);
        }
    });

});