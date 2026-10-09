(function () {
  const S = SITE, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const KOI = '<svg class="koi-mark" viewBox="0 0 40 16" aria-hidden="true"><path d="M2 8c4-6 16-7 24-3l6-4-1 7 1 7-6-4C18 15 6 14 2 8z" fill="currentColor"/><circle cx="7" cy="7" r="1.2" fill="#0b3340"/></svg>';
  const GH = '<svg viewBox="0 0 16 16" aria-hidden="true" class="gh"><path fill="currentColor" d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0z"/></svg>';
  const ICON = {
    bike: '<circle cx="5.5" cy="16" r="3.8" class="wheel"/><circle cx="18.5" cy="16" r="3.8" class="wheel"/><path d="M5.5 16l4-8h6l3 8M9.5 8l4 8h-8M14 5h3"/>',
    shuttle: '<path d="M12 21.5a2.5 2.5 0 0 0 2.5-2.5v-2.5h-5V19a2.5 2.5 0 0 0 2.5 2.5zM9.5 16.5L6.5 3M14.5 16.5L17.5 3M12 16.5V3M7.5 8.5h9"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 10h4v4h-4z"/>',
    pad: '<path d="M6 8h12a4 4 0 0 1 4 4v1.5a2.8 2.8 0 0 1-5 1.6L15.5 13h-7L7 15.1a2.8 2.8 0 0 1-5-1.6V12a4 4 0 0 1 4-4z"/><path d="M7 10.5v3M5.5 12h3M16 11h.01M18 12.5h.01"/>',
    pan: '<path d="M3 12h13a6.5 6.5 0 0 1-6.5 6.5A6.5 6.5 0 0 1 3 12zM16 12.5l5.5-2.5"/><path d="M7 8.5c0-1.2 1.2-1.2 1.2-2.4M10.5 8.5c0-1.2 1.2-1.2 1.2-2.4" class="steam"/>'
  };
  const byId = id => S.projects.find(p => p.id === id);
  const count = name => S.projects.filter(p => p.skills.includes(name)).length;
  const groupOf = name => (S.skills.find(g => g.items.includes(name)) || { key: 'eng' }).key;
  const head = (n, title, sub) => `<div class="sec-head"><span class="kicker">${n}</span><h2>${title}</h2>${sub ? `<p class="sub">${sub}</p>` : ''}</div>`;
  const NAV = [['about', 'About'], ['journey', 'Journey'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills'], ['contact', 'Contact']];
  const FROG = '<svg class="frog" viewBox="-6 0 66 46" aria-hidden="true"><g class="legs-sit"><path d="M15 33c-9 1-9 9-3 10h11z" fill="#3f7a2e"/></g><g class="legs-jump"><path d="M16 30L2 37l-6-1" stroke="#3f7a2e" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g><ellipse cx="28" cy="29" rx="18" ry="12" fill="#6aa84f"/><ellipse cx="32" cy="34" rx="11" ry="6" fill="#d3e6a8"/><circle cx="20" cy="24" r="2.2" fill="#3f7a2e"/><circle cx="26" cy="20" r="1.6" fill="#3f7a2e"/><ellipse cx="42" cy="23" rx="11" ry="9" fill="#6aa84f"/><circle cx="44" cy="15" r="5.5" fill="#6aa84f"/><circle cx="45" cy="14.5" r="3.3" fill="#f2d35b"/><rect x="43.6" y="13.6" width="3.6" height="1.8" rx=".9" fill="#111"/><path d="M45 26q5 2 9-1" stroke="#2e5e24" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M36 35l3 7h5" stroke="#3f7a2e" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const PAD = '<svg viewBox="-24 -24 48 48" class="pad-svg" aria-hidden="true"><path d="M0 0L20.5 -7A22 22 0 1 0 20.5 7Z" class="pad-leaf"/><path d="M0 0L-15 -15M0 0L-21 0M0 0L-15 15M0 0L0 21M0 0L0 -21M0 0L11 18M0 0L11 -18" class="pad-vein"/><g class="bloom"><circle r="5" cx="-6" cy="-6" fill="#f4a6c0"/><circle r="5" cx="-1" cy="-9" fill="#f8c4d4"/><circle r="5" cx="-10" cy="-2" fill="#f8c4d4"/><circle r="2.4" cx="-5.5" cy="-5.5" fill="#f2c14e"/></g></svg>';
  const allSkills = S.skills.flatMap(g => g.items).filter(k => count(k) > 0);

  $('#app').innerHTML = `
  <a class="skip" href="#about">Skip to content</a>
  <header class="nav">
    <a class="brand" href="#top">${KOI}<span>${S.name}</span></a>
    <nav class="nav-links" aria-label="Sections">${NAV.map(([id, t]) => `<a href="#${id}" data-sec="${id}">${t}</a>`).join('')}<span class="nav-ind" aria-hidden="true"></span></nav>
    <button class="pond-go" id="pond-go" type="button" title="Hide the portfolio and just enjoy the pond"><svg class="bi" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12L21.5 8.5A10 10 0 1 0 21.5 15.5Z" fill="currentColor" opacity=".9"/><circle cx="8" cy="9" r="2.2" fill="#f4a6c0"/></svg><span>Pond<span class="long"> mode</span></span></button>
    <button class="still" id="still" type="button" aria-pressed="false" title="Pause the pond animation"><svg class="bi wave-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span class="still-t">Still water</span></button>
  </header>
  <main>
    <section class="hero" id="top">
      <div class="hero-text">
        <div class="hero-id"><h1>${S.name}</h1><p class="eyebrow">${S.role} · ${S.loc}</p></div>
        <p class="headline">I build <span class="rot"><span class="rot-word">${S.rotating[0]}</span></span> for healthcare and enterprise teams.</p>
        <p class="lede">${esc(S.heroLead)}</p>
        <div class="cta"><a class="btn btn-koi" href="#projects">See my work <i class="arr" aria-hidden="true">↓</i></a><a class="btn" href="#contact">Get in touch <i class="arr" aria-hidden="true">→</i></a></div>
        <p class="hint">Click open water to feed the koi. Just here for the fish? <button type="button" class="hint-link" data-pond>Try Pond mode</button></p>
      </div>
      <div class="hero-side">
        <div class="panel status"><span class="dot" aria-hidden="true"></span><div><b>${esc(S.status.open)}</b><span>Now at ${esc(S.status.now)}</span></div></div>
        <ul class="stones">${S.stats.map((s, i) => `<li class="stone s${i}"><b>${s.value}</b><span>${esc(s.label)}</span></li>`).join('')}</ul>
        <div class="panel latest"><p class="latest-h">Latest</p><ul>${S.latest.map(l => `<li><button type="button" class="lt-row" data-open="${l.open}"><span class="lt-tag">${esc(l.tag)}</span><span class="lt-text">${esc(l.text)}</span><i class="arr" aria-hidden="true">→</i></button></li>`).join('')}</ul></div>
      </div>
    </section>
    <div class="wave" aria-hidden="true"></div>

    <section class="sec" id="about">
      ${head('01', 'About')}
      <div class="about-grid">
        <div class="panel about-text">${S.about.map(p => `<p>${esc(p)}</p>`).join('')}</div>
        <dl class="panel facts">${S.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      </div>
      <h3 class="sub-title">Beyond work <span>The person behind the pull requests</span></h3>
      <div class="beyond">${S.beyond.filter(b => !b.todo).map(b => `<div class="panel by${b.todo ? ' todo' : ''}">${b.todo ? '<span class="draft">Draft · to fill in</span>' : ''}<h3>${esc(b.title)}</h3><p>${esc(b.text)}</p>${b.interests ? `<ul class="interests">${b.interests.map(([k, t]) => `<li><button type="button" class="interest" data-kind="${k}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>${t}</button></li>`).join('')}</ul>` : ''}</div>`).join('')}</div>
    </section>
    <div class="wave" aria-hidden="true"></div>

    <section class="sec" id="journey">
      ${head('02', 'Journey', 'Tap a lily pad and the frog hops there. Or let it hop the whole way.')}
      <div class="panel hop">
        <div class="hop-stage">
          <ol class="pads" role="tablist" aria-label="Journey">${S.journey.map((j, i) => `<li style="--i:${i}"><button type="button" role="tab" class="lp" aria-selected="false" data-i="${i}" aria-label="${j.when}, ${esc(j.where)}">${PAD}<b>${j.when}</b><span>${esc(j.where)}</span></button></li>`).join('')}</ol>
          ${FROG}
        </div>
        <div class="hop-bar">
          <button type="button" class="hop-btn" data-hop="-1" aria-label="Previous step">←</button>
          <button type="button" class="hop-btn hop-play" aria-pressed="false">Hop the whole way</button>
          <button type="button" class="hop-btn" data-hop="1" aria-label="Next step">→</button>
          <span class="hop-count" aria-hidden="true"></span>
        </div>
        <div class="hop-card" aria-live="polite"></div>
      </div>
    </section>
    <div class="wave" aria-hidden="true"></div>

    <section class="sec" id="experience">
      ${head('03', 'Experience', 'Pick a company to see what I did there. Tap a skill to trace it.')}
      <div class="panel exp">
        <div class="exp-tabs" role="tablist" aria-label="Employers" aria-orientation="vertical">
          ${S.jobs.map((j, i) => `<button role="tab" id="tab-${i}" aria-controls="job-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><b>${esc(j.org)}</b><span>${j.when}</span></button>`).join('')}
          <span class="exp-ind" aria-hidden="true"></span>
        </div>
        <div class="exp-body" id="job-panel" role="tabpanel" aria-labelledby="tab-0"></div>
      </div>
    </section>
    <div class="wave" aria-hidden="true"></div>

    <section class="sec" id="projects">
      ${head('04', 'Projects', 'Open a project for details, or jump straight to its code.')}
      <div class="toolbar">
        <div class="filters" role="group" aria-label="Filter projects">
          <button type="button" data-cat="recent" aria-pressed="true">Most recent</button>
          ${Object.entries(S.cats).map(([k, v]) => `<button type="button" data-cat="${k}" aria-pressed="false">${v}</button>`).join('')}
          <button type="button" data-cat="all" aria-pressed="false">All ${S.projects.length}</button>
        </div>
        <div class="toolbar-right"><button type="button" class="skill-chip" hidden></button><span class="count" aria-live="polite"></span></div>
      </div>
      <p class="recent-note" hidden></p>
      <ul class="projects-grid">${S.projects.map((p, i) => `<li class="proj panel" data-i="${i}">
        <div class="proj-top"><span>${esc(p.org)}</span><span>${p.year}</span></div>
        <h3><button type="button" class="proj-open" data-open="${p.id}">${esc(p.name)}</button></h3>
        <p class="proj-desc">${esc(p.desc)}</p>
        ${p.stat ? `<div class="proj-stat"><b>${p.stat[0]}</b><span>${esc(p.stat[1])}</span></div>` : ''}
        <ul class="tags">${p.skills.map(s => `<li class="t-${groupOf(s)}">${esc(s)}</li>`).join('')}</ul>
        <div class="proj-foot"><span class="proj-more" aria-hidden="true">Details →</span>
          ${p.link ? `<a class="repo" href="${p.link}" target="_blank" rel="noopener">${GH}Code</a>` : p.private ? '<span class="priv">Company code</span>' : ''}</div>
      </li>`).join('')}</ul>
    </section>
    <div class="wave" aria-hidden="true"></div>

    <section class="sec" id="skills">
      ${head('05', 'Skills', 'Hover or tap anything to see what connects to it. Tap again to let go.')}
      <div class="panel web-wrap">
        <div class="legend">${S.skills.map(g => `<span class="lg-${g.key}">${g.group}</span>`).join('')}</div>
        <div class="web">
          <canvas class="web-lines" aria-hidden="true"></canvas>
          <ul class="web-col web-skills">${allSkills.map(k => `<li><button type="button" class="node sk-node g-${groupOf(k)}" data-skill="${esc(k)}">${esc(k)}<span class="n">${count(k)}</span></button></li>`).join('')}</ul>
          <ul class="web-col web-projects">${S.projects.map(p => `<li><button type="button" class="node pj-node" data-proj="${p.id}">${esc(p.name)}</button></li>`).join('')}</ul>
        </div>
        <div class="web-detail" aria-live="polite"></div>
      </div>
    </section>
    <div class="wave" aria-hidden="true"></div>

    <section class="sec" id="contact">
      ${head('06', 'Contact')}
      <div class="panel contact">
        <div class="contact-main">
          <p class="contact-blurb">${esc(S.contact.blurb)}</p>
          <div class="email-row"><code id="email">${S.contact.email}</code><button type="button" class="btn btn-koi" id="copy">Copy email</button></div>
        </div>
        <ul class="contact-links">
          <li><a href="${S.contact.github}" target="_blank" rel="noopener"><b>GitHub</b><span>github.com/shaswat28</span><i>↗</i></a></li>
          <li><a href="${S.contact.linkedin}" target="_blank" rel="noopener"><b>LinkedIn</b><span>in/shaswat-sharma28</span><i>↗</i></a></li>
        </ul>
      </div>
    </section>
  </main>
  <nav class="stream" aria-label="Where you are">
    <ol>${NAV.map(([id, t]) => `<li><a href="#${id}" data-sec="${id}"><span class="st-dot" aria-hidden="true"></span><span class="lbl">${t}</span></a></li>`).join('')}</ol>
    <span class="stream-koi" aria-hidden="true">${KOI}</span>
  </nav>
  <footer class="foot"><span>© 2026 ${S.name}</span><span class="census">Pond census: 10 koi, 3 turtles, a few frogs. <span class="fed">No one has fed them yet.</span></span></footer>

  <div class="pond-ui" hidden>
    <div class="pond-bar">
      <button type="button" class="pbtn pond-back">← Portfolio</button>
      <span class="pond-title">The pond</span>
      <button type="button" class="pbtn pond-guide-btn" aria-expanded="false" aria-controls="guide">Field guide</button>
    </div>
    <p class="pond-tip">Tap a fish, frog or turtle to identify it. Tap open water to drop food.</p>
    <div class="pond-card" hidden aria-live="polite"></div>
    <aside class="guide" id="guide" hidden aria-label="Field guide"></aside>
  </div>

  <dialog class="proj-dialog" id="dlg" aria-labelledby="dlg-title">
    <form method="dialog" class="dlg-close"><button aria-label="Close">✕</button></form>
    <div class="dlg-body"></div>
    <div class="dlg-nav"><button type="button" data-step="-1">← Previous</button><button type="button" data-step="1">Next →</button></div>
  </dialog>`;

  const hl = $('.headline'), rw = $('.rot-word');
  function lockHeadline() {
    const cur = rw.textContent; hl.style.minHeight = '';
    let m = 0; S.rotating.forEach(t => { rw.textContent = t; m = Math.max(m, hl.getBoundingClientRect().height); });
    rw.textContent = cur; hl.style.minHeight = Math.ceil(m) + 'px';
  }
  lockHeadline(); addEventListener('resize', lockHeadline);
  document.fonts && document.fonts.ready.then(lockHeadline);
  if (!RM) {
    let k = 0; const w = rw;
    setInterval(() => {
      w.classList.add('out');
      setTimeout(() => { k = (k + 1) % S.rotating.length; w.textContent = S.rotating[k]; w.classList.remove('out'); }, 350);
    }, 2800);
  }

  const links = $$('.nav-links a'), ind = $('.nav-ind');
  let activeSec = 'top', overPanel = false;
  let pondOn = false;
  const quiet = matchMedia('(prefers-contrast: more), (prefers-reduced-transparency: reduce)');
  const calm = () => window.POND && POND.setCalm(!pondOn && (quiet.matches || activeSec !== 'top' || overPanel));
  const setActive = id => {
    activeSec = id; calm();
    links.forEach(a => a.toggleAttribute('aria-current', a.dataset.sec === id));
    $$('.stream a').forEach(a => a.toggleAttribute('aria-current', a.dataset.sec === id));
    const a = links.find(x => x.dataset.sec === id);
    ind.style.opacity = a ? 1 : 0;
    if (a) {
      ind.style.width = a.offsetWidth + 'px'; ind.style.transform = `translateX(${a.offsetLeft}px)`;
      const nl = a.parentElement;
      if (nl.scrollWidth > nl.clientWidth) nl.scrollTo({ left: a.offsetLeft - (nl.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
    }
  };
  document.addEventListener('pointerover', e => { const v = !!e.target.closest('.panel, .nav, dialog'); if (v !== overPanel) { overPanel = v; calm(); } });

  const secs = $$('main > section'), skoi = $('.stream-koi'), dots = $$('.stream li');
  let ticking = false;
  function track() {
    ticking = false;
    const line = innerHeight * .4, tops = secs.map(s => s.getBoundingClientRect().top);
    let k = 0; tops.forEach((t, i) => { if (t <= line) k = i; });
    if (secs[k].id !== activeSec) setActive(secs[k].id === 'top' ? 'top' : secs[k].id);
    if (!skoi.offsetParent) return;
    const pos = i => i <= 0 ? 0 : dots[Math.min(i, dots.length) - 1].offsetTop + dots[Math.min(i, dots.length) - 1].offsetHeight / 2;
    const next = k + 1 < tops.length ? tops[k + 1] : tops[k] + secs[k].offsetHeight;
    const atEnd = scrollY + innerHeight >= (document.scrollingElement || document.documentElement).scrollHeight - 2;
    const f = atEnd ? 1 : Math.max(0, Math.min(1, (line - tops[k]) / Math.max(1, next - tops[k])));
    skoi.style.top = (pos(k) + (pos(k + 1) - pos(k)) * f).toFixed(1) + 'px';
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(track); } }, { passive: true });
  addEventListener('resize', track);
  track(); calm();
  quiet.addEventListener && quiet.addEventListener('change', calm);

  const RIPPLE = '.btn, .pbtn, .hop-btn, .filters button, .link-chip, .pond-go, .still, .interest, .node, .repo, .skill-chip';
  document.addEventListener('pointerdown', e => {
    const el = e.target.closest(RIPPLE); if (!el || RM) return;
    const r = el.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2.2, s = document.createElement('span');
    s.className = 'rpl'; s.style.cssText = `left:${e.clientX - r.left}px;top:${e.clientY - r.top}px;width:${d}px;height:${d}px`;
    el.appendChild(s);
    s.animate([{ transform: 'translate(-50%,-50%) scale(0)', opacity: .5 }, { transform: 'translate(-50%,-50%) scale(1)', opacity: 0 }], { duration: 600, easing: 'ease-out' }).finished.then(() => s.remove());
  });

  const still = $('#still');
  const syncStill = () => { const v = window.POND && POND.isStill(); still.setAttribute('aria-pressed', String(!!v)); $('.still-t', still).innerHTML = v ? '<span class="long">Let it </span>flow' : 'Still<span class="long"> water</span>'; };
  still.onclick = () => { POND.setStill(!POND.isStill()); syncStill(); };
  syncStill();

  const MOVES = {
    bike: [{ transform: 'none' }, { transform: 'translateX(5px) rotate(-4deg)' }, { transform: 'translateX(-2px)' }, { transform: 'none' }],
    shuttle: [{ transform: 'none' }, { transform: 'translateY(-6px) rotate(180deg)' }, { transform: 'rotate(360deg)' }],
    music: [{ transform: 'none' }, { transform: 'translateY(-6px) rotate(-10deg)' }, { transform: 'rotate(8deg)' }, { transform: 'none' }],
    chip: [{ transform: 'none', filter: 'none' }, { transform: 'scale(1.18)', filter: 'drop-shadow(0 0 5px #f4a6c0)' }, { transform: 'none', filter: 'none' }],
    pad: [{ transform: 'none' }, { transform: 'rotate(-14deg)' }, { transform: 'rotate(12deg)' }, { transform: 'rotate(-6deg)' }, { transform: 'none' }],
    pan: [{ transform: 'none' }, { transform: 'translateY(-7px) rotate(-16deg)' }, { transform: 'translateY(1px) rotate(5deg)' }, { transform: 'none' }]
  };
  $$('.interest').forEach(b => {
    const svg = $('svg', b), play = () => { if (!RM) svg.animate(MOVES[b.dataset.kind], { duration: 650, easing: 'cubic-bezier(.3,1.4,.5,1)' }); };
    b.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') play(); });
    b.addEventListener('click', play);
  });

  const stage = $('.hop-stage'), frog = $('.frog', stage), lps = $$('.lp'), hopCard = $('.hop-card'), playBtn = $('.hop-play');
  let at = 0, busy = Promise.resolve(), facing = 1, autoplay = null;
  const seat = i => { const r = $('.pad-svg', lps[i]).getBoundingClientRect(), st = stage.getBoundingClientRect(); return { x: r.left - st.left + r.width / 2, y: r.top - st.top + r.height / 2 }; };
  const fw = () => frog.getBoundingClientRect().width || 44;
  const place = (p, dir) => { const w = fw(); frog.style.transform = `translate(${p.x - w / 2}px, ${p.y - w * .68}px) scaleX(${dir})`; };
  function showStep(i) {
    lps.forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.classList.toggle('visited', k <= i); b.tabIndex = k === i ? 0 : -1; });
    const j = S.journey[i];
    hopCard.innerHTML = `<div class="hc-top"><span class="hc-tag">${esc(j.tag)}</span><span class="hc-when">${j.when}</span></div>
      <h3>${esc(j.where)} <span>· ${esc(j.title)}</span></h3><p>${esc(j.what)}</p>
      ${j.links.length ? `<div class="hc-links"><span>Related</span>${j.links.map(id => `<button type="button" class="link-chip" data-open="${id}">${esc(byId(id).name)}</button>`).join('')}</div>` : ''}`;
    hopCard.classList.remove('swap'); void hopCard.offsetWidth; hopCard.classList.add('swap');
    $('.hop-count').textContent = `${i + 1} / ${S.journey.length}`;
  }
  function hopOnce(to) {
    const a = seat(at), b = seat(to), dir = b.x >= a.x ? 1 : -1, h = 34 + Math.abs(b.x - a.x) * .12;
    facing = dir; at = to;
    if (RM) { place(b, dir); return Promise.resolve(); }
    frog.classList.add('air');
    const w = fw(), frames = Array.from({ length: 13 }, (_, n) => { const t = n / 12; return { transform: `translate(${a.x + (b.x - a.x) * t - w / 2}px, ${a.y + (b.y - a.y) * t - Math.sin(Math.PI * t) * h - w * .68}px) scaleX(${dir})` }; });
    return frog.animate(frames, { duration: 460, easing: 'linear' }).finished.then(() => {
      place(b, dir); frog.classList.remove('air');
      const pad = $('.pad-svg', lps[to]);
      pad.animate([{ transform: 'scale(1)' }, { transform: 'scale(.86)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }], { duration: 380 });
      const ring = document.createElement('span'); ring.className = 'hop-ring';
      ring.style.left = b.x + 'px'; ring.style.top = b.y + 'px'; stage.appendChild(ring);
      ring.animate([{ transform: 'translate(-50%,-50%) scale(.4)', opacity: .8 }, { transform: 'translate(-50%,-50%) scale(2.2)', opacity: 0 }], { duration: 700 }).finished.then(() => ring.remove());
    });
  }
  function hopTo(i) {
    i = Math.max(0, Math.min(S.journey.length - 1, i));
    busy = busy.then(async () => { while (at !== i) { await hopOnce(at + Math.sign(i - at)); showStep(at); } showStep(at); });
    return busy;
  }
  function stopAuto() { autoplay = null; playBtn.setAttribute('aria-pressed', 'false'); playBtn.textContent = 'Hop the whole way'; }
  lps.forEach((b, i) => {
    b.onclick = () => { stopAuto(); hopTo(i); };
    b.onkeydown = e => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); stopAuto(); hopTo(at + d).then(() => lps[at].focus()); } };
  });
  $$('[data-hop]').forEach(b => b.onclick = () => { stopAuto(); hopTo(at + +b.dataset.hop); });
  playBtn.onclick = async () => {
    if (autoplay) return stopAuto();
    const run = autoplay = {}; playBtn.setAttribute('aria-pressed', 'true'); playBtn.textContent = 'Stop';
    if (at === S.journey.length - 1) { await busy; at = 0; place(seat(0), 1); showStep(0); await new Promise(r => setTimeout(r, 700)); }
    while (autoplay === run && at < S.journey.length - 1) { await hopTo(at + 1); await new Promise(r => setTimeout(r, 1500)); }
    if (autoplay === run) stopAuto();
  };
  new ResizeObserver(() => place(seat(at), facing)).observe(stage);
  place(seat(at), 1); showStep(at);
  document.fonts && document.fonts.ready.then(() => place(seat(at), facing));

  const tabs = $$('.exp-tabs [role=tab]'), body = $('.exp-body'), eind = $('.exp-ind');
  function showJob(i, focus) {
    const j = S.jobs[i];
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
    body.setAttribute('aria-labelledby', 'tab-' + i);
    body.innerHTML = `<h3>${esc(j.title)} <span>@ ${esc(j.org)}</span></h3><p class="exp-meta">${j.when} · ${j.where}</p>
      <ul class="exp-list">${j.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      <div class="exp-skills"><span>Skills used</span>${j.skills.map(k => count(k) ? `<button type="button" class="link-chip t-${groupOf(k)}" data-trace="${esc(k)}">${esc(k)}</button>` : `<span class="plain-chip">${esc(k)}</span>`).join('')}</div>`;
    body.classList.remove('swap'); void body.offsetWidth; body.classList.add('swap');
    const t = tabs[i], vertical = getComputedStyle($('.exp-tabs')).flexDirection === 'column';
    eind.style.transform = vertical ? `translateY(${t.offsetTop}px)` : `translateX(${t.offsetLeft}px)`;
    eind.style.height = vertical ? t.offsetHeight + 'px' : ''; eind.style.width = vertical ? '' : t.offsetWidth + 'px';
    if (focus) t.focus();
  }
  tabs.forEach((t, i) => {
    t.onclick = () => showJob(i);
    t.onkeydown = e => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); showJob((i + d + tabs.length) % tabs.length, true); } };
  });
  showJob(0);

  let cat = 'recent', skill = null;
  const cards = $$('.proj'), chip = $('.skill-chip'), note = $('.recent-note'), grid = $('.projects-grid');
  const recentLimit = () => Math.max(3, getComputedStyle(grid).gridTemplateColumns.split(' ').length * 2);
  function applyFilter() {
    let n = 0;
    const rec = cat === 'recent' && !skill, lim = recentLimit(), order = S.recent;
    cards.forEach((c, i) => {
      const p = S.projects[i], r = order.indexOf(p.id);
      const ok = rec ? r > -1 && r < lim : (cat === 'all' || cat === 'recent' || p.cats.includes(cat)) && (!skill || p.skills.includes(skill));
      c.style.order = rec && r > -1 ? r : '';
      const was = !c.hidden; c.hidden = !ok;
      if (ok) { n++; if (!was || !rec) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); } }
    });
    $$('.filters button').forEach(b => b.setAttribute('aria-pressed', String(!skill && b.dataset.cat === cat)));
    chip.hidden = !skill; if (skill) chip.innerHTML = `Skill: ${esc(skill)} <span aria-hidden="true">✕</span><span class="sr">(clear)</span>`;
    $('.count').textContent = rec ? `${n} of ${S.projects.length}` : `${n} project${n === 1 ? '' : 's'}`;
    note.hidden = !rec;
    if (rec) note.innerHTML = `Showing my ${n} most recent projects. The tabs above have the rest, or <button type="button" class="see-all">see all ${S.projects.length}</button>.`;
  }
  $$('.filters button').forEach(b => b.onclick = () => { cat = b.dataset.cat; skill = null; applyFilter(); });
  note.addEventListener('click', e => { if (e.target.closest('.see-all')) { cat = 'all'; applyFilter(); } });
  chip.onclick = () => { skill = null; applyFilter(); };
  const showSkillProjects = k => { skill = k; cat = 'all'; applyFilter(); $('#projects').scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); };
  applyFilter();
  let lastCols = recentLimit();
  addEventListener('resize', () => { const l = recentLimit(); if (l !== lastCols) { lastCols = l; if (cat === 'recent') applyFilter(); } });
  cards.forEach(c => c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--x', (e.clientX - r.left) + 'px'); c.style.setProperty('--y', (e.clientY - r.top) + 'px'); }));

  const web = $('.web'), lc = $('.web-lines'), lctx = lc.getContext('2d'), wdetail = $('.web-detail');
  const skNodes = $$('.sk-node'), pjNodes = $$('.pj-node');
  const EDGE_COL = { ai: '255,122,61', eng: '242,193,78', data: '111,191,106' };
  let edges = [], pinned = null, lit = null, flowId = 0, lw = 1, lh = 1;
  function drawWeb() {
    const wr = web.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
    lw = wr.width; lh = wr.height;
    lc.width = Math.round(lw * d); lc.height = Math.round(lh * d); lctx.setTransform(d, 0, 0, d, 0, 0);
    edges = [];
    skNodes.forEach(sn => {
      const k = sn.dataset.skill, a = sn.getBoundingClientRect(), x1 = a.right - wr.left + 4, y1 = a.top + a.height / 2 - wr.top;
      S.projects.forEach(p => {
        if (!p.skills.includes(k)) return;
        const b = pjNodes.find(n => n.dataset.proj === p.id).getBoundingClientRect();
        edges.push({ k, p: p.id, col: EDGE_COL[groupOf(k)], x1, y1, x2: b.left - wr.left - 4, y2: b.top + b.height / 2 - wr.top });
      });
    });
    light(pinned);
  }
  const isOn = e => !!(lit && ((lit.k && e.k === lit.k) || (lit.p && e.p === lit.p)));
  function paintEdges(t) {
    lctx.clearRect(0, 0, lw, lh);
    const pass = on => edges.forEach(e => {
      if (isOn(e) !== on) return;
      const mx = (e.x1 + e.x2) / 2;
      lctx.strokeStyle = `rgba(${e.col},${on ? .95 : lit ? .07 : .28})`;
      lctx.lineWidth = on ? 2.2 : 1.3;
      lctx.beginPath(); lctx.moveTo(e.x1, e.y1); lctx.bezierCurveTo(mx, e.y1, mx, e.y2, e.x2, e.y2); lctx.stroke();
      if (on && !RM) for (let q = 0; q < 3; q++) {
        const u = ((t / 1600) + q / 3) % 1, v = 1 - u;
        const x = v * v * v * e.x1 + 3 * v * v * u * mx + 3 * v * u * u * mx + u * u * u * e.x2;
        const y = v * v * v * e.y1 + 3 * v * v * u * e.y1 + 3 * v * u * u * e.y2 + u * u * u * e.y2;
        lctx.fillStyle = `rgba(${e.col},1)`; lctx.beginPath(); lctx.arc(x, y, 2.4, 0, 6.3); lctx.fill();
      }
    });
    pass(false); pass(true);
    if (!lit && !RM && edges.length) {
      idle.forEach((b, i) => {
        let u = (t - b.t0) / 2600;
        if (u > 1 || !edges[b.e]) { idle[i] = { e: Math.random() * edges.length | 0, t0: t }; return; }
        const e = edges[b.e], mx = (e.x1 + e.x2) / 2, v = 1 - u;
        const x = v * v * v * e.x1 + 3 * v * v * u * mx + 3 * v * u * u * mx + u * u * u * e.x2;
        const y = v * v * v * e.y1 + 3 * v * v * u * e.y1 + 3 * v * u * u * e.y2 + u * u * u * e.y2;
        lctx.fillStyle = `rgba(${e.col},${(Math.sin(Math.PI * u) * .8).toFixed(2)})`; lctx.beginPath(); lctx.arc(x, y, 2.2, 0, 6.3); lctx.fill();
      });
    }
  }
  const idle = Array.from({ length: 6 }, (_, i) => ({ e: 0, t0: -i * 450 - 3000 }));
  let webSeen = true;
  new IntersectionObserver(es => { webSeen = es[0].isIntersecting; if (webSeen) { cancelAnimationFrame(flowId); flow(performance.now()); } }).observe(web);
  function flow(t) { paintEdges(t); if (!RM && webSeen) flowId = requestAnimationFrame(flow); }
  function light(sel) {
    const on = new Set();
    if (sel) edges.forEach(e => { if ((sel.k && e.k === sel.k) || (sel.p && e.p === sel.p)) { on.add('k:' + e.k); on.add('p:' + e.p); } });
    lit = sel; cancelAnimationFrame(flowId); flow(performance.now());
    web.classList.toggle('focus', !!sel);
    skNodes.forEach(n => n.classList.toggle('on', on.has('k:' + n.dataset.skill)));
    pjNodes.forEach(n => n.classList.toggle('on', on.has('p:' + n.dataset.proj)));
    [...skNodes, ...pjNodes].forEach(n => n.setAttribute('aria-pressed', String(!!pinned && (pinned.k === n.dataset.skill || pinned.p === n.dataset.proj))));
    if (!sel) { wdetail.innerHTML = `<span class="muted">${allSkills.length} skills, ${S.projects.length} projects, ${edges.length} connections. Pick one to trace it.</span>`; return; }
    if (sel.k) {
      const ps = S.projects.filter(p => p.skills.includes(sel.k));
      wdetail.innerHTML = `<b>${esc(sel.k)}</b> shows up in ${ps.length} project${ps.length > 1 ? 's' : ''}. <button type="button" class="link-chip" data-show="${esc(sel.k)}">Show them in Projects</button>`;
    } else {
      const p = byId(sel.p);
      wdetail.innerHTML = `<b>${esc(p.name)}</b> uses ${p.skills.map(esc).join(', ')}. <button type="button" class="link-chip" data-open="${p.id}">Open details</button>${p.link ? ` <a class="link-chip" href="${p.link}" target="_blank" rel="noopener">View code ↗</a>` : ''}`;
    }
  }
  const selOf = n => n.dataset.skill ? { k: n.dataset.skill } : { p: n.dataset.proj };
  [...skNodes, ...pjNodes].forEach(n => {
    n.addEventListener('pointerenter', () => { if (!pinned) light(selOf(n)); });
    n.addEventListener('pointerleave', () => { if (!pinned) light(null); });
    n.addEventListener('focus', () => { if (!pinned) light(selOf(n)); });
    n.onclick = () => {
      const s = selOf(n), same = pinned && pinned.k === s.k && pinned.p === s.p;
      pinned = same ? null : s; light(pinned || s);
    };
  });
  const traceSkill = k => { pinned = { k }; light(pinned); $('#skills').scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); };
  new ResizeObserver(drawWeb).observe(web);
  document.fonts && document.fonts.ready.then(drawWeb);

  const dlg = $('#dlg'); let cur = 0;
  function openProject(i) {
    cur = (i + S.projects.length) % S.projects.length;
    const p = S.projects[cur];
    $('.dlg-body', dlg).innerHTML = `
      <p class="dlg-kicker">${esc(p.org)}${p.year ? ' · ' + p.year : ''}</p>
      <h3 id="dlg-title">${esc(p.name)}</h3>
      <p class="dlg-desc">${esc(p.desc)}</p>
      ${p.stat ? `<div class="dlg-stat"><b>${p.stat[0]}</b><span>${esc(p.stat[1])}</span></div>` : ''}
      <ul class="dlg-points">${p.points.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <div class="dlg-skills">${p.skills.map(s => `<button type="button" class="link-chip t-${groupOf(s)}" data-trace="${esc(s)}">${esc(s)}</button>`).join('')}</div>
      ${p.link ? `<a class="btn btn-koi" href="${p.link}" target="_blank" rel="noopener">${GH} Open the repository ↗</a>` : p.private ? '<p class="dlg-private">Built for a company, so the code is private. Happy to talk through it.</p>' : ''}`;
    if (!dlg.open) { dlg.showModal ? dlg.showModal() : dlg.setAttribute('open', ''); }
  }
  $$('.dlg-nav button').forEach(b => b.onclick = () => openProject(cur + +b.dataset.step));
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

  document.addEventListener('click', e => {
    const o = e.target.closest('[data-open]'), t = e.target.closest('[data-trace]'), s = e.target.closest('[data-show]');
    if (o) openProject(S.projects.findIndex(p => p.id === o.dataset.open));
    else if (t) { if (dlg.open) dlg.close(); traceSkill(t.dataset.trace); }
    else if (s) showSkillProjects(s.dataset.show);
  });

  $('#copy').onclick = () => {
    const btn = $('#copy'), sel = () => { const r = document.createRange(); r.selectNodeContents($('#email')); getSelection().removeAllRanges(); getSelection().addRange(r); btn.textContent = 'Selected. Press Ctrl+C'; };
    try { navigator.clipboard.writeText(S.contact.email).then(() => { btn.textContent = 'Copied'; setTimeout(() => btn.textContent = 'Copy email', 1600); }, sel); } catch (e) { sel(); }
  };

  const pui = $('.pond-ui'), pcard = $('.pond-card'), guide = $('#guide'), gbtn = $('.pond-guide-btn');
  let savedY = 0, cardTimer = 0;
  const KIND_ORDER = ['koi', 'frog', 'turtle'];
  function describe(c) {
    const g = GUIDE[c.kind], t = g.types[c.key];
    return `<p class="pc-kind">${g.title.replace(/s$/, '')}</p><h3>${esc(t.name)}</h3>${t.latin ? `<p class="pc-latin">${esc(t.latin)}</p>` : ''}<p>${esc(t.text)}</p>`;
  }
  function showCard(c) {
    pcard.innerHTML = describe(c); pcard.hidden = false;
    pcard.animate([{ transform: 'translateY(10px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 250, easing: 'ease-out' });
    clearTimeout(cardTimer); cardTimer = setTimeout(() => { pcard.hidden = true; }, 7000);
  }
  function buildGuide() {
    const here = POND.list();
    guide.innerHTML = `<div class="g-head"><b>Field guide</b><button type="button" class="pbtn g-close" aria-label="Close field guide">✕</button></div>` +
      KIND_ORDER.map(kind => {
        const g = GUIDE[kind], seen = here.filter(c => c.kind === kind);
        if (!seen.length) return '';
        const bySp = {}; seen.forEach(c => (bySp[c.key] = bySp[c.key] || []).push(c.id));
        return `<section class="g-sec"><h3>${g.title} <span>${seen.length} here</span></h3><p class="g-blurb">${esc(g.blurb)}</p><ul>${Object.entries(bySp).map(([key, ids]) => {
          const t = g.types[key];
          return `<li><button type="button" class="g-item" data-ids="${ids.join(' ')}"><b>${esc(t.name)}${ids.length > 1 ? ` <em>×${ids.length}</em>` : ''}</b>${t.latin ? `<i>${esc(t.latin)}</i>` : ''}<span>${esc(t.text)}</span></button></li>`;
        }).join('')}</ul></section>`;
      }).join('');
    $('.g-close', guide).onclick = () => toggleGuide(false);
    $$('.g-item', guide).forEach(b => b.onclick = () => {
      const ids = b.dataset.ids.split(' '), n = +(b.dataset.n || 0);
      POND.highlight(ids[n % ids.length]); b.dataset.n = n + 1;
      if (matchMedia('(max-width: 760px)').matches) toggleGuide(false);
    });
  }
  function toggleGuide(open) { if (open) buildGuide(); guide.hidden = !open; gbtn.setAttribute('aria-expanded', String(open)); }
  function setPond(on) {
    if (on === pondOn) return;
    pondOn = on;
    if (on) { savedY = scrollY; POND.freezeScroll(savedY); if (dlg.open) dlg.close(); }
    document.body.classList.toggle('pond-on', on);
    pui.hidden = !on; pcard.hidden = true; toggleGuide(false);
    if (POND.isStill() && on) { POND.setStill(false); syncStill(); }
    calm();
    try { history.replaceState(null, '', on ? '#pond' : location.pathname + location.search); } catch (e) {}
    if (!on) { scrollTo({ top: savedY, behavior: 'instant' }); requestAnimationFrame(() => POND.freezeScroll(null)); }
    pui.animate([{ opacity: on ? 0 : 1 }, { opacity: on ? 1 : 0 }], { duration: 220 });
  }
  $('#pond-go').onclick = () => setPond(true);
  $$('[data-pond]').forEach(b => b.onclick = () => setPond(true));
  $('.pond-back').onclick = () => setPond(false);
  gbtn.onclick = () => toggleGuide(guide.hidden);
  addEventListener('keydown', e => { if (e.key === 'Escape' && pondOn) { if (!guide.hidden) toggleGuide(false); else setPond(false); } });
  if (location.hash === '#pond') setPond(true);

  const WATER = '#pond, #pond canvas, html, body, #app, main, section, .hero, .hero-text, .hero-side, .wave, .sec-head, .sub-title, .foot, .about-grid, .beyond, .projects-grid, .toolbar';
  addEventListener('pointerdown', e => {
    if (e.button !== 0 || !window.POND) return;
    if (!e.target.matches(WATER) || e.target.closest('.panel, dialog, .nav')) return;
    if (pondOn) {
      const hit = POND.pick(e.clientX, e.clientY);
      if (hit) { showCard(hit); POND.highlight(hit.id); if (hit.kind !== 'koi') POND.poke(e.clientX, e.clientY); return; }
    }
    POND.poke(e.clientX, e.clientY);
  });
  let fed = 0;
  const onFeed = () => { fed++; $('.fed').textContent = `Fed ${fed} time${fed === 1 ? '' : 's'} this visit.`; };
  (function hook() { window.POND ? POND.onFeed(onFeed) : setTimeout(hook, 50); })();
})();
