/* Este script aplica as máscaras de formatação nos campos do formulário 
   enquanto o usuário digita.
*/

// MUDANÇA (ENTREGA IV): Criamos uma função para poder "re-chamar"
function initializeMasks() {
    
    // Seleciona os inputs DENTRO do <main> atual
    // Isso é importante para o SPA achar os campos novos
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
}

// Roda na primeira carga da página
document.addEventListener('DOMContentLoaded', initializeMasks);

// MUDANÇA (ENTREGA IV): Roda toda vez que o SPA trocar de página
document.body.addEventListener('page-loaded', initializeMasks);