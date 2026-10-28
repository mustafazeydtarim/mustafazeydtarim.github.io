/*
 * SİTE İÇERİĞİ (Türkçe) — tüm metinler, fiyatlar ve iletişim bilgileri burada.
 * İngilizce sürüm: js/data.en.js (bir şeyi değiştirince orayı da güncelle).
 * Bekir PADEL antrenörü; tenis kariyeri `tennis` altında, sayfanın en sonundaki "Tenis geçmişi" bölümünde.
 * "// teyit et" işaretli alanlar henüz Bekir'le netleşmedi.
 */
window.SITE = {
  lang: "tr",
  locale: "tr-TR",
  name: "Bekir Berk Şahin",
  monogram: "BBŞ",
  age: 27,
  sport: "Padel",
  title: "Padel Antrenörü",
  city: "İstanbul",

  // Fotoğraf eklemek için: assets/ klasörüne koy ve yolu yaz, ör. "assets/bekir.jpg"
  photo: "",

  contact: {
    phoneDisplay: "+90 531 677 34 01",
    phone: "+905316773401",
    whatsapp: "905316773401",
    email: "sbekirberk@gmail.com",
    instagram: "bekirberkksahin",
  },

  // Hero skorbordu
  scoreboard: [
    ["Lisans", "ITF Antrenör"],
    ["Kortlar", "Sarıyer"],
    ["Ders dili", "TR · EN"],
    ["Kökeni", "Tenis · U12 TR Şampiyonu"],
  ],

  stats: [
    { value: 21, suffix: "", label: "Yıl raket sporları (2005'ten beri)" },
    { value: 6, suffix: "+", label: "Yıl antrenörlük deneyimi" },
    { value: 5, suffix: "", label: "Ülkede akademi deneyimi" },
    { value: 7, suffix: "/7", label: "Haftanın her günü ders" },
  ],

  ticker: ["Bandeja", "Víbora", "Bajada", "Chiquita", "Globo", "Por 3 smaç", "Duvar oyunu", "Volley", "Contrapared"],

  about: {
    lead: "Padel; doğru pozisyon, sabır ve partnerle uyum oyunu. Derslerimde bu üçünü seviyene göre adım adım kuruyoruz.",
    paragraphs: [
      "Her ders kort içindeki yerini bulmakla başlar: filede ve arkada nerede durmalısın, top camdan döndüğünde nasıl hazırlanmalısın, partnerinle alanı nasıl paylaşmalısın. Vole, bandeja ve víbora gibi vuruşlar bu temelin üzerine oturur.",
      "Altyapım tenis: 2005'ten beri raket sporlarındayım, ITF antrenör lisansım var ve beş ülkedeki akademilerden gelen teknik temeli padelin duvarlı, eşli oyununa uyarlıyorum. Sarıyer'de Lepadel ve Opadel kortlarında, çocuktan yetişkine her yaştan oyuncuya Türkçe ve İngilizce özel ders veriyorum.",
    ],
    principles: [
      { icon: "wall", title: "Duvar okuma", text: "Top camdan dönünce telaş yok: açıyı okumayı, beklemeyi ve doğru anda vurmayı çalışıyoruz." },
      { icon: "users", title: "Doğru pozisyon & eşli oyun", text: "Filede ve arkada nerede duracağını, partnerinle birlikte nasıl hareket edeceğini oyun durumlarıyla öğreniyorsun." },
      { icon: "target", title: "Kişiye özel plan", text: "İlk derste seviyeni görüp hedefine göre bir yol haritası çıkarıyoruz." },
    ],
  },

  lessonFlow: [
    { min: 10, title: "Isınma & footwork" },
    { min: 20, title: "Teknik: vole / bandeja" },
    { min: 10, title: "Duvar & cam çalışması" },
    { min: 15, title: "Maç oyunu" },
  ],

  // ₺, ders başı; kort ücreti dahil. Paket indirimi yok.
  lessons: [
    { id: "birebir", icon: "user", name: "Birebir Ders", duration: 55, price: 5000, unit: "ders",
      text: "Tüm odak sende: teknik, pozisyon ve duvar oyunu tek bir plan içinde.",
      perks: ["Kişisel gelişim planı", "Teknik & duvar çalışması", "Kort ücreti dahil"], featured: true },
    { id: "grup", icon: "users", name: "Grup Dersi", duration: 55, price: 6000, unit: "ders · grup toplamı",
      text: "Partnerinle ya da arkadaşlarınla: eşli pozisyon, iletişim ve geçişleri birlikte çalışın.",
      perks: ["2–4 oyuncu", "Eşli taktik & drill", "Kort ücreti dahil"] }, // kişi sayısı teyit et
    { id: "junior", icon: "smile", name: "Junior Ders", duration: 55, price: 5000, unit: "ders · birebir",
      text: "Çocuk ve gençler için: koordinasyon, temel teknik ve oyun sevgisi. İkili junior grup dersi de var.",
      perks: ["Her yaşa uygun", "İkili junior grup: 6.000 ₺", "Kort ücreti dahil"] },
  ],

  trial: {
    lesson: "birebir",
    title: "Deneme dersiyle başla.",
    text: "Paket ya da taahhüt yok: tek bir dersle tanışalım, oyununu görüp sana özel planı çıkaralım.",
  },

  // Haftanın her günü ders. Saat aralığı teyit et: 0 = Pazar … 6 = Cumartesi
  schedule: Object.fromEntries([0, 1, 2, 3, 4, 5, 6].map((d) => [d,
    ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]])),
  bookingDaysAhead: 21,

  locations: [
    { name: "Lepadel", area: "Sarıyer, İstanbul", maps: "Lepadel İstanbul" },
    { name: "Opadel", area: "Sarıyer, İstanbul", maps: "O'Padel Skyland Sarıyer İstanbul" },
  ],

  // Gerçek öğrenci yorumları geldiğinde ekle: { name, meta, text } — boşsa bölüm gizlenir
  testimonials: [],

  faq: [
    { q: "Hiç padel oynamadım, başlayabilir miyim?", a: "Kesinlikle. Padel ilk dersten keyif veren bir oyun. Tutuş, hazır duruş ve temel vuruşlarla başlıyoruz. Paket zorunluluğu yok; tek bir deneme dersiyle başlayabilirsin." },
    { q: "Tenisten geliyorum, padelde fark ne?", a: "Top hissin ve vuruş temelin büyük avantaj. Uyarlaman gerekenler: daha kompakt ve kontrollü swing, topun camdan dönmesine izin vermek, sert vurmak yerine lob ve sabırla puan kurmak. Benim de altyapım tenis; bu geçişi derslerde özellikle çalışıyoruz." },
    { q: "Hangi yaşlara ders veriyorsun?", a: "Her yaşa. Çocuk ve gençler için birebir ya da ikili junior dersler, yetişkinler için birebir ve grup dersleri veriyorum." },
    { q: "Ders ücretleri ne kadar, kort dahil mi?", a: "Birebir ders 5.000 ₺, grup dersi 6.000 ₺; bir ders 55 dakika. Kort ücreti bu fiyatlara dahil, ayrıca ödeme yapmazsın. Paket indirimi yok, her ders tek tek ücretlendirilir." },
    { q: "Dersler nerede ve hangi günler?", a: "Sarıyer'de Lepadel ve Opadel kortlarında. Haftanın her günü ders veriyorum; uygun saati rezervasyonda seçebilirsin." },
    { q: "Dersleri İngilizce verebilir misin?", a: "Evet. Dersleri Türkçe ve İngilizce veriyorum." },
    { q: "Ödeme nasıl yapılıyor?", a: "Ödemeler havale / EFT ile yapılır." },
    { q: "Ders iptal ya da erteleme nasıl oluyor?", a: "Dersten 24 saat öncesine kadar iptal ya da erteleme yapabilirsin. 24 saatten az kala yapılan iptallerde ders yapılmış sayılır ve ücreti alınır." },
    { q: "Raket ve ayakkabı gerekli mi?", a: "Ayakkabı olarak kumlu suni çime uygun (omni ya da balıksırtı tabanlı) bir padel/tenis ayakkabısı öneriyorum; koşu ayakkabısı kaydırır. Raketin yoksa dersten önce yaz, seviyene uygun seçenekleri konuşalım." },
  ],

  /* ---------------- TENİS GEÇMİŞİ (sayfanın sonunda) ---------------- */
  tennis: {
    intro: "Padelden önce: 2005'ten 2025'e tenis kariyeri",
    profile: "https://te.tournamentsoftware.com/player-profile/A61FD868-8997-4549-AC13-B87F3E2C1921",
    rankingHigh: 53,

    honours: [
      { year: "2011", title: "U12 Türkiye Şampiyonu", org: "Türkiye Tenis Federasyonu" },
      { year: "2013", title: "U14 Türkiye Milli Takımı", org: "Türkiye Tenis Federasyonu" },
      { year: "2017", title: "U18 Türkiye Milli Takımı", org: "Türkiye Tenis Federasyonu" },
    ],
    results: [
      { event: "Hitit Cup", cat: "U14", draw: "Tekler", result: "win" },
      { event: "Hitit Cup", cat: "U14", draw: "Çiftler", result: "win" },
      { event: "Sadi Gülçelik Cup", cat: "U16", draw: "Tekler", result: "final" },
      { event: "Bitola Open", cat: "U16", draw: "Çiftler", result: "final" },
      { event: "National Sport Park Open", cat: "U14", draw: "Tekler", result: "final" },
    ],

    // Tenis antrenörlüğü (yeniden eskiye)
    work: [
      { years: "Nis 2024 — Eyl 2025", role: "Tenis Antrenörü", place: "Shape Tennis Academy", city: "İstanbul" },
      { years: "Mar 2022 — Mar 2023", role: "Tenis Antrenörü", place: "Tacspor Tennis", city: "İstanbul" },
      { years: "Ara 2020 — Şub 2022", role: "Özel Antrenör", place: "Özel antrenörlük", city: "Kharkiv, Ukrayna" },
      { years: "Haz 2020 — Ara 2020", role: "Antrenör", place: "Gebze Tennis Academy", city: "Kocaeli", note: "Berfu Cengiz (WTA 350) ile" },
      { years: "Haz 2019 — Mar 2020", role: "Antrenör", place: "GD Tennis Academy", city: "İstanbul", note: "Giorgi Khrikadze ile" },
    ],

    // Oyuncu gelişimi & akademiler (yeniden eskiye)
    education: [
      { years: "Ara 2018 — Haz 2019", place: "GD Tennis Academy", city: "İstanbul" },
      { years: "Tem 2017 — Kas 2018", place: "Garanti Koza Enka", city: "İstanbul" },
      { years: "Kas 2016 — Mar 2017", place: "Academia Tennis Ferrer", city: "Xàbia, İspanya" },
      { years: "Kas 2015 — Oca 2016", place: "Bucharest Tennis Academy", city: "Bükreş, Romanya" },
      { years: "Oca — Mar 2013", place: "IMG Academy", city: "Tampa, Florida, ABD" },
      { years: "Oca — Ağu 2012", place: "Galați Tennis Academy", city: "Galați, Romanya" },
      { years: "2005 — 2011", place: "Tenise başlangıç", city: "Adana" },
    ],

    journey: [
      { code: "TR", place: "Adana", year: "2005" },
      { code: "RO", place: "Galați", year: "2012" },
      { code: "US", place: "Tampa, Florida", year: "2013" },
      { code: "RO", place: "Bükreş", year: "2015" },
      { code: "ES", place: "Xàbia", year: "2016" },
      { code: "TR", place: "İstanbul", year: "2017" },
      { code: "UA", place: "Kharkiv", year: "2020" },
    ],
  },
};
