(() => {
  "use strict";
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) document.documentElement.classList.add("no-motion");

  /* ---------------- Arayüz metinleri (TR / EN) ---------------- */
  const I18N = {
    tr: {
      menuOpen: "Menüyü aç", menuClose: "Menüyü kapat",
      waHello: "Merhaba Bekir Hoca, padel dersi hakkında bilgi almak istiyorum.",
      champion: /şampiyon/i,
      win: "Şampiyon", final: "Finalist",
      popular: "En popüler", min: "dk", book: "Rezerve et",
      flowLabel: (t) => `${t} dakikalık ders akışı: `, flowItem: (f) => `${f.min} dakika ${f.title}`,
      flowTotal: (t) => `${t} dakikalık örnek birebir ders`,
      stars: "5 üzerinden 5 yıldız",
      wa: "WhatsApp", waValue: "Hemen mesaj gönder", phone: "Telefon", email: "E-posta",
      tennis: "Tenis geçmişi", tennisValue: "Kariyer & başarılar", newTab: "(yeni sekmede açılır)",
      maps: "Haritada aç", glass: "Glass'ta gör", anyCourt: "Fark etmez",
      quiz: [
        { q: "Padel geçmişin nasıl?", opts: ["Hiç oynamadım", "Birkaç kez oynadım", "Düzenli oynuyorum", "Lig / turnuva oynuyorum"] },
        { q: "Top duvardan ya da camdan döndükten sonra oynayabiliyor musun?", opts: ["Henüz değil", "Bazen", "Rahatça", "Bandeja / víbora ile hücum ediyorum"] },
        { q: "Ana hedefin ne?", opts: ["Eğlence & sosyal", "Tekniğimi geliştirmek", "Lig / turnuva", "Tenisten padele geçiyorum"] },
        { q: "Kim için ders arıyorsun?", opts: ["Kendim — birebir", "Partnerim / arkadaşlarımla", "Çocuğum / genç oyuncu"] },
      ],
      qOf: (n, t) => `Soru ${n}/${t}`, qBack: "← Önceki soru", qReset: "Testi tekrar çöz",
      qPick: (name) => `Önerim: ${name}`, qBook: "Bu dersi rezerve et", qAsk: "Önce WhatsApp'tan sor",
      levels: [
        { level: "Seviye 1–2 · Başlangıç", form: "Başlangıç (1–2)", text: "Temeli doğru atmak her şeydir. Tutuş, hazır duruş, vole ve topun camdan dönmesine izin verme alışkanlığıyla başlayıp birkaç derste rahat ralli yapacak seviyeye gelmeyi hedefliyoruz." },
        { level: "Seviye 2.5–3.5 · Gelişen", form: "Gelişen (2.5–3.5)", text: "Ralli kurabiliyorsun; sıra duvar çıkışlarında ve filede doğru pozisyonda. Arka cam çıkışları, lob ve vole tutarlılığına odaklanalım." },
        { level: "Seviye 4–5 · Orta-ileri", form: "Orta-ileri (4–5)", text: "Sağlam bir oyunun var. Bandeja ve víbora ile fileyi korumak, smaç seçimi ve partnerle geçişler üzerine bir gelişim planı çıkaralım." },
        { level: "Seviye 5.5+ · İleri / turnuva", form: "İleri / turnuva (5.5+)", text: "Rekabet seviyesindesin. Taktik, maç içi karar verme ve baskı altında oyun üzerine yoğun bir program öneriyorum." },
      ],
      neverPlayed: "Hiç oynamadım",
      fromTennis: { level: "Tenisten padele geçiş", form: "Tenisten geçiyorum", text: "Top hissin ve vuruş temelin hazır; bu büyük avantaj. Uyarlayacağımız birkaç alışkanlık var: topun camdan dönmesine izin verip duvarla oynamak, daha kompakt ve kontrollü swing, sert vurmak yerine lob ve sabırla puan kurmak. İlk derslerde bu geçişe odaklanıyoruz." },
      addLeague: " Lig hedefin için derslere maç oyunu bölümü ekliyoruz.",
      addSocial: " Padel sosyal bir oyun; istersen arkadaşlarınla grup dersine de geçebilirsin.",
      addJunior: " Junior derslerde çalışmayı oyunla birleştiriyoruz; ikili junior grup da açılabilir.",
      closed: "Kapalı", free: (n) => `${n} boş`, full: "Dolu",
      pickDay: "Önce yukarıdan bir gün seç.", past: "geçmiş", taken: "dolu",
      sLesson: "Ders", sDuration: "Süre", sDate: "Tarih", sTime: "Saat",
      hint: (l) => (l.unit.includes("toplam") ? "2 kişi toplam fiyattır. " : "") + "Kort ücreti dahil · Ödeme havale / EFT. Kort müsaitliği Glass'tan kontrol edilip WhatsApp'tan onaylanır.",
      needDay: "Lütfen bir gün seç.", needTime: "Lütfen bir saat seç.",
      picked: (name) => `${name} seçildi — şimdi gün ve saat seç.`,
      vName: "Ad soyadını en az 3 karakter olarak gir.",
      vPhone: "Telefonu 05XX XXX XX XX biçiminde gir.",
      vEmail: "Geçerli bir e-posta adresi gir (ör. ad@mail.com) ya da boş bırak.",
      vKvkk: "Devam etmek için onay kutusunu işaretle.",
      slotGone: "Bu saat az önce doldu, lütfen başka bir saat seç.",
      msg: (b, when, price) => [
        "Merhaba Bekir Hoca, siteden ders rezervasyonu talebim var.", "",
        `Kod: ${b.code}`, `Ders: ${b.lessonName} (${b.duration} dk)`, `Tarih: ${when}`, `Kort: ${b.location}`,
        `Ad: ${b.name}`, `Telefon: ${b.phone}`, `Seviye: ${b.level}`, b.note ? `Not: ${b.note}` : null, `Tutar: ${price}`,
        "", "Bu saatte kort müsait mi, onaylayabilir misin?",
      ],
      mailSubject: (code) => `Padel dersi talebi ${code}`,
      icsSummary: (name) => `Padel dersi — ${name} (Bekir Berk Şahin)`,
      icsDesc: (code) => `Rezervasyon kodu: ${code}\nRaketini ve suyunu unutma!`,
      icsAlarm: "Padel dersine 2 saat var", icsFile: "padel-dersi", icsDone: "Takvim dosyası indirildi.",
      myBookings: "Rezervasyonlarım", cancelLabel: (code) => `${code} rezervasyonunu iptal et`,
      noBookings: "Henüz rezervasyonun yok.", firstBooking: "İlk dersini ayırt",
      confirmCancel: "Bu rezervasyonu iptal etmek istediğine emin misin?",
      cancelled: "Rezervasyon iptal edildi. Bekir'e de haber vermeyi unutma.",
    },
    en: {
      menuOpen: "Open menu", menuClose: "Close menu",
      waHello: "Hi Bekir, I'd like some information about padel lessons.",
      champion: /champion/i,
      win: "Winner", final: "Finalist",
      popular: "Most popular", min: "min", book: "Book now",
      flowLabel: (t) => `${t}-minute lesson flow: `, flowItem: (f) => `${f.min} minutes ${f.title}`,
      flowTotal: (t) => `A sample ${t}-minute private lesson`,
      stars: "5 out of 5 stars",
      wa: "WhatsApp", waValue: "Send a message", phone: "Phone", email: "Email",
      tennis: "Tennis background", tennisValue: "Career & titles", newTab: "(opens in a new tab)",
      maps: "Open in Maps", glass: "View on Glass", anyCourt: "No preference",
      quiz: [
        { q: "What's your padel experience?", opts: ["Never played", "Played a few times", "I play regularly", "I play league / tournaments"] },
        { q: "Can you play the ball after it comes off the wall or glass?", opts: ["Not yet", "Sometimes", "Comfortably", "I attack with bandeja / víbora"] },
        { q: "What's your main goal?", opts: ["Fun & social", "Improve my technique", "League / tournaments", "Switching from tennis"] },
        { q: "Who are the lessons for?", opts: ["Me — one-to-one", "Me with my partner / friends", "My child / a junior player"] },
      ],
      qOf: (n, t) => `Question ${n}/${t}`, qBack: "← Previous question", qReset: "Retake the quiz",
      qPick: (name) => `My suggestion: ${name}`, qBook: "Book this lesson", qAsk: "Ask on WhatsApp first",
      levels: [
        { level: "Level 1–2 · Beginner", form: "Beginner (1–2)", text: "Getting the basics right is everything. We start with the grip, ready position, volleys and the habit of letting the ball come off the glass, aiming for comfortable rallies within a few lessons." },
        { level: "Level 2.5–3.5 · Improver", form: "Improver (2.5–3.5)", text: "You can rally; next up is playing off the walls and positioning at the net. Let's focus on back-glass exits, lobs and volley consistency." },
        { level: "Level 4–5 · Intermediate-advanced", form: "Intermediate-advanced (4–5)", text: "You have a solid game. Let's build a plan around holding the net with bandeja and víbora, smash selection and transitions with your partner." },
        { level: "Level 5.5+ · Advanced / competitive", form: "Advanced / competitive (5.5+)", text: "You're at competitive level. I recommend an intensive programme on tactics, in-match decisions and playing under pressure." },
      ],
      neverPlayed: "Never played",
      fromTennis: { level: "Tennis to padel", form: "Switching from tennis", text: "Your feel for the ball and your strokes are already there, which is a big advantage. A few habits to adapt: letting the ball come off the glass and playing with the wall, a more compact and controlled swing, and building points with lobs and patience instead of power. The first lessons focus on this transition." },
      addLeague: " For your league goal we add a match-play block to every lesson.",
      addSocial: " Padel is a social game; you can also move on to group lessons with friends.",
      addJunior: " Junior lessons mix training with play; junior pair lessons are available too.",
      closed: "Closed", free: (n) => `${n} free`, full: "Full",
      pickDay: "Pick a day above first.", past: "past", taken: "taken",
      sLesson: "Lesson", sDuration: "Duration", sDate: "Date", sTime: "Time",
      hint: (l) => (l.unit.includes("total") ? "Total price for 2 players. " : "") + "Court fee included · Payment by bank transfer. Court availability is checked on Glass and confirmed on WhatsApp.",
      needDay: "Please pick a day.", needTime: "Please pick a time.",
      picked: (name) => `${name} selected — now pick a day and time.`,
      vName: "Enter your full name (at least 3 characters).",
      vPhone: "Enter a valid phone number (e.g. 05XX XXX XX XX or +90…).",
      vEmail: "Enter a valid email (e.g. name@mail.com) or leave it blank.",
      vKvkk: "Please tick the consent box to continue.",
      slotGone: "That time was just taken, please choose another.",
      msg: (b, when, price) => [
        "Hi Bekir, I'd like to book a lesson via your website.", "",
        `Code: ${b.code}`, `Lesson: ${b.lessonName} (${b.duration} min)`, `Date: ${when}`, `Court: ${b.location}`,
        `Name: ${b.name}`, `Phone: ${b.phone}`, `Level: ${b.level}`, b.note ? `Note: ${b.note}` : null, `Price: ${price}`,
        "", "Could you check the court is free at this time and confirm?",
      ],
      mailSubject: (code) => `Padel lesson request ${code}`,
      icsSummary: (name) => `Padel lesson — ${name} (Bekir Berk Şahin)`,
      icsDesc: (code) => `Booking code: ${code}\nDon't forget your racket and water!`,
      icsAlarm: "Padel lesson in 2 hours", icsFile: "padel-lesson", icsDone: "Calendar file downloaded.",
      myBookings: "My bookings", cancelLabel: (code) => `Cancel booking ${code}`,
      noBookings: "You have no bookings yet.", firstBooking: "Book your first lesson",
      confirmCancel: "Are you sure you want to cancel this booking?",
      cancelled: "Booking cancelled. Remember to let Bekir know too.",
    },
  };
  const L = I18N[S.lang] || I18N.tr;
  const LOC = S.locale || "tr-TR";

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* gizli sekme vb. */ } },
  };
  const icon = (id) => `<svg class="i" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tl = (n) => (S.lang === "en" ? "₺" + new Intl.NumberFormat("en-GB").format(n) : new Intl.NumberFormat("tr-TR").format(n) + " ₺");
  const pad = (n) => String(n).padStart(2, "0");
  const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseIso = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const fmtLong = (s) => new Intl.DateTimeFormat(LOC, { weekday: "long", day: "numeric", month: "long" }).format(parseIso(s));
  const fmtShortDay = (d) => new Intl.DateTimeFormat(LOC, { weekday: "short" }).format(d);
  const html = (sel, markup) => { const el = $(sel); if (el) el.innerHTML = markup; return el; };

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-on"), 3500);
  }

  const lessonById = (id) => S.lessons.find((l) => l.id === id) || S.lessons[0];

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
    menuBtn.setAttribute("aria-label", L.menuOpen);
  };
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? L.menuClose : L.menuOpen);
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
  const waBase = `https://wa.me/${c.whatsapp}`;

  /* ---------------- Hero ---------------- */
  $("#heroEyebrow").textContent = `${S.title} · ${S.city}`;
  $("#sbSub").textContent = `TUR · ${S.age} · ${S.city}`;
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
    const gold = L.champion.test(h.title);
    return `
    <li class="honour ${gold ? "honour--gold" : ""} reveal" style="transition-delay:${i * 70}ms">
      <span class="honour__icon">${icon(gold ? "trophy" : "flag")}</span>
      <span class="honour__year">${esc(h.year)}</span>
      <h4>${esc(h.title)}</h4>
      <span class="honour__org">${esc(h.org)}</span>
    </li>`;
  }).join(""));

  const RESULT = {
    win: { cls: "win", label: L.win, icon: "trophy", path: "M4 6h34v16h78", dot: 112 },
    final: { cls: "final", label: L.final, icon: "medal", path: "M4 6h34v16h34", dot: 72 },
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

  /* ---------------- Dersler ---------------- */
  html("#lessons", S.lessons.map((l) => `
    <article class="lesson ${l.featured ? "lesson--featured navy" : ""}">
      ${l.featured ? `<span class="lesson__tag">${L.popular}</span>` : ""}
      <div class="lesson__icon">${icon(l.icon)}</div>
      <h3 class="lesson__name">${esc(l.name)}</h3>
      <div class="lesson__meta">${icon("clock")} ${Number(l.duration)} ${L.min}</div>
      <p class="lesson__text">${esc(l.text)}</p>
      <div class="lesson__price">
        <span class="lesson__amount">${tl(l.price)}</span>
        <span class="lesson__unit">/ ${esc(l.unit)}</span>
      </div>
      <ul class="lesson__perks">${(l.perks || []).map((p) => `<li>${icon("check")}<span>${esc(p)}</span></li>`).join("")}</ul>
      <button class="btn btn--primary" type="button" data-book="${esc(l.id)}">${L.book} ${icon("arrow")}</button>
    </article>`).join(""));

  $("#trialTitle").textContent = S.trial.title;
  $("#trialText").textContent = S.trial.text;
  $("#trialBtn").dataset.book = S.trial.lesson;

  const flowTotal = S.lessonFlow.reduce((a, b) => a + b.min, 0);
  html("#flowBar", S.lessonFlow.map((f) =>
    `<div class="flow__seg" style="--m:${Number(f.min)}"><div class="flow__min">${Number(f.min)}<small>${L.min}</small></div><div class="flow__title">${esc(f.title)}</div></div>`).join(""));
  $("#flowBar").setAttribute("aria-label", L.flowLabel(flowTotal) + S.lessonFlow.map(L.flowItem).join(", "));
  $("#flowTotal").textContent = L.flowTotal(flowTotal);

  /* ---------------- Yorumlar (boşsa bölüm kaldırılır) ---------------- */
  if (S.testimonials && S.testimonials.length) {
    html("#testimonials", S.testimonials.map((t, i) => `
      <figure class="t-card reveal" style="transition-delay:${i * 80}ms">
        <div class="t-card__stars" role="img" aria-label="${L.stars}">${icon("star").repeat(5)}</div>
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
  const waHelloHref = `${waBase}?text=${encodeURIComponent(L.waHello)}`;
  const contactCards = [
    { cls: "c-card--wa", icon: "chat", label: L.wa, value: L.waValue, href: waHelloHref, ext: true },
    { icon: "phone", label: L.phone, value: c.phoneDisplay, href: `tel:${c.phone}` },
    { icon: "mail", label: L.email, value: c.email, href: `mailto:${c.email}` },
    c.instagram && { icon: "insta", label: "Instagram", value: "@" + c.instagram, href: `https://instagram.com/${c.instagram}`, ext: true },
    { cls: "c-card--profile", icon: "trophy", label: L.tennis, value: L.tennisValue, href: "#tenis" },
  ].filter(Boolean);
  html("#contactCards", contactCards.map((x, i) => `
    <a class="c-card ${x.cls || ""} reveal" style="transition-delay:${i * 60}ms" href="${esc(x.href)}" ${x.ext ? 'target="_blank" rel="noopener"' : ""}>
      <span class="c-card__icon">${icon(x.icon)}</span>
      <span class="c-card__body"><small>${esc(x.label)}</small><strong>${esc(x.value)}</strong></span>
      <svg class="i c-card__go" aria-hidden="true"><use href="#i-${x.ext ? "external" : "arrow"}"/></svg>
      ${x.ext ? `<span class="sr-only">${L.newTab}</span>` : ""}
    </a>`).join(""));
  $("#mobileWa").href = waHelloHref;
  html("#locations", S.locations.map((l) => `
    <li><div><strong>${esc(l.name)}</strong><span>${esc(l.area)}${l.note ? " · " + esc(l.note) : ""}</span></div>
    <span class="locations__links">${l.glass ? `<a href="${esc(l.glass)}" target="_blank" rel="noopener">${L.glass}<span class="sr-only"> ${L.newTab}</span></a>` : ""}${l.maps ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.maps)}" target="_blank" rel="noopener">${L.maps}<span class="sr-only"> ${L.newTab}</span></a>` : ""}</span></li>`).join(""));
  html("#fLoc", `<option>${L.anyCourt}</option>` + S.locations.map((l) => `<option>${esc(l.name)} (${esc(l.area)})</option>`).join(""));
  $("#year").textContent = new Date().getFullYear();

  /* ---------------- Seviye testi ---------------- */
  // Padel seviyeleri: uygulamalarda yaygın 1–7 ölçeği
  const QUIZ = L.quiz;
  const STYLE_LESSON = ["birebir", "grup", "junior"];
  let quizStep = 0;
  let answers = [];
  function renderQuiz() {
    const box = $("#quiz");
    if (quizStep < QUIZ.length) {
      const q = QUIZ[quizStep];
      box.innerHTML = `
        <div class="quiz__progress"><span>${L.qOf(quizStep + 1, QUIZ.length)}</span>
          <div class="quiz__track" aria-hidden="true"><i style="width:${(quizStep / QUIZ.length) * 100}%"></i></div></div>
        <p class="quiz__q" id="quizQ">${esc(q.q)}</p>
        <div class="quiz__opts" role="group" aria-labelledby="quizQ">
          ${q.opts.map((o, i) => `<button type="button" class="quiz__opt" data-a="${i}"><span aria-hidden="true">${"ABCD"[i]}</span>${esc(o)}</button>`).join("")}
        </div>
        ${quizStep > 0 ? `<button type="button" class="link-btn quiz__back" data-qback>${L.qBack}</button>` : ""}`;
      return;
    }
    const r = quizResult();
    box.innerHTML = `
      <div class="quiz__result">
        <span class="quiz__level">${esc(r.level)}</span>
        <h3>${esc(L.qPick(r.lesson.name))}</h3>
        <p>${esc(r.text)}</p>
        <div class="quiz__actions">
          <button class="btn btn--primary" type="button" data-book="${esc(r.lesson.id)}" data-level="${esc(r.formLevel)}">${L.qBook} ${icon("arrow")}</button>
          <a class="btn btn--ghost" href="${esc(waHelloHref)}" target="_blank" rel="noopener">${L.qAsk}</a>
          <button class="link-btn" type="button" data-qreset>${L.qReset}</button>
        </div>
      </div>`;
  }
  function quizResult() {
    const [exp, wall, goal, style] = answers;
    const score = exp + wall;
    const band = score <= 1 ? 0 : score <= 3 ? 1 : score <= 5 ? 2 : 3;
    let { level, form: formLevel, text } = goal === 3 ? L.fromTennis : L.levels[band];
    if (goal !== 3 && band === 0 && exp === 0) formLevel = L.neverPlayed;
    const lessonId = STYLE_LESSON[style] || "birebir";
    if (goal === 2 && score >= 2) text += L.addLeague;
    if (goal === 0 && lessonId === "birebir") text += L.addSocial;
    if (lessonId === "junior") text += L.addJunior;
    return { level, text, formLevel, lesson: lessonById(lessonId) };
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
  const B = { step: 1, lesson: S.lessons[0].id, date: null, time: null, week: 0, last: null };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const lastDay = new Date(today); lastDay.setDate(today.getDate() + S.bookingDaysAhead - 1);
  const mondayOf = (d) => { const m = new Date(d); m.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return m; };
  const firstMonday = mondayOf(today);
  const maxWeek = Math.floor((lastDay - firstMonday) / (7 * 864e5));

  const getBookings = () => { const v = store.get("bbs-bookings", []); return Array.isArray(v) ? v : []; };
  const setBookings = (list) => { store.set("bbs-bookings", list); updateBadge(); };

  // Gerçek doluluk Bekir'in onayıyla netleşir; burada yalnızca geçmiş saatler ve bu cihazdaki talepler kapanır
  function slotState(date, time) {
    const d = parseIso(date);
    const [hh, mm] = time.split(":").map(Number);
    d.setHours(hh, mm);
    if (d.getTime() < Date.now() + 2 * 3600e3) return "past";
    if (getBookings().some((b) => b.date === date && b.time === time)) return "taken";
    return "free";
  }
  const freeSlots = (date) => (S.schedule[parseIso(date).getDay()] || []).filter((t) => slotState(date, t) === "free");

  function renderLessonChoices() {
    $("#lessonChoices").innerHTML = S.lessons.map((l) => `
      <label class="choice">
        <input type="radio" name="lesson" value="${esc(l.id)}" ${B.lesson === l.id ? "checked" : ""}>
        <span class="choice__box">
          <span class="choice__icon">${icon(l.icon)}</span>
          <span class="choice__body"><strong>${esc(l.name)}</strong><span>${Number(l.duration)} ${L.min}${l.unit ? " · " + esc(l.unit) : ""}</span></span>
          <span class="choice__price">${tl(l.price)}</span>
        </span>
      </label>`).join("");
  }
  $("#lessonChoices").addEventListener("change", (e) => { B.lesson = e.target.value; renderSummary(); });

  function renderWeek() {
    const start = new Date(firstMonday); start.setDate(start.getDate() + B.week * 7);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      const iso = isoDate(d);
      const inRange = d >= today && d <= lastDay;
      const hasSchedule = (S.schedule[d.getDay()] || []).length > 0;
      const free = inRange && hasSchedule ? freeSlots(iso).length : 0;
      const label = !inRange ? "" : !hasSchedule ? L.closed : free ? L.free(free) : L.full;
      days.push(`
        <button type="button" class="day ${iso === isoDate(today) ? "is-today" : ""}" role="radio" data-date="${iso}"
          aria-checked="${B.date === iso}" ${!free ? "disabled" : ""} aria-label="${esc(fmtLong(iso))}${label ? ", " + label : ""}">
          <small>${esc(fmtShortDay(d))}</small><strong>${d.getDate()}</strong><em>${label || "&nbsp;"}</em>
        </button>`);
    }
    $("#calWeek").innerHTML = days.join("");
    const end = new Date(start); end.setDate(start.getDate() + 6);
    const mf = new Intl.DateTimeFormat(LOC, { day: "numeric", month: "long" });
    $("#calTitle").textContent = `${mf.format(start)} – ${mf.format(end)}`;
    $("#calPrev").disabled = B.week <= 0;
    $("#calNext").disabled = B.week >= maxWeek;
  }
  function renderSlots() {
    const box = $("#slots");
    if (!B.date) { box.innerHTML = `<p class="slots__empty">${L.pickDay}</p>`; return; }
    const times = S.schedule[parseIso(B.date).getDay()] || [];
    box.innerHTML = times.map((t) => {
      const st = slotState(B.date, t);
      return `<button type="button" class="slot" role="radio" data-time="${esc(t)}" aria-checked="${B.time === t}" ${st !== "free" ? `disabled aria-label="${esc(t)}, ${st === "past" ? L.past : L.taken}"` : ""}>${esc(t)}</button>`;
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
    const rows = [
      [L.sLesson, l.name],
      [L.sDuration, `${l.duration} ${L.min}`],
      [L.sDate, B.date ? fmtLong(B.date) : "—"],
      [L.sTime, B.time || "—"],
    ];
    $("#summary").innerHTML = rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
    $("#sumTotal").textContent = tl(l.price);
    $("#sumHint").textContent = L.hint(l);
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
      if (B.step === 2 && (!B.date || !B.time)) { toast(!B.date ? L.needDay : L.needTime); return; }
      goStep(B.step + 1);
    }
    if (e.target.closest("[data-prev]")) goStep(B.step - 1);

    // Sitenin herhangi bir yerinden "rezerve et"
    const book = e.target.closest("[data-book]");
    if (book) {
      B.lesson = lessonById(book.dataset.book).id;
      if (book.dataset.level) $("#fLevel").value = book.dataset.level;
      renderLessonChoices(); renderSummary();
      goStep(2, { focus: false });
      $("#rezervasyon").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      setTimeout(() => $(".day:not([disabled])")?.focus({ preventScroll: true }), reduceMotion ? 0 : 600);
      toast(L.picked(lessonById(B.lesson).name));
    }
  });

  /* Form doğrulama */
  const validators = {
    fName: (v) => (v.trim().length < 3 ? L.vName : ""),
    fPhone: (v) => {
      const d = v.replace(/\D/g, "");
      const tr = (d.length === 10 && d[0] === "5") || (d.length === 11 && d.startsWith("05")) || (d.length === 12 && d.startsWith("905"));
      // İngilizce sürümde yabancı numaralar da kabul (+ ile başlayan 8–15 hane)
      const intl = S.lang === "en" && /^\+/.test(v.trim()) && d.length >= 8 && d.length <= 15;
      return tr || intl ? "" : L.vPhone;
    },
    fEmail: (v) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? L.vEmail : ""),
    fKvkk: (_, el) => (el.checked ? "" : L.vKvkk),
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
      toast(L.slotGone);
      B.time = null; goStep(2); return;
    }
    const btn = $("#submitBtn");
    btn.classList.add("is-loading"); btn.disabled = true; btn.setAttribute("aria-busy", "true");
    setTimeout(() => {
      const l = lessonById(B.lesson);
      const code = "BBS-" + Math.random().toString(36).slice(2, 6).toUpperCase();
      const booking = {
        code, lesson: l.id, lessonName: l.name, duration: l.duration, total: l.price,
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

  const bookingMessage = (b) => L.msg(b, `${fmtLong(b.date)}, ${b.time}`, tl(b.total)).filter((x) => x !== null).join("\n");
  function fillDone(b) {
    $("#doneCode").textContent = b.code;
    const msg = bookingMessage(b);
    $("#waLink").href = `${waBase}?text=${encodeURIComponent(msg)}`;
    $("#mailLink").href = `mailto:${c.email}?subject=${encodeURIComponent(L.mailSubject(b.code))}&body=${encodeURIComponent(msg)}`;
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
      `SUMMARY:${escIcs(L.icsSummary(b.lessonName))}`,
      `LOCATION:${escIcs(b.location)}`,
      `DESCRIPTION:${escIcs(L.icsDesc(b.code))}`,
      "BEGIN:VALARM", "TRIGGER:-PT2H", "ACTION:DISPLAY", `DESCRIPTION:${L.icsAlarm}`, "END:VALARM",
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `${L.icsFile}-${b.date}.ics` });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(L.icsDone);
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
    $("#myBookingsBtn").setAttribute("aria-label", n ? `${L.myBookings} (${n})` : L.myBookings);
  }
  function renderBookingsList() {
    const list = getBookings().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    const mf = new Intl.DateTimeFormat(LOC, { month: "short" });
    $("#bookingsList").innerHTML = list.length ? list.map((b) => `
      <div class="bk">
        <div class="bk__date"><strong>${parseIso(b.date).getDate()}</strong><small>${esc(mf.format(parseIso(b.date)))}</small></div>
        <div class="bk__body"><strong>${esc(b.lessonName)} · ${esc(b.time)}</strong><span>${esc(b.code)} · ${esc(b.location)}</span></div>
        <button class="icon-btn" type="button" data-cancel="${esc(b.code)}" aria-label="${esc(L.cancelLabel(b.code))}">${icon("trash")}</button>
      </div>`).join("")
      : `<div class="empty"><p>${L.noBookings}</p><a href="#rezervasyon" class="btn btn--primary" data-close>${L.firstBooking}</a></div>`;
  }
  $("#myBookingsBtn").addEventListener("click", () => {
    renderBookingsList();
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog || e.target.closest("[data-close]")) { dialog.close?.(); dialog.removeAttribute("open"); return; }
    const cancel = e.target.closest("[data-cancel]");
    if (cancel && confirm(L.confirmCancel)) {
      setBookings(getBookings().filter((b) => b.code !== cancel.dataset.cancel));
      renderBookingsList();
      if (B.step === 2) { renderWeek(); renderSlots(); }
      toast(L.cancelled);
      $("#bookingsList [data-cancel], #bookingsList [data-close]")?.focus();
    }
  });

  renderLessonChoices(); renderSummary(); updateStepper(); updateBadge();

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
