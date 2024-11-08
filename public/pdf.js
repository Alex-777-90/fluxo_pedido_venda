const btPdfGeneration = document.getElementById('button_pdf');

btPdfGeneration.addEventListener("click", () => {
    // Seleciona os elementos que devem ser ocultados na impressão
    const elementsToHide = document.querySelectorAll('.no-print');
    elementsToHide.forEach(el => el.style.display = 'none');

    // Conteúdo do PDF
    const content = document.querySelector('.container');

    // Configuração do arquivo de PDF
    const options = {
        margin: [0, 0, 0, 0], // Sem margem
        filename: 'pedido_venda.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        pagebreak: { mode: 'avoid-all' }
    };

    // Gera o PDF e salva localmente
    html2pdf().set(options).from(content).save().then(() => {
        // Gera o PDF em formato base64 para envio
        html2pdf().set(options).from(content).outputPdf('datauristring').then((pdfDataUri) => {
            const base64Pdf = pdfDataUri.split(',')[1]; // Pega o conteúdo Base64 do PDF

            // Envia o PDF para o servidor via POST
            fetch('/send-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pdfBase64: base64Pdf })
            }).then(response => {
                if (response.ok) {
                    alert("E-mail enviado com sucesso!");

                    // Código para abrir o cliente de e-mail padrão com o link mailto
                    const mailtoLink = `mailto:alxnvn@yahoo.com.br?subject=Pedido de Venda&body=Segue em anexo o pedido de venda.`;
                    window.location.href = mailtoLink;

                    // Verifica se o mailto foi aberto corretamente
                    setTimeout(() => {
                        if (window.location.href !== mailtoLink) {
                            alert("Nenhum aplicativo de e-mail localizado, arquivo salvo em PDF na pasta Download.");
                        }
                    }, 2000);
                } else {
                    alert("Falha ao enviar o e-mail.");
                }
            }).catch(error => {
                alert("Erro ao conectar ao servidor: " + error.message);
            });

            // Restaura a exibição dos elementos após a geração do PDF
            elementsToHide.forEach(el => el.style.display = 'block');
        });
    });
});
