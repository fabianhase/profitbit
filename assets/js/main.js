/* ProfitBid – main.js */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile-Navigation */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    document.querySelectorAll('#nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* Hero: KI-Log mit Freigabe */
  var logs = [
    ['SEARCH · NEGATIVE KEYWORD', 'Suchbegriff „kostenlos download“ in allen Search-Kampagnen ausschließen', 'ca. 180 € / Monat eingespart'],
    ['GEBOTE · GERÄTE', 'Mobile-Gebot −15 % – Conversion-Rate 38 % unter Desktop', 'CPA voraussichtlich −11 %'],
    ['ANZEIGEN · ASSET-TEST', 'Neue Headline testen: „Versand in 24 h – kostenlos ab 49 €“', 'CTR-Potenzial +0,8 Pp.'],
    ['BUDGET · SKALIERUNG', 'Tagesbudget PMax Shopping +8 % – unterhalb der Lernphasen-Schwelle', 'ROAS stabil bei 5,4'],
    ['TRACKING · ALARM', 'Kauf-Conversion seit 6 h ohne Daten – Tracking überprüfen und Datenausschluss vorbereitet', 'Smart Bidding geschützt'],
    ['SAISON · BLACK NOVEMBER', 'Sitelink „Black Week Angebote“ und Budget-Plan ab 20.11. einplanen', 'Saisonpeak vorbereitet'],
    ['ZIELGRUPPEN · GEBOTE', 'Segment „Frauen 35–44“ +20 % – bester ROAS im Konto', 'Mehr Umsatz, gleiches Budget'],
    ['QUALITÄTSFAKTOR', 'Neue Anzeigengruppe „Gravur Ring Herren“ mit passender Anzeige anlegen', 'QF 5 → 8 erwartet']
  ];
  var logEl = document.getElementById('log');
  var OK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L19 7"/></svg>';

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function logItem(i, approved) {
    var l = logs[i % logs.length];
    var min = String((i * 7) % 60).padStart(2, '0');
    var el = document.createElement('div');
    el.className = 'log-item';
    el.innerHTML =
      '<div class="log-row"><span class="log-tag mono">' + esc(l[0]) + '</span><span class="log-time mono">09:' + min + '</span></div>' +
      '<div class="log-text">' + esc(l[1]) + '</div>' +
      '<div class="log-row"><span class="log-impact">' + esc(l[2]) + '</span>' +
      (approved ? '<span class="badge-ok">' + OK + 'Freigegeben · Spezialist</span>'
                : '<span class="badge-wait"><i></i>Wartet auf Freigabe</span>') + '</div>';
    return el;
  }
  function approve(el) {
    var w = el.querySelector('.badge-wait');
    if (!w) return;
    var b = document.createElement('span');
    b.className = 'badge-ok';
    b.innerHTML = OK + 'Freigegeben · Spezialist';
    w.replaceWith(b);
  }
  if (logEl) {
    if (reduce) {
      for (var r = 0; r < 4; r++) logEl.appendChild(logItem(r, true));
    } else {
      var tick = 0;
      var add = function () {
        var el = logItem(tick, false);
        logEl.insertBefore(el, logEl.firstChild);
        while (logEl.children.length > 4) logEl.removeChild(logEl.lastChild);
        setTimeout(function () { approve(el); }, 1400);
        tick++;
      };
      add();
      setInterval(function () { if (!document.hidden) add(); }, 2800);
    }
  }

  /* Zahlen hochzählen + Linien zeichnen, sobald sichtbar */
  function fmt(v, d) { return v.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function countUp(el) {
    var target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec, 10), suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = fmt(target, dec) + suf; return; }
    var start = performance.now(), dur = 2200;
    (function step(now) {
      var p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * e, dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in-view');
      en.target.querySelectorAll('[data-count]').forEach(countUp);
      io.unobserve(en.target);
    });
  }, { threshold: 0.25 }) : null;
  document.querySelectorAll('.reveal').forEach(function (el) {
    if (io) io.observe(el); else { el.classList.add('in-view'); el.querySelectorAll('[data-count]').forEach(countUp); }
  });

  /* Qualitätsfaktor-Demo */
  var qfVal = document.getElementById('qf-val'), qfFill = document.getElementById('qf-fill'), qfCpc = document.getElementById('qf-cpc');
  if (qfVal) {
    var seq = [4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9, 9], k = 0;
    var setQf = function (q) {
      qfVal.textContent = q + '/10';
      qfFill.style.width = (q * 10) + '%';
      qfCpc.textContent = fmt(1.8 * (5 / (q + 1)) + 0.5, 2) + ' €';
    };
    if (reduce) setQf(9);
    else setInterval(function () { if (!document.hidden) { setQf(seq[k]); k = (k + 1) % seq.length; } }, 500);
  }


  /* Vimeo-Videos: erst beim Klick laden (schnelle Ladezeit, Do-not-track) */
  function vimeoSrc(id) {
    return 'https://player.vimeo.com/video/' + encodeURIComponent(id) +
      '?autoplay=1&dnt=1&title=0&byline=0&portrait=0&playsinline=1';
  }
  function vimeoFrame(id, label) {
    var f = document.createElement('iframe');
    f.src = vimeoSrc(id);
    f.title = label || 'Video';
    f.allow = 'autoplay; fullscreen; picture-in-picture';
    f.allowFullscreen = true;
    return f;
  }
  var lb = document.getElementById('lightbox'), lbPlayer = document.getElementById('lightbox-player'), lbClose = document.getElementById('lightbox-close'), lastFocus = null;
  function closeLb() {
    if (!lb || lb.hidden) return;
    lb.hidden = true; lbPlayer.innerHTML = ''; document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  if (lb) {
    lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }
  document.querySelectorAll('.vfacade').forEach(function (btn) {
    var poster = btn.getAttribute('data-poster');
    if (poster && !btn.querySelector('.vposter')) {
      var img = document.createElement('img');
      img.src = poster; img.alt = ''; img.className = 'vposter'; img.loading = 'lazy';
      btn.insertBefore(img, btn.firstChild);
    }
    if (!btn.getAttribute('data-vimeo-id')) btn.classList.add('is-empty');
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-vimeo-id');
      if (!id) return;
      var label = btn.getAttribute('aria-label');
      if (btn.getAttribute('data-mode') === 'lightbox' && lb) {
        lastFocus = btn;
        lbPlayer.innerHTML = ''; lbPlayer.appendChild(vimeoFrame(id, label));
        lb.hidden = false; document.body.style.overflow = 'hidden'; lbClose.focus();
      } else {
        btn.parentNode.replaceChild(vimeoFrame(id, label), btn);
      }
    });
  });


  /* Onboarding: Neu bei Google Ads / Bestehendes Konto */
  var segBtns = document.querySelectorAll('.seg-btn[data-path]');
  segBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var path = btn.getAttribute('data-path');
      segBtns.forEach(function (b) { var on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      document.querySelectorAll('.path-new').forEach(function (el) { el.hidden = path !== 'new'; });
      document.querySelectorAll('.path-old').forEach(function (el) { el.hidden = path !== 'old'; });
    });
  });

  /* CSS-Ersparnisrechner */
  var calc = document.getElementById('calc-budget'), calcOut = document.getElementById('calc-budget-out'), calcSave = document.getElementById('calc-save');
  function eur(v) { return v.toLocaleString('de-DE', { maximumFractionDigits: 0 }) + ' €'; }
  if (calc) {
    var upd = function () {
      var v = parseInt(calc.value, 10);
      calcOut.textContent = eur(v);
      calcSave.textContent = 'bis zu ' + eur(v * 0.2);
      var pct = (v - calc.min) / (calc.max - calc.min) * 100;
      calc.style.setProperty('--fill', pct + '%');
    };
    calc.addEventListener('input', upd); upd();
  }

  /* Preisseite: Laufzeit-Umschalter */
  var termBtns = document.querySelectorAll('.seg-btn[data-term]');
  function setTerm(term) {
    termBtns.forEach(function (b) { var on = b.getAttribute('data-term') === term; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    document.querySelectorAll('[data-price-' + term + ']').forEach(function (el) { el.innerHTML = el.getAttribute('data-price-' + term); });
    document.querySelectorAll('[data-link-' + term + ']').forEach(function (a) {
      var link = a.getAttribute('data-link-' + term);
      a.href = link ? link : 'index.html#kontakt';
    });
  }
  termBtns.forEach(function (b) { b.addEventListener('click', function () { setTerm(b.getAttribute('data-term')); }); });
  if (termBtns.length) setTerm('12');

  /* Plan-Buttons wählen Plan im Formular vor */
  var sel = document.getElementById('plan-select');
  document.querySelectorAll('[data-plan]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (!sel) return;
      var p = a.getAttribute('data-plan');
      for (var i = 0; i < sel.options.length; i++) if (sel.options[i].text.indexOf(p) === 0) sel.selectedIndex = i;
    });
  });

  /* Formular per Formspree senden (ohne Seitenwechsel) */
  var form = document.getElementById('start-form'), msg = document.getElementById('form-msg');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (form.action.indexOf('DEINE-FORM-ID') !== -1) {
        e.preventDefault();
        msg.style.color = '#f5c451';
        msg.textContent = 'Formular noch nicht verbunden – bitte Formspree-ID in index.html eintragen.';
        return;
      }
      e.preventDefault();
      msg.style.color = '#b4b4c3';
      msg.textContent = 'Wird gesendet …';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          msg.style.color = '#3ddc97';
          msg.textContent = 'Danke! Wir melden uns innerhalb von 24 Stunden mit deinem Kick-off-Termin.';
        })
        .catch(function () {
          msg.style.color = '#ff7a93';
          msg.textContent = 'Senden fehlgeschlagen. Bitte versuche es erneut oder schreib an fh@digital-growth.marketing.';
        });
    });
  }
})();
