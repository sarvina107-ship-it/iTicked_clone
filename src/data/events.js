const events = [
  {
    id: "ev-1",
    category: "concerts",
    title: {
      ru: "Концерт Jah Khalib — Большое сольное шоу",
      uz: "Jah Khalib konserti — Katta yakkaxon shou"
    },
    description: {
      ru: "Грандиозный сольный концерт Jah Khalib в Ташкенте с живым бэндом и всеми любимыми хитами: «Медина», «Лейла», «Созвездие ангела» и новые треки!",
      uz: "Toshkentda Jah Khalibning jonli ijrodagi katta yakkaxon konserti! Barcha sevimli xitlar: «Medina», «Leyla», «Sozvezdie angela» va yangi taronalar!"
    },
    venue: {
      ru: "Humo Arena, Ташкент",
      uz: "Humo Arena, Toshkent"
    },
    address: {
      ru: "ул. Бешагач, 187, Ташкент",
      uz: "Beshog'och ko'chasi, 187, Toshkent"
    },
    date: {
      ru: "18 Ноября 2026, 19:30",
      uz: "18 Noyabr 2026, 19:30"
    },
    ageLimit: "12+",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    sectors: [
      { id: "dance", name: { ru: "Фан-зона (Танцпол)", uz: "Fan-zona (Tanspol)" }, price: 250000 },
      { id: "parter", name: { ru: "Партер (Сектор A)", uz: "Parter (A-sektor)" }, price: 400000 },
      { id: "tribune", name: { ru: "Трибуна (Сектор B)", uz: "Tribuna (B-sektor)" }, price: 180000 },
      { id: "vip", name: { ru: "VIP Ложа", uz: "VIP Loja" }, price: 850000 }
    ]
  },
  {
    id: "ev-2",
    category: "concerts",
    title: {
      ru: "Xamdam Sobirov — Jonli Ijro Konserti",
      uz: "Xamdam Sobirov — Jonli ijro konserti"
    },
    description: {
      ru: "Главное музыкальное событие осени! Зажигательные хиты и премьеры песен от Хамдама Собирова во Дворце «Дружба Народов».",
      uz: "Kuzning eng yorqin musiqiy tadbiri! Xalqlar do'stligi saroyida Xamdam Sobirovning eng yangi va mashhur qo'shiqlari."
    },
    venue: {
      ru: "Дворец «Дружба Народов»",
      uz: "«Xalqlar Do'stligi» san'at saroyi"
    },
    address: {
      ru: "пл. Дружбы Народов, Ташкент",
      uz: "Xalqlar do'stligi maydoni, Toshkent"
    },
    date: {
      ru: "22 Ноября 2026, 19:00",
      uz: "22 Noyabr 2026, 19:00"
    },
    ageLimit: "6+",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    sectors: [
      { id: "parter_front", name: { ru: "Партер (1-5 ряды)", uz: "Parter (1-5 qatorlar)" }, price: 300000 },
      { id: "parter_mid", name: { ru: "Партер (6-15 ряды)", uz: "Parter (6-15 qatorlar)" }, price: 200000 },
      { id: "amphitheater", name: { ru: "Амфитеатр", uz: "Amfiteatr" }, price: 120000 },
      { id: "balcony", name: { ru: "Балкон", uz: "Balkon" }, price: 70000 }
    ]
  },
  {
    id: "ev-3",
    category: "theater",
    title: {
      ru: "Балет «Лебединое Озеро» — П. И. Чайковский",
      uz: "«Oqqush ko'li» baleti — P. I. Chaykovskiy"
    },
    description: {
      ru: "Шедевр мировой классики на сцене Государственного академического Большого театра им. Алишера Навои. Великая музыка и виртуозный балет.",
      uz: "Alisher Navoiy nomidagi Davlat akademik Katta teatri sahnasida jahon mumtoz san'ati durdonasi."
    },
    venue: {
      ru: "ГАБТ им. Алишера Навои",
      uz: "Alisher Navoiy nomidagi GABT"
    },
    address: {
      ru: "ул. Зарафшан, 28, Ташкент",
      uz: "Zarafshon ko'chasi, 28, Toshkent"
    },
    date: {
      ru: "28 Ноября 2026, 18:00",
      uz: "28 Noyabr 2026, 18:00"
    },
    ageLimit: "6+",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    sectors: [
      { id: "parter", name: { ru: "Партер", uz: "Parter" }, price: 150000 },
      { id: "beletage", name: { ru: "Бельэтаж", uz: "Beletaj" }, price: 100000 },
      { id: "balcony", name: { ru: "Балкон", uz: "Balkon" }, price: 50000 }
    ]
  },
  {
    id: "ev-4",
    category: "sport",
    title: {
      ru: "Суперлига: «Пахтакор» vs «Навбахор»",
      uz: "Superliga: «Paxtakor» vs «Navbahor»"
    },
    description: {
      ru: "Принципиальнейшее футбольное дерби сезона! Битва за золотые медали чемпионата Узбекистана на стадионе «Пахтакор».",
      uz: "Mavsumning eng shiddatli derbisi! O'zbekiston chempionati oltin medallari uchun kurash."
    },
    venue: {
      ru: "Центральный стадион «Пахтакор»",
      uz: "«Paxtakor» markaziy stadioni"
    },
    address: {
      ru: "ул. Пахтакорская, 1, Ташкент",
      uz: "Paxtakor ko'chasi, 1, Toshkent"
    },
    date: {
      ru: "01 Декабря 2026, 18:30",
      uz: "01 Dekabr 2026, 18:30"
    },
    ageLimit: "0+",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
    sectors: [
      { id: "vip", name: { ru: "CIP / VIP Трибуна", uz: "CIP / VIP Tribuna" }, price: 120000 },
      { id: "west", name: { ru: "Западная трибуна", uz: "G'arbiy tribuna" }, price: 60000 },
      { id: "east", name: { ru: "Восточная трибуна", uz: "Sharqiy tribuna" }, price: 40000 },
      { id: "fan", name: { ru: "Фан-сектор", uz: "Fan-sektor" }, price: 30000 }
    ]
  },
  {
    id: "ev-5",
    category: "kids",
    title: {
      ru: "Интерактивное шоу «Мир Волшебства и Магии»",
      uz: "«Sehrgarlar dunyosi» bolalar interaktiv shousi"
    },
    description: {
      ru: "Увлекательное семейное цирковое представление с гигантскими мыльными пузырями, фокусами, дрессированными птицами и героями сказок!",
      uz: "Oila va bolalar uchun qiziqarli sirk tomoshasi: ulkan pufaklar, illyuziya fokuslari va ertak qahramonlari!"
    },
    venue: {
      ru: "Ташкентский Государственный Цирк",
      uz: "Toshkent Davlat Sirki"
    },
    address: {
      ru: "пл. Хадра, 1, Ташкент",
      uz: "Xadra maydoni, 1, Toshkent"
    },
    date: {
      ru: "05 Декабря 2026, 15:00",
      uz: "05 Dekabr 2026, 15:00"
    },
    ageLimit: "0+",
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&auto=format&fit=crop&q=80",
    sectors: [
      { id: "ring", name: { ru: "Сектор у манежа (1-4 ряд)", uz: "Manej oldi sektori" }, price: 90000 },
      { id: "mid", name: { ru: "Средние ряды (5-10 ряд)", uz: "O'rta qatorlar" }, price: 60000 },
      { id: "upper", name: { ru: "Верхние ряды", uz: "Yuqori qatorlar" }, price: 40000 }
    ]
  },
  {
    id: "ev-6",
    category: "festivals",
    title: {
      ru: "Tashkent Food & Music Fest 2026",
      uz: "Tashkent Food & Music Fest 2026"
    },
    description: {
      ru: "Трехдневный фестиваль уличной еды, живой музыки и арт-маркета в парке Magic City. Выступления популярных диджеев и артистов.",
      uz: "Magic City bog'ida 3 kunlik street-food, jonli musiqa va art-market festivali! Mashhur DJ va san'atkorlar ishtirokida."
    },
    venue: {
      ru: "Magic City Park",
      uz: "Magic City bog'i"
    },
    address: {
      ru: "ул. Бабура, 174, Ташкент",
      uz: "Bobur ko'chasi, 174, Toshkent"
    },
    date: {
      ru: "12-14 Декабря 2026, 16:00 - 23:00",
      uz: "12-14 Dekabr 2026, 16:00 - 23:00"
    },
    ageLimit: "0+",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    sectors: [
      { id: "standard", name: { ru: "Входной билет на 1 день", uz: "1 kunlik kirish chiptasi" }, price: 50000 },
      { id: "all_days", name: { ru: "Абонемент на все 3 дня", uz: "3 kunlik to'liq abonement" }, price: 120000 },
      { id: "vip_pass", name: { ru: "VIP Pass (Лаундж + напитки)", uz: "VIP Pass (Laundj + ichimliklar)" }, price: 250000 }
    ]
  }
];

module.exports = { events };
