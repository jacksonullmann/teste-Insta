// api/gerar-pdf.js
import fs from 'fs/promises';
import path from 'path';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

const STYLES_PATH = path.join(process.cwd(), 'docs', 'styles.css');
const DEFAULT_CSS = `
  @page { size: A4; margin: 20mm; }
  html, body { width: 210mm; height: 297mm; margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #111; background: #fff; font-size: 12pt; }
  img { max-width: 100%; height: auto; display: block; }
  .page-break { page-break-after: always; }
`;

async function loadCss() {
  try {
    const css = await fs.readFile(STYLES_PATH, 'utf8');
    return css;
  } catch (err) {
    console.warn('styles.css não encontrado, usando CSS padrão');
    return DEFAULT_CSS;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).send('Método não permitido');

  const { html, baseUrl } = req.body || {};
  if (!html) return res.status(400).send('HTML não fornecido');

  let browser = null;
  try {
    const css = await loadCss();

    const execPath = typeof chromium.executablePath === 'function'
      ? await chromium.executablePath()
      : await chromium.executablePath;

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

    const page = await browser.newPage();

    try { await page.emulateMediaType('screen'); } catch (e) { /* ignora se não suportar */ }

    const baseTag = baseUrl ? `<base href="${baseUrl}">` : '';
    const head = `
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Relatório</title>
      ${baseTag}
      <style>${css}</style>
    `;

    const finalHtml = `<!doctype html><html lang="pt-BR"><head>${head}</head><body>${html}</body></html>`;

    console.log('HTML enviado (preview):', finalHtml.slice(0, 1000));

    await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

    try {
      await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      });
    } catch (e) {
      console.warn('Erro ao aguardar document.fonts.ready:', e && e.message);
    }

    await page.waitForTimeout(150);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    return res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error('Erro gerar-pdf:', err);
    return res.status(500).send('Erro ao gerar PDF');
  } finally {
    if (browser) {
      try { await browser.close(); } catch (e) { console.warn('Erro fechando browser', e); }
    }
  }
}
