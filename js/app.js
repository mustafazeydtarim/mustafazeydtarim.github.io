(() => {
  "use strict";
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) document.documentElement.classList.add("no-motion");

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* gizli sekme vb. */ } },
  };
  const icon = (id) => `<svg class="i" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tl = (n) => (n === 0 ? "Ücretsiz" : new Intl.NumberFormat("tr-TR").format(n) + " ₺");
  const pad = (n) => String(n).padStart(2, "0");
  const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseIso = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const fmtLong = (s) => new Intl.DateTimeFormat("tr-TR", { weekday: "long", day: "numeric", month: "long" }).format(parseIso(s));
  const fmtShortDay = (d) => new Intl.DateTimeFormat("tr-TR", { weekday: "short" }).format(d);
  const html = (sel, markup) => { const el = $(sel); if (el) el.innerHTML = markup; return el; };

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-on"), 3500);
  }

  /* ---------------- Fiyat ---------------- */
  const allLessons = [...S.lessons, S.trial];
  const lessonById = (id) => allLessons.find((l) => l.id === id) || S.lessons[0];
  function priceFor(lesson, count) {
    const pkg = S.packages.find((p) => p.count === count) || S.packages[0];
    const per = Math.round((lesson.price * (1 - pkg.discount / 100)) / 10) * 10;
    return { per, total: per * pkg.count, pkg };
  }

  /* ---------------- Tema ---------------- */
  $("#themeToggle").addEventListener("click", () => {
    const root = document.documentElement;
    const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("bbs-theme", next); } catch { /* yoksay */ }
  });

  /* ---------------- Nav ---------------- */
  const nav = $("#nav");
  const menuBtn = $("#menuBtn");
  const links = $("#navLinks");
  const closeMenu = () => {
    links.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Menüyü aç");
  };
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    if (open) links.querySelector("a")?.focus({ preventScroll: true });
  });
  links.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("is-open")) { closeMenu(); menuBtn.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (links.classList.contains("is-open") && !e.target.closest("#navLinks, #menuBtn")) closeMenu();
  });
  matchMedia("(min-width: 1024px)").addEventListener?.("change", closeMenu);
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const c = S.contact;
  const T = S.tennis || {};
  const sport = S.sport || "Padel";
  const waBase = `https://wa.me/${c.whatsapp}`;
  const waHello = `Merhaba Bekir Hoca, ${sport.toLocaleLowerCase("tr-TR")} dersi hakkında bilgi almak istiyorum.`;

  /* ---------------- Hero ---------------- */
  $("#heroEyebrow").textContent = `${S.title} · ${S.city}`;
  $("#sbSub").textContent = `TUR · ${S.age} yaş · ${S.city}`;
  $("#monogram").textContent = S.monogram;
  if (S.photo) $("#portrait").innerHTML = `<img src="${esc(S.photo)}" alt="${esc(S.name)}" width="144" height="144">`;
  html("#scoreboard", S.scoreboard.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join(""));

  html("#stats", S.stats.map((s) =>
    `<div><dt>${esc(s.label)}</dt><dd data-count="${Number(s.value) || 0}" data-prefix="${esc(s.prefix || "")}" data-suffix="${esc(s.suffix || "")}">${s.prefix ? `<span class="pre">${esc(s.prefix)}</span>` : ""}<span class="num">${Number(s.value) || 0}</span>${esc(s.suffix || "")}</dd></div>`).join(""));

  /* Ticker (iki kopya → kesintisiz kayan şerit) */
  const tickerGroup = `<div class="ticker__group">${S.ticker.map((t) => `<span class="ticker__item">${esc(t)} ${icon("ball")}</span>`).join("")}</div>`;
  html("#ticker", tickerGroup + tickerGroup);

  /* ---------------- Hakkımda ---------------- */
  {
    const lead = String(S.about.lead || "");
    const cut = lead.indexOf(". ");
    $("#aboutLead").innerHTML = cut > 0 ? `<span class="hl">${esc(lead.slice(0, cut + 1))}</span> ${esc(lead.slice(cut + 2))}` : esc(lead);
  }
  html("#aboutText", S.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join(""));
  html("#principles", S.about.principles.map((p, i) => `
    <div class="principle reveal" style="transition-delay:${i * 70}ms">
      <div class="principle__icon">${icon(p.icon)}</div>
      <h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>
    </div>`).join(""));

  /* ---------------- Tenis geçmişi (son bölüm) ---------------- */
  if (T.intro) $("#tennisIntro").textContent = T.intro;

  const journey = $("#journey");
  const jList = T.journey || [];
  journey.style.setProperty("--n", jList.length);
  journey.innerHTML = jList.map((j) => `
    <li>
      <span class="j__code" aria-hidden="true">${esc(j.code)}</span>
      <span class="j__body"><span class="j__year">${esc(j.year)}</span><span class="j__place">${esc(j.place)}</span></span>
      <span class="sr-only">(${esc(j.code)})</span>
    </li>`).join("");

  $("#rankHigh").textContent = T.rankingHigh ?? "";
  const profile = $("#profileLink");
  if (T.profile) profile.href = T.profile; else profile.remove();

  html("#honours", (T.honours || []).map((h, i) => {
    const gold = /şampiyon/i.test(h.title);
    return `
    <li class="honour ${gold ? "honour--gold" : ""} reveal" style="transition-delay:${i * 70}ms">
      <span class="honour__icon">${icon(gold ? "trophy" : "flag")}</span>
      <span class="honour__year">${esc(h.year)}</span>
      <h4>${esc(h.title)}</h4>
      <span class="honour__org">${esc(h.org)}</span>
    </li>`;
  }).join(""));

  const RESULT = {
    win: { cls: "win", label: "Şampiyon", icon: "trophy", path: "M4 6h34v16h78", dot: 112 },
    final: { cls: "final", label: "Finalist", icon: "medal", path: "M4 6h34v16h34", dot: 72 },
  };
  html("#results", (T.results || []).map((r, i) => {
    const R = RESULT[r.result] || RESULT.final;
    return `
    <li class="draw draw--${R.cls} reveal" style="transition-delay:${i * 60}ms">
      <div class="draw__meta"><span class="draw__tag draw__tag--cat">${esc(r.cat)}</span><span class="draw__tag">${esc(r.draw)}</span></div>
      <h5>${esc(r.event)}</h5>
      <svg class="draw__bracket" viewBox="0 0 120 44" preserveAspectRatio="xMinYMid meet" aria-hidden="true" focusable="false">
        <path d="M4 6h34v16M4 38h34V22M38 22h78" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/>
        <path class="b-path" d="${R.path}" fill="none" stroke-width="3" vector-effect="non-scaling-stroke"/>
        <circle class="b-dot" cx="${R.dot}" cy="22" r="4"/>
      </svg>
      <span class="result-badge result-badge--${R.cls}">${icon(R.icon)} ${R.label}</span>
    </li>`;
  }).join(""));

  /* Özgeçmiş (yazdırma başlığı padel unvanıyla) */
  $("#printName").textContent = `${S.name} — ${S.title}`;
  $("#printContact").textContent = `${S.city} · ${c.phoneDisplay} · ${c.email}`;
  html("#work", (T.work || []).map((x) => `
    <li class="tl reveal">
      <div class="tl__card">
        <div class="tl__years">${esc(x.years)}</div>
        <div class="tl__role">${esc(x.role)}</div>
        <div class="tl__place">${esc(x.place)}</div>
        <div class="tl__city">${icon("pin")} ${esc(x.city)}</div>
        ${x.note ? `<div><span class="tl__note">${esc(x.note)}</span></div>` : ""}
      </div>
    </li>`).join(""));
  html("#education", (T.education || []).map((x) => `
    <li class="tl reveal">
      <div class="tl__card">
        <div class="tl__years">${esc(x.years)}</div>
        <div class="tl__role">${esc(x.place)}</div>
        <div class="tl__city">${icon("pin")} ${esc(x.city)}</div>
      </div>
    </li>`).join(""));

  $("#printCv").addEventListener("click", () => {
    $$(".reveal").forEach((el) => el.classList.add("is-visible"));
    document.body.classList.add("print-cv");
    window.print();
  });
  addEventListener("afterprint", () => document.body.classList.remove("print-cv"));

  /* ---------------- Dersler + paket seçici ---------------- */
  let viewPkg = S.packages[0].count;
  function renderPkgToggle() {
    $("#pkgToggle").innerHTML = S.packages.map((p) => {
      const on = p.count === viewPkg;
      return `<button type="button" role="radio" aria-checked="${on}" tabindex="${on ? 0 : -1}" data-pkg="${p.count}">${esc(p.label)}${p.discount ? ` <small>-%${p.discount}</small>` : ""}</button>`;
    }).join("");
  }
  function renderLessons() {
    $("#lessons").innerHTML = S.lessons.map((l) => {
      const { per, total, pkg } = priceFor(l, viewPkg);
      return `
      <article class="lesson ${l.featured ? "lesson--featured navy" : ""}">
        ${l.featured ? `<span class="lesson__tag">En popüler</span>` : ""}
        <div class="lesson__icon">${icon(l.icon)}</div>
        <h3 class="lesson__name">${esc(l.name)}</h3>
        <div class="lesson__meta">${icon("clock")} ${Number(l.duration)} dk</div>
        <p class="lesson__text">${esc(l.text)}</p>
        <div class="lesson__price">
          <span class="lesson__amount">${tl(per)}</span>
          <span class="lesson__unit">/ ${esc(l.unit)}</span>
          <span class="lesson__old">${pkg.discount ? `<s>${tl(l.price)}</s> · ${pkg.count} ders toplam ${tl(total)}` : "&nbsp;"}</span>
        </div>
        <ul class="lesson__perks">${(l.perks || []).map((p) => `<li>${icon("check")}<span>${esc(p)}</span></li>`).join("")}</ul>
        <button class="btn btn--primary" type="button" data-book="${esc(l.id)}" data-pkg="${viewPkg}">Rezerve et ${icon("arrow")}</button>
      </article>`;
    }).join("");
  }
  function setPkg(count, focus) {
    viewPkg = count;
    renderPkgToggle(); renderLessons();
    if (focus) $(`#pkgToggle [data-pkg="${viewPkg}"]`).focus();
  }
  $("#pkgToggle").addEventListener("click", (e) => {
    const b = e.target.closest("[data-pkg]");
    if (b) setPkg(Number(b.dataset.pkg), true);
  });
  $("#pkgToggle").addEventListener("keydown", (e) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in keys) && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const n = S.packages.length;
    const idx = S.packages.findIndex((p) => p.count === viewPkg);
    const nextIdx = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : (idx + keys[e.key] + n) % n;
    setPkg(S.packages[nextIdx].count, true);
  });
  renderPkgToggle();
  renderLessons();

  $("#trialTitle").textContent = `${S.trial.name}: ${S.trial.price === 0 ? "ücretsiz" : tl(S.trial.price)}.`;
  $("#trialText").textContent = `${S.trial.duration} dakika. ${S.trial.text}`;

  const flowTotal = S.lessonFlow.reduce((a, b) => a + b.min, 0);
  html("#flowBar", S.lessonFlow.map((f) =>
    `<div class="flow__seg" style="--m:${Number(f.min)}"><div class="flow__min">${Number(f.min)}<small>dk</small></div><div class="flow__title">${esc(f.title)}</div></div>`).join(""));
  $("#flowBar").setAttribute("aria-label", `${flowTotal} dakikalık ders akışı: ` + S.lessonFlow.map((f) => `${f.min} dakika ${f.title}`).join(", "));
  $("#flowTotal").textContent = `${flowTotal} dakikalık örnek birebir ders`;

  /* ---------------- Yorumlar (boşsa bölüm kaldırılır) ---------------- */
  if (S.testimonials && S.testimonials.length) {
    html("#testimonials", S.testimonials.map((t, i) => `
      <figure class="t-card reveal" style="transition-delay:${i * 80}ms">
        <div class="t-card__stars" role="img" aria-label="5 üzerinden 5 yıldız">${icon("star").repeat(5)}</div>
        <blockquote>${esc(t.text)}</blockquote>
        <figcaption><span class="t-card__avatar" aria-hidden="true">${esc(String(t.name || "?")[0])}</span><div><strong>${esc(t.name)}</strong><span>${esc(t.meta)}</span></div></figcaption>
      </figure>`).join(""));
  } else {
    $("#yorumlar")?.remove();
    $$('a[href="#yorumlar"]').forEach((a) => a.remove());
  }
  // Bölüm numaralarını sırayla yeniden yaz (gizlenen bölüm boşluk bırakmasın)
  $$("main > section .eyebrow b").forEach((b, i) => { b.textContent = pad(i + 1); });

  /* ---------------- SSS ---------------- */
  html("#faq", S.faq.map((f, i) => `<details class="reveal" ${i === 0 ? "open" : ""}><summary>${esc(f.q)}<span class="faq__ic" aria-hidden="true">${icon("plus")}</span></summary><p>${esc(f.a)}</p></details>`).join(""));

  /* ---------------- İletişim ---------------- */
  const contactCards = [
    { cls: "c-card--wa", icon: "chat", label: "WhatsApp", value: "Hemen mesaj gönder", href: `${waBase}?text=${encodeURIComponent(waHello)}`, ext: true },
    { icon: "phone", label: "Telefon", value: c.phoneDisplay, href: `tel:${c.phone}` },
    { icon: "mail", label: "E-posta", value: c.email, href: `mailto:${c.email}` },
    { cls: "c-card--profile", icon: "trophy", label: "Tenis geçmişi", value: "Kariyer & başarılar", href: "#tenis" },
  ].filter(Boolean);
  html("#contactCards", contactCards.map((x, i) => `
    <a class="c-card ${x.cls || ""} reveal" style="transition-delay:${i * 60}ms" href="${esc(x.href)}" ${x.ext ? 'target="_blank" rel="noopener"' : ""}>
      <span class="c-card__icon">${icon(x.icon)}</span>
      <span class="c-card__body"><small>${esc(x.label)}</small><strong>${esc(x.value)}</strong></span>
      <svg class="i c-card__go" aria-hidden="true"><use href="#i-${x.ext ? "external" : "arrow"}"/></svg>
      ${x.ext ? '<span class="sr-only">(yeni sekmede açılır)</span>' : ""}
    </a>`).join(""));
  $("#mobileWa").href = `${waBase}?text=${encodeURIComponent(waHello)}`;
  html("#locations", S.locations.map((l) => `
    <li><div><strong>${esc(l.name)}</strong><span>${esc(l.area)}${l.note ? " · " + esc(l.note) : ""}</span></div>
    ${l.maps ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.maps)}" target="_blank" rel="noopener">Haritada aç</a>` : ""}</li>`).join(""));
  html("#fLoc", `<option>Fark etmez</option>` + S.locations.map((l) => `<option>${esc(l.name)} (${esc(l.area)})</option>`).join(""));
  $("#year").textContent = new Date().getFullYear();

  /* ---------------- Seviye testi ---------------- */
  // Padel seviyeleri: uygulamalarda yaygın 1–7 ölçeği
  const QUIZ = [
    { q: "Padel geçmişin nasıl?", opts: ["Hiç oynamadım", "Birkaç kez oynadım", "Düzenli oynuyorum", "Lig / turnuva oynuyorum"] },
    { q: "Top duvardan ya da camdan döndükten sonra oynayabiliyor musun?", opts: ["Henüz değil", "Bazen", "Rahatça", "Bandeja / víbora ile hücum ediyorum"] },
    { q: "Ana hedefin ne?", opts: ["Eğlence & sosyal", "Tekniğimi geliştirmek", "Lig / turnuva", "Tenisten padele geçiyorum"] },
    { q: "Nasıl çalışmak istersin?", opts: ["Birebir — tüm odak bende", "Partnerimle", "4 kişilik grupla"] },
  ];
  const STYLE_LESSON = ["birebir", "ikili", "grup"];
  let quizStep = 0;
  let answers = [];
  function renderQuiz() {
    const box = $("#quiz");
    if (quizStep < QUIZ.length) {
      const q = QUIZ[quizStep];
      box.innerHTML = `
        <div class="quiz__progress"><span>Soru ${quizStep + 1}/${QUIZ.length}</span>
          <div class="quiz__track" aria-hidden="true"><i style="width:${(quizStep / QUIZ.length) * 100}%"></i></div></div>
        <p class="quiz__q" id="quizQ">${esc(q.q)}</p>
        <div class="quiz__opts" role="group" aria-labelledby="quizQ">
          ${q.opts.map((o, i) => `<button type="button" class="quiz__opt" data-a="${i}"><span aria-hidden="true">${"ABCD"[i]}</span>${esc(o)}</button>`).join("")}
        </div>
        ${quizStep > 0 ? `<button type="button" class="link-btn quiz__back" data-qback>← Önceki soru</button>` : ""}`;
      return;
    }
    const r = quizResult();
    box.innerHTML = `
      <div class="quiz__result">
        <span class="quiz__level">${esc(r.level)}</span>
        <h3>Önerim: ${esc(r.lesson.name)}${r.pkg.count > 1 ? ` · ${esc(r.pkg.label)}` : ""}</h3>
        <p>${esc(r.text)}</p>
        <div class="quiz__actions">
          <button class="btn btn--primary" type="button" data-book="${esc(r.lesson.id)}" data-pkg="${r.pkg.count}" data-level="${esc(r.formLevel)}">Bu dersi rezerve et ${icon("arrow")}</button>
          <button class="btn btn--ghost" type="button" data-book="${esc(S.trial.id)}" data-level="${esc(r.formLevel)}">Önce ücretsiz tanışalım</button>
          <button class="link-btn" type="button" data-qreset>Testi tekrar çöz</button>
        </div>
      </div>`;
  }
  function quizResult() {
    const [exp, wall, goal, style] = answers;
    const score = exp + wall;
    let level, text, formLevel, pkgCount;
    if (score <= 1) { level = "Seviye 1–2 · Başlangıç"; formLevel = exp === 0 ? "Hiç oynamadım" : "Başlangıç (1–2)"; pkgCount = 5;
      text = "Temeli doğru atmak her şeydir. Tutuş, hazır duruş, vole ve topun camdan dönmesine izin verme alışkanlığıyla başlayıp birkaç derste rahat ralli yapacak seviyeye gelmeyi hedefliyoruz."; }
    else if (score <= 3) { level = "Seviye 2.5–3.5 · Gelişen"; formLevel = "Gelişen (2.5–3.5)"; pkgCount = 5;
      text = "Ralli kurabiliyorsun; sıra duvar çıkışlarında ve filede doğru pozisyonda. Arka cam çıkışları, lob ve vole tutarlılığına odaklanalım."; }
    else if (score <= 5) { level = "Seviye 4–5 · Orta-ileri"; formLevel = "Orta-ileri (4–5)"; pkgCount = 10;
      text = "Sağlam bir oyunun var. Bandeja ve víbora ile fileyi korumak, smaç seçimi ve partnerle geçişler üzerine 10 derslik bir gelişim planı çıkaralım."; }
    else { level = "Seviye 5.5+ · İleri / turnuva"; formLevel = "İleri / turnuva (5.5+)"; pkgCount = 10;
      text = "Rekabet seviyesindesin. Taktik, maç içi karar verme ve baskı altında oyun üzerine yoğun bir program öneriyorum."; }

    let lessonId = STYLE_LESSON[style] || "birebir";
    if (goal === 3) {
      // Tenisten geçiş: alışkanlıkları padele uyarlama
      level = "Tenisten padele geçiş";
      formLevel = "Tenisten geçiyorum";
      pkgCount = 5;
      text = "Top hissin ve vuruş temelin hazır; bu büyük avantaj. Uyarlayacağımız birkaç alışkanlık var: topun camdan dönmesine izin verip duvarla oynamak, daha kompakt ve kontrollü swing, sert vurmak yerine lob ve sabırla puan kurmak. İlk derslerde bu geçişe odaklanıyoruz.";
    } else {
      if (score >= 4 && goal === 2) lessonId = "clinic";
      if (goal === 2 && score >= 2 && lessonId !== "clinic") text += " Lig hedefin için derslere maç oyunu bölümü ekliyoruz.";
      if (goal === 0 && lessonId !== "grup") text += " Padel sosyal bir oyun; istersen 4'lü grup dersleriyle de devam edebilirsin.";
    }
    if (lessonId === "clinic") text += " Maç Pratiği / Clinic formatında gerçek maç oyunu üzerinden koçluk yapıyoruz.";
    if (!S.lessons.some((l) => l.id === lessonId)) lessonId = S.lessons[0].id;
    return { level, text, formLevel, lesson: lessonById(lessonId), pkg: S.packages.find((p) => p.count === pkgCount) || S.packages[0] };
  }
  $("#quiz").addEventListener("click", (e) => {
    const opt = e.target.closest("[data-a]");
    if (opt) {
      answers[quizStep] = Number(opt.dataset.a);
      quizStep++;
      renderQuiz();
      $("#quiz .quiz__opt, #quiz .quiz__result .btn")?.focus({ preventScroll: true });
      return;
    }
    if (e.target.closest("[data-qback]")) { quizStep--; renderQuiz(); $("#quiz .quiz__opt")?.focus({ preventScroll: true }); return; }
    if (e.target.closest("[data-qreset]")) { quizStep = 0; answers = []; renderQuiz(); $("#quiz .quiz__opt")?.focus({ preventScroll: true }); }
  });
  renderQuiz();

  /* ---------------- Rezervasyon ---------------- */
  const B = { step: 1, lesson: S.lessons[0].id, pkg: 1, date: null, time: null, week: 0, last: null };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const lastDay = new Date(today); lastDay.setDate(today.getDate() + S.bookingDaysAhead - 1);
  const mondayOf = (d) => { const m = new Date(d); m.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return m; };
  const firstMonday = mondayOf(today);
  const maxWeek = Math.floor((lastDay - firstMonday) / (7 * 864e5));

  const getBookings = () => { const v = store.get("bbs-bookings", []); return Array.isArray(v) ? v : []; };
  const setBookings = (list) => { store.set("bbs-bookings", list); updateBadge(); };

  // Örnek doluluk: tarih+saatten türetilen sabit "dolu" slotlar (gerçek takvim bağlanana kadar)
  function seededTaken(date, time) {
    let h = 2166136261;
    for (const ch of date + time) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    return (h >>> 0) % 100 < 28;
  }
  function slotState(date, time) {
    const d = parseIso(date);
    const [hh, mm] = time.split(":").map(Number);
    d.setHours(hh, mm);
    if (d.getTime() < Date.now() + 2 * 3600e3) return "past";
    if (getBookings().some((b) => b.date === date && b.time === time)) return "taken";
    return seededTaken(date, time) ? "taken" : "free";
  }
  const freeSlots = (date) => (S.schedule[parseIso(date).getDay()] || []).filter((t) => slotState(date, t) === "free");

  function renderLessonChoices() {
    $("#lessonChoices").innerHTML = allLessons.map((l) => `
      <label class="choice">
        <input type="radio" name="lesson" value="${esc(l.id)}" ${B.lesson === l.id ? "checked" : ""}>
        <span class="choice__box">
          <span class="choice__icon">${icon(l.icon)}</span>
          <span class="choice__body"><strong>${esc(l.name)}</strong><span>${Number(l.duration)} dk${l.unit ? " · " + esc(l.unit) : ""}</span></span>
          <span class="choice__price ${l.price === 0 ? "is-free" : ""}">${tl(l.price)}</span>
        </span>
      </label>`).join("");
  }
  function renderPkgChoices() {
    const trial = B.lesson === S.trial.id;
    $("#pkgChoices").innerHTML = S.packages.map((p) => `
      <label class="choice" ${trial && p.count > 1 ? 'aria-disabled="true"' : ""}>
        <input type="radio" name="pkg" value="${p.count}" ${B.pkg === p.count ? "checked" : ""} ${trial && p.count > 1 ? "disabled" : ""}>
        <span class="choice__box">${esc(p.label)}${p.discount ? ` <small>-%${p.discount}</small>` : ""}</span>
      </label>`).join("");
  }
  $("#lessonChoices").addEventListener("change", (e) => {
    B.lesson = e.target.value;
    if (B.lesson === S.trial.id) B.pkg = 1;
    renderPkgChoices(); renderSummary();
  });
  $("#pkgChoices").addEventListener("change", (e) => { B.pkg = Number(e.target.value); renderSummary(); });

  function renderWeek() {
    const start = new Date(firstMonday); start.setDate(start.getDate() + B.week * 7);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      const iso = isoDate(d);
      const inRange = d >= today && d <= lastDay;
      const hasSchedule = (S.schedule[d.getDay()] || []).length > 0;
      const free = inRange && hasSchedule ? freeSlots(iso).length : 0;
      const label = !inRange ? "" : !hasSchedule ? "Kapalı" : free ? `${free} boş` : "Dolu";
      days.push(`
        <button type="button" class="day ${iso === isoDate(today) ? "is-today" : ""}" role="radio" data-date="${iso}"
          aria-checked="${B.date === iso}" ${!free ? "disabled" : ""} aria-label="${esc(fmtLong(iso))}${label ? ", " + label : ""}">
          <small>${esc(fmtShortDay(d))}</small><strong>${d.getDate()}</strong><em>${label || "&nbsp;"}</em>
        </button>`);
    }
    $("#calWeek").innerHTML = days.join("");
    const end = new Date(start); end.setDate(start.getDate() + 6);
    const mf = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long" });
    $("#calTitle").textContent = `${mf.format(start)} – ${mf.format(end)}`;
    $("#calPrev").disabled = B.week <= 0;
    $("#calNext").disabled = B.week >= maxWeek;
  }
  function renderSlots() {
    const box = $("#slots");
    if (!B.date) { box.innerHTML = `<p class="slots__empty">Önce yukarıdan bir gün seç.</p>`; return; }
    const times = S.schedule[parseIso(B.date).getDay()] || [];
    box.innerHTML = times.map((t) => {
      const st = slotState(B.date, t);
      return `<button type="button" class="slot" role="radio" data-time="${esc(t)}" aria-checked="${B.time === t}" ${st !== "free" ? `disabled aria-label="${esc(t)}, ${st === "past" ? "geçmiş" : "dolu"}"` : ""}>${esc(t)}</button>`;
    }).join("");
  }
  $("#calWeek").addEventListener("click", (e) => {
    const d = e.target.closest("[data-date]");
    if (!d || d.disabled) return;
    B.date = d.dataset.date; B.time = null;
    renderWeek(); renderSlots(); renderSummary();
    $(`#calWeek [data-date="${B.date}"]`)?.focus({ preventScroll: true });
  });
  $("#slots").addEventListener("click", (e) => {
    const s = e.target.closest("[data-time]");
    if (!s || s.disabled) return;
    B.time = s.dataset.time;
    renderSlots(); renderSummary();
    $(`#slots [data-time="${B.time}"]`)?.focus({ preventScroll: true });
  });
  $("#calPrev").addEventListener("click", () => { if (B.week > 0) { B.week--; renderWeek(); } });
  $("#calNext").addEventListener("click", () => { if (B.week < maxWeek) { B.week++; renderWeek(); } });

  function renderSummary() {
    const l = lessonById(B.lesson);
    const { per, total, pkg } = priceFor(l, B.pkg);
    const rows = [
      ["Ders", l.name],
      ["Süre", `${l.duration} dk`],
      ["Paket", pkg.label + (pkg.discount ? ` (-%${pkg.discount})` : "")],
      ["Tarih", B.date ? fmtLong(B.date) : "—"],
      ["Saat", B.time || "—"],
    ];
    if (pkg.count > 1) rows.push(["Ders başı", tl(per)]);
    $("#summary").innerHTML = rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
    $("#sumTotal").textContent = tl(total);
    $("#sumHint").textContent = l.price === 0 ? "İlk görüşme için ücret alınmaz." :
      (l.unit === "kişi başı" ? "Kişi başı fiyattır. " : "") + (pkg.count > 1 ? "İlk derste ödenir. Kort ücreti hariç." : "Kort ücreti hariç.");
  }

  function updateStepper() {
    $$("#stepper li").forEach((li) => {
      const n = Number(li.dataset.step);
      li.classList.toggle("is-current", n === B.step);
      li.classList.toggle("is-done", n < B.step);
      if (n === B.step) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
    });
  }
  function goStep(n, { focus = true } = {}) {
    B.step = n;
    $$(".step").forEach((p) => { p.hidden = Number(p.dataset.panel) !== n; });
    updateStepper();
    if (n === 2) { renderWeek(); renderSlots(); }
    if (focus) {
      const panel = $(`.step[data-panel="${n}"]`);
      const target = n === 4 ? panel : panel.querySelector("input:checked, .day[aria-checked='true'], input, .day:not([disabled])");
      target?.focus({ preventScroll: true });
      const top = $(".booking__main").getBoundingClientRect().top;
      if (top < 0 || top > innerHeight * 0.6) $(".booking__main").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-next]")) {
      if (B.step === 2 && (!B.date || !B.time)) { toast(!B.date ? "Lütfen bir gün seç." : "Lütfen bir saat seç."); return; }
      goStep(B.step + 1);
    }
    if (e.target.closest("[data-prev]")) goStep(B.step - 1);

    // Sitenin herhangi bir yerinden "rezerve et"
    const book = e.target.closest("[data-book]");
    if (book) {
      B.lesson = lessonById(book.dataset.book).id;
      B.pkg = B.lesson === S.trial.id ? 1 : Number(book.dataset.pkg || 1);
      if (book.dataset.level) $("#fLevel").value = book.dataset.level;
      renderLessonChoices(); renderPkgChoices(); renderSummary();
      goStep(2, { focus: false });
      $("#rezervasyon").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      setTimeout(() => $(".day:not([disabled])")?.focus({ preventScroll: true }), reduceMotion ? 0 : 600);
      toast(`${lessonById(B.lesson).name} seçildi — şimdi gün ve saat seç.`);
    }
  });

  /* Form doğrulama */
  const validators = {
    fName: (v) => (v.trim().length < 3 ? "Ad soyadını en az 3 karakter olarak gir." : ""),
    fPhone: (v) => {
      const d = v.replace(/\D/g, "");
      const ok = (d.length === 10 && d[0] === "5") || (d.length === 11 && d.startsWith("05")) || (d.length === 12 && d.startsWith("905"));
      return ok ? "" : "Telefonu 05XX XXX XX XX biçiminde gir.";
    },
    fEmail: (v) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Geçerli bir e-posta adresi gir (ör. ad@mail.com) ya da boş bırak." : ""),
    fKvkk: (_, el) => (el.checked ? "" : "Devam etmek için onay kutusunu işaretle."),
  };
  function validate(id) {
    const el = $("#" + id);
    const msg = validators[id](el.value, el);
    const field = el.closest(".field");
    field.classList.toggle("has-error", !!msg);
    $(`#${id}-err`).textContent = msg;
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) el.setAttribute("aria-describedby", `${id}-err`); else el.removeAttribute("aria-describedby");
    return !msg;
  }
  Object.keys(validators).forEach((id) => {
    const el = $("#" + id);
    el.addEventListener(id === "fKvkk" ? "change" : "blur", () => validate(id));
    el.addEventListener("input", () => { if (el.closest(".field").classList.contains("has-error")) validate(id); });
  });

  $("#bookForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const bad = Object.keys(validators).filter((id) => !validate(id));
    if (bad.length) { $("#" + bad[0]).focus(); return; }
    if (!B.date || !B.time || slotState(B.date, B.time) !== "free") {
      toast("Bu saat az önce doldu, lütfen başka bir saat seç.");
      B.time = null; goStep(2); return;
    }
    const btn = $("#submitBtn");
    btn.classList.add("is-loading"); btn.disabled = true; btn.setAttribute("aria-busy", "true");
    setTimeout(() => {
      const l = lessonById(B.lesson);
      const { total, pkg } = priceFor(l, B.pkg);
      const code = "BBS-" + Math.random().toString(36).slice(2, 6).toUpperCase();
      const booking = {
        code, lesson: l.id, lessonName: l.name, duration: l.duration, pkg: pkg.count, pkgLabel: pkg.label, total,
        date: B.date, time: B.time,
        name: $("#fName").value.trim(), phone: $("#fPhone").value.trim(), email: $("#fEmail").value.trim(),
        level: $("#fLevel").value, location: $("#fLoc").value, note: $("#fNote").value.trim(), createdAt: Date.now(),
      };
      setBookings([...getBookings(), booking]);
      B.last = booking;
      fillDone(booking);
      btn.classList.remove("is-loading"); btn.disabled = false; btn.removeAttribute("aria-busy");
      goStep(4);
    }, 700);
  });

  function bookingMessage(b) {
    return [
      "Merhaba Bekir Hoca, siteden ders rezervasyonu talebim var.",
      "",
      `Kod: ${b.code}`,
      `Ders: ${b.lessonName} (${b.duration} dk)${b.pkg > 1 ? " — " + b.pkgLabel : ""}`,
      `Tarih: ${fmtLong(b.date)}, ${b.time}`,
      `Kort: ${b.location}`,
      `Ad: ${b.name}`,
      `Telefon: ${b.phone}`,
      `Seviye: ${b.level}`,
      b.note ? `Not: ${b.note}` : null,
      `Tutar: ${tl(b.total)}`,
    ].filter((x) => x !== null).join("\n");
  }
  function fillDone(b) {
    $("#doneCode").textContent = b.code;
    const msg = bookingMessage(b);
    $("#waLink").href = `${waBase}?text=${encodeURIComponent(msg)}`;
    $("#mailLink").href = `mailto:${c.email}?subject=${encodeURIComponent(`${sport} dersi talebi ${b.code}`)}&body=${encodeURIComponent(msg)}`;
  }

  function downloadIcs(b) {
    const start = parseIso(b.date);
    const [hh, mm] = b.time.split(":").map(Number);
    start.setHours(hh, mm);
    const end = new Date(start.getTime() + b.duration * 60000);
    const f = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const escIcs = (s) => String(s).replace(/[\\,;]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Bekir Berk Sahin Padel//TR", "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${b.code}@bekirberksahin`, `DTSTAMP:${stamp}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
      `SUMMARY:${escIcs(`${sport} dersi — ${b.lessonName} (Bekir Berk Şahin)`)}`,
      `LOCATION:${escIcs(b.location)}`,
      `DESCRIPTION:${escIcs(`Rezervasyon kodu: ${b.code}\nRaketini ve suyunu unutma!`)}`,
      "BEGIN:VALARM", "TRIGGER:-PT2H", "ACTION:DISPLAY", `DESCRIPTION:${sport} dersine 2 saat var`, "END:VALARM",
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `${sport.toLowerCase()}-dersi-${b.date}.ics` });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Takvim dosyası indirildi.");
  }
  $("#icsBtn").addEventListener("click", () => B.last && downloadIcs(B.last));
  $("#newBooking").addEventListener("click", () => {
    B.date = null; B.time = null; B.last = null;
    $("#bookForm").reset();
    $$(".field.has-error").forEach((f) => f.classList.remove("has-error"));
    $$(".field__err").forEach((e) => (e.textContent = ""));
    $$("#bookForm [aria-invalid]").forEach((el) => { el.removeAttribute("aria-invalid"); el.removeAttribute("aria-describedby"); });
    renderSummary(); goStep(1);
  });

  /* Rezervasyonlarım */
  const dialog = $("#bookingsDialog");
  function updateBadge() {
    const n = getBookings().filter((b) => b.date >= isoDate(today)).length;
    const badge = $("#bookingBadge");
    badge.hidden = n === 0;
    badge.textContent = n;
    $("#myBookingsBtn").setAttribute("aria-label", n ? `Rezervasyonlarım (${n})` : "Rezervasyonlarım");
  }
  function renderBookingsList() {
    const list = getBookings().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    const mf = new Intl.DateTimeFormat("tr-TR", { month: "short" });
    $("#bookingsList").innerHTML = list.length ? list.map((b) => `
      <div class="bk">
        <div class="bk__date"><strong>${parseIso(b.date).getDate()}</strong><small>${esc(mf.format(parseIso(b.date)))}</small></div>
        <div class="bk__body"><strong>${esc(b.lessonName)} · ${esc(b.time)}</strong><span>${esc(b.code)} · ${esc(b.location)}</span></div>
        <button class="icon-btn" type="button" data-cancel="${esc(b.code)}" aria-label="${esc(b.code)} rezervasyonunu iptal et">${icon("trash")}</button>
      </div>`).join("")
      : `<div class="empty"><p>Henüz rezervasyonun yok.</p><a href="#rezervasyon" class="btn btn--primary" data-close>İlk dersini ayırt</a></div>`;
  }
  $("#myBookingsBtn").addEventListener("click", () => {
    renderBookingsList();
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog || e.target.closest("[data-close]")) { dialog.close?.(); dialog.removeAttribute("open"); return; }
    const cancel = e.target.closest("[data-cancel]");
    if (cancel && confirm("Bu rezervasyonu iptal etmek istediğine emin misin?")) {
      setBookings(getBookings().filter((b) => b.code !== cancel.dataset.cancel));
      renderBookingsList();
      if (B.step === 2) { renderWeek(); renderSlots(); }
      toast("Rezervasyon iptal edildi. Bekir'e de haber vermeyi unutma.");
      $("#bookingsList [data-cancel], #bookingsList [data-close]")?.focus();
    }
  });

  renderLessonChoices(); renderPkgChoices(); renderSummary(); updateStepper(); updateBadge();

  /* ---------------- Görünme, sayaçlar, aktif menü ---------------- */
  function countUp(el) {
    const target = Number(el.dataset.count);
    const num = el.querySelector(".num");
    if (!num) return;
    if (reduceMotion) { num.textContent = target; return; }
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      num.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    num.textContent = "0";
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-visible");
      if (en.target.id === "stats") $$("[data-count]", en.target).forEach(countUp);
      io.unobserve(en.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  if ("IntersectionObserver" in window) {
    const navMap = new Map($$("#navLinks a").map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navMap.forEach((a) => { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
      const a = navMap.get(en.target.id);
      if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "true"); }
    }), { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach((s) => spy.observe(s));

    // Mobil CTA: hero geçildikten sonra görünür, rezervasyon bölümündeyken gizlenir
    const cta = $("#mobileCta");
    let pastHero = false, inBooking = false;
    const syncCta = () => cta.classList.toggle("is-visible", pastHero && !inBooking);
    new IntersectionObserver(([en]) => { pastHero = !en.isIntersecting; syncCta(); }).observe($(".hero"));
    new IntersectionObserver(([en]) => { inBooking = en.isIntersecting; syncCta(); }, { threshold: 0.05 }).observe($("#rezervasyon"));
  }
})();
