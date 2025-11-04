/* ARQUIVO: js/main.js 
   Script principal para interações do site (ex: menu hambúrguer)
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona o botão hambúrguer e a lista de navegação
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    // Verifica se os elementos existem na página
    if (hamburgerMenu && navList) {
        
        // Adiciona um "escutador" de clique ao botão
        hamburgerMenu.addEventListener('click', function() {
            
            // Alterna a classe 'active' no menu (para mostrar/esconder)
            navList.classList.toggle('active');
            
            // Alterna a classe 'active' no botão (para animar o 'X')
            hamburgerMenu.classList.toggle('active');
        });
    }
});