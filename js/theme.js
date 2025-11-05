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

    const STORAGE_KEY = 'theme-preference'; // Chave para salvar no localStorage
    const body = document.body;

    // Função para aplicar o tema (seja 'true' ou 'false')
    function applyTheme(isHighContrast) {
        const themeToggle = document.getElementById('theme-toggle'); // Pega o botão
 main

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
 main
                localStorage.setItem(STORAGE_KEY, isHighContrast);
            });
        }
    }
    

    function loadThemePreference() {
        const savedPreference = localStorage.getItem(STORAGE_KEY);

    // Função para carregar a preferência salva
    function loadThemePreference() {
        // Pega o valor salvo (pode ser 'true', 'false', ou null)
        const savedPreference = localStorage.getItem(STORAGE_KEY);
        
        // Se for 'true', aplica o tema
 main
        applyTheme(savedPreference === 'true');
    }

    // --- INICIALIZAÇÃO ---
    

    loadThemePreference(); // Roda imediatamente
    
    // Roda na primeira carga
    document.addEventListener('DOMContentLoaded', setupThemeToggle);
    
    // Roda toda vez que o SPA troca de página

    // 1. Carrega a preferência salva IMEDIATAMENTE.
    // Isso evita o "flash" do tema claro antes do escuro.
    loadThemePreference();
    
    // 2. Configura o botão quando o DOM está pronto (primeira carga)
    document.addEventListener('DOMContentLoaded', setupThemeToggle);
    
    // 3. Re-configura o botão toda vez que o SPA troca de página
 main
    document.body.addEventListener('page-loaded', setupThemeToggle);

})();