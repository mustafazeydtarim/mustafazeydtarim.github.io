/*
 * SİTE İÇERİĞİ — tüm metinler, fiyatlar ve iletişim bilgileri burada.
 * Bekir artık PADEL antrenörü. Padel'e özgü bilgiler (seviye, kulüp, sertifika, fiyat, saat) henüz yok:
 * "// ÖRNEK — teyit et" ile işaretli her alan yer tutucudur, yayına almadan önce Bekir'le teyit et.
 * Tenis kariyeri (başarılar, sonuçlar, kariyer, akademiler, yolculuk) `tennis` altında; özgeçmişten
 * (CV_BekirBerkŞahin.rtf) alınmıştır ve sayfanın en sonundaki "Tenis geçmişi" bölümünde gösterilir.
 */
window.SITE = {
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
  },

  // Hero skorbordu (yalnız bilinen gerçekler)
  scoreboard: [
    ["Branş", "Padel"],
    ["Raket sporları", "21 yıl"],
    ["Antrenörlük", "2019 →"],
    ["Kökeni", "Tenis · U12 TR Şampiyonu"],
  ],

  stats: [
    { value: 21, suffix: "", label: "Yıl raket sporları (2005'ten beri)" },
    { value: 7, suffix: "", label: "Yıl antrenörlük (2019'dan beri)" },
    { value: 5, suffix: "", label: "Ülkede akademi deneyimi" },
    { value: 4, suffix: "", label: "Ders formatı" },
  ],

  ticker: ["Bandeja", "Víbora", "Bajada", "Chiquita", "Globo", "Por 3 smaç", "Duvar oyunu", "Volley", "Contrapared"],

  // Genel antrenörlük yaklaşımı — ÖRNEK — teyit et (Bekir'in kendi cümleleriyle güncellenebilir)
  about: {
    lead: "Padel; doğru pozisyon, sabır ve partnerle uyum oyunu. Derslerimde bu üçünü seviyene göre adım adım kuruyoruz.",
    paragraphs: [
      "Her ders kort içindeki yerini bulmakla başlar: filede ve arkada nerede durmalısın, top camdan döndüğünde nasıl hazırlanmalısın, partnerinle alanı nasıl paylaşmalısın. Vole, bandeja ve víbora gibi vuruşlar bu temelin üzerine oturur.",
      "Altyapım tenis: 2005'ten beri raket sporlarındayım ve beş ülkedeki akademilerden gelen teknik temeli padelin duvarlı, eşli oyununa uyarlıyorum.",
    ],
    principles: [
      { icon: "wall", title: "Duvar okuma", text: "Top camdan dönünce telaş yok: açıyı okumayı, beklemeyi ve doğru anda vurmayı çalışıyoruz." },
      { icon: "users", title: "Doğru pozisyon & eşli oyun", text: "Filede ve arkada nerede duracağını, partnerinle birlikte nasıl hareket edeceğini oyun durumlarıyla öğreniyorsun." },
      { icon: "target", title: "Kişiye özel plan", text: "İlk görüşmede seviyeni görüp hedefine göre bir yol haritası çıkarıyoruz." },
    ],
  },

  lessonFlow: [
    { min: 10, title: "Isınma & footwork" },
    { min: 20, title: "Teknik: vole / bandeja" },
    { min: 15, title: "Duvar & cam çalışması" },
    { min: 15, title: "Maç oyunu" },
  ],

  // Fiyatlar, süreler ve kapsam ÖRNEKTİR (₺, ders başı) — ÖRNEK — teyit et
  lessons: [
    { id: "birebir", icon: "user", name: "Birebir Padel", duration: 60, price: 2500, unit: "ders", // ÖRNEK — teyit et
      text: "Tüm odak sende: teknik, pozisyon ve duvar oyunu tek bir plan içinde.",
      perks: ["Kişisel gelişim planı", "Teknik & duvar çalışması", "Seviyene göre tempo"], featured: true },
    { id: "ikili", icon: "users", name: "İkili Ders", duration: 60, price: 1500, unit: "kişi başı", // ÖRNEK — teyit et
      text: "Partnerinle birlikte: eşli pozisyon, iletişim ve geçişleri beraber çalışın.",
      perks: ["2 oyuncu", "Eşli taktik", "Partner uyumu"] },
    { id: "grup", icon: "group", name: "4'lü Grup Dersi", duration: 90, price: 900, unit: "kişi başı", // ÖRNEK — teyit et
      text: "Benzer seviyedeki dört oyuncuyla; drill'ler ve yönlendirilmiş oyunla bol tekrar.",
      perks: ["4 oyuncu, benzer seviye", "Drill + oyun", "Sosyal ve ekonomik"] },
    { id: "clinic", icon: "trophy", name: "Maç Pratiği / Clinic", duration: 90, price: 1200, unit: "kişi başı", // ÖRNEK — teyit et
      text: "Gerçek maç oyunu üzerinden koçluk: durdur, düzelt, yeniden oyna.",
      perks: ["Maç içi koçluk", "Taktik & karar verme", "Lig / turnuva hazırlığı"] },
  ],

  trial: { id: "degerlendirme", icon: "spark", name: "Seviye Değerlendirmesi", duration: 30, price: 0, // ÖRNEK — teyit et
    text: "İlk görüşme ücretsiz: seviyeni görelim, hedefini konuşalım." },

  // ÖRNEK — teyit et
  packages: [
    { count: 1, label: "Tek ders", discount: 0 },
    { count: 5, label: "5'li paket", discount: 10 },
    { count: 10, label: "10'lu paket", discount: 15 },
  ],

  // Çalışma saatleri ÖRNEK — teyit et: 0 = Pazar … 6 = Cumartesi
  schedule: {
    0: ["09:00", "10:00", "11:00", "12:00"],
    1: ["07:00", "08:00", "09:00", "10:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
    2: ["07:00", "08:00", "09:00", "10:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
    3: ["07:00", "08:00", "09:00", "10:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
    4: ["07:00", "08:00", "09:00", "10:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
    5: ["07:00", "08:00", "09:00", "10:00", "16:00", "17:00", "18:00", "19:00"],
    6: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
  },
  bookingDaysAhead: 21,

  // ÖRNEK — teyit et: ders verilen padel kulüpleri (gerçek kulüp adları geldiğinde değiştir; maps alanı eklenebilir)
  locations: [
    { name: "Senin kulübün", area: "İstanbul geneli", note: "Üye olduğun padel kulübünde ders" },
    { name: "Avrupa Yakası padel kulüpleri", area: "İstanbul", note: "Kort önerisi rezervasyonda paylaşılır" },
    { name: "Anadolu Yakası padel kulüpleri", area: "İstanbul", note: "Kort önerisi rezervasyonda paylaşılır" },
  ],

  // Gerçek öğrenci yorumları geldiğinde ekle: { name, meta, text } — boşsa bölüm gizlenir
  testimonials: [],

  // ÖRNEK — teyit et: tüm politikalar (raket, iptal, ödeme, eşleştirme, paket süresi)
  faq: [
    { q: "Hiç padel oynamadım, başlayabilir miyim?", a: "Kesinlikle. Padel ilk dersten keyif veren bir oyun. 30 dakikalık seviye değerlendirmesi ücretsiz; tutuş, hazır duruş ve temel vuruşlarla başlıyoruz." },
    { q: "Tenisten geliyorum, padelde fark ne?", a: "Top hissin ve vuruş temelin büyük avantaj. Uyarlaman gerekenler: daha kompakt ve kontrollü swing, topun camdan dönmesine izin vermek, sert vurmak yerine lob ve sabırla puan kurmak. Benim de altyapım tenis; bu geçişi derslerde özellikle çalışıyoruz." },
    { q: "Raket ve ayakkabı gerekli mi?", a: "Raketin yoksa ilk derslerde ödünç raket ayarlayabiliriz. Ayakkabı olarak kumlu suni çime uygun (omni ya da balıksırtı tabanlı) bir padel/tenis ayakkabısı öneriyorum; koşu ayakkabısı kaydırır." }, // ÖRNEK — teyit et (ödünç raket)
    { q: "Kort ücreti fiyata dahil mi?", a: "Belirtilen fiyatlar ders ücretidir. Kort kirası kulübe göre değişir; rezervasyon sonrası net tutarı paylaşıyorum." },
    { q: "Partnerim yok, kaç kişiyle gelmeliyim?", a: "Tek başına gelebilirsin: birebir derste partnere ihtiyacın yok. İkili ve 4'lü dersler için grubun yoksa benzer seviyedeki oyuncularla eşleştirmeye çalışıyorum." }, // ÖRNEK — teyit et (eşleştirme)
    { q: "Ders iptal ya da erteleme nasıl oluyor?", a: "Dersten 24 saat öncesine kadar ücretsiz iptal veya erteleme yapabilirsin. Açık kortta hava koşulları nedeniyle yapılamayan dersler yeniden planlanır." },
    { q: "Ödeme nasıl yapılıyor?", a: "Tek derslerde ödeme ders günü, paketlerde ilk derste yapılır; nakit ya da havale/EFT ile ödeyebilirsin." }, // ÖRNEK — teyit et
    { q: "Paket dersler ne kadar süre geçerli?", a: "5'li paket 6 hafta, 10'lu paket 12 hafta içinde kullanılabilir." }, // ÖRNEK — teyit et
  ],

  /* ---------------- TENİS GEÇMİŞİ (sayfanın sonunda) ---------------- */
  tennis: {
    intro: "Padelden önce: 2005'ten 2025'e tenis kariyeri",
    profile: "https://te.tournamentsoftware.com/player-profile/A61FD868-8997-4549-AC13-B87F3E2C1921",
    rankingHigh: 53,

    // BAŞARILAR
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
      { years: "Oca 2012 — Eyl 2012", place: "Galați Tennis Academy", city: "Galați, Romanya" },   // bitiş yılı CV'de yok — teyit et
      { years: "2005 — 2011", place: "Tenise başlangıç", city: "Adana" },
    ],

    // Antrenman yaptığı yerler (yolculuk şeridi)
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
