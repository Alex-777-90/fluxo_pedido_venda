require('dotenv').config();
const nodemailer = require('nodemailer');

exports.sendPdf = async (req, res) => {
    const { pdfBase64 } = req.body;

    // Configuração do nodemailer
    const transporter = nodemailer.createTransport({
       
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3731d11965bdea",
              pass: "0482307161f152"
            }
         
    });

    // Opções do e-mail
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'alxnvn@yahoo.com.br', // Ajuste de acordo com seu uso
        subject: 'Pedido de Venda',
        text: 'Segue em anexo o pedido de venda em PDF.',
        attachments: [
            {
                filename: 'pedido_venda.pdf',
                content: Buffer.from(pdfBase64, 'base64'),
                contentType: 'application/pdf'
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('E-mail enviado com sucesso.');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).send('Erro ao enviar e-mail.');
    }
};
