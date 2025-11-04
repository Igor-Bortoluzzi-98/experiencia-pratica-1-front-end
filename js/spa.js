/* ========================================= */
/* SCRIPT PARA NAVEGAÇÃO SPA (SINGLE PAGE) */
/* ENTREGA IV - ACESSIBILIDADE (WCAG)       */
/* ========================================= */

(function() {

    // Função para focar no novo conteúdo (para leitores de tela)
    function focusOnNewContent(mainContainer) {
        const newHeading = mainContainer.querySelector('h1');
        
        if (newHeading) {
            // Adiciona tabindex="-1" para permitir foco programático
            // sem bagunçar a ordem de navegação (Tab)
            newHeading.setAttribute('tabindex', '-1');
            newHeading.focus();
        } else {
            // Fallback: foca no próprio container <main>
            mainContainer.setAttribute('tabindex', '-1');
            mainContainer.focus();
        }
    }

    // Função para carregar o conteúdo da página via fetch (ATUALIZADA)
    async function loadPageContent(url) {
        try {
            const response = await fetch(url);
            const text = await response.text();

            const parser = new DOMParser();
            const newDoc = parser.parseFromString(text, 'text/html');

            const newMainContent = newDoc.querySelector('#main-content');
            const mainContainer = document.querySelector('#main-content');

            // 6. Substitui o conteúdo
            mainContainer.innerHTML = newMainContent.innerHTML;

            // 7. Atualiza o título da página
            document.title = newDoc.title;

            // --- MUDANÇA WCAG ---
            // 8. Move o foco para o novo conteúdo
            focusOnNewContent(mainContainer);

            // 9. (IMPORTANTE) Re-executa os scripts da página nova
            reinitializePageScripts(url);

        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            window.location.href = url; // Comportamento padrão se falhar
        }
    }

    // Função para reinicializar scripts (ATUALIZADA)
    function reinitializePageScripts(url) {
        
        // --- MUDANÇA ---
        // Dispara um evento customizado "page-loaded"
        // Nossos scripts (validation.js, main.js) vão "ouvir" 
        // esse evento e se reinicializar.
        const pageLoadEvent = new CustomEvent('page-loaded');
        document.body.dispatchEvent(pageLoadEvent);

        // A lógica antiga de recarregar scripts é frágil.
        // A lógica de "eventos" é muito mais robusta.
        // Vamos garantir que masks.js também seja recarregado se
        // a página for o cadastro.
        if (url.includes('cadastro.html')) {
            // Remove o script antigo para evitar duplicação
            document.querySelector('script[src="js/masks.js"]')?.remove();
            
            // Adiciona o novo
            const maskScript = document.createElement('script');
            maskScript.src = 'js/masks.js';
            maskScript.defer = true; // Garante que será executado após o DOM
            document.body.appendChild(maskScript);
        }
    }

    // Intercepta todos os cliques nos links de navegação
    document.body.addEventListener('click', function(event) {
        const link = event.target.closest('a');

        // Ignora links externos, links com #, ou links com target="_blank"
        if (!link || 
            !link.href.startsWith(window.location.origin) || 
            link.href.includes('#') || 
            link.target === '_blank') {
            return;
        }

        // Previne o recarregamento
        event.preventDefault(); 
        const url = link.href;

        // Se já estamos na URL, não faz nada
        if (window.location.href === url) return; 

        // Carrega o novo conteúdo
        loadPageContent(url);

        // Atualiza a URL na barra de endereço
        window.history.pushState({path: url}, '', url);
    });

    // Lida com os botões "Voltar" e "Avançar" do navegador
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.path) {
            loadPageContent(event.state.path);
        } else {
            // Se o "state" for nulo (ex: a primeira página do histórico)
            loadPageContent(window.location.pathname);
        }
    });

})();