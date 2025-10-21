// print.js — Arquivo final completo (mantida a lógica original, só alterada a barra)
var ENDPOINT = 'https://teste-insta.vercel.app/api/gerar-pdf';

document.addEventListener('DOMContentLoaded', function () {
  var btnDownload = document.getElementById('downloadPdf');
  var btnCalc = document.getElementById('calc');
  var btnReset = document.getElementById('reset');

  if (btnCalc) btnCalc.addEventListener('click', function () {
    var resultCard = document.getElementById('result') || document.querySelector('.result');
    if (resultCard) {
      var s = resultCard.querySelector('#score'); if (s) s.textContent = '—';
      var t = resultCard.querySelector('#tier'); if (t) t.textContent = 'Diagnóstico pronto';
      var su = resultCard.querySelector('#summary'); if (su) su.textContent = 'Relatório disponível para exportação.';
      if (typeof resultCard.focus === 'function') resultCard.focus();
    }
    if (btnDownload) btnDownload.disabled = false;
  });

  if (btnReset) btnReset.addEventListener('click', function () {
    var resultCard = document.getElementById('result') || document.querySelector('.result');
    if (resultCard) {
      var sc = resultCard.querySelector('#score'); if (sc) sc.textContent = '--';
      var ti = resultCard.querySelector('#tier'); if (ti) ti.textContent = 'Aguardando';
      var su = resultCard.querySelector('#summary'); if (su) su.textContent = '';
    }
    if (btnDownload) btnDownload.disabled = true;
  });

  // --- Barra de progresso ajustada para container fixo ---
  (function ensureProgressBar() {
    var container = document.getElementById('pdf-progress-container');
    if (!container || !btnDownload) return;

    // cria barra se não existir
    var existing = document.getElementById('pdf-progress');
    if (!existing) {
      var wrap = document.createElement('div');
      wrap.id = 'pdf-progress';
      wrap.className = 'pdf-progress';
      wrap.innerHTML = `
        <div class="shell"><div class="bar" id="pdf-bar" aria-hidden="true"></div></div>
        <div class="meta">
          <div class="num" id="pdf-num">0%</div>
          <div class="sub" id="pdf-sub"></div>
        </div>
      `;
      container.appendChild(wrap);
      existing = wrap;
    }

    var bar = document.getElementById('pdf-bar');
    var num = document.getElementById('pdf-num');
    var sub = document.getElementById('pdf-sub');

    // estado interno
    var revealNumericFlag = false;

    // API compatível com o código original
    window.__pdfProgress = {
      overlay: existing, // mantemos referência, embora não seja overlay absoluto
      shadow: null, // não usamos shadow DOM no novo modelo
      setWidth: function (pct) {
        try { bar.style.width = Math.max(0, Math.min(100, Math.round(pct))) + '%'; } catch (e) {}
      },
      setNumVisible: function (pct, visible) {
        try {
          num.textContent = Math.max(0, Math.min(100, Math.round(pct))) + '%';
          num.style.visibility = visible ? 'visible' : 'hidden';
          num.style.opacity = visible ? '1' : '0';
        } catch (e) {}
      },
      setSub: function (t) {
        try { sub.textContent = t || ''; } catch (e) {}
      },
      setDotGood: function (g) {
        // no layout novo não há "dot", mantemos no-op para compatibilidade
      },
      setInactiveClass: function (v) {
        try {
          if (v) existing.classList.add('inactive');
          else existing.classList.remove('inactive');
        } catch (e) {}
      },
      progressBarPercent: function () {
        try {
          var w = bar.style.width || '0%';
          return parseInt(String(w).replace('%', ''), 10) || 0;
        } catch (e) { return 0; }
      },
      revealNumericFlag: revealNumericFlag,
      __internal: { bar: bar, num: num, root: existing }
    };

    // No modelo novo, apenas revelamos o número no primeiro clique (compatível)
    btnDownload.addEventListener('click', function onFirstReveal() {
      window.__pdfProgress.revealNumericFlag = true;
      window.__pdfProgress.setNumVisible(window.__pdfProgress.progressBarPercent(), true);
      window.__pdfProgress.setInactiveClass(false);
      btnDownload.removeEventListener('click', onFirstReveal);
    }, { once: true });

    // estado inicial
    window.__pdfProgress.setInactiveClass(true);
    window.__pdfProgress.setNumVisible(0, false);
  })();
  // --- Fim da alteração da barra ---

  if (btnDownload) {
    btnDownload.addEventListener('click', function () {
      (async function () {
        var fakeInterval = null;
        try {
          if (window.__pdfProgress) {
            window.__pdfProgress.setInactiveClass(false);
            if (window.__pdfProgress.revealNumericFlag) window.__pdfProgress.setNumVisible(window.__pdfProgress.progressBarPercent(), true);
            window.__pdfProgress.setNumVisible(0, window.__pdfProgress.revealNumericFlag);
            window.__pdfProgress.setSub('Preparando');
            window.__pdfProgress.setWidth(5);
          }
          btnDownload.disabled = true;
          var oldText = btnDownload.textContent || '';
          btnDownload.textContent = 'Gerando...';

          // progresso fake
          fakeInterval = startFakeProgress(function (p) {
            if (window.__pdfProgress) window.__pdfProgress.updateProgress(p);
          });

          var html = buildReportHTML();
          if (window.__pdfProgress) window.__pdfProgress.updateProgress(20, 'Enviando');

          var res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html: html })
          });

          if (window.__pdfProgress) window.__pdfProgress.updateProgress(60, 'Convertendo');

          if (!res.ok) {
            stopFakeProgress(fakeInterval);
            if (window.__pdfProgress) window.__pdfProgress.updateProgress(0, 'Erro');
            var txt = '';
            try { txt = await res.text(); } catch (e) { txt = 'Erro desconhecido'; }
            throw new Error('Servidor retornou ' + res.status + ': ' + txt);
          }

          // leitura por stream (mantido)
          var reader = res.body && res.body.getReader ? res.body.getReader() : null;
          if (reader) {
            var contentLength = +res.headers.get('Content-Length') || 0;
            var received = 0;
            var chunks = [];
            while (true) {
              var r = await reader.read();
              if (r.done) break;
              var value = r.value;
              chunks.push(value);
              received += value.length || value.byteLength || 0;
              if (contentLength) {
                var pct = Math.min(90, Math.round((received / contentLength) * 80) + 10);
                if (window.__pdfProgress) window.__pdfProgress.updateProgress(pct);
              } else {
                if (window.__pdfProgress) window.__pdfProgress.updateProgress(Math.min(85, (window.__pdfProgress.progressBarPercent ? window.__pdfProgress.progressBarPercent() : 20) + 3));
              }
            }
            var buffer = concatUint8Arrays(chunks);
            stopFakeProgress(fakeInterval);
            if (window.__pdfProgress) window.__pdfProgress.updateProgress(95, 'Finalizando');
            var blob = new Blob([buffer], { type: 'application/pdf' });
            downloadBlob(blob, 'relatorio.pdf');
          } else {
            var buf = await res.arrayBuffer();
            stopFakeProgress(fakeInterval);
            if (window.__pdfProgress) window.__pdfProgress.updateProgress(95, 'Finalizando');
            var blob = new Blob([buf], { type: 'application/pdf' });
            downloadBlob(blob, 'relatorio.pdf');
          }

          if (window.__pdfProgress) window.__pdfProgress.updateProgress(100, 'Concluído');
          btnDownload.textContent = oldText || 'Gerar PDF';
          btnDownload.disabled = false;

          setTimeout(function () {
            if (window.__pdfProgress) window.__pdfProgress.resetProgress();
          }, 1200);
        } catch (err) {
          stopFakeProgress(fakeInterval);
          if (window.__pdfProgress) window.__pdfProgress.updateProgress(0, 'Erro');
          console.error('Erro ao gerar PDF:', err);
          try { alert('Erro ao gerar PDF: ' + (err && err.message ? err.message : err)); } catch (e) {}
          btnDownload.disabled = false;
          btnDownload.textContent = 'Gerar PDF';
        }
      })();
    });
  }

  function startFakeProgress(updateFn) {
    var iv = setInterval(function () {
      try {
        var cur = window.__pdfProgress && window.__pdfProgress.progressBarPercent ? window.__pdfProgress.progressBarPercent() : 0;
        if (cur < 78) {
          var step = Math.random() * 5 + 2;
          updateFn(Math.min(78, Math.round(cur + step)));
        }
      } catch (e) {}
    }, 420);
    return iv;
  }

  function stopFakeProgress(iv) {
    try { clearInterval(iv); } catch (e) {}
  }

  function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function concatUint8Arrays(chunks) {
    if (!chunks || chunks.length === 0) return new Uint8Array();
    var total = chunks.reduce(function (sum, c) { return sum + (c.length || c.byteLength || 0); }, 0);
    var out = new Uint8Array(total);
    var offset = 0;
    chunks.forEach(function (c) {
      var view = c instanceof Uint8Array ? c : new Uint8Array(c);
      out.set(view, offset);
      offset += view.length;
    });
    return out;
  }

  // Compat layer sobre a barra (mantém API update/reset usadas acima)
  if (window.__pdfProgress) {
    window.__pdfProgress.updateProgress = function (pct, subText) {
      pct = Math.max(0, Math.min(100, Math.round(pct)));
      window.__pdfProgress.setWidth(pct);
      if (window.__pdfProgress.revealNumericFlag) window.__pdfProgress.setNumVisible(pct, true);
      window.__pdfProgress.setSub(typeof subText === 'string' ? subText : (pct < 10 ? 'Preparando' : pct < 40 ? 'Enviando' : pct < 80 ? 'Convertendo' : pct < 99 ? 'Finalizando' : 'Concluído'));
      window.__pdfProgress.setDotGood(pct >= 100);
    };
    window.__pdfProgress.resetProgress = function () {
      window.__pdfProgress.setWidth(0);
      window.__pdfProgress.setNumVisible(0, window.__pdfProgress.revealNumericFlag);
      window.__pdfProgress.setSub('');
      window.__pdfProgress.setDotGood(false);
      window.__pdfProgress.setInactiveClass(true);
    };
  }

  // --- Mantido o buildReportHTML original com CSS crítico ---
  function buildReportHTML() {
    var criticalCSS = `:root{ --page-width:794px; --accent:#0b63d6; --muted:#5b6b78; --card-bg:#ffffff; --page-bg:#eef2f7; --text:#04101a; }
html,body{ margin:0;padding:0;background:var(--page-bg);font-family:Inter, Arial, sans-serif;color:var(--text); -webkit-print-color-adjust:exact; print-color-adjust:exact; }
.pdf-wrap{ width:var(--page-width); max-width:100%; margin:20px auto; padding:20px; box-sizing:border-box; }
.report-header{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:18px; }
.report-title{ font-size:24px; font-weight:900; color:var(--text); }
.report-sub{ font-size:13px; color:var(--muted); margin-top:6px; }
.priority-badge{ background:var(--accent); color:#fff; padding:6px 10px; border-radius:999px; font-weight:800; font-size:12px; }
.items{ display:block; gap:14px; }
.item{ background:var(--card-bg); border:2px solid rgba(168,191,230,0.6); border-left:6px solid rgba(207,223,245,0.9); border-radius:12px; padding:16px; box-shadow:0 8px 22px rgba(4,16,26,0.06); margin-bottom:12px; }
.item-header{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:8px; }
.item-title{ font-weight:800; color:var(--text); font-size:16px; line-height:1.2; }
.item-desc{ color:#10202a; font-size:13px; line-height:1.45; white-space:pre-wrap; margin-bottom:8px; }
.item-suggestion{ background:#f0f8ff; border-left:5px solid var(--accent); padding:10px; border-radius:8px; font-size:13px; color:#052e54; }
.reco-box{ background:linear-gradient(180deg,#fff,#fbfdff); border:1px solid rgba(10,50,120,0.06); border-radius:12px; padding:14px; box-shadow:0 8px 24px rgba(4,16,26,0.06); margin-bottom:18px; overflow:visible; }
.reco-box-header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
.reco-box-body{ }
.reco-box .reco-item{ border-top:1px dashed rgba(4,16,26,0.04); padding:10px 0; display:flex; gap:12px; align-items:flex-start; }
.reco-box .reco-item:first-child{ border-top:none; }
.reco-box .icon-wrap{ flex:0 0 28px; display:flex; align-items:flex-start; }
.reco-box .title{ font-weight:800; color:#04101a; margin-bottom:6px; }
.reco-box .suggestion{ margin-top:6px; background:#f0f8ff; padding:8px; border-left:4px solid #0b63d6; border-radius:6px; }
.reco-box .explain .why-line{ font-weight:900; color:#04101a; display:inline-block; margin-right:6px; }
.report-footer{ margin-top:18px; border-top:1px solid rgba(4,16,26,0.06); padding-top:12px; color:var(--muted); font-size:12px; text-align:right; }
img{ max-width:100%; height:auto; display:block; }
.why-line{ display:block; color:#04101a; font-weight:900; margin-top:8px; margin-bottom:6px; }
.explain { display:block; color:#10202a !important; opacity:1 !important; font-style:italic; line-height:1.45; font-size:13px; }
.sep-inline { display:block; width:100%; height:12px; background:#cfe7ff; margin:12px 0; border-radius:3px; box-shadow:0 1px 0 rgba(4,16,26,0.04) inset; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
@page { size: A4; margin: 0; }
.pdf-sheet-bleed { position:relative; width:100%; min-height:297mm; margin:0; padding:20mm; box-sizing:border-box; background:linear-gradient(180deg,#fff,#fbfdff); -webkit-print-color-adjust:exact; print-color-adjust:exact; }
@media (max-width: 640px) {
  :root { --page-width: 380px; }
  .pdf-wrap { width:100% !important; margin:8px auto !important; padding:10px !important; }
  .pdf-sheet-bleed { padding:12mm !important; min-height:auto; }
  .report-title { font-size:18px; }
  .item, .reco-box { padding:12px; border-radius:10px; margin-bottom:10px; }
  .reco-box .reco-item { flex-direction:column; gap:8px; padding:8px 0; }
}`;

    var resultNode = document.getElementById('result') || document.querySelector('.result');
    if (!resultNode) return '<!doctype html><html><body><p>Resultado não encontrado</p></body></html>';

    var clone = resultNode.cloneNode(true);

    Array.prototype.slice.call(clone.querySelectorAll('img')).forEach(function (img) {
      var src = img.getAttribute('src') || '';
      if (src && src.indexOf('http') !== 0 && src.indexOf('data:') !== 0 && src.indexOf('blob:') !== 0) {
        try { img.src = new URL(src, window.location.origin).href; } catch (e) {}
      }
      img.removeAttribute('crossorigin');
    });

    function emphasizeWhyLines(htmlFragment) {
      try {
        var s = String(htmlFragment || '');
        s = s.replace(/<(strong|b|em|span)[^>]*>\s*(Por\s*que\s*[:\-—])\s*<\/\1>/ig, function(_, _tag, marker){ return marker; });
        s = s.replace(/(Por\s*que\s*[:\-—]\s*)([^\<]+)/ig, function(_, marker, explanation){
          var markerClean = marker.trim();
          var explClean = explanation.replace(/\s+/g,' ').trim();
          return '<span class="why-line">' + markerClean + '</span>' + (explClean ? '<span class="explain">' + explClean + '</span>' : '');
        });
        return s;
      } catch (e) { return htmlFragment; }
    }

    function safeEscapeHtml(s) {
      return String(s || '').replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;');
    }

    function detectStatusFromText(htmlFragment) {
      var txt = (new DOMParser().parseFromString('<div>' + htmlFragment + '</div>', 'text/html').body.innerText || '').trim();
      if (/—\s*(Não|Nao)\b|^\s*Não\b|^\s*Nao\b/i.test(txt)) return 'bad';
      if (/—\s*(Sim|Yes)\b|^\s*Sim\b/i.test(txt)) return 'ok';
      if (/Parcial|Parcialmente/i.test(txt)) return 'warn';
      return 'warn';
    }

    function badgeHtmlFor(status) {
      if (status === 'bad') return '<span class="item-badge bad"><span class="status-label status-no">Não</span></span>';
      if (status === 'ok') return '<span class="item-badge ok"><span class="status-label status-yes">Sim</span></span>';
      return '';
    }

    var recoEls = Array.prototype.slice.call(clone.querySelectorAll('.reco-item'));
    var recoBoxHtml = '';
    if (recoEls.length) {
      var rebuiltItems = recoEls.map(function (el) {
        try {
          var tagName = (el.tagName || 'div').toLowerCase();
          var attrs = '';
          if (el.attributes && el.attributes.length) {
            for (var i = 0; i < el.attributes.length; i++) {
              var a = el.attributes[i];
              attrs += ' ' + a.name + '="' + String(a.value || '').replace(/"/g, '&quot;') + '"';
            }
          }
          var inner = el.innerHTML || '';
          var processedInner = emphasizeWhyLines(inner);
          return '<' + tagName + attrs + '>' + processedInner + '</' + tagName + '>';
        } catch (e) {
          return emphasizeWhyLines(el.outerHTML || '');
        }
      });

      recoEls.forEach(function (el) { if (el.parentNode) el.parentNode.removeChild(el); });

      var sepHtml = '<div class="sep-inline" aria-hidden="true"></div>';
      var withSeps = rebuiltItems.map(function (item, idx) {
        return item + (idx < rebuiltItems.length - 1 ? sepHtml : '');
      }).join('\n');

      recoBoxHtml =
        '' +
        '<div class="reco-box">' +
          '<div class="reco-box-header"><div style="font-weight:900;font-size:15px;color:#04101a">Recomendações</div><div style="font-size:12px;color:var(--muted)">Itens: ' + rebuiltItems.length + '</div></div>' +
          '<div class="reco-box-body">' + withSeps + '</div>' +
        '</div>';
    }

    var parts = [];
    var structured = clone.querySelectorAll('.diagnostic-item, .item-raw, .result-item, .block, .card, li, .item');
    if (structured && structured.length > 0) {
      Array.prototype.slice.call(structured).forEach(function (n) { parts.push(n.outerHTML); });
    } else {
      var children = Array.prototype.slice.call(clone.children).filter(function (n) { return (n.textContent || '').trim().length > 6; });
      if (children.length > 0) children.forEach(function (ch) { parts.push(ch.outerHTML); });
      else {
        var ps = clone.querySelectorAll('p');
        if (ps && ps.length > 0) Array.prototype.slice.call(ps).forEach(function (p) {
          if ((p.textContent || '').trim().length > 6) parts.push(p.outerHTML);
        });
        else parts.push(clone.innerHTML || '');
      }
    }

    var otherHtml = parts.map(function (pHtml) {
      var parser = new DOMParser();
      var doc = parser.parseFromString('<div>' + pHtml + '</div>', 'text/html');
      var titleNode = doc.querySelector('h1,h2,h3,h4,strong,b');
      var title = titleNode ? (titleNode.textContent || '').trim() : ((doc.body.innerText || doc.body.textContent || '').split('\n').map(function (l) { return l.trim(); }).filter(Boolean)[0] || '');
      var normalizedTitle = (title || '').replace(/\s+/g, ' ').trim();
      if (/conta adequada/i.test(normalizedTitle)) normalizedTitle = 'Conta adequada';
      if (/nome( de usuário| de usuario| de user)?/i.test(normalizedTitle)) normalizedTitle = 'Nome de usuário';

      var suggestionNode = doc.querySelector('.suggestion, .sugestao, .sugestão, .hint, .tip') || null;
      var suggestionHtml = suggestionNode ? suggestionNode.innerHTML : ((doc.body.innerHTML.match(/(Sugest(?:ão|ao)\s*[:\-]\s*([\s\S]*))/i) || [])[2] || '');

      var descHtml = emphasizeWhyLines(pHtml);
      var status = detectStatusFromText(pHtml);
      var badge = badgeHtmlFor(status);
      var headerBadgeHtml = badge ? '<div>' + badge + '</div>' : '';

      return '' +
        '<div class="item">' +
          '<div class="item-header"><div class="item-title">' + safeEscapeHtml(normalizedTitle || 'Item') + '</div>' + headerBadgeHtml + '</div>' +
          '<div class="item-desc">' + descHtml + '</div>' +
          (suggestionHtml ? '<div class="item-suggestion">' + suggestionHtml + '</div>' : '') +
        '</div>';
    }).join('\n');

    var itemsHtml = '';
    if (recoBoxHtml) itemsHtml += recoBoxHtml + '\n';
    itemsHtml += otherHtml;

    var head = '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Relatório</title><style>' + criticalCSS + '</style>';

    var headerHtml =
      '' +
      '<div class="report-header">' +
        '<div><div class="report-title">Diagnóstico pronto</div><div class="report-sub">Relatório automático</div></div>' +
        '<div class="summary-row"><div class="priority-badge">Prioridade: Alta</div><div style="font-size:12px;color:var(--muted);margin-top:6px">' + new Date().toLocaleDateString('pt-BR') + '</div></div>' +
      '</div>';

    var body =
      '' +
      '<div class="pdf-wrap">' +
        '<div class="pdf-sheet-bleed">' +
          '<div class="report-sheet">' +
            head +
            headerHtml +
            '<div class="items">' + itemsHtml + '</div>' +
            '<div class="report-footer">Relatório gerado • ' + (new Date()).toLocaleDateString('pt-BR') + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    return '<!doctype html><html lang="pt-BR"><head>' + head + '</head><body>' + body + '</body></html>';
  }

  window.buildReportHTML = buildReportHTML;
});
