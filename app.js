/* Renders the page from window.SITE and wires the interactions:
   project window, section nav, copy email, theme toggle, pointer light. */
(function () {
  var S = window.SITE, root = document.documentElement;
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(id) { return document.getElementById(id); }
  function all(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function tags(list) { return '<ul class="tags">' + list.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'; }

  var CHECK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6.3"/><path d="M5.4 8.2l1.8 1.8 3.5-3.7"/></svg>';
  var SPIN = '<svg class="spin" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><path d="M8 1.8v2.6M8 11.6v2.6M1.8 8h2.6M11.6 8h2.6M3.6 3.6l1.8 1.8M10.6 10.6l1.8 1.8M3.6 12.4l1.8-1.8M10.6 5.4l1.8-1.8"/></svg>';
  var OUT = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l5-5M4.5 3.5h4v4"/></svg>';

  /* Identity */
  $('name').textContent = S.name;
  $('role').textContent = S.role;
  $('line').innerHTML = '<b>' + esc(S.line[0]) + '</b>' + esc(S.line[1]);
  all('[data-email]').forEach(function (el) { el.textContent = S.contact.email; });
  all('[data-href]').forEach(function (a) { a.href = S.contact[a.getAttribute('data-href')]; });
  $('blurb').textContent = S.contact.blurb;
  $('open').textContent = S.open;

  /* Project window */
  var side = $('side'), pane = $('pane');
  side.innerHTML = S.groups.map(function (g) {
    return '<h3>' + esc(g[1]) + '</h3>' + S.projects.filter(function (p) { return p.group === g[0]; }).map(function (p) {
      return '<button type="button" data-id="' + p.id + '" aria-pressed="false">' + (p.group === 'now' ? SPIN : CHECK) + '<span>' + esc(p.name) + '</span></button>';
    }).join('');
  }).join('');

  function show(id, quiet) {
    var p = S.projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    all('button', side).forEach(function (b) {
      var on = b.getAttribute('data-id') === id;
      b.setAttribute('aria-pressed', String(on));
      if (on && !quiet && side.scrollWidth > side.clientWidth) side.scrollTo({ left: b.offsetLeft - 12, behavior: still ? 'auto' : 'smooth' });
    });
    var src = p.links
      ? p.links.map(function (l) { return '<a href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + OUT + '</a>'; }).join('')
      : '<span>' + (p.code === 'company' ? 'Company code, not public' : 'Private repository') + '</span>';
    pane.classList.toggle('quiet', !!quiet);
    pane.innerHTML = '<p class="pane-org">' + esc(p.org) + (p.year ? ' · ' + esc(p.year) : '') + '</p>' +
      '<h3>' + esc(p.name) + '</h3><p class="pane-desc">' + esc(p.desc) + '</p>' +
      '<ol class="steps">' + p.points.map(function (t, i) { return '<li style="--i:' + i + '">' + CHECK + '<span>' + esc(t) + '</span></li>'; }).join('') + '</ol>' +
      '<div class="pane-foot" style="--n:' + p.points.length + '">' +
        (p.stat ? '<div class="stat"><b>' + esc(p.stat[0]) + '</b><span>' + esc(p.stat[1]) + '</span></div>' : tags(p.tags || [])) +
        '<div class="src">' + src + '</div></div>';
  }
  side.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) show(b.getAttribute('data-id'));
  });
  /* Up and down arrows move through the list, like a file tree. */
  side.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    var list = all('button', side), at = list.indexOf(document.activeElement);
    if (at < 0) return;
    e.preventDefault();
    var next = list[Math.max(0, Math.min(list.length - 1, at + (e.key === 'ArrowDown' ? 1 : -1)))];
    next.focus();
    show(next.getAttribute('data-id'));
  });
  show(S.projects[0].id, true);

  /* Experience */
  $('exp').innerHTML = S.jobs.map(function (j) {
    return '<div class="job"><span class="job-when">' + esc(j.when) + '</span><div>' +
      '<h3>' + esc(j.title) + '<span> · ' + esc(j.org) + '</span></h3>' +
      '<p>' + esc(j.what) + '</p>' + tags(j.tags) + '</div></div>';
  }).join('');

  /* About: the first sentence of each paragraph carries the weight, the rest steps back. */
  $('say').innerHTML = S.about.map(function (t) {
    var cut = t.indexOf('. ') + 1;
    return '<p><b>' + esc(t.slice(0, cut)) + '</b>' + esc(t.slice(cut)) + '</p>';
  }).join('');
  $('facts').innerHTML = S.facts.map(function (f) {
    return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>';
  }).join('');

  /* Copy email. If the clipboard is refused, select the address so it can be copied by hand. */
  all('[data-copy]').forEach(function (btn) {
    var label = btn.textContent;
    btn.addEventListener('click', function () {
      function done() {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = label; }, 1600);
      }
      function select() {
        var r = document.createRange();
        r.selectNodeContents($('mail'));
        var sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        $('mail').scrollIntoView({ block: 'center' });
      }
      try { navigator.clipboard.writeText(S.contact.email).then(done, select); } catch (err) { select(); }
    });
  });

  /* Theme toggle. No saved choice means follow the system. */
  var themeBtn = $('theme'), system = matchMedia('(prefers-color-scheme: dark)');
  function isDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : system.matches;
  }
  function label() {
    themeBtn.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
    themeBtn.setAttribute('aria-pressed', String(isDark()));
  }
  themeBtn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    label();
  });
  if (system.addEventListener) system.addEventListener('change', label);
  label();

  /* Section nav: the active one is the last section whose top has passed 40% of the screen. */
  var links = all('.nav a'), secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  var queued = false;
  function track() {
    queued = false;
    var at = 0, edge = window.innerHeight * .4, i;
    for (i = 0; i < secs.length; i++) if (secs[i].getBoundingClientRect().top < edge) at = i;
    var doc = document.scrollingElement || document.documentElement;
    if (window.scrollY + window.innerHeight > doc.scrollHeight - 4) at = secs.length - 1;
    links.forEach(function (a, k) {
      a.classList.toggle('on', k === at);
      if (k === at) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(track); } }, { passive: true });
  addEventListener('resize', track);
  track();

  /* A soft light follows the pointer (visible in the dark theme only). */
  var lit = false, mx = 0, my = 0;
  addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    mx = e.clientX; my = e.clientY;
    if (lit) return;
    lit = true;
    requestAnimationFrame(function () {
      lit = false;
      root.style.setProperty('--mx', mx + 'px');
      root.style.setProperty('--my', my + 'px');
    });
  });
})();
