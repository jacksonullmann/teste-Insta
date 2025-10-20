// api/gerar-pdf.js
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).send('Método não permitido');

  const { html } = req.body || {};
  console.log('Body length:', html ? html.length : 0);
  if (!html) return res.status(400).send('HTML não fornecido');

  let browser = null;
  try {
    // Obtenha o caminho do executável chamando a função corretamente
    const execPath = typeof chromium.executablePath === 'function'
      ? await chromium.executablePath()
      : await chromium.executablePath;

    console.log('chromium execPath:', execPath);
    console.log('chromium.args length:', Array.isArray(chromium.args) ? chromium.args.length : typeof chromium.args);

    if (!execPath || typeof execPath !== 'string') {
      console.error('Exec path inválido:', execPath);
      return res.status(500).send('Ambiente sem binário Chromium disponível');
    }

    browser = await puppeteer.launch({
      args: chromium.args || [],
      defaultViewport: { width: 1200, height: 800 },
      executablePath: execPath,
      headless: true
    });
    console.log('Browser launched');

    const page = await browser.newPage();
    await page.emulateMediaType('screen');

    const forcedCSS = `<style>@page{size:A4;margin:20mm}html,body{width:210mm;height:297mm;margin:0;padding:0}body{font-family:Arial,Helvetica,sans-serif}</style>`;
    const documentHTML = `<!doctype html><html><head><meta charset="utf-8"/>${forcedCSS}</head><body>${html}</body></html>`;

    await page.setContent(documentHTML, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
      preferCSSPageSize: true
    });

    console.log('PDF generated, bytes:', pdfBuffer.length);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
    res.setHeader('Content-Length', String(pdfBuffer.length));
    return res.status(200).end(pdfBuffer);
  } catch (err) {
    console.error('Erro gerar-pdf:', err && (err.stack || err.message || err));
    return res.status(500).send('Erro interno ao gerar PDF');
  } finally {
    if (browser) {
      try { await browser.close(); console.log('Browser closed'); } catch (e) { console.warn('Erro fechando browser', e); }
    }
  }
}
