/* ARQUIVO: js/main.js 
  Script principal para interações do site (menus acessíveis)
  ENTREGA IV - Acessibilidade
*/

(function() {

    // 1. Colocamos toda a lógica de menu dentro de uma função
    function initializeMenus() {
        
        // --- LÓGICA DO MENU HAMBÚRGUER (MOBILE) ---

        const mainContent = document.querySelector('body');
        const hamburgerMenu = mainContent.querySelector('.hamburger-menu');
        const navList = mainContent.querySelector('.nav-list');

        if (hamburgerMenu && navList) {
            // Clona o botão para remover "escutadores" antigos
            const hamburgerClone = hamburgerMenu.cloneNode(true);
            hamburgerMenu.parentNode.replaceChild(hamburgerClone, hamburgerMenu);
            
            hamburgerClone.addEventListener('click', function() {
                navList.classList.toggle('active');
                hamburgerClone.classList.toggle('active');
                
                const isExpanded = hamburgerClone.getAttribute('aria-expanded') === 'true';
                hamburgerClone.setAttribute('aria-expanded', !isExpanded);

        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const navList = document.querySelector('.nav-list');

        if (hamburgerMenu && navList) {
            hamburgerMenu.addEventListener('click', function() {
                navList.classList.toggle('active');
                hamburgerMenu.classList.toggle('active');
                
                const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
                hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
 main
            });
        }

        // --- LÓGICA DO MENU DROPDOWN "PROJETOS" ---

        const dropdownToggle = mainContent.querySelector('.dropdown-toggle');
        const dropdownMenu = mainContent.querySelector('.dropdown-menu');
        const dropdownParent = mainContent.querySelector('.dropdown');

        if (dropdownToggle && dropdownMenu && dropdownParent) {
            // Clona o botão para remover "escutadores" antigos
            const dropdownClone = dropdownToggle.cloneNode(true);
            dropdownToggle.parentNode.replaceChild(dropdownClone, dropdownToggle);

            dropdownClone.addEventListener('click', function() {
                dropdownParent.classList.toggle('active');
                
                const isExpanded = dropdownClone.getAttribute('aria-expanded') === 'true';
                dropdownClone.setAttribute('aria-expanded', !isExpanded);

        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const dropdownParent = document.querySelector('.dropdown');

        if (dropdownToggle && dropdownMenu && dropdownParent) {
            dropdownToggle.addEventListener('click', function() {
                dropdownParent.classList.toggle('active');
                
                const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
                dropdownToggle.setAttribute('aria-expanded', !isExpanded);
 main
            });
        }
    }

    // --- 2. Lógica de "Fechar ao Clicar Fora" ---
    function initializeClickOutside() {

        document.removeEventListener('click', handleOutsideClick); // Remove o antigo
        document.addEventListener('click', handleOutsideClick); // Adiciona o novo
    }
    
    function handleOutsideClick(event) {
        if (!event.target.closest('header')) {
            const navList = document.querySelector('.nav-list');
            const hamburgerMenu = document.querySelector('.hamburger-menu');
            const dropdownParent = document.querySelector('.dropdown');
            const dropdownToggle = document.querySelector('.dropdown-toggle');

            if (navList && navList.classList.contains('active')) {
                navList.classList.remove('active');
                if (hamburgerMenu) {
                    hamburgerMenu.classList.remove('active');
                    hamburgerMenu.setAttribute('aria-expanded', 'false');
                }
            }

            if (dropdownParent && dropdownParent.classList.contains('active')) {
                dropdownParent.classList.remove('active');
                if (dropdownToggle) {
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    }

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
 main

    // --- 3. INICIALIZAÇÃO (MUDANÇA) ---
    
    // Roda quando a página carrega pela primeira vez
    document.addEventListener('DOMContentLoaded', function() {
        initializeMenus();

        initializeClickOutside(); 

        initializeClickOutside(); // Só precisa rodar uma vez
 main
    });

    // Roda toda vez que o SPA carregar uma nova página
    document.body.addEventListener('page-loaded', initializeMenus);

})();