const translations = {
  ru: {
    welcome: "👋 Добро пожаловать в официальный бот **iTicket.uz**!\n\nЗдесь вы можете приобрести билеты на лучшие концерты, спектакли, спортивные матчи и шоу в Узбекистане быстро, удобно и без очередей.\n\nПожалуйста, выберите интересующий раздел ниже ⬇️",
    choose_lang: "🌐 Пожалуйста, выберите язык интерфейса / Iltimos, tilni tanlang:",
    lang_set: "✅ Язык успешно изменен на русский!",
    main_menu: "Главное меню iTicket.uz:",
    
    // Buttons
    btn_afisha: "🎫 Афиша и билеты",
    btn_search: "🔍 Поиск мероприятий",
    btn_my_tickets: "🎟 Мои билеты",
    btn_about: "ℹ️ О нас / Поддержка",
    btn_change_lang: "🌐 Сменить язык",
    btn_back: "⬅️ Назад в меню",
    btn_categories: "📂 Категории",
    btn_buy_ticket: "🎟 Купить билет",
    btn_pay_click: "🔹 Оплатить через Click",
    btn_pay_payme: "🟢 Оплатить через Payme",
    btn_pay_cash: "💵 Оплата в кассе (Бронь)",
    btn_share_contact: "📱 Отправить мой номер",

    // Categories
    cat_title: "Выберите категорию мероприятий:",
    cat_all: "🔥 Все мероприятия",
    cat_concerts: "🎤 Концерты",
    cat_theater: "🎭 Театры и Балет",
    cat_sport: "⚽️ Спорт и Матчи",
    cat_kids: "👶 Детям и Семье",
    cat_festivals: "🎪 Фестивали и Шоу",

    // Event details
    event_venue: "📍 Площадка:",
    event_address: "🏢 Адрес:",
    event_date: "🗓 Дата и время:",
    event_age: "🔞 Возрастной ценз:",
    event_price_from: "💰 Цена билетов от:",
    event_select_sector: "🎟 Пожалуйста, выберите сектор или ценовую категорию:",
    event_not_found: "❌ К сожалению, мероприятия не найдены.",

    // Booking flow
    booking_step_sector: "Вы выбрали сектор: **{sector}** ({price} сум).\n\nСколько билетов вы хотите приобрести? Выберите количество:",
    booking_step_qty: "Количество билетов: **{qty} шт.**\nОбщая сумма: **{total} сум**\n\nДля оформления бронирования введите ваше **Имя и Фамилию**:",
    booking_step_phone: "Отлично, **{name}**!\nТеперь отправьте ваш номер телефона для связи и получения билетов.\n\nНажмите кнопку ниже или введите номер вручную (например: +998901234567):",
    booking_step_payment: "📋 **Подтверждение заказа #{orderId}**\n\n🎭 Мероприятие: **{event}**\n🗓 Дата: {date}\n📍 Место: {venue}\n🎫 Сектор: {sector}\n🔢 Количество: {qty} шт.\n💵 Итого к оплате: **{total} сум**\n👤 Покупатель: {name} ({phone})\n\nВыберите способ оплаты:",
    
    order_success_title: "🎉 **Поздравляем с покупкой!**",
    order_success_text: "Ваш электронный билет успешно оформлен!\n\n🆔 **Номер билета:** `{orderId}`\n🎭 **Событие:** {event}\n🗓 **Дата:** {date}\n📍 **Локация:** {venue}\n🎫 **Сектор:** {sector} ({qty} шт.)\n💰 **Оплачено:** {total} сум\n\n📲 Предъявите QR-код на входе в зал прямо с экрана телефона. Желаем приятного отдыха!",
    
    // Search
    search_prompt: "🔍 Введите название артиста, спектакля или спортивного события для поиска:",
    search_empty: "Ничего не найдено по вашему запросу. Попробуйте ввести другое слово или посмотрите категорию «Афиша».",
    
    // My tickets
    my_tickets_title: "🎟 **Ваши электронные билеты:**",
    my_tickets_empty: "У вас пока нет купленных билетов.\n\nПерейдите в раздел «🎫 Афиша и билеты», чтобы выбрать интересное событие!",
    ticket_view: "🎫 Билет #{orderId} — {event}",

    // About
    about_text: "🏢 **iTicket.uz** — ведущий билетный оператор в Узбекистане.\n\nЗдесь собраны тысячи культурных, спортивных и развлекательных событий по всей стране.\n\n🌐 Сайт: [iticket.uz](https://iticket.uz)\n📞 Единый колл-центр: +998 71 207 10 71\n📍 Центральная касса: г. Ташкент, Дворец «Дружба Народов»\n🕒 Режим работы касс: Ежедневно с 09:00 до 20:00",

    admin_new_order: "🔔 **НОВЫЙ ЗАКАЗ БИЛЕТОВ!**\n\n🆔 Заказ: `{orderId}`\n👤 Клиент: {name}\n📱 Телефон: {phone}\n💬 Telegram: @{username} (ID: {userId})\n\n🎭 Событие: {event}\n🗓 Дата: {date}\n🎫 Сектор: {sector}\n🔢 Билетов: {qty} шт.\n💰 Сумма: **{total} сум**\n💳 Способ оплаты: {paymentMethod}"
  },

  uz: {
    welcome: "👋 **iTicket.uz** rasmiy botiga xush kelibsiz!\n\nBu yerda siz O'zbekistondagi eng yaxshi konsertlar, teatrlar, sport musobaqalari va shoularga navbatsiz, tez va oson chipta xarid qilishingiz mumkin.\n\nIltimos, quyidagi bo'limlardan birini tanlang ⬇️",
    choose_lang: "🌐 Iltimos, tilni tanlang / Пожалуйста, выберите язык интерфейса:",
    lang_set: "✅ Til muvaffaqiyatli o'zbek tiliga o'zgartirildi!",
    main_menu: "iTicket.uz asosiy menyusi:",

    // Buttons
    btn_afisha: "🎫 Afisha va chiptalar",
    btn_search: "🔍 Tadbirlarni qidirish",
    btn_my_tickets: "🎟 Mening chiptalarim",
    btn_about: "ℹ️ Biz haqimizda / Aloqa",
    btn_change_lang: "🌐 Tilni o'zgartirish",
    btn_back: "⬅️ Asosiy menyuga",
    btn_categories: "📂 Kategoriyalar",
    btn_buy_ticket: "🎟 Chipta sotib olish",
    btn_pay_click: "🔹 Click orqali to'lash",
    btn_pay_payme: "🟢 Payme orqali to'lash",
    btn_pay_cash: "💵 Kassada to'lash (Band qilish)",
    btn_share_contact: "📱 Telefon raqamimni yuborish",

    // Categories
    cat_title: "Tadbir toifasini tanlang:",
    cat_all: "🔥 Barcha tadbirlar",
    cat_concerts: "🎤 Konsertlar",
    cat_theater: "🎭 Teatr va Balet",
    cat_sport: "⚽️ Sport musobaqalari",
    cat_kids: "👶 Bolalar va Oila",
    cat_festivals: "🎪 Festivallar va Shoular",

    // Event details
    event_venue: "📍 Joylashuv:",
    event_address: "🏢 Manzil:",
    event_date: "🗓 Sana va vaqt:",
    event_age: "🔞 Yosh chegarasi:",
    event_price_from: "💰 Chipta narxi:",
    event_select_sector: "🎟 Marhamat, sektor yoki narx toifasini tanlang:",
    event_not_found: "❌ Afsuski, tadbirlar topilmadi.",

    // Booking flow
    booking_step_sector: "Tanlangan sektor: **{sector}** ({price} so'm).\n\nNechta chipta xarid qilmoqchisiz? Miqdorni tanlang:",
    booking_step_qty: "Chiptalar soni: **{qty} dona**\nUmumiy summa: **{total} so'm**\n\nBuyurtmani rasmiylashtirish uchun **Ism va Familiyangizni** kiriting:",
    booking_step_phone: "Ajoyib, **{name}**!\nEndi chiptalarni bog'lash uchun telefon raqamingizni yuboring.\n\nPastdagi tugmani bosing yoki raqamingizni yozing (masalan: +998901234567):",
    booking_step_payment: "📋 **#{orderId} raqamli buyurtmani tasdiqlash**\n\n🎭 Tadbir: **{event}**\n🗓 Sana: {date}\n📍 Manzil: {venue}\n🎫 Sektor: {sector}\n🔢 Miqdor: {qty} dona\n💵 To'lov summasi: **{total} so'm**\n👤 Xaridor: {name} ({phone})\n\nTo'lov turini tanlang:",

    order_success_title: "🎉 **Xaridingiz uchun rahmat!**",
    order_success_text: "Sizning elektron chiptangiz muvaffaqiyatli rasmiylashtirildi!\n\n🆔 **Chipta raqami:** `{orderId}`\n🎭 **Tadbir:** {event}\n🗓 **Sana:** {date}\n📍 **Manzil:** {venue}\n🎫 **Sektor:** {sector} ({qty} dona)\n💰 **To'langan:** {total} so'm\n\n📲 Kirish joyida ushbu QR-kodni telefoningizdan ko'rsatishingiz kifoya. Maroqli hordiq tilaymiz!",

    // Search
    search_prompt: "🔍 Qidirish uchun san'atkor, spektakl yoki tadbir nomini kiriting:",
    search_empty: "Qidiruvingiz bo'yicha hech narsa topilmadi. Boshqa so'z bilan urinib ko'ring yoki «Afisha» bo'limiga qarang.",

    // My tickets
    my_tickets_title: "🎟 **Sizning elektron chiptalaringiz:**",
    my_tickets_empty: "Sizda hozircha sotib olingan chiptalar mavjud emas.\n\n«🎫 Afisha va chiptalar» bo'limidan qiziqarli tadbirlarni tanlashingiz mumkin!",
    ticket_view: "🎫 Chipta #{orderId} — {event}",

    // About
    about_text: "🏢 **iTicket.uz** — O'zbekistondagi eng yetakchi chipta operatori.\n\nBu yerda respublika bo'ylab barcha madaniy, sport va ko'ngilochar tadbirlarga chiptalar jamlangan.\n\n🌐 Veb-sayt: [iticket.uz](https://iticket.uz)\n📞 Yagona aloqa markazi: +998 71 207 10 71\n📍 Bosh kassa: Toshkent shahri, «Xalqlar Do'stligi» saroyi\n🕒 Ish vaqti: Har kuni 09:00 dan 20:00 gacha",

    admin_new_order: "🔔 **YANGI CHIPTA BUYURTMASI!**\n\n🆔 Buyurtma: `{orderId}`\n👤 Xaridor: {name}\n📱 Telefon: {phone}\n💬 Telegram: @{username} (ID: {userId})\n\n🎭 Tadbir: {event}\n🗓 Sana: {date}\n🎫 Sektor: {sector}\n🔢 Chiptalar: {qty} dona\n💰 Summa: **{total} so'm**\n💳 To'lov turi: {paymentMethod}"
  }
};

function formatPrice(num) {
  return new Intl.NumberFormat('ru-RU').format(num);
}

function t(lang, key, params = {}) {
  const dictionary = translations[lang] || translations.ru;
  let text = dictionary[key] || translations.ru[key] || key;
  
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return text;
}

module.exports = { translations, t, formatPrice };
