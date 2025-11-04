/* ========================================= */
/* SCRIPT PARA VALIDAÇÃO DE CONSISTÊNCIA     */
/* ENTREGA III - REQUISITO OBRIGATÓRIO       */
/* ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Seleciona o formulário e os campos
    const form = document.querySelector('form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const nascimentoInput = document.getElementById('nascimento'); 
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep'); 
    const enderecoInput = document.getElementById('endereco'); 
    const cidadeInput = document.getElementById('cidade'); 
    const estadoInput = document.getElementById('estado'); 

    // Seleciona os alertas
    const alertSucesso = document.querySelector('.alert-sucesso');
    const alertPerigo = document.querySelector('.alert-perigo');

    // 2. Objeto de Erros de Validação
    const errorMessages = {
        nome: "Nome é obrigatório e deve ter mais de 3 caracteres.",
        email: "Por favor, insira um e-mail válido.",
        nascimento: "Data de nascimento inválida ou você deve ser maior de 18 anos.",
        cpf: "CPF inválido. Use o formato 000.000.000-00.",
        telefone: "Telefone inválido. Use o formato (00) 90000-0000.",
        cep: "CEP inválido. Use o formato 00000-000.", 
        endereco: "Endereço é obrigatório (mínimo 6 caracteres).", 
        cidade: "Cidade é obrigatória.", 
        estado: "Estado (UF) é obrigatório e deve ter 2 letras." 
    };

    // 3. Função Genérica para Mostrar Erro
    function showError(inputElement, message) {
        // Verifica se o inputElement existe
        if (!inputElement) return;
        
        const errorElement = inputElement.nextElementSibling; 
        
        // Verifica se o errorElement (o <small>) existe
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.classList.add('is-visible');
        }
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid'); 
    }

    // 4. Função Genérica para Limpar Erro
    function clearError(inputElement) {
        if (!inputElement) return;

        const errorElement = inputElement.nextElementSibling;
        
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
            errorElement.classList.remove('is-visible');
        }
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid'); 
    }
    
    // 5. Função de Validação do Nome
    function validateNome() {
        if (nomeInput && nomeInput.value.trim().length > 3) {
            clearError(nomeInput);
            return true;
        } else if (nomeInput) {
            showError(nomeInput, errorMessages.nome);
            return false;
        }
        return false; // Retorna false se o input não existir
    }
    
    // 6. Função de Validação do E-mail
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput && emailRegex.test(emailInput.value)) {
            clearError(emailInput);
            return true;
        } else if (emailInput) {
            showError(emailInput, errorMessages.email);
            return false;
        }
        return false;
    }

    // 7. Função de Validação do CPF
    function validateCpf() {
        const cpfLimpo = cpfInput.value.replace(/\D/g, ''); 
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; 
        
        if (cpfInput && cpfLimpo.length === 11 && cpfRegex.test(cpfInput.value)) { 
            clearError(cpfInput);
            return true;
        } else if (cpfInput) {
            showError(cpfInput, errorMessages.cpf);
            return false;
        }
        return false;
    }

    // 8. Função de Validação do Telefone
    function validateTelefone() {
        const telefoneLimpo = telefoneInput.value.replace(/\D/g, '');
        const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/; 
        
        if (telefoneInput && telefoneLimpo.length >= 10 && telefoneLimpo.length <= 11 && telefoneRegex.test(telefoneInput.value)) {
            clearError(telefoneInput);
            return true;
        } else if (telefoneInput) {
            showError(telefoneInput, errorMessages.telefone);
            return false;
        }
        return false;
    }

    // 9. Função de Validação do CEP
    function validateCep() {
        const cepLimpo = cepInput.value.replace(/\D/g, '');
        const cepRegex = /^\d{5}-\d{3}$/;
        if (cepInput && cepLimpo.length === 8 && cepRegex.test(cepInput.value)) {
            clearError(cepInput);
            return true;
        } else if (cepInput) {
            showError(cepInput, errorMessages.cep);
            return false;
        }
        return false;
    }

    // 10. Função de Validação de Data de Nascimento (Exemplo: Maior de 18 anos)
    function validateNascimento() {
        if (!nascimentoInput || nascimentoInput.value === "") {
             if (nascimentoInput) showError(nascimentoInput, errorMessages.nascimento);
            return false;
        }
        
        const dataNascimento = new Date(nascimentoInput.value);
        const hoje = new Date();
        const idadeMinima = 18;
        
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mes = hoje.getMonth() - dataNascimento.getMonth();

        // Ajuste para o fuso horário (input date pode vir como T00:00:00Z)
        const dataInputDate = new Date(nascimentoInput.value + 'T00:00:00');

        if (mes < 0 || (mes === 0 && hoje.getDate() < dataInputDate.getDate())) {
            idade--;
        }

        if (idade < idadeMinima) {
            showError(nascimentoInput, errorMessages.nascimento);
            return false;
        } else {
            clearError(nascimentoInput);
            return true;
        }
    }
    
    // 11. Função de Validação de Endereço
    function validateEndereco() {
        if (enderecoInput && enderecoInput.value.trim().length > 5) {
            clearError(enderecoInput);
            return true;
        } else if (enderecoInput) {
            showError(enderecoInput, errorMessages.endereco);
            return false;
        }
        return false;
    }

    // 12. Função de Validação de Cidade
    function validateCidade() {
        if (cidadeInput && cidadeInput.value.trim().length > 2) {
            clearError(cidadeInput);
            return true;
        } else if (cidadeInput) {
            showError(cidadeInput, errorMessages.cidade);
            return false;
        }
        return false;
    }

    // 13. Função de Validação de Estado (UF)
    function validateEstado() {
        if (estadoInput && estadoInput.value.trim().length === 2 && /^[a-zA-Z]+$/.test(estadoInput.value)) {
            clearError(estadoInput);
            return true;
        } else if (estadoInput) {
            showError(estadoInput, errorMessages.estado);
            return false;
        }
        return false;
    }

    // 14. Adiciona os "Escutadores de Eventos" (Blur = quando sai do campo)
    // A verificação 'if (nomeInput)' garante que o script não quebre em outras páginas
    if (nomeInput) nomeInput.addEventListener('blur', validateNome);
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (nascimentoInput) nascimentoInput.addEventListener('blur', validateNascimento);
    if (cpfInput) cpfInput.addEventListener('blur', validateCpf);
    if (telefoneInput) telefoneInput.addEventListener('blur', validateTelefone);
    if (cepInput) cepInput.addEventListener('blur', validateCep);
    if (enderecoInput) enderecoInput.addEventListener('blur', validateEndereco);
    if (cidadeInput) cidadeInput.addEventListener('blur', validateCidade);
    if (estadoInput) estadoInput.addEventListener('blur', validateEstado);
    
    // 15. Validação na Hora de Enviar o Formulário
    if (form) {
        form.addEventListener('submit', function(event) {
            // Previne o envio de qualquer forma, para podermos ver os alertas
            event.preventDefault(); 
            
            // Roda todas as validações de novo
            const allValidations = [
                validateNome(),
                validateEmail(),
                validateNascimento(),
                validateCpf(),
                validateTelefone(),
                validateCep(),
                validateEndereco(),
                validateCidade(),
                validateEstado()
            ];

            // Se QUALQUER um for inválido (false), previne o envio.
            if (allValidations.includes(false)) {
                
                const firstInvalid = document.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                console.log("Formulário inválido. Envio bloqueado.");

                // Mostrar Alerta de Erro
                if (alertPerigo) alertPerigo.classList.add('is-visible');
                if (alertSucesso) alertSucesso.classList.remove('is-visible');

            } else {
                console.log("Formulário válido. Enviando...");
                // Em um projeto real, aqui você removeria o event.preventDefault() 
                // ou enviaria os dados via fetch/AJAX.
                // form.submit(); // Descomente para enviar de verdade

                // Mostrar Alerta de Sucesso
                if (alertSucesso) alertSucesso.classList.add('is-visible');
                if (alertPerigo) alertPerigo.classList.remove('is-visible');
            }
        });
    }

    // Adiciona uma classe ao form para aplicar estilos específicos de JS (se necessário)
    if (form) {
        form.classList.add('js-validation-active');
    }

});