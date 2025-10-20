// app.js — versão completa com sugestões e "por que" enriquecidos para todas as perguntas
// Mantém layout, interações e geração de PDF. Sugestões agora trazem passos práticos, exemplos e motivos claros.
document.addEventListener('DOMContentLoaded', function () {
  try {
    var container = document.getElementById('questionsContainer');
    if (!container) throw new Error('#questionsContainer não encontrado');

    var blocks = [
      {
        letter: 'A',
        title: 'Perfil e configuração',
        items: [
          {
            key: 'conta_adequada',
            label: 'Conta adequada: Conta comercial ou de criador configurada corretamente.',
            explain: 'Conta comercial ou de criador habilita insights, promoções e ferramentas de conteúdo.',
            hint: 'Exemplo prático: em Configurações > Conta mude para "Conta profissional". Confirme acesso a Insights e ao botão de promoção; vincule ao Facebook Business Manager se usar anúncios.'
          },
          {
            key: 'nome_username',
            label: 'Nome e username: Fácil de buscar; contém palavra-chave quando relevante.',
            explain: 'Nome e username legíveis e consistentes facilitam descoberta e buscas.',
            hint: 'Exemplo: coloque sua principal palavra-chave no campo Nome (ex.: "João • Fotógrafo") e use username curto e sem números confusos.'
          },
          {
            key: 'foto_perfil',
            label: 'Foto de perfil: Legível em tamanho pequeno e alinhada à marca.',
            explain: 'Imagem reconhecível mesmo em miniatura mantém identidade da marca.',
            hint: 'Use logo isolado ou close do rosto com fundo neutro; teste reduzindo a imagem a 40px para checar legibilidade.'
          },
          {
            key: 'bio_clara',
            label: 'Bio clara: Proposta de valor e CTA direto (link ou indicação).',
            explain: 'Bio deve comunicar benefício e direcionar para ação com um CTA claro.',
            hint: 'Formato: "O que você faz + para quem + benefício. CTA". Ex.: "Ajudamos lojistas a vender 2x online • Baixe o guia 👇".'
          },
          {
            key: 'link_na_bio',
            label: 'Link na bio: Aponta para página relevante e atualizada.',
            explain: 'Link deve direcionar para destino otimizado e atualizado conforme campanhas.',
            hint: 'Preferência: landing com botões (Curso | E-book | Contato) ou Linktree; sempre adicione UTMs para identificar origem de tráfego.'
          },
          {
            key: 'info_contato',
            label: 'Informações de contato: Telefone, e-mail e categorias atualizados.',
            explain: 'Contatos e categoria ajudam usuários a entrar em contato e ao algoritmo entender o negócio.',
            hint: 'Coloque telefone e e-mail clicáveis; escolha categoria correta (ex.: Loja, Restaurante). Verifique se o botão "Contato" funciona.'
          },
          {
            key: 'integracao_vendas',
            label: 'Integração de vendas: Instagram Shopping ou catálogo configurado quando aplica.',
            explain: 'Quando aplicável, shopping aumenta conversões diretas na plataforma.',
            hint: 'Passos: criar catálogo no Commerce Manager, aguardar aprovação, taguear produtos nas publicações e ativar loja. Resultado: compra com menos atrito.'
          }
        ]
      },
      {
        letter: 'B',
        title: 'Estratégia e objetivos',
        items: [
          {
            key: 'objetivo_claro',
            label: 'Objetivo claro: Perfil tem propósito definido (vendas, autoridade, comunidade etc).',
            explain: 'Ter um objetivo claro orienta o tipo de conteúdo, linguagem e ações.',
            hint: 'Defina objetivo SMART: ex.: "Gerar 30 leads/mês". Use essa meta para escolher CTAs, formatos e como medir sucesso.'
          },
          {
            key: 'publico_definido',
            label: 'Público definido: Persona ou nicho bem mapeado.',
            explain: 'Conhecer o público permite criar conteúdo relevante e direcionado.',
            hint: 'Crie uma persona simples: idade, profissão, principal dor, onde consome conteúdo. Ex.: "Mulheres 30–45, querem começar loja online".'
          },
          {
            key: 'editorial_planejado',
            label: 'Editorial planejado: Tipos de conteúdo definidos (educativo, bastidores, prova social etc).',
            explain: 'Planejar os formatos garante variedade e consistência.',
            hint: 'Escolha 3 pilares (ex.: Ensino, Prova Social, Bastidores). Para cada pilar liste 5 ideias e roteiros curtos para produção rápida.'
          },
          {
            key: 'calendario_postagem',
            label: 'Calendário de postagem: Frequência e temas organizados.',
            explain: 'Ter um calendário evita improviso e melhora consistência.',
            hint: 'Use planilha com data, formato, tema, legenda, responsável e status. Planeje 2 semanas à frente e ajuste com base em desempenho.'
          },
          {
            key: 'metas_mensuraveis',
            label: 'Metas mensuráveis: Indicadores definidos (seguidores, engajamento, cliques etc).',
            explain: 'Metas ajudam a avaliar progresso e ajustar ações.',
            hint: 'Exemplo: "Aumentar cliques no link em 30% em 60 dias". Meça semanalmente e registre ações testadas para entender o que funciona.'
          }
        ]
      },
      {
        letter: 'C',
        title: 'Feed',
        items: [
          {
            key: 'identidade_visual',
            label: 'Identidade visual: Cores, fontes e estilo consistentes.',
            explain: 'Visual coerente reforça marca e facilita reconhecimento.',
            hint: 'Escolha 2–3 cores, 1 fonte para títulos e 1 para corpo. Crie 2 templates no Canva (post e carrossel) para acelerar criação.'
          },
          {
            key: 'conteudo_valor',
            label: 'Conteúdo de valor: Ensina, inspira ou resolve problemas.',
            explain: 'Conteúdo útil gera engajamento e fideliza seguidores.',
            hint: 'Post prático: título forte + 3 dicas acionáveis + CTA. Publique algo que o seguidor possa aplicar no mesmo dia.'
          },
          {
            key: 'legenda_estrategica',
            label: 'Legenda estratégica: Texto com contexto, CTA e palavras-chave.',
            explain: 'Legendas bem escritas aumentam retenção e conversão.',
            hint: 'Estrutura: Gancho (1ª linha) → 2–3 parágrafos curtos → CTA ("Salve", "Comente"). Use espaçamento e emojis com moderação.'
          },
          {
            key: 'carrossel_didatico',
            label: 'Carrossel didático: Explica algo em etapas ou lista.',
            explain: 'Carrossel aumenta tempo de visualização e compartilhamento.',
            hint: 'Faça slide 1 com promessa; slides intermediários com passos numerados; último slide com CTA: "Salve" ou "Marque alguém".'
          },
          {
            key: 'prova_social',
            label: 'Prova social: Depoimentos, resultados ou bastidores com clientes.',
            explain: 'Mostrar resultados reais gera confiança.',
            hint: 'Publique prints de avaliações com legenda que conte o contexto (problema, ação, resultado). Sempre peça autorização para repostar.'
          }
        ]
      },
      {
        letter: 'D',
        title: 'Reels e vídeos curtos',
        items: [
          {
            key: 'gancho_inicial',
            label: 'Gancho inicial: Começa com frase ou imagem que prende atenção.',
            explain: 'Os primeiros segundos de um vídeo são cruciais para prender a atenção.',
            hint: 'Use texto grande nos 2 primeiros segundos e comece com uma pergunta ou afirmação forte: "Pare de perder vendas por..."'
          },
          {
            key: 'conteudo_dinamico',
            label: 'Conteúdo dinâmico: Cortes rápidos, ritmo ágil e edição envolvente.',
            explain: 'Vídeos ágeis mantêm atenção e aumentam retenção.',
            hint: 'Corte a cada 0.8–1.8s, alterne enquadramentos, adicione legendas e pequenas animações. Ferramentas recomendadas: CapCut, VN.'
          },
          {
            key: 'legenda_curta',
            label: 'Legenda curta: Complementa o vídeo sem repetir o que já foi dito.',
            explain: 'Legendas devem reforçar a mensagem e facilitar entendimento.',
            hint: 'Use uma linha que complemente o vídeo e um CTA curto: ex.: "Dica rápida: 3 palavras para uma bio melhor. Salve."'
          },
          {
            key: 'musica_estrategica',
            label: 'Música estratégica: Escolha trilha que combine com o tema e gere alcance.',
            explain: 'Músicas populares aumentam alcance e engajamento.',
            hint: 'Use sons em tendência no próprio Reels; se escolher som original, garanta legendas para quem assiste sem áudio.'
          },
          {
            key: 'cta_final',
            label: 'CTA final: Chamada para ação clara no fim do vídeo.',
            explain: 'Encerrar com CTA aumenta conversão e engajamento.',
            hint: 'Exemplos: "Comente sua dúvida", "Clique no link na bio", "Salve para depois". Repita CTA visualmente e verbalmente.'
          }
        ]
      },
      {
        letter: 'E',
        title: 'Stories e destaques',
        items: [
          {
            key: 'frequencia_stories',
            label: 'Frequência de Stories: Stories são publicados com regularidade para manter presença.',
            explain: 'Stories frequentes mantêm marca no topo da mente e geram sinais de engajamento.',
            hint: 'Meta prática: 3–6 stories por dia. Misture bastidores, dicas rápidas, interação e oferta. Sequências curtas (3–5) contam micro-histórias.'
          },
          {
            key: 'interatividade',
            label: 'Interatividade: Uso de stickers (enquetes, perguntas, quizzes) para gerar engajamento.',
            explain: 'Stickers aumentam respostas diretas e geram insights do público.',
            hint: 'Pergunte "Qual sua maior dúvida?" ou use enquetes A/B. Use as respostas para criar conteúdo que resolve essas dúvidas.'
          },
          {
            key: 'uso_links',
            label: 'Uso de links: Swipe Up/Link Sticker direciona tráfego quando aplicável.',
            explain: 'Links em Stories devem usar UTM e CTA claro para medir tráfego.',
            hint: 'Inclua CTA visível ("Veja o passo a passo") e adicione UTM: utm_source=instagram&utm_campaign=campanhaX. Monitore cliques semanalmente.'
          },
          {
            key: 'destaques_organizados',
            label: 'Destaques organizados: Capa padronizada e categorizações úteis (Produtos, FAQs, Depoimentos).',
            explain: 'Destaques bem organizados funcionam como microsite dentro do perfil.',
            hint: 'Use capas simples com ícones; crie categorias úteis: "Produtos", "Como Comprar", "Depoimentos". Coloque instruções claras no primeiro slide.'
          },
          {
            key: 'destaques_atualizados',
            label: 'Atualização dos destaques: Conteúdo dos destaques revisado e relevante.',
            explain: 'Revise e atualize capas e conteúdo dos destaques regularmente.',
            hint: 'Rotina: revise a cada 2–3 meses, removendo conteúdos antigos e adicionando novidades, ofertas ou FAQs atualizadas.'
          }
        ]
      },
      {
        letter: 'F',
        title: 'Lives e conteúdo longo',
        items: [
          {
            key: 'lives_programadas',
            label: 'Lives programadas: Sessões ao vivo promovidas com antecedência e objetivo definido.',
            explain: 'Lives com promoção prévia e tópico claro atraem mais audiência.',
            hint: 'Anuncie a live com 3 posts/stories antes, defina pauta com tópicos e incentive participação com uma oferta exclusiva ao vivo.'
          },
          {
            key: 'reaproveitamento_lives',
            label: 'Reaproveitamento: Trechos de lives transformados em Reels, posts e clips.',
            explain: 'Clips e trechos estendem vida útil e aproveitam conteúdo já produzido.',
            hint: 'Depois da live, selecione 3 trechos de 30s para Reels; transforme destaque em carrossel com resumo e CTA para ver a gravação.'
          }
        ]
      },
      {
        letter: 'G',
        title: 'Engajamento e comunidade',
        items: [
          {
            key: 'resposta_dms_comentarios',
            label: 'Resposta a DMs e comentários: Atendimento rápido e padronizado.',
            explain: 'Respostas rápidas criam confiança e aumentam conversões potenciais.',
            hint: 'Tenha scripts prontos: Saudação, resposta a FAQ, próximo passo (ex.: "Quer agendar? Clique no link"). Treine time para responder em até 24h.'
          },
          {
            key: 'tom_voz',
            label: 'Tom de voz consistente: Linguagem alinhada à marca e ao público.',
            explain: 'Tom consistente fortalece percepção de marca e relacionamento.',
            hint: 'Escolha 3 palavras que definam o tom (ex.: amigável, direto, profissional). Escreva 3 exemplos de frases para uso diário.'
          },
          {
            key: 'incentivo_ugc',
            label: 'Incentivo a UGC: Estratégia para gerar e repostar conteúdo de seguidores.',
            explain: 'UGC amplia prova social e gera conteúdo autêntico com baixo custo.',
            hint: 'Exemplo de campanha: "Use #MeuProdutoX e concorra a 1 mês grátis". Reposte os melhores UGCs semanalmente, sempre creditando o autor.'
          }
        ]
      },
      {
        letter: 'H',
        title: 'Publicidade e conversão',
        items: [
          {
            key: 'anuncios_testados',
            label: 'Anúncios testados: Campanhas com variações de criativo e público em teste.',
            explain: 'Testes A/B em criativo e audiência otimizam CAC e ROAS.',
            hint: 'Teste 3 criativos (vídeo, carrossel, imagem) por 7 dias; compare CTR, CPC e taxa de conversão. Escale o que tiver melhor ROAS.'
          },
          {
            key: 'landing_pages',
            label: 'Landing pages otimizadas: Páginas móveis preparadas para visitantes do Instagram.',
            explain: 'Páginas rápidas e adaptadas a mobile melhoram taxa de conversão.',
            hint: 'Checklist: título claro, prova social, formulário curto (nome+e-mail), botão CTA visível sem scroll. Teste carregamento em 3G/4G.'
          },
          {
            key: 'rastreamento_configurado',
            label: 'Rastreamento configurado: Pixel, UTM e metas para medir visitantes e conversões.',
            explain: 'Pixel e UTMs são essenciais para atribuição e otimização de campanhas.',
            hint: 'Instale Pixel e configure UTMs: utm_source=instagram&utm_campaign=nome. Valide eventos no Gerenciador (purchase, lead, add_to_cart).'
          }
        ]
      },
      {
        letter: 'I',
        title: 'Análise e otimização',
        items: [
          {
            key: 'relatorios_regulares',
            label: 'Relatórios regulares: Revisões semanais ou mensais com insights acionáveis.',
            explain: 'Relatórios estruturados permitem identificar o que escalar ou parar.',
            hint: 'Modelo prático: planilha mensal com alcance, engajamento, cliques e 3 recomendações (o que aumentar, testar, parar).'
          },
          {
            key: 'tests_ab',
            label: 'Testes A/B realizados: Experimentos documentados em formatos, horários e CTAs.',
            explain: 'Documente hipóteses, resultados e aplique aprendizados.',
            hint: 'Registre hipótese, variações, período e resultado. Ex.: testar "Salve" vs "Comente" por 2 semanas e comparar taxas.'
          },
          {
            key: 'acoes_dados',
            label: 'Ações baseadas em dados: Mudanças na estratégia decorrentes dos aprendizados.',
            explain: 'Decisões devem ser conduzidas por dados, não por intuição.',
            hint: 'Priorize 1 mudança por mês com base em dados (ex.: mais Reels se geram mais leads). Monitore impacto por 4 semanas.'
          }
        ]
      },
      {
        letter: 'J',
        title: 'Operações e conformidade',
        items: [
          {
            key: 'calendario_editorial',
            label: 'Calendário editorial: Planejamento com datas, temas e responsáveis.',
            explain: 'Calendário evita atropelos e garante consistência de publicação.',
            hint: 'Use planilha com colunas: data, tema, formato, legenda, responsável, status. Atualize diariamente e reveja semanalmente.'
          },
          {
            key: 'workflow_definido',
            label: 'Workflow definido: Processo de criação, aprovação e publicação documentado.',
            explain: 'Fluxos claros reduzem erros e agilizam produção.',
            hint: 'Crie checklist: roteiro → gravação → edição → revisão → publicação. Defina prazos claros e responsáveis para cada etapa.'
          },
          {
            key: 'direitos_licencas',
            label: 'Direitos e licenças: Uso correto de músicas e imagens com licença.',
            explain: 'Evita strike, bloqueios e problemas de direitos autorais.',
            hint: 'Use músicas da biblioteca do Instagram ou adquira licença. Mantenha registro (prints/recibos) de permissões para casos de contestação.'
          },
          {
            key: 'acessibilidade',
            label: 'Acessibilidade: Uso de legendas e texto alternativo quando possível.',
            explain: 'Legendas e alt text ampliam alcance e melhoram experiência de usuários.',
            hint: 'Adote regra: todos os vídeos com legendas; imagens importantes com texto alternativo. Use linguagem direta e curta nas legendas.'
          }
        ]
      },
      {
        letter: 'K',
        title: 'Pesquisa de concorrência e benchmark',
        items: [
          {
            key: 'perfils_analizados',
            label: 'Perfis analisados: Selecionou e documentou 5–10 concorrentes ou referências.',
            explain: 'Benchmark ajuda a mapear oportunidades e diferenciais.',
            hint: 'Faça planilha com 5 concorrentes: o que postam, frequência, formatos que geram mais engajamento e 1 insight acionável por concorrente.'
          },
          {
            key: 'formato_maior_impacto',
            label: 'Formato de maior impacto: Identificou se Reels, Stories ou Feed performam melhor no nicho.',
            explain: 'Saber o formato vencedor orienta alocação de esforço.',
            hint: 'Teste foco: 2 semanas em Reels e 2 semanas em carrossel. Compare alcance, engajamento e geração de leads para decidir prioridade.'
          },
          {
            key: 'horarios_frequencia',
            label: 'Horários e frequência ideais: Registrou melhores dias/horários para publicar.',
            explain: 'Otimize horários com base em dados de engajamento.',
            hint: 'Método simples: registre desempenho de 20 posts (dia/hora) e identifique top 3 horários. Publique nesses horários por 4 semanas e reavalie.'
          }
        ]
      }
    ];

    // sugestões (agora ricas em detalhe) usadas para o relatório e painéis de recomendação
    var suggestions = {
      conta_adequada: {
        sug: 'Mude para Conta Profissional em Configurações > Conta; vincule ao Facebook Business Manager; confirme acesso a Insights e ao botão de promoção.',
        why: 'Por que: contas profissionais mostram métricas (alcance, impressões, seguidores), permitem promover posts e usar ferramentas como Instagram Shopping e agendamento. Sem isso você perde dados que orientam decisões e não consegue criar anúncios otimizados.'
      },
      nome_username: {
        sug: 'Ajuste Nome para conter uma palavra-chave (ex.: "LojaX • Decoração") e use username curto e memorável; remova números aleatórios.',
        why: 'Por que: o campo "Nome" é pesquisável no Instagram; incluir uma palavra-chave aumenta a chance de aparecer nas buscas pertinentes ao seu público.'
      },
      foto_perfil: {
        sug: 'Use logo em fundo neutro ou close do rosto com contraste; crie versão quadrada e verifique legibilidade reduzida para ~40px.',
        why: 'Por que: o avatar é o primeiro elemento reconhecido; uma imagem clara transmite profissionalismo e facilita identificação em comentários e resultados de busca.'
      },
      bio_clara: {
        sug: 'Escreva em 1–2 linhas: 1) O que você faz, 2) Para quem, 3) Benefício + CTA (ex.: "Baixe o e-book"). Inclua emoji leve para destacar o CTA.',
        why: 'Por que: a bio é o resumo rápido que transforma visitantes em seguidores ou leads; sem clareza o usuário não entende o próximo passo que deve tomar.'
      },
      link_na_bio: {
        sug: 'Use uma landing com botões (Curso | E-book | Contato) ou Linktree; adicione parâmetros UTM para cada campanha.',
        why: 'Por que: um link único bem estruturado centraliza ações e facilita mensuração de cliques e conversões, permitindo entender qual campanha trouxe resultados.'
      },
      info_contato: {
        sug: 'Adicione telefone/e-mail clicáveis e selecione a categoria correta no perfil; teste o botão de contato.',
        why: 'Por que: facilitar contato reduz atrito para clientes potenciais; a categoria ajuda o algoritmo a recomendar seu perfil para o público certo.'
      },
      integracao_vendas: {
        sug: 'Crie catálogo no Commerce Manager, envie para revisão, ative Instagram Shopping e tagueie produtos nas publicações.',
        why: 'Por que: integrar catálogo permite marcação direta de produtos, reduz passos até a compra e aumenta taxa de conversão dentro da plataforma.'
      },

      objetivo_claro: {
        sug: 'Defina 1 objetivo principal SMART (ex.: 30 leads/mês) e 1 secundário (ex.: aumentar engajamento em 20%). Documente e revise mensalmente.',
        why: 'Por que: objetivos orientam escolha de formatos, CTAs e métricas; sem objetivos claros não é possível priorizar e mensurar o que funciona.'
      },
      publico_definido: {
        sug: 'Descreva 1–2 personas com idade, profissão, dores e onde consomem conteúdo. Use isso em roteiros e anúncios.',
        why: 'Por que: falar direto com a persona aumenta relevância do conteúdo e taxa de conversão; mensagens genéricas geram baixo engajamento.'
      },
      editorial_planejado: {
        sug: 'Escolha 3 pilares e gere 5 ideias para cada; crie templates e roteiros curtos para agilizar produção.',
        why: 'Por que: pilares garantem coerência e distribuem esforço entre educação, prova social e vendas, evitando postagens aleatórias.'
      },
      calendario_postagem: {
        sug: 'Monte planilha com datas, temas, formato e responsável; planeje 2 semanas à frente e atualize status diariamente.',
        why: 'Por que: um calendário evita imprevistos, melhora consistência e permite coordenação entre criação e publicação.'
      },
      metas_mensuraveis: {
        sug: 'Defina indicadores (alcance, cliques, leads) com metas numéricas e prazos; monitore semanalmente e ajuste ações.',
        why: 'Por que: metas mensuráveis transformam suposições em testes controlados, permitindo otimização contínua.'
      },

      identidade_visual: {
        sug: 'Defina paleta (3 cores), 2 fontes e 2 templates; salve em uma pasta de ativos e use sempre para posts.',
        why: 'Por que: consistência visual facilita reconhecimento da marca e acelera a produção de conteúdo.'
      },
      conteudo_valor: {
        sug: 'Crie posts com formato "Problema → Solução → Exemplo prático" e inclua CTA que direcione para ação concreta.',
        why: 'Por que: conteúdo que resolve gera autoridade e probabilidades maiores de compartilhamento e salvamento.'
      },
      legenda_estrategica: {
        sug: 'Use gancho na 1ª linha, desenvolva em 2–3 parágrafos curtos e finalize com CTA claro (Salvar, Comentar, Link).',
        why: 'Por que: legendas bem estruturadas aumentam tempo de leitura e conduzem o usuário para a ação desejada.'
      },
      carrossel_didatico: {
        sug: 'Faça slide 1 com promessa forte, 3–6 slides com passos/explicações e último slide com CTA para salvar ou visitar link.',
        why: 'Por que: carrosséis mantêm usuário navegando e possibilitam explicar temas complexos sem cansar em uma só imagem.'
      },
      prova_social: {
        sug: 'Colete depoimentos curtos com dados (ex.: "Venda +40% em 3 meses") e publique com contexto: antes, ação, resultado.',
        why: 'Por que: provas reais reduzem objeções e aumentam confiança para a compra ou contratação.'
      },

      gancho_inicial: {
        sug: 'Crie aberturas com pergunta, dado surpreendente ou benefício claro; adicione texto grande nos 2 primeiros segundos.',
        why: 'Por que: gancho forte evita que o usuário deslize para o próximo conteúdo e aumenta retenção nos primeiros segundos.'
      },
      conteudo_dinamico: {
        sug: 'Edite com cortes rápidos, variação de enquadramentos e legendas; mantenha ritmo e curiosidade ao longo do vídeo.',
        why: 'Por que: vídeos dinâmicos retêm atenção e são mais propensos a serem assistidos até o fim, sinal que favorece o algoritmo.'
      },
      legenda_curta: {
        sug: 'Use uma frase complementar que esclareça o valor do vídeo e um CTA curto (ex.: "Salve para aplicar").',
        why: 'Por que: legenda objetiva ajuda quem assiste sem som e reforça a ação desejada.'
      },
      musica_estrategica: {
        sug: 'Use músicas em tendência quando fizer sentido ou escolha trilha que combine com o ritmo do conteúdo.',
        why: 'Por que: sons em alta aumentam a chance de descoberta e o sentimento de atualidade do conteúdo.'
      },
      cta_final: {
        sug: 'Finalize com CTA visual e verbal: "Comente", "Clique no link", "Salve". Reforce benefício de executar a ação.',
        why: 'Por que: CTA claro transforma audiência em ação, direcionando tráfego ou gerando lead.'
      },

      frequencia_stories: {
        sug: 'Publique 3–6 stories por dia com mix: 1 bastidor, 1 dica, 1 interação e 1 oferta. Use sequência para contar uma história.',
        why: 'Por que: frequência mantém sua marca em evidência, gera respostas e alimenta algoritmo com sinais de atividade.'
      },
      interatividade: {
        sug: 'Use perguntas para captar dúvidas, enquetes para preferências e quizzes para engajar; poste resultados depois.',
        why: 'Por que: interação aumenta conexões diretas e gera conteúdo para próximos posts baseado em dúvidas reais.'
      },
      uso_links: {
        sug: 'Inclua CTA no story e use UTM no link; acompanhe cliques e taxa de conversão por campanha.',
        why: 'Por que: medir cliques mostra quais mensagens convertem e onde vale investir em tráfego pago.'
      },
      destaques_organizados: {
        sug: 'Crie capas padronizadas e separe por temas úteis (Produtos, FAQs, Depoimentos, Como Comprar).',
        why: 'Por que: destaques funcionam como seções permanentes do seu perfil, ajudando novos visitantes a se orientar.'
      },
      destaques_atualizados: {
        sug: 'Revise a cada 2–3 meses, removendo conteúdos desatualizados e adicionando novidades e FAQs recentes.',
        why: 'Por que: destaques atualizados transmitem profissionalismo e evitam informações erradas para clientes.'
      },

      lives_programadas: {
        sug: 'Anuncie a live com 3 posts/stories, defina pauta com tópicos e ofereça incentivo ao vivo (desconto ou Q&A).',
        why: 'Por que: promoção prévia aumenta audiência; pauta organizada evita perder tempo e garante entrega de valor.'
      },
      reaproveitamento_lives: {
        sug: 'Edite 3 trechos de 20–60s para Reels e crie carrossel com principais aprendizados; publique nos dias seguintes.',
        why: 'Por que: reaproveitar maximiza alcance do mesmo conteúdo e economiza tempo de produção.'
      },

      resposta_dms_comentarios: {
        sug: 'Crie 3 scripts (saudação, resposta a FAQ, fechamento para venda) e defina SLA de resposta de 24h.',
        why: 'Por que: respostas rápidas aumentam confiança e reduzem perda de oportunidades de venda.'
      },
      tom_voz: {
        sug: 'Defina 3 palavras-chave do tom (ex.: amigável, direto, profissional) e escreva 3 frases modelo para uso diário.',
        why: 'Por que: tom consistente facilita reconhecimento da marca e cria conexão mais sólida com o público.'
      },
      incentivo_ugc: {
        sug: 'Lance campanha: "Use #MeuProdutoX e concorra a desconto"; destaque UGCs nas stories e feed com créditos.',
        why: 'Por que: UGC gera prova social autêntica e conteúdo gratuito que aumenta confiança entre prospects.'
      },

      anuncios_testados: {
        sug: 'Crie 3 criativos e 3 públicos, rode testes por 7–10 dias e compare CTR, CPC e ROAS antes de escalar.',
        why: 'Por que: testar evita gastar budget com criativos/públicos ineficazes e mostra qual combinação traz melhor retorno.'
      },
      landing_pages: {
        sug: 'Crie landing com título direto, prova social, formulário curto e CTA acima da dobra; teste tempo de carregamento no mobile.',
        why: 'Por que: uma landing otimizada reduz abandono e aumenta taxa de conversão de visitantes vindos do Instagram.'
      },
      rastreamento_configurado: {
        sug: 'Instale Pixel, use UTMs padronizadas e valide eventos (view, add_to_cart, purchase) no Gerenciador de Eventos.',
        why: 'Por que: rastreamento permite atribuir resultados, otimizar campanhas e entender quais criativos convertem melhor.'
      },

      relatorios_regulares: {
        sug: 'Gere relatório mensal com: alcance, impressões, engajamento, cliques e 3 recomendações para o próximo mês.',
        why: 'Por que: relatórios transformam dados em ações práticas, permitindo priorizar o que dá resultado.'
      },
      tests_ab: {
        sug: 'Documente hipóteses, varie 1 elemento por teste (CTA, horário, criativo) e rode por período definido; registre resultados.',
        why: 'Por que: testar isoladamente mostra causa/efeito e evita conclusões erradas sobre o que funciona.'
      },
      acoes_dados: {
        sug: 'Após análises, priorize 1 mudança de conteúdo e 1 operacional por mês; monitore impacto por 4 semanas.',
        why: 'Por que: mudanças pequenas e mensuradas permitem aprender rápido sem comprometer toda a estratégia.'
      },

      calendario_editorial: {
        sug: 'Monte calendário mensal com temas, responsáveis e status; revise semanalmente e delegue tarefas claras.',
        why: 'Por que: organização reduz retrabalho, permite planejamento de campanhas e mantém frequência estável.'
      },
      workflow_definido: {
        sug: 'Documente processo: briefing → roteiro → gravação → edição → aprovação → publicação; defina prazos.',
        why: 'Por que: processos definidos evitam erros e aceleram produção com qualidade previsível.'
      },
      direitos_licencas: {
        sug: 'Use músicas da biblioteca do Instagram ou licencie trilhas; mantenha comprovantes de compra/permissão.',
        why: 'Por que: respeito a direitos evita strikes, remoção de conteúdo e problemas legais que impactam reputação.'
      },
      acessibilidade: {
        sug: 'Adicione legendas automáticas em vídeos e texto alternativo em imagens importantes; use linguagem simples.',
        why: 'Por que: acessibilidade amplia audiência e melhora experiência, além de ser prática inclusiva.'
      },

      perfils_analizados: {
        sug: 'Analise 5 concorrentes: frequência, formatos, tom, engajamento e 1 oportunidade para aplicar no seu perfil.',
        why: 'Por que: benchmarking revela lacunas e oportunidades de diferenciação que você pode explorar.'
      },
      formato_maior_impacto: {
        sug: 'Teste foco: 2 semanas em Reels e 2 semanas em carrossel; compare métricas e priorize o formato vencedor.',
        why: 'Por que: identificar o formato que gera resultados permite alocar tempo e budget com mais eficácia.'
      },
      horarios_frequencia: {
        sug: 'Registre desempenho de 20 posts e identifique os 3 melhores horários; poste nesses horários por 4 semanas e reavalie.',
        why: 'Por que: otimizar horário de publicação aumenta alcance e probabilidade de interação inicial, o que melhora distribuição orgânica.'
      }
    };

    // renderização mantendo classes e estrutura original
    container.innerHTML = '';
    for (var bi = 0; bi < blocks.length; bi++) {
      var block = blocks[bi];
      var box = document.createElement('div');
      box.className = 'block-box';
      var header = document.createElement('div');
      header.className = 'block-box-header';
      header.innerHTML = '<h3>Bloco ' + block.letter + ' — ' + block.title + '</h3>';
      box.appendChild(header);

      for (var qi = 0; qi < block.items.length; qi++) {
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
        hintBtn.setAttribute('aria-label', 'Dica');
        // Prioriza it.hint, depois suggestions[it.key].sug, por fim it.explain
        var hintText = (it.hint && it.hint.trim()) ? it.hint :
                       (suggestions && suggestions[it.key] && suggestions[it.key].sug) ? suggestions[it.key].sug :
                       it.explain || '';
        hintBtn.setAttribute('data-tip', hintText);
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

    // handlers delegados e tooltip
    var tooltip = null;
    container.addEventListener('click', function (e) {
      var el = e.target;

      // clique em opção
      if (el.classList && el.classList.contains('opt')) {
        var parent = el.closest('.q-row');
        if (!parent) return;
        var opts = parent.querySelectorAll('.opt');
        opts.forEach(function (o) {
          o.classList.remove('selected');
          o.setAttribute('aria-pressed', 'false');
        });
        el.classList.add('selected');
        el.setAttribute('aria-pressed', 'true');
        parent.dataset.value = el.getAttribute('data-value');
        return;
      }

      // clique em dica
      if (el.classList && el.classList.contains('hint-btn')) {
        var tip = el.getAttribute('data-tip') || '';
        if (tooltip) {
          tooltip.remove();
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
      if (e.target.classList && e.target.classList.contains('hint-btn')) return;
      tooltip.remove();
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

    // refs painel e controles
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

      if (scoreEl) {
        scoreEl.textContent = score;
        scoreEl.classList.remove('good', 'mid', 'poor');
        if (score >= 80) scoreEl.classList.add('good');
        else if (score >= 50) scoreEl.classList.add('mid');
        else scoreEl.classList.add('poor');
      }
      if (tierEl) tierEl.textContent = score >= 80 ? 'Estratégico' : score >= 50 ? 'Bom potencial' : 'Reconstruir base';
      if (summaryEl) summaryEl.textContent = 'Sim: ' + simCount + ' de ' + total;

      if (priHigh) priHigh.innerHTML = '';
      if (priMed) priMed.innerHTML = '';
      if (priOk) priOk.innerHTML = '';

      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var elWrap = document.createElement('div');
        elWrap.className = 'reco-item';

        var icon = it.val === 2 ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M9 12.5l1.8 1.8L15.5 10" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' :
                   it.val === 1 ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l10 18H2L12 2z" fill="#f59e0b"/></svg>' :
                   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l10 18H2L12 2z" fill="#ff6b6b"/></svg>';

        if (it.val === 2) {
          elWrap.innerHTML = '<div class="icon-wrap">' + icon + '</div>' +
                             '<div><div class="title">' + it.label + ' <span class="status">— OK</span></div></div>';
          if (priOk) priOk.appendChild(elWrap);
        } else {
          var sug = suggestions[it.key] ? suggestions[it.key].sug : 'Recomende uma ação prática.';
          var why = suggestions[it.key] ? suggestions[it.key].why : '';
          elWrap.innerHTML = '<div class="icon-wrap">' + icon + '</div>' +
                             '<div>' +
                               '<div class="title">' + it.label + ' <span class="status">— ' + (it.val === 1 ? 'Parcial' : 'Não') + '</span></div>' +
                               '<div class="suggestion"><strong>Sugestão:</strong> ' + (sug || '') + '</div>' +
                               '<div class="explain"><strong>Por que:</strong> ' + (why || '') + '</div>' +
                             '</div>';
          if (it.val === 0) { if (priHigh) priHigh.appendChild(elWrap); }
          else { if (priMed) priMed.appendChild(elWrap); }
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
      if (scoreEl) scoreEl.textContent = '--';
      if (tierEl) tierEl.textContent = 'Aguardando';
      if (summaryEl) summaryEl.textContent = '';
      if (priHigh) priHigh.innerHTML = '';
      if (priMed) priMed.innerHTML = '';
      if (priOk) priOk.innerHTML = '';
      if (pdfBtn) pdfBtn.disabled = true;
      if (scoreEl) scoreEl.classList.remove('good', 'mid', 'poor');
    });

    // Geração de PDF (usa html2canvas + jspdf)
    pdfBtn.addEventListener('click', function () {
      if (!pdfBtn) return;
      pdfBtn.disabled = true;
      var originalText = pdfBtn.textContent;
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
                           '<p style="margin:0 0 10px">Pontuação: <strong>' + score + '</strong> — ' +
                           (score >= 80 ? 'Estratégico' : score >= 50 ? 'Bom potencial' : 'Reconstruir base') + '</p>' +
                           '<p style="margin:0 0 12px">Sim: ' + simCount + ' de ' + total + '</p><hr style="margin:12px 0">';

        for (var p = 0; p < items.length; p++) {
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
            pdfBtn.textContent = originalText;
          }
        }).catch(function (errCanvas) {
          console.error('Erro html2canvas:', errCanvas);
          if (pdfDiv && pdfDiv.parentNode) document.body.removeChild(pdfDiv);
          pdfBtn.disabled = false;
          pdfBtn.textContent = originalText;
          alert('Erro ao capturar conteúdo para PDF. Veja console.');
        });
      } catch (errOuter) {
        console.error('Erro ao preparar PDF:', errOuter);
        pdfBtn.disabled = false;
        pdfBtn.textContent = originalText;
        alert('Erro ao preparar PDF: ' + (errOuter && errOuter.message ? errOuter.message : 'ver console'));
      }
    });

    if (pdfBtn) pdfBtn.disabled = true;

  } catch (err) {
    console.error('Erro inicializando app.js:', err);
    alert('Erro ao inicializar o questionário. Veja o console.');
  }
});
