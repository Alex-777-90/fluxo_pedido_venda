require('dotenv').config();
const nodemailer = require('nodemailer');

exports.sendPdf = async (req, res) => {

    const { pdfBase64 } = req.body;

    if (!pdfBase64) {
        return res.status(400).send('Nenhum PDF foi recebido.');
    }

    try {
        // Criação do transporte do Nodemailer
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587, // ou 587 para TLS
            secure: false, // true para 465, false para outras portas
            auth: {
                user: "kidszonekidszonemail@gmail.com",
                pass: 'yscb pzxb vvoa eftk'

            },
            tls: {
                rejectUnauthorized: false // Desativa a verificação do certificado
            }
        });


        transporter.verify((error, success) => {
            if (error) {
                console.error('Erro de verificação SMTP:', error);
            } else {
                console.log('Servidor SMTP está pronto para enviar mensagens.');
            }
        });


        // Configurando o e-mail
        await transporter.sendMail({
            from: 'alxnvn@hotmail.com',
            to: 'alxnvn@yahoo.com.br',
            subject: 'PDF Gerado',
            text: 'Segue em anexo o PDF gerado.',
            attachments: [
                {
                    filename: 'pedido_venda.pdf',
                    content: pdfBase64.split("base64")[1],
                    encoding: 'base64'
                }
            ]
        });

        res.status(200).send('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        res.status(500).send('Erro ao enviar o e-mail');
    }
};

