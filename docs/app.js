// app.js — versão final ajustada: blocos em azul, dicas ?, opções abaixo, relatório funcionando
document.addEventListener('DOMContentLoaded', function () {
  try {
    console.log('app.js carregado', new Date().toISOString());

    var container = document.getElementById('questionsContainer');
    if (!container) throw new Error('#questionsContainer não encontrado');

    var blocks = [
      { letter:'A', title:'Perfil e configuração', items: [
        { key:'perfil_conta', label:'Conta adequada', explain:'Conta comercial/criador habilita insights, promoções e APIs.' },
        { key:'nome_username', label:'Nome e username', explain:'Nome legível e username consistente ajudam descoberta.' },
        { key:'foto_perfil', label:'Foto de perfil', explain:'Imagem legível em tamanho pequeno e alinhada à marca.' },
        { key:'bio', label:'Bio clara', explain:'Proposta de valor curta + CTA.' },
        { key:'link_bio', label:'Link na bio', explain:'Link aponta para página relevante e atualizada.' },
        { key:'contato_info', label:'Informações de contato', explain:'Telefone, e-mail e categoria atualizados.' },
        { key:'integracao_vendas', label:'Integração de vendas', explain:'Instagram Shopping/catálogos configurados quando aplicável.' }
      ]},
      { letter:'B', title:'Estratégia e objetivos', items: [
        { key:'objetivos_def', label:'Objetivos definidos', explain:'Metas SMART ligadas ao funil (alcance, tráfego, leads, vendas).' },
        { key:'kpis_est', label:'KPIs estabelecidos', explain:'Métricas vinculadas aos objetivos e mensuráveis.' },
        { key:'publico_doc', label:'Público documentado', explain:'Personas com horários, interesses e dores.' },
        { key:'linha_editorial', label:'Linha editorial', explain:'Temas e formatos definidos para suportar objetivos.' }
      ]},
      { letter:'C', title:'Feed', items: [
        { key:'coerencia_visual', label:'Coerência visual', explain:'Paleta, filtros e estilo consistentes no grid.' },
        { key:'variedade_formatos', label:'Variedade de formatos', explain:'Imagens, carrosséis, infográficos, antes/depois.' },
        { key:'legendas', label:'Legendas estratégicas', explain:'Gancho, valor, prova, CTA.' },
        { key:'hashtags', label:'Hashtags otimizadas', explain:'Mistura de nicho e amplas testadas.' },
        { key:'cta_feed', label:'CTA no feed', explain:'Publicações incentivam salvar, comentar, compartilhar ou visitar link.' }
      ]},
      { letter:'D', title:'Reels e vídeos curtos', items: [
        { key:'freq_reels', label:'Frequência de Reels', explain:'Consistência: 1–2 por semana se possível.' },
        { key:'gancho_inicial', label:'Gancho inicial', explain:'Abertura impactante nos primeiros 2–3s.' },
        { key:'valor_reels', label:'Valor claro', explain:'Ensinar, entreter ou inspirar rapidamente.' },
        { key:'legibilidade_sem_som', label:'Legibilidade sem som', explain:'Legendas e texto embutido.' }
      ]},
      { letter:'E', title:'Stories e destaques', items: [
        { key:'freq_stories', label:'Frequência de Stories', explain:'Stories regulares mantêm presença.' },
        { key:'interatividade', label:'Interatividade', explain:'Enquetes, perguntas e quizzes aumentam engajamento.' },
        { key:'uso_links_stories', label:'Uso de links', explain:'Links com UTM e CTA claro.' },
        { key:'destaques_organizados', label:'Destaques organizados', explain:'Capa padronizada e categorias úteis.' },
        { key:'destaques_atualizados', label:'Destaques atualizados', explain:'Revise periodicamente.' }
      ]},
      { letter:'L', title:'Prioridades imediatas', items: [
        { key:'prio_bio', label:'Bio e link com CTA', explain:'Corrija bio e link antes de campanhas.' },
        { key:'prio_reels', label:'Planejar 4 Reels', explain:'Testar hooks e mensurar retenção.' },
        { key:'prio_stories', label:'Programar Stories interativos', explain:'Gere tráfego e feedback.' },
        { key:'prio_metrics', label:'Revisar métricas e testes', explain:'Defina 3 testes A/B prioritários.' }
      ]}
    ];

    var suggestions = {
      perfil_conta: { sug:'Mude para conta comercial/criador em Configurações > Conta.', why:'Permite acessar insights e ferramentas.' },
      bio: { sug:'Reescreva em 1 linha: benefício + CTA.', why:'Bio clara converte visitantes em ação.' },
      prio_reels: { sug:'Planeje 4 roteiros com hook ≤3s.', why:'Testar consistência e ganho de alcance.' },
      prio_metrics: { sug:'Gerar relatório dos últimos 30 dias e definir 3 testes A/B.', why:'Decisões baseadas em dados.' }
    };

    // render blocks boxed
    container.innerHTML = '';
    for (var bi = 0; bi < blocks.length; bi += 1) {
      var block = blocks[bi];
      var box = document.createElement('div');
      box.className = 'block-box';

      var header = document.createElement('div');
      header.className = 'block-box-header';
      header.innerHTML = '<h3>Bloco ' + block.letter + ' — ' + block.title + '</h3>';
      box.appendChild(header);

      for (var qi = 0; qi < block.items.length; qi += 1) {
        var it = block.items[qi];
        var row = document.createElement('div');
        row.className = 'q-row';
        row.dataset.key = it.key;

        var top = document.createElement('div');
        top.className = 'q-top';

        var left = document.createElement('div');
        left.className = 'q-left';
        left.innerHTML = '<div class="q-title">' + it.label + '</div><div class="q-explain">' + it.explain + '</div>';

        var hintBtn = document.createElement('button');
        hintBtn.type = 'button';
        hintBtn.className = 'hint-btn';
        hintBtn.setAttribute('aria-label', 'Explicação');
        hintBtn.setAttribute('data-tip', it.explain);
        hintBtn.textContent = '?';

        top.appendChild(left);
        top.appendChild(hintBtn);

        var opts = document.createElement('div');
        opts.className = 'options-row';
        opts.innerHTML =
          '<button type="button" class="opt" data-value="0" aria-pressed="false">Não</button>' +
          '<button type="button" class="opt" data-value="1" aria-pressed="false">Parcial</button>' +
          '<button type="button" class="opt" data-value="2" aria-pressed="false">Sim</button>';

        row.appendChild(top);
        row.appendChild(opts);
        box.appendChild(row);
      }

      container.appendChild(box);
    }

    // delegated click handling + tooltip
    var tooltip = null;
    container.addEventListener('click', function (e) {
      var el = e.target;

      // option click
      if (el.classList && el.classList.contains('opt')) {
        var parent = el.closest('.q-row');
        if (!parent) return;
        var opts = parent.querySelectorAll('.opt');
        for (var a = 0; a < opts.length; a += 1) {
          opts[a].classList.remove('selected');
          opts[a].setAttribute('aria-pressed', 'false');
        }
        el.classList.add('selected');
        el.setAttribute('aria-pressed', 'true');
        parent.dataset.value = el.getAttribute('data-value');
        return;
      }

      // hint click
      if (el.classList && el.classList.contains('hint-btn')) {
        var tip = el.getAttribute('data-tip') || '';
        if (tooltip) {
          tooltip.parentNode.removeChild(tooltip);
          tooltip = null;
          return;
        }
        tooltip = document.createElement('div');
        tooltip.className = 'hint-tooltip';
        tooltip.innerText = tip;
        document.body.appendChild(tooltip);
        var rect = el.getBoundingClientRect();
        var topPos = rect.bottom + 8;
        var leftPos = rect.left;
        if (leftPos + 340 > window.innerWidth) leftPos = window.innerWidth - 340 - 12;
        tooltip.style.top = topPos + 'px';
        tooltip.style.left = leftPos + 'px';
        return;
      }
    });

    // hide tooltip on outside click
    document.addEventListener('click', function (e) {
      if (!tooltip) return;
      var isHint = e.target && e.target.classList && e.target.classList.contains('hint-btn');
      if (isHint) return;
      if (tooltip && tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
      tooltip = null;
    }, true);

    // keyboard support delegated
    container.addEventListener('keydown', function (e) {
      var t = e.target;
      if (!t || !t.classList) return;
      if (!t.classList.contains('opt')) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.click(); }
    });

    // panel refs (grab after DOM elements exist)
    var calcBtn = document.getElementById('calc');
    var resetBtn = document.getElementById('reset');
    var pdfBtn = document.getElementById('downloadPdf');
    var scoreEl = document.getElementById('score');
    var tierEl = document.getElementById('tier');
    var summaryEl = document.getElementById('summary');
    var priHigh = document.getElementById('priorityHigh');
    var priMed = document.getElementById('priorityMed');
    var priOk = document.getElementById('priorityOk');

    // compute results
    function compute() {
      var rows = Array.prototype.slice.call(document.querySelectorAll('.q-row'));
      var simCount = 0;
      var itemsList = rows.map(function (r) {
        var key = r.dataset.key;
        var val = Number(r.dataset.value || 0);
        var label = r.querySelector('.q-title') ? r.querySelector('.q-title').textContent : key;
        if (val === 2) simCount += 1;
        return { key: key, label: label, val: val };
      });
      itemsList.sort(function (a, b) { return a.val - b.val; });
      return { simCount: simCount, items: itemsList };
    }

    // render report panel
    function renderPanel() {
      var c = compute();
      var simCount = c.simCount;
      var items = c.items;
      var total = document.querySelectorAll('.q-row').length;
      var score = total ? Math.round((simCount / total) * 100) : 0;

      // score and tier
      scoreEl.textContent = score;
      scoreEl.classList.remove('good', 'mid', 'poor');
      if (score >= 80) scoreEl.classList.add('good'); else if (score >= 50) scoreEl.classList.add('mid'); else scoreEl.classList.add('poor');
      tierEl.textContent = score >= 80 ? 'Estratégico' : score >= 50 ? 'Bom potencial' : 'Reconstruir base';
      summaryEl.textContent = 'Sim: ' + simCount + ' de ' + total;

      // clear lists
      priHigh.innerHTML = '';
      priMed.innerHTML = '';
      priOk.innerHTML = '';

      // populate lists
      for (var i = 0; i < items.length; i += 1) {
        var it = items[i];
        var elWrap = document.createElement('div');
        elWrap.className = 'reco-item';
        var icon = it.val === 2
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M9 12.5l1.8 1.8L15.5 10" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
          : it.val === 1
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l10 18H2L12 2z" fill="#f59e0b"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l10 18H2L12 2z" fill="#ff6b6b"/></svg>';
        var chipClass = it.val === 2 ? 'ok' : it.val === 1 ? 'warn' : 'danger';
        var chipLabel = it.val === 2 ? 'OK' : it.val === 1 ? 'Prioridade Média' : 'Prioridade Alta';

        if (it.val === 2) {
          elWrap.innerHTML = '<div class="icon-wrap">' + icon + '</div><div><div class="title">' + it.label + ' <span class="status">— OK</span></div></div><div class="action-chip ' + chipClass + '">' + chipLabel + '</div>';
          priOk.appendChild(elWrap);
        } else {
          var sug = suggestions[it.key] ? suggestions[it.key].sug : 'Recomende uma ação prática.';
          var why = suggestions[it.key] ? suggestions[it.key].why : '';
          elWrap.innerHTML = '<div class="icon-wrap">' + icon + '</div><div><div class="title">' + it.label + ' <span class="status">— ' + (it.val === 1 ? 'Parcial' : 'Não') + '</span></div><div class="suggestion"><strong>Sugestão:</strong> ' + sug + '</div><div class="explain"><strong>Por que:</strong> ' + why + '</div></div><div class="action-chip ' + chipClass + '">' + chipLabel + '</div>';
          if (it.val === 0) priHigh.appendChild(elWrap); else priMed.appendChild(elWrap);
        }
      }

      if (pdfBtn) pdfBtn.disabled = false;
      var resultPanel = document.getElementById('result');
      if (resultPanel) resultPanel.focus();
    }

    // validate panel buttons exist
    if (!calcBtn || !resetBtn || !pdfBtn) {
      throw new Error('Botões do painel não encontrados. Verifique IDs: calc, reset, downloadPdf.');
    }

    // wire buttons
    calcBtn.addEventListener('click', function () { renderPanel(); });

    resetBtn.addEventListener('click', function () {
      var rows = document.querySelectorAll('.q-row');
      Array.prototype.forEach.call(rows, function (r) {
        r.dataset.value = 0;
        var opts = r.querySelectorAll('.opt');
        Array.prototype.forEach.call(opts, function (o) { o.classList.remove('selected'); o.setAttribute('aria-pressed', 'false'); });
      });
      scoreEl.textContent = '--'; tierEl.textContent = 'Aguardando'; summaryEl.textContent = '';
      priHigh.innerHTML = ''; priMed.innerHTML = ''; priOk.innerHTML = '';
      pdfBtn.disabled = true;
      scoreEl.classList.remove('good', 'mid', 'poor');
    });

    // PDF generation using html2canvas (Promises)
    pdfBtn.addEventListener('click', function () {
      if (!pdfBtn) return;
      pdfBtn.disabled = true;
      pdfBtn.textContent = 'Gerando PDF...';

      try {
        var titleEl = document.querySelector('.header-text h1');
        var title = titleEl ? titleEl.textContent : 'Relatório';
        var comp = compute();
        var simCount = comp.simCount;
        var items = comp.items || [];
        var total = items.length;
        var score = total ? Math.round((simCount / total) * 100) : 0;

        var pdfDiv = document.createElement('div');
        pdfDiv.style.width = '800px';
        pdfDiv.style.padding = '24px';
        pdfDiv.style.background = '#fff';
        pdfDiv.style.color = '#111';
        pdfDiv.style.fontFamily = 'Arial, Helvetica, sans-serif';
        pdfDiv.innerHTML = '<h1 style="margin:0 0 8px">' + title + '</h1>'
          + '<p style="margin:0 0 10px">Pontuação: <strong>' + score + '</strong> — '
          + (score >= 80 ? 'Estratégico' : score >= 50 ? 'Bom potencial' : 'Reconstruir base') + '</p>'
          + '<p style="margin:0 0 12px">Sim: ' + simCount + ' de ' + total + '</p><hr style="margin:12px 0">';

        for (var p = 0; p < items.length; p += 1) {
          var itx = items[p];
          if (itx.val === 2) {
            pdfDiv.innerHTML += '<div style="padding:10px;border-radius:8px;border:1px solid #e6f4ea;margin-bottom:10px;background:#f6fffa"><strong>' + itx.label + '</strong> — <em>OK</em></div>';
          } else {
            var s = suggestions[itx.key] ? suggestions[itx.key].sug : '';
            var w = suggestions[itx.key] ? suggestions[itx.key].why : '';
            pdfDiv.innerHTML += '<div style="padding:10px;border-radius:8px;border:1px solid #eee;margin-bottom:10px;background:#fafafa"><strong>' + itx.label + '</strong> — <em>' + (itx.val === 1 ? 'Parcial' : 'Não') + '</em><div style="margin-top:6px"><strong>Sugestão:</strong> ' + (s || '') + '</div><div style="margin-top:6px;color:#444"><strong>Por que:</strong> ' + (w || '') + '</div></div>';
          }
        }

        document.body.appendChild(pdfDiv);

        if (typeof html2canvas !== 'function') throw new Error('html2canvas não disponível.');

        html2canvas(pdfDiv, { scale: 2, backgroundColor: '#ffffff' }).then(function (canvas) {
          try {
            var imgData = canvas.toDataURL('image/jpeg', 0.95);
            var jsPDFobj = window.jspdf && window.jspdf.jsPDF ? window.jspdf.jsPDF : window.jspdf;
            var pdf = new jsPDFobj({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
            var filename = 'questionario-instagram-' + new Date().toISOString().slice(0,10) + '.pdf';
            pdf.save(filename);
          } catch (errPdf) {
            console.error('Erro ao gerar PDF:', errPdf);
            alert('Erro ao gerar PDF: ' + (errPdf && errPdf.message ? errPdf.message : 'ver console'));
          } finally {
            if (pdfDiv && pdfDiv.parentNode) document.body.removeChild(pdfDiv);
            pdfBtn.disabled = false;
            pdfBtn.textContent = 'Gerar PDF';
          }
        }).catch(function (errCanvas) {
          console.error('Erro html2canvas:', errCanvas);
          if (pdfDiv && pdfDiv.parentNode) document.body.removeChild(pdfDiv);
          pdfBtn.disabled = false;
          pdfBtn.textContent = 'Gerar PDF';
          alert('Erro ao capturar conteúdo para PDF. Veja console.');
        });
      } catch (errOuter) {
        console.error('Erro preparando PDF:', errOuter);
        pdfBtn.disabled = false;
        pdfBtn.textContent = 'Gerar PDF';
        alert('Erro ao preparar PDF: ' + (errOuter && errOuter.message ? errOuter.message : 'ver console'));
      }
    });

    // initial state
    if (pdfBtn) pdfBtn.disabled = true;

    console.log('app.js inicializado com sucesso');
  } catch (err) {
    console.error('Erro inicializando app.js:', err);
    alert('Erro ao inicializar o questionário. Veja o console.');
  }
});
