/* Este script aplica as máscaras de formatação nos campos do formulário 
   enquanto o usuário digita.
*/

// MUDANÇA (ENTREGA IV): Criamos uma função para poder "re-chamar"
function initializeMasks() {
    
    const mainContent = document.querySelector('#main-content');
    if (!mainContent) return;

    const inputCPF = mainContent.querySelector('#cpf');
    if (inputCPF) {
        // Remove eventuais "escutadores" antigos para evitar duplicação
        inputCPF.replaceWith(inputCPF.cloneNode(true));
        // Pega o campo "novo"
        mainContent.querySelector('#cpf').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); 
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); 
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); 
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
            e.target.value = value;
        });
    }

    const inputTelefone = mainContent.querySelector('#telefone');
    if (inputTelefone) {
        inputTelefone.replaceWith(inputTelefone.cloneNode(true));
        mainContent.querySelector('#telefone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); 
            value = value.replace(/(\d{5})(\d)/, '$1-$2'); 
            if (value.length <= 14) { 
                value = value.replace(/(\d{4})(\d{1,4})$/, '$1-$2');
            }
            e.target.value = value;
        });
    }

    const inputCEP = mainContent.querySelector('#cep');
    if (inputCEP) {
        inputCEP.replaceWith(inputCEP.cloneNode(true));
        mainContent.querySelector('#cep').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{5})(\d)/, '$1-$2'); 
            e.target.value = value;
        });
    }

// ==================================================
    //  BLOCO CORRIGIDO - DATA DE NASCIMENTO (ID="nascimento")
    // ==================================================
    const inputData = mainContent.querySelector('#nascimento'); // <-- ID CORRIGIDO
    if (inputData) {
        inputData.replaceWith(inputData.cloneNode(true));
        mainContent.querySelector('#nascimento').addEventListener('input', function(e) { // <-- ID CORRIGIDO
            let value = e.target.value.replace(/\D/g, ''); 

            // Trava o total de dígitos em 8 (ddmmyyyy)
            if (value.length > 8) {
                value = value.substring(0, 8);
            }

            // Aplica as barras
            value = value.replace(/(\d{2})(\d)/, '$1/$2');       // dd/m
            value = value.replace(/(\d{2}\/)(\d{2})(\d)/, '$1$2/$3'); // dd/mm/y
            
            e.target.value = value;
        });
    }
    // ==================================================
}

// Roda na primeira carga da página
document.addEventListener('DOMContentLoaded', initializeMasks);

// MUDANÇA (ENTREGA IV): Roda toda vez que o SPA trocar de página
document.body.addEventListener('page-loaded', initializeMasks);