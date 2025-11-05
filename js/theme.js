/* ========================================= */
/* SCRIPT PARA ALTO CONTRASTE (WCAG)       */
/* ENTREGA IV - ACESSIBILIDADE             */
/* ========================================= */

(function() {
    const STORAGE_KEY = 'theme-preference'; 
    const body = document.body;

    function applyTheme(isHighContrast) {
        // Busca o botão DENTRO do header atual
        const themeToggle = document.querySelector('#theme-toggle'); 

        if (isHighContrast) {
            body.classList.add('high-contrast');
            if (themeToggle) {
                themeToggle.setAttribute('aria-label', 'Desativar modo de alto contraste');
            }
        } else {
            body.classList.remove('high-contrast');
            if (themeToggle) {
                themeToggle.setAttribute('aria-label', 'Ativar modo de alto contraste');
            }
        }
    }

    function setupThemeToggle() {
        // Busca o botão DENTRO do header atual
        const themeToggleBtn = document.querySelector('#theme-toggle');
        
        if (themeToggleBtn) {
            // Clona o botão para remover "escutadores" antigos
            const themeToggleClone = themeToggleBtn.cloneNode(true);
            themeToggleBtn.parentNode.replaceChild(themeToggleClone, themeToggleBtn);
            
            themeToggleClone.addEventListener('click', function() {
                let isHighContrast = body.classList.contains('high-contrast');
                isHighContrast = !isHighContrast;
                
                applyTheme(isHighContrast);
                localStorage.setItem(STORAGE_KEY, isHighContrast);
            });
        }
    }
    
    function loadThemePreference() {
        const savedPreference = localStorage.getItem(STORAGE_KEY);
        applyTheme(savedPreference === 'true');
    }

    // --- INICIALIZAÇÃO ---
    
    loadThemePreference(); // Roda imediatamente
    
    // Roda na primeira carga
    document.addEventListener('DOMContentLoaded', setupThemeToggle);
    
    // Roda toda vez que o SPA troca de página
    document.body.addEventListener('page-loaded', setupThemeToggle);

})();