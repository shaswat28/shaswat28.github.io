(function () {
  const TAU = Math.PI * 2;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const host = document.getElementById('pond');
  const cv = document.createElement('canvas');
  host.appendChild(cv);
  const ctx = cv.getContext('2d');
  let SMALL = false, sky = null;
  let W = 1, H = 1, DPR = 1, floor = null, caus = null, causCtx = null, causImg = null;
  let still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pads = [], weeds = [], petals = [];
  const koi = [], frogs = [], turtles = [], ripples = [], food = [], words = [];
  let calm = 0, calmT = 0, pace = 1;
  const listeners = { feed: [] };
  let hl = null;

  function buildFloor() {
    floor = document.createElement('canvas');
    floor.width = W * DPR; floor.height = H * DPR;
    const f = floor.getContext('2d');
    f.scale(DPR, DPR);
    const g = f.createRadialGradient(W * .5, H * .45, 0, W * .5, H * .45, Math.hypot(W, H) * .6);
    g.addColorStop(0, '#12505c'); g.addColorStop(.6, '#0b3a46'); g.addColorStop(1, '#062531');
    f.fillStyle = g; f.fillRect(0, 0, W, H);
    for (let i = 0; i < W * H / 900; i++) {
      f.fillStyle = `rgba(${rnd(120, 190) | 0},${rnd(150, 190) | 0},${rnd(140, 170) | 0},${rnd(.02, .05)})`;
      f.beginPath(); f.ellipse(rnd(0, W), rnd(0, H), rnd(8, 40), rnd(6, 26), rnd(0, TAU), 0, TAU); f.fill();
    }
    const pebble = (x, y, r) => {
      const hue = [[58, 86, 88], [46, 70, 74], [84, 104, 96], [34, 54, 60], [96, 110, 100]][Math.random() * 5 | 0];
      const a = rnd(0, TAU), sq = rnd(.6, .95);
      f.fillStyle = 'rgba(0,0,0,.25)'; f.beginPath(); f.ellipse(x + r * .25, y + r * .35, r, r * sq, a, 0, TAU); f.fill();
      const pg = f.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r);
      pg.addColorStop(0, `rgb(${hue.map(v => v + 30)})`); pg.addColorStop(1, `rgb(${hue})`);
      f.fillStyle = pg; f.beginPath(); f.ellipse(x, y, r, r * sq, a, 0, TAU); f.fill();
    };
    for (let i = 0; i < W * H / 1400; i++) {
      const x = rnd(0, W), y = rnd(0, H), edge = Math.min(x, W - x, y, H - y) / Math.min(W, H);
      if (Math.random() < .25 + (1 - edge * 4)) pebble(x, y, rnd(2, 7) * (edge < .08 ? 1.6 : 1));
    }
    for (let i = 0; i < 7; i++) {
      const side = i % 2, x = side ? W - rnd(0, 90) : rnd(0, 90), y = rnd(0, H), r = rnd(26, 60);
      f.fillStyle = 'rgba(0,0,0,.3)'; f.beginPath(); f.ellipse(x + 10, y + 14, r, r * .75, 0, 0, TAU); f.fill();
      const rg = f.createRadialGradient(x - r * .35, y - r * .4, r * .1, x, y, r);
      rg.addColorStop(0, '#6f8580'); rg.addColorStop(.7, '#3b5256'); rg.addColorStop(1, '#263c42');
      f.fillStyle = rg; f.beginPath(); f.ellipse(x, y, r, r * .75, rnd(-.4, .4), 0, TAU); f.fill();
      f.fillStyle = 'rgba(95,174,110,.18)'; f.beginPath(); f.ellipse(x - r * .2, y - r * .3, r * .5, r * .25, .3, 0, TAU); f.fill();
    }
    const v = f.createRadialGradient(W / 2, H / 2, Math.min(W, H) * .3, W / 2, H / 2, Math.hypot(W, H) * .6);
    v.addColorStop(0, 'rgba(4,20,26,0)'); v.addColorStop(1, 'rgba(4,20,26,.55)');
    f.fillStyle = v; f.fillRect(0, 0, W, H);
    caus = document.createElement('canvas');
    caus.width = Math.ceil(W / 12); caus.height = Math.ceil(H / 12); causN = 0;
    causCtx = caus.getContext('2d'); causImg = causCtx.createImageData(caus.width, caus.height);
  }

  let causN = 0;
  function drawCaustics(t) {
    const cw = caus.width, ch = caus.height, d = causImg.data;
    if (causN++ % 2 === 0) {
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
      const X = x * .33, Y = y * .33;
      const v = Math.sin(X * .9 + t * .6) + Math.sin(Y * 1.1 - t * .5) + Math.sin((X + Y) * .7 + t * .4) + Math.sin((X - Y) * .8 - t * .45);
      let b = Math.max(0, 1 - Math.abs(v) * .8); b = b * b * b;
      const o = (y * cw + x) * 4;
      d[o] = 200; d[o + 1] = 245; d[o + 2] = 235; d[o + 3] = b * 62 * (1 - .55 * calm);
    }
    causCtx.putImageData(causImg, 0, 0);
    }
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.imageSmoothingEnabled = true;
    ctx.drawImage(caus, 0, 0, W, H); ctx.restore();
  }

  function buildWeeds() {
    weeds = [];
    for (let i = 0; i < 46; i++) {
      const side = i % 2, x = side ? W - rnd(0, 70) : rnd(0, 70);
      weeds.push({ x, y: rnd(0, H), len: rnd(40, 110), ang: side ? rnd(2.4, 3.6) : rnd(-.5, .6), ph: rnd(0, TAU), c: Math.random() < .5 ? '#2f7a55' : '#3d8d5e' });
    }
  }
  function drawWeeds(t) {
    ctx.lineCap = 'round';
    for (const w of weeds) {
      const sw = Math.sin(t * .8 + w.ph) * .35;
      const ex = w.x + Math.cos(w.ang + sw) * w.len, ey = w.y + Math.sin(w.ang + sw) * w.len;
      const mx = w.x + Math.cos(w.ang - sw * .5) * w.len * .5, my = w.y + Math.sin(w.ang - sw * .5) * w.len * .5;
      ctx.strokeStyle = w.c; ctx.globalAlpha = .55; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(w.x, w.y); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  const VARIETY = [
    { n: 'kohaku', base: '#f6efe4', patches: [['#df4a2c', 2, 0, 1.4], ['#df4a2c', 6, .2, 1.3], ['#df4a2c', 10, -.2, 1.0]] },
    { n: 'sanke', base: '#f6efe4', patches: [['#df4a2c', 3, 0, 1.3], ['#df4a2c', 8, .1, 1.1], ['#1c1b1a', 5, -.5, .5], ['#1c1b1a', 9, .55, .45]] },
    { n: 'showa', base: '#1c1b1a', patches: [['#e0512f', 2, .1, 1.2], ['#f6efe4', 5, -.4, .8], ['#e0512f', 7, .3, 1.1], ['#f6efe4', 10, 0, .7]] },
    { n: 'ogon', base: '#f2c14e', metal: true, patches: [] },
    { n: 'asagi', base: '#86a3b0', net: true, patches: [['#e8773a', 5, -.95, .7], ['#e8773a', 5, .95, .7], ['#e8773a', 9, -.9, .6], ['#e8773a', 9, .9, .6]] },
    { n: 'tancho', base: '#f6efe4', patches: [['#d63a2a', 1.3, 0, .75]] },
    { n: 'chagoi', base: '#a8784a', net: true, patches: [] },
    { n: 'kigoi', base: '#f3d573', patches: [] },
    { n: 'utsuri', base: '#1c1b1a', patches: [['#f3efe6', 2, -.3, 1.1], ['#f3efe6', 6, .35, 1.2], ['#f3efe6', 10, -.1, .9]] },
    { n: 'butterfly', base: '#f08a3c', metal: true, long: true, patches: [] }
  ];
  const N = 16, PROFILE = [.72, .95, 1.06, 1.12, 1.12, 1.07, 1, .92, .82, .7, .57, .45, .35, .27, .21, .17];
  function makeKoi(i) {
    const size = rnd(6, 9.5), x = rnd(W * .15, W * .85), y = rnd(H * .1, H * .9), a = rnd(0, TAU);
    return { id: 'k' + i, kind: 'koi', key: VARIETY[i % VARIETY.length].n, v: VARIETY[i % VARIETY.length], size, z: rnd(.72, 1), a, sp: rnd(40, 65), ph: rnd(0, TAU), gulp: 0,
      seg: Array.from({ length: N }, (_, k) => ({ x: x - Math.cos(a) * k * size * .6, y: y - Math.sin(a) * k * size * .6 })) };
  }
  function stepKoi(f, dt, t, mouse) {
    const head = f.seg[0];
    let goal = null, hungry = false;
    if (food.length) {
      let best = null, bd = 1e9;
      for (const p of food) { const d = Math.hypot(p.x - head.x, p.y - head.y); if (d < bd) { bd = d; best = p; } }
      if (bd < 520) { goal = best; hungry = true; }
    }
    if (!goal && mouse && Math.hypot(mouse.x - head.x, mouse.y - head.y) < 240) goal = { x: mouse.x + Math.cos(f.ph + t * .7) * 70, y: mouse.y + Math.sin(f.ph + t * .7) * 70 };
    let turn = Math.sin(t * .35 + f.ph) * .7 + Math.sin(t * .13 + f.ph * 2) * .4;
    if (goal) { let d = Math.atan2(goal.y - head.y, goal.x - head.x) - f.a; d = Math.atan2(Math.sin(d), Math.cos(d)); turn = d * 2.4; }
    const m = 80;
    if (head.x < m) turn += 2 * Math.sin(0 - f.a); if (head.x > W - m) turn += 2 * Math.sin(Math.PI - f.a);
    if (head.y < m) turn += 2 * Math.sin(Math.PI / 2 - f.a); if (head.y > H - m) turn += 2 * Math.sin(-Math.PI / 2 - f.a);
    for (const o of koi) { if (o === f) continue; const h2 = o.seg[0], d = Math.hypot(h2.x - head.x, h2.y - head.y); if (d < 40) { const aw = Math.atan2(head.y - h2.y, head.x - h2.x); let dd = aw - f.a; dd = Math.atan2(Math.sin(dd), Math.cos(dd)); turn += dd * .6; } }
    f.a += Math.max(-2.2, Math.min(2.2, turn)) * dt;
    const speed = pace * f.sp * (hungry ? 2.1 : 1) * (.85 + .15 * Math.sin(t * .7 + f.ph));
    const wig = Math.sin(t * (hungry ? 11 : 6) + f.ph) * .22;
    head.x += Math.cos(f.a + wig) * speed * dt; head.y += Math.sin(f.a + wig) * speed * dt;
    const L = f.size * .6;
    for (let i = 1; i < N; i++) {
      const p = f.seg[i - 1], s = f.seg[i];
      let ang = Math.atan2(p.y - s.y, p.x - s.x);
      if (i > 1) { const pp = f.seg[i - 2], pa = Math.atan2(pp.y - p.y, pp.x - p.x); let df = ang - pa; df = Math.atan2(Math.sin(df), Math.cos(df)); if (Math.abs(df) > .32) ang = pa + Math.sign(df) * .32; }
      s.x = p.x - Math.cos(ang) * L; s.y = p.y - Math.sin(ang) * L;
    }
    for (let i = food.length - 1; i >= 0; i--) if (Math.hypot(food[i].x - head.x, food[i].y - head.y) < f.size * 1.3) { ripple(food[i].x, food[i].y, .6); food.splice(i, 1); f.gulp = 1; }
    f.gulp = Math.max(0, f.gulp - dt * 3);
  }
  function koiGeometry(f) {
    const S = f.seg, sz = f.size, L = [], R = [], dirs = [];
    for (let i = 0; i < N; i++) {
      const a = S[Math.max(0, i - 1)], b = S[Math.min(N - 1, i + 1)];
      const ang = Math.atan2(a.y - b.y, a.x - b.x); dirs.push(ang);
      const w = sz * PROFILE[i], nx = -Math.sin(ang), ny = Math.cos(ang);
      L.push([S[i].x + nx * w, S[i].y + ny * w]); R.push([S[i].x - nx * w, S[i].y - ny * w]);
    }
    const p = new Path2D(), h = S[0], d0 = dirs[0];
    p.moveTo(L[0][0], L[0][1]);
    p.quadraticCurveTo(h.x + Math.cos(d0) * sz * 1.25 - Math.sin(d0) * sz * .5, h.y + Math.sin(d0) * sz * 1.25 + Math.cos(d0) * sz * .5, h.x + Math.cos(d0) * sz * 1.05, h.y + Math.sin(d0) * sz * 1.05);
    p.quadraticCurveTo(h.x + Math.cos(d0) * sz * 1.25 + Math.sin(d0) * sz * .5, h.y + Math.sin(d0) * sz * 1.25 - Math.cos(d0) * sz * .5, R[0][0], R[0][1]);
    for (let i = 1; i < N; i++) p.quadraticCurveTo(R[i - 1][0], R[i - 1][1], (R[i - 1][0] + R[i][0]) / 2, (R[i - 1][1] + R[i][1]) / 2);
    p.lineTo(R[N - 1][0], R[N - 1][1]); p.lineTo(L[N - 1][0], L[N - 1][1]);
    for (let i = N - 1; i > 0; i--) p.quadraticCurveTo(L[i][0], L[i][1], (L[i][0] + L[i - 1][0]) / 2, (L[i][1] + L[i - 1][1]) / 2);
    p.closePath();
    return { p, dirs };
  }
  function drawFin(x, y, ang, len, wid, col, alpha) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    ctx.globalAlpha = alpha; ctx.fillStyle = col;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * .6, -wid, len, -wid * .2); ctx.quadraticCurveTo(len * .7, wid * .6, 0, 0); ctx.fill();
    ctx.globalAlpha = alpha * .6; ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = .6;
    for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len * (.7 + k * .08), -wid * (.9 - k * .3)); ctx.stroke(); }
    ctx.restore(); ctx.globalAlpha = 1;
  }
  function drawKoi(f, t, shadowOnly) {
    const { p, dirs } = koiGeometry(f), S = f.seg, sz = f.size, v = f.v;
    if (shadowOnly) {
      ctx.save(); ctx.translate(sz * 1.6, sz * 2.2); ctx.fillStyle = 'rgba(2,16,22,.28)'; ctx.fill(p); ctx.restore();
      return;
    }
    const fin = v.base === '#1c1b1a' ? 'rgba(240,230,215,.8)' : v.base;
    const flap = Math.sin(t * 5 + f.ph) * .35;
    [-1, 1].forEach(sd => {
      drawFin(S[3].x, S[3].y, dirs[3] + Math.PI + sd * (1.15 + flap * sd), sz * (v.long ? 3 : 1.9), sz * .8 * sd, fin, .55);
      drawFin(S[8].x, S[8].y, dirs[8] + Math.PI + sd * (1.3 + flap * sd * .5), sz * 1.1, sz * .45 * sd, fin, .4);
    });
    const tl = S[N - 1], ta = dirs[N - 1] + Math.PI, wag = Math.sin(t * 5 + f.ph) * .45;
    ctx.save(); ctx.translate(tl.x, tl.y); ctx.rotate(ta + wag * .5); if (v.long) ctx.scale(1.6, 1.25);
    ctx.globalAlpha = .6; ctx.fillStyle = fin;
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.bezierCurveTo(sz * 1.2, -sz * .6, sz * 2.4, -sz * (1.4 + wag * .4), sz * 3, -sz * (1.1 + wag * .4));
    ctx.quadraticCurveTo(sz * 1.9, 0, sz * 3, sz * (1.1 - wag * .4));
    ctx.bezierCurveTo(sz * 2.4, sz * (1.4 - wag * .4), sz * 1.2, sz * .6, 0, 0); ctx.fill();
    ctx.globalAlpha = .35; ctx.strokeStyle = '#fff'; ctx.lineWidth = .5;
    for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sz * 2.7, sz * k * .45); ctx.stroke(); }
    ctx.restore(); ctx.globalAlpha = 1;
    if (v.metal) {
      const g = ctx.createLinearGradient(S[0].x, S[0].y, S[N - 1].x, S[N - 1].y);
      g.addColorStop(0, '#fff3c4'); g.addColorStop(.35, v.base); g.addColorStop(.7, '#fff0b0'); g.addColorStop(1, v.base);
      ctx.fillStyle = g;
    } else ctx.fillStyle = v.base;
    ctx.fill(p);
    ctx.save(); ctx.clip(p);
    for (const [col, si, off, r] of v.patches) {
      const i = Math.min(N - 1, Math.floor(si)), fr = si - i, s0 = S[i], s1 = S[Math.min(N - 1, i + 1)];
      const cx = s0.x + (s1.x - s0.x) * fr, cy = s0.y + (s1.y - s0.y) * fr, ang = dirs[i], w = sz * PROFILE[i];
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.ellipse(cx - Math.sin(ang) * off * w, cy + Math.cos(ang) * off * w, sz * r * 1.3, sz * r * .85, ang, 0, TAU); ctx.fill();
    }
    if (!SMALL) {
    ctx.strokeStyle = v.net ? 'rgba(20,40,50,.35)' : 'rgba(0,0,0,.08)'; ctx.lineWidth = .7;
    for (let i = 2; i < 12; i++) for (const o of [-.55, 0, .55]) {
      const s = S[i], ang = dirs[i], w = sz * PROFILE[i];
      ctx.beginPath(); ctx.arc(s.x - Math.sin(ang) * o * w, s.y + Math.cos(ang) * o * w, sz * .3, ang + Math.PI - 1.1, ang + Math.PI + 1.1); ctx.stroke();
    }
    }
    ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = sz * .55; ctx.lineCap = 'round';
    ctx.beginPath(); S.slice(1, 11).forEach((s, i) => i ? ctx.lineTo(s.x, s.y) : ctx.moveTo(s.x, s.y)); ctx.stroke();
    ctx.restore();
    ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 1; ctx.stroke(p);
    ctx.strokeStyle = 'rgba(255,255,255,.28)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); S.slice(4, 10).forEach((s, i) => i ? ctx.lineTo(s.x, s.y) : ctx.moveTo(s.x, s.y)); ctx.stroke();
    const h = S[0], d0 = dirs[0], ex = h.x + Math.cos(d0) * sz * .45, ey = h.y + Math.sin(d0) * sz * .45;
    [-1, 1].forEach(sd => {
      const x = ex - Math.sin(d0) * sd * sz * .62, y = ey + Math.cos(d0) * sd * sz * .62;
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(x, y, sz * .16, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(x - sz * .04, y - sz * .05, sz * .05, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(60,40,30,.6)'; ctx.lineWidth = .6;
      const bx = h.x + Math.cos(d0) * sz * .95, by = h.y + Math.sin(d0) * sz * .95;
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(d0 + sd * .9) * sz * .6, by + Math.sin(d0 + sd * .9) * sz * .6); ctx.stroke();
    });
    if (f.gulp > 0) { ctx.strokeStyle = `rgba(255,255,255,${f.gulp * .6})`; ctx.beginPath(); ctx.arc(h.x + Math.cos(d0) * sz * 1.2, h.y + Math.sin(d0) * sz * 1.2, sz * (1.4 - f.gulp), 0, TAU); ctx.stroke(); }
    if (f.z < .95) { ctx.save(); ctx.globalAlpha = (1 - f.z) * 1.6; ctx.fillStyle = '#0c4250'; ctx.fill(p); ctx.restore(); }
  }


  const TURTLE_SP = {
    slider: { shell: ['#6f7d3f', '#3e4a22'], skin: '#7f9150', dark: '#4d5a2c', size: 1 },
    painted: { shell: ['#3f4d3c', '#1f2a20'], skin: '#3f4c34', dark: '#27301f', size: .9, rim: true },
    snapper: { shell: ['#5e4d36', '#2d2418'], skin: '#6b614a', dark: '#3f382a', size: 1.3, rough: true }
  };
  const TURTLE_ORDER = ['slider', 'painted', 'snapper'];
  function makeTurtle(i) {
    const key = TURTLE_ORDER[i % 3], sp = TURTLE_SP[key];
    return { id: 't' + i, kind: 'turtle', key, spc: sp, x: rnd(W * .1, W * .9), y: rnd(H * .15, H * .85), a: rnd(0, TAU), sp: rnd(12, 18) / sp.size, size: rnd(17, 21) * sp.size, ph: rnd(0, TAU), hide: 0, shell: sp.shell };
  }
  function stepTurtle(tu, dt, t) {
    tu.hide = Math.max(0, tu.hide - dt);
    if (tu.hide > 0) return;
    let turn = Math.sin(t * .12 + tu.ph) * .35;
    const near = food.find(p => Math.hypot(p.x - tu.x, p.y - tu.y) < 260);
    if (near) { let d = Math.atan2(near.y - tu.y, near.x - tu.x) - tu.a; d = Math.atan2(Math.sin(d), Math.cos(d)); turn = d * .8; }
    const m = 90;
    if (tu.x < m) turn += Math.sin(0 - tu.a); if (tu.x > W - m) turn += Math.sin(Math.PI - tu.a);
    if (tu.y < m) turn += Math.sin(Math.PI / 2 - tu.a); if (tu.y > H - m) turn += Math.sin(-Math.PI / 2 - tu.a);
    tu.a += turn * dt;
    const stroke = .55 + .45 * Math.max(0, Math.sin(t * 1.6 + tu.ph));
    tu.x += Math.cos(tu.a) * tu.sp * stroke * pace * dt; tu.y += Math.sin(tu.a) * tu.sp * stroke * pace * dt;
    for (let i = food.length - 1; i >= 0; i--) if (Math.hypot(food[i].x - tu.x - Math.cos(tu.a) * tu.size, food[i].y - tu.y - Math.sin(tu.a) * tu.size) < 10) { ripple(food[i].x, food[i].y, .5); food.splice(i, 1); }
  }
  function drawTurtle(tu, t) {
    const s = tu.size, hid = tu.hide > 0, pad = hid ? 0 : Math.sin(t * 1.6 + tu.ph);
    ctx.fillStyle = 'rgba(2,16,22,.3)'; ctx.beginPath(); ctx.ellipse(tu.x + 7, tu.y + 10, s * 1.05, s * .85, tu.a, 0, TAU); ctx.fill();
    ctx.save(); ctx.translate(tu.x, tu.y); ctx.rotate(tu.a);
    const skin = tu.spc.skin, skinD = tu.spc.dark;
    if (!hid) {
      [-1, 1].forEach(sd => {
        ctx.fillStyle = skin;
        ctx.save(); ctx.translate(s * .45, sd * s * .62); ctx.rotate(sd * (.9 + pad * .45));
        ctx.beginPath(); ctx.ellipse(s * .45, 0, s * .55, s * .2, 0, 0, TAU); ctx.fill(); ctx.restore();
        ctx.save(); ctx.translate(-s * .6, sd * s * .55); ctx.rotate(sd * (2.3 - pad * .3));
        ctx.beginPath(); ctx.ellipse(s * .28, 0, s * .32, s * .15, 0, 0, TAU); ctx.fill(); ctx.restore();
      });
      ctx.fillStyle = skin; ctx.beginPath(); ctx.moveTo(-s * .95, -s * .08); ctx.lineTo(-s * (tu.spc.rough ? 1.7 : 1.25), 0); ctx.lineTo(-s * .95, s * .08); ctx.fill();
      ctx.fillStyle = skin; ctx.beginPath(); ctx.ellipse(s * 1.08, 0, s * .32, s * .25, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = skinD; [[1.05, -.1], [1.2, .08], [.95, .12]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x * s, y * s, s * .04, 0, TAU); ctx.fill(); });
      if (tu.key === 'slider') { ctx.fillStyle = '#c8412e'; [-1, 1].forEach(sd => { ctx.beginPath(); ctx.ellipse(s * .98, sd * s * .19, s * .1, s * .045, 0, 0, TAU); ctx.fill(); }); }
      if (tu.key === 'painted') { ctx.strokeStyle = '#e5c84a'; ctx.lineWidth = 1; [-.1, .1].forEach(y => { ctx.beginPath(); ctx.moveTo(s * .82, y * s); ctx.lineTo(s * 1.3, y * s * .6); ctx.stroke(); }); }
      ctx.fillStyle = '#111'; [-1, 1].forEach(sd => { ctx.beginPath(); ctx.arc(s * 1.18, sd * s * .15, s * .05, 0, TAU); ctx.fill(); });
    }
    const [c1, c2] = tu.shell, g = ctx.createRadialGradient(-s * .2, -s * .25, s * .1, 0, 0, s);
    g.addColorStop(0, c1); g.addColorStop(1, c2);
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, s, s * .8, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(30,36,16,.7)'; ctx.lineWidth = 1.1; ctx.stroke();
    const hex = (cx, cy, r) => { ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; ctx[k ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * r * 1.15, cy + Math.sin(a) * r * .9); } ctx.closePath(); };
    ctx.strokeStyle = 'rgba(28,34,14,.75)'; ctx.fillStyle = 'rgba(255,240,180,.1)';
    [-.5, 0, .5].forEach(x => { hex(x * s, 0, s * .22); ctx.fill(); ctx.stroke(); });
    [-.28, .28].forEach(x => [-1, 1].forEach(sd => { hex(x * s, sd * s * .42, s * .19); ctx.fill(); ctx.stroke(); }));
    ctx.strokeStyle = 'rgba(28,34,14,.5)'; ctx.lineWidth = .8;
    for (let k = 0; k < 16; k++) { const a = k * TAU / 16; ctx.beginPath(); ctx.moveTo(Math.cos(a) * s * .82, Math.sin(a) * s * .66); ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s * .8); ctx.stroke(); }
    if (tu.spc.rim) for (let k = 0; k < 20; k++) { const a = k * TAU / 20; ctx.fillStyle = k % 2 ? '#c8412e' : '#e5c84a'; ctx.beginPath(); ctx.arc(Math.cos(a) * s * .93, Math.sin(a) * s * .74, s * .05, 0, TAU); ctx.fill(); }
    if (tu.spc.rough) { ctx.fillStyle = 'rgba(20,16,10,.45)'; [-.45, 0, .45].forEach(x => [-.3, 0, .3].forEach(y => { ctx.beginPath(); ctx.arc(x * s, y * s, s * .07, 0, TAU); ctx.fill(); })); }
    ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.beginPath(); ctx.ellipse(-s * .25, -s * .3, s * .4, s * .18, -.3, 0, TAU); ctx.fill();
    ctx.restore();
    ctx.fillStyle = 'rgba(12,66,80,.22)'; ctx.beginPath(); ctx.ellipse(tu.x, tu.y, s * 1.3, s, tu.a, 0, TAU); ctx.fill();
  }

  function buildPads() {
    pads = [];
    const n = Math.max(7, Math.round(W * H / 90000));
    for (let i = 0; i < n; i++) {
      const edge = i % 3 !== 2;
      const x = edge ? (i % 2 ? rnd(W * .8, W - 20) : rnd(20, W * .2)) : rnd(W * .25, W * .75);
      pads.push({ x, y: rnd(0, H), r: rnd(24, 44), rot: rnd(0, TAU), notch: rnd(.35, .55), bob: 0, drift: rnd(-4, 4), lotus: Math.random() < .3, spin: rnd(-.02, .02) });
    }
    pads.forEach(padSprite);
    petals = Array.from({ length: 5 }, () => ({ x: rnd(0, W), y: rnd(0, H), a: rnd(0, TAU), vx: rnd(-6, 6), vy: rnd(-4, 4) }));
  }
  function padSprite(p) {
    const r = p.r, k = Math.max(1, DPR), c = document.createElement('canvas');
    c.width = c.height = Math.ceil((r * 2 + 4) * k);
    const g2 = c.getContext('2d'); g2.scale(k, k); g2.translate(r + 2, r + 2);
    const g = g2.createRadialGradient(-r * .3, -r * .3, r * .1, 0, 0, r);
    g.addColorStop(0, '#6fbf6a'); g.addColorStop(.75, '#3f8f4a'); g.addColorStop(1, '#2d6f3a');
    g2.fillStyle = g;
    g2.beginPath(); g2.moveTo(0, 0); g2.arc(0, 0, r, p.notch / 2, TAU - p.notch / 2); g2.closePath(); g2.fill();
    g2.strokeStyle = 'rgba(25,70,35,.8)'; g2.lineWidth = 1.2; g2.stroke();
    g2.strokeStyle = 'rgba(200,240,190,.22)'; g2.lineWidth = .8;
    for (let j = 0; j < 11; j++) { const a = p.notch / 2 + (TAU - p.notch) * (j + .5) / 11; g2.beginPath(); g2.moveTo(0, 0); g2.lineTo(Math.cos(a) * r * .92, Math.sin(a) * r * .92); g2.stroke(); }
    g2.fillStyle = 'rgba(255,255,255,.12)'; g2.beginPath(); g2.ellipse(-r * .35, -r * .35, r * .3, r * .14, -.8, 0, TAU); g2.fill();
    p.sprite = c;
  }
  let frozenY = null;
  const padY = p => ((p.y - (frozenY ?? scrollY) * .12) % (H + 120) + H + 120) % (H + 120) - 60;
  function drawPad(p, t) {
    const y = padY(p), s = 1 + Math.sin(p.bob * 10) * p.bob * .08, r = p.r * s;
    ctx.save(); ctx.translate(p.x, y);
    ctx.fillStyle = 'rgba(2,16,22,.32)'; ctx.beginPath(); ctx.arc(6, 9, r, 0, TAU); ctx.fill();
    ctx.rotate(p.rot); ctx.scale(s, s);
    ctx.drawImage(p.sprite, -p.r - 2, -p.r - 2, p.r * 2 + 4, p.r * 2 + 4);
    ctx.restore();
    if (p.lotus) {
      ctx.save(); ctx.translate(p.x + r * .35, y - r * .3); ctx.rotate(t * .05 + p.rot);
      for (const [n, rr, col] of [[8, 13, '#f4a6c0'], [6, 9, '#f8c4d4'], [5, 5.5, '#fde2ea']]) {
        for (let k = 0; k < n; k++) { ctx.rotate(TAU / n); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(rr * .55, 0, rr * .6, rr * .28, 0, 0, TAU); ctx.fill(); }
        ctx.rotate(.3);
      }
      ctx.fillStyle = '#f2c14e'; ctx.beginPath(); ctx.arc(0, 0, 3, 0, TAU); ctx.fill();
      ctx.restore();
    }
  }

  const FROG_SP = {
    green: { col: ['#6aa84f', '#3f7a2e'], size: 1 },
    leopard: { col: ['#83b060', '#26401c'], size: .95, spots: 'leopard' },
    bullfrog: { col: ['#6d8a3c', '#3b5020'], size: 1.35, tymp: true },
    peeper: { col: ['#b89a6a', '#6a5132'], size: .62, mark: 'x' },
    redleg: { col: ['#8c6b47', '#4c3522'], size: 1.15, leg: '#b8563d', spots: 'redleg' },
    treefrog: { col: ['#79b04e', '#3d6a26'], size: .72, stripe: true }
  };
  const FROG_ORDER = ['redleg', 'treefrog', 'green', 'bullfrog', 'leopard', 'peeper'];
  function makeFrog(i) {
    const pad = pads[Math.floor((i + .5) * pads.length / 5) % pads.length], key = FROG_ORDER[i % FROG_ORDER.length], sp = FROG_SP[key];
    return { id: 'f' + i, kind: 'frog', key, spc: sp, pad, off: rnd(-.4, .4), a: rnd(0, TAU), state: 'sit', timer: rnd(2, 8), size: rnd(13, 16) * sp.size, col: sp.col, blink: 0, breathe: rnd(0, TAU), x: 0, y: 0 };
  }
  const frogSeat = fr => ({ x: fr.pad.x + Math.cos(fr.off * 4) * fr.pad.r * .35, y: padY(fr.pad) + Math.sin(fr.off * 4) * fr.pad.r * .35 });
  function hop(fr, toWater) {
    const from = fr.state === 'sit' ? frogSeat(fr) : { x: fr.x, y: fr.y };
    const reach = Math.max(420, Math.min(W, H) * .7);
    const cands = pads.filter(p => p !== fr.pad && p !== fr.lastPad && !frogs.some(o => o !== fr && (o.pad === p || o.toPad === p || o.swimTo === p)))
      .map(p => ({ p, d: Math.hypot(p.x - from.x, padY(p) - from.y) })).filter(c => c.d < reach && padY(c.p) > 30 && padY(c.p) < H - 30);
    let to = null, pad = null;
    if (!toWater && cands.length) {
      const w = cands.map(c => .4 + c.d / reach), sum = w.reduce((a, b) => a + b, 0);
      let r = Math.random() * sum; pad = cands.find((c, i) => (r -= w[i]) <= 0)?.p || cands[0].p;
    } else { const a = rnd(0, TAU), L = rnd(90, 180); to = { x: Math.max(40, Math.min(W - 40, from.x + Math.cos(a) * L)), y: Math.max(40, Math.min(H - 40, from.y + Math.sin(a) * L)) }; }
    const tgt0 = pad ? { x: pad.x, y: padY(pad) } : to, dist = Math.hypot(tgt0.x - from.x, tgt0.y - from.y);
    fr.lastPad = fr.pad;
    fr.state = 'hop'; fr.from = from; fr.toPad = pad; fr.toPt = to; fr.k = 0; fr.dur = Math.min(1.1, .45 + dist / 700);
    const tgt = pad ? { x: pad.x, y: padY(pad) } : to;
    fr.a = Math.atan2(tgt.y - from.y, tgt.x - from.x);
  }
  function stepFrog(fr, dt, t) {
    fr.blink = Math.max(0, fr.blink - dt * 6);
    if (Math.random() < dt * .25) fr.blink = 1;
    if (fr.state === 'sit') {
      const s = frogSeat(fr); fr.x = s.x; fr.y = s.y;
      fr.timer -= dt * pace;
      if (fr.timer <= 0) { hop(fr, Math.random() < .15); }
    } else if (fr.state === 'hop') {
      fr.k += dt / fr.dur;
      const tgt = fr.toPad ? { x: fr.toPad.x, y: padY(fr.toPad) } : fr.toPt, k = Math.min(1, fr.k);
      fr.x = fr.from.x + (tgt.x - fr.from.x) * k; fr.y = fr.from.y + (tgt.y - fr.from.y) * k;
      if (fr.k >= 1) {
        if (fr.toPad) { fr.pad = fr.toPad; fr.off = rnd(-.4, .4); fr.state = 'sit'; fr.timer = rnd(4, 11); fr.pad.bob = 1; ripple(fr.x, fr.y, .7); }
        else {
          const opts = pads.filter(p => p !== fr.lastPad && !frogs.some(o => o !== fr && (o.pad === p || o.toPad === p || o.swimTo === p)));
          fr.swimTo = opts.length ? opts[Math.random() * opts.length | 0] : fr.lastPad;
          fr.state = 'swim'; fr.timer = 14; splash(fr.x, fr.y);
        }
      }
    } else if (fr.state === 'swim') {
      fr.timer -= dt;
      const near = pads.reduce((b, p) => Math.hypot(p.x - fr.x, padY(p) - fr.y) < Math.hypot(b.x - fr.x, padY(b) - fr.y) ? p : b);
      const goal = fr.timer > 0 && fr.swimTo ? fr.swimTo : near;
      const ang = Math.atan2(padY(goal) - fr.y, goal.x - fr.x); fr.a = ang;
      fr.x += Math.cos(ang) * 46 * pace * dt; fr.y += Math.sin(ang) * 46 * pace * dt;
      if (Math.random() < dt * 3) ripple(fr.x, fr.y, .3);
      if (Math.hypot(goal.x - fr.x, padY(goal) - fr.y) < goal.r + 16) { fr.from = { x: fr.x, y: fr.y }; fr.toPad = goal; fr.toPt = null; fr.swimTo = null; fr.state = 'hop'; fr.k = 0; fr.dur = .45; }
    }
  }
  function drawFrog(fr, t) {
    const s = fr.size, air = fr.state === 'hop' ? Math.sin(Math.PI * Math.min(1, fr.k)) : 0, sc = 1 + air * .45;
    if (fr.state === 'swim') {
      ctx.save(); ctx.translate(fr.x, fr.y); ctx.rotate(fr.a);
      ctx.fillStyle = 'rgba(80,130,60,.5)'; ctx.beginPath(); ctx.ellipse(0, 0, s * .8, s * .6, 0, 0, TAU); ctx.fill();
      [-1, 1].forEach(sd => { ctx.fillStyle = '#d9b23c'; ctx.beginPath(); ctx.arc(s * .35, sd * s * .38, s * .22, 0, TAU); ctx.fill(); ctx.fillStyle = '#111'; ctx.fillRect(s * .3, sd * s * .38 - 1, s * .12, 2); });
      ctx.restore(); return;
    }
    ctx.fillStyle = 'rgba(2,16,22,.35)'; ctx.beginPath(); ctx.ellipse(fr.x + 4 + air * 26, fr.y + 6 + air * 34, s * .9, s * .7, fr.a, 0, TAU); ctx.fill();
    ctx.save(); ctx.translate(fr.x, fr.y); ctx.rotate(fr.a); ctx.scale(sc, sc);
    const [c1, c2] = fr.col, br = 1 + Math.sin(t * 3 + fr.breathe) * .03;
    [-1, 1].forEach(sd => {
      ctx.fillStyle = fr.spc.leg || c2;
      if (air > .05) {
        ctx.beginPath(); ctx.ellipse(-s * 1.4, sd * s * .5, s * 1.1, s * .22, sd * .12, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.ellipse(-s * 2.4, sd * s * .6, s * .45, s * .3, 0, 0, TAU); ctx.fill();
      } else {
        ctx.beginPath(); ctx.ellipse(-s * .45, sd * s * .72, s * .7, s * .3, sd * -.6, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.ellipse(-s * .05, sd * s * .95, s * .35, s * .18, sd * .4, 0, TAU); ctx.fill();
      }
      ctx.strokeStyle = c2; ctx.lineWidth = s * .16; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(s * .35, sd * s * .45); ctx.lineTo(s * .75 + air * s * .3, sd * s * .8); ctx.stroke();
    });
    ctx.fillStyle = c1;
    ctx.beginPath(); ctx.ellipse(-s * .1, 0, s * .85 * br, s * .62 * br, 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(s * .55, 0, s * .5, s * .52, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = c2;
    const sp = fr.spc;
    if (sp.spots === 'leopard') {
      [[-.5, -.25], [-.2, .3], [-.65, .22], [.05, -.3], [-.3, -.02], [.15, .22]].forEach(([x, y]) => { ctx.fillStyle = 'rgba(230,240,190,.55)'; ctx.beginPath(); ctx.arc(x * s, y * s, s * .15, 0, TAU); ctx.fill(); ctx.fillStyle = c2; ctx.beginPath(); ctx.arc(x * s, y * s, s * .11, 0, TAU); ctx.fill(); });
    } else if (sp.mark === 'x') {
      ctx.strokeStyle = c2; ctx.lineWidth = s * .12; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-s * .55, -s * .3); ctx.lineTo(s * .1, s * .3); ctx.moveTo(-s * .55, s * .3); ctx.lineTo(s * .1, -s * .3); ctx.stroke();
    } else [[-.4, -.2, .14], [-.1, .25, .11], [-.55, .2, .1], [.1, -.28, .09]].forEach(([x, y, r]) => { ctx.beginPath(); ctx.arc(x * s, y * s, r * s, 0, TAU); ctx.fill(); });
    if (sp.spots === 'redleg') { ctx.fillStyle = c2; [[-.5, -.22, .08], [-.2, .28, .07], [-.62, .18, .06], [.02, -.25, .06], [-.32, .02, .07]].forEach(([x, y, r]) => { ctx.beginPath(); ctx.arc(x * s, y * s, r * s, 0, TAU); ctx.fill(); }); }
    if (sp.stripe) { ctx.strokeStyle = '#1f2a16'; ctx.lineWidth = s * .11; ctx.lineCap = 'round'; [-1, 1].forEach(sd => { ctx.beginPath(); ctx.moveTo(s * 1, sd * s * .22); ctx.lineTo(s * .25, sd * s * .5); ctx.stroke(); }); }
    if (sp.tymp) { ctx.fillStyle = c2; [-1, 1].forEach(sd => { ctx.beginPath(); ctx.arc(s * .3, sd * s * .5, s * .17, 0, TAU); ctx.fill(); }); }
    ctx.strokeStyle = 'rgba(230,240,190,.35)'; ctx.lineWidth = s * .1;
    ctx.beginPath(); ctx.moveTo(-s * .7, 0); ctx.lineTo(s * .6, 0); ctx.stroke();
    [-1, 1].forEach(sd => {
      ctx.fillStyle = c1; ctx.beginPath(); ctx.arc(s * .6, sd * s * .42, s * .26, 0, TAU); ctx.fill();
      if (fr.blink > .5) { ctx.strokeStyle = c2; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(s * .45, sd * s * .42); ctx.lineTo(s * .75, sd * s * .42); ctx.stroke(); }
      else {
        ctx.fillStyle = '#e0b43e'; ctx.beginPath(); ctx.arc(s * .62, sd * s * .44, s * .18, 0, TAU); ctx.fill();
        ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(s * .62, sd * s * .44, s * .06, s * .13, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(s * .66, sd * s * .38, s * .04, 0, TAU); ctx.fill();
      }
    });
    ctx.restore();
  }

  function ripple(x, y, k = 1) { ripples.push({ x, y, r: 2, max: 60 * k + 20, a: .55 * k + .15 }); }
  function splash(x, y) {
    ripple(x, y, 1.2); ripple(x, y, .7);
    for (let i = 0; i < 8; i++) words.push({ drop: true, x, y, vx: rnd(-50, 50), vy: rnd(-70, -20), life: .5 });
  }
  function drawSurface(dt) {
    for (const r of ripples) {
      r.r += dt * 55;
      const a = r.a * (1 - r.r / r.max);
      if (a <= 0) continue;
      ctx.strokeStyle = `rgba(240,250,245,${a})`; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.ellipse(r.x, r.y, r.r, r.r * .9, 0, 0, TAU); ctx.stroke();
      ctx.strokeStyle = `rgba(240,250,245,${a * .4})`;
      ctx.beginPath(); ctx.ellipse(r.x, r.y, r.r * .7, r.r * .63, 0, 0, TAU); ctx.stroke();
    }
    for (let i = ripples.length - 1; i >= 0; i--) if (ripples[i].r >= ripples[i].max) ripples.splice(i, 1);
    for (const p of food) {
      p.life -= dt; p.x += Math.sin(p.life * 2 + p.ph) * 4 * dt;
      ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.arc(p.x + 2, p.y + 3, 2.6, 0, TAU); ctx.fill();
      ctx.fillStyle = '#c9954a'; ctx.beginPath(); ctx.arc(p.x, p.y, 2.6, 0, TAU); ctx.fill();
      ctx.fillStyle = '#e8c07a'; ctx.beginPath(); ctx.arc(p.x - .7, p.y - .7, 1, 0, TAU); ctx.fill();
    }
    for (let i = food.length - 1; i >= 0; i--) if (food[i].life <= 0) food.splice(i, 1);
    for (const w of words) {
      w.life -= dt;
      if (w.drop) { w.x += w.vx * dt; w.y += w.vy * dt; w.vy += 180 * dt; ctx.fillStyle = `rgba(230,245,245,${Math.max(0, w.life * 1.6)})`; ctx.beginPath(); ctx.arc(w.x, w.y, 1.6, 0, TAU); ctx.fill(); }
      else { w.y -= 18 * dt; ctx.font = 'italic 13px "Zen Old Mincho", Georgia, serif'; ctx.fillStyle = `rgba(245,239,227,${Math.max(0, Math.min(1, w.life))})`; ctx.textAlign = 'center'; ctx.fillText(w.text, w.x, w.y); }
    }
    for (let i = words.length - 1; i >= 0; i--) if (words[i].life <= 0) words.splice(i, 1);
    for (const p of petals) {
      p.x = (p.x + p.vx * dt + W) % W; p.y = (p.y + p.vy * dt + H) % H; p.a += dt * .2;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = 'rgba(244,166,192,.85)';
      ctx.beginPath(); ctx.ellipse(0, 0, 6, 2.6, 0, 0, TAU); ctx.fill(); ctx.restore();
    }
  }

  let mouse = null, last = performance.now(), T = 0;
  function resize() {
    const r = host.getBoundingClientRect();
    if (floor && Math.abs(r.width - W) < 1 && Math.abs(r.height - H) < 1) return;
    W = Math.max(1, r.width); H = Math.max(1, r.height); SMALL = W < 700;
    DPR = SMALL ? .75 : Math.min(1.25, devicePixelRatio || 1);
    cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    buildFloor(); buildWeeds(); buildPads();
    if (!koi.length) for (let i = 0; i < (SMALL ? 6 : 10); i++) koi.push(makeKoi(i));
    if (!turtles.length) for (let i = 0; i < (SMALL ? 2 : 3); i++) turtles.push(makeTurtle(i));
    sky = ctx.createLinearGradient(0, 0, W, H);
    sky.addColorStop(0, 'rgba(180,230,235,.07)'); sky.addColorStop(.5, 'rgba(180,230,235,0)'); sky.addColorStop(1, 'rgba(180,230,235,.05)');
    frogs.length = 0; for (let i = 0; i < Math.min(6, Math.max(3, pads.length >> 1)); i++) frogs.push(makeFrog(i));
    render(0);
  }
  function render(dt) {
    T += dt;
    ctx.drawImage(floor, 0, 0, W, H);
    drawCaustics(T);
    drawWeeds(T);
    for (const tu of turtles) drawTurtle(tu, T);
    const order = [...koi].sort((a, b) => a.z - b.z);
    for (const f of order) drawKoi(f, T, true);
    for (const f of order) drawKoi(f, T, false);
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    drawSurface(dt);
    for (const p of pads) drawPad(p, T);
    const air = frogs.filter(f => f.state === 'hop');
    for (const fr of frogs) if (fr.state !== 'hop') drawFrog(fr, T);
    for (const fr of air) drawFrog(fr, T);
    if (hl && (hl.t -= dt || .016) > 0) {
      const c = where(hl.id);
      if (c) { const r = c.r + 10 + Math.sin(T * 6) * 3; ctx.strokeStyle = `rgba(242,193,78,${Math.min(1, hl.t)})`; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, TAU); ctx.stroke(); }
    }
    if (calm > .01) { ctx.fillStyle = `rgba(4,22,29,${(.38 * calm).toFixed(3)})`; ctx.fillRect(0, 0, W, H); }
  }
  function frame(now) {
    if (now - last < (calm > .5 ? 48 : 31)) { requestAnimationFrame(frame); return; }
    const dt = Math.min(.06, (now - last) / 1000); last = now;
    calm += (calmT - calm) * Math.min(1, dt * 2.5); pace = 1 - .45 * calm;
    if (!still) {
      for (const f of koi) stepKoi(f, dt, T, mouse);
      for (const tu of turtles) stepTurtle(tu, dt, T);
      for (const p of pads) { p.x += p.drift * dt * .3; p.rot += p.spin * dt; p.bob = Math.max(0, p.bob - dt * .9); if (p.x < -60) p.x = W + 60; if (p.x > W + 60) p.x = -60; }
      for (const fr of frogs) stepFrog(fr, dt, T);
      render(dt);
    } else if (dt > 0 && T === 0) render(0);
    requestAnimationFrame(frame);
  }
  function say(x, y, text) { words.push({ x, y, text, life: 1.4 }); }
  const all = () => [...koi, ...frogs, ...turtles];
  function where(id) {
    const c = all().find(o => o.id === id); if (!c) return null;
    if (c.kind === 'koi') { const m = c.seg[5]; return { x: m.x, y: m.y, r: c.size * 5 }; }
    return { x: c.x, y: c.y, r: c.size * 1.3 };
  }
  function pick(x, y) {
    const fr = frogs.find(f => Math.hypot(f.x - x, f.y - y) < Math.max(26, f.size * 1.8));
    if (fr) return fr;
    const tu = turtles.find(u => Math.hypot(u.x - x, u.y - y) < u.size * 1.3);
    if (tu) return tu;
    return koi.find(k => k.seg.some((s, i) => i % 2 === 0 && Math.hypot(s.x - x, s.y - y) < k.size * 1.6)) || null;
  }

  let rz = 0;
  new ResizeObserver(() => { clearTimeout(rz); rz = setTimeout(resize, 150); }).observe(host);
  resize();
  requestAnimationFrame(frame);
  addEventListener('pointermove', e => { mouse = e.pointerType === 'mouse' ? { x: e.clientX, y: e.clientY } : null; }, { passive: true });
  addEventListener('scroll', () => { if (still) render(0); }, { passive: true });

  window.POND = {
    poke(x, y) {
      const fr = frogs.find(f => Math.hypot(f.x - x, f.y - y) < 32 && f.state !== 'swim');
      if (fr) { hop(fr); say(fr.x, fr.y - 16, 'ribbit'); return 'frog'; }
      const tu = turtles.find(u => Math.hypot(u.x - x, u.y - y) < u.size * 1.2);
      if (tu) { if (tu.spc.rough) say(tu.x, tu.y - tu.size - 8, 'snap!'); else { tu.hide = 3; say(tu.x, tu.y - tu.size - 8, '(hiding)'); } if (still) render(0); return 'turtle'; }
      for (let i = 0; i < 6; i++) food.push({ x: x + rnd(-26, 26), y: y + rnd(-26, 26), life: 14, ph: rnd(0, 6) });
      ripple(x, y, 1); ripple(x, y, .5);
      listeners.feed.forEach(fn => fn());
      if (still) render(0);
      return 'fed';
    },
    onFeed(fn) { listeners.feed.push(fn); },
    setStill(v) { still = v; render(0); },
    setCalm(v) { calmT = v ? 1 : 0; if (still) { calm = calmT; render(0); } },
    isStill: () => still,
    pick(x, y) { const c = pick(x, y); return c ? { id: c.id, kind: c.kind, key: c.key } : null; },
    list() { return all().map(c => ({ id: c.id, kind: c.kind, key: c.key })); },
    freezeScroll(y) { frozenY = y; },
    padPositions: () => pads.map(p => [Math.round(p.x), Math.round(padY(p))]),
    highlight(id) { hl = { id, t: 4 }; if (still) render(0); }
  };
})();
