// app.js — versão adaptada para o questionário completo enviado
document.addEventListener('DOMContentLoaded', function () {
  try {
    var container = document.getElementById('questionsContainer');
    if (!container) throw new Error('#questionsContainer não encontrado');

    var blocks = [
      {
        letter: 'A',
        title: 'Perfil e configuração',
        items: [
          { key: 'conta_adequada', label: 'Conta adequada: Conta comercial ou de criador configurada corretamente.', explain: 'Conta comercial ou de criador habilita insights, promoções e ferramentas de conteúdo.' },
          { key: 'nome_username', label: 'Nome e username: Fácil de buscar; contém palavra-chave quando relevante.', explain: 'Nome e username legíveis e consistentes facilitam descoberta e buscas.' },
          { key: 'foto_perfil', label: 'Foto de perfil: Legível em tamanho pequeno e alinhada à marca.', explain: 'Imagem reconhecível mesmo em miniatura mantém identidade da marca.' },
          { key: 'bio_clara', label: 'Bio clara: Proposta de valor e CTA direto (link ou indicação).', explain: 'Bio deve comunicar benefício e direcionar para ação com um CTA claro.' },
          { key: 'link_na_bio', label: 'Link na bio: Aponta para página relevante e atualizada.', explain: 'Link deve direcionar para destino otimizado e atualizado conforme campanhas.' },
          { key: 'info_contato', label: 'Informações de contato: Telefone, e-mail e categorias atualizados.', explain: 'Contatos e categoria ajudam usuários a entrar em contato e ao algoritmo entender o negócio.' },
          { key: 'integracao_vendas', label: 'Integração de vendas: Instagram Shopping ou catálogo configurado quando aplica.', explain: 'Quando aplicável, shopping aumenta conversões diretas na plataforma.' }
        ]
      },
      {
        letter: 'B',
        title: 'Estratégia e objetivos',
        items: [
          { key: 'objetivos_definidos', label: 'Objetivos definidos: Metas claras (alcance, tráfego, leads, vendas).', explain: 'Metas SMART vinculadas ao funil orientam esforços e mensuração.' },
          { key: 'kpis_estabelecidos', label: 'KPIs estabelecidos: Métricas vinculadas aos objetivos e mensuráveis.', explain: 'Defina métricas como CAC, CTR, taxa de conversão, alcance e retenção.' },
          { key: 'publico_documentado', label: 'Público documentado: Personas com horários, interesses e dores registrados.', explain: 'Personas ajudam a criar conteúdo relevante e a definir segmentação.' },
          { key: 'linha_editorial', label: 'Linha editorial: Temas e formatos pré-definidos que suportam objetivos.', explain: 'Calendário e pilares de conteúdo mantêm coerência e foco.' }
        ]
      },
      {
        letter: 'C',
        title: 'Feed',
        items: [
          { key: 'coerencia_visual', label: 'Coerência visual: Paleta, filtros e estilo consistentes no grid.', explain: 'Identidade visual consistente reforça reconhecimento da marca.' },
          { key: 'variedade_formatos', label: 'Variedade de formatos: Uso de imagens, carrosséis, infográficos e antes/depois.', explain: 'Misturar formatos mantém interesse e explora diferentes comportamentos de consumo.' },
          { key: 'legendas_estrategicas', label: 'Legendas estratégicas: Texto com história/valor e CTA claro.', explain: 'Legendas devem engajar com gancho, entregar valor e terminar com CTA.' },
          { key: 'hashtags_otimizadas', label: 'Hashtags otimizadas: Mistura de populares e específicas de nicho testadas.', explain: 'Teste combinação de hashtags amplas, nicho e de comunidade.' },
          { key: 'cta_no_feed', label: 'CTA no feed: Publicações incentivam salvar, comentar, compartilhar ou visitar link.', explain: 'Cada post deve ter um objetivo (salvar, comentar, clicar, etc.).' }
        ]
      },
      {
        letter: 'D',
        title: 'Reels e vídeos curtos',
        items: [
          { key: 'frequencia_reels', label: 'Frequência de Reels: Publica Reels regularmente com objetivo de alcance.', explain: 'Reels regulares impulsionam alcance; planeje consistência.' },
          { key: 'gancho_inicial', label: 'Gancho inicial: Vídeos têm abertura impactante nos primeiros segundos.', explain: 'Os primeiros 2–3s determinam retenção e performance do vídeo.' },
          { key: 'valor_claro_reels', label: 'Valor claro: Reels entregam entretenimento, ensino ou inspiração rapidamente.', explain: 'Reels devem resolver problema, ensinar ou entreter em formato condensado.' },
          { key: 'legibilidade_sem_som', label: 'Legibilidade sem som: Texto e legendas garantem compreensão sem áudio.', explain: 'Muitos usuários assistem sem som; texto e legendas são essenciais.' }
        ]
      },
      {
        letter: 'E',
        title: 'Stories e destaques',
        items: [
          { key: 'frequencia_stories', label: 'Frequência de Stories: Stories são publicados com regularidade para manter presença.', explain: 'Stories frequentes mantêm marca no topo da mente e geram sinais de engajamento.' },
          { key: 'interatividade', label: 'Interatividade: Uso de stickers (enquetes, perguntas, quizzes) para gerar engajamento.', explain: 'Stickers aumentam respostas diretas e geram insights do público.' },
          { key: 'uso_links', label: 'Uso de links: Swipe Up/Link Sticker direciona tráfego quando aplicável.', explain: 'Links em Stories devem usar UTM e CTA claro para medir tráfego.' },
          { key: 'destaques_organizados', label: 'Destaques organizados: Capa padronizada e categorizações úteis (Produtos, FAQs, Depoimentos).', explain: 'Destaques bem organizados funcionam como microsite dentro do perfil.' },
          { key: 'destaques_atualizados', label: 'Atualização dos destaques: Conteúdo dos destaques revisado e relevante.', explain: 'Revise e atualize capas e conteúdo dos destaques regularmente.' }
        ]
      },
      {
        letter: 'F',
        title: 'Lives e conteúdo longo',
        items: [
          { key: 'lives_programadas', label: 'Lives programadas: Sessões ao vivo promovidas com antecedência e objetivo definido.', explain: 'Lives com promoção prévia e tópico claro atraem mais audiência.' },
          { key: 'reaproveitamento_lives', label: 'Reaproveitamento: Trechos de lives transformados em Reels, posts e clips.', explain: 'Clips e trechos estendem vida útil e aproveitam conteúdo já produzido.' }
        ]
      },
      {
        letter: 'G',
        title: 'Engajamento e comunidade',
        items: [
          { key: 'resposta_dms_comentarios', label: 'Resposta a DMs e comentários: Atendimento rápido e padronizado.', explain: 'Respostas rápidas criam confiança e aumentam conversões potenciais.' },
          { key: 'tom_voz', label: 'Tom de voz consistente: Linguagem alinhada à marca e ao público.', explain: 'Tom consistente fortalece percepção de marca e relacionamento.' },
          { key: 'incentivo_ugc', label: 'Incentivo a UGC: Estratégia para gerar e repostar conteúdo de seguidores.', explain: 'UGC amplia prova social e gera conteúdo autêntico com baixo custo.' }
        ]
      },
      {
        letter: 'H',
        title: 'Publicidade e conversão',
        items: [
          { key: 'anuncios_testados', label: 'Anúncios testados: Campanhas com variações de criativo e público em teste.', explain: 'Testes A/B em criativo e audiência otimizam CAC e ROAS.' },
          { key: 'landing_pages', label: 'Landing pages otimizadas: Páginas móveis preparadas para visitantes do Instagram.', explain: 'Páginas rápidas e adaptadas a mobile melhoram taxa de conversão.' },
          { key: 'rastreamento_configurado', label: 'Rastreamento configurado: Pixel, UTM e metas para medir visitantes e conversões.', explain: 'Pixel e UTMs são essenciais para atribuição e otimização de campanhas.' }
        ]
      },
      {
        letter: 'I',
        title: 'Análise e otimização',
        items: [
          { key: 'relatorios_regulares', label: 'Relatórios regulares: Revisões semanais ou mensais com insights acionáveis.', explain: 'Relatórios estruturados permitem identificar o que escalar ou parar.' },
          { key: 'tests_ab', label: 'Testes A/B realizados: Experimentos documentados em formatos, horários e CTAs.', explain: 'Documente hipóteses, resultados e aplique aprendizados.' },
          { key: 'acoes_dados', label: 'Ações baseadas em dados: Mudanças na estratégia decorrentes dos aprendizados.', explain: 'Decisões devem ser conduzidas por dados, não por intuição.' }
        ]
      },
      {
        letter: 'J',
        title: 'Operações e conformidade',
        items: [
          { key: 'calendario_editorial', label: 'Calendário editorial: Planejamento com datas, temas e responsáveis.', explain: 'Calendário evita atropelos e garante consistência de publicação.' },
          { key: 'workflow_definido', label: 'Workflow definido: Processo de criação, aprovação e publicação documentado.', explain: 'Fluxos claros reduzem erros e agilizam produção.' },
          { key: 'direitos_licencas', label: 'Direitos e licenças: Uso correto de músicas e imagens com licença.', explain: 'Evita strike, bloqueios e problemas de direitos autorais.' },
          { key: 'acessibilidade', label: 'Acessibilidade: Uso de legendas e texto alternativo quando possível.', explain: 'Legendas e alt text ampliam alcance e melhoram experiência de usuários.' }
        ]
      },
      {
        letter: 'K',
        title: 'Pesquisa de concorrência e benchmark',
        items: [
          { key: 'perfils_analizados', label: 'Perfis analisados: Selecionou e documentou 5–10 concorrentes ou referências.', explain: 'Benchmark ajuda a mapear oportunidades e diferenciais.' },
          { key: 'formato_maior_impacto', label: 'Formato de maior impacto: Identificou se Reels, Stories ou Feed performam melhor no nicho.', explain: 'Saber o formato vencedor orienta alocação de esforço.' },
          { key: 'horarios_frequencia', label: 'Horários e frequência ideales: Registrou melhores dias/horários para publicar.', explain: 'Otimize horários com base em dados de engajamento.' }
        ]
      }
    ];

    var suggestions = {
      conta_adequada: { sug: 'Mude para conta comercial/criador em Configurações > Conta.', why: 'Permite acessar insights e ferramentas de promoção.' },
      bio_clara: { sug: 'Reescreva em 1 linha: benefício + CTA (ex.: Marque sua consulta → Link).', why: 'Bio clara converte visitantes em ação.' },
      frequencia_reels: { sug: 'Planeje 4 Reels com variação de hooks para 4 semanas.', why: 'Testar consistência e formatos aumenta probabilidade de crescimento.' },
      rastreamento_configurado: { sug: 'Configure Pixel + UTMs e defina eventos de conversão prioritários.', why: 'Mede e atribui resultados de campanhas com precisão.' },
      calendario_editorial: { sug: 'Crie um calendário mensal com temas, responsáveis e formatos.', why: 'Facilita execução e aprovação do conteúdo.' }
    };

    // render blocks using same class names and structure
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
        opts.innerHTML = '<button type="button" class="opt" data-value="0" aria-pressed="false">Não</button>' +
                         '<button type="button" class="opt" data-value="1" aria-pressed="false">Parcial</button>' +
                         '<button type="button" class="opt" data-value="2" aria-pressed="false">Sim</button>';

        row.appendChild(top);
        row.appendChild(opts);
        box.appendChild(row);
      }

      container.appendChild(box);
    }

    // delegated handlers and tooltip
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

    document.addEventListener('click', function (e) {
      if (!tooltip) return;
      var isHint = e.target && e.target.classList && e.target.classList.contains('hint-btn');
      if (isHint) return;
      if (tooltip && tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
      tooltip = null;
    }, true);

    container.addEventListener('keydown', function (e) {
      var t = e.target;
      if (!t || !t.classList) return;
      if (!t.classList.contains('opt')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        t.click();
      }
    });

    // panel refs
    var calcBtn = document.getElementById('calc');
    var resetBtn = document.getElementById('reset');
    var pdfBtn = document.getElementById('downloadPdf');
    var scoreEl = document.getElementById('score');
    var tierEl = document.getElementById('tier');
    var summaryEl = document.getElementById('summary');
    var priHigh = document.getElementById('priorityHigh');
    var priMed = document.getElementById('priorityMed');
    var priOk = document.getElementById('priorityOk');

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

    function renderPanel() {
      var c = compute();
      var simCount = c.simCount;
      var items = c.items;
      var total = document.querySelectorAll('.q-row').length;
      var score = total ? Math.round((simCount / total) * 100) : 0;

      scoreEl.textContent = score;
      scoreEl.classList.remove('good', 'mid', 'poor');
      if (score >= 80) scoreEl.classList.add('good');
      else if (score >= 50) scoreEl.classList.add('mid');
      else scoreEl.classList.add('poor');

      tierEl.textContent = score >= 80 ? 'Estratégico' : score >= 50 ? 'Bom potencial' : 'Reconstruir base';
      summaryEl.textContent = 'Sim: ' + simCount + ' de ' + total;

      priHigh.innerHTML = '';
      priMed.innerHTML = '';
      priOk.innerHTML = '';

      for (var i = 0; i < items.length; i += 1) {
        var it = items[i];
        var elWrap = document.createElement('div');
        elWrap.className = 'reco-item';
        var icon = it.val === 2 ?
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M9 12.5l1.8 1.8L15.5 10" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' :
          it.val === 1 ?
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l10 18H2L12 2z" fill="#f59e0b"/></svg>' :
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l10 18H2L12 2z" fill="#ff6b6b"/></svg>';

        var chipClass = it.val === 2 ? 'ok' : it.val === 1 ? 'warn' : 'danger';
        var chipLabel = it.val === 2 ? 'OK' : it.val === 1 ? 'Prioridade Média' : 'Prioridade Alta';

        if (it.val === 2) {
          elWrap.innerHTML = '<div class="icon-wrap">' + icon + '</div><div><div class="title">' + it.label + ' <span class="status">— OK</span></div></div><div class="action-chip ' + chipClass + '">' + chipLabel + '</div>';
          priOk.appendChild(elWrap);
        } else {
          var sug = suggestions[it.key] ? suggestions[it.key].sug : 'Recomende uma ação prática.';
          var why = suggestions[it.key] ? suggestions[it.key].why : '';
          elWrap.innerHTML = '<div class="icon-wrap">' + icon + '</div><div><div class="title">' + it.label + ' <span class="status">— ' + (it.val === 1 ? 'Parcial' : 'Não') + '</span></div><div class="suggestion"><strong>Sugestão:</strong> ' + (sug || '') + '</div><div class="explain"><strong>Por que:</strong> ' + (why || '') + '</div></div><div class="action-chip ' + chipClass + '">' + chipLabel + '</div>';
          if (it.val === 0) priHigh.appendChild(elWrap);
          else priMed.appendChild(elWrap);
        }
      }

      if (pdfBtn) pdfBtn.disabled = false;
      var resultPanel = document.getElementById('result');
      if (resultPanel) resultPanel.focus();
    }

    if (!calcBtn || !resetBtn || !pdfBtn) {
      throw new Error('Botões do painel não encontrados. Verifique IDs: calc, reset, downloadPdf.');
    }

    calcBtn.addEventListener('click', function () {
      renderPanel();
    });

    resetBtn.addEventListener('click', function () {
      var rows = document.querySelectorAll('.q-row');
      Array.prototype.forEach.call(rows, function (r) {
        r.dataset.value = 0;
        var opts = r.querySelectorAll('.opt');
        Array.prototype.forEach.call(opts, function (o) {
          o.classList.remove('selected');
          o.setAttribute('aria-pressed', 'false');
        });
      });
      scoreEl.textContent = '--';
      tierEl.textContent = 'Aguardando';
      summaryEl.textContent = '';
      priHigh.innerHTML = '';
      priMed.innerHTML = '';
      priOk.innerHTML = '';
      pdfBtn.disabled = true;
      scoreEl.classList.remove('good', 'mid', 'poor');
    });

    // PDF generation (relies on html2canvas + jspdf if available)
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
        pdfDiv.innerHTML = '<h1 style="margin:0 0 8px">' + title + '</h1>' +
          '<p style="margin:0 0 10px">Pontuação: <strong>' + score + '</strong> — ' + (score >= 80 ? 'Estratégico' : score >= 50 ? 'Bom potencial' : 'Reconstruir base') + '</p>' +
          '<p style="margin:0 0 12px">Sim: ' + simCount + ' de ' + total + '</p><hr style="margin:12px 0">';

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
        console.error('Erro ao preparar PDF:', errOuter);
        pdfBtn.disabled = false;
        pdfBtn.textContent = 'Gerar PDF';
        alert('Erro ao preparar PDF: ' + (errOuter && errOuter.message ? errOuter.message : 'ver console'));
      }
    });

    if (pdfBtn) pdfBtn.disabled = true;
  } catch (err) {
    console.error('Erro inicializando app.js:', err);
    alert('Erro ao inicializar o questionário. Veja o console.');
  }
});
