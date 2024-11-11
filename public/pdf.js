// Exporta a constante `options` para ser usada em outros arquivos
export const options = {
    margin: [0, 0, 0, 0],
    filename: '', // valor padrão, será sobrescrito na função
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    pagebreak: { mode: 'avoid-all' }
};

// Exporta `btPdfGeneration` para ser usado em outros arquivos
export const btPdfGeneration = document.getElementById('button_pdf');

// Exporta a constante `content` para uso externo
export const content = document.querySelector('.container');

btPdfGeneration.addEventListener("click", async () => {

    const elementsToHide = document.querySelectorAll('.no-print');
    elementsToHide.forEach(el => el.style.display = 'none');

    const razaoSocial = document.getElementById('razao_social').value;
    const codCliente = document.getElementById('cod_cliente').value;
    options.filename = `Pedido de Venda ${razaoSocial} - ${codCliente}.pdf`; // Atualiza o filename

    html2pdf().set(options).from(content).save().then(async () => {
        alert('PDF criado e baixado no downloads');

        const pdfBase64 = await html2pdf().set(options).from(content).outputPdf('datauristring');

        // Adiciona a etapa de confirmação de envio do e-mail
        const confirmSend = confirm("Você deseja realmente enviar este e-mail?");
        if (!confirmSend) {
            alert("Envio de e-mail cancelado.");
            elementsToHide.forEach(el => el.style.display = 'block');
            return; // Sai da função se o usuário clicar em "Não"
        }

        try {
            const response = await fetch('/send-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pdfBase64, razaoSocial, codCliente })
            });

            const result = await response.text();
            alert(result); // Mostra mensagem de sucesso ou erro
        } catch (error) {
            console.error('Erro ao enviar o PDF:', error);
            alert('Erro ao enviar o PDF por e-mail');
        }

        elementsToHide.forEach(el => el.style.display = 'block');
    });
});
