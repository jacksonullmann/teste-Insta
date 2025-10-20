// api/gerar-pdf.js
import chromium from 'chrome-aws-lambda';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Método não permitido');
  const { html } = req.body;
  if (!html) return res.status(400).send('HTML não fornecido');

  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1200, height: 800 },
      executablePath: await chromium.executablePath,
      headless: chromium.headless
    });

    const page = await browser.newPage();

    // CSS que garante layout A4 e força escala de fonte previsível
    const forcedCSS = `
      <style>
        @page { size: A4; margin: 20mm; }
        html, body { width: 210mm; height: 297mm; margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, Helvetica, sans-serif; font-size: 12pt; color: #111; background: #fff; }
        /* Ajustes úteis para evitar que elementos posicionados quebrem layout */
        img { max-width: 100%; height: auto; display: block; }
        .page-break { page-break-after: always; }
      </style>
    `;

    // Constrói o documento completo
    const documentHTML = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          ${forcedCSS}
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    await page.setContent(documentHTML, { waitUntil: 'networkidle0' });

    // Opções de PDF: A4, margens em mm, imprime backgrounds
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
    return res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error('Erro gerar PDF:', err);
    return res.status(500).send('Erro interno ao gerar PDF');
  }
}
