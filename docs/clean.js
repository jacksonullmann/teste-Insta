// clean.js — versão que preserva elementos marcados com data-pdf-preserve="true"
(function robustCleanPdfUI() {
  var runCount = 0;
  var maxRuns = 8;
  var runIntervalMs = 500;
  var keywordsStyles = ['pdf-progress', 'pdf-style', 'relatorio', 'relatório', 'pdf-overlay'];
  var idsToTry = ['pdf-progress-host','pdf-progress-overlay','pdf-progress-wrapper-unique','pdf-progress-styles','pdf-progress-overlay-container'];
  var selectorsToRemove = [
    '[data-pdf-injected="true"]:not([data-pdf-preserve="true"])',
    'style[data-pdf-style="true"]:not([data-pdf-preserve="true"])',
    'link[data-pdf-style="true"]:not([data-pdf-preserve="true"])'
  ];

  function safeRemove(el) { try { if (el && el.parentNode) el.parentNode.removeChild(el); return true; } catch (e) { return false; } }

  function removeBySelectors() {
    var removed = 0;
    selectorsToRemove.forEach(function(sel){
      Array.prototype.slice.call(document.querySelectorAll(sel)).forEach(function(node){
        if (safeRemove(node)) removed++;
      });
    });
    return removed;
  }

  function removeByIds() {
    var removed = 0;
    idsToTry.forEach(function(id){
      var n = document.getElementById(id);
      if (n && n.getAttribute && n.getAttribute('data-pdf-preserve') === 'true') return;
      if (n && safeRemove(n)) removed++;
    });
    return removed;
  }

  function removeByKeywordStyles() {
    var removed = 0;
    Array.prototype.slice.call(document.querySelectorAll('style, link[rel="stylesheet"]')).forEach(function (node) {
      try {
        if (node.getAttribute && node.getAttribute('data-pdf-preserve') === 'true') return;
        var content = (node.tagName.toLowerCase() === 'link') ? (node.href || '') : (node.textContent || '');
        var txt = String(content).toLowerCase();
        for (var i = 0; i < keywordsStyles.length; i++) {
          if (txt.indexOf(keywordsStyles[i]) !== -1) {
            if (safeRemove(node)) removed++;
            break;
          }
        }
      } catch (e) {}
    });
    return removed;
  }

  function removeByPatternedSelectors() {
    var removed = 0;
    var patterned = [
      '[id^="pdf-"]',
      '[class*="pdf-"]',
      '.pdf-progress-wrap',
      '.pdf-progress',
      '.pdf-wrap',
      '.pdf-overlay'
    ];
    patterned.forEach(function(sel){
      Array.prototype.slice.call(document.querySelectorAll(sel)).forEach(function(n){
        try {
          if (n && n.getAttribute && n.getAttribute('data-pdf-preserve') === 'true') return;
          var cs = window.getComputedStyle(n);
          var pos = cs.position || '';
          var rect = n.getBoundingClientRect ? n.getBoundingClientRect() : { width:0, height:0 };
          var small = rect.width < 1200 && rect.height < 600;
          var abs = pos === 'absolute' || pos === 'fixed';
          if (small || abs) {
            if (safeRemove(n)) removed++;
          }
        } catch (e) {}
      });
    });
    return removed;
  }

  function restoreBackups() {
    var restored = 0;
    try {
      if (window.__pdfProgressInlineBackup && typeof window.__pdfProgressInlineBackup === 'object') {
        Object.keys(window.__pdfProgressInlineBackup).forEach(function (sel) {
          var backups = window.__pdfProgressInlineBackup[sel];
          var nodes = document.querySelectorAll(sel);
          nodes.forEach(function (node, idx) {
            if (node && node.getAttribute && node.getAttribute('data-pdf-preserve') === 'true') return;
            var data = Array.isArray(backups) ? backups[idx] || {} : backups || {};
            Object.keys(data).forEach(function (prop) {
              try {
                var val = data[prop];
                if (val === null) node.style.removeProperty(prop);
                else node.style.setProperty(prop, val);
              } catch (e) {}
            });
            restored++;
          });
        });
        try { delete window.__pdfProgressInlineBackup; } catch(e){}
      }
    } catch (e) {}
    return restored;
  }

  function clearApi() { try { if (!window.__pdfProgress || !window.__pdfProgress.overlay || (window.__pdfProgress.overlay.getAttribute && window.__pdfProgress.overlay.getAttribute('data-pdf-preserve') !== 'true')) delete window.__pdfProgress; } catch (e) {} }

  function runOnce() {
    runCount++;
    var results = { selectors:0, ids:0, styles:0, patterned:0, restored:0 };
    results.selectors = removeBySelectors();
    results.ids = removeByIds();
    results.styles = removeByKeywordStyles();
    results.patterned = removeByPatternedSelectors();
    results.restored = restoreBackups();
    clearApi();
    if (results.selectors + results.ids + results.styles + results.patterned + results.restored > 0) {
      console.info('clean.js: removidos', results);
    }
    return results;
  }

  try { runOnce(); } catch (e) {}
  var interval = setInterval(function () {
    try {
      runOnce();
      if (runCount++ >= maxRuns) {
        clearInterval(interval);
        try { void document.body.offsetHeight; } catch(e){}
        console.info('clean.js: finalizado após tentativas.');
      }
    } catch (e) { clearInterval(interval); }
  }, runIntervalMs);

  document.addEventListener('DOMContentLoaded', function () { try { runOnce(); } catch(e){} });
  window.addEventListener('load', function () { try { runOnce(); } catch(e){} });
})();
