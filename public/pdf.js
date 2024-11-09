const btPdfGeneration = document.getElementById('button_pdf');

btPdfGeneration.addEventListener("click", () => {

    const elementsToHide = document.querySelectorAll('.no-print');
    elementsToHide.forEach(el => el.style.display = 'none');

    const content = document.querySelector('.container');

    const options = {
        margin: [0, 0, 0, 0],
        filename: 'pedido_venda.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        pagebreak: { mode: 'avoid-all' }
    };

    html2pdf().set(options).from(content).save().then(async () => {
        alert('PDF criado e baixado no downloads');

        const pdfBase64 = await html2pdf().set(options).from(content).outputPdf('datauristring');
        try {
            const response = await fetch('/send-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pdfBase64 })
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
