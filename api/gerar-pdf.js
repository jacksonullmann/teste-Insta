// api/gerar-pdf.js
// Next.js API route que recebe { html } via POST e retorna um PDF
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const { html } = req.body;
    if (!html) return res.status(400).send('HTML faltando');

    // Carregar puppeteer de forma compatível com serverless (Vercel) ou ambiente normal
    let browser = null;
    let puppeteer;
    let launchOptions = { args: ['--no-sandbox', '--disable-setuid-sandbox'] };

    try {
      // tenta chrome-aws-lambda (bom para Vercel / Lambda)
      // eslint-disable-next-line import/no-extraneous-dependencies
      const chrome = await import('chrome-aws-lambda');
      puppeteer = await import('puppeteer-core');
      const executablePath = await chrome.executablePath;
      if (executablePath) launchOptions.executablePath = executablePath;
      launchOptions.args = (chrome.args || []).concat(launchOptions.args || []);
      launchOptions.headless = chrome.headless;
      browser = await puppeteer.launch(launchOptions);
    } catch (err) {
      // fallback para puppeteer local (quando não estiver em serverless)
      // eslint-disable-next-line import/no-extraneous-dependencies
      puppeteer = await import('puppeteer');
      browser = await puppeteer.launch(launchOptions);
    }

    const page = await browser.newPage();

    // Emular media type "screen" para aplicar estilos como no navegador
    try {
      await page.emulateMediaType('screen');
    } catch (e) {
      // ignore se não suportado
    }

    // Define base tag se quiser resolver assets relativos (opcional)
    // se você usa assets relativos, insira a URL base correta aqui
    // const baseUrl = 'https://seu-dominio.com/';
    // const htmlWithBase = html.replace('<head>', `<head><base href="${baseUrl}">`);

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Esperar carregamento de fontes
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    });

    // pequena espera extra para recursos remotos (opcional)
    await page.waitForTimeout(150);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error('Erro gerar-pdf:', err);
    try { if (browser) await browser.close(); } catch (_) {}
    res.status(500).send('Erro ao gerar PDF');
  }
}
