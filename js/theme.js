/* ========================================= */
/* SCRIPT PARA ALTO CONTRASTE (WCAG)       */
/* ENTREGA IV - ACESSIBILIDADE             */
/* ========================================= */

(function() {
    const STORAGE_KEY = 'theme-preference'; // Chave para salvar no localStorage
    const body = document.body;

    // Função para aplicar o tema (seja 'true' ou 'false')
    function applyTheme(isHighContrast) {
        const themeToggle = document.getElementById('theme-toggle'); // Pega o botão

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

    // Função para "ouvir" o clique no botão
    function setupThemeToggle() {
        const themeToggleBtn = document.getElementById('theme-toggle');
        
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', function() {
                // Verifica se a classe 'high-contrast' JÁ EXISTE
                let isHighContrast = body.classList.contains('high-contrast');

                // Inverte o valor (se tinha, remove, se não tinha, adiciona)
                isHighContrast = !isHighContrast;
                
                // 1. Aplica a mudança visual
                applyTheme(isHighContrast);
                
                // 2. Salva a preferência no localStorage
                localStorage.setItem(STORAGE_KEY, isHighContrast);
            });
        }
    }
    
    // Função para carregar a preferência salva
    function loadThemePreference() {
        // Pega o valor salvo (pode ser 'true', 'false', ou null)
        const savedPreference = localStorage.getItem(STORAGE_KEY);
        
        // Se for 'true', aplica o tema
        applyTheme(savedPreference === 'true');
    }

    // --- INICIALIZAÇÃO ---
    
    // 1. Carrega a preferência salva IMEDIATAMENTE.
    // Isso evita o "flash" do tema claro antes do escuro.
    loadThemePreference();
    
    // 2. Configura o botão quando o DOM está pronto (primeira carga)
    document.addEventListener('DOMContentLoaded', setupThemeToggle);
    
    // 3. Re-configura o botão toda vez que o SPA troca de página
    document.body.addEventListener('page-loaded', setupThemeToggle);

})();