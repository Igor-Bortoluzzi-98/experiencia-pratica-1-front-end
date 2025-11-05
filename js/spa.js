/* ========================================= */
/* SCRIPT PARA NAVEGAÇÃO SPA (SINGLE PAGE) */
/* ENTREGA IV - ACESSIBILIDADE (WCAG)       */
/* ========================================= */

(function() {

    function focusOnNewContent(mainContainer) {
        const newHeading = mainContainer.querySelector('h1');
        
        if (newHeading) {
            newHeading.setAttribute('tabindex', '-1');
            newHeading.focus();
        } else {
            mainContainer.setAttribute('tabindex', '-1');
            mainContainer.focus();
        }
    }

    async function loadPageContent(url) {
        try {
            const response = await fetch(url);
            const text = await response.text();

            const parser = new DOMParser();
            const newDoc = parser.parseFromString(text, 'text/html');

            const newMainContent = newDoc.querySelector('#main-content');
            const mainContainer = document.querySelector('#main-content');

            mainContainer.innerHTML = newMainContent.innerHTML;
            document.title = newDoc.title;
            focusOnNewContent(mainContainer);
            
            // --- MUDANÇA CRÍTICA AQUI ---
            reinitializePageScripts(); // Chamada da função corrigida

        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            window.location.href = url;
        }
    }

    // --- MUDANÇA CRÍTICA AQUI ---
    // Esta função agora APENAS dispara o evento.
    // Todos os outros scripts (main, theme, validation, MASKS)
    // agora são responsáveis por "ouvir" este evento.
    function reinitializePageScripts() {
        const pageLoadEvent = new CustomEvent('page-loaded');
        document.body.dispatchEvent(pageLoadEvent);
    }

    document.body.addEventListener('click', function(event) {
        const link = event.target.closest('a');

        if (!link || 
            !link.href.startsWith(window.location.origin) || 
            link.href.includes('#') || 
            link.target === '_blank') {
            return;
        }

        event.preventDefault(); 
        const url = link.href;

        if (window.location.href === url) return; 

        loadPageContent(url);
        window.history.pushState({path: url}, '', url);
    });

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.path) {
            loadPageContent(event.state.path);
        } else {
            loadPageContent(window.location.pathname);
        }
    });

})();