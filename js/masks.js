/* Este script aplica as máscaras de formatação nos campos do formulário 
   enquanto o usuário digita.
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // Máscara para CPF (000.000.000-00)
    const inputCPF = document.getElementById('cpf');
    if (inputCPF) {
        inputCPF.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após 3 dígitos
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após 6 dígitos
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona traço antes dos 2 últimos dígitos
            e.target.value = value;
        });
    }

    // Máscara para Telefone ( (00) 90000-0000 )
    const inputTelefone = document.getElementById('telefone');
    if (inputTelefone) {
        inputTelefone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses nos dois primeiros dígitos
            value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca hífen após o 9º dígito (celular)
            // Se for telefone fixo (8 dígitos), ajusta o hífen
            if (value.length <= 14) { // (xx) xxxx-xxxx
                 value = value.replace(/(\d{4})(\d{1,4})$/, '$1-$2');
            }
            e.target.value = value;
        });
    }

    // Máscara para CEP (00000-000)
    const inputCEP = document.getElementById('cep');
    if (inputCEP) {
        inputCEP.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona hífen após 5 dígitos
            e.target.value = value;
        });
    }
});