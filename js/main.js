/* ARQUIVO: js/main.js 
  Script principal para interações do site (menus acessíveis)
  ENTREGA IV - Acessibilidade
*/

(function() {

    // 1. Colocamos toda a lógica de menu dentro de uma função
    function initializeMenus() {
        
        // --- LÓGICA DO MENU HAMBÚRGUER (MOBILE) ---
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const navList = document.querySelector('.nav-list');

        if (hamburgerMenu && navList) {
            hamburgerMenu.addEventListener('click', function() {
                navList.classList.toggle('active');
                hamburgerMenu.classList.toggle('active');
                
                const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
                hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
            });
        }

        // --- LÓGICA DO MENU DROPDOWN "PROJETOS" ---
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const dropdownParent = document.querySelector('.dropdown');

        if (dropdownToggle && dropdownMenu && dropdownParent) {
            dropdownToggle.addEventListener('click', function() {
                dropdownParent.classList.toggle('active');
                
                const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
                dropdownToggle.setAttribute('aria-expanded', !isExpanded);
            });
        }
    }

    // --- 2. Lógica de "Fechar ao Clicar Fora" ---
    function initializeClickOutside() {
        document.addEventListener('click', function(event) {
            if (!event.target.closest('header')) {
                const navList = document.querySelector('.nav-list');
                const hamburgerMenu = document.querySelector('.hamburger-menu');
                const dropdownParent = document.querySelector('.dropdown');
                const dropdownToggle = document.querySelector('.dropdown-toggle');

                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    hamburgerMenu.classList.remove('active');
                    hamburgerMenu.setAttribute('aria-expanded', 'false');
                }

                if (dropdownParent && dropdownParent.classList.contains('active')) {
                    dropdownParent.classList.remove('active');
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // --- 3. INICIALIZAÇÃO (MUDANÇA) ---
    
    // Roda quando a página carrega pela primeira vez
    document.addEventListener('DOMContentLoaded', function() {
        initializeMenus();
        initializeClickOutside(); // Só precisa rodar uma vez
    });

    // Roda toda vez que o SPA carregar uma nova página
    document.body.addEventListener('page-loaded', initializeMenus);

})();