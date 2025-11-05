/* ========================================= */
/* SCRIPT PARA VALIDAÇÃO DE CONSISTÊNCIA      */
/* ENTREGA IV - ACESSIBILIDADE (WCAG)       */
/* ========================================= */

(function() {

    // Função para rodar a lógica de validação
    function initializeValidation() {
        
        // Seleciona o form DENTRO do <main> atual
        const mainContent = document.querySelector('#main-content');
        if (!mainContent) return;

        const form = mainContent.querySelector('form');
        if (!form) return; 

        // 1. Seleciona os campos
        const nomeInput = mainContent.querySelector('#nome');
        const emailInput = mainContent.querySelector('#email');
        const nascimentoInput = mainContent.querySelector('#nascimento'); 
        const cpfInput = mainContent.querySelector('#cpf');
        const telefoneInput = mainContent.querySelector('#telefone');
        const cepInput = mainContent.querySelector('#cep'); 
        const enderecoInput = mainContent.querySelector('#endereco'); 
        const cidadeInput = mainContent.querySelector('#cidade'); 
        const estadoInput = mainContent.querySelector('#estado'); 

        const alertSucesso = mainContent.querySelector('.alert-sucesso');
        const alertPerigo = mainContent.querySelector('.alert-perigo');

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
            if (!inputElement) return;
            
            const errorId = inputElement.getAttribute('aria-describedby');
            const errorElement = document.getElementById(errorId);
            
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('is-visible');
            }
            
            inputElement.classList.add('is-invalid');
            inputElement.classList.remove('is-valid'); 
            inputElement.setAttribute('aria-invalid', 'true');
        }

        // 4. Função Genérica para Limpar Erro
        function clearError(inputElement) {
            if (!inputElement) return;

            const errorId = inputElement.getAttribute('aria-describedby');
            const errorElement = document.getElementById(errorId);
            
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('is-visible');
            }
            
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid'); 
            inputElement.setAttribute('aria-invalid', 'false');
        }
        
        // Funções de 5 a 13...
        function validateNome() {
            if (nomeInput && nomeInput.value.trim().length > 3) {
                clearError(nomeInput); return true;
            } else if (nomeInput) {
                showError(nomeInput, errorMessages.nome); return false;
            } return false;
        }
        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && emailRegex.test(emailInput.value)) {
                clearError(emailInput); return true;
            } else if (emailInput) {
                showError(emailInput, errorMessages.email); return false;
            } return false;
        }
        function validateCpf() {
            const cpfLimpo = cpfInput ? cpfInput.value.replace(/\D/g, '') : ''; 
            const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; 
            if (cpfInput && cpfLimpo.length === 11 && cpfRegex.test(cpfInput.value)) { 
                clearError(cpfInput); return true;
            } else if (cpfInput) {
                showError(cpfInput, errorMessages.cpf); return false;
            } return false;
        }
        function validateTelefone() {
            const telefoneLimpo = telefoneInput ? telefoneInput.value.replace(/\D/g, '') : '';
            const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/; 
            if (telefoneInput && telefoneLimpo.length >= 10 && telefoneLimpo.length <= 11 && telefoneRegex.test(telefoneInput.value)) {
                clearError(telefoneInput); return true;
            } else if (telefoneInput) {
                showError(telefoneInput, errorMessages.telefone); return false;
            } return false;
        }
        function validateCep() {
            const cepLimpo = cepInput ? cepInput.value.replace(/\D/g, '') : '';
            const cepRegex = /^\d{5}-\d{3}$/;
            if (cepInput && cepLimpo.length === 8 && cepRegex.test(cepInput.value)) {
                clearError(cepInput); return true;
            } else if (cepInput) {
                showError(cepInput, errorMessages.cep); return false;
            } return false;
        }
        function validateNascimento() {
            if (!nascimentoInput || nascimentoInput.value === "") {
                if (nascimentoInput) showError(nascimentoInput, errorMessages.nascimento);
                return false;
            }
            const dataInputDate = new Date(nascimentoInput.value + 'T00:00:00');
            const hoje = new Date();
            const idadeMinima = 18;
            let idade = hoje.getFullYear() - dataInputDate.getFullYear();
            const mes = hoje.getMonth() - dataInputDate.getMonth();
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
        function validateEndereco() {
            if (enderecoInput && enderecoInput.value.trim().length > 5) {
                clearError(enderecoInput); return true;
            } else if (enderecoInput) {
                showError(enderecoInput, errorMessages.endereco); return false;
            } return false;
        }
        function validateCidade() {
            if (cidadeInput && cidadeInput.value.trim().length > 2) {
                clearError(cidadeInput); return true;
            } else if (cidadeInput) {
                showError(cidadeInput, errorMessages.cidade); return false;
            } return false;
        }
        function validateEstado() {
            if (estadoInput && estadoInput.value.trim().length === 2 && /^[a-zA-Z]+$/.test(estadoInput.value)) {
                clearError(estadoInput); return true;
            } else if (estadoInput) {
                showError(estadoInput, errorMessages.estado); return false;
            } return false;
        }

        // 14. Adiciona os "Escutadores de Eventos"
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
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const allValidations = [
                validateNome(), validateEmail(), validateNascimento(),
                validateCpf(), validateTelefone(), validateCep(),
                validateEndereco(), validateCidade(), validateEstado()
            ];

            if (allValidations.includes(false)) {
                const firstInvalid = mainContent.querySelector('[aria-invalid="true"]');
                if (firstInvalid) {
                    firstInvalid.focus();
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                if (alertPerigo) alertPerigo.classList.add('is-visible');
                if (alertSucesso) alertSucesso.classList.remove('is-visible');
            } else {
                console.log("Formulário válido. Enviando...");
                if (alertSucesso) {
                    alertSucesso.classList.add('is-visible');
                    alertSucesso.setAttribute('tabindex', '-1'); // Para foco
                    alertSucesso.focus();
                    window.scrollTo(0, 0); 
                }
                if (alertPerigo) alertPerigo.classList.remove('is-visible');
            }
        });
        
        form.classList.add('js-validation-active');
    }

    // --- MUDANÇA (ENTREGA IV) ---
    // Roda a validação quando a página carrega
    document.addEventListener('DOMContentLoaded', initializeValidation);
    // Roda a validação quando o SPA troca o conteúdo
    document.body.addEventListener('page-loaded', initializeValidation);

})();