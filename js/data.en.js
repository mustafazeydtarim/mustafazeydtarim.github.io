/*
 * SITE CONTENT (English) — mirror of js/data.js. Keep both files in sync.
 */
window.SITE = {
  lang: "en",
  locale: "en-GB",
  name: "Bekir Berk Şahin",
  monogram: "BBŞ",
  age: 27,
  sport: "Padel",
  title: "Padel Coach",
  city: "Istanbul",

  photo: "",

  contact: {
    phoneDisplay: "+90 531 677 34 01",
    phone: "+905316773401",
    whatsapp: "905316773401",
    email: "sbekirberk@gmail.com",
    instagram: "bekirberkksahin",
  },

  scoreboard: [
    ["Licence", "ITF Coach"],
    ["Courts", "Beşiktaş · Sarıyer"],
    ["Languages", "TR · EN"],
    ["Background", "Tennis · U12 TR Champion"],
  ],

  stats: [
    { value: 21, suffix: "", label: "Years in racket sports (since 2005)" },
    { value: 6, suffix: "+", label: "Years of coaching experience" },
    { value: 5, suffix: "", label: "Countries trained in" },
    { value: 7, suffix: "/7", label: "Lessons every day of the week" },
  ],

  ticker: ["Bandeja", "Víbora", "Bajada", "Chiquita", "Lob", "Por 3 smash", "Wall play", "Volley", "Contrapared"],

  about: {
    lead: "Padel is a game of positioning, patience and partnership. In my lessons we build all three, step by step, at your level.",
    paragraphs: [
      "Every lesson starts with finding your place on court: where to stand at the net and at the back, how to set up when the ball comes off the glass, how to share space with your partner. Shots like the volley, bandeja and víbora are built on that foundation.",
      "My background is tennis: I've been in racket sports since 2005, I hold an ITF coaching licence, and I bring the technical base from academies in five countries to padel's walled, doubles game. I coach players of every age, from kids to adults, at Lepadel in Akatlar and Opadel in Sarıyer, in Turkish and English.",
    ],
    principles: [
      { icon: "wall", title: "Reading the wall", text: "No panic when the ball comes off the glass: we work on reading the angle, waiting and hitting at the right moment." },
      { icon: "users", title: "Positioning & doubles play", text: "Learn where to stand at the net and at the back, and how to move as a pair, through real game situations." },
      { icon: "target", title: "A plan built for you", text: "In the first lesson I see where your game is and we map out a path to your goal." },
    ],
  },

  lessonFlow: [
    { min: 10, title: "Warm-up & footwork" },
    { min: 20, title: "Technique: volley / bandeja" },
    { min: 10, title: "Wall & glass work" },
    { min: 15, title: "Match play" },
  ],

  lessons: [
    { id: "birebir", icon: "user", name: "Private Lesson", duration: 55, price: 5000, unit: "lesson",
      text: "All the focus on you: technique, positioning and wall play in a single plan.",
      perks: ["Personal development plan", "Technique & wall work", "Court fee included"], featured: true },
    { id: "grup", icon: "users", name: "Group Lesson", duration: 55, price: 6000, unit: "lesson · 2 players total",
      text: "With your partner or friends: work on doubles positioning, communication and transitions together.",
      perks: ["2 players", "Doubles tactics & drills", "Court fee included"] },
    { id: "junior", icon: "smile", name: "Junior Lesson", duration: 55, price: 5000, unit: "lesson · private",
      text: "For kids and teens: coordination, core technique and a love for the game. Junior pair lessons available too.",
      perks: ["Suitable for every age", "Junior pair lesson: ₺6,000", "Court fee included"] },
  ],

  trial: {
    lesson: "birebir",
    title: "Start with a trial lesson.",
    text: "No package, no commitment: one lesson to get to know each other, see your game and build your plan.",
  },

  schedule: Object.fromEntries([0, 1, 2, 3, 4, 5, 6].map((d) => [d,
    ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]])),
  bookingDaysAhead: 21,

  locations: [
    { name: "Lepadel", area: "Clubsporium, Akatlar · Beşiktaş", maps: "Lepadel Clubsporium Akatlar Beşiktaş İstanbul",
      glass: "https://glasspadelapp.com/venue/le-padel" },
    { name: "Opadel", area: "Skyland · Sarıyer", maps: "O'Padel Skyland Sarıyer İstanbul",
      glass: "https://glasspadelapp.com/venue/opadel" },
  ],

  testimonials: [],

  faq: [
    { q: "I've never played padel. Can I start?", a: "Absolutely. Padel is fun from the very first lesson. We start with the grip, ready position and basic shots. There's no package requirement; you can start with a single trial lesson." },
    { q: "I play tennis. What's different in padel?", a: "Your feel for the ball and stroke technique are a big advantage. What you'll adapt: a more compact, controlled swing, letting the ball come off the glass, and building points with lobs and patience instead of hitting hard. My background is tennis too, so we work on this transition specifically." },
    { q: "What ages do you teach?", a: "All ages. Private or junior pair lessons for kids and teens; private and group lessons for adults." },
    { q: "How much are lessons? Is the court included?", a: "A private lesson is ₺5,000 and a group lesson for 2 players ₺6,000 in total; each lesson is 55 minutes. The court fee is included, so there's nothing extra to pay. There are no package discounts; every lesson is charged individually." },
    { q: "Where and when are lessons?", a: "At Lepadel in Akatlar (Beşiktaş) and Opadel in Sarıyer. I teach every day of the week, 08:00–23:00; pick a time that suits you when booking." },
    { q: "Will the court be free at the time I pick?", a: "The time you pick on the site is a request. Courts are booked through the Glass app: when your request arrives I check court availability on Glass, reserve the court and confirm on WhatsApp. If that slot is taken, I'll suggest the nearest free time." },
    { q: "Do you teach in English?", a: "Yes. I teach in both English and Turkish." },
    { q: "How do I pay?", a: "Payment is by bank transfer (EFT)." },
    { q: "What's the cancellation policy?", a: "You can cancel or reschedule up to 24 hours before the lesson. With less than 24 hours' notice, the lesson counts as taken and is charged." },
    { q: "Do I need a racket and shoes?", a: "I recommend padel/tennis shoes suited to sand-filled artificial turf (omni or herringbone sole); running shoes slip. If you don't have a racket, message me before the lesson and we'll talk through options for your level." },
  ],

  tennis: {
    intro: "Before padel: a tennis career from 2005 to 2025",
    profile: "https://te.tournamentsoftware.com/player-profile/A61FD868-8997-4549-AC13-B87F3E2C1921",
    rankingHigh: 53,

    honours: [
      { year: "2011", title: "U12 Turkish Champion", org: "Turkish Tennis Federation" },
      { year: "2013", title: "U14 Turkish National Team", org: "Turkish Tennis Federation" },
      { year: "2017", title: "U18 Turkish National Team", org: "Turkish Tennis Federation" },
    ],
    results: [
      { event: "Hitit Cup", cat: "U14", draw: "Singles", result: "win" },
      { event: "Hitit Cup", cat: "U14", draw: "Doubles", result: "win" },
      { event: "Sadi Gülçelik Cup", cat: "U16", draw: "Singles", result: "final" },
      { event: "Bitola Open", cat: "U16", draw: "Doubles", result: "final" },
      { event: "National Sport Park Open", cat: "U14", draw: "Singles", result: "final" },
    ],

    work: [
      { years: "Apr 2024 — Sep 2025", role: "Tennis Coach", place: "Shape Tennis Academy", city: "Istanbul" },
      { years: "Mar 2022 — Mar 2023", role: "Tennis Coach", place: "Tacspor Tennis", city: "Istanbul" },
      { years: "Dec 2020 — Feb 2022", role: "Private Coach", place: "Private coaching", city: "Kharkiv, Ukraine" },
      { years: "Jun 2020 — Dec 2020", role: "Coach", place: "Gebze Tennis Academy", city: "Kocaeli", note: "with Berfu Cengiz (WTA 350)" },
      { years: "Jun 2019 — Mar 2020", role: "Coach", place: "GD Tennis Academy", city: "Istanbul", note: "with Giorgi Khrikadze" },
    ],

    education: [
      { years: "Dec 2018 — Jun 2019", place: "GD Tennis Academy", city: "Istanbul" },
      { years: "Jul 2017 — Nov 2018", place: "Garanti Koza Enka", city: "Istanbul" },
      { years: "Nov 2016 — Mar 2017", place: "Academia Tennis Ferrer", city: "Xàbia, Spain" },
      { years: "Nov 2015 — Jan 2016", place: "Bucharest Tennis Academy", city: "Bucharest, Romania" },
      { years: "Jan — Mar 2013", place: "IMG Academy", city: "Tampa, Florida, USA" },
      { years: "Jan — Aug 2012", place: "Galați Tennis Academy", city: "Galați, Romania" },
      { years: "2005 — 2011", place: "First steps in tennis", city: "Adana" },
    ],

    journey: [
      { code: "TR", place: "Adana", year: "2005" },
      { code: "RO", place: "Galați", year: "2012" },
      { code: "US", place: "Tampa, Florida", year: "2013" },
      { code: "RO", place: "Bucharest", year: "2015" },
      { code: "ES", place: "Xàbia", year: "2016" },
      { code: "TR", place: "Istanbul", year: "2017" },
      { code: "UA", place: "Kharkiv", year: "2020" },
    ],
  },
};
